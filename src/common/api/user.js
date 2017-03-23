import http from '../http';
import config from '../config';

export function getUsers({
    userName,
    roles,
    ulevel,
    metier,
    platform,
    page = 0,
    size = config.SIZE,
    sort = 'name',
    order = config.ORDER
}) {
    return http.get(config.API_ILOKA_URL + '/platadmin/user/list', {
        userName,
        roles,
        ulevel,
        metier,
        platform,
        page,
        size,
        sort,
        order,
    });
}

// PUT /api/v1/{client}/{channel}/platadmin/user/level/{platform}/{level}/{userid} 修改用户平台级别
export function switchUserLevel({
    platform,
    level,
    userid
}) {
    return http.put(config.API_ILOKA_URL + '/platadmin/user/level/{platform}/{level}/{userid}', null, {
        params: {
            platform,
            level,
            userid
        }
    });
}



// 获取当前登陆用户的信息
export function getUserInfo() {
    return http.get(config.API_ILOKA_URL + '/user/info', {
        type: 'p'
    });
}

export function getUserDetail() {
    return http.get(config.API_ILOKA_URL + '/user/detail', {
        type: 'p'
    });
}


// PUT /api/v1/{client}/{channel}/user/account/uin/{uin} 用户切换服务uin
export function switchUserAccountUin(uin) {
    return http.put(config.API_ILOKA_URL + '/user/account/uin/{uin}', null, {
        params: {
            uin
        }
    });
}

//运营人员激活服务
export function activateAccount(code) {
    return http.get(config.API_ILOKA_URL + '/account/activate/{code}', {code});
}

//获取操作人员列表
export function getUserList({
    page = 0,
    size = config.SIZE,
    sort = 'name',
    order = config.ORDER
}) {
    return http.get(config.API_ILOKA_URL + '/admin/user/list', {
        page,
        size,
        sort,
        order
    });
}

//GET /api/v1/{client}/{channel}/manager/user/info/list 获取运营人员列表
export function getManagerUserList() {
    return http.get(config.API_ILOKA_URL + '/manager/user/info/list');
}

//运营人员设置密码
export function updateAccountPassword(password) {
    return http.post(config.API_ILOKA_URL + '/manager/account/password', null, {
        params: {
            password
        }
    });
}
//发送激活运营人员邮件服务
export function sendAccountMail({
    id, url
}) {
    return http.put(config.API_ILOKA_URL + '/admin/user/account/mail/{id}', null, {
        params: {
            id,
            url
        }
    });
}
//禁/启用用户
export function updateUserStatus(status, id) {
    return http.put(config.API_ILOKA_URL + '/admin/user/status/{status}/{id}', null, {
        params: {
            status,
            id
        }
    });
}

//get  /api/v1/{client}/{channel}/user/reg/nickname/check 用户昵称检测服务
export function checkRegNickname(nickname) {
    return http.get(config.API_ILOKA_URL + '/user/reg/nickname/check', {
        nickname
    });
}

//post  /api/v1/{client}/{channel}/user/password 用户修改密码
export function updateUserPassword({
    oldPassWord,
    password
}) {
    return http.post(config.API_ILOKA_URL + '/user/password', {
        oldPassWord,
        password
    });
}

//post  /api/v1/{client}/{channel}/user/mobile/validate/{mobile}/{code} 用户手机号码验证
export function validateMobile({
    mobile,
    code
}) {
    return http.post(config.API_ILOKA_URL + '/user/mobile/validate/{mobile}/{code}', null, {
        params: {
            mobile,
            code
        }
    });
}


//post  /api/v1/{client}/{channel}/user/info 用户修改个人信息服务
export function updateUserInfo({
    headImg,
    metier,
    mobile,
    nickName,
    sex
}) {
    return http.post(config.API_ILOKA_URL + '/user/info', {
        headImg,
        metier,
        mobile,
        nickName,
        sex
    });
}

//get  /api/v1/{client}/{channel}/user/email/bindmobile 发送更换手机绑定邮件
export function bindMobileByEmail() {
    return http.get(config.API_ILOKA_URL + '/user/mobile/email');
}

//put  /api/v1/{client}/{channel}/user/mobile/bind/{mobile}/{smsCode} 用户设置手机号码
export function bindMobileSmsCode({
    mobile,
    smsCode,
    code
}) {
    return http.put(config.API_ILOKA_URL + '/user/mobile/bind/{mobile}/{smsCode}', null, {
        params: {
            mobile,
            smsCode,
            code
        }
    });
}


// POST /api/v1/{client}/{channel}/admin/user  新增运营人员
export function addAdminUserInfo({
    accountType,
    memo,
    moduleIds,
    name,
    userName,
    role,
    tagIds
}) {
    return http.post(config.API_ILOKA_URL + '/admin/user', {
        accountType,
        memo,
        moduleIds,
        name,
        userName,
        role,
        tagIds
    });
}

//post  /api/v1/{client}/{channel}/admin/user/{id} 修改运营人员信息
export function updateAdminUserInfo({
    id,
    accountType,
    memo,
    moduleIds,
    name,
    userName,
    role,
    tagIds
}) {
    return http.post(config.API_ILOKA_URL + '/admin/user/{id}', {
        accountType,
        memo,
        moduleIds,
        name,
        userName,
        role,
        tagIds
    }, {
        params: {
            id
        }
    });
}

//get  /api/v1/{client}/{channel}/admin/user/{id} 查询运营人员信息
export function getAdminUserInfo(id) {
    return http.get(config.API_ILOKA_URL + '/admin/user/{id}',{
        id
    });
}


//post  /api/v1/{client}/{channel}/user/reg/mobile 用户通过手机号码注册
export function addUserRegMobile({
    code,
    password,
    userName
}) {
    return http.post(config.API_ILOKA_URL + '/user/reg/mobile', {
        code,
        password,
        userName
    });
}

//post  /api/v1/{client}/{channel}/user/mobile/bind 用户绑定手机
export function bindUserMobile({
    code,
    password,
    mobile,
    passwordNotSet
}) {
    return http.post(config.API_ILOKA_URL + '/user/mobile/bind', {
        code,
        password,
        mobile,
        passwordNotSet
    });
}

//  /api/v1/{client}/{channel}/user/mobile/available/{mobile} 用户手机检测
export function availableUserMobile(mobile) {
    return http.get(config.API_ILOKA_URL + '/user/mobile/available/{mobile}', null, {
        params: {
            mobile
        }
    });
}

//get  /api/v1/{client}/{channel}/user/email/bind  // 用户绑定邮件请求 发送验证码至用户邮箱

export function bindUserEmailCode(email) {
    return http.get(config.API_ILOKA_URL + '/user/email/bind', {email});
}

//get  /api/v1/{client}/{channel}/user/email/available  用户电子邮件检测
export function availableUserEmail(email) {
    return http.get(config.API_ILOKA_URL + '/user/email/available', {email});
}
//post  /api/v1/{client}/{channel}/user/email/bind 用户绑定邮件确认
export function bindUserEmail({
    code,
    email,
    password,
    passwordNotSet,
}) {
    return http.post(config.API_ILOKA_URL + '/user/email/bind', {
        code,
        email,
        password,
        passwordNotSet
    });
}

// POST /api/v1/{client}/{channel}/user/unbind 第三方帐号解绑
export function updateUserUnbind(params) {
    return http.post(config.API_ILOKA_URL + '/user/unbind', params);
}


//get  /api/v1/{client}/{channel}/user/email/alter  用户绑定邮件请求，发送验证码到邮箱
export function alterCodeToUserEmail({
    email,
    verifyCode
}) {
    return http.get(config.API_ILOKA_URL + '/user/email/alter', {
        email,
        verifyCode
    });
}

//put  /api/v1/{client}/{channel}/user/email/alter 用户修改邮件确认 确认原邮件一致性
export function alterSureUserEmail({
    email,
    code
}) {
    return http.post(config.API_ILOKA_URL + '/user/email/alter', {
        email,
        code
    });
}

//post  /api/v1/{client}/{channel}/user/email/alter 确认修改邮箱
export function alterUserEmail({
    email,
    code,
    verifyCode
}) {
    return http.put(config.API_ILOKA_URL + '/user/email/alter', {
        email,
        code,
        verifyCode
    });
}
