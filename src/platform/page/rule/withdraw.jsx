import React from 'react';
import PageBase from 'common/base/PageBase';
import {message, Card, Button, Modal} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ruleAction from '../../store/rule/action';
import WithdrawRuleList from './component/WithdrawRuleList';
import WithdrawRuleForm from './component/WithdrawRuleForm';

@connect(
    state => ({
        operation: state.operation,
        rule: state.rule.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...ruleAction
        }, dispatch)
    })
)
export default class WithdrawIndex extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        list: {},
        viewParam: null,
        viewData: null
    };

    componentDidMount() {
        this.list(0);
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case ruleAction.GET_WITHDRAW_RULE_LIST_SUCCESS:
                this.setState({
                    list: nextProps.rule.withdraw.list
                });
                break;
            case ruleAction.GET_WITHDRAW_RULE_SUCCESS:
                this.setState({
                    viewData: nextProps.rule.withdraw.item
                });
                break;
            case ruleAction.ADD_WITHDRAW_RULE_SUCCESS:
                message.success('添加成功！');
                this.list(0);
                this.reset();
                break;
            case ruleAction.UPDATE_WITHDRAW_RULE_SUCCESS:
                message.success('修改成功！');
                this.list(0);
                this.reset();
                break;
            case ruleAction.DELETE_WITHDRAW_RULE_SUCCESS:
                message.success('删除成功！');
                this.list(0);
                break;
            case ruleAction.SWITCH_WITHDRAW_RULE_STATUS_SUCCESS:
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
        this.getWithdrawRule(id);
    };

    list = (page, size)=> {
        this.getWithdrawRuleList({
            page,
            size
        });
    };

    getWithdrawRuleList = (params)=> {
        this.props.actions.getWithdrawRuleList(params);
    };

    getWithdrawRule = (id)=> {
        this.props.actions.getWithdrawRule(id);
    };

    deleteWithdrawRule = (id)=> {

        Modal.confirm({
            title: '警告',
            content: '你正要删除该规则，确定吗？',
            onOk: ()=>this.props.actions.deleteWithdrawRule(id),
            onCancel(){

            },
            okText: '确定',
            cancelText: '取消'
        });

    };

    addWithdrawRule = (data)=> {
        this.props.actions.addWithdrawRule(data);
    };

    updateWithdrawRule = (params)=> {
        this.props.actions.updateWithdrawRule(params);
    };

    switchWithdrawRuleStatus = (params)=> {

        let ruleStatus = {
            'FALSE': 'TRUE',
            'TRUE': 'FALSE'
        };

        let data = {
            id: params.id,
            status: ruleStatus[params.ruleStatus]
        };

        this.props.actions.switchWithdrawRuleStatus(data);
    };

    render() {

        const {operation} = this.props;

        const {list, viewParam, viewData} = this.state;

        const extra = (<Button type="primary" icon="plus" onClick={this.add}>新增</Button>);

        let isListLoading = operation.type == ruleAction.GET_WITHDRAW_RULE_LIST_PENDING;

        // 是否显示form
        const isShowWithdrawForm = this.isShowView('form');

        return (
            <div className="app-page">
                <Card title="提现规则" extra={extra}>
                    <WithdrawRuleList
                        data={list}
                        loading={isListLoading}
                        list={this.list}
                        edit={this.edit}
                        switchWithdrawRuleStatus={this.switchWithdrawRuleStatus}
                        deleteWithdrawRule={this.deleteWithdrawRule}
                    />
                    {isShowWithdrawForm && <WithdrawRuleForm
                        param={viewParam}
                        data={viewData}
                        visible={isShowWithdrawForm}
                        addWithdrawRule={this.addWithdrawRule}
                        updateWithdrawRule={this.updateWithdrawRule}
                        reset={this.reset}
                    />}
                </Card>
            </div>
        );
    }
}




