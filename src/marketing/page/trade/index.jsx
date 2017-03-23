import React from 'react';
import PageBase from 'common/base/PageBase';
import {message,Card} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as tradeAction from '../../store/trade/action';
import * as statAction from '../../store/stat/action';
import TradeCard from './component/TradeCard';
import TradeList from './component/TradeList';
import TradeShow from './component/TradeShow';
import TradeForm from './component/TradeForm';

@connect(
    state => ({
        trade: state.trade.toJS(),
        stat: state.stat.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...tradeAction,
            ...statAction
        }, dispatch)
    })
)

export default class TradeIndex extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        viewType: 'list',
        viewParam: null,
        viewData: null
    };

    componentDidMount() {

        this.list(0);
        this.props.actions.getDataProductTotalSales(this.props.params.type);

    }

    //获取交易列表
    list = (page, size)=> {

        this.props.actions.getTradeList({
            buyType: this.props.params.type,
            page,
            size
        });
    };

    componentDidUpdate(prevProps) {
        // respond to parameter change in scenario 3
        let oldType = prevProps.params.type;
        let newType = this.props.params.type;
        if (newType !== oldType) {
            this.list(0);
            this.props.actions.getDataProductTotalSales(this.props.params.type);

        }

    }

    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;
        switch (operation.type) {

            case tradeAction.UPDATE_TRADE_LOGISTIC_SUCCESS:
                message.success('提交成功！');
                this.list(0);
                this.reset();
                break;
            case tradeAction.UPDATE_TRADE_LOGISTIC_STATUS_SUCCESS:
                message.success('收货成功！');
                this.list(0);
                this.reset();
                break;

        }
    }

    //提交暂不刷新
    save = (data, record) => {

        this.props.actions.updateTradeLogistics(data, this.props.params.type, record.id);

    };

    //收货暂不刷新
    confirmDelete = (data)=> {

        this.props.actions.updateTradeLogisticsStatus(this.props.params.type, data.record.id);

    };

    //提交表单
    submit = (id)=> {
        this.showView('submit', id, {});
    };

    showConsignee = (id)=> {
        this.showView('showConsignee', id, {});
    };

    showLogistics = (id)=> {
        this.showView('showLogistics', id, {});
    };

    render() {

        const item = this.state.viewParam ? this.props.trade.items[this.state.viewParam] : null;

        // 是否显示modal
        const isShowConsignee = this.isShowView('showConsignee');

        // 是否显示modal
        const isShowLogistics = this.isShowView('showLogistics');

        // 是否显示form
        const isSubmit = this.isShowView('submit');

        if (!this.props.trade.list) {
            return null;
        }

        return (
            <div className="app-page" style={{'height':'100%'}}>
                <Card title="交易管理" style={{'height':'100%','overflowY':'scroll'}}>
                    <TradeCard data={this.props.stat.totalSales}
                               type={this.props.params.type}/>
                    <br/>
                    <TradeList data={this.props.trade.list.content}
                               total={this.props.trade.list.totalElements}
                               list={this.list}
                               buyType={this.props.params.type}
                               submit={this.submit}
                               confirmDelete={this.confirmDelete}
                               showConsignee={this.showConsignee}
                               showLogistics={this.showLogistics}/>
                </Card>

                {(isShowLogistics || isShowConsignee) &&
                <TradeShow
                    type={this.state.viewType}
                    data={item}
                    reset={this.reset}
                />}
                {isSubmit && <TradeForm
                    type={this.state.viewType}
                    data={item}
                    reset={this.reset}
                    save={this.save}/>}
            </div>
        );
    }


}





