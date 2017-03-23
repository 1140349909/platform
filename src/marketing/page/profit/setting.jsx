import React from 'react';
import PageBase from 'common/base/PageBase';
import {} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ProfitWithdrawalSetting from './component/ProfitWithdrawalSetting';
import  './setting.less';

@connect(
    state => ({
        operation: state.operation,
    }),
    dispatch => ({
        actions: bindActionCreators({}, dispatch)
    })
)

export default class Setting extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {};

    render() {
        return (
            <div className="app-page app-page-profit-setting">
                <ProfitWithdrawalSetting/>
            </div>
        );
    }
}


