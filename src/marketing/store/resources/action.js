import * as apiResources from '../../../common/api/resources';

//资源申请审查
export const APPLY_AUDIT_RESOURCES = 'APPLY_AUDIT_RESOURCES';
export const APPLY_AUDIT_RESOURCES_PENDING = 'APPLY_AUDIT_RESOURCES_PENDING';
export const APPLY_AUDIT_RESOURCES_SUCCESS = 'APPLY_AUDIT_RESOURCES_SUCCESS';
export const APPLY_AUDIT_RESOURCES_FAILURE = 'APPLY_AUDIT_RESOURCES_FAILURE';
export function applyAuditResources(params) {
    return {
        type: APPLY_AUDIT_RESOURCES,
        payload: apiResources.applyAuditResources(params)

    };
}
