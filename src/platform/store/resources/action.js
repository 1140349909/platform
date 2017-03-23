import * as apiResources from '../../../common/api/resources';

//资源审查列表服务
export const GET_AUDIT_STATUS_LIST = 'GET_AUDIT_STATUS_LIST';
export const GET_AUDIT_STATUS_LIST_PENDING = 'GET_AUDIT_STATUS_LIST_PENDING';
export const GET_AUDIT_STATUS_LIST_SUCCESS = 'GET_AUDIT_STATUS_LIST_SUCCESS';
export const GET_AUDIT_STATUS_LIST_FAILURE = 'GET_AUDIT_STATUS_LIST_FAILURE';
export function getAuditStatusList(params) {
    return {
        type: GET_AUDIT_STATUS_LIST,
        payload: apiResources.getAuditStatusList(params)
    };
}

//资源审查
export const AUDIT_RESOURCES = 'AUDIT_RESOURCES';
export const AUDIT_RESOURCES_PENDING = 'AUDIT_RESOURCES_PENDING';
export const AUDIT_RESOURCES_SUCCESS = 'AUDIT_RESOURCES_SUCCESS';
export const AUDIT_RESOURCES_FAILURE = 'AUDIT_RESOURCES_FAILURE';
export function auditResources(params) {
    return {
        type: AUDIT_RESOURCES,
        payload: apiResources.auditResources(params)
    };
}

