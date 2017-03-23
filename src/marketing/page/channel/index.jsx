import React from 'react';
import PageBase from 'common/base/PageBase';
import {Card} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ChannelList from './component/ChannelList';
import * as authorizeAction from 'common/store/authorize/action';
import * as authAction from 'common/store/auth/action';
import './index.less';
import {getChannelAuthorizeUrl} from 'common/util/url';
import {redirect} from 'common/util';

import ChannelSelect from './component/ChannelSelect';

// TODO:[anyWhereModule: PLATFORM_ACCESS_AUTHORITY]

// const TabPane = Tabs.TabPane;

@connect(
    state => ({
        authorize: state.authorize.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            getUinVersionInfo: authAction.getUinVersionInfo,
            ...authorizeAction,
        }, dispatch)
    })
)
export default class ChannelIndex extends PageBase {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.refresh();
    }

    state = {
        type: 'list',
        viewType: 'list',
        viewParam: null,
        viewData: null,
    };

    refresh = ()=> {
        this.list('wechat');
        this.list('weibo');
        this.list('toutiao');
    }


    // 表格数据获取
    list = (channel) => {
        this.props.actions.getChannelList(channel);
    };

    //跳转各渠道授权页面
    jumpToAuthorizeUrl = (result, key) => {
        redirect(getChannelAuthorizeUrl(result, key), '_blank', ()=> {
            this.refresh();
        });
    };

    render() {

        const {operation} = this.props;

        // 是否显示loading
        const isListLoading = operation.type == authorizeAction.GET_CHANNEL_LIST_PENDING;

        return (
            <div className="app-page">
                <Card title="选择授权" style={{'height': '100%', 'overflowY': 'scroll'}}>
                    <ChannelSelect
                        data={this.props.authorize.list}
                        jumpToAuthorizeUrl={this.jumpToAuthorizeUrl}
                        getUinVersionInfo={() => {
                            this.props.actions.getUinVersionInfo();
                        }}/>
                </Card>
                <Card title="关于授权" style={{'margin': '20px auto'}}>
                    <div>
                        <ol className="channel-ol">
                            <li>将账号授权给艾乐卡编辑器后，你将可以在艾乐卡编辑器上进行素材管理，内容同步与群发操作。</li>
                            <li>本授权为平台方正式应用，将跳转至对应平台进行，艾乐卡不会也不能记录你的任何账号、密码信息。</li>
                            {/*<li>授权后，您也可以随时取消授权。（请前往微信公众平台取消授权）</li>*/}
                        </ol>
                    </div>
                </Card>
                <Card title="当前授权">
                    <ChannelList data={this.props.authorize.list}
                                 list={this.list}
                                 jumpToAuthorizeUrl={this.jumpToAuthorizeUrl}
                                 loading={isListLoading}/>
                </Card>
            </div>
        );


    }
}


