import React from 'react';
import PageBase from 'common/base/PageBase';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import  './index.less';
import NotificationList from './component/NotificationList';
import * as noticeAction from '../../store/notice/action';
import DatePickerGroup from 'common/component/DatePickerGroup';
@connect(
    state => ({
        operation: state.operation,
        notice: state.notice.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...noticeAction
        }, dispatch)
    })
)

export default class Notifications extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {};

    componentDidMount() {
        const readed = this.props.location.query.readed;
        if (readed) {
            this.readUserNoticeMessage();
        } else {
            this.getNoticeMessageList({page: 0});
        }

    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case noticeAction.GET_USER_NOTICE_SUCCESS :
                this.getNoticeMessageList({page: 0});
                break;
            case noticeAction.READ_USER_NOTICE_MESSAGE_SUCCESS:
                this.getNoticeMessageList({page: 0});
                break;
        }
    }

    disabledDate = (current) => {
        return current && current.valueOf() > Date.now();
    }
    onChange = (value, dateString) => {
        this.getNoticeMessageList({
            startDate: dateString[0],
            endDate: dateString[1]
        });
    }
    //平台消息列表 startDate  endDate page
    getNoticeMessageList = (params) => {
        this.props.actions.getNoticeMessageList(params);
    }
    //全部标记为已读
    readUserNoticeMessage = () => {
        this.props.actions.readUserNoticeMessage();
    }
    //分页查询
    onPaginationChange = (pageNum) => {
        this.getNoticeMessageList({
            page: pageNum - 1
        });
    }
    //阅读通知
    getUserNotice = (id) => {
        this.props.actions.getUserNotice(id);
    }

    render() {
        const {bsList} = this.props.notice;
        return (
            <div className='app-page app-page-notifications'>
                <div className='notifications-container'>
                    <p className='title'>重要通知</p>
                    <div className='timerPicker'>
                        <DatePickerGroup
                            format='YYYY-MM-DD'
                            disabledDate={this.disabledDate}
                            onChange={this.onChange}
                        />
                        <span className='notification-read' onClick={this.readUserNoticeMessage}>全部标记为已读</span>
                    </div>
                    <div className='notifications-list'>
                        <NotificationList data={bsList}
                                          getUserNotice={this.getUserNotice}
                                          onPaginationChange={this.onPaginationChange}/>
                    </div>
                </div>
            </div>
        );
    }
}


