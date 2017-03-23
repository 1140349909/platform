import React from 'react';
import PageBase from 'common/base/PageBase';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ModuleHeader from './component/ModuleHeader';
import * as moduleAction from '../../store/module/action';
import config from 'common/config';
@connect(
    state => ({
        operation: state.operation,
        module: state.module.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...moduleAction
        }, dispatch)
    })
)
export default class extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        page: 0,
        size: config.SIZE,
        tagIds: '',
        viewType: 'list',
        viewParam: null,
        viewData: null
    }

    componentDidMount() {
        this.list({
            page: 0
        });
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            default:
                break;
        }
    }

    list(params) {
        this.setState(params, ()=> {
            this.props.actions.getPlatformModuleList({
                page: this.state.page,
                size: this.state.size,
                tagIds: this.state.tagIds
            });
        });
    }

    render() {
        return (
            <div className="app-page">
                <ModuleHeader activeKey="/module/role"/>
                业务角色配置 - 正在建设中
            </div>
        );
    }
}




