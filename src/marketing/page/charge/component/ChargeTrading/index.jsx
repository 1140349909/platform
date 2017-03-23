import React from 'react';
import {Card, Tabs} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AuthComponentBase from 'common/base/AuthComponentBase';
import classnames from 'classnames';
import List from './List';
import ShowDetails from './ShowDetails';
import * as ledouAction from '../../../../store/ledou/action';
import DatePickerGroup from 'common/component/DatePickerGroup';
import _ from 'lodash';
const TabPane = Tabs.TabPane;

@connect(
    state => ({
        operation: state.operation,
        list: state.ledou.toJS().list,
    }),
    dispatch => ({
        actions: bindActionCreators({
            getTransTradeList: ledouAction.getTransTradeList,
        }, dispatch)
    })
)


class ChargeTrading extends AuthComponentBase {

    constructor(props) {
        super(props);
    }

    state = {
        key: null,
        startDate: '',
        endDate: '',
        size: this.props.size,
        type: this.props.type,
        page: 0,

        showType: null,
        viewParam: null,
        viewData: null
    };

    // 真实的DOM被渲染出来后调用。
    componentDidMount() {
        /*TODO:[coldModule: PAYMENT_ACCOUNT_CONSUME]*/
        /*TODO:[coldModule: PAYMENT_ACCOUNT_CHARGE]*/
        this._list();
    }

    // 获取列表
    _list = (page, parameter) => {

        const defaults = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            size: this.state.size,
            type: this.state.type,
            page,
        };

        const params = _.assign({}, defaults, parameter);

        this.setState(params);

        this.props.actions.getTransTradeList(params);
    }

    // tab改变处理
    _handelTabsChange = (type) => {
        this._list(0, {
            type,
        });
    }

    // 日期选择改变处理
    _handelRangePickercChange = (dates, dateStrings) => {
        this._list(0, {
            startDate: dateStrings[0].replace(/\//g, '-'),
            endDate: dateStrings[1].replace(/\//g, '-')
        });
    }

    // 查看详情
    _showDetails = (item) => {

        this.showView('showDetails', item.id, item);
    }

    _disabledTime = (current) => {
        return current && current.valueOf() > Date.now();
    }

    render() {

        const {className, operation} = this.props;

        const isLoadingList = operation.type == 'GET_LEDOU_TRADE_LIST_PENDING';

        const isShowDetails = this.isShowView('showDetails');

        const classString = classnames({
            [className]: true,
            ['charge-trading']: true,
        });

        const dateFormat = 'YYYY/MM/DD';

        const operations = (
            <DatePickerGroup
                disabledDate={this._disabledTime}
                format={dateFormat}
                onChange={this._handelRangePickercChange}/>
        );

        const listHtml = (
            <List
                list={this._list}
                page={this.state.page}
                showDetails={this._showDetails}
                loading={isLoadingList}
                type={this.state.type}
                data={this.props.list}/>
        );

        return (
            <Card title="乐豆明细"
                  className={classString}>
                <Tabs
                    tabBarExtraContent={operations}
                    defaultActiveKey={this.state.type}
                    onChange={this._handelTabsChange}>
                    <TabPane tab="消费明细" key="ledoushoping"></TabPane>
                    <TabPane tab="充值记录" key="deposit"></TabPane>
                </Tabs>

                <div>{listHtml}</div>

                {isShowDetails &&
                <ShowDetails
                    reset={this.reset}
                    type={this.state.type}
                    data={this.state.viewData}/>
                }
            </Card>
        );
    }
}

ChargeTrading.defaultProps = {

    className: '',

    type: 'ledoushoping',

    size: 20,
};

export default ChargeTrading;
