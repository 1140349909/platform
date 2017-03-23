import config from 'common/config';
import html2canvas from 'html2canvas';
import {isValid} from 'common/util/validator';
import * as apiMedia from '../api/media';

const DEFAULT_IMGS = {
    '1x1': require('../asset/img/i-1x1.png'),
    '3x4': require('../asset/img/i-3x4.png'),
    '4x3': require('../asset/img/i-4x3.png'),
    'avatar': require('../asset/img/avatar.png'),
};


// 图片上传
// upLoad: config.API_BASE_URL + '/media/platform/res',

export const customerDataImport = config.API_BASE_URL + '/customer/employee/data/import/';

export const customerStoreImport = config.API_BASE_URL + '/customer/store/data/import/';

// 广告条图片上传
// upLoadBanner: config.API_BASE_URL + '/media/users/banner',

// 分享类图片上传
// uploadShare: config.API_BASE_URL + '/media/users/share',

// 反馈类图片上传
// uploadFeedBack: config.API_BASE_URL + '/media/users/feedback',

// 分发类图片上传：
// uploadDistribute: config.API_BASE_URL + '/media/users/distribute',

// [remove]:新函数测试通过后可删除
/*addMedia: function ({owner, restype}) {
 return config.API_BASE_URL + '/media/' + owner + '/' + restype;
 },*/

// 新函数示例
/*let upLoadUrl = this.addMedia({
 owner: getFieldValue('owner'),
 restype: getFieldValue('restype'),
 params:{
 isLib: getFieldValue('isLib'),
 categoryId: getFieldValue('categoryId'),
 }
 });*/

export function addMedia({owner, restype, params}) {

    let mediaHref = config.API_BASE_URL + '/media/' + owner + '/' + restype;

    if (params) {

        for (let item in params) {

            if (params.hasOwnProperty(item)) {

                if (params[item] == undefined) {
                    params[item] = '';
                }

                if (params[item] != '') {

                    if (mediaHref.indexOf('?') == -1) {
                        mediaHref += '?' + item + '=' + params[item];
                    } else {
                        mediaHref += '&' + item + '=' + params[item];
                    }

                }

            }

        }
    }

    return mediaHref;
}

// 维码获取
export function getQrcodeUrl(width, height, content) {
    return config.API_BASE_URL + '/media/qrcode/' + width + '/' + height + '?content=' + content;
}

// 获取图片
export function getMediaUrl(mediaId, type, cdn = true) {
    let url;
    if (isValid('url', mediaId)) {
        url = mediaId;
    } else if (mediaId && cdn) {
        url = config.MEDIA_BASE_URL + '/media/image/' + mediaId;
    } else if (mediaId && !cdn) {
        url = config.API_BASE_URL + '/media/image/' + mediaId;
    } else {
        url = DEFAULT_IMGS[type] || '';
    }
    return url;
}


// 获取支付证书上传地址
export function getUploadCertUrl(type) {
    return config.MEDIA_BASE_URL + '/admin/customer/cert/' + type;
}

// canvas2image
export function canvas2base64(canvas,callback) {

    let params = {
        owner: 'platform',
        restype: 'cover'
    };

    let data = {
        base64: canvas.toDataURL().split(';base64,')[1],
        fileName: 'cover.png'
    };

    apiMedia.addMediaImg(data, params).then(function (result) {
        callback(result);
    }, function (result) {
        callback(result);
    });

}

// html2canvas2
export function html2image(element,callback) {

    html2canvas(element, {

        allowTaint: true,
        useCORS: true,
        proxy: undefined,

    }).then(function (canvas) {
        canvas2base64(canvas,callback);
    });

}
