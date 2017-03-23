/**
 * Created by Asoiso on 16/8/10.
 * 业务核心模块
 */
Module('LK.common', function () {
    var defauts = {
        method: 'GET',
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        emulateType: 'HTTP',
        xhrFields: {
            withCredentials: true
        }
    };
    var _isCheckLogin = null;

    return {

        /**
         * opts = $.ajax(opts)
         * emulateType = [FORM|HTTP]
         *
         */
        request: function (opts) {
            // 获取合并后的参数
            opts = $.extend(true, {}, defauts, opts);

            if (!opts.url) {
                return;
            }

            // 生成url
            opts.url = $.format(opts.url, opts.params);

            if ($.isPlainObject(opts.query)) {
                opts.url = opts.url + '?' + $.param(opts.query);
                delete  opts.query;
            }

            if (opts.method != 'GET' && opts.method != 'DELETE') {
                delete opts.params;
                if (opts.emulateType == 'HTTP') {
                    opts.data = JSON.stringify(opts.data);
                } else {
                    opts.contentType = 'application/x-www-form-urlencoded; charset=utf-8';
                }
            }

            var success = opts.success;
            var error = opts.error;

            opts.success = function (result) {
                if (result.errCode == 0) {
                    if ($.isFunction(success)) {
                        success(result);
                    }
                } else {
                    error(result);
                }
            }

            opts.error = function (xhr) {
                if ($.isFunction(error)) {
                    error(xhr.responseJSON);
                }
            }

            return $.ajax(opts);
        },

        // 获取用户信息
        getUserInfo: function () {
            return $.getStore(LK.config.CACHE_KEY.USERINFO);
        },

        // 获取用户是否登陆
        isLogin: function () {
            if (_isCheckLogin) {
                return !!this.getUserInfo();
            }
            var flag = false;
            LK.common.request({
                url: LK.config.APIS['USER_LOGGED'],
                method: 'GET',
                async: false,
                success: function (result) {
                    flag = true;
                },
                error: function () {
                    $.removeStore(LK.config.CACHE_KEY.USERINFO);
                }
            });
            _isCheckLogin = true;
            return flag;
        }
    };
});
