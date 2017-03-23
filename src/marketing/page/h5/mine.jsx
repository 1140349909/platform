import React from 'react';
import {message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PageBase from 'common/base/PageBase';
import TabHeader from '../../component/TabHeader';
import MineH5EditTemplate from './component/MineH5EditTemplate';
import * as appAction from '../../store/app/action';
import * as hrddAction from 'common/store/hrdd/action';
import {transformArray} from 'common/util/index';
import './h5.less';
import ApiHrdd from 'common/api/hrdd';

@connect(
    state => ({
        operation: state.operation,
        app: state.app.toJS(),
        hrdd: state.hrdd.toJS(),
        activeKey: '/h5/mine/',
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...appAction,
            ...hrddAction
        }, dispatch)
    })
)
export default class MineIndex extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        page: 0,
        size: 8,
        status: 'published',
        resType: 'h5',
        dateRange: '',
        channels: '',
        sort: 'publishedDate,desc'
    }

    componentDidMount() {
        this.getAppDataList({
            resType: this.state.resType,
            status: this.props.params.status ? this.props.params.status : this.state.status,
            sort: this.props.status == 'published' ? 'publishedDate,desc' : 'lastModifiedDate,desc'
        });
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case appAction.CANCEL_APP_FROM_VSITE_SUCCESS :
                message.success('下架成功');
                this.getAppDataList({
                    status: this.props.params.status,
                });
                break;
            case appAction.DELETE_APP_DATA_SUCCESS :
                message.success('删除成功');
                this.getAppDataList({
                    resType: this.state.resType,
                    status: this.props.params.status,
                    sort: this.props.status == 'published' ? 'publishedDate,desc' : 'lastModifiedDate,desc'
                });
                break;
            case appAction.DELETE_APP_DATA_FAILURE :
                message.warn('删除失败!');
                break;
            case hrddAction.SPREAD_HONGREN_SUCCESS:
                this.setState({
                    spreadInfo: nextProps.hrdd.spreadInfo
                }, () => this.sendHongrenddLoginForm(nextProps.hrdd.spreadInfo));
                break;
        }
    }

    getAppDataList = (params) => {
        this.setState(params, () => {
            this.props.actions.getAppDataList({
                categorytype: 'my',
                editorType: null,
                page: params && params.page ? params.page : 0,
                resType: this.state.resType,
                size: this.state.size,
                status: params.status,
                dateRange: this.state.dateRange,
                channels: this.state.channels,
                sort: this.state.sort
            });
        });
    };

    loadMore = () => {
        this.getAppDataList({
            status: this.props.params.status,
            page: ++this.state.page
        });
    };
    //从V站下架
    cancelContentVSite = (id) => {
        this.props.actions.cancelAppVsite(id);
    };

    //删除资讯
    deleteAppData = (id) => {
        this.props.actions.deleteAppData(id);
    };

    spreadHongrendd = (params) => {
        this.props.actions.spreadHongrendd(params);
    };

    sendHongrenddLoginForm = (params) => {
        ApiHrdd.sendHongrenddLoginForm(params);
    };

    render() {
        const {mineList, list} = this.props.app;
        const data = transformArray(mineList);
        const status = this.props.params.status ? this.props.params.status : this.state.status;
        return (
            <div className="app-page h5Page h5-mine-container-list">
                <TabHeader h5CheckKeys={status} tabKey="h5"
                           tplCheckKeys='platform'
                           activeKey={this.props.activeKey + status}/>
                <MineH5EditTemplate list={data}
                                    listMethod={this.getAppDataList}
                                    cancelContentVSite={this.cancelContentVSite}
                                    deleteContent={this.deleteAppData}
                                    dateRange={this.state.dateRange}
                                    channels={this.state.channels}
                                    defaultValue={status}
                                    type={'h5'}
                                    h5Type={'/h5/mine/' + status}
                                    spreadHongrendd={this.spreadHongrendd}/>
                {
                    !list.last &&
                    <div className="seeMoreBtn" onClick={this.loadMore}>查看更多</div>
                }
            </div>
        );
    }
}


