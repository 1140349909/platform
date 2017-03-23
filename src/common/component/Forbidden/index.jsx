import React, {Component} from 'react';
import './index.less';
import classNames from 'classnames';
import _ from 'lodash';
import config from 'common/config';
import {redirect} from 'common/util';
import {getUpgradeUrl} from 'common/util/url';

export default class Forbidden extends Component {

    goBack = () => {
        history.go(-2);
    }

    goUpgrade = ()=> {
        redirect(getUpgradeUrl());
    }

    _renderCommon = (mode) => {
        if (mode == 'page') {
            // 页面提示
            return (<div>
                <p>您的管理员未给您分配访问该页面的权限，<a href="javascript:;" onClick={this.goBack}>返回上一页</a>。</p>
                <p>可向您的管理员申请该权限。</p>
                <p>如问题仍未解决，可联系<a href={config.CUSTOM_SERVICE_URL} target="_blank">在线客服</a>。</p>
            </div>);
        } else {
            // 弹框提示
            return (<div>
                <p>您的管理员未给您分配访问该页面的权限。</p>
                <p>可向您的管理员申请该权限。</p>
                <p>如问题仍未解决，可联系<a href={config.CUSTOM_SERVICE_URL} target="_blank">在线客服</a>。</p>
            </div>);
        }
    }

    _renderByType = (type, mode) => {
        if (type) {
            if (mode == 'page') {
                // 页面提示
                return (<div>
                    <p>您的账号还未开通该服务，<a href="javascript:;" onClick={this.goBack}>返回上一页</a>。</p>
                    <p>您可通过<a href="javascript:;" onClick={this.goUpgrade}>账号升级</a>来开通该服务。</p>
                    <p>如问题仍未解决，可联系<a href={config.CUSTOM_SERVICE_URL} target="_blank">在线客服</a>。</p>
                </div>);
            } else {
                // 弹框提示
                return (<div>
                    <p>您的账号还未开通该服务。</p>
                    <p>您可以通过账号升级来开通该服务。</p>
                    <p>如问题仍未解决，可联系<a href={config.CUSTOM_SERVICE_URL} target="_blank">在线客服</a>。</p>
                </div>);
            }
        } else {
            return this._renderCommon(mode);
        }
    }

    render() {

        const {mode = 'page'} = this.props;

        const classString = classNames({
            'forbidden': true,
            [`forbidden-${mode}`]: true
        });

        let type;
        if (_.has(this.props, 'params.type')) {
            type = this.props.params.type;
        } else {
            type = this.props.type;
        }

        return (
            <div className={classString}>
                {this._renderByType(type, mode)}
            </div>
        );
    }
}
