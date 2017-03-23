import React, {Component} from 'react';
import classNames from 'classnames';
import './index.less';

// TODO:加载更多模块 by cold
export default class PullLoad extends Component {

    constructor(props) {
        super(props);
        this.pullLoad = null;
        this.isEventListenerScroll = false;
    }

    // 加载未渲染dom
    componentWillMount() {
        if (this.props.first) {
            this.props.onLoadMore();
        }
    }

    // 加载已渲染dom
    componentDidMount() {

        this.pullLoad = document.querySelector('#' + this.props.id);

        // 绑定事件后就不在绑定
        if (!this.isEventListenerScroll) {
            this.pullLoad.addEventListener('scroll', this.handelScroll, false);
            this.isEventListenerScroll = true;
        }
    }

    // 组件移除
    componentWillUnmount() {
        this.pullLoad.removeEventListener('scroll', this.handelScroll, false);
    }

    // 滚动事件处理
    handelScroll = (e) => {

        const {clientHeight, scrollTop, scrollHeight} = e.target;

        const {last, status, distanceBottom = 0} = this.props;

        if (last || status == 'pending') {
            return;
        }
        window.requestAnimationFrame(() => {

            if ((clientHeight + scrollTop + distanceBottom) >= scrollHeight) {
                this.props.onLoadMore();
            }
        });
    }

    render() {
        const {
            className,
            style,
            children,
            pendingContent,
            failureContent,
            lastContent,
            status,
            first,
            last,
            id,
        } = this.props;

        const classString = classNames({
            [className]: true,
            'pullLoad': true,
        });

        return (
            <div id={id} className={classString} style={style}>
                {children}
                {(!first && status == 'pending') &&
                <div className="pullLoad-tip pullLoad-pending">{pendingContent}</div>
                }

                {(!first && status == 'failure') &&
                <div className="pullLoad-tip pullLoad-failure">{failureContent}</div>
                }

                {(!first && last) &&
                <div className="pullLoad-tip pullLoad-last">{lastContent}</div>
                }
            </div>);
    }
}

/** 组件首次渲染
 onLoadMore();

 * status
 // success | failure | pending;

 scrollMove () => {
    this.props.onLoadMore();
}
 */
//设置 props 默认值
PullLoad.defaultProps = {

    // 当前状态
    status: '',

    // 是否第一页
    first: true,

    // 是否最后一页
    last: false,

    className: '',

    pendingContent: '正在加载...',

    failureContent: '加载失败,点击重试',

    lastContent: '',

    distanceBottom: 0,

    id: 'pullLoad'
};


