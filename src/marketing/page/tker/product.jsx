import React from 'react';
import {bindActionCreators} from 'redux';
import PageBase from 'common/base/PageBase';
import {connect} from 'react-redux';

import {
    message,
    Card,
    Modal,
    Button,
} from 'antd';
import {withRouter} from 'react-router';
import SearchInput from 'common/component/SearchInput';
import TkerProductList from './component/TkerProductList';
import TkerFenRunDetails from './component/TkerFenRunDetails';
import TkerProductEnableList from './component/TkerProductEnableList';
import TkerProductExtra from './component/TkerProductExtra';
import TkerFenRunSetting from './component/TkerFenRunSetting';
import * as productAction from '../../store/product/action';
import * as tkerAction from '../../store/tker/action';
import _ from 'lodash';

// 代言商品
@connect(
    state => ({
        product: state.product.toJS(),
        tker: state.tker.toJS(),
        operation: state.operation,
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...productAction,
            ...tkerAction,
        }, dispatch)
    })
)

@withRouter

export default class TKerProduct extends PageBase {

    state = {
        name: '',
        page: 0,
        size: 5,
        list: [],

        viewType: 'init',
        viewParam: null,
        viewData: null,

        // 平台代言利润
        settingData: null,

        // 接口返回处理
        callbackType: '',

        // 客户代言总数据
        tkerData: null,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.list();
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;

        switch (operation.type) {

            case productAction.GET_MANAGER_PRODUCT_TKER_LIST_SUCCESS:
                this.setState({
                    list: nextProps.product.list
                });
                break;

            // 获取商品推客代言数据
            case productAction.GET_MANAGER_DATA_TKER_SUCCESS:
                if (this.state.viewParam) {

                    let data = {},
                        tradeData = null,
                        tkerData = null,
                        item = nextProps.product.items[this.state.viewParam],
                        tkerItem = nextProps.product.tkerItem;

                    if (_.has(tkerItem, 'opdata.tkerData')) {
                        tkerData = tkerItem.opdata.tkerData;
                    }

                    if (_.has(item, 'opdata.tradeData')) {
                        tradeData = item.opdata.tradeData;
                    }

                    data = {
                        ...item,
                        opdata: {
                            tradeData,
                            tkerData,
                        },
                        tkerConfig: nextProps.product.tkerItem.tkerConfig,
                    };

                    this.setState({
                        viewData: data
                    });
                }
                break;

            // 获取代言设置信息
            case tkerAction.GET_MANAGER_TKER_CONFIG_SUCCESS:
                this.setState({
                    settingData: nextProps.tker.settingData
                });
                break;

            // 获取可开通代言商品
            case productAction.GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_SUCCESS:
                this.setState({
                    viewData: nextProps.product.tkerEnableList,
                });
                break;

            // 增加商品到推客平台
            case productAction.ADD_MANAGER_PRODUCT_TKER_SUCCESS:
                message.success('添加成功！');
                this.reset();
                this.list();
                break;

            // 修改代言配置
            case productAction.UPDATE_MANAGER_PRODUCT_TKER_SUCCESS:
                message.success('保存成功');
                this.reset();
                this.list();
                break;
        }
    }

    // 显示view
    showView(viewType, viewParam, viewData) {
        this.setState({
            viewType: viewType,
            viewParam: viewParam,
            viewData: viewData,
        });
    }


    // 是否显示viewType
    isShowView(viewType) {
        return this.state.viewType == viewType && this.state.viewData != null;
    }

    // 重置页面
    reset = () => {
        this.setState({
            viewType: 'init',
            viewParam: null,
            viewData: null,
            callbackType: '',
        });
    };

    // 修改表单数据后调用此方法，更新viewData的数据，防止保存数据时，返回保存数据瞬间之前
    updateFormData = (formData) => {
        this.setState({
            viewData: formData
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
        this.props.actions.getManagerProductTkerList({
            page,
            size: size,
            name: this.state.name,
            ...params
        });
    };

    // 已开能商品列表搜索
    handleSearch = (val) => {
        this.setState({
            name: val
        }, () => this.list());
    };

    // 添加代言商品列表商品
    add = () => {
        this.showView('add', '');
        this.getTkerList(0, '');
    };

    // 获取可开通商品
    getTker = (id) => {
        this.props.actions.getManagerProductDataTker(id);
    };

    // 获取可代言商品列表列表
    getTkerList = (page, name) => {
        this.props.actions.getManagerProductTkerEnableList({
            page,
            size: 5,
            name,
        });
    };

    // 添加代言商品
    addTkerEnable = (productIds) => {
        this.props.actions.addManagerProductTker(productIds);
    };

    // 代言详情-弹出
    showTkerDetails = (id) => {
        this.showView('TkerFenRunDetails', id);
        this.getTker(id);
    };

    // 代言分润设置-弹出
    editSetting = () => {
        this.showView('TkerFenRunSetting', this.state.viewParam, this.state.viewData);
    };

    // 代言分润设置-返回
    onReturn = () => {
        this.showView('TkerFenRunDetails', this.state.viewParam, this.state.viewData);
    };

    // 保存代言设置
    saveSetting = (formData) => {
        // 如果没有进行设置，同不保存
        let tkerConfig = this.state.viewData.tkerConfig;
        if (
            formData.lv0ProfitRate == tkerConfig.lv0ProfitRate &&
            formData.lv1ProfitRate == tkerConfig.lv1ProfitRate &&
            formData.lv2ProfitRate == tkerConfig.lv2ProfitRate
        ) {
            this.reset();
            return;
        }

        this.props.actions.updateManagerProductTker({
            id: this.state.viewParam,
            ...formData,
        });

        this.updateFormData({
            tkerConfig: formData
        });
    };

    render() {

        const {operation} = this.props;

        // 显示代言设置窗口
        const isShowProductBuyChannelList = this.isShowView('add'),
            isShowTkerFenRunDetails = this.isShowView('TkerFenRunDetails'),
            isShowTkerFenRunSetting = this.isShowView('TkerFenRunSetting'),

            isProductBuyChannelListLoading = operation.type == productAction.ADD_MANAGER_PRODUCT_TKER_PENDING,
            isLoadingTkerFenRunSetting = operation.type == productAction.UPDATE_MANAGER_PRODUCT_TKER_PENDING,
            isLoadingList = operation.type == productAction.GET_MANAGER_PRODUCT_TKER_LIST_PENDING,
            products = _.has(this.state, 'list.totalElements') ? this.state.list.totalElements : 0;

        return (
            <div className="app-page app-page-tker-product">
                <Card>
                    <div className="tker-product-total">
                        <span style={{fontSize: '14px'}}>代言商品总计：</span>
                        <span style={{fontSize: '22px'}}>{products}</span>
                        <span style={{fontSize: '14px'}}>件</span>
                    </div>
                    <div className="tker-product-search">
                        <Button type="primary" onClick={this.add} style={{marginRight: '5px'}}>添加商品</Button>
                        <SearchInput
                            placeholder="请输入商品名称/编号"
                            onSearch={this.handleSearch}
                            style={{width: 200}}/>
                    </div>
                </Card>

                <TkerProductList
                    showTkerDetails={this.showTkerDetails}
                    loading={isLoadingList}
                    data={this.state.list}/>

                {isShowProductBuyChannelList &&
                <TkerProductEnableList
                    data={this.state.viewData}
                    list={this.getTkerList}
                    save={this.addTkerEnable}
                    reset={this.reset}
                    confirmLoading={isProductBuyChannelListLoading}/>
                }

                {isShowTkerFenRunDetails &&
                <Modal
                    title={<TkerProductExtra
                        data={this.state.viewData}/>}
                    onOk={this.reset}
                    onCancel={this.reset}
                    visible={true}
                    width={1200}
                    footer={[
                        <Button
                            key="reset"
                            size="large"
                            onClick={this.reset}>返回</Button>
                    ]}>
                    <TkerFenRunDetails
                        onSetting={this.editSetting}
                        tkerData={this.state.viewData.opdata.tkerData}
                        model="show"
                        settingData={this.state.viewData.tkerConfig}/>
                </Modal>
                }

                {isShowTkerFenRunSetting &&
                <TkerFenRunSetting
                    model="show"
                    profit={this.state.viewData.profits}
                    data={this.state.viewData.tkerConfig}
                    loading={isLoadingTkerFenRunSetting}
                    onCancel={this.reset}
                    onReturn={this.onReturn}
                    onSave={this.saveSetting}/>
                }
            </div>
        );
    }
}

