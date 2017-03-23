Module('LK.register', function() {

    var tab                = $('#tab'),
        
        tabItem            = $('#tab .sso-register-tab-item'),
        
        tabBox             = $('.sso-register-tab-box'),
        
        tabType            = '',
        
        stepsItem          = $('.sso-steps-item'),
        
        // 点击同意协议
        nuancesBtn         = $('#nuancesBtn'),
        
        // 验证码图片
        captchaImg         = $('#captchaImg'),
        
        // 验证码旋转图片
        captchaSwitch      = $('#captchaSwitch'),
        
        // 下一步按钮
        nextBtn            = $('#nextBtn'),
        
        // 获取短信校验码按钮
        btnsmsCode         = $('#btnsmsCode'),
        
        // 确认提交下一步
        confirmBtn         = $('#confirmBtn'),
        
        // 完善资料按钮
        resultWaitingBtn   = $('#resultWaitingBtn'),

        // 请登录按钮
        resultLoginBtn = $('#resultLoginBtn'),

        // 玩转营销
        resultSuccessBtn   = $('#resultSuccessBtn'),
        
        // 账号填写区块
        userContainer      = $('.sso-register-step-user'),
        
        // 完善资料区块
        infoContainer      = $('.sso-register-step-info'),
        
        // 服务协议区块
        agreementContainer = $('.sso-agreement'),
        
        // 服务协议MASK
        agreementMask      = $('.sso-agreement-mask'),
        
        // 企业认证
        resultContainer    = $('.sso-register-step-result'),
        
        // 账号填写-邮箱注册
        userEmailForm      = $('#userEmailForm'),
        
        // 账号填写-手机号注册
        userMobileForm     = $('#userMobileForm'),
        
        // 完善资料表单
        infoForm           = $('#infoForm'),
        
        // 企业认证-成功
        resultSuccess      = $('.sso-register-step-result-success'),
        
        // 企业认证-等待中
        resultWaiting      = $('.sso-register-step-result-waiting'),
        
        // 企业认证-失败
        resultErr          = $('.sso-register-step-result-err'),

        // 是否登录
        isLogin = false,

        // 完善资料获取已填表单数据
        infoData = {};


    // TAB选项卡
    function _handelTab() {
        tab.on('click', '.sso-register-tab-item', function() {

            var index = $(this).index() == 2 ? 1 : 0;

            tabItem.map(function(index, item) {
                tabBox.eq(index).hide();
                tabItem.eq(index).removeClass('acitve');
            })
            $(this).addClass('acitve');

            tabType = $(this).data('type');

            tabBox.eq(index).show();
        })
    }

    // Steps状态 
    function _handelSteps(number) {
        stepsItem.each(function(index) {
            $(this).removeClass('sso-steps-status-process');
            $(this).addClass('sso-steps-status-wait');
        })
        stepsItem.eq(number).addClass('sso-steps-status-process')
    }

    // 找回密码异步状态
    function _updateDisabled(ele) {
        var disabled = ele.attr('disabled') == "disabled" ? false : true;
        ele.attr('disabled', disabled)
    }


    // 获取短信验证码处理
    function _onSmsCode() {
        var mobile = $.trim(userMobileForm.find("input[name='mobile']").val());
        _updateDisabled(btnsmsCode)
        LK.common.request({
            url: LK.config.APIS['SMS_CAPTCHA'],
            method: 'GET',
            params: {
                mobile: mobile,
            },
            success: function(result) {
                $.countdown(btnsmsCode, function() {
                    _updateDisabled(btnsmsCode)
                })
            },
            error: function(result) {
                _updateDisabled(btnsmsCode)
                if (result) {
                    if (result.errCode == -1) {
                        alert('验证码输入有误，无法获取短信验证码');
                    } else if (result.errCode == 40004) {
                        alert('手机号码未注册亲,快去注册吧')

                    } else {
                        alert(result.errMsg)
                    }
                } else {
                    alert('请重试,或者没有填写手机号')
                }
                btnsmsCode.html('重新获取')
            }
        })
    }
    // 弹出服务协议
    function _handelNuancesShow(state) {
        var downIn     = 'sso-agreement-antzoomdownin',
            downOut    = 'sso-agreement-antzoomdownout',
            fadeIn     = 'sso-agreement-mask-fadein',
            fadeOut    = 'sso-agreement-mask-fadeOut';

        if (state) {
            agreementContainer.removeClass(downOut)
            agreementContainer.addClass(downIn)
            agreementMask.show()
        } else {
            agreementContainer.removeClass(downIn)
            agreementContainer.addClass(downOut)
            agreementMask.hide()
        }
    }


    // 账号填写下一步处理
    function _onNextBtn(formData) {

        _updateDisabled(nextBtn)
        LK.common.request({
            url: LK.config.APIS['CUSTOMER_REG_ACCOUNT_VALIDATE'],
            method: 'POST',
            data: formData,
            success: function(result) {
                userContainer.hide()
                infoContainer.show()
                _handelSteps(1);
                _updateDisabled(nextBtn)
            },
            error: function(result) {
                _updateDisabled(nextBtn)
                if (!result) false;
                alert(result.errMsg)
            }
        })
    }

    // 完善资料下一步
    function _onConfirmBtn(dataForm) {
        var reset;

        if (isLogin) {
            reset = true;
        }

        var data = {
            business: dataForm.business,
            contact: {
                email: dataForm.contactemail,
                mobile: dataForm.contactmobile,
                name: dataForm.contactname,
            },
            name: dataForm.name,
            password: dataForm.password,
            products: dataForm.products,
            uin: dataForm.uin,
        }

        LK.common.request({
            url: LK.config.APIS['CUSTOMER_REG_INFO'],
            method: 'POST',
            data: data,
            query: {
                reset: reset,
            },
            success: function(result) {
                // 完善资料区块
                resultContainer.show();
                infoContainer.hide();
                resultWaiting.show();
                _handelSteps(2);
                _updateDisabled(nextBtn)
            },
            error: function(result) {
                _updateDisabled(nextBtn)
                if (!result) return;
                alert(result.errMsg)
            }
        })
    }

    // 玩转营销信息默认打开
    function _handelResultSuccess() {

        // 默认数据
        var data = {
          "brandAuth": "FALSE",
          "contentAuth": "FALSE",
          "mallAuth": "FALSE",
          "mallOpMode": "S",
          "partnerAuth": "FALSE",
          "yygAuth": "FALSE"
        }

        LK.common.request({
            url: LK.config.APIS['MANAGER_MALL_CONFIG_AUTH'],
            method: 'POST',
            data: data,
            success: function(result) {
                location.replace('/admin.html#/improve');
            },
            error: function(result) {
                if (!result) return;
                alert(result.errMsg)
            }
        })
    }

    // 绑定页面事件
    function _bindEvents() {

        // 验证码切换
        captchaSwitch.on('click', function() {
            $.getCaptcha(captchaImg);
        })

        // 验证码图片切换
        captchaImg.on('click', function() {
            $.getCaptcha(captchaImg);
        })

        // 完善资料下一步
        confirmBtn.on('click', function() {
            _onConfirmBtn();
        })

        // 获取短信校验码按钮
        btnsmsCode.on('click', function() {
            _onSmsCode();
        })

        // 弹出服务协议
        nuancesBtn.on('click', function () {
            _handelNuancesShow(true);
        })

        // 玩转营销按钮
        resultSuccessBtn.on('click', function () {
            _handelResultSuccess();
        })

        // 判断服务协议
        agreementContainer.on('click', '.sso-agreement-close', function () {
            _handelNuancesShow(false);
        })

        // 请登录
        resultLoginBtn.on('click', function () {
            location.replace('./index.html');
        })

        // 完善资料按钮
        resultWaitingBtn.on('click', function () {
         
            LK.common.request({
                url: LK.config.APIS['CUSTOMER_REG_INFO'],
                method: 'GET',
                success: function(result) {
                    var data = result.data,
                        formData = {};

                    formData = {
                        business: data.business,
                        contactemail: data.contact.email,
                        contactmobile: data.contact.mobile,
                        contactname: data.contact.name,
                        name: data.name,
                        products: data.products || '',
                        uin: data.uin,
                    }

                    $.setForm(infoForm, formData)

                    infoForm.find('input[name="uin"]').attr('disabled', 'disabled');
                    $('#password').val('');
                    infoContainer.show();
                    resultWaiting.hide();
                },
                error: function(result) {
                    _updateDisabled(nextBtn)
                    if (!result) return;
                    alert(result.errMsg)
                }
            })
            
        })
    }

    function _initFormConfig() {
        $.validator.setDefaults({
            onsubmit: true,
            errorPlacement: function(label, element) {
                var $formItem = element.closest(".sso-form-control"),
                    $formTip = $formItem.find(".sso-form-explain");
                if ($formTip.length === 0) {
                    $formTip = $('<div class="sso-form-explain"></div>');
                    $formItem.append($formTip);
                }
                $formTip.html(label);
            },
            highlight: function(element, errorClass) {
                $(element).closest(".sso-form-control").removeClass("has-success").addClass("has-error");
            },
            unhighlight: function(element, errorClass) {
                $(element).closest(".sso-form-control").removeClass("has-error").addClass("has-success");
            }
        });

        $.validator.addMethod("mobile", function(value, element) {
            return this.optional(element) || /^(13|15|18|17)[0-9]{9}$/.test(value);
        }, "请输入合法的手机号码");

        $.validator.addMethod("phoneTel", function(value, element) {
            return this.optional(element) || /^[0-9-]+$/.test(value);
        }, "请输入合法的手机号码或者座机号码");

        $.validator.addMethod("qq", function(value, element) {
            return this.optional(element) || /^[1-9]*[1-9][0-9]*$/.test(value);
        }, "请输入合法的QQ号码");

        $.validator.addMethod("tel", function(value, element) {
            return this.optional(element) || /^(([0\\+]\\d{2,3}-)?(\\d{2,4})-)?(\\d{7,8})(-(\\d{3,}))?$/.test(value);
        }, "请输入合法的号码");

        $.validator.addMethod("nickname", function(value, element) {
            return this.optional(element) || /^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(value);
        }, "请输入合法的昵称");

        $.validator.addMethod("password", function(value, element) {
            return this.optional(element) || /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{6,16}/.test(value);
        }, "请输入6-16位数字+字母密码");

        $.validator.addMethod("uin", function(value, element) {
            return this.optional(element) || /^[A-Za-z]+$/.test(value);
        }, "请输入4-12个字母标识");


        $.extend($.validator.messages, {
            required: "这个不可为空",
            remote: "请修正该字段",
            mobile: "请输入正确的手机号码",
            email: "请输入正确格式的电子邮件",
            url: "请输入合法的网址",
            date: "请输入合法的日期",
            dateISO: "请输入合法的日期 (ISO).",
            number: "请输入合法的数字",
            digits: "只能输入整数",
            creditcard: "请输入合法的信用卡号",
            equalTo: "请再次输入相同的值",
            accept: "请输入拥有合法后缀名的字符串",
            maxlength: $.validator.format("最多{0}个的字符"),
            minlength: $.validator.format("最少{0}个的字符"),
            rangelength: $.validator.format("请输入介于{0}和{1}之间的字符"),
            range: $.validator.format("请输入一个介于{0}和{1}之间的值"),
            max: $.validator.format("请输入一个最大为 {0} 的值"),
            min: $.validator.format("请输入一个最小为 {0} 的值")
        });
    }

    // 表单校验初始化
    function _validatorInit() {

        // 账号填写-邮箱注册
        userEmailForm.validate({
            submitHandler: function(form) { //表单提交句柄,为一回调函数，带一个参数：form
                _onNextBtn($.getForm($(form)))
            },
            rules: {
                email: {
                    required: true,
                    email: true,
                },
                captcha: {
                    required: true,
                }
            }
        });

        // 账号填写-手机注册
        userMobileForm.validate({
            submitHandler: function(form) { //表单提交句柄,为一回调函数，带一个参数：form   
                _onNextBtn($.getForm($(form)))
            },
            rules: {
                mobile: {
                    required: true,
                    mobile: true,
                },
                smsCode: {
                    required: true,
                }
            }
        });

        infoForm.validate({
            submitHandler: function(form) { //表单提交句柄,为一回调函数，带一个参数：form   
                infoForm.find('input[name="uin"]').attr('disabled', false);
                _onConfirmBtn($.getForm($(form)))
            },
            rules: {
                contactemail: {
                    email: true,
                    required: true,
                },
                contactmobile: {
                    required: true,
                    phoneTel: true,
                },
                contactname: {
                    required: true,
                    maxlength: 15,
                },
                name: {
                    required: true,
                    maxlength: 20,
                    minlength: 4,
                },
                password: {
                    required: true,
                    password: true,
                },
                uin: {
                    required: true,
                    uin: true,
                    maxlength: 12,
                    minlength: 4,
                },
                products: {
                    maxlength: 60,
                },
                business: {
                    required: true,
                },
                nuances: {
                    required: true,
                }
            },
            
            messages:{
                nuances:{
                    required:"需要同意《艾乐卡营销管家服务协议》",
                }
            }
        })
    }

    function _init(){
        var userInfo = LK.common.getUserInfo();
        if (!userInfo) {
            userContainer.show()
            resultLoginBtn.show();
            resultWaitingBtn.hide();
            return;
        }

        isLogin = LK.common.isLogin();
        if (!userInfo.approved) {
            resultWaitingBtn.show();
            resultLoginBtn.hide();
            resultWaiting.show()
        } else {
            resultSuccess.show();
        }
    }
    
    return {
        init: function() {
            $.getCaptcha(captchaImg);
            _init();
            _bindEvents();
            _handelTab();
            _initFormConfig();
            _validatorInit();
        }
    }
});