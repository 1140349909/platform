import React from 'react';
import {bindActionCreators} from 'redux';
import PageBase from 'common/base/PageBase';
import {message, Modal, Tabs} from 'antd';
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;

import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as productAction from '../../store/product/action';
import * as statAction from '../../store/stat/action';
import SearchInput from 'common/component/SearchInput';
import ProductList from '../../component/ProductList';
import ProductInfo from '../../component/ProductInfo';
import ProductPreview from '../../component/ProductPreview';
import ProductInfoExtra from '../../component/ProductInfoExtra';
import ProductDataCards from './component/ProductDataCards';
import ProductBasic from './component/ProductBasic';
import ProductSalesDetails from './component/ProductSalesDetails';

@connect(
    state => ({
        product: state.product.toJS(),
        stat: state.stat.toJS(),
        auth: state.auth.toJS(),
        mall: state.mall.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...productAction,
            ...statAction,
        }, dispatch)
    })
)
@withRouter
export default class List extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        name: '',
        status: 'opening',
        page: 0,
        size: 5,

        // 临时数据
        cacheData: null,

        viewType: 'list',

        // 当前参数
        viewParam: null,

        // 当前数据,
        viewData: null,

        formState: false,

        // 调用同一接口，返回处理type
        callBackType: '',

        addUrl: '/product/add'
    };

    static defaultProps = {
        config: {
            setting: '/setting'
        },
    };

    // 组件加载
    componentDidMount() {
        this.list(0);
        this.props.actions.getDataProductTotalSales('mall');
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

        // 获取销售信息
        if (this.state.viewType == 'showProductSalesDetails' && nextProps.stat.productSales !== null) {
            let data = {
                ...this.state.cacheData,
                ...nextProps.stat.productSales,
            };

            this.setState({
                viewData: data,
            });

            this.reCallBackType();
            return;
        }

        switch (operation.type) {

            case productAction.GET_PRODUCT_FAILURE:
            case productAction.UPDATE_PRODUCT_INFO_FAILURE:
            case productAction.UPDATE_PRODUCT_OPENING_FAILURE:
            case productAction.UPDATE_PRODUCT_FINISHED_FAILURE:
            case productAction.DEL_PRODUCT_FAILURE:
            case productAction.UPDATE_PRODUCT_FAILURE:
                this.reCallBackType();
                break;

            // 获取商品成功
            case productAction.GET_PRODUCT_SUCCESS:
                if (this.state.viewParam) {
                    this.setState({
                        viewData: nextProps.product.item,
                    });
                }
                break;

            // 修改详情
            case productAction.UPDATE_PRODUCT_INFO_SUCCESS:

                if (this.state.callBackType == 'infoSave') {
                    saveMsg();
                    this.reset();
                }

                if (this.state.callBackType == 'preview') {
                    this.showView('previewProduct', this.state.viewParam, this.state.viewData);
                }
                this.reCallBackType();
                this.list();
                break;

            // 上架成功
            case productAction.UPDATE_PRODUCT_OPENING_SUCCESS:
                message.success('上架成功');
                this.reCallBackType();
                this.list();
                break;

            // 下架成功
            case productAction.UPDATE_PRODUCT_FINISHED_SUCCESS:

                if (this.state.callBackType == 'basicSave') {
                    message.success('下架成功');
                    this.props.actions.getProduct(this.state.viewParam);
                } else if (this.state.callBackType == 'basicSaveFinished') {
                    this.handleSaveBasic(null, this.state.cacheData);
                } else {
                    message.success('下架成功');
                    this.list();
                    this.reset();
                    this.reCallBackType();
                }
                break;

            // 删除成功
            case productAction.DEL_PRODUCT_SUCCESS:
                message.success('删除成功！');
                this.list();
                break;

            // 基本信息更新成功
            case productAction.UPDATE_PRODUCT_SUCCESS:
                this.reset();
                if (this.state.callBackType == 'opening') {
                    this.props.actions.updateProductOpening(this.state.viewParam);
                } else if (this.state.callBackType == 'basicSave' || this.state.callBackType == 'basicSaveFinished') {
                    saveMsg();
                    this.list();
                    this.reCallBackType();

                }
                break;
        }
    }

    reCallBackType = () => {
        this.setState({
            callBackType: ''
        });
    }

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

        this.props.actions.getProducts({
            page,
            size: size,
            status: this.state.status,
            name: this.state.name,
            ...params
        });
    };

    // 新增跳转
    add = () => {
        this.props.router.push(this.state.addUrl);
    };

    // 删除商品
    del = (id) => {
        confirm({
            title: '删除商品',
            content: '确定要删除商品吗,删除后不可恢复？',
            onOk: ()=> {
                this.props.actions.delProduct(id);
            }
        });
    };

    //上架商品
    opening = (id) => {
        const item = this.props.product.items[id];
        /*
         1、商品基本信息、交易设置、交易详情已完成配置
         2、商品上架余量不可以为0
         */
        if (!item) {
            return message.error('该商品商品不存在,无法上架');
        }

        if (item.intensity <= 0) {
            return message.error('该商品商品库存余量为0，无法上架');
        }

        confirm({
            title: '商品上架',
            content: '确定上架到商城？',
            onOk: ()=> {
                this.props.actions.updateProductOpening(id);
            }
        });
    };

    //下架商品
    finished = (id) => {
        confirm({
            title: '商品下架',
            content: '商品确定下架？',
            onOk: ()=> {
                this.props.actions.updateProductFinished(id);
            }
        });
    };

    //修改商品详情
    editProductInfo = (id) => {
        this.showView('editProductInfo', id);
        this.props.actions.getProduct(id);
    };

    //修改基本信息
    editProductBasic = (id) => {
        this.showView('editProductBasic', id);
        this.props.actions.getProduct(id);
    };

    // 基本信息-保存并上架
    saveOpeningBasic = (formData, dataConversion) => {
        this.setState({
            callBackType: 'opening',
        });
        this.handleSaveBasic(formData, dataConversion);
    };

    // 基本信息-保存
    saveBasic = (formData, dataConversion) => {
        const item = this.props.product.items[this.state.viewParam];
        if (item.mallCfg.enable) {
            confirm({
                title: '修改交易设置',
                content: '商品已上架，需要下架后才可保存,是否自动下架保存',
                onOk: ()=> {
                    this.setState({
                        callBackType: 'basicSaveFinished',
                        cacheData: dataConversion,
                    });
                    this.props.actions.updateProductFinished(this.state.viewParam);
                },
                okText: '下架并保存',
            });
        } else {
            this.setState({
                callBackType: 'basicSave',
            });
            this.handleSaveBasic(formData, dataConversion);
        }
    };

    //查看销售详情
    showProductSalesDetails = (id) => {
        this.showView('showProductSalesDetails', id, null);

        this.setState({
            callBackType: 'salesDetails'
        });

        let data;
        this.props.product.list.content.map((item) => {
            if (item.id == id) {
                data = item;
                return;
            }
        });

        this.setState({
            cacheData: data,
        });

        this.props.actions.getDataProductSales({
            id
        });
    };

    // 销售详情-日期选择
    onSalesDetailsDatePicker = (startDate, enDate) => {
        this.props.actions.getDataProductSales({
            id: this.state.viewParam,
            startDate,
            enDate,
        });

        this.setState({
            callBackType: 'salesDetails'
        });
    };

    // 销售详情-天数按钮选择
    onSalesDetailsDateRange = (type) => {
        this.props.actions.getDataProductSales({
            id: this.state.viewParam,
            dateRange: type,
        });

        this.setState({
            callBackType: 'salesDetails'
        });
    };

    // 预览-预览继续编辑
    onPreviewEdit = () => {
        this.showView('editProductInfo', this.state.viewParam, this.state.viewData);
    };

    // 预览-预览完成
    onPreviewDone = () => {
        this.reset();
    };

    // 商品详情-保存
    saveProductInfo = (formData, dataConversion) => {
        this.setState({
            callBackType: 'infoSave',
        });
        this.handleSaveInfo(formData, dataConversion);
    };

    // 商品详情-保存并预览
    previewProduct = (formData, dataConversion) => {
        this.setState({
            callBackType: 'preview',
        });
        this.handleSaveInfo(formData, dataConversion);
    };

    // 复制新增
    copyAdd = (id) => {
        this.props.router.push(this.state.addUrl + '?id=' + id);
    };

    // 商品详情-数据合并转换
    handleSaveInfo = (formData, dataConversion) => {

        let data = {
            ...this.state.viewData,
            ...dataConversion,
            mediaRes: {
                ...this.state.viewData.mediaRes,
                ...dataConversion.mediaRes,
            }
        };

        // 提交后保持表单数据同步,防止点击后，表单数据变为打开时的数据
        this.setState({
            viewData: data,
        });

        let product = {
            id: data.id,
            code: data.code,
            title: data.title,
        };

        let para = {
            ...product,
            ...dataConversion,
        };

        // 商品为上架状态，弹出是否同步商品选项
        if (this.state.viewData.mallCfg.enable) {
            para.opening = true;
            this.props.actions.updateProductInfo(para);
        } else {
            this.props.actions.updateProductInfo(para);
        }
    };

    // 基本信息保存，数据合并转换
    handleSaveBasic = (formData, dataConversion) => {
        // 合并当前数据和表单转换后的数据
        let data = {
            ...this.state.viewData,
            ...dataConversion,
            mediaRes: {
                ...this.state.viewData.mediaRes,
                ...dataConversion.mediaRes,
            }
        };

        // 提交后保持表单数据同步,防止点击后，表单数据变为打开时的数据
        this.setState({
            viewData: data,
        });

        // 修改基本信息接口数据拼接
        let product = {
            ...dataConversion,
            id: data.id,
            digest: data.digest,
            content: data.content,
            name: data.name,
            mallCfg: dataConversion.mallCfg,
            mediaRes: data.mediaRes,
        };
        this.props.actions.saveProduct(product);
    };

    // 获取不同状态的商品列表
    handleStatusChange = (status) => {
        this.setState({
            status: status
        }, ()=> {
            this.list(0);
        });
    };

    // 搜索商品
    handleSearch = (name) => {
        this.setState({
            name: name
        }, ()=> {
            this.list(0);
        });
    };

    // 跳转到第三方（基础设置）
    onLink = () => {
        this.props.router.push(this.props.config.setting);
    };

    render() {
        const searchBar = (
            <span>
                <SearchInput
                    placeholder="请输入商品名称/编号"
                    onSearch={this.handleSearch}
                    style={{width: 200}}/>
            </span>
        );

        const {operation} = this.props;

        const {viewParam} = this.state;

        // 是否显示loading
        const isProductListLoading = operation.type == productAction.GET_PRODUCTS_PENDING;

        // 是否显示修改商品详情
        const isShowEditProductInfo = this.isShowView('editProductInfo');

        // 是否显示修改基本信息
        const isShowEditProductBasic = this.isShowView('editProductBasic');

        // 是否显示预览
        const isShowPreviewProduct = this.isShowView('previewProduct');

        // 是否显示销售详情
        const isShowProductSalesDetails = this.isShowView('showProductSalesDetails');

        // 交易设置-保存loading
        const isLoadingBasicSave = this.state.callBackType == 'basicSave';

        // 交易设置-保存并上架loading
        const isLoadingOpeningBasic = this.state.callBackType == 'opening';

        // 商品详情-保存loading
        const isLoadingInfoSave = this.state.callBackType == 'infoSave';

        // 商品详情预览loading
        const isLoadingPreview = this.state.callBackType == 'preview';

        // 获取商品统计loading
        const isLoadingSalesDetails = this.state.callBackType == 'salesDetails';

        const copyShow = this.state.status == '' ? true : false;

        return (
            <div className="app-page app-page-white">
                <ProductDataCards
                    locationAdd={this.add}
                    saleTotal={this.props.stat.totalSales}/>

                <Tabs onChange={this.handleStatusChange}
                      type="card"
                      activeKey={this.state.status}
                      tabBarExtraContent={searchBar}>
                    <TabPane tab="所有商品" key=""></TabPane>
                    <TabPane tab="已上架商品" key="opening"></TabPane>
                    <TabPane tab="未上架商品" key="news"></TabPane>
                    <TabPane tab="已下架商品" key="finished"></TabPane>
                </Tabs>

                <ProductList
                    editProductInfo={this.editProductInfo}
                    editProductBasic={this.editProductBasic}
                    showProductSalesDetails={this.showProductSalesDetails}
                    data={this.props.product.list.content}
                    total={this.props.product.list.totalElements}
                    size={this.state.size}
                    list={this.list}
                    del={this.del}
                    copyAdd={this.copyAdd}
                    copyShow={copyShow}
                    opening={this.opening}
                    finished={this.finished}
                    loading={isProductListLoading}/>
                {isShowEditProductBasic &&
                <Modal
                    className="modal-top"
                    width={840}
                    maskClosable={false}
                    title={
                        <ProductInfoExtra
                            data={this.state.viewData}/>
                    }
                    visible={isShowEditProductBasic}
                    onCancel={this.reset}
                    footer={null}>

                    <ProductBasic
                        onLink={this.onLink}
                        payDisabled={true}
                        readOnly={this.state.viewData.buyChannels ? true : false}
                        saveLoading={isLoadingBasicSave}
                        saveOpeningLoading={isLoadingOpeningBasic}
                        onSave={this.saveBasic}
                        onSaveOpening={!this.state.viewData.mallCfg.enable ? this.saveOpeningBasic : null}
                        onExit={this.reset}
                        mold="show"
                        data={this.state.viewData}/>
                </Modal>
                }

                {isShowEditProductInfo &&
                <Modal
                    className="modal-top"
                    width={840}
                    maskClosable={false}
                    title={
                        <ProductInfoExtra
                            data={this.state.viewData}/>
                    }
                    visible={isShowEditProductInfo}
                    onCancel={this.reset}
                    footer={null}>

                    <ProductInfo
                        saveLoading={isLoadingInfoSave}
                        previewLoading={isLoadingPreview}
                        onOk={this.saveProductInfo}
                        onPreview={this.previewProduct}
                        onExit={this.reset}
                        mold="show"
                        data={this.state.viewData}/>
                </Modal>
                }

                {isShowPreviewProduct &&
                <ProductPreview
                    visible={isShowPreviewProduct}
                    id={viewParam}
                    uin={this.props.auth.info.uin}
                    onEdit={this.onPreviewEdit}
                    onOk={this.onPreviewOk}
                    onCancel={this.reset}
                    onDone={this.onPreviewDone}/>
                }

                {isShowProductSalesDetails &&
                <ProductSalesDetails
                    extra={
                        <ProductInfoExtra
                            data={this.state.viewData}/>
                    }
                    visible={isShowProductSalesDetails}
                    loading={isLoadingSalesDetails}
                    data={this.state.viewData}
                    onDatePicker={this.onSalesDetailsDatePicker}
                    onOk={this.onSalesDetailsDateRange}
                    onCancel={this.reset}/>
                }
            </div>
        );
    }
}

// 保存成功
const saveMsg = () => {
    message.success('保存成功！');
};
