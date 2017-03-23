import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Icon} from 'antd';
import {redirect} from 'common/util';
import './index.less';
import * as distributeAction from 'common/store/distribute/action';

@connect(
    state => ({
        operation: state.operation,
        distribute: state.distribute.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...distributeAction
        }, dispatch)
    })
)

export default class ContentReleaseHistory extends Component {
    constructor(props) {
        super(props);
    }

    state = {};

    componentDidMount() {
        this.getDistributeStatus();
    }

    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        switch (operation.type) {
            case distributeAction.GET_DISTRIBUTE_STATUS_SUCCESS:
                this.setState({
                    status: nextProps.distribute.status
                });
                break;
            case distributeAction.GET_DISTRIBUTE_STATUS_FAILURE:
                this.setState({
                    status: nextProps.distribute.status
                });
                break;
        }
    }

    getDistributeStatus = () => {
        this.props.actions.getDistributeStatus();
    };

    jumpToHistory = (type) => {
        redirect('marketing.html#/history/' + type)
    };

    render() {

        const {type} = this.props;
        const {status} = this.state;
        if (status == null) {
            return null;
        }

        return (
            <div className="release-history-container">
                {status == -1 && <Icon type="exclamation-circle" style={{'color': 'red'}}/>}
                <span className="release-history-link"
                      onClick={() => this.jumpToHistory(type)}>
                    查看发布历史
                </span>
            </div>
        );
    }
}

