import React, {Component} from 'react';
import {withRouter, Link} from 'react-router';
import {Badge, Card} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import IconFont from 'common/component/IconFont';
import './index.less';
import Dom from 'common/util/dom';
import * as noticeAction from '../../store/notice/action';
import {dateFormat} from 'common/util';

@connect(
    state => ({
        heart: state.notice.toJS().heart
    }),
    dispatch => ({
        actions: bindActionCreators({
            readUserNoticeMessage: noticeAction.readUserNoticeMessage,
            getNoticeHeart: noticeAction.getNoticeHeart
        }, dispatch)
    })
)
@withRouter
export default class NotificationBadge extends Component {

    constructor(props) {
        super(props);
        // 30s 心跳一次, TODO:此处会刷新全局store,影响表单的数据保存
        this.time = 60 * 30;
        this.timer = null;
    }

    state = {}

    componentDidMount() {
        this.startHeart();
    }

    refresh = ()=> {
        this.props.actions.getNoticeHeart();
    }

    //全部标记为已读
    readUserNoticeMessage = () => {
        this.props.actions.readUserNoticeMessage();
    }

    startHeart = ()=> {
        this.stopHeart();

        if (this.props.heart.total == 0) {
            this.refresh();
        }

        this.timer = setTimeout(()=> {
            this.startHeart();
        }, this.time * 1000);
    }

    stopHeart = ()=> {
        clearTimeout(this.timer);
    }


    handleMouseEnter(event) {
        Dom(event.currentTarget).addClass('menu-user-item-hover');
    }

    handleMouseLeave(event) {
        Dom(event.currentTarget).removeClass('menu-user-item-hover');
    }

    render() {
        const {content, total}  = this.props.heart;
        return (
            <div className="menu-user-item menu-user-item-msg"
                 onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave}>
                <div className="menu-user-item-title">
                    <Badge count={total} overflowCount={9}>
                        <Link to="/notifications?readed=true">
                            <IconFont className="menu-user-icon" type="tongzhi"/>
                        </Link>
                    </Badge>
                </div>
                {total > 0 &&
                <div className="menu-user-sub">
                    <Card title="通知"
                          extra={<a href="javascript:;" onClick={this.readUserNoticeMessage}>全部标记为已读</a>}
                          style={{width: 320}}
                          bordered={false}>
                        <div className="user-msg">
                            <div className="user-msg-list">
                                {content.map((item)=> {
                                    return (
                                        <dl key={item.id}>
                                            <dt dangerouslySetInnerHTML={{__html: item.content}}></dt>
                                            <dd>
                                                {dateFormat(item.createdDate)}
                                            </dd>
                                        </dl>
                                    );
                                })}
                            </div>
                            <div className="user-msg-footer">
                                <Link to="/notifications">查看所有消息</Link>
                            </div>
                        </div>
                    </Card>
                </div>
                }
            </div>
        );
    }
}
