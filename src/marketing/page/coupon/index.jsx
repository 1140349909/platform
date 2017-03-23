import React from 'react';
import PageBase from 'common/base/PageBase';
import {Modal, Button,Card} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as couponAction from '../../store/coupon/action';
import * as ilokaAction from '../../store/iloka/action';
import CouponList from './component/CouponList';
import CouponShow from './component/CouponShow';
import AuthModule from 'common/component/AuthModule';
import Img from 'common/component/Img';
import * as module from 'common/config/module';

@connect(
    state => ({
        coupon: state.coupon.toJS(),
        iloka: state.iloka.toJS(),
        operation: state.operation,
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...couponAction,
            ...ilokaAction
        }, dispatch)
    })
)

@withRouter

export default class CouponIndex extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        id: '',
        type: 'list',
        list: '',

        viewType: 'list',
        viewParam: null,
        viewData: null
    };

    componentDidMount() {
        this.list(0);
    }

    // 异步请求回调
    // 返回的nextProps.product.status处理回调
    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        switch (operation.type) {
            case couponAction.GET_COUPON_LIST_SUCCESS:
                break;
            case couponAction.GET_COUPON_SUCCESS:
                this.setState({
                    viewData: nextProps.coupon.item
                });
                break;
            case couponAction.ADD_COUPON_SUCCESS:
            case couponAction.UPDATE_COUPON_SUCCESS:
            case couponAction.DELETE_COUPON_SUCCESS:
                this.list(0);
                this.reset();
                break;
            case couponAction.GET_COUPON_RES_LIST_SUCCESS:
                this.setState({
                    viewData: nextProps.coupon.resList
                });
                break;
        }
    }

    // 获取列表
    list = (page, size)=> {

        /*this.setState({
         type: 'list'
         });*/

        this.props.actions.getCouponList({
            page,
            size
        });
    };

    // 获取资源列表
    resList = (id, page)=> {

        /*this.setState({
         type: 'resList'
         });*/

        this.props.actions.getCouponResList({
            id,
            page,
            size: 100
        });
    };

    //追加
    submit = (data, id)=> {
        this.props.actions.updateCoupon(id, data);
    };

    //删除
    deleteCoupon = (idList)=> {

        const confirm = Modal.confirm;

        const test = this;

        let submitList = [];

        for (let i = 0; i < idList.length; i++) {
            submitList.push(idList[i].id);
        }

        confirm({
            title: '确认删除优惠券吗？',
            content: '删除后不可恢复。',
            onOk() {

                test.props.actions.deleteCoupon(submitList.toString());


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

    //样式对话框隐藏
    handleCancel = ()=> {
        this.setState({
            visible: false
        });
    };

    //跳转添加新优惠券
    jumpToAdd = ()=> {
        this.props.router.push('/coupon/add');
    };

    //显示设置追加数量
    showAddNumber = (id)=> {
        this.showView('showAddNumber', id);
        this.props.actions.getCoupon(id);
    };

    //显示投放详情
    showCouponInfo = (id)=> {
        this.showView('showCouponInfo', id);
        this.props.actions.getCouponResList({
            id: id,
            size: 100
        });
    };

    // 使用产品功能
    useModule = (type,success,failure)=> {
        this.anyWhereModule(type).then(success,failure);
    };


    render() {

        const {operation} = this.props;

        // const TabPane = Tabs.TabPane;

        // 是否显示form
        const isShowAddNumber = this.isShowView('showAddNumber');

        // 是否显示form
        const isShowCouponInfo = this.isShowView('showCouponInfo');

        const operations = (
            <div style={{'margin': '-10px'}}>
                <AuthModule type={module.MPLUGIN_COUPON_CREATE}>
                    <Button className="button-style" type="primary" size="large" onClick={()=>this.useModule(module.MPLUGIN_COUPON_CREATE,this.showModal)}>
                        查看示例
                    </Button>
                </AuthModule>
                <AuthModule type={module.MPLUGIN_COUPON_CREATE}>
                    <Button className="button-style" type="primary" size="large" onClick={()=>this.useModule(module.MPLUGIN_COUPON_CREATE,this.jumpToAdd)}>
                        + 添加优惠券
                    </Button>
                </AuthModule>
            </div>
        );

        // 是否显示loading
        const isListLoading = operation.type == couponAction.GET_COUPON_LIST_PENDING;

        return (
            <div className="app-page" style={{'height':'100%'}}>
                <Card title="优惠券管理" style={{'height':'100%','overflowY':'scroll'}} extra={operations}>
                    <CouponList data={this.props.coupon.list.content}
                                total={this.props.coupon.list.totalElements}
                                list={this.list}
                                loading={isListLoading}
                                showAddNumber={this.showAddNumber}
                                showCouponInfo={this.showCouponInfo}
                                deleteCoupon={this.deleteCoupon}>
                    </CouponList>
                </Card>

                {(isShowAddNumber || isShowCouponInfo) &&
                <CouponShow type={this.state.viewType}
                            id={this.state.viewParam}
                            data={this.state.viewData}
                            resList={this.resList}
                            resTotal={this.props.coupon.resList.totalElements}
                            resData={this.props.coupon.resList.content}
                            reset={this.reset}
                            submit={this.submit}
                />}
                <Modal visible={this.state.visible}
                       width="960"
                       footer={''}
                       onCancel={this.handleCancel}>
                    <Img src="img/coupon.png" alt="流程图" style={{'width': '100%', 'height': 'auto'}}/>
                </Modal>
            </div>
        );
    }
}
