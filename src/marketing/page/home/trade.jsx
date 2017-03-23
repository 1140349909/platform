import React from 'react';
import PageBase from 'common/base/PageBase';
import {Button, Card} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authAction from 'common/store/auth/action';
// import showModal from 'common/component/showModal';

import AuthUser from 'common/component/AuthUser';

import AuthPermission from 'common/component/AuthPermission';
import * as permission from 'common/config/permission';

import AuthModule from 'common/component/AuthModule';
import * as module from 'common/config/module';

import * as right from 'common/config/right';
import http from 'common/http';

/*
 1. 自动弹出的对话框 OK
 2. 接口定义 OK
 3. 权限埋点
 4. 权益埋点
 5. 权限接口实现
 6. 权益接口实现
 */

@connect(
    state => ({
        operation: state.operation,
        auth: state.auth.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            getUinVersionInfo: authAction.getUinVersionInfo
        }, dispatch)
    })
)
export default class HomeTrade extends PageBase {

    useUserFeature = () => {
        this.anyWhereLogin()
            .then((params) => {
                alert(params);
                // console.log('success', params);
            })
            .catch((params) => {
                alert(params);
                // console.log('failure', params);
            });
    }

    // 使用角色功能
    usePermissionFeature = (type) => {
        this.anyWherePermission(type)
            .then((params) => {
                alert(params);
                // console.log('success', params);
            })
            .catch((params) => {
                alert(params);
                // console.log('failure', params);
            });
    }

    // 使用产品功能
    useModule = (type) => {
        this.anyWhereModule(type)
            .then((params) => {
                alert(params);
                // console.log('success', params);
            })
            .catch((params) => {
                alert(params);
                // console.log('failure', params);
            });

    }

    // 使用产品权益
    useRight = (type, usedValue) => {
        // this.anyWhereRight(type, value).then(({purchase}) => {
        //     console.log('success', params);
        // });

        this.anyWhereRight(type, usedValue)
            .then((params) => {
                alert(params);
                // console.log('success', params);
            })
            .catch((params) => {
                alert(params);
                // console.log('failure', params);
            });
    }

    // 购买素材
    useMaterial = () => {
        this.purchaseMaterial({
            id: '582437410f93d522d989a84f',
            name: '素材',
            ledou: 10
        }).then(() => {
            alert('购买成功!');
        }).catch(() => {
            alert('购买失败!');
        });
    }

    redirectHongRenDDOrder = () => {
        http.sendForm('http://www.hongrendd.com/red/api/IFExternal/login', {
            'p1_zid': '55ebfddd7ec6136c73e21779',
            'p2_display': 'pc',
            'p4_url': 'http://api.dev.vveshow.com/iloka/api/v1/m/linkin/spread/hongrendd/callback/58805e220f93d51b7b3f27de',
            'p5_bdText': '3333333333',
            'p6_bdUrl': 'http://m.dev.vveshow.com/dev520/#!/content/show/58805e220f93d51b7b3f27de',
            'p7_bdImg': 'http://api.dev.vveshow.com/buy/api/v1/w1/linkin/media/image/58732fc40f93d50845c0593b',
            'p8_source': '1484659044001',
            'p9_token': 'CAF195D0F6ACD2EF6B0CDCABFE943F20',
            'p12_peoples': 100,
            'p13_type': 'rhzs',
            'p14_sceneid': '58805e220f93d51b7b3f27de',
            'p10_hamc': '5B6FC8EEC894BB683AAA310015829D5A'
        });
    };

    redirectHongRenDDList = () => {
        http.sendForm('http://www.hongrendd.com/red/api/IFExternal/HongRenUrl', {
            'p1_zid': '55ebfddd7ec6136c73e21779',
            'p2_code': '1002',
            'p3_source': '1484659044001',
            'p4_hamc': '26167590B06FB10328F5664A3FD8C59D'
        }, {method: 'GET'});
    };

    render() {
        return (
            <div className="app-page">

                <Card title="登录用户权限校验" bordered={true} style={{marginTop: '20px'}}>
                    <div className="operation">
                        <AuthUser>
                            <Button onClick={() => {
                                this.useUserFeature();
                            }}>登录后才能用</Button>
                        </AuthUser>
                    </div>
                </Card>

                <Card title="角色功能权限校验" bordered={true} style={{marginTop: '20px'}}>
                    <div className="operation">
                        <AuthPermission type={permission.MARKETING}>
                            <Button onClick={() => {
                                this.usePermissionFeature(permission.MARKETING);
                            }}>运营中心</Button>
                        </AuthPermission>
                        <AuthPermission type={permission.PLATFORM}>
                            <Button onClick={() => {
                                this.usePermissionFeature(permission.PLATFORM);
                            }}>平台中心</Button>
                        </AuthPermission>
                    </div>
                </Card>

                <Card title="产品功能权限校验" bordered={true} style={{marginTop: '20px'}}>
                    <div className="operation">
                        <Button onClick={() => this.useModule(module.CONTENT_RICHTEXT_SAVE)}>
                            可见可用功能 - 保存/预览图文
                        </Button>
                        <AuthModule type={module.CONTENT_RICHTEXT_SAVE}>
                            <Button onClick={() => this.useModule(module.CONTENT_RICHTEXT_SAVE)}>
                                可见不可用功能 - 保存/预览图文
                            </Button>
                        </AuthModule>
                        <AuthModule type={module.CONTENT_RICHTEXT_SAVE}>
                            <Button onClick={() => this.useModule(module.CONTENT_RICHTEXT_SAVE)}>
                                不可见功能 - 保存/预览图文
                            </Button>
                        </AuthModule>
                    </div>
                    <br />
                    <div className="operation">
                        <Button onClick={() => {
                            this.showForbidden({type: 'CONTENT_RICHTEXT_CREATE'});
                        }}>显示未授权,提示升级账号</Button>
                        <Button onClick={() => {
                            this.showForbidden({type: 'CONTENT_RICHTEXT_CREATE', mode: 'page'});
                        }}>跳转未授权页面,提示升级账号</Button>

                        <Button onClick={() => {
                            this.showForbidden();
                        }}>显示未授权,提示联系管理员</Button>
                        <Button onClick={() => {
                            this.showForbidden({mode: 'page'});
                        }}>跳转未授权页面,提示联系管理员</Button>
                    </div>
                </Card>

                <Card title="购买权益" bordered={true} style={{marginTop: '20px'}}>
                    <div className="operation">
                        <Button onClick={() => {
                            this.useRight(right.WATERMARK_REMOVE, 'FALSE');
                        }}>H5尾页去除水印</Button>

                        <Button onClick={() => {
                            this.useRight(right.PIC_AMOUNT, 33);
                        }}>可上传图片的数量</Button>

                        <Button onClick={() => {
                            this.useRight(right.SUBACCOUNT_AMOUNT, 1);
                        }}>可添加的成员名额</Button>

                        <Button onClick={() => {
                            this.useRight(right.MP_AMOUNT, 1000);
                        }}>授权公众号的数量</Button>

                        <Button onClick={() => {
                            this.useRight(right.WEIBO_AMOUNT, 1000);
                        }}>授权微博的数量</Button>

                        <Button onClick={() => {
                            this.useRight(right.PV_AMOUNT, 1000);
                        }}>流量上限</Button>

                        <Button onClick={() => {
                            this.useRight(right.STORAGE_MAX, 1000);
                        }}>存储上限</Button>
                    </div>
                </Card>

                <Card title="购买素材" bordered={true} style={{marginTop: '20px'}}>
                    <div className="operation">
                        <Button onClick={() => {
                            this.useMaterial();
                        }}>购买素材</Button>
                    </div>
                </Card>

                <Card title="红人点点" bordered={true} style={{marginTop: '20px'}}>
                    <div className="operation">
                        <Button onClick={() => {
                            this.redirectHongRenDDOrder();
                        }}>推广下单</Button>

                        <Button onClick={() => {
                            this.redirectHongRenDDList();
                        }}>我的订单</Button>
                    </div>
                </Card>
            </div>
        );
    }
}

