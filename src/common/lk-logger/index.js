import _ from 'lodash';
let OPTIONS = {};
export default {
    init({debug = false}){
        this.debug = debug;
    },
    setOptions(key, val) {
        var obj = {};
        if (_.isString(key)) {
            obj[key] = val;
        } else {
            obj = key;
        }
        return _.merge(OPTIONS, obj);
    },

    getOptions(key) {
        return OPTIONS[key];
    },
    log() {
        if (this.debug && window.console) {
            window.console.log(arguments);
        }
    },
    debug() {
        if (this.debug && window.console) {
            window.console.debug(arguments);
        }
    },
    info() {
        if (this.debug && window.console) {
            window.console.info(arguments);
        }
    },
    warn() {
        if (this.debug && window.console) {
            window.console.warn(arguments);
        }
    },
    error() {
        if (this.debug && window.console) {
            window.console.error(arguments);
        }

        //通过Ajax向服务器端记录到log
        this.collect({
            a: 'error',
            data: arguments[0]
        });
    },
    /*

     记录日志
     params <String> | <Obejct>
     --------------------------
     通用参数
     appkey：站点Id，由统计后台生成。该项必选。
     version：版本号，程序的版本号。该项可选。
     time：请求时间。该项必选。
     from:  来源，客户端、PC、H5、应用市场等等。该选项可选。
     uid：用户标识，登陆用户设置为用户的Id如5292cec41944528014c40d56，游客设置为(a+1234567890+new Date().getTime()),a12345678901415861702606。该项必选。
     sid:  一个连续行为的会话id，可以用于计算此步骤到下一个步骤的转化。该选项可选。

     行为参数
     cid：要监控的目标的类型名称，通常是同一组目标的名字，比如”首页"、”商品页面"、”订单页"、"游戏"等等。该项必选。
     aid：用户跟目标交互的行为，如”加入购物车"、”侧滑"、"下载"等等。该项必选。
     label：事件的一些额外信息，通常可以是歌曲的名称、软件的名称、链接的名称等等。该项可选。
     value：事件的一些数值信息，比如权重、时长、价格等等，在报表中可以看到其平均值等数据。该项可选。
     */
    collect(params) {

        if (window['_hmt']) {
            window['_hmt'].push(['_trackEvent', params.cid, params.aid]);
        }

        return params;
        //if (!this.appkey || $.isEmptyObject(params)) {
        //    return;
        //}
        //
        //if ('string' == typeof params) {
        //    params = $.parseParam(params);
        //}
        //
        ////浏览器信息
        //params = $.extend({}, {
        //    site: this.site,
        //    appkey: this.appkey,
        //    version: this.version,
        //    referer: this.referer,
        //    channel: this.channel,
        //    from: this.from,
        //    uid: this.getUID(),
        //    village_id: this.villageId || '',
        //    time: new Date().getTime()
        //}, params);
        //
        //var logParams = [];
        //for (var key in params) {
        //    if ($.isExists(params[key]) && params[key] != '') {
        //        logParams.push(key + '=' + params[key]);
        //    }
        //}
        //
        ////百度统计代码
        ////_hmt.push(['_trackEvent', params.cid, params.aid]);
        //
        //var url = this.isRelease ? 'http://collect.ddxq.mobi/i.png?' : 'http://collect.test.ddxq.mobi/i.png?';
        //
        //new Image().src = url + logParams.join('&');
    }
};
