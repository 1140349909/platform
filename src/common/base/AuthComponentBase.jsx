import React from 'react';
import {Modal} from 'antd';
import ComponentBase from './ComponentBase';
import {MODULE_STATUS} from '../config/constants';
import Forbidden from '../component/Forbidden';
import showModal from 'common/component/showModal';
import {parseBoolean} from '../util';
import _ from 'lodash';
import config from 'common/config';
import {purchaseServices, purchaseMaterial, purchaseH5Tpl} from 'common/component/LedouTrade';
import {purchaseH5TplPreview} from 'common/component/LedouTrade/purchaseTpl';
import {getUpgradeUrl, getSSOUrl} from 'common/util/url';
import {redirect} from 'common/util';

// 权限组件基类
export default class AuthComponentBase extends ComponentBase {
    // 用户角色功能权限
    static PERMISSIONS = {};

    // 用户业务功能权限
    static MODULES = {};

    // 用户业务功能权益
    static RIGHTS = {};

    // 产品版本信息
    static VERSION = null;

    // 当前用户角色
    static USER = null;

    // 显示未授权提示 | 跳转到未授权页面 mode=modal|page
    showForbidden = ({type, mode = 'modal', callback}={}) => {

        if (type && !_.isFunction(callback)) {
            callback = () => {
                this.redirectUpgrade();
            };
        }

        if (mode == 'modal' || !_.isFunction(this.props.router.push)) {
            // 显示未授权提示
            showModal({
                title: type ? '未开通此服务' : '权限不足',
                content: (<Forbidden type={type} mode="modal"/>),
                cancelText: '返回',
                okText: type ? '升级账号' : '确定',
                onOk: callback
            });
        } else {
            // 跳转到未授权页面
            this.props.router.push('/403' + (type ? '/' + type : ''));
        }
    }

    // 是否最大版本
    isMaxVersion = () => {
        return AuthComponentBase.VERSION.version < config.MAX_VERSION;
    }

    // 跳转登录页面
    redirectLogin = (isForced) => {
        if (isForced) {
            redirect(getSSOUrl(location.href));
        } else {
            redirect(getSSOUrl(location.href), '_blank', () => {
                location.reload();
            });
        }
    }

    // 跳转升级页面
    redirectUpgrade = () => {
        redirect(getUpgradeUrl());
    }


    // 校验用户是否登录
    checkLogin = () => {
        return !_.isEmpty(AuthComponentBase.USER);
    }

    // 使用用户登录功能
    anyWhereLogin = (isForcedLogin) => {
        return new Promise((resolve, reject) => {
            if (this.checkLogin()) {
                resolve();
            } else {
                // 强制登录
                if (isForcedLogin) {
                    return this.redirectLogin(true);
                }
                // TODO:提示用户登录,未来支持快捷登录¬
                Modal.confirm({
                    iconType: 'exclamation-circle',
                    title: '该操作需要登录才能继续',
                    content: '是否前去登录？',
                    onOk: () => {
                        this.redirectLogin(false);
                    },
                    onCancel: () => {
                        reject();
                    }
                });
            }
        });
    }

    // 校验角色功能权限
    checkPermission = (type) => {
        // 不受管辖的key则默认为可用状态
        let flag;
        if (!type) {
            flag = true;
        } else {
            flag = parseBoolean(AuthComponentBase.PERMISSIONS[type]);
        }
        return flag;
    }

    // 使用角色功能权限
    anyWherePermission = (type) => {

        return new Promise((resolve, reject) => {
            this.anyWhereLogin(true)
                .then(() => {
                    if (this.checkPermission(type)) {
                        resolve();
                    } else {
                        this.showForbidden();
                        // TODO:此处调用的时机待优化
                        reject();
                    }
                })
                .catch(reject);
        });
    }

    // 校验产品功能权限
    checkModule = (type) => {
        // 不受管辖的key则默认为可用状态
        let status;
        if (!type) {
            status = MODULE_STATUS.VISIBLE_ENABLE;
        } else {
            status = AuthComponentBase.MODULES[type] || MODULE_STATUS.HIDDEN;
        }
        return {
            status,
            visible: status != MODULE_STATUS.HIDDEN,
            enable: status == MODULE_STATUS.VISIBLE_ENABLE
        };
    }

    // 使用产品功能权限
    anyWhereModule = (type) => {
        const status = this.checkModule(type).status;
        return new Promise((resolve, reject) => {
            this.anyWhereLogin()
                .then(() => {
                    switch (status) {
                        case MODULE_STATUS.VISIBLE_ENABLE:
                            // 可用-》正常使用
                            resolve({
                                type,
                                status
                            });
                            break;
                        case MODULE_STATUS.VISIBLE_DISABLED:
                            // 可见不可用—》可见，点击时，对话框提示无权使用，请升级账号
                            this.showForbidden({
                                type
                            });
                            // TODO:此处调用的时机待优化
                            reject({
                                type,
                                status
                            });
                            break;
                        case MODULE_STATUS.HIDDEN:
                            // 不可用—》不可见，点击时，对话框提示无权使用，请联系管理员
                            this.showForbidden();
                            // TODO:此处调用的时机待优化
                            reject({
                                type,
                                status
                            });
                            break;
                    }
                })
                .catch(reject);
        });
    }

    // 校验产品功能权益
    checkRight = (type, usedValue) => {
        const right = AuthComponentBase.RIGHTS[type];

        if (right.paraType == 'numeric') {
            return (right.value - usedValue) > 0;
        } else {
            return parseBoolean(right.value);
        }
    }

    // 使用产品功能权益
    anyWhereRight = (type, usedValue) => {
        const right = AuthComponentBase.RIGHTS[type];

        return new Promise((resolve, reject) => {
            this.anyWhereLogin()
                .then(() => {
                    if (this.checkRight(type, usedValue)) {
                        // 可用 -> 正常使用
                        resolve({
                            right,
                            purchase: false
                        });
                    } else {
                        // 不可用-》点击时，对话框提示购买服务
                        this.purchaseServices({
                            type,
                            usedValue
                        }).then(() => {
                            // 不可用 -> 已购买
                            resolve({
                                right,
                                purchase: true
                            });
                        }).catch(() => {
                            // 不可用 -> 未购买
                            reject({
                                right,
                                purchase: false
                            });
                        });

                    }
                })
                .catch(reject);
        });
    }

    // 购买素材
    purchaseMaterial = (params) => {
        return new Promise((resolve, reject) => {
            this.anyWhereLogin()
                .then(() => {
                    purchaseMaterial(params).then(resolve, reject);
                })
                .catch(reject);
        });
    }

    // 购买H5模板
    purchaseH5Tpl = (params, isPreview) => {
        return new Promise((resolve, reject) => {
            this.anyWhereLogin()
                .then(() => {
                    if (!isPreview) {
                        purchaseH5Tpl(params).then(resolve, reject);
                    } else {
                        purchaseH5TplPreview(params).then(resolve, reject);
                    }
                })
                .catch(reject);
        });
    }

    // 购买服务 type=服务的key,value=已经使用的数量
    purchaseServices = ({type, usedValue}) => {
        const right = AuthComponentBase.RIGHTS[type];
        return new Promise((resolve, reject) => {
            this.anyWhereLogin()
                .then(() => {
                    purchaseServices({
                        right,
                        usedValue,
                        canUpgraded: this.isMaxVersion()
                    }).then(resolve, reject);
                })
                .catch(reject);
        });
    }
}
