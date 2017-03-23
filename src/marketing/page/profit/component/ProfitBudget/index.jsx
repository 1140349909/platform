import React from 'react';
import {Card, Tabs} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';
import ProfitList from '../ProfitList';
import * as merchantAction from  '../../../../store/merchant/action';
import './index.less';
import AuthComponentBase from 'common/base/AuthComponentBase';
import _ from 'lodash';
const TabPane = Tabs.TabPane;
import DatePickerGroup from 'common/component/DatePickerGroup';


@connect(
    state => ({
        operation: state.operation,
        merchant:state.merchant.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...merchantAction
        }, dispatch)
    })
)
class ProfitBudget extends AuthComponentBase {

    constructor(props) {
        super(props);
    }
    state = {
        isLoading:true,
        key: null,
        txType: this.props.txType,
        startDate: '',
        endDate: '',
        page: 0,
        list:[],
        size:20,
        totalElements:0,
        tradeStatus:'',
        platStatus:'',
        merchatStatus:'',
    };

    // 真实的DOM被渲染出来后调用。
    componentDidMount() {
        this.getTipsHistoryList();
    }

    // 根据返回的nextProps.product.status处理回调
    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case merchantAction.GET_MERCHANT_TIPS_HISTORY_SUCCESS:
                this.setState({
                    list: nextProps.merchant.tipHistoryList.content,
                    totalElements:nextProps.merchant.tipHistoryList.totalElements,
                    isLoading:false,
                });
                break;
            case merchantAction.GET_MANAGER_MERCHANT_WITHDRAW_LIST_SUCCESS:
                this.setState({
                    list: nextProps.merchant.withdrawHistoryList.content,
                    totalElements:nextProps.merchant.withdrawHistoryList.totalElements,
                    isLoading:false,
                });
                break;

        }
    }

    getTipsHistoryList=(page,parameter)=>{

        let defaults = {
            size: this.state.size,
            page: page,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
        };
        const params = _.assign({}, defaults, parameter);
        this.setState(params);
        this.props.actions.getMerchantTipsHistory(params);
    };
    getManagerMerchantWithdrawList=(page,parameter)=>{
        this.setState({
            isLoading:true,
        });
        let defaults = {
            size: this.state.size,
            page: page,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            tradeStatus:this.state.tradeStatus,
            platStatus:this.state.platStatus,
            merchatStatus:this.state.merchatStatus,
        };
        const params = _.assign({}, defaults, parameter);
        this.setState(params);
        this.props.actions.getManagerMerchantWithdrawList(params);
    };


    /*HANDLE*/
    _handelTabsChange=(activeKey)=>{
        this.setState({
            isLoading:true,
            txType:activeKey,
        });
        if(activeKey==='tipsHistory'){
            this.getTipsHistoryList(0,{});
        }else{
            this.getManagerMerchantWithdrawList(0,{});
        }
    };
    selectedTime=(date, dateString)=>{
        if(this.state.txType==='tipsHistory'){
            this.getTipsHistoryList(0,{
                startDate:dateString[0],
                endDate:dateString[1],
            });
        }else{
            this.getManagerMerchantWithdrawList(0,{
                startDate:dateString[0],
                endDate:dateString[1],
            });
        }
    };
    disabledDate = (current) => {
        return current && current.valueOf() > Date.now();
    };


    getHtml = (type) => {
        return (
            <ProfitList
                className='invoice-list'
                inType={type}
                dataSource={this.state.list}
                totalElements={this.state.totalElements}
                size={this.state.size}
                page={this.state.page}
                getTipsHistoryList={this.getTipsHistoryList}
                getManagerMerchantWithdrawList={this.getManagerMerchantWithdrawList}
                isLoading={this.state.isLoading}
                selectedTime={this.selectedTime}
            />
        );
    };

    render() {
        const {className} = this.props;
        const classString = classnames({
            [className]: true,
            ['charge-trading']: true,
        });

        const dateFormat = 'YYYY-MM-DD';
        const operations = (
            <DatePickerGroup
                disabledDate={this.disabledDate}
                format={dateFormat}
                onChange={this.selectedTime}
            />
        );

        return (
            <Card title="收支明细"
                  className={classString}>
                <Tabs
                    tabBarExtraContent={operations}
                    defaultActiveKey={this.state.txType}
                    onChange={this._handelTabsChange}>
                    <TabPane tab="打赏明细" key="tipsHistory">
                        {this.getHtml('tipsHistory')}
                    </TabPane>
                    <TabPane tab="提现记录" key="withdrawsHistory">
                        {this.getHtml('withdrawsHistory')}
                    </TabPane>
                </Tabs>
            </Card>

        );
    }
}

ProfitBudget.defaultProps = {
    className: '',
    txType:'tipsHistory'
};

export default ProfitBudget;
