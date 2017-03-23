import React from 'react';
import PageBase from 'common/base/PageBase';
import {Row,Col ,Button,message,Modal} from 'antd';
import * as invoiceAction from '../../store/invoice/action';
import * as ledouAction from '../../store/ledou/action';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import  './add.less';
import classNames from 'classnames';
import  InvoiceCard from './component/InvoiceCard';
import  {StepOne,StepTwo} from './component/InvoiceDemand';
import * as module from 'common/config/module';
import _ from 'lodash';
@connect(
    state => ({
        operation: state.operation,
        invoice: state.invoice.toJS(),
        tradeList: state.ledou.toJS().list,
        items: state.ledou.toJS().items,
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...invoiceAction,
            ...ledouAction
        }, dispatch)
    })
)

@withRouter

export default class Add extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        /*控制页面*/
        isLoading:true,
        onOff:false,
        addressList:[],
        hasSelectedData:'',
        id:'',
        step:1,
        /*发票设置*/
        isSetting:false,
        invoiceSettingInf: {},
        /*发票索取*/
        tradeList:[],
        items:{},
        selectedRowKeys:[],
        selectedRows:[],
        dateRange:'',
        startDate: '',
        endDate: '',
        size: 10,
        page:0,
        type: 'invoice',
        pagination:{},
        totalPrice:0,
        invoiceRule:{},
        /*弹窗*/
        viewType: 'list',
        viewParam: '',
        viewData: null,

    };

    // 在完成首次渲染之前调用，此时仍可以修改组件的state。
    componentWillMount() {

    }
    // 真实的DOM被渲染出来后调用。
    componentDidMount() {
        this.getIsConfigInvoice();
    }

    // 组件接收到新的props时调用，并将其作为参数nextProps使用，此时可以更改组件props及state
    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            // 发票是否设置
            case invoiceAction.GET_ISCONFIG_INVOICE_SUCCESS:
                this.setState({
                    isSetting: nextProps.invoice.invoiceIsSetting.settting,
                    onOff:true,
                });
                if(nextProps.invoice.invoiceIsSetting.settting){
                    this.getConfigInvoice();
                    this._list();
                }
                break;
            case invoiceAction.GET_ISCONFIG_INVOICE_FAILURE:
                this.setState({
                    isSetting: nextProps.invoice.invoiceIsSetting.settting,
                    isLoading:false,
                    onOff:true
                });
                break;
            case invoiceAction.GET_CONFIG_INVOICE_SUCCESS:
                this.setState({
                    invoiceSettingInf: nextProps.invoice.invoiceSettingInf,
                });
                let ruleId = nextProps.invoice.invoiceSettingInf.invocieType;
                if(ruleId=='special'){
                    ruleId = 'BILL_SPECIAL';
                }else if(ruleId=='normal'){
                    ruleId = 'BILL_NORMAL';
                }
                this.getInvoiceRuleType(ruleId);
                break;
            case invoiceAction.GET_LEDOU_TRADE_LIST_SUCCESS:
                this.setState({
                    tradeList: nextProps.tradeList,
                    items: nextProps.items,
                    isLoading:false,
                });
                break;
            case invoiceAction.GET_CUSTOMER_ADDRESS_SUCCESS:
                /*数据处理，地区的数据需要处理*/
                /*选中默认地址管理*/

                let id=this.state.id;
                if(id==''){
                    for(let i=0;i<nextProps.invoice.addressList.length;i++){
                        let record = nextProps.invoice.addressList[i];
                        if(record.often){
                            this.handleSelected(record);
                            break;
                        }
                    }
                }else{
                    for(let i=0;i<nextProps.invoice.addressList.length;i++){
                        let record = nextProps.invoice.addressList[i];
                        if(record.id===id){
                            this.handleSelected(record);
                            break;
                        }
                    }
                }
                this.setState({
                    addressList:nextProps.invoice.addressList,
                    isLoading:false,
                });
                break;
            case invoiceAction.ADD_CUSTOMER_ADDRESS_SUCCESS:
                this.getCustomerAddressList();
                break;
            case invoiceAction.DELETE_CUSTOMER_ADDRESS_SUCCESS:
                this.getCustomerAddressList();
                break;
            case invoiceAction.UPDATE_CUSTOMER_ADDRESS_SUCCESS:
                this.getCustomerAddressList();
                break;
            case invoiceAction.DEMAND_INVOICE_SUCCESS:
                this.props.router.push('/invoice/list');
                break;
            case invoiceAction.DEMAND_INVOICE_FAILURE:
                Modal.error({
                    title:'发票索取失败，请重新尝试',
                    content:nextProps.invoice.errMessage.errMsg,
                    onOk:()=>{

                    }
                });
                break;
            case invoiceAction.GET_RULE_TYPE_SUCCESS:
                this.setState({
                    invoiceRule: nextProps.invoice.invoiceRule
                });
                break;

        }
    }

    // 接收到新的props或者state后，进行渲染之前调用，此时不允许更新props或state
    componentWillUpdate(){}

    // 完成渲染新的props或者state后调用，此时可以访问到新的DOM元素。
    componentDidUpdate(){}

    // 组件被移除之前被调用，可以用于做一些清理工作，在componentDidMount方法中添加的所有任务都需要在该方法中撤销，比如创建的定时器或添加的事件监听器。
    componentWillUnmount(){}

    /*HANDLE*/
    handleSettingClick=()=>{
        this.props.router.push('/invoice/title');
    };

//下一步
    handleNextClick =()=>{
        this.anyWhereModule(module.PAYMENT_BILL_MANAGEMENT).then(()=> {
            this.getCustomerAddressList();
            this.setState({
                isLoading:true,
                step:2
            });
        });
    };
    //上一步
    handlePreClick=()=>{
        this.setState({
            step:1
        });
    };

    //检查发票配置
    getIsConfigInvoice = () => {
        this.props.actions.getIsConfigInvoice({
            check: true
        });
    };
    //获取发票信息
    getConfigInvoice = () => {
        this.props.actions.getConfigInvoice({
            check: false
        });
    };
    // 获取列表
    _list = (page, parameter) => {
        this.setState({
            isLoading:true,
        });
        let defaults = {
            invocieStatus:'s0',
            startDate:this.state.startDate,
            endDate:this.state.endDate,
            dateRange:this.state.dateRange,
            size: this.state.size,
            type: this.state.type,
            page:page
        };

        const params = _.assign({}, defaults, parameter);

        this.setState(params);

        this.props.actions.getTransTradeList(params);
    };
    //地址弹窗
    showAddressInf=(type,data)=>{
        if(type==='add'){
            this.showView('showAddressInf', type,{});
        }else if(type==='edit'){
            this.showView('showAddressInf', type,data);
        }
    };
    //选中操作
    handleSelected= (item) => {
        this.setState({
            hasSelectedData :item,
            id: item.id
        });
    };
    //选中变化
    onSelectChange = (selectedRowKeys, selectedRows)=> {
        /*if(selectedRowKeys.length>10){
            message.warning('最多只能选择10个');
            return;
        }*/
        let totalPrice=0;
        for(let i=0;i<selectedRowKeys.length;i++){
            let obj = this.state.items[selectedRowKeys[i]];
            totalPrice+=obj.money;
        }

        this.setState({
            selectedRowKeys, selectedRows,
            totalPrice
        });

    };
    //日期筛选
    handleDataChange=(date, dateString)=>{
        this.setState({
            totalPrice:0,
            selectedRows:[],
            selectedRowKeys:[],
            dateRange:''
        });
        this._list(0,{
            dateRange:'',
            startDate:dateString[0],
            endDate:dateString[1],
        });
    };
    //获取地址信息
    getDeliveryAddress=(data)=>{
        this.setState({
            hasSelectedData:data[0]
        });
    };
    //保存
    handleSave=()=>{
        if(this.state.hasSelectedData==''){
            message.warning('请选择收件地址');
            return;
        }
        let data = {
            address:{
                addressType:'trade_invoice',
                city: this.state.hasSelectedData.city,
                mobile: this.state.hasSelectedData.mobile,
                name: this.state.hasSelectedData.name,
                often:  this.state.hasSelectedData.often,
                postCode: this.state.hasSelectedData.postCode,
                prov: this.state.hasSelectedData.prov,
                region: this.state.hasSelectedData.region,
                street: this.state.hasSelectedData.street
            },
            money:this.state.totalPrice,
            tradeIds:this.state.selectedRowKeys,
        };
        this.props.actions.demandInvoice(data);
    };

    /*ACTION*/
    updateCustomerAddress=(id,data)=>{
        this.props.actions.updateCustomerAddress(id,data);

    };
    demandInvoice=(data)=>{
        this.props.actions.demandInvoice(data);
    };
    getInvoiceRuleType=(ruleId)=>{
        this.props.actions.getInvoiceRuleType(ruleId);
    };

    addCustomerAddress=(data)=>{
        this.props.actions.addCustomerAddress(data);

    };
    getCustomerAddressList=()=>{
        let params={
            type: 'trade_invoice',
        };
        this.props.actions.getCustomerAddressList(params);
    };
    deleteCustomerAddress=(data)=>{
        if(data.id === this.state.id){
            this.setState({
                id:'',
                hasSelectedData:''
            });
        }
        this.props.actions.deleteCustomerAddress(data.id);
    };

    render() {
        //是否显示弹窗
        const isShowAddressInf = this.isShowView('showAddressInf');

        const step1Css = classNames({
            'add-nav-step1': this.state.step===1,
            'add-nav-step1 step1active': this.state.step===2,

        });

        const step2Css = classNames({
            'add-nav-step2':  this.state.step===1,
            'add-nav-step2 step2active':  this.state.step===2,

        });
        if(!this.state.onOff){
            return <div></div>;
        }else{
            return (
                <div className="app-page app-page-invoice-add">
                    <InvoiceCard  activeKey="/invoice/add" >
                        <Row className='add-nav' style={{marginTop:'22px'}}>
                            <Col className={step1Css} span={12}>1.开票订单选择</Col>
                            <Col className={step2Css} span={12}>2.确定发票信息和地址</Col>
                        </Row>
                        { (this.state.step===1 && this.state.isSetting===false) && <div className="add-step1-tip">
                            注意！您尚未设置有效的开票信息，无法开具发票。
                            <Button onClick={this.handleSettingClick}>立刻设置</Button>
                        </div>}
                        {this.state.step===1 &&
                        <StepOne
                            handleNextClick={this.handleNextClick}
                            handleSettingClick={this.handleSettingClick}
                            data={this.state.tradeList}
                            isSetting={this.state.isSetting}
                            onSelectChange={this.onSelectChange}
                            selectedRowKeys={this.state.selectedRowKeys}
                            selectedRows={this.state.selectedRows}
                            totalPrice={this.state.totalPrice/100}
                            tradeList={this.state.tradeList}
                            list={this._list}
                            handleDataChange={this.handleDataChange}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            page={this.state.page}
                            size={this.state.size}
                            invoiceRule={this.state.invoiceRule}
                            isLoading={this.state.isLoading}
                        />
                        }
                        {/*this.state.invoiceRule.userRule.preTimesMinMoney/100*/}
                        {this.state.step===2 && this.state.totalPrice/100 >= this.state.invoiceRule.userRule.preTimesMinMoney/100 &&
                        <StepTwo
                            handlePreClick={this.handlePreClick}
                            isShowAddressInf={isShowAddressInf}
                            visible={isShowAddressInf}
                            reset={this.reset}
                            showAddressInf={this.showAddressInf}
                            param={this.state.viewParam}
                            formData={this.state.viewData}
                            entry="add"
                            invoiceSettingInf={this.state.invoiceSettingInf}
                            totalPrice={this.state.totalPrice/100}
                            selectedRowKeys={this.state.selectedRowKeys}
                            id={this.state.id}
                            hasSelectedData={this.state.hasSelectedData}
                            handleSelected={this.handleSelected}
                            getDeliveryAddress={this.getDeliveryAddress}
                            addressList={this.state.addressList}
                            getCustomerAddressList={this.getCustomerAddressList}
                            addCustomerAddress ={this.addCustomerAddress }
                            deleteCustomerAddress={this.deleteCustomerAddress}
                            updateCustomerAddress={this.updateCustomerAddress}
                            handleSave={this.handleSave}
                            isLoading={this.state.isLoading}
                        />
                        }
                    </InvoiceCard>
                </div>
            );
        }

    }
}
