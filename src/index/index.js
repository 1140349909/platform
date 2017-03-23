/**
 * Created by Asoiso on 16/10/25.
 * 管理后台主页
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Select, Card, message} from 'antd';
const Option = Select.Option;
import AppLoading from 'common/component/AppLoading';
import config from 'common/config';
import {getMediaUrl} from 'common/util/media';
import Layout from 'common/layout/layout4';
import es6Promise from 'es6-promise';
import * as apiUser from 'common/api/user';
import Img from 'common/component/Img';
import './index.less';
es6Promise.polyfill();
import {getSSOUrl} from 'common/util/url';

class Index extends React.Component {

    state = {
        curType: 'MARKETING',
        curUin: '',
        user: null,
        uins: [],
        isPlatForm: false
    };

    go = () => {
        const {user, curType, curUin} = this.state;


        if (user.isPlatForm && curType == 'PLATFORM') {
            return this.redirect('PLATFORM');
        }

        if (curType == 'MARKETING') {
            if (!curUin) {
                return this.redirect('ILOKA');
            }

            if (curUin != user.uin) {
                apiUser.switchUserAccountUin(curUin).then(() => {
                    return this.redirect('MARKETING');
                }, () => {
                    message.error('切换公司失败,请重新再试！');
                });
            } else {
                return this.redirect('MARKETING');
            }
        }
    }

    redirect = (type) => {
        if (type == 'PLATFORM') {
            return location.replace(location.origin + '/platform.html');
        }

        if (type == 'MARKETING') {
            return location.replace(location.origin + '/marketing.html');
        }

        if (type == 'ILOKA') {
            return location.replace(config.ILOKA_ORIGIN);
        }
    }

    // 页面加载
    componentDidMount() {
        apiUser.getUserInfo().then(({data}) => {
            const {headImg, nickName = '佚名', uin, roles} = data;
            const isPlatForm = roles.indexOf('PLATFORM') != -1;
            const uins = [{
                name: nickName,
                uin: data.ownerUin,
                uinName: data.ownerUinName
            }].concat(data.uins);

            // TODO:游客误入,自动转跳
            // if (!uin) {
            //     return this.redirect('ILOKA');
            // }

            // 非platform && uins非空, uins大于1
            if (!isPlatForm && uin && uins.length <= 1) {
                return this.redirect('MARKETING');
            }

            // platform && uins为空
            if (isPlatForm && (!uins || uins.length == 0)) {
                return this.redirect('PLATFORM');
            }

            this.setState({
                curUin: uin, // 当前选择的uin
                user: {
                    uin, // 登陆所在的uin
                    headImgUrl: getMediaUrl(headImg, 'avatar'),
                    nickName,
                    roles,
                    isPlatForm
                },
                uins
            });

        }, () => {
            location.replace(getSSOUrl());
        });
    }

    // 切换Uin
    handleUinChange = (curUin) => {
        this.setState({
            curUin
        });
    }

    handleTypeChange = (curType) => {
        this.setState({
            curType
        });
    }

    render() {

        const {user, curUin, curType, uins} = this.state;
        let title;
        let flag = !!curUin;

        if (user) {
            if (flag) {
                title = (
                    <div className="switch-company-title">
                        <Img width={50} src={user.headImgUrl}/> {user.nickName}，请选择您管理的公司
                    </div>
                );
            } else {
                title = (
                    <div className="switch-company-title">
                        您不属于这里，请勿非法入侵！
                        <a href="javascript:;" onClick={() => {
                            this.redirect('ILOKA');
                        }}>返回主页</a>
                    </div>
                );
            }
        }

        return (
            <Layout>
                <div className="app-page-index">
                    {!user &&
                    <AppLoading />
                    }

                    {user &&
                    <div className="switch-company">
                        {!flag &&
                        <Card className="switch-company-empty" title={title}></Card>
                        }
                        {flag &&
                        <Card className="ant-card-single" title={title}>
                            <div className="switch-company-filed">
                                {user.isPlatForm &&
                                <Select size="large"
                                        value={curType}
                                        style={{width: '100%'}}
                                        onChange={this.handleTypeChange}>
                                    <Option key="MARKETING" value="MARKETING">运营中心</Option>
                                    <Option key="PLATFORM" value="PLATFORM">平台中心</Option>
                                </Select>
                                }

                                {curType == 'MARKETING' &&
                                <Select size="large"
                                        value={curUin}
                                        style={{width: '100%', marginTop: '10px'}}
                                        onChange={this.handleUinChange}>
                                    {uins.map((item, index) => {
                                        return (
                                            <Option key={index}
                                                    value={item.uin}>{item.uinName ? item.uinName + ' - ' : ''} {item.name}</Option>);
                                    })}
                                </Select>
                                }
                            </div>
                            <div className="switch-company-filed">
                                <Button size="large" type="primary" style={{width: '100%'}}
                                        onClick={this.go}>确定</Button>
                            </div>
                        </Card>
                        }
                    </div>
                    }
                </div>
            </Layout>
        );
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById('app')
);
