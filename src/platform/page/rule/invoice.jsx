import React from 'react';
import PageBase from 'common/base/PageBase';
import {message,Card,Button,Modal} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ruleAction from '../../store/rule/action';
import InvoiceRuleList from './component/InvoiceRuleList';
import InvoiceRuleForm from './component/InvoiceRuleForm';

@connect(
    state => ({
        operation: state.operation,
        rule:state.rule.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...ruleAction
        }, dispatch)
    })
)
export default class InvoiceIndex extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        list:{},
        viewParam: null,
        viewData:null
    };

    componentDidMount() {
        this.list(0);
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case ruleAction.GET_INVOICE_RULE_LIST_SUCCESS:
                this.setState({
                    list: nextProps.rule.invoice.list
                });
                break;
            case ruleAction.GET_INVOICE_RULE_SUCCESS:
                this.setState({
                    viewData: nextProps.rule.invoice.item
                });
                break;
            case ruleAction.ADD_INVOICE_RULE_SUCCESS:
                message.success('添加成功！');
                this.list(0);
                this.reset();
                break;
            case ruleAction.UPDATE_INVOICE_RULE_SUCCESS:
                message.success('修改成功！');
                this.list(0);
                this.reset();
                break;
            case ruleAction.DELETE_INVOICE_RULE_SUCCESS:
                message.success('删除成功！');
                this.list(0);
                break;
            case ruleAction.SWITCH_INVOICE_RULE_STATUS_SUCCESS:
                message.success('操作成功！');
                this.list(0);
                break;
            default:
                break;
        }
    }

    add = () => {
        this.showView('form', null, {});
    };

    edit = (id) => {
        this.showView('form', id);
        this.getInvoiceRule(id);
    };

    list=(page,size)=>{
        this.getInvoiceRuleList({
            page,
            size
        });
    };

    getInvoiceRuleList = (params)=>{
        this.props.actions.getInvoiceRuleList(params);
    };

    getInvoiceRule = (id)=>{
        this.props.actions.getInvoiceRule(id);
    };

    deleteInvoiceRule = (id)=>{

        Modal.confirm({
            title: '警告',
            content: '你正要删除该规则，确定吗？',
            onOk:()=>this.props.actions.deleteInvoiceRule(id),
            onCancel(){

            },
            okText: '确定',
            cancelText: '取消'
        });

    };

    addInvoiceRule = (data)=>{
        this.props.actions.addInvoiceRule(data);
    };

    updateInvoiceRule = (params)=>{
        this.props.actions.updateInvoiceRule(params);
    };

    switchInvoiceRuleStatus = (params)=>{

        let ruleStatus = {
            'FALSE':'TRUE',
            'TRUE':'FALSE'
        };

        let data = {
            id:params.id,
            status:ruleStatus[params.ruleStatus]
        };

        this.props.actions.switchInvoiceRuleStatus(data);

    };

    render() {

        const {operation} = this.props;

        const {list,viewParam,viewData} = this.state;

        const extra = (<Button type="primary" icon="plus" onClick={this.add}>新增</Button>);

        let isListLoading = operation.type == ruleAction.GET_INVOICE_RULE_LIST_PENDING;

        // 是否显示form
        const isShowInvoiceForm = this.isShowView('form');


        return (
            <div className="app-page">
                <Card title="发票规则" extra={extra}>
                    <InvoiceRuleList
                        data={list}
                        loading={isListLoading}
                        list={this.list}
                        edit={this.edit}
                        switchInvoiceRuleStatus={this.switchInvoiceRuleStatus}
                        deleteInvoiceRule={this.deleteInvoiceRule}
                    />
                    {isShowInvoiceForm && <InvoiceRuleForm
                        param={viewParam}
                        data={viewData}
                        visible={isShowInvoiceForm}
                        addInvoiceRule={this.addInvoiceRule}
                        updateInvoiceRule={this.updateInvoiceRule}
                        reset={this.reset}
                    />}
                </Card>
            </div>
        );
    }
}




