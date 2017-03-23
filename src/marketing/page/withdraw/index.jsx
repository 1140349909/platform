import React from 'react';
import PageBase from 'common/base/PageBase';
import {Card, message, Tabs} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as withdrawAction from '../../store/withdraw/action';
import WithdrawList from './component/WithdrawList';
import {redirect} from 'common/util';

// 提现管理
@connect(
    state => ({
        withdraw: state.withdraw.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...withdrawAction
        }, dispatch)
    })
)
export default class WithdrawIndex extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        status:'news'
    };

    componentDidMount() {
        this.list('news', 0);
    }

    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        let {status} = this.state;

        switch (operation.type) {
            case withdrawAction.UPDATE_MANAGER_WITHDRAW_STATUS_SUCCESS:

                let result = '';

                if (nextProps.withdraw.withdrawResult.hasOwnProperty('result') && nextProps.withdraw.withdrawResult.result.err_code_des) {
                    result = nextProps.withdraw.withdrawResult.result.err_code_des;
                    message.warning(result);
                } else {
                    result = nextProps.withdraw.withdrawResult.data[0].payStatus;

                    // s0:未支付,s1支付完成,s2支付失败,s3超时支付关闭,s4主动支付取消
                    switch (result) {
                        case 's0':
                            message.info('提现未开始');
                            break;
                        case 's1':
                            message.success('提现完成');
                            break;
                        case 's2':
                            message.error('提现失败');
                            break;
                        case 's3':
                            message.warning('提现超时，已关闭');
                            break;
                        case 's4':
                            message.warn('提现取消');
                            break;
                        case 's5':
                            message.loading('正在提现中，请稍候');
                            break;
                    }
                }

                this.list(status, 0);
                break;
            case withdrawAction.UPDATE_MANAGER_WITHDRAW_CONFIRM_SUCCESS:

                let alipayUrl = nextProps.withdraw.alipayUrl;

                if (!alipayUrl) {
                    redirect(alipayUrl, '_blank');
                    message.success('操作成功！');
                }

                this.list(status, 0);
                break;

        }
    }

    // 获取提现列表
    list = (status, page, size)=> {

        this.setState({
            status: status
        });

        this.props.actions.getManagerWithdrawList({
            mobile: this.state.mobile,
            status,
            page,
            size
        });
    };

    // 根据手机号搜索提现记录
    handleSearch = (mobile) => {

        let {status} = this.state;

        this.setState({
            mobile: mobile
        }, ()=> {
            this.list(status, 0);
        });
    };

    //查询提现状态
    updateManagerWithdrawStatus = (data)=> {

        let list = [];

        if (Array.isArray(data)) {
            list = data;
        } else {
            list.push(data);
        }

        this.props.actions.updateManagerWithdrawStatus(list);

    };

    //确认操作是拒绝还是提现
    updateManagerWithdrawConfirm = (selected, value)=> {

        let data = [],
            payType = '';

        let list = [];


        //先测试单个，后期测试批量
        if (Array.isArray(selected)) {

            selected.map((item)=> {
                data.push(item.id);

                if (payType != '' && payType != item.payType) {
                    message.error('选择的支付类型不统一，请重新选择！');
                    return;
                } else {
                    payType = item.payType;
                }
            });

            list = data;

        } else {

            list.push(selected.id);
            payType = selected.payType;

        }

        let submitData = {
            'ids': list,
            // 需要选择是否通过
            'pass': value,
            // 如不通过需要说明理由
            'reason': 'test',
            // 需要统一批量提交的支付类型['wechat', 'alipay', 'unionpay', 'balance', 'integraloffset', 'unknown']
            'payType': payType,

        };


        this.props.actions.updateManagerWithdrawConfirm(submitData);

    };

    //Tab切换的onChange函数
    callback = (key)=> {
        this.list(key, 0);
    };

    render() {

        const {operation} = this.props;

        const TabPane = Tabs.TabPane;

        let {status} = this.state;

        // 是否显示loading
        const isListLoading = operation.type == withdrawAction.GET_MANAGER_WITHDRAW_LIST_PENDING;

        let tabPanelOptions = [
            {
                label: '新申请',
                value: 'news'
            }, {
                label: '正在处理',
                value: 'process'
            }, {
                label: '处理成功',
                value: 'success'
            }, {
                label: '处理失败',
                value: 'failure'
            }
        ];

        let tabPanelList = [];

        tabPanelOptions.map((item)=> {
            tabPanelList.push(
                <TabPane tab={item.label} key={item.value}>
                    {
                        item.value == status && <WithdrawList
                            data={this.props.withdraw.list}
                            status={status}
                            listLoading={isListLoading}
                            list={this.list}
                            updateManagerWithdrawStatus={this.updateManagerWithdrawStatus}
                            updateManagerWithdrawConfirm={this.updateManagerWithdrawConfirm}
                        />
                    }
                </TabPane>
            );
        });

        return (
            <div className="app-page" style={{'height':'100%'}}>
                <Card title="提现管理" extra={null} style={{'height':'100%','overflowY':'scroll'}}>
                    <Tabs onChange={this.callback} type="card" defaultActiveKey={status} animated={false}>
                        {tabPanelList}
                    </Tabs>
                </Card>
            </div>
        );
    }
}

