Module('LK.forget', function () {

    // 错误提示
    var $tips = $(".sso-form-tips"),

    // 验证码图片
        $captchaImg = $('#captchaImg'),

    // 验证码旋转图片
        $captchaSwitch = $('#captchaSwitch'),

    // 短信校验码输入框
        $smsCode = $('#smsCode'),

    // 已注册账号输入框
        $user = $('#user'),

    // 验证码输入框
        $captcha = $('#captcha'),

    // 设置密码输入框
        $password = $('#password'),

    // 再次输入密码输入框
        $password2 = $('#password2'),

    // 找回密码布局块
        $retrieveContainer = $('.sso-forgot-retrieve'),

    // 短信校验码功能区块
        $smscodebox = $('.sso-form-smscodebox'),

    // 邮箱链接成功
        $emailinfoSuccess = $('.sso-forgot-emailinfo-success')

    // 邮箱链接过期
        $emailinfoErr = $('.sso-forgot-emailinfo-err'),

    // 重置密码布局块
        $restContainer = $('.sso-forgot-rest'),

    // 手机找回密码成功布局块
        $successContainer = $('.sso-forgot-success'),

    // 获取短信校验码按钮
        $btnsmsCode = $('#btnsmsCode'),

    // 找回密码提交按钮
        $btnRetrieve = $('#btnRetrieve'),

    // 手机重置密码按钮
        $btnReste = $('#btnReste'),

    // 重新发送链接
        $btnReLink = $('#btnReLink'),

        // 返回错误共用
        errCodeState = false,

        // 获取邮箱
        verify = false;


    // 显示错误提示
    function _showError(msg) {
        $tips.html(msg);
    }

    // 清空错误提示
    function _clearTip() {
        $tips.html('')
    }

    function _getQueryParam() {

        verify = $.getQueryParam('verify');

        if (verify !== '') {

            LK.common.request({
                url: LK.config.APIS['USER_FORGOT_CODE_RESEND'],
                method: 'GET',
                params: {
                    code: verify
                },
                success: function (result) {
                    $restContainer.show()
                },
                error: function (result) {
                    $emailinfoErr.show()
                }
            })

        } else {
         $retrieveContainer.show();
        }
    }


    // 校验用户名并返回对应的用户名类型
    function _getUserType() {
        var val = $.trim($('#user').val());

        if (LK.config.PATTERNS.PHONE_EMAIL.test(val)) {
            if (LK.config.PATTERNS.PHONE.test(val)) {
                return 'phone'
            } else {
                return 'emall'
            }
        } else {
            return false
        }
    }

    // 获取表单提交数据
    function _getSubmitData() {
        return {
            user: $.trim($('#user').val()),
            smsCode: $.trim($('#smsCode').val()),
            captcha: $.trim($('#captcha').val()),
            password: $.trim($('#password').val()),
            password2: $.trim($('#password2').val()),
        }
    }

    // 校验密码是否一致
    function _checkPassword() {
        data = _getSubmitData();
        if (data.password !== data.password2 || data.password == '' || data.password2 == '') {
            return false
        } else {
            return true
        }
    }

    // 找回密码异步状态
    function _updateDisabled(ele) {
        let disabled = ele.attr('disabled') == "disabled" ? false : true;
        ele.attr('disabled', disabled)
    }

    // 注册账号改变事件
    function _onUserKeyup(val) {
        if (LK.config.PATTERNS.PHONE.test(val)) {
            $smscodebox.show();
        } else {
            $smscodebox.hide();
        }

    }

    // 获取验证码
    function _onSmsCode(eleStr) {
        var data = _getSubmitData();
        var btn = $(eleStr);

        // 验证码不得为空
        if (data.captcha == '') {
            _showError('请输入验证码')
            return $captcha.focus();
        }

        _updateDisabled(btn)

        LK.common.request({
            url: LK.config.APIS['SMS_CAPTCHA_FORGOT_PASSWORD'],
            method: 'GET',
            params: {
                mobile: data.user
            },
            data: {
                captcha: data.captcha,
            },
            success: function (result) {
                $.countdown(btn, function () {
                    _updateDisabled(btn)
                })
                errCodeState = 0
            },
            error: function (result) {
                if (!result) return;

                if (result.errCode == -1) {
                    _showError('验证码输入有误，无法获取短信验证码');
                } else if (result.errCode == 40004) {
                    _showError('手机号码未注册亲,快去注册吧');
                    errCodeState = 40004
                } else {
                    _showError(result.errMsg);
                }
                btn.html('重新获取')
                _updateDisabled(btn)
            }
        })
    }

    // 获取表单提交数据
    function _onRetrieve(eleStr) {
        var data = _getSubmitData(),
            btn = $(eleStr),
            userType = _getUserType(),
            formData;

        if (data.user == '') {
            _showError('请输入注册账号');
            return $user.focus();
        }

        // 校验账号
        if (!userType) {
            _showError('请输入正确的邮箱或手机号')
            return $user.focus();
        }

        // 验证码不得为空
        if (data.captcha == '') {
            _showError('请输入验证码')
            return $captcha.focus();
        }

        // 手机号未注册
        if (errCodeState == 40004) {
            _showError('手机号码未注册亲,快去注册吧')
            return;
        }

        // 判断账户类型
        if (userType === 'phone') {
            if (data.smsCode == '') {
                _showError('请输入短信验证码')
                return $smsCode.focus();
            }
        }

        _updateDisabled(btn)

        if (userType === 'phone') {
            formData = {
                mobile: data.user,
                smsCode: data.smsCode,
                captcha: data.captcha,
            }
        } else {
            formData = {
                email: data.user,
                captcha: data.captcha,
            }
        }

        LK.common.request({
            url: LK.config.APIS['USER_FORGOT_PASSWORD_VALIDATE'],
            method: 'POST',
            data: formData,
            success: function (result) {
                if (userType === 'phone') {
                    $restContainer.show();
                    $retrieveContainer.hide();
                    _clearTip();
                    _updateDisabled(btn);
                } else {
                    $emailinfoSuccess.show();
                    $retrieveContainer.hide();
                }
            },
            error: function (result) {
                if (!result) return;
                console.log(result);
                if (result.errCode == 40004) {
                    _showError('手机号码未注册亲,快去注册吧');
                } else {
                    _showError(result.errMsg);
                }
                _updateDisabled(btn)
            }
        })
    }


    // 重置密码
    function _onRest(eleStr) {

        var data = _getSubmitData(),
            btn = $(eleStr),
            userType = _getUserType(),
            formData,
            url;

        // 校验密码一致性
        if (!_checkPassword()) {
            return _showError('设置密码不一致');
        }

        _updateDisabled(btn)

        if (verify == '') {
            url = LK.config.APIS['USER_FORGOT_PASSWORD_MOBILE_RESET'];
            formData = {
                mobile: data.user,
                password: data.password,
                smsCode: data.smsCode,
            }
        } else {
            url = LK.config.APIS['USER_FORGOT_PASSWORD_RESET'];
            formData = {
                password: data.password,
                code: verify,
            }
        }

        LK.common.request({
            url: url,
            method: 'POST',
            data: formData,
            success: function (result) {
                $successContainer.show();
                $restContainer.hide();
                _clearTip();
                _updateDisabled(btn)
            },
            error: function (xhr, result) {
                _showError('设定6-16位数字+字母密码');
                _updateDisabled(btn)
            }
        })
    }

    // 重新获取链接
    function _onReLink(eleStr){
        var btn = $(eleStr);

        _updateDisabled(btn)
        LK.common.request({
            url: LK.config.APIS['USER_FORGOT_PASSWORD'],
            method: 'GET',
            params: {
                code: verify
            },
            success: function (result) {
                $emailinfoSuccess.show();
                $emailinfoErr.hide();
                _updateDisabled(btn)
            },
            error: function (result) {
                alert('重新获取链接失败')
                _updateDisabled(btn)
            }
        })
    }

    // 绑定页面事件
    function _bindEvents() {

        // 注册账号input键盘按下事件
        $user.on('keyup', function () {
            _onUserKeyup($.trim($('#user').val()));
        })

        // 获取短信验证码
        $btnsmsCode.on('click', function () {
            _onSmsCode('#btnsmsCode');
        })

        // 验证码切换
        $captchaSwitch.on('click', function () {
            $.getCaptcha($captchaImg);
        })

        // 验证码图片切换
        $captchaImg.on('click', function () {
            $.getCaptcha($captchaImg);
        })

        // 找回密码表单提交
        $btnRetrieve.on('click', function () {
            _onRetrieve('#btnRetrieve');
        })

        // 重置密码确认
        $btnReste.on('click', function () {
            _onRest('#btnReste');
        })

        // 重新获取链接
        $btnReLink.on('click', function () {
            _onReLink('#btnReLink')
        })

        // 设定密码input键盘按下事件
        $password.on('keyup', function () {
            if (!_checkPassword()) {
                return _showError('设置密码不一致');
            } else {
                return _showError('')
            }
        })

        // 设定密码2input键盘按下事件
        $password2.on('keyup', function () {
            if (!_checkPassword()) {
                return _showError('设置密码不一致');
            } else {
                return _showError('')
            }
        })
    }

    return {
        init: function () {
            _bindEvents();
            $.getCaptcha($captchaImg);
            _getQueryParam();
        }
    };

});
