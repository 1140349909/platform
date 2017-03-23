import _ from 'lodash';
import React from 'react';
import {Row, Col, Button} from 'antd';
import './index.less';
import IMG_WECHAT from './img/wechat.png';
import IMG_WEIBO from './img/weibo.png';
import IMG_TOUTIAO from './img/toutiao.png';
import AuthComponentBase from 'common/base/AuthComponentBase';
import AuthModule from 'common/component/AuthModule';
import * as module from 'common/config/module';
import * as right from 'common/config/right';
import Img from 'common/component/Img';

export default class ChannelSelect extends AuthComponentBase {

    constructor(props) {
        super(props);
    }

    selectWechat = ()=> {

        const {data} = this.props;
        const count = _.has(data, 'wechat') ? data.wechat.length : 0;
        this.anyWhereModule(module.PLATFORM_ACCESS_AUTHORITY).then(()=> {
            this.anyWhereRight(right.MP_AMOUNT, count).then(({purchase})=> {
                if (purchase) {
                    this.props.getUinVersionInfo();
                }
                this.props.jumpToAuthorizeUrl('channel', 'wechat');
            });
        });
    }

    selectWeibo = ()=> {
        const {data} = this.props;
        const count = _.has(data, 'weibo') ? data.weibo.length : 0;
        this.anyWhereModule(module.PLATFORM_ACCESS_AUTHORITY).then(()=> {
            this.anyWhereRight(right.WEIBO_AMOUNT, count).then(({purchase})=> {
                if (purchase) {
                    this.props.getUinVersionInfo();
                }
                this.props.jumpToAuthorizeUrl('channel', 'weibo');
            });
        });
    }

    selectToutiao = ()=> {
        const {data} = this.props;
        const count = _.has(data, 'toutiao') ? data.toutiao.length : 0;
        this.anyWhereModule(module.PLATFORM_ACCESS_AUTHORITY).then(()=> {
            this.anyWhereRight(right.TOUTIAO_AMOUNT, count).then(({purchase})=> {
                if (purchase) {
                    this.props.getUinVersionInfo();
                }
                this.props.jumpToAuthorizeUrl('channel', 'toutiao');
            });
        });
    }


    render() {

        let {data} = this.props;

        if (data == null) {
            return null;
        }

        let channelList = [
            {
                channel:'wechat',
                img:IMG_WECHAT,
                title:'微信公众号授权',
                onClick:this.selectWechat,
                text:'立即授权'
            },{
                channel:'weibo',
                img:IMG_WEIBO,
                title:'微博平台授权',
                onClick:this.selectWeibo,
                text:'立即授权'
            },{
                channel:'toutiao',
                img:IMG_TOUTIAO,
                title:'今日头条授权',
                onClick:this.selectToutiao,
                text:'立即授权'
            }
        ];

        let templateList = [];

        channelList.map((item,index)=>{
            let template = (
                <Col span={4} key={index}>
                    <div style={{'textAlign': 'center'}}>
                        <Img src={item.img} alt=""/>
                        <div className="channel-select-text">
                            {item.title}
                        </div>
                        <AuthModule type={module.PLATFORM_ACCESS_AUTHORITY}>
                            <Button
                                onClick={item.onClick}
                                type="primary">
                                <span>{item.text}</span>
                            </Button>
                        </AuthModule>
                    </div>
                </Col>
            );

            templateList.push(template);
        });

        return (
            <div style={{'width': '1200px'}}>
                <Row gutter={16}>
                    {templateList}
                </Row>
            </div>

        );
    }
}
