import React, {Component} from 'react';
import {Row, Col, Tooltip} from 'antd';
import IMG_LWECHAT from './img/lwechat.png';
import IMG_LWEIBO from './img/lweibo.png';
import IMG_LTOUTIAO from './img/ltoutiao.png';
import Img from 'common/component/Img';

// const TabPane = Tabs.TabPane;

export default class ChannelList extends Component {

    constructor(props) {
        super(props);
    }

    state = {};

    getSelectList = (channelList, channel) => {

        let selectList = [];
        let expires_in,
            now_time = new Date().getTime();

        for (let i = 0; i < channelList.length; i++) {

            let item = channelList[i];

            let colData;

            switch (channel) {
                case 'wechat':
                    colData = (
                        <Tooltip key={i} title={(
                            <div>
                                <p>
                                <span>
                                    {item.authorizerInfo.service_type_info.id < 2 ? '订阅号：' : '服务号：'}
                                    {item.authorizerInfo ? item.authorizerInfo.alias : '匿名'}
                                </span>
                                </p>
                                {item.authorizerInfo.verify_type_info.id == -1 && <p>
                                    <span>注：未认证公众号无法群发消息</span>
                                </p>}
                            </div>
                        )} arrowPointAtCenter>
                            <Col span={3}>
                                <div style={{'textAlign': 'center', 'height': '120px'}}>
                                    <div style={{'width': '50px', 'height': '50px', 'margin': '0 auto'}}>
                                        <Img src={item.authorizerInfo ? item.authorizerInfo.head_img : ''} alt="暂无"
                                             style={{'width': '50px', 'borderRadius': '2px'}}/>
                                    </div>
                                    <div style={{'margin': '8px auto'}}>
                                        <span>{item.authorizerInfo ? item.authorizerInfo.nick_name : '匿名'}</span>
                                        &nbsp;
                                        <span
                                            style={{'color': item.authorizerInfo.verify_type_info.id == 0 ? '#2db7f5' : '#FF3B53'}}>
                                        {item.authorizerInfo.verify_type_info.id == 0 ? '' : '未认证'}
                                    </span>
                                    </div>
                                </div>
                            </Col>
                        </Tooltip>
                    );
                    break;
                case 'weibo':

                    expires_in = parseInt(item.accessToken.e);

                    colData = (
                        <Tooltip key={i} title={
                            <div>
                                <p>
                                    <span>
                                        微博号：{item.uid ? item.uid : '匿名'}
                                    </span>
                                </p>
                                {expires_in >= now_time && <p>
                                    <span>
                                        授权有效
                                    </span>
                                </p>}
                            </div>
                        }>
                            <Col span={3}>
                                <div style={{'textAlign': 'center', 'height': '120px'}}>
                                    <div style={{'width': '50px', 'height': '50px', 'margin': '0 auto'}}>
                                        <Img src={item.authorizerInfo ? item.authorizerInfo.profile_image_url : ''}
                                             alt="暂无"
                                             style={{'width': '50px', 'borderRadius': '2px'}}/>
                                    </div>
                                    <div style={{'margin': '8px auto'}}>
                                        {expires_in >= now_time && <span>
                                            {item.authorizerInfo ? item.authorizerInfo.name : '匿名'}
                                        </span>}
                                        {expires_in < now_time && <span>
                                        授权到期，
                                            <a href="javascript:void(0)"
                                               onClick={() => this.props.jumpToAuthorizeUrl('channel', 'weibo')}>
                                                <span style={{'color': '#009dfc'}}>请重新授权</span>
                                            </a>
                                        </span>}
                                    </div>
                                </div>
                            </Col>
                        </Tooltip>

                    );
                    break;
                case 'toutiao':

                    expires_in = parseInt(item.accessToken.e);

                    colData = (
                        <Tooltip key={i} title={
                            <div>
                                <p>
                                    <span>
                                        头条号：{item.uid ? item.uid : '匿名'}
                                    </span>
                                </p>
                                {expires_in >= now_time && <p>
                                    <span>
                                        授权有效
                                    </span>
                                </p>}
                            </div>
                        }>
                            <Col span={3}>
                                <div style={{'textAlign': 'center', 'height': '120px'}}>
                                    <div style={{'width': '50px', 'height': '50px', 'margin': '0 auto'}}>
                                        <Img src={item.authorizerInfo ? item.authorizerInfo.avatar_url : ''}
                                             alt="暂无"
                                             style={{'width': '50px', 'borderRadius': '2px'}}/>
                                    </div>
                                    <div style={{'margin': '8px auto'}}>
                                        {expires_in >= now_time && <span>
                                            {item.authorizerInfo ? item.authorizerInfo.screen_name : '匿名'}
                                        </span>}
                                        {expires_in < now_time && <span>
                                        授权到期，
                                            <a href="javascript:void(0)"
                                               onClick={() => this.props.jumpToAuthorizeUrl('channel', 'toutiao')}>
                                                <span style={{'color': '#009dfc'}}>请重新授权</span>
                                            </a>
                                        </span>}
                                    </div>
                                </div>
                            </Col>
                        </Tooltip>
                    );
                    break;
            }

            //显示所有列表
            selectList.push(colData);

        }

        return selectList;
    };

    render() {

        let {data} = this.props;

        if (data == null) {
            return null;
        }

        let wechatList = [];
        let weiboList = [];
        let toutiaoList = [];

        if (data.wechat) {
            wechatList = this.getSelectList(data.wechat, 'wechat');
        }

        if (data.weibo) {
            weiboList = this.getSelectList(data.weibo, 'weibo');
        }

        if (data.toutiao) {
            toutiaoList = this.getSelectList(data.toutiao, 'toutiao');
        }

        let channelList = [
            {
                channel:'wechat',
                img:IMG_LWECHAT,
                list:wechatList,
                title:'微信公众号',
                text:'暂无绑定的公众号'
            }, {
                channel:'weibo',
                img:IMG_LWEIBO,
                list:weiboList,
                title:'新浪微博',
                text:'暂无绑定的微博'
            }, {
                channel:'toutiao',
                img:IMG_LTOUTIAO,
                list:toutiaoList,
                title:'今日头条',
                text:'暂无绑定的头条号'
            }
        ];

        let templateList = [];

        channelList.map((item,index)=>{
            let template = (
                <div key={index}>
                    {item.list.length != 0 && <div style={{'width': '1200px'}}>
                        <div style={{'margin': '23px'}}>
                            <Img src={item.img} alt=""/>&nbsp;&nbsp;
                            <span>{item.title}</span>
                        </div>
                        <Row gutter={16}>
                            {item.list.length != 0 ? item.list : (
                                    <Col span={12}>
                                        <div style={{'textAlign': 'center'}}>
                                            <span>{item.text}</span>
                                        </div>
                                    </Col>
                                )}
                        </Row>
                    </div>}
                </div>

            );

            templateList.push(template);
        });



        return (
            <div>
                {templateList}
            </div>
        );
    }
}
