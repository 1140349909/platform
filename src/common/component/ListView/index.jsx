import React, {Component} from 'react';
import {Spin} from 'antd';
import classNames from 'classnames';
import _ from 'lodash';
import IconFont from '../IconFont';
import {PROMISE_TYPE_SUFFIX} from '../../config/constants';
import {addEvent, removeEvent} from '../../util';
import QueueAnim from 'rc-queue-anim';
import './index.less';

const Symbol = IconFont.Symbol;

export default class ListView extends Component {

    constructor(props) {
        super(props);

        this.container = null;

        this.showScrollTop = false;
    }

    state = {
        status: '',
        showScrollTop: false
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.status) {
            this.setState({
                status: nextProps.status
            });
        }
    }

    componentDidUpdate(prevProps) {
        const {status, last} = this.props;
        if (status !== prevProps.status) {
            if (status == PROMISE_TYPE_SUFFIX.SUCCESS && !last && this.container.scrollHeight == this.container.clientHeight) {
                this.loadMore();
            }
        }
    }

    componentDidMount() {
        this.container = this.props.container ? this.props.container : document.querySelector('.list-view-box');
        addEvent(this.container, 'scroll', this.handleScroll);
    }

    componentWillUnmount() {
        removeEvent(this.container, 'scroll', this.handleScroll);
    }

    handleScroll = ()=> {
        const {distanceBottom, last} = this.props;
        const {clientHeight, scrollTop, scrollHeight} = this.container;
        const isDistance = scrollTop > 0 && clientHeight + scrollTop + distanceBottom >= scrollHeight;
        const available = !last && this.state.status == PROMISE_TYPE_SUFFIX.SUCCESS;
        this.handelShowScrollTop();
        if (isDistance && available) {
            this.loadMore();
        }
    }

    // 处理回到顶部显示
    handelShowScrollTop = () => {
        const {scrollTop} = this.container;
        const showScrollTop = this.state.showScrollTop;
        if (scrollTop == 0 && showScrollTop) {
            this.setState({
                showScrollTop: false,
            });
        } else if (scrollTop > 0 && !showScrollTop){
            this.setState({
                showScrollTop: true,
            });
        }
    }
    

    // 刷新当前页面数据
    handleRefresh = ()=> {
        this.loadData(this.props.page);
    }

    // 加载下一页数据
    loadMore = ()=> {
        this.loadData(this.props.page + 1);
    }

    loadData = (page) => {
        if (_.isFunction(this.props.onLoadData)) {
            this.props.onLoadData(page);
        }
    }

    // 滚动到顶部
    handelScrollTop = () => {
        this.container.scrollTop = 0;
    }

    render() {

        const {PENDING, SUCCESS, FAILURE} = PROMISE_TYPE_SUFFIX;
        const {className, page = 0, empty, pendingText, emptyIcon, emptyText, lastText, failureIcon, failureText, queueAnim} = this.props;
        const {status, showScrollTop} = this.state;
        const first = page == 0;
        const last = this.props.last && status == SUCCESS;

        const classString = classNames({
            [className]: true,
            'list-view': true
        });

        return (
            <div className={classString}>
                <div className="list-view-box">
                    {(first && status == PENDING) &&
                    <div className="list-view-tip list-view-first list-view-pending"><Spin /> {pendingText}</div>
                    }

                    {(first && status == FAILURE) &&
                    <div className="list-view-tip list-view-first list-view-failure">
                        <IconFont type={failureIcon}/>{failureText}<a href="javascript:;"
                                                                    onClick={this.handleRefresh}>点击重试</a>
                    </div>
                    }

                    {(first && last && empty && status == SUCCESS) &&
                    <div className="list-view-tip list-view-empty"><IconFont type={emptyIcon}/>{emptyText}</div>
                    }
                    
                    {((!first || (first && status == SUCCESS)) && queueAnim) && 
                        <QueueAnim>
                                <div key="query">{this.props.children}</div>
                        </QueueAnim>
                    }

                    {((!first || (first && status == SUCCESS)) && !queueAnim) && this.props.children}

                    {(!first && !last && status != FAILURE) &&
                    <div className="list-view-tip list-view-more list-view-pending"><Spin /> {pendingText}</div>
                    }

                    {(!first && status == FAILURE) &&
                    <div className="list-view-tip list-view-more list-view-failure">
                        <IconFont type={failureIcon}/> {failureText}<a
                        href="javascript:;" onClick={this.handleRefresh}>点击重试</a>
                    </div>
                    }

                    {(!first && last) &&
                    <div className="list-view-tip list-view-last">{lastText}</div>
                    }
                </div>
                {showScrollTop &&
                    <div className="list-view-top" onClick={this.handelScrollTop}><Symbol type="top"></Symbol></div>
                }
            </div>
        );
    }
}


//设置 props 默认值
ListView.defaultProps = {

    className: '',

    // 滚动容器
    container: null,

    // 距底部100像素触发加载
    distanceBottom: 100,

    // 当前状态 PENDING, SUCCESS, FAILURE
    status: '',

    // 是否第一页
    first: true,

    // 是否最后一页
    last: false,

    // 加载中文本
    pendingText: '正在加载...',

    // 空提示图标
    emptyIcon: 'ku',
    // 空提示文本
    emptyText: '暂无数据',

    // 失败提示图标
    failureIcon: 'ku',
    failureText: '加载失败，',

    // 最后一页提示
    lastText: '- 没有更多了 -',

    // 动画效果
    queueAnim: false
};


