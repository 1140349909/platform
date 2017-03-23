import React from 'react';
import {bindActionCreators} from 'redux';
import PageBase from 'common/base/PageBase';
import {
    message,
    Modal,
    Tabs,
    Button
} from 'antd';
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;

import './index.less';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as channelProductAction from '../../store/channelProduct/action';
import * as productAction from '../../store/product/action';
import YygProductList from './component/YygProductList';
import SearchInput from 'common/component/SearchInput';
import ProductBuyChannelList from '../../component/ProductBuyChannelList';
import ProductInfo from '../../component/ProductInfo';
import ProductPreview from '../../component/ProductPreview';
import ProductInfoExtra from '../../component/ProductInfoExtra';
import YygProductTrade from './component/YygProductTrade';

@connect(
    state => ({
        productItem: state.product.toJS().item,
        channelProduct: state.channelProduct.toJS(),
        buyChannelList: state.product.toJS().buyChannelList,
        auth: state.auth.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            addBuyChannelProduct: productAction.addBuyChannelProduct,
            getBuyChannelList: productAction.getBuyChannelList,
            getProduct: productAction.getProduct,
            ...channelProductAction,
        }, dispatch)
    })
)
@withRouter
export default class YygIndex extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        name: '',
        status: 'opening',
        page: 0,
        size: 5,

        // 临时存取数据
        cacheData: null,

        // 当前view类型
        viewType: 'list',
        // 当前参数
        viewParam: null,
        // 当前数据,
        viewData: null,

        // 用于多个功能调用同一接口，返回后执行不同处理，做为识别依据
        callbackType: 'init',

        // 渠道类型
        buyChannel: 'yyg'
    };


    // 组件加载
    componentDidMount() {
        this.list(0);
    }

    componentWillMount() {
        const status = this.props.location.query.status;
        if (status && status != this.state.status) {
            this.setState({
                status: status
            });
        }
    }

    componentDidUpdate(prevProps) {
        let oldStatus = prevProps.location.query.status;
        let newStatus = this.props.location.query.status;
        if (oldStatus != newStatus) {
            this.handleStatusChange(newStatus);
        }
    }

    // 数据更新
    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        switch (operation.type) {

            case channelProductAction.UPDATE_CHANNEL_PRODUCT_OPENING_FAILURE:
                this.reset();
                break;

            // 获取商品成功
            case channelProductAction.GET_CHANNEL_PRODUCT_SUCCESS:

                // 新上商品会获取商品库商品的单价，作为默认总币数
                if (this.state.status == 'news' && nextProps.channelProduct.item.yygCfg.credit < 1) {
                    this.setState({
                        cacheData: nextProps.channelProduct.item
                    });
                    this.props.actions.getProduct(nextProps.channelProduct.item.productId);

                } else {
                    if (this.state.viewParam) {
                        this.setState({
                            viewData: nextProps.channelProduct.item
                        });
                    }
                }
                break;

            // 获取商城商品信息
            case productAction.GET_PRODUCT_SUCCESS:
                let data = this.state.cacheData;
                data.yygCfg.credit = nextProps.productItem.mallCfg.price / 100;
                this.setState({
                    viewData: data,
                });
                break;

            // 可添加的商品列表
            case productAction.GET_BUY_CHANNEL_LIST_SUCCESS:
                this.setState({
                    viewData: nextProps.buyChannelList,
                });
                break;

            // 修改商品交易设置
            case channelProductAction.UPDATE_CHANNEL_PRODUCT_TRADE_SUCCESS:

                // 保存操作
                if (this.state.callbackType == 'save') {
                    // 交易设置修改后刷新此项参数
                    this.get(this.state.viewParam);
                    this.list();
                    this.reset();
                    saveMsg();
                }

                // 保存并上架
                if (this.state.callbackType == 'saveSubmit') {
                    // 交易设置修改后刷新此项参数
                    this.get(this.state.viewParam);
                    this.props.actions.updateChannelProductOpening(this.state.buyChannel, this.state.viewParam);
                }

                // 保存并续上架
                if (this.state.callbackType == 'continueOpening') {
                    message.success('续上架成功');
                    this.list();
                    this.reset();
                }

                break;

            // 修改图文详情
            case channelProductAction.UPDATE_CHANNEL_PRODUCT_INFO_SUCCESS:

                // 保存
                if (this.state.callbackType == 'infoSave') {
                    saveMsg();
                    this.reset();
                }
                // 保存及预览
                if (this.state.callbackType == 'preview') {
                    this.reset();
                    this.showView('previewProduct', this.state.viewParam, this.state.viewData);
                }
                this.list();
                break;

            // 添加到交易渠道成功
            case productAction.ADD_BUY_CHANNEL_PRODUCT_SUCCESS:
                message.success('添加商品成功');
                this.handleStatusChange('news');
                this.reset();
                break;

            // 上架成功
            case channelProductAction.UPDATE_CHANNEL_PRODUCT_OPENING_SUCCESS:
                message.success('上架成功');
                this.reset();
                this.list();

                break;
            // 下架成功
            case channelProductAction.UPDATE_CHANNEL_PRODUCT_FINISHED_SUCCESS:
                message.success('下架成功');
                this.list();
                break;

            // 删除成功
            case channelProductAction.DEL_CHANNEL_PRODUCT_SUCCESS:
                message.success('删除成功！');
                this.list();
                break;

            // 商品结束交易
            case channelProductAction.UPDATE_CHANNEL_PRODUCT_FINISHED_CLOSED_SUCCESS:
                message.success('操作成功！');
                this.list();
                break;
        }
    }

    // 是否显示viewType
    isShowView(viewType) {
        return this.state.viewType == viewType && this.state.viewData != null;
    }

    // 显示view
    showView(viewType, viewParam, viewData) {
        this.setState({
            viewType: viewType,
            viewParam: viewParam,
            viewData: viewData
        });
    }

    // 重置页面
    reset = () => {
        this.setState({
            viewType: 'list',
            viewParam: null,
            viewData: null,
            callbackType: 'reset',
        });
    };

    // 获取列表
    list = (page, size, params) => {
        if (!isNaN(size)) {
            this.setState({
                size
            });
        } else {
            size = this.state.size;
        }

        if (!isNaN(page)) {
            this.setState({
                page
            });
        } else {
            page = this.state.page;
        }
        if (this.state.status == 'opening') {
            this.props.actions.getProductChannelOpeningList(this.state.buyChannel, {
                page,
                size: size,
                name: this.state.name,
                ...params
            });
        } else {
            this.props.actions.getProductChannelList(this.state.buyChannel, {
                page,
                size: size,
                status: this.state.status,
                name: this.state.name,
                ...params
            });
        }
    };

    // 获取商品详情
    get = (id) => {
        this.props.actions.getChannelProduct(this.state.buyChannel, id);
    };

    // 添加商品
    add = () => {
        this.showView('add', this.state.buyChannel, {});
        this.getBuyChannelList(0, '');
    };

    // 获取列表
    getBuyChannelList = (page, name) => {
        this.props.actions.getBuyChannelList(this.state.buyChannel, {
            page,
            size: 5,
            name,
        });
    };

    // 添加指定的商品到指定的玩法购买渠道
    addBuyChannelProduct = (buyChannel, productIds) => {
        this.props.actions.addBuyChannelProduct(buyChannel, productIds);
    };

    // 移除商品
    del = (id) => {
        confirm({
            title: '删除商品',
            content: '确定要把商品从此渠道移除吗？',
            onOk: () => {
                this.props.actions.delChannelProduct(this.state.buyChannel, id);
            }
        });
    };

    // 续上架
    continueOpening = (id) => {
        const item = this.props.channelProduct.items[id];
        /*
         1、商品基本信息、交易设置、交易详情已完成配置
         2、商品上架余量不可以为0
         */
        // 参与规则未配置
        if (!item) {
            return message.error('该商品商品不存在,无法上架');
        }

        // 上架余量为0，调用修改参与规则编辑
        if (this.state.status == 'soldout') {
            confirm({
                title: '库存不足',
                content: '库存不足，请追加库存!',
                onOk: () => {
                    this.editProductTrade(id);
                }
            });
        } else if (this.state.status == 'closed') {
            this.editProductTrade(id);
        } else {
            confirm({
                title: '一元购续上架',
                content: '确定续上架到一元购？',
                onOk: () => {

                    let product = {
                        id,
                        openingAgain: true,
                        yygCfg: {
                            bidStep: item.yygCfg.bidStep,
                            credit: item.yygCfg.credit,
                            numOfOwners: item.yygCfg.numOfOwners,
                            stock: item.yygCfg.stock,
                        }
                    };

                    if (this.state.status == 'soldout') {
                        product.opening = true;
                    }
                    this.props.actions.updateChannelProductTrade(this.state.buyChannel, product);
                    this.setState({
                        callbackType: 'continueOpening'
                    });
                }
            });
        }

    };

    // 上架商品
    opening = (id) => {
        const item = this.props.channelProduct.items[id];
        /*
         1、商品基本信息、交易设置、交易详情已完成配置
         2、商品上架余量不可以为0
         */
        // 参与规则未配置
        if (!item) {
            return message.error('该商品商品不存在,无法上架');
        }

        if (!item.isImprove) {
            confirm({
                title: '商品上架',
                content: '参与规则未配置,无法上架,请先配置参与规则',
                onOk: () => {
                    this.editProductTrade(id);
                }
            });
            return;
        }

        // 上架余量为0
        if (item.intensity <= 0) {
            return message.error('该商品商品库存余量为0，无法上架');
        }

        confirm({
            title: '一元购上架',
            content: '确定上架到一元购？',
            onOk: () => {
                this.props.actions.updateChannelProductOpening(this.state.buyChannel, id);
            }
        });
    };

    // 商品下架
    finished = (id) => {
        confirm({
            title: '商品预下架',
            content: '当期结束后，下一期将不再自动上架，确定要预下架该商品吗？',
            onOk: () => {
                this.props.actions.updateChannelProductFinished(this.state.buyChannel, id);
            }
        });
    };

    // 修改商品详情
    editProductInfo = (id) => {
        this.showView('editProductInfo', id);
        this.get(id);
    };

    // 修改参与规则
    editProductTrade = (id) => {
        if (this.state.status == 'opening') {
            confirm({
                title: '修改参与规则',
                content: '商品已上架，重置参与规则后，当期不影响，将在下一期进行同步，确认重置规则？',
                onOk: () => {
                    this.showView('editProductTrade', id);
                    this.get(id);
                }
            });
        } else {
            this.showView('editProductTrade', id);
            this.get(id);
        }
    };

    // 参与规则-保存
    saveProductTrade = (data) => {
        this.setState({
            callbackType: 'save',
        });

        let product = this.handelSaveProductTrade(data);
        if (this.state.status == 'closed') {
            product.openingAgain = true;
            product.opening = false;
        }
        this.props.actions.updateChannelProductTrade(this.state.buyChannel, product);
    };

    // 参与规则-保存并提交
    saveSubmitProductTrade = (data) => {
        let callbackType,
            product = this.handelSaveProductTrade(data);

        // 预下架
        if (this.state.status == 'closed') {
            product.openingAgain = false;
            product.opening = true;
            callbackType = 'continueOpening';

            // 已售罄
        } else if (this.state.status == 'soldout') {
            product.opening = true;
            product.openingAgain = true;
            callbackType = 'continueOpening';

            // 未上架
        } else {
            callbackType = 'saveSubmit';
        }

        this.setState({
            callbackType,
        });

        this.props.actions.updateChannelProductTrade(this.state.buyChannel, product);

    };

    // 参与规则-保存数据处理
    handelSaveProductTrade = (data) => {
        // 提交后保持表单数据同步,防止点击后，表单数据变为打开时的数据

        this.setState({
            viewData: {
                ...this.state.viewData,
                ...data,
            }
        });

        let product = {
            id: this.state.viewParam,
            ...data,
        };

        return product;

    };

    // 商品详情-保存
    saveProductInfo = (formData, dataConversion) => {
        this.setState({
            callbackType: 'infoSave',
        });
        this.handleSaveInfo(formData, dataConversion);
    };

    // 商品详情-保存并预览
    previewProduct = (formData, dataConversion) => {
        this.setState({
            callbackType: 'preview',
        });
        this.handleSaveInfo(formData, dataConversion);
    };

    // 预览-预览继续编辑
    onPreviewEdit = () => {
        this.showView('editProductInfo', this.state.viewParam, this.state.viewData);
    };

    // 预览-预览继续编辑
    onPreviewEdit = () => {
        this.showView('editProductInfo', this.state.viewParam, this.state.viewData);
    };

    // 预览-预览完成
    onPreviewDone = () => {
        this.reset();
    };


    // 商品详情-数据合并转换
    handleSaveInfo = (formData, dataConversion) => {

        // 提交后保持表单数据同步,防止点击后，表单数据变为打开时的数据
        this.setState({
            viewData: {
                ...this.state.viewData,
                ...dataConversion,
            }
        });

        let data = {
            ...this.state.viewData,
            ...formData,
        };

        let product = {
            id: data.id,
            code: data.code,
            title: data.title,
        };

        let para = {
            ...product,
            ...dataConversion,
        };

        if (this.state.viewData.bizStatus == 'opening') {
            para.opening = true;
            this.props.actions.updateChannelProductInfo(this.state.buyChannel, para);
        } else {
            this.props.actions.updateChannelProductInfo(this.state.buyChannel, para);
        }
    };

    // 商品结束交易
    deleteProductFinishedClosed = (id) => {
        confirm({
            title: '商品结束交易',
            content: '执行结束商品操作，商品之后将无法进行上架活动，商品会移入已结束商品列表',
            onOk: () => {
                this.props.actions.updateChannelProductFinishedClosed(id, this.state.buyChannel);
            }
        });
    };

    // 获取不同状态的商品列表
    handleStatusChange = (status) => {
        this.setState({
            status: status
        }, () => {
            this.list(0);
        });
    };

    // 搜索商品
    handleSearch = (name) => {
        this.setState({
            name: name
        }, () => {
            this.list(0);
        });
    };

    render() {
        const {operation} = this.props;
        // 是否显示loading
        const isProductListLoading = operation.type == channelProductAction.GET_CHANNEL_PRODUCT_LIST_PENDING;
        const isProductBuyChannelListLoading = operation.type == productAction.GET_BUY_CHANNEL_LIST_PENDING;
        const isAddBuyChannelProductLoading = operation.type == productAction.ADD_BUY_CHANNEL_PRODUCT_PENDING;
        const isSaveTradeLoadingLoading = this.state.callbackType == 'save';
        const isSaveSubmitTradeLoading = this.state.callbackType == 'saveSubmit';
        const isSaveInfoLoading = this.state.callbackType == 'infoSave';
        const isPreviewLoading = this.state.callbackType == 'preview';

        // 是否显示预览
        const isShowPreviewProduct = this.isShowView('previewProduct');

        // 是否显示添加对话框
        const isShowAdd = this.isShowView('add');

        // 是否显示修改商品详情
        const isShowEditProductInfo = this.isShowView('editProductInfo');

        // 是否显示修改基本信息
        const isShowEditProductTrade = this.isShowView('editProductTrade');

        // 保存并上架是否显示
        const saveSubmitProductTrade = this.state.status == 'opening' ? null : this.saveSubmitProductTrade;

        const searchBar = (
            <span className="yyg-searchinput">
                <Button type="primary" onClick={this.add} style={{marginRight: '5px'}}>添加商品</Button>
                <SearchInput
                    placeholder="请输入商品名称/编号"
                    onSearch={this.handleSearch}
                    style={{width: 200}}/>
            </span>
        );
        return (
            <div className="app-page app-page-yyg  app-page-white">
                <Tabs onChange={this.handleStatusChange}
                      type="card"
                      activeKey={this.state.status}
                      tabBarExtraContent={searchBar}>
                    <TabPane tab="所有商品" key=""></TabPane>
                    <TabPane tab="新上商品" key="news"></TabPane>
                    <TabPane tab="待上架商品" key="suspend"></TabPane>
                    <TabPane tab="已上架商品" key="opening"></TabPane>
                    <TabPane tab="预下架商品" key="closed"></TabPane>
                    <TabPane tab="已售罄商品" key="soldout"></TabPane>
                    <TabPane tab="已结束商品" key="finished"></TabPane>
                </Tabs>

                <YygProductList
                    status={this.state.status}
                    editProductInfo={this.editProductInfo}
                    editProductTrade={this.editProductTrade}
                    deleteProductFinishedClosed={this.deleteProductFinishedClosed}
                    data={this.props.channelProduct.list.content}
                    total={this.props.channelProduct.list.totalElements}
                    size={this.state.size}
                    list={this.list}
                    del={this.del}
                    continueOpening={this.continueOpening}
                    opening={this.opening}
                    finished={this.finished}
                    loading={isProductListLoading}/>

                {isShowAdd &&
                <ProductBuyChannelList
                    buyChannel="yyg"
                    data={this.props.buyChannelList.content}
                    total={this.props.buyChannelList.totalElements}
                    size={this.props.buyChannelList.size}
                    page={this.props.buyChannelList.number}
                    list={this.getBuyChannelList}
                    save={this.addBuyChannelProduct}
                    reset={this.reset}
                    loading={isProductBuyChannelListLoading}
                    confirmLoading={isAddBuyChannelProductLoading}/>
                }

                {isShowEditProductInfo &&
                <Modal
                    className="modal-top"
                    maskClosable={false}
                    width={840}
                    title={
                        <ProductInfoExtra
                            data={this.state.viewData}/>
                    }
                    visible={isShowEditProductInfo}
                    onCancel={this.reset}
                    footer={null}>

                    <ProductInfo
                        saveLoading={isSaveInfoLoading}
                        previewLoading={isPreviewLoading}
                        onOk={this.saveProductInfo}
                        onPreview={this.previewProduct}
                        mold="show"
                        onExit={this.reset}
                        data={this.state.viewData}/>
                </Modal>
                }

                {isShowEditProductTrade &&
                <YygProductTrade
                    saveSubmitLoading={isSaveSubmitTradeLoading}
                    saveLoading={isSaveTradeLoadingLoading}
                    data={this.state.viewData}
                    onCancel={this.reset}
                    onOk={this.saveProductTrade}
                    onSaveSubmit={saveSubmitProductTrade}
                    visible={isShowEditProductTrade}/>
                }

                {isShowPreviewProduct &&
                <ProductPreview
                    buyChannel="yyg"
                    uin={this.props.auth.info.uin}
                    visible={isShowPreviewProduct}
                    id={this.state.viewParam}
                    onEdit={this.onPreviewEdit}
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
