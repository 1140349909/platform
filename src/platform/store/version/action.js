import * as apiVersion from '../../../common/api/version';

//
export const DELETE_VERSION = 'DELETE_VERSION';
export const DELETE_VERSION_PENDING = 'DELETE_VERSION_PENDING';
export const DELETE_VERSION_SUCCESS = 'DELETE_VERSION_SUCCESS';
export const DELETE_VERSION_FAILURE = 'DELETE_VERSION_FAILURE';

export const GET_VERSION_INFO = 'GET_VERSION_INFO';
export const GET_VERSION_INFO_PENDING = 'GET_VERSION_INFO_PENDING';
export const GET_VERSION_INFO_SUCCESS = 'GET_VERSION_INFO_SUCCESS';
export const GET_VERSION_INFO_FAILURE = 'GET_VERSION_INFO_FAILURE';

export const GET_VERSION_LIST = 'GET_VERSION_LIST';
export const GET_VERSION_LIST_PENDING = 'GET_VERSION_LIST_PENDING';
export const GET_VERSION_LIST_SUCCESS = 'GET_VERSION_LIST_SUCCESS';
export const GET_VERSION_LIST_FAILURE = 'GET_VERSION_LIST_FAILURE';

export const GET_VERSION_MODULE_INFO = 'GET_VERSION_MODULE_INFO';
export const GET_VERSION_MODULE_INFO_PENDING = 'GET_VERSION_MODULE_INFO_PENDING';
export const GET_VERSION_MODULE_INFO_SUCCESS = 'GET_VERSION_MODULE_INFO_SUCCESS';
export const GET_VERSION_MODULE_INFO_FAILURE = 'GET_VERSION_MODULE_INFO_FAILURE';

export const GET_VERSION_MODULE_LIST = 'GET_VERSION_MODULE_LIST';
export const GET_VERSION_MODULE_LIST_PENDING = 'GET_VERSION_MODULE_LIST_PENDING';
export const GET_VERSION_MODULE_LIST_SUCCESS = 'GET_VERSION_MODULE_LIST_SUCCESS';
export const GET_VERSION_MODULE_LIST_FAILURE = 'GET_VERSION_MODULE_LIST_FAILURE';

export const GET_VERSION_AUTH = 'GET_VERSION_AUTH';
export const GET_VERSION_AUTH_PENDING = 'GET_VERSION_AUTH_PENDING';
export const GET_VERSION_AUTH_SUCCESS = 'GET_VERSION_AUTH_SUCCESS';
export const GET_VERSION_AUTH_FAILURE = 'GET_VERSION_AUTH_FAILURE';

export const GET_VERSION = 'GET_VERSION';
export const GET_VERSION_PENDING = 'GET_VERSION_PENDING';
export const GET_VERSION_SUCCESS = 'GET_VERSION_SUCCESS';
export const GET_VERSION_FAILURE = 'GET_VERSION_FAILURE';

export const GET_VERSION_AUTH_INFO = 'GET_VERSION_AUTH_INFO';
export const GET_VERSION_AUTH_INFO_PENDING = 'GET_VERSION_AUTH_INFO_PENDING';
export const GET_VERSION_AUTH_INFO_SUCCESS = 'GET_VERSION_AUTH_INFO_SUCCESS';
export const GET_VERSION_AUTH_INFO_FAILURE = 'GET_VERSION_AUTH_INFO_FAILURE';

export const ADD_VERSION_AUTH = 'ADD_VERSION_AUTH';
export const ADD_VERSION_AUTH_PENDING = 'ADD_VERSION_AUTH_PENDING';
export const ADD_VERSION_AUTH_SUCCESS = 'ADD_VERSION_AUTH_SUCCESS';
export const ADD_VERSION_AUTH_FAILURE = 'ADD_VERSION_AUTH_FAILURE';

export const ADD_VERSION_RIGHTS = 'ADD_VERSION_RIGHTS';
export const ADD_VERSION_RIGHTS_PENDING = 'ADD_VERSION_RIGHTS_PENDING';
export const ADD_VERSION_RIGHTS_SUCCESS = 'ADD_VERSION_RIGHTS_SUCCESS';
export const ADD_VERSION_RIGHTS_FAILURE = 'ADD_VERSION_RIGHTS_FAILURE';

export const UPDATE_VERSION = 'UPDATE_VERSION';
export const UPDATE_VERSION_PENDING = 'UPDATE_VERSION_PENDING';
export const UPDATE_VERSION_SUCCESS = 'UPDATE_VERSION_SUCCESS';
export const UPDATE_VERSION_FAILURE = 'UPDATE_VERSION_FAILURE';

export const ADD_VERSION = 'ADD_VERSION';
export const ADD_VERSION_PENDING = 'ADD_VERSION_PENDING';
export const ADD_VERSION_SUCCESS = 'ADD_VERSION_SUCCESS';
export const ADD_VERSION_FAILURE = 'ADD_VERSION_FAILURE';

export const COPY_VERSION = 'COPY_VERSION';
export const COPY_VERSION_PENDING = 'COPY_VERSION_PENDING';
export const COPY_VERSION_SUCCESS = 'COPY_VERSION_SUCCESS';
export const COPY_VERSION_FAILURE = 'COPY_VERSION_FAILURE';

export const RESET_VERSION_RIGHTS = 'RESET_VERSION_RIGHTS';
export const RESET_VERSION_RIGHTS_PENDING = 'RESET_VERSION_RIGHTS_PENDING';
export const RESET_VERSION_RIGHTS_SUCCESS = 'RESET_VERSION_RIGHTS_SUCCESS';
export const RESET_VERSION_RIGHTS_FAILURE = 'RESET_VERSION_RIGHTS_FAILURE';

export const SWITCH_VERSION_STATUS = 'SWITCH_VERSION_STATUS';
export const SWITCH_VERSION_STATUS_PENDING = 'SWITCH_VERSION_STATUS_PENDING';
export const SWITCH_VERSION_STATUS_SUCCESS = 'SWITCH_VERSION_STATUS_SUCCESS';
export const SWITCH_VERSION_STATUS_FAILURE = 'SWITCH_VERSION_STATUS_FAILURE';

//
export const DELETE_VERSION_PARA = 'DELETE_VERSION_PARA';
export const DELETE_VERSION_PARA_PENDING = 'DELETE_VERSION_PARA_PENDING';
export const DELETE_VERSION_PARA_SUCCESS = 'DELETE_VERSION_PARA_SUCCESS';
export const DELETE_VERSION_PARA_FAILURE = 'DELETE_VERSION_PARA_FAILURE';

export const GET_VERSION_PARA = 'GET_VERSION_PARA';
export const GET_VERSION_PARA_PENDING = 'GET_VERSION_PARA_PENDING';
export const GET_VERSION_PARA_SUCCESS = 'GET_VERSION_PARA_SUCCESS';
export const GET_VERSION_PARA_FAILURE = 'GET_VERSION_PARA_FAILURE';

export const GET_VERSION_PARA_LIST = 'GET_VERSION_PARA_LIST';
export const GET_VERSION_PARA_LIST_PENDING = 'GET_VERSION_PARA_LIST_PENDING';
export const GET_VERSION_PARA_LIST_SUCCESS = 'GET_VERSION_PARA_LIST_SUCCESS';
export const GET_VERSION_PARA_LIST_FAILURE = 'GET_VERSION_PARA_LIST_FAILURE';

export const UPDATE_VERSION_PARA = 'UPDATE_VERSION_PARA';
export const UPDATE_VERSION_PARA_PENDING = 'UPDATE_VERSION_PARA_PENDING';
export const UPDATE_VERSION_PARA_SUCCESS = 'UPDATE_VERSION_PARA_SUCCESS';
export const UPDATE_VERSION_PARA_FAILURE = 'UPDATE_VERSION_PARA_FAILURE';

export const ADD_VERSION_PARA = 'ADD_VERSION_PARA';
export const ADD_VERSION_PARA_PENDING = 'ADD_VERSION_PARA_PENDING';
export const ADD_VERSION_PARA_SUCCESS = 'ADD_VERSION_PARA_SUCCESS';
export const ADD_VERSION_PARA_FAILURE = 'ADD_VERSION_PARA_FAILURE';

export const SYNCHRONIZE_VERSION_PARA = 'SYNCHRONIZE_VERSION_PARA';
export const SYNCHRONIZE_VERSION_PARA_PENDING = 'SYNCHRONIZE_VERSION_PARA_PENDING';
export const SYNCHRONIZE_VERSION_PARA_SUCCESS = 'SYNCHRONIZE_VERSION_PARA_SUCCESS';
export const SYNCHRONIZE_VERSION_PARA_FAILURE = 'SYNCHRONIZE_VERSION_PARA_FAILURE';

//
export function deleteVersion(id) {
    return {
        type: DELETE_VERSION,
        payload: apiVersion.deleteVersion(id)
    };
}

//
export function getVersionInfo(versionId) {
    return {
        type: GET_VERSION_INFO,
        payload: apiVersion.getVersionInfo(versionId)
    };
}

//
export function getVersionList(params) {
    return {
        type: GET_VERSION_LIST,
        payload: apiVersion.getVersionList(params)
    };
}

export function getVersionModuleInfo(tagId) {
    return {
        type: GET_VERSION_MODULE_INFO,
        payload: apiVersion.getVersionModuleInfo(tagId)
    };
}

//
export function getVersionModuleList(params) {
    return {
        type: GET_VERSION_MODULE_LIST,
        payload: apiVersion.getVersionModuleList(params)
    };
}

//
export function getVersionAuth(id) {
    return {
        type: GET_VERSION_AUTH,
        payload: apiVersion.getVersionAuth(id)
    };
}

//
export function getVersion(id) {
    return {
        type: GET_VERSION,
        payload: apiVersion.getVersion(id)
    };
}

//
export function getVersionAuthInfo(id) {
    return {
        type: GET_VERSION_AUTH_INFO,
        payload: apiVersion.getVersionAuthInfo(id)
    };
}

export function addVersionAuth(data) {
    return {
        type: ADD_VERSION_AUTH,
        payload: apiVersion.addVersionAuth(data)
    };
}

export function addVersionRights(data) {
    return {
        type: ADD_VERSION_RIGHTS,
        payload: apiVersion.addVersionRights(data)
    };
}

export function updateVersion(params) {
    return {
        type: UPDATE_VERSION,
        payload: apiVersion.updateVersion(params)
    };
}

//
export function addVersion(data) {
    return {
        type: ADD_VERSION,
        payload: apiVersion.addVersion(data)
    };
}

export function copyVersion(params) {
    return {
        type: COPY_VERSION,
        payload: apiVersion.copyVersion(params)
    };
}

export function resetVersionRights(id) {
    return {
        type: RESET_VERSION_RIGHTS,
        payload: apiVersion.resetVersionRights(id)
    };
}

export function switchVersionStatus(params) {
    return {
        type: SWITCH_VERSION_STATUS,
        payload: apiVersion.switchVersionStatus(params)
    };
}

/**/
//
export function deleteVersionPara(id) {
    return {
        type: DELETE_VERSION_PARA,
        payload: apiVersion.deleteVersionPara(id)
    };
}

//
export function getVersionParaList() {
    return {
        type: GET_VERSION_PARA_LIST,
        payload: apiVersion.getVersionParaList()
    };
}

//
export function getVersionPara(id) {
    return {
        type: GET_VERSION_PARA,
        payload: apiVersion.getVersionPara(id)
    };
}

export function updateVersionPara(params) {
    return {
        type: UPDATE_VERSION_PARA,
        payload: apiVersion.updateVersionPara(params)
    };
}

//
export function addVersionPara(data) {
    return {
        type: ADD_VERSION_PARA,
        payload: apiVersion.addVersionPara(data)
    };
}

export function synchronizePara(id) {
    return {
        type: SYNCHRONIZE_VERSION_PARA,
        payload: apiVersion.synchronizePara(id)
    };
}




