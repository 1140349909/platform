/**
 * Created by cold on 2017/01/09.
 */
import React from 'react';
import {Upload, message} from 'antd';
import AuthComponentBase from '../../base/AuthComponentBase';
import CropperUpload from 'common/component/CropperUpload';
import _ from 'lodash';

// 角色功能的显示控制,status == MODULE_STATUS.HIDDEN,则不显示
class AuthUpload extends AuthComponentBase {

    handelModule = (type) => {
        this.anyWhereModule(type).catch(()=> {});
    }

    // handelRight = () => {
    //     const {rightParams} = this.props;
    //     this.anyWhereRight(rightParams.type, rightParams.value).then((purchase)=>{
    //         rightParams.thenCallback(purchase)
    //     }).catch((purchase)=>{
    //         rightParams.catchCallback(purchase);
    //     })
    // }

    beforeUpload = (file) => {

        const {beforeUpload} = this.props;

        if (file.type !== 'image/jpeg' && file.type !== 'image/gif' && file.type !== 'image/png' && file.type !== 'image/bmp') {
            message.warning('请上传正确的图片格式!');
            return false;
        }

        if (file.size > 1548576) {
            message.warning('请选择1.5M以下的图片');
            return false;
        }

        return beforeUpload(file);
    }

    render() {
        const {type, children, useCropper, className, style, ...resprops} = this.props;

        const isVisibleModule = type ? !this.checkModule(type).visible : false;

        const isEnableModule = type ? !this.checkModule(type).enable : false;

        if (useCropper) {
            _.assign(resprops.uploadProps, {beforeUpload: this.beforeUpload});
        } else {
            _.assign(resprops, {beforeUpload: this.beforeUpload});
        }

        if (isVisibleModule) {

            return null;

        } else if (!this.checkLogin() || isEnableModule) {

            return <span className={className} style={style} onClick={()=>this.handelModule(type)}>{children}</span>;

        } else {
            return (
                <span className={className} style={style}>
                    {useCropper &&
                    <CropperUpload
                        {...resprops}>
                        {children}
                    </CropperUpload>
                    }
                    {!useCropper &&
                    <Upload
                        {...resprops}>{children}</Upload>
                    }
                </span>
            );
        }
    }
}

//设置 props 默认值
AuthUpload.defaultProps = {
    rightParams: {
        type: null,
        value: null,
        thenCallback: () => {
        },
        catchCallback: () => {
        },
    },
    className: '',
    type: null,
    beforeUpload: () => true,
    icon: null,
};

export default AuthUpload;
