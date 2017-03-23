import React from 'react';
import {Modal, Tabs, Table, Input, message} from 'antd';
import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as urlUtil from '../../util/url';
import * as shoppingGuideAction from '../../store/shoppingGuide/action';
import * as youzanAction from '../../store/youzan/action';
import Img from 'common/component/Img';
import * as weimobAction from '../../store/weimob/action';
import YouZanProductGuide from 'common/component/YouZanProductGuide';
import WeimobProductGuide from 'common/component/WeimobProductGuide';
import './index.less';

//链接redux进行状态的绑定
@connect(
    state => ({
        operation: state.operation,
        commonShoppingGuide: state.commonShoppingGuide.toJS(),
        auth: state.auth.toJS(),
        youzan: state.youzan.toJS(),
        weimob:state.weimob.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...shoppingGuideAction,
            ...youzanAction,
            ...weimobAction
        }, dispatch)
    })
)
// 一键导购
class ShoppingGuide extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        data: [],
        totalElements: 0,
        value: '',
        loading: false,
        // 导购类型 product | mall | yyg | link
        type: 'product',
        // 商品ID
        id: '',
        // 商品标题
        name: '',
        // 渠道类型 yyg | mall | youzan
        buyType: '',
        //登录信息
        uin: '',
        // 外链
        href: '',
        // 导购应用场景
        mode: 'shopping',
        kdt_id: '',
        alias: '',
        tabType: '',
        detail_url: '',
        youzanTabPanType: 'youzan',
        isShow: false

    };


    componentDidMount() {
        let params = {
            page: 0,
            size: 10
        };
        const {channel} = this.props.auth.version;
        this.getShoppingGuideList(params, channel);
    }

    componentWillMount() {
        this.setState({
            loading: true
        });
        let params = {
            size: 10
        };
        this.props.actions.getShoppingGuideList(params);
        this.props.actions.getCustomerUinInf();

        const {data} = this.props;
        if (!data.type) {
            return;
        } else {
            // let url;
            this.setState({
                type: data.type || '',
                // 商品ID
                id: data.type != 'link' ? data.id || '' : '',
                // 商品标题
                name: data.name || '',
                // 渠道类型 yyg | mall
                buyType: data.buyType || '',
                //登录信息
                uin: data.uin || '',
                // 外链
                href: data.type == 'link' ? data.id || '' : ''
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case shoppingGuideAction.GET_SHOPPINGGUIDE_LIST_SUCCESS:
                this.setState({
                    data: nextProps.commonShoppingGuide.shoppingGuideList.content,
                    totalElements: nextProps.commonShoppingGuide.shoppingGuideList.totalElements,
                    loading: false
                });
                break;
            case shoppingGuideAction.GET_CUSTOMER_UIN_SUCCESS:
                this.setState({
                    uin: nextProps.commonShoppingGuide.customerUinList.uin
                });
                break;
        }
    }

    //获取商品字段
    getShoppingGuideColumns() {
        return [{
            title: '商品名称',
            dataIndex: 'name',
            width: 120
        }, {
            title: '商品编号',
            dataIndex: 'code',
            width: 120
        }, {
            title: '商品价格',
            dataIndex: 'cost',
            width: 120,
            render: (txt, item) => {
                return '￥' + (item.cost / 100).toFixed(2);
            }
        }, {
            title: '投放渠道',
            dataIndex: 'buyType',
            width: 120,
            render: (txt, item) => {
                return item.buyType === 'mall' ? '商城' : '一元购';
            }
        }, {
            title: '库存',
            dataIndex: 'stock',
            width: 120,
            render: (txt, item) => {
                if (item.mallCfg) {
                    return item.mallCfg.stock;
                } else {
                    return item.yygCfg.stock;
                }
            }
        }];
    }

    handleOk = () => {
        if (_.isFunction(this.props.onOk)) {
            let data = {
                type: this.state.type,
                mode: this.state.mode,
                uin: this.state.uin
            };
            let url = '';
            //这里的参数配置和iloka一样
            switch (this.state.type) {
                case 'product':
                    if (!this.state.id || this.state.id === '') {
                        message.warning('请在表格选中需要添加一键导购的商品链接');
                        return;
                    }
                    data.id = this.state.id;
                    data.name = this.state.name;
                    data.buyType = this.state.buyType;

                    switch (data.buyType){
                        case 'mall':
                            url = urlUtil.getMallProductShowUrl(this.state.uin, data.id);
                            break;
                        case 'youzan':
                        case 'weimob':
                            data.type = 'product';
                            data.url = this.state.detail_url;
                            url = this.state.detail_url;
                            break;
                        default:
                            url = urlUtil.getYygProductShowUrl(this.state.uin, data.id);
                            break;
                    }

                    break;
                case 'link':
                    if (!this.state.href || this.state.href === '') {
                        message.warning('请在下面的输入框中输入跳转链接');
                        return;
                    }
                    data.name = this.state.href;
                    data.id = this.state.href;
                    url = this.state.href;
                    break;
                case 'yyg':
                    data.name = '一元购';
                    url = urlUtil.getYygIndexUrl(this.state.uin);
                    break;
                case 'mall':
                    data.name = '商城';
                    url = urlUtil.getMallIndexUrl(this.state.uin);
                    break;
            }

            this.props.onOk({
                data,
                url
            });
        }
    };

    callback = (key) => {
        if (key == 'mall' || key == 'link') {
            this.setState({
                isShow: true,
                type: key
            });
        } else {
            this.setState({
                isShow: false,
                type: key
            });
        }

    };

    handelRowChange = (item) => {
        if (this.state.type != 'product') {
            return;
        }

        switch (this.state.tabType){
            case 'youzan':
                this.setState({
                    id: item.alias,
                    name: item.title,
                    buyType: 'youzan',
                    type: 'product',
                    detail_url: item.detail_url
                });
                break;
            case 'weimob':
                this.setState({
                    id: item.spu.spu_id,
                    name: item.spu.spu_name,
                    buyType: 'weimob',
                    type: 'product',
                    detail_url: item.spu.spu_view_url
                });
                break;
            default:
                this.setState({
                    id: item.id,
                    name: item.name,
                    buyType: item.buyType,
                });
                break;
        }
    };

    rowChange = (selectedRowKeys, selectedRows) => {
        //这语句的意义是？
        if (this.state.tabType == 'youzan') {
            this.setState({
                'kdt_id': selectedRows[0].kdt_id,
                'alias': selectedRows[0].alias,
            });
        }
        this.handelRowChange(selectedRows[0]);
    };

    onRowClick = (record) => {
        this.handelRowChange(record);
    };

    handleInputChange = (e) => {
        if (e === '') {
            return;
        }
        this.setState({
            href: e.target.value
        });

    };

    getYouZanProductList = (params) => {
        this.props.actions.getYouZanProductList(params);
    };

    getWeimobProductList = (params) => {
        this.props.actions.getWeimobProductList(params);
    };

    getShoppingGuideList = ({page = 0, size = 10, q}, channel) => {

        switch (channel){
            case 'youzan':
                this.setState({
                    tabType: 'youzan'
                }, () => {
                    this.props.actions.getYouZanProductList({page, size, q});
                });
                break;
            case 'weimob':
                this.setState({
                    tabType: 'weimob'
                }, () => {
                    this.props.actions.getWeimobProductList({page, size});
                });
                break;
            default:
                this.setState({
                    tabType: 'iloka'
                }, () => {
                    this.props.actions.getShoppingGuideList({page, size});
                });
                break;

        }
    };

    render() {
        const {onCancel} = this.props;
        const TabPane = Tabs.TabPane;
        //定义表头
        const columns = this.getShoppingGuideColumns();
        const rowSelection = {
            type: 'radio',
            onChange: this.rowChange,
            selectedRowKeys: [this.state.id || '']
        };
        let pagination = {
            total: this.state.totalElements,
            showSizeChanger: false,
            defaultPageSize: 10,
            onChange: (current) => {
                this.setState({
                    loading: true
                });
                this.props.actions.getShoppingGuideList({
                    page: current - 1,
                    size: 10
                });
            },
        };

        const {version} = this.props.auth;
        const {youzanProductList} = this.props.youzan;
        const {weimobProductList} = this.props.weimob;

        let productGuide = (<div></div>);

        switch (version.channel){
            case 'youzan':
                productGuide = <YouZanProductGuide columns={columns}
                                    onRowClick={this.onRowClick}
                                    dataSource={youzanProductList.response}
                                    data={this.state.data}
                                    rowSelection={rowSelection}
                                    pagination={pagination}
                                    getShoppingGuideList={this.getShoppingGuideList}
                                    tabType={this.state.tabType}
                                    loading={this.state.loading}/>;
                break;
            case 'weimob':
                productGuide = <WeimobProductGuide columns={columns}
                                                   onRowClick={this.onRowClick}
                                                   dataSource={weimobProductList.data}
                                                   data={this.state.data}
                                                   rowSelection={rowSelection}
                                                   pagination={pagination}
                                                   getShoppingGuideList={this.getShoppingGuideList}
                                                   tabType={this.state.tabType}
                                                   loading={this.state.loading}/>;
                break;
            default:
                productGuide = <Table rowSelection={rowSelection}
                       rowKey="id"
                       columns={columns}
                       onRowClick={this.onRowClick}
                       dataSource={this.state.data}
                       loading={this.state.loading}
                       pagination={pagination}
                       bordered={true}
                />;
                break;

        }

        return (
            <Modal maskClosable={false}
                   className='ShoppingGuide' width={800}
                   title="一键导购"
                   visible={true}
                   onOk={this.handleOk}
                   onCancel={onCancel}>
                <Tabs defaultActiveKey={this.state.type} animated={false} onChange={this.callback}>
                    <TabPane tab="商品" key="product">
                        {productGuide}
                    </TabPane>
                    <TabPane tab="商城" key="mall">
                        {
                            this.state.isShow &&
                            <div className="mall-container">
                                <Img src="img/mallImg.png" alt=""/>
                            </div>
                        }
                    </TabPane>
                    {
                        this.props.version !== '2.1.0' &&
                        <TabPane tab="一元购" key="yyg">
                            <div className="yyg-container">
                                <Img src="img/yygImg.png" alt=""/>
                            </div>
                        </TabPane>
                    }
                    <TabPane tab="自定义" key="link">
                        {
                            this.state.isShow &&
                            <div className="link-container">
                                <Input placeholder="请输入跳转链接，不要忘记带http://"
                                       defaultValue={this.state.href || ''} style={{width: 400}}
                                       onChange={this.handleInputChange.bind(this)}
                                       size="large"/>
                                <div className="link-container-tip">
                                    可嵌入在其他平台商城的商品链接，用户点击后可直接购买商品
                                </div>
                            </div>
                        }
                    </TabPane>
                </Tabs>
            </Modal>
        );
    }
}

ShoppingGuide.defaultProps = {
    tabs: []
};

export default ShoppingGuide;
