import http from '../http';
//get  /api/v1/{client}/{channel}/sms/captcha/forgot/password/{mobile}找回密码验证码短信发送

//get  /api/v1/{client}/{channel}/sms/captcha/{mobile} 验证码短信发送
export function captchaMobile(mobile) {
    return http.get('sms/captcha/{mobile}', {mobile: mobile}
    );
}

