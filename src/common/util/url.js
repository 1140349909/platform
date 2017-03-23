import config from '../config';
import {ENTRY_CODE} from '../config/constants';

// 获取入口地址
export function getEntryUrl({
    uin,
    code,
    url
}) {
    var entryUrl = config.API_ILOKA_ROOT + '/entry/' + uin + '/' + code + '/' + config.CHANNEL;
    if (url) {
        entryUrl += '?url=' + encodeURIComponent(url);
    }
    return entryUrl;
}

// 获取商城原始地址
// http://m.sit.vveshow.com/dev/#!/tker/product
export function getOriginUrl(uin, path) {

    return config.MALL_ORIGIN + '/' + uin + '/#!' + path;
}

// 商城首页
// http://api.sit.vveshow.com/buy/entry/dev/mall/linkin
export function getMallIndexUrl(uin) {
    return getEntryUrl({
        uin: uin,
        code: ENTRY_CODE.MALL
    });
}

// 一元购首页
// http://api.sit.vveshow.com/buy/entry/dev/yyg/linkin
export function getYygIndexUrl(uin) {
    return getEntryUrl({
        uin: uin,
        code: ENTRY_CODE.YYG
    });
}

// 资讯列表页
// http://api.sit.vveshow.com/buy/entry/dev/content/linkin
export function getContentIndexUrl(uin) {
    return getEntryUrl({
        uin: uin,
        code: ENTRY_CODE.CONTENT
    });
}

// 会员中心
export function getMemberIndexUrl(uin) {
    return getEntryUrl({
        uin: uin,
        code: ENTRY_CODE.MEMBER
    });
}

// 商城商品预览地址
export function getMallProductPreviewUrl(uin, id) {
    if (!id) {
        return '';
    }
    var url = '#!/product/preview/' + id;
    return getEntryUrl({
        uin: uin,
        code: ENTRY_CODE.CUSTOMIZE,
        url: url
    });
}

// 商城商品详情地址
// http://api.sit.vveshow.com/buy/entry/dev/customize/linkin?url=#!/product/show/57b41bc20f93d5223998d52f
export function getMallProductShowUrl(uin, id) {
    if (!id) {
        return '';
    }
    var url = '#!/product/show/' + id;
    return getEntryUrl({
        uin: uin,
        code: ENTRY_CODE.CUSTOMIZE,
        url: url
    });
}

// 一元购物商品预览地址
export function getYygProductPreviewUrl(uin, id) {
    if (!id) {
        return '';
    }
    var url = '/product/preview/' + id;
    return getEntryUrl({
        uin: uin,
        code: ENTRY_CODE.YYG,
        url: url
    });
}

// 一元购物商品详情地址
// // http://api.sit.vveshow.com/buy/entry/dev/yyg/linkin?url=/product/show/57c14f380f93d52c67612b01
export function getYygProductShowUrl(uin, id) {
    if (!id) {
        return '';
    }
    var url = '/product/show/' + id;
    return getEntryUrl({
        uin: uin,
        code: ENTRY_CODE.YYG,
        url: url
    });
}
// 资讯模板预览地址
export function getContentTemplateUrl(uin, type, id, isOrigin) {
    if (!id) {
        return '';
    }

    var url = '/template/' + type + '/' + id;
    if (isOrigin) {
        return getOriginUrl(uin, '/content' + url);
    } else {
        return getEntryUrl({
            uin: uin,
            code: 'content',
            url: url
        });
    }

}

// 资讯详情预览地址
export function getContentPreviewUrl(uin, id, isOrigin) {
    if (!id) {
        return '';
    }
    var url = '/preview/' + id;

    if (isOrigin) {
        return getOriginUrl(uin, '/content' + url);
    } else {
        return getEntryUrl({
            uin: uin,
            code: 'content',
            url: url
        });
    }

}
// 资讯详情页面地址
// http://api.sit.vveshow.com/buy/entry/dev/content/linkin?url=/show/57bbe82a0f93d55937bbe7b5
export function getContentShowUrl(uin, id, isOrigin) {
    if (!id) {
        return '';
    }
    var url = '/show/' + id;

    if (isOrigin) {
        return getOriginUrl(uin, '/content' + url);
    } else {
        return getEntryUrl({
            uin: uin,
            code: 'content',
            url: url
        });
    }
}

// 获取iLoka的Url
export function getILokaUrl(path) {
    return config.ILOKA_ORIGIN + path;
}

// 获取H5地址
export function getIlokaContentUrl(resId,mode) {

    if(mode){
        return getILokaUrl(`/mobile.html?id=${resId}&mode=${mode}`);
    }else{
        return getILokaUrl(`/mobile.html?id=${resId}`);
    }
}

// 授权页面入口地址，基于入口走授权接口
export function getChannelAuthorizeUrl(page, type) {
    // 需要跳转至 http://authorize.vveshow.com或http://authorize.iloka.me
    // 传参定义如下：
    // config.SITE
    // config.ENV
    // result
    // key
    // 例1：bs_sit_channel_wechat
    // 例2：bs_prd_channel_weibo
    return `${config.COMMON_ORIGIN}/authorize/?origin=${config.ENV}.${config.SITE}.${page}.${type}&v=${config.VERSION}`;

}

// 获取升级地址
export function getUpgradeUrl() {
    return '/marketing.html#/user/upgrade';
}


// 获取充值页面
export function getChargeUrl() {
    return '/marketing.html#/charge/list';
}

export function getSSOUrl(url) {
    url = url ? url : config.BS_ORIGIN + '/';
    return config.SSO_ORIGIN + '/?url=' + encodeURIComponent(url);
}

export function getThirdpartyUrl({type, operation, url}) {
    url = encodeURIComponent(url);
    var timeShaft = new Date().getTime();
    return `${config.COMMON_ORIGIN}/oauth/?origin=${config.ENV}.${config.SITE}.${type}.${operation}&url=${url}&_${timeShaft}`;
}
