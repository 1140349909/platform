import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {ROLE} from 'common/config/constants';
import _ from 'lodash';
import {parseAny} from 'common/util';
import {getMediaUrl} from 'common/util/media';
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAILURE,
    GET_UIN_VERSION_INFO_SUCCESS
} from './action';

const initialState = fromJS({

    // 是否加载过用户信息
    isLoaded: false,

    // 是否已经登陆成功
    logged: false,

    // 用户信息
    info: null,

    // // TODO:用户信息
    // user: {
    //     uin: "rainbow",
    //     uinName: "凌波微步",
    //     role: '最大角色',
    //     ownerUin: "rainbow",
    //     nickName: "1233",
    //     mobile: "18923562360",
    //     email: "iris_wu@linkin.mobi",
    //     headImg: "585a408a0f93d546c0d1d5a2"
    // },

    // 产品版本信息
    version: null,

    // 账号所属的公司列表
    uins: [],

    // 账号角色
    roles: [],

    // 用户账号角色权限
    permissions: {},

    // 用户业务菜单列表
    menu: [],

    // TODO:用户业务功能权限
    modules: {},

    // 用户业务权益信息 // rights + uinRights
    rights: {}

});

export default createReducer(initialState, {

    // 登陆成功
    [LOGIN_SUCCESS]: (state) => state.merge({
        info: null,
        isLoaded: false,
        logged: true
    }),

    // 登陆失败
    [LOGIN_FAILURE]: (state) => state.merge({
        info: null,
        isLoaded: false,
        logged: false
    }),

    // 注销成功
    [LOGOUT_SUCCESS]: (state) => state.merge({
        info: null,
        isLoaded: false,
        logged: false
    }),

    // 获取登陆用户信息
    [GET_USER_INFO_SUCCESS]: (state, {payload}) => {
        let info = payload.data;
        if (_.isEmpty(info)) {
            return state.merge({
                isLoaded: true,
                logged: false
            });
        }

        if (!info.nickName) {
            info.nickName = '佚名';
        }

        // 最大的角色
        info.role = getRole(info.roles);

        info.headImgUrl = getMediaUrl(info.headImg, 'avatar');

        //用户是否是V用户
        info.isVuser = isHasVRights(info.ulevels);

        const permissions = getPermissions(info.roles);

        const uins = [{
            name: info.nickName,
            uin: info.ownerUin,
            uinName: info.ownerUinName
        }].concat(info.uins);


        for (let i = 0; i < uins.length; i++) {
            if (uins[i].uin == info.uin) {
                info.uinName = uins[i].uinName;
                info.uinNickname = uins[i].name;
                break;
            }
        }
        return state.merge({
            info,
            logged: true,
            isLoaded: true,
            roles: info.roles,
            uins,
            permissions
        });
    },

    [GET_USER_INFO_FAILURE]: (state) => {
        return state.merge({
            logged: false,
            isLoaded: false
        });
    },

    // 获取用户当前版本信息
    [GET_UIN_VERSION_INFO_SUCCESS]: (state, {payload}) => {
        const {data} = payload;
        var versionInfo = {
            // 用户版本信息
            version: _getUinVersion(data),
            // 用户权益列表
            rights: _getUinRights(data.rights, data.uinRights),
            modules: _getUinModules(data.modules),
            menu: _getUinMenu(data.menu)
        };

        return state.merge(versionInfo);
    }
});

// 获取用户最大角色
function getRole(roles) {

    if (_.isEmpty(roles)) {
        return ROLE.VISITOR;
    }

    if (roles.indexOf('PLATFORM') != -1) {
        return ROLE.PLATFORM;
    }

    if (roles.indexOf('ADMIN') != -1) {
        return ROLE.ADMIN;
    }

    if (roles.indexOf('MANAGER') != -1) {
        return ROLE.MANAGER;
    }

    if (roles.indexOf('USER') != -1) {
        return ROLE.USER;
    }

    if (roles.indexOf('MEMBER') != -1) {
        return ROLE.MEMBER;
    }
}

// 是否有权限
function hasPermissions(userRoles, authRoles) {

    const role = getRole(userRoles);

    if (role < ROLE.MANAGER) {
        return false;
    }

    for (var i = 0; i < authRoles.length; i++) {
        if (userRoles.indexOf(authRoles[i]) != -1) {
            return true;
        }
    }
    return false;
}

// 获取用户功能权限
function getPermissions(userRoles) {
    return {
        PLATFORM: hasPermissions(userRoles, ['PLATFORM']),
        MARKETING: hasPermissions(userRoles, ['ADMIN', 'MANAGER'])
    };
}

// 用户当前企业的版本信息
function _getUinVersion(version) {
    const {validDate} = version;
    return {
        id: version.id,
        name: version.name,
        version: version.version,
        price: version.price,
        startDate: _.has(validDate, 'startDate') ? validDate['startDate'] : 0,
        endDate: _.has(validDate, 'endDate') ? validDate['endDate'] : 0,
        createdDate: version.createdDate,
        channel: version.channel
    };
}

// 用户业务权益信息 处理权益数据结构,合并权益规则和配置
function _getUinRights(rights, uinRights = {}) {
    let data = {};

    if (_.isEmpty(rights)) {
        return data;
    }

    rights.map((right) => {
        if (_.has(uinRights, right.mark)) {
            if (right.paraType == 'numeric') {
                right.value = parseAny(right.defaultValue) + parseAny(uinRights[right.mark]);
            } else {
                right.value = parseAny(uinRights[right.mark]);
            }
        } else {
            right.value = parseAny(right.defaultValue);
        }

        data[right.mark] = right;
    });

    return data;
}

// 用户业务功能权限
function _getUinModules(modules) {

    let data = {};
    modules.map((module) => {
        if (module.key) {
            data[module.key] = module.status;
        }
    });
    return data;
}

// 用户业务菜单列表
function _getUinMenu(menu) {
    return menu;
}

//判断当前登录用户是否是V用户
function isHasVRights(ulevels) {
    let isVuser = false;
    _.map(ulevels, (level) => {
        if (level.ln == 'valuer') {
            isVuser = true;
            return;
        }
    });
    return isVuser;
}
