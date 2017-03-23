import React, {Component} from 'react';
import {Table, Alert, Tabs} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import {moneyFormat, getSafeValue, redirect} from 'common/util';
import * as integralAction from '../../store/integral/action';
import * as couponAction from '../../store/coupon/action';
import * as youzanAction from '../../store/youzan/action';
import './index.less';
const TabPane = Tabs.TabPane;
@connect(
    state => ({
        operation: state.operation,
        commonCoupon: state.commonCoupon.toJS(),
        commonIntegral: state.commonIntegral.toJS(),
        youzan: state.youzan.toJS(),
        auth: state.auth.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...integralAction,
            ...couponAction,
            ...youzanAction,
        }, dispatch)
    })
)

export default class List extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        name: '',
        productIds: [],
        data: null,
        loading: true,
        fetch_url: '',
        tabType: ''
    }

    componentDidMount() {
        this.listCouponList(this.props.defaultChannelType);
    }


    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        switch (operation.type) {

            case couponAction.GET_COUPON_LIST_FAILURE:
            case couponAction.GET_COUPON_LIST_SUCCESS:
                this.setState({
                    data: nextProps.commonCoupon.couponList.content,
                    loading: false,
                });
                break;

            case integralAction.GET_INTEGRAL_LIST_FAILURE:
            case integralAction.GET_INTEGRAL_LIST_SUCCESS:
                this.setState({
                    data: nextProps.commonIntegral.integralList.content,
                    loading: false,
                });
                break;

            case integralAction.GET_INTEGRAL_LIST_PENDING:
            case couponAction.GET_COUPON_LIST_PENDING:
                this.setState({
                    loading: true
                });
                break;

            case youzanAction.GET_YOUZAN_COUNPON_LIST_SUCCESS :
                this.setState({
                    loading: false,
                });
                break;
        }
    }

    list() {
        const params = {
            size: 99,
        };
        if (this.props.type == 'coupon') {
            this.props.actions.getCouponList(params);
        } else {
            this.props.actions.getIntegralList(params);
        }
    }

    // 获取积分字段
    getIntegralColumns() {
        return [{
            title: '积分类型',
            dataIndex: 'id',
            width: 120,
            render: () => {
                return '普通积分';
            }
        }, {
            title: '积分名称',
            dataIndex: 'name',
            width: 120,
            render: (text) => {
                return getSafeValue(text, '-');
            }
        }, {
            title: '积分数额',
            dataIndex: 'integral',
            width: 120,
            render: (text) => {
                return getSafeValue(text, '-');
            }
        }, {
            title: '每人限领',
            dataIndex: 'perTotal',
            width: 120,
            render: (text) => {
                return getSafeValue(text, '-');
            }
        }, {
            title: '剩余数量',
            dataIndex: 'rule',
            width: 120,
            render: (text, item) => {
                if (item.total <= 0) {
                    return '无限制';
                } else {
                    return item.total - item.recieved;
                }
            }
        }];
    }

    // 获取红包字段
    getCouponColumns() {
        return [{
            title: '优惠券类型',
            dataIndex: 'couponType',
            width: 120,
            render: (text, item) => {
                if (item.couponType == 'quota') {
                    return '优惠券';
                } else {
                    return '折扣优惠券';
                }
            }
        }, {
            title: '优惠券名称',
            dataIndex: 'name',
            width: 120,
            render: (text) => {
                return getSafeValue(text, '-');
            }
        }, {
            title: '优惠额度',
            dataIndex: 'faceValue',
            width: 120,
            render: (text, item) => {
                if (item.couponType == 'quota') {
                    return moneyFormat(text);
                } else {
                    return item.discount;
                }
            }
        }, {
            title: '每人限领',
            dataIndex: 'rule.receive.perTotal',
            width: 120,
            render: (text) => {
                return getSafeValue(text, '-');
            }
        }, {
            title: '剩余数量',
            dataIndex: 'rule',
            width: 120,
            render: (text, item) => {
                if (item.total <= 0) {
                    return '无限制';
                } else {
                    return item.total - item.recieved;
                }
            }
        }];
    }

    getRowSelection = () => {
        return {
            onChange: (selectedRowKeys, selectedRowKey) => {
                this.props.selectedCallback(selectedRowKey[0].id, selectedRowKey[0], this.state.tabType);
            },
            selectedRowKeys: [this.props.selected || ''],
            type: 'radio',
        };
    }

    handleChange = (pagination) => {
        this.props.list(pagination.current - 1, this.state.name);
    }

    onRowClick = (record) => {
        this.props.selectedCallback(record.id, record, this.state.tabType);
    }

    addCoupon = () => {
        redirect('/marketing.html#/coupon/add', '_blank', () => {
            this.list();
        });
    }

    addIntegral = () => {
        redirect('/marketing.html#/integral', '_blank', () => {
            this.list();
        });
    }

    getCouponList = (key) => {
        if (key == 'youzan') {
            this.setState({
                tabType: key
            });
            this.props.actions.getYouZanCounponList();
        } else {
            this.setState({
                tabType: key
            });
            this.list();
        }
    }

    listCouponList = () => {
        const {version} = this.props.auth;
        if (version.channel == 'youzan') {
            this.setState({
                tabType: version.channel
            });
            this.props.actions.getYouZanCounponList();
        } else {
            this.list();
        }
    }
    //获取优惠券字段
    getYouzanCouponColumns() {
        return [{
            title: '名称',
            dataIndex: 'title',
            width: 120,
        }, {
            title: '类型',
            dataIndex: 'coupon_type',
            width: 50,
            render: (val) => {
                if (val == 'PROMOCARD') {
                    return '券';
                } else {
                    return '码';
                }
            }
        }, {
            title: '价值(元)',
            dataIndex: 'value',
            width: 120,
            render: (val, record) => {
                return (<div>
                    {val}
                    <p style={{'color': '#ccc'}}>最低消费:￥{record.at_least}</p>
                </div>);
            }
        }, {
            title: '领取限制',
            dataIndex: 'quota',
            width: 90,
            render: (val, record) => {
                return (<div>
                    {val > 0 ? '一人' + val + '张' : '不限张数'}
                    <p style={{'color': '#ccc'}}>库存: {record.stock}</p>
                </div>);
            }
        }, {
            title: '有效期',
            dataIndex: 'start_at',
            width: 200,
            render: (val, record) => {
                return (<span> {val}至{record.end_at }</span>);
            }
        }, {
            title: '领取人/次',
            dataIndex: 'stat_fetch_user_num',
            width: 90,
        }, {
            title: '已使用',
            dataIndex: 'stat_use_num',
        }];
    }

    render() {
        const rowSelection = this.getRowSelection();
        const columns = this.props.type == 'coupon' ? this.getCouponColumns() : this.getIntegralColumns();
        const scrollY = this.props.typeShow ? 380 : 260;
        const dataSource = this.state.data;
        const {couponList} = this.props.youzan;
        const isIlokaListEmpty = !this.state.loading && _.isEmpty(dataSource) && this.state.tabType === 'iloka';

        const {version} = this.props.auth;
        const youzanColumns = this.getYouzanCouponColumns();
        return (
            <div className='coupon-integral-conatainer'>
                {
                    version.channel == 'youzan' &&
                    <Tabs onChange={this.getCouponList} defaultActiveKey='youzan' animated={false}>
                        <TabPane tab="有赞商城" key="youzan">
                            <Table rowKey="group_id"
                                   onRowClick={this.onRowClick}
                                   loading={this.state.loading}
                                   columns={youzanColumns}
                                   scroll={{y: scrollY}}
                                   pagination={false}
                                   rowSelection={rowSelection}
                                   dataSource={couponList && couponList.response && couponList.response.coupons}
                                   bordered/>
                        </TabPane>
                        <TabPane tab="艾乐卡" key="iloka">
                            {isIlokaListEmpty &&
                            <div>您还没有可用的优惠券，马上去<a href="javascript:;" onClick={this.addCoupon}>添加</a></div>
                            }
                            {!isIlokaListEmpty &&
                            <Table rowKey="id"
                                   onRowClick={this.onRowClick}
                                   loading={this.state.loading}
                                   columns={columns}
                                   scroll={{y: scrollY}}
                                   pagination={false}
                                   rowSelection={rowSelection}
                                   dataSource={dataSource}
                                   bordered
                                   onChange={this.handleChange}/>
                            }

                        </TabPane>
                    </Tabs>
                }
                {
                    version.channel != 'youzan' &&
                    <Table rowKey="id"
                           onRowClick={this.onRowClick}
                           loading={this.state.loading}
                           columns={columns}
                           scroll={{y: scrollY}}
                           pagination={false}
                           rowSelection={rowSelection}
                           dataSource={dataSource}
                           bordered
                           onChange={this.handleChange}/>
                }
                {
                    !this.state.loading && version.channel != 'youzan' &&
                    <Alert
                        style={{marginTop: '10px', marginRight: '7px'}}
                        message={
                            (this.props.type == 'coupon' &&
                            <div>还有一大波优惠券? 马上去<a href="javascript:;" onClick={this.addCoupon}>添加</a></div>)
                            ||
                            (this.props.type == 'integral' &&
                            <div>还有一大波积分包? 马上去<a href="javascript:;" onClick={this.addIntegral}>添加</a></div>)
                        }
                        type="info"/>
                }
            </div>
        );
    }
}


