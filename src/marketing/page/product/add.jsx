import React from 'react';
import {bindActionCreators} from 'redux';
import PageBase from 'common/base/PageBase';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {message, Steps, Modal} from 'antd';
import ProductBasic from './component/ProductBasic';
import ProductInfo from '../../component/ProductInfo';
import * as media from 'common/util/media';
import ProductPreview from '../../component/ProductPreview';
import * as productAction from '../../store/product/action';
import * as customerAction from '../../store/customer/action';
import _ from 'lodash';
import './index.less';

const Step = Steps.Step;

@connect(
    state => ({
        product: state.product.toJS(),
        customer: state.customer.toJS(),
        auth: state.auth.toJS(),
        operation: state.operation,
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...productAction,
            ...customerAction,
        }, dispatch)
    })
)
@withRouter
export default class Add extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        viewData: null,
        viewParam: null,
        viewType: null,

        // 客户信息
        customerInfo: null,

        // 处理调同一接口，做不同操作的依据
        callBackType: '',

        // 表单数据
        data: null,

        // 转换对应API数据
        dataConversion: null,

        // 基本信息及商品描述状态
        pageType: 'basic',
    };

    static defaultProps = {
        config: {
            list: '/product/list',
            setting: '/setting'
        },
    };

    reCallBackType = () => {
        this.setState({
            callBackType: ''
        });
    }

    componentDidMount() {
        this.props.actions.getAdminCustomer();
        this.props.actions.getIntegralExchange();
        const id = this.props.location.query.id;
        if (id) {
            this.props.actions.getProduct(id);
        }
    }

    // 异步请求回调
    // 根据返回的nextProps.product.status处理回调
    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        switch (operation.type) {

            // 失败清空回调
            case productAction.ADD_PRODUCT_FAILURE:
            case customerAction.GET_ADMIN_CUSTOMER_SUCCESS_FAILURE:
            case productAction.GET_PRODUCT_FAILURE:
            case productAction.UPDATE_PRODUCT_FAILURE:
            case productAction.UPDATE_PRODUCT_OPENING_FAILURE:
                this.reCallBackType();
                break;

            // 获取客户信息用于判断用户是否启用第三方
            case customerAction.GET_ADMIN_CUSTOMER_SUCCESS:
                this.setState({
                    customerInfo: nextProps.customer.customerInfo,
                });
                break;

            // 获取商品成功
            case productAction.GET_PRODUCT_SUCCESS:
                let data = _getData(nextProps.product.item);
                this.setState({
                    data,
                });
                break;

            // 新增商品
            case productAction.ADD_PRODUCT_SUCCESS:
                saveMsg();

                // 数据射到dataConversion保存起来
                this.setState({
                    id: nextProps.product.item.id,
                    dataConversion: {
                        ...this.state.dataConversion,
                        ...{
                            id: nextProps.product.item.id,
                        },
                    }
                });

                // 保存后跳转列表页
                if (this.state.callBackType == 'done') {
                    this.props.router.push(this.props.config.list + '?status=news');
                }

                // 保存后预览
                if (this.state.callBackType == 'preview') {
                    this.showView('previewProduct', nextProps.product.item.id, {});
                }
                this.reCallBackType();

                break;

            // 修改商品
            case productAction.UPDATE_PRODUCT_SUCCESS:
                saveMsg();
                this.reCallBackType();
                // 保存后跳转列表页
                if (this.state.callBackType == 'done') {
                    this.props.router.push(this.props.config.list);
                }

                // 保存后预览
                if (this.state.callBackType == 'preview') {
                    this.showView('previewProduct', this.state.dataConversion.id, {});
                }
                break;

            // 上架
            case productAction.UPDATE_PRODUCT_OPENING_SUCCESS:
                this.props.router.push(this.props.config.list + '?status=opening');
                break;
        }
    }

    // 退出编辑跳转列表页
    onCancel = () => {
        Modal.confirm({
            title: '提示',
            content: '是否退出编辑状态',
            onOk: () => {
                this.props.router.push(this.props.config.list);
            }
        });
    };

    // 基本信息下一步
    onBasicOk = (formData, dataConversion) => {
        this.doDataConversion(formData, dataConversion);
        this.setState({
            pageType: 'info'
        });
    };

    // 商品详情-上一步
    onInfoPrev = (formData, dataConversion) => {
        this.doDataConversion(formData, dataConversion);
        this.setState({
            pageType: 'basic',
        });
    };

    // 商品详情-完成
    onInfoDone = (formData, dataConversion) => {
        let data = this.doDataConversion(formData, dataConversion);
        this.props.actions.saveProduct(data);
        this.setState({
            callBackType: 'done',
        });
    };

    // 商品详情-保存
    onInfoOk = (formData, dataConversion) => {
        let data = this.doDataConversion(formData, dataConversion);
        this.props.actions.saveProduct(data);
        this.setState({
            callBackType: 'save',
        });
    };

    // 商品详情-预览
    previewProduct = (formData, dataConversion) => {
        let data = this.doDataConversion(formData, dataConversion);
        this.props.actions.saveProduct(data);
        this.setState({
            callBackType: 'preview',
        });
    };

    // 商品预览-完成并上架
    onPreviewOk = () => {
        this.props.actions.updateProductOpening(this.state.viewParam);
    };

    // 商品预览-完成
    onPreviewDone = () => {
        this.props.router.push(this.props.config.list + '?status=news');
    };

    // 返回合并基本信息和产品详情API对应格式数据，并更新data及dataConversion状态
    doDataConversion = (formData, dataConversion) => {

        let stateMediaRes = this.state.dataConversion !== null ? this.state.dataConversion.mediaRes : {};
        let mediaRes = dataConversion.mediaRes;

        // 基本信息和产品详情API数据合并
        let conversion = {
            ...this.state.dataConversion,
            ...dataConversion,
            mediaRes: {
                ...stateMediaRes,
                ...mediaRes,
            },
        };

        // 表单值传给state.data
        this.setState({
            data: {
                ...this.state.data,
                ...formData,
            },
            dataConversion: conversion,
        });

        return conversion;
    };

    // 跳转到第三方（积分设置）
    onLink = () => {
        this.props.router.push('/integral');
    };

    render() {
        const {operation} = this.props;
        const {viewParam} = this.state;

        // 预览弹出层
        const isShowPreviewProduct = this.isShowView('previewProduct');

        // 预览loading
        const isLoadingProductPreview = operation.type == productAction.UPDATE_PRODUCT_PENDING;

        // 保存loading
        const isLoadingSave = this.state.callBackType == 'save';

        // 完成loading
        const isLoadingDone = this.state.callBackType == 'done';

        // 预览loading
        const isLoadingPreviewg = this.state.callBackType == 'preview';

        const isPay = _.has(this.state.customerInfo, 'weChat') || _.has(this.state.customerInfo, 'aliPay');

        return (
            <div className="app-page app-page-product-add app-page-white">
                <div className="product-add-steps">
                    <Steps current={this.state.pageType == 'basic' ? 0 : 1}>
                        <Step title="基本信息"/>
                        <Step title="商品描述"/>
                        <Step title="预览/完成"/>
                    </Steps>
                </div>

                {this.state.pageType == 'basic' &&
                <ProductBasic
                    integral={this.props.customer.integral}
                    onLink={this.onLink}
                    payDisabled={isPay}
                    data={this.state.data}
                    onCancel={this.onCancel}
                    onNext={this.onBasicOk}/>
                }

                {this.state.pageType == 'info' &&
                <ProductInfo
                    previewLoading={isLoadingPreviewg}
                    saveLoading={isLoadingSave}
                    doneLoading={isLoadingDone}
                    data={this.state.data}
                    onCancel={this.onCancel}
                    onPrev={this.onInfoPrev}
                    onOk={this.onInfoOk}
                    onPreview={this.previewProduct}
                    onDone={this.onInfoDone}/>
                }

                { isShowPreviewProduct &&
                <ProductPreview
                    visible={isShowPreviewProduct}
                    id={viewParam}
                    uin={this.props.auth.info.uin}
                    okLoading={isLoadingProductPreview}
                    onOk={this.onPreviewOk}
                    onCancel={this.reset}
                    onDone={this.onPreviewDone}/>
                }

            </div>
        );
    }
}

// 保存成功
const saveMsg = () => {
    message.success('保存成功！');
};

function _getData(data) {
    data = _.assign({}, data);
    let mallCfg = data.mallCfg;

    if (_.has(data, 'mediaRes.productImgId')) {
        // 商品封面图
        data.productImgId = {
            file: {
                response: {
                    data: data.mediaRes.productImgId
                }
            }
        };
    }

    data.coverImgId = {
        file: {
            response: {
                data: data.mediaRes.coverImgId
            }
        }
    };

    data.bannerImgs = [];

    data.mediaRes.bannerImgs.map((item, index) => {
        data.bannerImgs[index] = {
            uid: index,
            name: index,
            url: media.getMediaUrl(item),
            thumbUrl: media.getMediaUrl(item),
            response: {
                data: item,
            }
        };
    });

    data.price = 0;
    data.integral = 0;
    data.xprice = 0;
    data.xintegral = 0;

    // 现金
    if (mallCfg.enableCash) {
        data.tradingSelect = 'cash';
        data.price = mallCfg.price;

        // 允许优惠券
        if (mallCfg.enableCoupon) {
            data.enableCoupon = true;

            // 允许积分抵现
        } else if (mallCfg.enableIntegralOffset) {
            data.enableIntegralOffset = true;
        }

        // 积分
    } else if (mallCfg.enableIntegral) {
        data.tradingSelect = 'integral';
        data.integral = mallCfg.integral;

        // 现金+积分
    } else if (mallCfg.enableIntegralCash) {
        data.tradingSelect = 'cashIntegral';
        data.xprice = mallCfg.price;
        data.xintegral = mallCfg.integral;
    }

    mallCfg.issueNo = 0;
    if (mallCfg.limit == 0) {
        data.limit = '';
    } else {
        data.limit = mallCfg.limit;
    }
    return data;
}
