import React from 'react';
import PageBase from 'common/base/PageBase';
import {Tabs, Button, message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NotificationList from './component/NotificationList';
import NotificationForm from './component/NotificationForm';
const TabPane = Tabs.TabPane;
import * as notificationAction from '../../store/notice/action';
@connect(
    state => ({
        operation: state.operation,
        notice: state.notice.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...notificationAction
        }, dispatch)
    })
)
export default class AutomaticNotificationTemplate extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        viewType: 'list',
        viewParam: null,
        viewData: null,
        status: 'edit'//edit || add
    };

    componentDidMount() {
        this.getNoticeList(0);
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case notificationAction.ADD_NOTICE_SUCCESS:
                message.success('添加成功');
                this.reset();
                this.getNoticeList(0);
                break;
            case notificationAction.UPDATE_NOTICE_SUCCESS:
                message.success('修改成功');
                this.reset();
                this.getNoticeList(0);
                break;
            case notificationAction.GET_NOTICE_DETAIL_SUCCESS:
                this.showView('showAddModal', null, nextProps.notice.noticeDetail);
                break;
        }
    }

    showAddModal = () => {
        this.setState({status: 'add'});
        this.showView('showAddModal', null, {});
    }
    //show update modal 编辑
    showUpdateModal = (record) => {
        this.setState({status: 'edit'});
        this.getNoticeDetail(record.id);
    }

    getNoticeList = (page, size) => {
        this.props.actions.getNoticeList({page, size});
    }

    addNotice = (params) => {
        this.props.actions.addNotice(params);
    }
    updateNotice = (id, params) => {
        this.props.actions.updateNotice(id, params);
    }
    getNoticeDetail = (id) => {
        this.props.actions.getNoticeDetail(id);
    }

    render() {
        const addBar = (
            <Button type='primary' onClick={this.showAddModal}>新增</Button>);
        const isShowAddModal = this.isShowView('showAddModal');
        const {list} = this.props.notice;
        return (
            <div className='app-page app-page-automaticNotification  app-page-white'>
                <Tabs defaultActiveKey='1' tabBarExtraContent={addBar}>
                    <TabPane tab='通知模板' key='1'>
                        <NotificationList list={this.getNoticeList} dataSource={list}
                                          showUpdateModal={this.showUpdateModal}/>
                    </TabPane>
                </Tabs>
                {
                    isShowAddModal &&
                    <NotificationForm visible={isShowAddModal}
                                      updateNotice={this.updateNotice}
                                      addNotice={this.addNotice}
                                      status={this.state.status}
                                      reset={this.reset} viewData={this.state.viewData}/>
                }
            </div>
        );
    }
}
