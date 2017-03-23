import React from 'react';
import {Tabs, Button} from 'antd';
const TabPane = Tabs.TabPane;
import {withRouter} from 'react-router';
import classNames from 'classnames';
import AuthComponentBase from 'common/base/AuthComponentBase';
import * as module from 'common/config/module';
import _ from 'lodash';
import './index.less';
/**
 * 组装数据的格式为list=[{tabKey:'/content/tpl',tabText:'创建'}]
 * iconClickEvent : 左侧图标绑定的事件名称
 */
let TAB_DATA = {};
@withRouter
export default class TabHeader extends AuthComponentBase {
    constructor(props) {
        super(props);
        this.curTabData = [];
        this.list = [];
    }

    componentDidMount() {
        //this._getTabPansList();
    }

    componentWillMount() {
        TAB_DATA = {
            'content': [
                {tabKey: '/content/tpl/' + this.props.contentTplCheckKeys, tabText: '创建'},
                {tabKey: '/content/mine/published', tabText: '我的'},
                {tabKey: '/content/stat', tabText: '数据统计', moduleKey: module.CONTENT_RICHTEXT_STATISTICS},
                {tabKey: '/opinion', tabText: '留言管理', moduleKey: module.CONTENT_MESSAGE_CHECK}],
            'h5': [
                {tabKey: '/h5/tpl/all/platform', tabText: '创建'},
                {tabKey: '/h5/mine/published', tabText: '我的'},
                {tabKey: '/h5/stat', tabText: '数据统计'}
            ]
        };
    }

    componentDidUpdate(prevProps) {
        const {tplCheckKeys, h5CheckKeys, contentTplCheckKeys, contentMineStatus} = this.props;
        // 路由切换后初始化数据
        if (tplCheckKeys != prevProps.params.tplCheckKeys || h5CheckKeys != prevProps.params.h5CheckKeys ||
            contentTplCheckKeys != prevProps.params.contentTplCheckKeys || contentMineStatus != prevProps.contentMineStatus) {
            this._initData();
            this._getTabPansList();
        }
    }

    _initData = () => {
        TAB_DATA = {
            'content': [
                {tabKey: '/content/tpl/' + this.props.contentTplCheckKeys, tabText: '创建'},
                {tabKey: '/content/mine/' + this.props.contentMineStatus, tabText: '我的'},
                {tabKey: '/content/stat', tabText: '数据统计', moduleKey: module.CONTENT_RICHTEXT_STATISTICS},
                {tabKey: '/opinion', tabText: '留言管理', moduleKey: module.CONTENT_MESSAGE_CHECK}],
            'h5': [
                {tabKey: '/h5/tpl/all/' + this.props.tplCheckKeys, tabText: '创建'},
                {tabKey: '/h5/mine/' + this.props.h5CheckKeys, tabText: '我的'},
                {tabKey: '/h5/stat', tabText: '数据统计', moduleKey: module.CONTENT_H5_STATISTICS}
            ]
        };
    }
    onTabChange = (key) => {
        let curItem;
        for (var i = 0; i < this.curTabData.length; i++) {
            if (this.curTabData[i].tabKey == key) {
                curItem = this.curTabData[i];
                break;
            }
        }
        if (curItem.moduleKey) {
            this.anyWhereModule(curItem.moduleKey).then(() => {
                this.props.router.push(key);
            });
        } else {
            this.props.router.push(key);
        }
    }

    _getTabPansList = () => {
        this.list = [];
        this.curTabData = TAB_DATA[this.props.tabKey];
        this.curTabData.map((item) => {
            if (item.moduleKey) {
                if (this.checkModule(module[item.moduleKey]).visible) {
                    this.list.push(item);
                }
            } else {
                this.list.push(item);
            }
        });
    }

    render() {
        const icon = classNames('iconfont', this.props.iconName);
        return (
            <div className="tabHeader">
                {
                    this.props.show &&
                    <Button className="tabExtra" style={this.props.styles}
                            onClick={this.props.iconClickEvent}>
                        <i className={icon}></i>返回</Button>
                }
                <Tabs activeKey={this.props.activeKey} onChange={this.onTabChange}>
                    {
                        _.map(this.list, (data) => {
                            return (<TabPane tab={data.tabText} key={data.tabKey}/>);
                        })
                    }
                </Tabs>
            </div>
        );
    }
}

