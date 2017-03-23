import React from 'react';
import PageBase from 'common/base/PageBase';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import StatBody from './component/StatBody';

// TODO:[功能未实现]
@connect(
    dispatch => ({
        actions: bindActionCreators({}, dispatch)
    })
)
export default class StatIndex extends PageBase {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-page">
                <StatBody/>
            </div>
        );
    }
}

