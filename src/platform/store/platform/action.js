import  * as apiCommon from  '../../../common/api/common';
//平台指令
export const PLATFORM_CMD = 'PLATFORM_CMD';
export const PLATFORM_CMD_PENDING = 'PLATFORM_CMD_PENDING';
export const PLATFORM_CMD_SUCCESS = 'PLATFORM_CMD_SUCCESS';
export const PLATFORM_CMD_FAILURE = 'PLATFORM_CMD_FAILURE';

export function platformCmd(cmd) {
    return {
        type: PLATFORM_CMD,
        payload: apiCommon.platformCmd(cmd)
    };
}
