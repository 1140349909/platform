import {notification} from 'antd';
import config from '../config';
import {getSSOUrl} from 'common/util/url';


// 异常处理
export default (action)=> {

    const {errCode = -1, errMsg = '网络异常,请稍后再试'} = action.payload;

    // TODO:
    if (errCode == 40001) {
        return location.replace(getSSOUrl());
    }

    if (errCode == 40003) {
        return location.hash = '#/403';
    }

    // TODO:需要增加其他的错误处理

    notification['error']({
        message: config.RELEASED ? '系统提示' : '[' + errCode + '] ' + action.type,
        description: config.RELEASED ? '网络异常,请稍后再试' : errMsg
    });

    // console.error('handleError', errCode, action.type, errMsg);
};
