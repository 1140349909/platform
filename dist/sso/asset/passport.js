Module('LK.passport', function () {

    // 解决safri跨域cookie信任问题
    var IS_RE = navigator.userAgent.indexOf("Safari") > -1;

    var CACHE_KEY = LK.config.CACHE_KEY;

    var $tips = $("#tips")
    var $username = $("#username");
    var $password = $("#password");
    var $remember = $("#remember");
    var $btnLogin = $("#btnLogin");

    function _bindEvents() {
        $btnLogin.on('click', _login);

        $(window).keyup(function (event) {
            if (event.keyCode == 13) {
                _login();
            }
        });
    }

    // 检测是否登陆
    function _checkLogged() {
        var cacheUserName = $.getStore(CACHE_KEY.USERNAME);
        if (cacheUserName) {
            $username.val(cacheUserName);
            $remember.attr('checked', true);
        }

        if (LK.common.isLogin()) {
            _redirect();
        }
    }

    // 登陆
    function _login() {
        var data = _getLoginData();

        if (!_checkUserName(data.username)) {
            _showError('请输入您注册的邮箱或绑定的手机号');
            return $username.focus();
        }

        if (!_checkPassword(data.password)) {
            _showError('请输入6-18位的密码');
            return $password.focus();
        }

        var isRemember = $remember.is(':checked');

        data.logintype = 'p';
        LK.common.request({
            url: LK.config.APIS['LOGIN'],
            method: 'POST',
            data: data,
            emulateType: 'FORM',
            success: function (result) {
                if (result.errCode == 0) {
                    if (isRemember) {
                        $.setStore(CACHE_KEY.USERNAME, data.username);
                    } else {
                        $.removeStore(CACHE_KEY.USERNAME);
                    }
                    $.setStore(CACHE_KEY.USERINFO, result.data);
                    _resetError();
                    _redirect();
                } else {
                    _showError('账号或密码不正确');
                }
            },
            error: function (xhr, result) {
                _showError('账号或密码不正确');
            }
        });
    }

    // 获取登陆数据
    function _getLoginData() {
        return {
            username: $.trim($username.val()),
            password: $.trim($password.val())
        };
    }

    function _checkUserName(val) {
        return LK.config.PATTERNS.PHONE_EMAIL.test(val);
    }

    function _checkPassword(val) {
        return LK.config.PATTERNS.PASSWORD.test(val);
    }

    // 显示错误提示
    function _showError(msg) {
        $tips.html(msg);
    }

    // 重置错误提示
    function _resetError() {
        $tips.empty();
    }

    // 跳转
    function _redirect() {

        var userInfo = LK.common.getUserInfo();

        if (!userInfo) {
            return;
        }

        var roles = userInfo.roles;
        if (roles.indexOf('PLATFORM') == -1 && (!userInfo.approved || !userInfo.mallConfigured)) {
            return location.replace('./register.html');
        }

        var url = $.getQueryParam('url');
        if (!url && roles && roles.length > 0) {
            if (roles.indexOf('PLATFORM') != -1 || roles.indexOf('ROLE_PLATFORM') != -1) {
                return location.replace('../platform.html');
            }

            if (roles.indexOf('ADMIN') != -1 || roles.indexOf('ROLE_ADMIN') != -1 || roles.indexOf('MANAGER') != -1 || roles.indexOf('ROLE_MANAGER') != -1) {
                return location.replace('../admin.html');
            }
        }

        if (url) {
            location.replace(url);
        }
    }

    function _fixCredentials() {
        if (IS_RE && LK.config.ENV == 'prd') {
            $('<iframe src="http://api.linkin.mobi/transit/" width="0" height="0" style="display: none;"></iframe>').prependTo('body');
        }
    }

    return {
        init: function () {
            _fixCredentials();
            _bindEvents();
            _checkLogged();
            LK.wave.init();
        }
    }
});
