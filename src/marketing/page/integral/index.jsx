import React from 'react';
import PageBase from 'common/base/PageBase';
import {Modal, Button, Tabs, Card, message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as integralAction from '../../store/integral/action';
import * as ilokaAction from '../../store/iloka/action';
import IntegralList from './component/IntegralList';
import IntegralShow from './component/IntegralShow';
import * as customerAction from '../../store/customer/action';
import './index.less';
import AuthModule from 'common/component/AuthModule';
import * as module from 'common/config/module';
import Img from 'common/component/Img';

// TODO:[anyWhereModule: MPLUGIN_COUPON_CREATE]
//基本设置中的平台交易积分设置应该挪到积分管理中；
import SettingIntegralForm from './component/SettingIntegralForm';


@connect(
    state => ({
        customer: state.customer.toJS(),
        integral: state.integral.toJS(),
        iloka: state.iloka.toJS(),
        operation: state.operation,
        // setting:state.setting.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...integralAction,
            ...ilokaAction,
            ...customerAction
        }, dispatch)
    })
)


export default class IntegralIndex extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        type: 'list',

        viewType: 'list',
        viewParam: null,
        viewData: null
    };

    componentDidMount() {
        this.list(0);
        this.getAdminCustomer();
        this.getIntegralExchange();
    }

    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        switch (operation.type) {
            case integralAction.GET_INTEGRAL_SUCCESS:
                this.setState({
                    viewData: nextProps.integral.item
                });
                break;
            case integralAction.UPDATE_INTEGRAL_SUCCESS:
            case integralAction.ADD_INTEGRAL_SUCCESS:
            case integralAction.DELETE_INTEGRAL_SUCCESS:
                if (this.props.location.query.loop) {
                    window.close();
                }
                this.list(0);
                this.reset();
                break;
            case integralAction.GET_INTEGRAL_RES_LIST_SUCCESS:
                this.setState({
                    viewData: nextProps.integral.resList
                });
                break;
            // 获取客户积分兑换信息
            case customerAction.GET_INTEGRAL_EXCHANGE_SUCCESS:
                this.setState({
                    type: 'integral',
                    dataIntegral: nextProps.customer.integral
                });
                break;
            // 获取获取客户信息
            case customerAction.GET_ADMIN_CUSTOMER_SUCCESS:
                this.setState({
                    type: 'loaded',
                    customerInfo: nextProps.customer.customerInfo
                });
                break;
            // 修改客户积分设置
            case customerAction.UPDATE_INTEGRAL_EXCHANGE_SUCCESS:
                message.success('操作成功');
                this.getIntegralExchange();
                break;
        }
    }

    getAdminCustomer = ()=> {
        this.props.actions.getAdminCustomer();
    };

    getIntegralExchange = ()=> {
        this.props.actions.getIntegralExchange();
    }

    //修改客户积分设置
    updateIntegralExchange = (data)=> {
        const submitData = {
            id: this.props.customer.customerInfo.id,
            para: data
        };

        this.props.actions.updateIntegralExchange(submitData);
    };

    // 获取列表
    list = (page, size)=> {

        this.props.actions.getIntegralList({
            page,
            size
        });
    };

    // 获取列表
    resList = (id, page)=> {

        this.props.actions.getIntegralResList({
            id,
            page,
            size: 100
        });
    };

    addIntegral = (data)=> {
        this.props.actions.addIntegral(data);
    };

    //显示设置追加数量
    showAddNumber = (id)=> {
        this.showView('showAddNumber', id);
        this.props.actions.getIntegral(id);
    };

    //追加
    submit = (data, id)=> {
        this.props.actions.updateIntegral(id, data);
    };

    //显示投放详情
    showIntegralInfo = (id)=> {
        this.showView('showIntegralInfo', id);
        this.props.actions.getIntegralResList({
            id: id,
            size: 100
        });
    };

    //显示新增对话框
    showAddModal = ()=> {
        this.showView('showAddNew', null, {});
    };

    //删除
    deleteIntegral = (record)=> {

        if (record.hasRes) {
            message.info('积分包已投放，不允许删除');
            return null;
        }

        const confirm = Modal.confirm;

        const test = this;

        confirm({
            title: '确认删除红包吗？',
            content: '删除后不可恢复。',
            onOk() {

                test.setState({
                    type: ''
                }, ()=>test.props.actions.deleteIntegral(record.id));

                /*test.setState({
                 type: ''
                 });

                 test.list(0);*/
            },
            onCancel() {

            }
        });

    };

    //样式对话框
    showModal = ()=> {
        this.setState({
            visible: true
        });
    };

    handleCancel = ()=> {
        this.setState({
            visible: false
        });
    };

    //修改客户积分设置
    updateIntegralExchange = (data)=> {

        const submitData = {
            id: this.state.customerInfo.id,
            para: data
        };


        this.props.actions.updateIntegralExchange(submitData);
    };

    // 使用产品功能
    useModule = (type, success, failure)=> {
        this.anyWhereModule(type).then(success, failure);
    };

    render() {

        const {operation} = this.props;

        const TabPane = Tabs.TabPane;

        // 是否显示loading
        const isListLoading = operation.type == integralAction.GET_INTEGRAL_LIST_PENDING;

        // 是否显示修改form
        const isShowAddNumber = this.isShowView('showAddNumber');

        // 是否显示详情form
        const isShowIntegralInfo = this.isShowView('showIntegralInfo');

        // 是否显示新增form
        const isShowAddNew = this.isShowView('showAddNew');

        const operations = (
            <div>
                <AuthModule type={module.MPLUGIN_COUPON_CREATE}>
                    <Button className="integral-button" type="primary" size="large"
                            onClick={()=>this.useModule(module.MPLUGIN_COUPON_CREATE, this.showModal)}>
                        查看示例
                    </Button>
                </AuthModule>
                <AuthModule type={module.MPLUGIN_COUPON_CREATE}>
                    <Button className="integral-button" type="primary" size="large"
                            onClick={()=>this.useModule(module.MPLUGIN_COUPON_CREATE, this.showAddModal)}>
                        + 添加新积分包
                    </Button>
                </AuthModule>
            </div>
        );

        const {dataIntegral} = this.state;

        return (
            <div className="app-page" style={{'height':'100%'}}>
                <Card title="积分包管理" style={{'height':'100%'}}>
                    <Tabs tabBarExtraContent={operations}
                          animated={false}>
                        <TabPane tab={'积分包列表'} key="0">

                            <IntegralList data={this.props.integral.list.content}
                                          total={this.props.integral.list.totalElements}
                                          list={this.list}
                                          loading={isListLoading}
                                          showAddNumber={this.showAddNumber}
                                          showIntegralInfo={this.showIntegralInfo}
                                          deleteIntegral={this.deleteIntegral}>
                            </IntegralList>

                            {(isShowAddNumber || isShowIntegralInfo || isShowAddNew) &&
                            <IntegralShow type={this.state.viewType}
                                          id={this.state.viewParam}
                                          resList={this.resList}
                                          data={this.state.viewData}
                                          resData={this.props.integral.resList.content}
                                          resTotal={this.props.integral.resList.totalElements}
                                          addIntegral={this.addIntegral}
                                          reset={this.reset}
                                          submit={this.submit}
                            />}

                        </TabPane>
                        <TabPane tab={'积分设置'} key="1">
                            <Card title="交易积分设置" style={{'margin': '15px'}}>
                                <SettingIntegralForm
                                    updateIntegralExchange={this.updateIntegralExchange}
                                    reset={this.reset}
                                    dataIntegral={dataIntegral}
                                />
                            </Card>
                        </TabPane>
                    </Tabs>
                </Card>

                <Modal visible={this.state.visible}
                       width="960px"
                       footer={null}
                       onCancel={this.handleCancel}>
                    <Img src="asset/integral.png" alt="流程图" className="integral-img"/>
                </Modal>
            </div>
        );
    }
}
