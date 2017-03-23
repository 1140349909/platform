import React from 'react';
import PageBase from 'common/base/PageBase';
import {Card, Steps, message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as tkerAction from '../../store/tker/action';
import TkerFenRunDetails from './component/TkerFenRunDetails';
import TkerFenRunSetting from './component/TkerFenRunSetting';
import TkerTopProductList from './component/TkerTopList/ProductList';
import TkerTopMemberList from './component/TkerTopList/MemberList';
const Step = Steps.Step;

// 代言设置
@connect(
    state => ({
        tker: state.tker.toJS(),
        operation: state.operation,
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...tkerAction
        }, dispatch)
    })
)

export default class TKerConfig extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        viewType: 'init',
        viewParam: null,
        viewData: null,

        // 代言设置数据
        settingData: null,

        // 客户代言平台汇总数据
        tkerData: null,

        // 会员TOP列表
        memberTopList: [],

        // 商品TOP列表
        productTopList: [],
    };

    componentDidMount() {
        this.props.actions.getManagerTkerConfig();
        this.props.actions.getManagerTkerDataTotal();
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {

            // 获取代言设置信息
            case tkerAction.GET_MANAGER_TKER_CONFIG_SUCCESS:
                if (nextProps.tker.settingData) {
                    this.props.actions.getManagerTkerMemberTop();
                    this.props.actions.getManagerTkerProductTop();
                }
                this.setState({
                    settingData: nextProps.tker.settingData
                });
                break;

            // 配置代言设置
            case tkerAction.UPDATE_MANAGER_TKER_CONFIG_SUCCESS:
                this.props.actions.getManagerTkerConfig();
                message.success('保存成功');
                this.reset();
                break;

            // 获取客户代言平台汇总数据
            case tkerAction.GET_MANAGER_TKER_DATA_TOTAL_SUCCESS:
                this.setState({
                    tkerData: nextProps.tker.tkerData
                });
                break;

            // 会员TOP列表
            case tkerAction.GET_MANAGER_TKER_MEMBER_TOP_SUCCESS:
                this.setState({
                    memberTopList: nextProps.tker.memberTopList,
                });
                break;

            // 商品TOP列表
            case tkerAction.GET_MANAGER_TKER_PRODUCT_TOP_SUCCESS:
                this.setState({
                    productTopList: nextProps.tker.productTopList,
                });
                break;
        }
    }


    // 修改表单数据后调用此方法，更新viewData的数据，防止保存数据时，返回保存数据瞬间之前
    updateFormData = (formData) => {
        this.setState({
            viewData: formData
        });
    };

    // 是否显示viewType去除判断Null
    isShowViewNull(viewType) {
        return this.state.viewType == viewType;
    }

    // 编辑代言设置窗口
    editSetting = () => {
        this.showView('TkerFenRunSetting', null, this.state.settingData);
    };

    // 保存代言设置
    saveSetting = (formData) => {
        this.props.actions.updateManagerTkerConfig(formData);
        this.updateFormData(formData);
    };

    render() {

        const {operation} = this.props;

        // 显示代言设置窗口
        const isShowTkerFenRunSetting = this.isShowViewNull('TkerFenRunSetting');

        const tkerFenRunSettingLoading = operation.type == tkerAction.UPDATE_MANAGER_TKER_CONFIG_PENDING;
        const isLoadingtkerTopProductList = operation.type == tkerAction.GET_MANAGER_TKER_PRODUCT_TOP_PENDING;
        const isLoadingtkerTopMemberList = operation.type == tkerAction.GET_MANAGER_TKER_MEMBER_TOP_PENDING;

        return (
            <div className="app-page tker-config">
                <Card
                    title="代言流程"
                    className="tker-config-steps">
                    <Steps>
                        <Step title="开通代言" status="process" description="在功能模块中开通代言功能"/>
                        <Step title="代言设置" status="process" description="在代言设置中进行商品代言等级及代言酬劳分配设置"/>
                        <Step title="代言商品" status="process" description="商户从商品库挑选商品进行代言，对代言商品设置具体的酬劳分配比例"/>
                        <Step title="会员开通代言" status="process" description="会员在手机客户端开通个人代言，进行粉丝拓展和商品代言，获取代言酬劳"/>
                        <Step title="代言会员/提现管理" status="process" description="商户在会员代言中查看参与代言的会员，并处理代言提现申请"/>
                    </Steps>
                </Card>
                <TkerFenRunDetails
                    settingData={this.state.settingData}
                    tkerData={this.state.tkerData }
                    onSetting={this.editSetting}/>
                <div className="tker-config-lists">
                    <div className="tker-config-l">
                        <TkerTopProductList
                            loading={isLoadingtkerTopProductList}
                            data={this.state.productTopList}/>
                    </div>
                    <div className="tker-config-r">
                        <TkerTopMemberList
                            loading={isLoadingtkerTopMemberList}
                            data={this.state.memberTopList}/>
                    </div>
                </div>

                {isShowTkerFenRunSetting &&
                <TkerFenRunSetting
                    data={this.state.viewData}
                    loading={tkerFenRunSettingLoading}
                    onCancel={this.reset}
                    onReturn={this.onReturn}
                    onSave={this.saveSetting}/>
                }
            </div>
        );
    }
}

