import  * as apiUser from  '../../../common/api/user';
//运营人员激活服务
export const ACTIVATE_ACCOUNT = 'ACTIVATE_ACCOUNT';
export const ACTIVATE_ACCOUNT_PENDING = 'ACTIVATE_ACCOUNT_PENDING';
export const ACTIVATE_ACCOUNT_SUCCESS = 'ACTIVATE_ACCOUNT_SUCCESS';
export const ACTIVATE_ACCOUNT_FAILURE = 'ACTIVATE_ACCOUNT_FAILURE';

//获取操作人员列表
export const GET_USER_LIST = 'GET_USER_LIST';
export const GET_USER_LIST_PENDING = 'GET_USER_LIST_PENDING';
export const GET_USER_LIST_SUCCESS = 'GET_USER_LIST_SUCCESS';
export const GET_USER_LIST_FAILURE = 'GET_USER_LIST_FAILURE';

//获取运营人员列表
export const GET_MANAGER_USER_LIST = 'GET_MANAGER_USER_LIST';
export const GET_MANAGER_USER_LIST_PENDING = 'GET_MANAGER_USER_LIST_PENDING';
export const GET_MANAGER_USER_LIST_SUCCESS = 'GET_MANAGER_USER_LIST_SUCCESS';
export const GET_MANAGER_USER_LIST_FAILURE = 'GET_MANAGER_USER_LIST_FAILURE';

//分配运营人员
export const ADD_ADMIN_USER_INFO = 'ADD_ADMIN_USER_INFO';
export const ADD_ADMIN_USER_INFO_PENDING = 'ADD_ADMIN_USER_INFO_PENDING';
export const ADD_ADMIN_USER_INFO_SUCCESS = 'ADD_ADMIN_USER_INFO_SUCCESS';
export const ADD_ADMIN_USER_INFO_FAILURE = 'ADD_ADMIN_USER_INFO_FAILURE';

//运营人员设置密码
export const UPDATE_ACCOUNT_PASSWORD = 'UPDATE_ACCOUNT_PASSWORD';
export const UPDATE_ACCOUNT_PASSWORD_PENDING = 'UPDATE_ACCOUNT_PASSWORD_PENDING';
export const UPDATE_ACCOUNT_PASSWORD_SUCCESS = 'UPDATE_ACCOUNT_PASSWORD_SUCCESS';
export const UPDATE_ACCOUNT_PASSWORD_FAILURE = 'UPDATE_ACCOUNT_PASSWORD_FAILURE';

//发送激活运营人员邮件服务
export const SEND_ACCOUNT_MAIL = 'SEND_ACCOUNT_MAIL';
export const SEND_ACCOUNT_MAIL_PENDING = 'SEND_ACCOUNT_MAIL_PENDING';
export const SEND_ACCOUNT_MAIL_SUCCESS = 'SEND_ACCOUNT_MAIL_SUCCESS';
export const SEND_ACCOUNT_MAIL_FAILURE = 'SEND_ACCOUNT_MAIL_FAILURE';

//禁/启用运营人员
export const UPDATE_USER_STATUS = 'UPDATE_USER_STATUS';
export const UPDATE_USER_STATUS_PENDING = 'UPDATE_USER_STATUS_PENDING';
export const UPDATE_USER_STATUS_SUCCESS = 'UPDATE_USER_STATUS_SUCCESS';
export const UPDATE_USER_STATUS_FAILURE = 'UPDATE_USER_STATUS_FAILURE';

//验证昵称
export const CHECK_REG_NICKNAME = 'CHECK_REG_NICKNAME';
export const CHECK_REG_NICKNAME_PENDING = 'CHECK_REG_NICKNAME_PENDING';
export const CHECK_REG_NICKNAME_SUCCESS = 'CHECK_REG_NICKNAME_SUCCESS';
export const CHECK_REG_NICKNAME_FAILURE = 'CHECK_REG_NICKNAME_FAILURE';

//验证手机号码
export const VALIDATE_USER_MOBILE = 'VALIDATE_USER_MOBILE';
export const VALIDATE_USER_MOBILE_PENDING = 'VALIDATE_USER_MOBILE_PENDING';
export const VALIDATE_USER_MOBILE_SUCCESS = 'VALIDATE_USER_MOBILE_SUCCESS';
export const VALIDATE_USER_MOBILE_FAILURE = 'VALIDATE_USER_MOBILE_FAILURE';

//发送更换手机绑定邮件
export const BIND_MOBILE_BY_EMAIL = 'BIND_MOBILE_BY_EMAIL';
export const BIND_MOBILE_BY_EMAIL_PENDING = 'BIND_MOBILE_BY_EMAIL_PENDING';
export const BIND_MOBILE_BY_EMAIL_SUCCESS = 'BIND_MOBILE_BY_EMAIL_SUCCESS';
export const BIND_MOBILE_BY_EMAIL_FAILURE = 'BIND_MOBILE_BY_EMAIL_FAILURE';

//修改密码
export const UPDATE_USER_PASSWORD = 'UPDATE_USER_PASSWORD';
export const UPDATE_USER_PASSWORD_PENDING = 'UPDATE_USER_PASSWORD_PENDING';
export const UPDATE_USER_PASSWORD_SUCCESS = 'UPDATE_USER_PASSWORD_SUCCESS';
export const UPDATE_USER_PASSWORD_FAILURE = 'UPDATE_USER_PASSWORD_FAILURE';

//修改用户信息
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const UPDATE_USER_INFO_PENDING = 'UPDATE_USER_INFO_PENDING';
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_FAILURE = 'UPDATE_USER_INFO_FAILURE';

//设置手机号
export const BIND_MOBILE_SMSCODE = 'BIND_MOBILE_SMSCODE';
export const BIND_MOBILE_SMSCODE_PENDING = 'BIND_MOBILE_SMSCODE_PENDING';
export const BIND_MOBILE_SMSCODE_SUCCESS = 'BIND_MOBILE_SMSCODE_SUCCESS';
export const BIND_MOBILE_SMSCODE_FAILURE = 'BIND_MOBILE_SMSCODE_FAILURE';

//获取操作人员详情
export const GET_ADMIN_USERINFO = 'GET_ADMIN_USERINFO';
export const GET_ADMIN_USERINFO_PENDING = 'GET_ADMIN_USERINFO_PENDING';
export const GET_ADMIN_USERINFO_SUCCESS = 'GET_ADMIN_USERINFO_SUCCESS';
export const GET_ADMIN_USERINFO_FAILURE = 'GET_ADMIN_USERINFO_FAILURE';

//修改运营人员信息
export const UPDATE_ADMIN_USERINFO = 'UPDATE_ADMIN_USERINFO';
export const UPDATE_ADMIN_USERINFO_PENDING = 'UPDATE_ADMIN_USERINFO_PENDING';
export const UPDATE_ADMIN_USERINFO_SUCCESS = 'UPDATE_ADMIN_USERINFO_SUCCESS';
export const UPDATE_ADMIN_USERINFO_FAILURE = 'UPDATE_ADMIN_USERINFO_FAILURE';


//用户通过手机号码注册
export const ADD_USER_REG_MOBILE = 'ADD_USER_REG_MOBILE';
export const ADD_USER_REG_MOBILE_PENDING = 'ADD_USER_REG_MOBILE_PENDING';
export const ADD_USER_REG_MOBILE_SUCCESS = 'ADD_USER_REG_MOBILE_SUCCESS';
export const ADD_USER_REG_MOBILE_FAILURE = 'ADD_USER_REG_MOBILE_FAILURE';

//绑定用户手机号
export const BIND_USER_MOBILE = 'BIND_USER_MOBILE';
export const BIND_USER_MOBILE_PENDING = 'BIND_USER_MOBILE_PENDING';
export const BIND_USER_MOBILE_SUCCESS = 'BIND_USER_MOBILE_SUCCESS';
export const BIND_USER_MOBILE_FAILURE = 'BIND_USER_MOBILE_FAILURE';

//验证手机是否可用
export const AVAILABLE_USER_MOBILE = 'AVAILABLE_USER_MOBILE';
export const AVAILABLE_USER_MOBILE_PENDING = 'AVAILABLE_USER_MOBILE_PENDING';
export const AVAILABLE_USER_MOBILE_SUCCESS = 'AVAILABLE_USER_MOBILE_SUCCESS';
export const AVAILABLE_USER_MOBILE_FAILURE = 'AVAILABLE_USER_MOBILE_FAILURE';

//第三方帐号解绑
export const UPDATE_USER_UNBIND = 'UPDATE_USER_UNBIND';
export const UPDATE_USER_UNBIND_PENDING = 'UPDATE_USER_UNBIND_PENDING';
export const UPDATE_USER_UNBIND_SUCCESS = 'UPDATE_USER_UNBIND_SUCCESS';
export const UPDATE_USER_UNBIND_FAILURE = 'UPDATE_USER_UNBIND_FAILURE';

//运营人员激活服务
export function activateAccount(code) {
    return {
        meta: {
            silent: true
        },
        type: ACTIVATE_ACCOUNT,
        payload: apiUser.activateAccount(code)
    };
}

//获取操作人员列表
export function getUserList(params) {
    return {
        type: GET_USER_LIST,
        payload: apiUser.getUserList(params)
    };
}

//获取运营人员列表
export function getManagerUserList() {
    return {
        type: GET_MANAGER_USER_LIST,
        payload: apiUser.getManagerUserList()
    };
}

//运营人员设置密码
export function updateAccountPassword(password) {
    return {
        type: UPDATE_ACCOUNT_PASSWORD,
        payload: apiUser.updateAccountPassword(password)
    };
}

//发送激活运营人员邮件服务
export function sendAccountMail(params) {
    return {
        meta: {
            silent: true
        },
        type: SEND_ACCOUNT_MAIL,
        payload: apiUser.sendAccountMail(params)
    };
}

//禁/启用用户
export function updateUserStatus(status, userid) {
    return {
        type: UPDATE_USER_STATUS,
        payload: apiUser.updateUserStatus(status, userid)
    };
}

//昵称检测
export function checkRegNickname(nickname) {
    return {
        type: CHECK_REG_NICKNAME,
        payload: apiUser.checkRegNickname(nickname)
    };
}

export function validateMobile(params) {
    return {
        meta: {
            silent: true
        },
        type: VALIDATE_USER_MOBILE,
        payload: apiUser.validateMobile(params)
    };
}

export function bindMobileByEmail() {
    return {
        meta: {
            silent: true
        },
        type: BIND_MOBILE_BY_EMAIL,
        payload: apiUser.bindMobileByEmail()
    };
}

export function updateUserPassword(params) {
    return {
        meta: {
            silent: true
        },
        type: UPDATE_ACCOUNT_PASSWORD,
        payload: apiUser.updateUserPassword(params)
    };
}
export function updateUserInfo(params) {
    return {
        type: UPDATE_USER_INFO,
        payload: {
            promise: apiUser.updateUserInfo(params),
            data: params
        }
    };
}

export function bindMobileSmsCode(params) {
    return {
        meta: {
            silent: true
        },
        type: BIND_MOBILE_SMSCODE,
        payload: apiUser.bindMobileSmsCode(params)
    };
}

export function getAdminUserInfo(id) {
    return {
        meta: {
            silent: true
        },
        type: GET_ADMIN_USERINFO,
        payload: apiUser.getAdminUserInfo(id)
    };
}


//分配运营人员
export function addAdminUserInfo(params) {
    return {
        meta: {
            silent: true
        },
        type: ADD_ADMIN_USER_INFO,
        payload: {
            promise: apiUser.addAdminUserInfo(params),
            data: params
        }
    };
}

export function updateAdminUserInfo(params) {
    return {
        type: UPDATE_ADMIN_USERINFO,
        payload: {
            promise: apiUser.updateAdminUserInfo(params),
            data: params
        }
    };
}

export function saveAdminUserInfo(item) {
    return item.id ? updateAdminUserInfo(item) : addAdminUserInfo(item);
}

export function addUserRegMobile(params) {
    return {
        meta: {
            silent: true
        },
        type: ADD_USER_REG_MOBILE,
        payload: apiUser.addUserRegMobile(params)
    };
}


export function bindUserMobile(params) {
    return {
        meta: {
            silent: true
        },
        type: BIND_USER_MOBILE,
        payload: apiUser.bindUserMobile(params)
    };
}

export function availableUserMobile(mobile) {
    return {
        meta: {
            silent: true
        },
        type: AVAILABLE_USER_MOBILE,
        payload: apiUser.availableUserMobile(mobile)
    };
}

export function updateUserUnbind(params) {
    return {
        meta: {
            silent: true
        },
        type: UPDATE_USER_UNBIND,
        payload: apiUser.updateUserUnbind(params)
    };
}


//用户绑定邮件请求 发送验证码至用户邮箱
export const BIND_USER_EMAIL_CODE = 'BIND_USER_EMAIL_CODE';
export const BIND_USER_EMAIL_CODE_PENDING = 'BIND_USER_EMAIL_CODE_PENDING';
export const BIND_USER_EMAIL_CODE_SUCCESS = 'BIND_USER_EMAIL_CODE_SUCCESS';
export const BIND_USER_EMAIL_CODE_FAILURE = 'BIND_USER_EMAIL_CODE_FAILURE';
export function bindUserEmailCode(email) {
    return {
        meta: {
            silent: true
        },
        type: BIND_USER_EMAIL_CODE,
        payload: apiUser.bindUserEmailCode(email)
    };
}

// 用户电子邮件检测
export const AVAILABLE_USER_EMAIL = 'AVAILABLE_USER_EMAIL';
export const AVAILABLE_USER_EMAIL_PENDING = 'AVAILABLE_USER_EMAIL_PENDING';
export const AVAILABLE_USER_EMAIL_SUCCESS = 'AVAILABLE_USER_EMAIL_SUCCESS';
export const AVAILABLE_USER_EMAIL_FAILURE = 'AVAILABLE_USER_EMAIL_FAILURE';
export function availableUserEmail(email) {
    return {
        meta: {
            silent: true
        },
        type: AVAILABLE_USER_EMAIL,
        payload: apiUser.availableUserEmail(email)
    };
}

//用户绑定邮件确认 绑定邮件  或者修改邮件  或者绑定邮件并同时设置密码
export const BIND_USER_EMAIL = 'BIND_USER_EMAIL';
export const BIND_USER_EMAIL_PENDING = 'BIND_USER_EMAIL_PENDING';
export const BIND_USER_EMAIL_SUCCESS = 'BIND_USER_EMAIL_SUCCESS';
export const BIND_USER_EMAIL_FAILURE = 'BIND_USER_EMAIL_FAILURE';
export function bindUserEmail(params) {
    return {
        meta: {
            silent: true
        },
        type: BIND_USER_EMAIL,
        payload: {
            promise: apiUser.bindUserEmail(params),
            data: params
        }
    };
}

//用户修改邮件确认 发送邮件激活码
export const ALTER_CODE_TO_USER_EMAIL = 'ALTER_CODE_TO_USER_EMAIL';
export const ALTER_CODE_TO_USER_EMAIL_PENDING = 'ALTER_CODE_TO_USER_EMAIL_PENDING';
export const ALTER_CODE_TO_USER_EMAIL_SUCCESS = 'ALTER_CODE_TO_USER_EMAIL_SUCCESS';
export const ALTER_CODE_TO_USER_EMAIL_FAILURE = 'ALTER_CODE_TO_USER_EMAIL_FAILURE';
export function alterCodeToUserEmail(params) {
    return {
        meta: {
            silent: true
        },
        type: ALTER_CODE_TO_USER_EMAIL,
        payload: {
            promise: apiUser.alterCodeToUserEmail(params),
            data: params
        }
    };
}

//确认原邮件一致性
export const ALTER_SURE_USER_EMAIL = 'ALTER_SURE_USER_EMAIL';
export const ALTER_SURE_USER_EMAIL_PENDING = 'ALTER_SURE_USER_EMAIL_PENDING';
export const ALTER_SURE_USER_EMAIL_SUCCESS = 'ALTER_SURE_USER_EMAIL_SUCCESS';
export const ALTER_SURE_USER_EMAIL_FAILURE = 'ALTER_SURE_USER_EMAIL_FAILURE';
export function alterSureUserEmail(params) {
    return {
        meta: {
            silent: true
        },
        type: ALTER_SURE_USER_EMAIL,
        payload: {
            promise: apiUser.alterSureUserEmail(params),
            data: params
        }
    };
}
//重新绑定新的邮箱
export const ALTER_USER_EMAIL = 'ALTER_USER_EMAIL';
export const ALTER_USER_EMAIL_PENDING = 'ALTER_USER_EMAIL_PENDING';
export const ALTER_USER_EMAIL_SUCCESS = 'ALTER_USER_EMAIL_SUCCESS';
export const ALTER_USER_EMAIL_FAILURE = 'ALTER_USER_EMAIL_FAILURE';
export function alterUserEmail(params) {
    return {
        meta: {
            silent: true
        },
        type: ALTER_USER_EMAIL,
        payload: {
            promise: apiUser.alterUserEmail(params),
            data: params
        }
    };
}

