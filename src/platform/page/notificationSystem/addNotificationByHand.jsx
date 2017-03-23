import React from 'react';
import PageBase from 'common/base/PageBase';
/*import {Card, Button, message} from 'antd';*/
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as contentHotAction from '../../store/contentHot/action';

@connect(
    state => ({
        contentHot: state.contentHot.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...contentHotAction
        }, dispatch)
    })
)
export default class AddNotificationByHand extends PageBase {
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
    }

    componentWillReceiveProps() {
    }

    render() {
        return (
            <div className="app-page">

            </div>
        );
    }
}
