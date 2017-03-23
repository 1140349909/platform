import React from 'react';
import PageBase from 'common/base/PageBase';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ChargeAccount from './component/ChargeAccount';
import ChargeTrading from './component/ChargeTrading';
import  './list.less';

@connect(
    state => ({
        operation: state.operation,
    }),
    dispatch => ({
        actions: bindActionCreators({
        }, dispatch)
    })
)

export default class List extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {};

    render() {
        return (
            <div className="app-page app-page-charge-list">
                <ChargeAccount/>
                <ChargeTrading className="charge-list-trading"/>
            </div>
        );
    }
}


