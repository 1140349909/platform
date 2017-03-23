import  * as apiHelp from  '../../../common/api/help';
//常见问题删除
export const DELETE_HELP = 'DELETE_HELP';
export const DELETE_HELP_PENDING = 'DELETE_HELP_PENDING';
export const DELETE_HELP_SUCCESS = 'DELETE_HELP_SUCCESS';
export const DELETE_HELP_FAILURE = 'DELETE_HELP_FAILURE';
//常见问题列表显示和搜索
export const GET_HELP_LIST = 'GET_HELP_LIST';
export const GET_HELP_LIST_PENDING = 'GET_HELP_LIST_PENDING';
export const GET_HELP_LIST_SUCCESS = 'GET_HELP_LIST_SUCCESS';
export const GET_HELP_LIST_FAILURE = 'GET_HELP_LIST_FAILURE';
//常见问题添加
export const ADD_HELP_PROBLEM = 'ADD_HELP_PROBLEM';
export const ADD_HELP_PROBLEM_PENDING = 'ADD_HELP_PROBLEM_PENDING';
export const ADD_HELP_PROBLEM_SUCCESS = 'ADD_HELP_PROBLEM_SUCCESS';
export const ADD_HELP_PROBLEM_FAILURE = 'ADD_HELP_PROBLEM_FAILURE';
//常见问题修改
export const UPDATE_HELP_PROBLEM = 'UPDATE_HELP_PROBLEM';
export const UPDATE_HELP_PROBLEM_PENDING = 'UPDATE_HELP_PROBLEM_PENDING';
export const UPDATE_HELP_PROBLEM_SUCCESS = 'UPDATE_HELP_PROBLEM_SUCCESS';
export const UPDATE_HELP_PROBLEM_FAILURE = 'UPDATE_HELP_PROBLEM_FAILURE';
//常见问题启用 || 禁用
export const CHANGE_HELP_STATUS = 'CHANGE_HELP_STATUS';
export const CHANGE_HELP_STATUS_PENDING = 'CHANGE_HELP_STATUS_PENDING';
export const CHANGE_HELP_STATUS_SUCCESS = 'CHANGE_HELP_STATUS_SUCCESS';
export const CHANGE_HELP_STATUS_FAILURE = 'CHANGE_HELP_STATUS_FAILURE';

//用户社区删除
export const DELETE_HELP_COMMUNITY = 'DELETE_HELP_COMMUNITY';
export const DELETE_HELP_COMMUNITY_PENDING = 'DELETE_HELP_COMMUNITY_PENDING';
export const DELETE_HELP_COMMUNITY_SUCCESS = 'DELETE_HELP_COMMUNITY_SUCCESS';
export const DELETE_HELP_COMMUNITY_FAILURE = 'DELETE_HELP_COMMUNITY_FAILURE';

//社区帮助显示
export const GET_HELP_COMMUNITY_LIST = 'GET_HELP_COMMUNITY_LIST';
export const GET_HELP_COMMUNITY_LIST_PENDING = 'GET_HELP_COMMUNITY_LIST_PENDING';
export const GET_HELP_COMMUNITY_LIST_SUCCESS = 'GET_HELP_COMMUNITY_LIST_SUCCESS';
export const GET_HELP_COMMUNITY_LIST_FAILURE = 'GET_HELP_COMMUNITY_LIST_FAILURE';

//社区帮助添加
export const ADD_HELP_COMMUNITY = 'ADD_HELP_COMMUNITY';
export const ADD_HELP_COMMUNITY_PENDING = 'ADD_HELP_COMMUNITY_PENDING';
export const ADD_HELP_COMMUNITY_SUCCESS = 'ADD_HELP_COMMUNITY_SUCCESS';
export const ADD_HELP_COMMUNITY_FAILURE = 'ADD_HELP_COMMUNITY_FAILURE';

//社区帮助修改
export const UPDATE_HELP_COMMUNITY = 'UPDATE_HELP_COMMUNITY';
export const UPDATE_HELP_COMMUNITY_PENDING = 'UPDATE_HELP_COMMUNITY_PENDING';
export const UPDATE_HELP_COMMUNITY_SUCCESS = 'UPDATE_HELP_COMMUNITY_SUCCESS';
export const UPDATE_HELP_COMMUNITY_FAILURE = 'UPDATE_HELP_COMMUNITY_FAILURE';

//社区帮助启用/禁用
export const ABLE_HELP_COMMUNITY = 'ABLE_HELP_COMMUNITY';
export const ABLE_HELP_COMMUNITY_PENDING = 'ABLE_HELP_COMMUNITY_PENDING';
export const ABLE_HELP_COMMUNITY_SUCCESS = 'ABLE_HELP_COMMUNITY_SUCCESS';
export const ABLE_HELP_COMMUNITY_FAILURE = 'ABLE_HELP_COMMUNITY_FAILURE';

//常见问题类型删除
export const DELETE_HELP_PROTYPE = 'DELETE_HELP_PROTYPE';
export const DELETE_HELP_PROTYPE_PENDING = 'DELETE_HELP_PROTYPE_PENDING';
export const DELETE_HELP_PROTYPE_SUCCESS = 'DELETE_HELP_PROTYPE_SUCCESS';
export const DELETE_HELP_PROTYPE_FAILURE = 'DELETE_HELP_PROTYPE_FAILURE';

//常见问题类型列表
export const GET_HELP_PROTYPE_LIST = 'GET_HELP_PROTYPE_LIST';
export const GET_HELP_PROTYPE_LIST_PENDING = 'GET_HELP_PROTYPE_LIST_PENDING';
export const GET_HELP_PROTYPE_LIST_SUCCESS = 'GET_HELP_PROTYPE_LIST_SUCCESS';
export const GET_HELP_PROTYPE_LIST_FAILURE = 'GET_HELP_PROTYPE_LIST_FAILURE';

//常见问题类型添加
export const ADD_HELP_PROTYPE = 'ADD_HELP_PROTYPE';
export const ADD_HELP_PROTYPE_PENDING = 'ADD_HELP_PROTYPE_PENDING';
export const ADD_HELP_PROTYPE_SUCCESS = 'ADD_HELP_PROTYPE_SUCCESS';
export const ADD_HELP_PROTYPE_FAILURE = 'ADD_HELP_PROTYPE_FAILURE';

//常见问题类型禁用/启用
export const ABLE_HELP_PROTYPE = 'ABLE_HELP_PROTYPE';
export const ABLE_HELP_PROTYPE_PENDING = 'ABLE_HELP_PROTYPE_PENDING';
export const ABLE_HELP_PROTYPE_SUCCESS = 'ABLE_HELP_PROTYPE_SUCCESS';
export const ABLE_HELP_PROTYPE_FAILURE = 'ABLE_HELP_PROTYPE_FAILURE';

// 常见问题类型修改
export const UPDATE_HELP = 'UPDATE_HELP';
export const UPDATE_HELP_PENDING = 'UPDATE_HELP_PENDING';
export const UPDATE_HELP_SUCCESS = 'UPDATE_HELP_SUCCESS';
export const UPDATE_HELP_FAILURE = 'UPDATE_HELP_FAILURE';

export const GET_HELP_DETAIL = 'GET_HELP_DETAIL';
export const GET_HELP_DETAIL_PENDING = 'GET_HELP_DETAIL_PENDING';
export const GET_HELP_DETAIL_SUCCESS = 'GET_HELP_DETAIL_SUCCESS';
export const GET_HELP_DETAIL_FAILURE = 'GET_HELP_DETAIL_FAILURE';

export const GET_HELP_COMMUNITY_DETAIL = 'GET_HELP_COMMUNITY_DETAIL';
export const GET_HELP_COMMUNITY_DETAIL_PENDING = 'GET_HELP_COMMUNITY_DETAIL_PENDING';
export const GET_HELP_COMMUNITY_DETAIL_SUCCESS = 'GET_HELP_COMMUNITY_DETAIL_SUCCESS';
export const GET_HELP_COMMUNITY_DETAIL_FAILURE = 'GET_HELP_COMMUNITY_DETAIL_FAILURE';

export function deleteHelp(id) {
    return {
        type: DELETE_HELP,
        payload: apiHelp.deleteHelp(id)
    };
}
export function getHelpList(params) {
    return {
        type: GET_HELP_LIST,
        payload: apiHelp.getHelpList(params)
    };
}
export function addHelpProblem(params) {
    return {
        type: ADD_HELP_PROBLEM,
        payload: apiHelp.addHelpProblem(params)
    };
}
export function updateHelpProblem(id, params) {
    return {
        type: UPDATE_HELP_PROBLEM,
        payload: apiHelp.updateHelpProblem(id, params)
    };
}

export function deleteHelpCommunity(id) {
    return {
        type: DELETE_HELP_COMMUNITY,
        payload: apiHelp.deleteHelpCommunity(id)
    };
}
export function getHelpCommunityList(params) {
    return {
        type: GET_HELP_COMMUNITY_LIST,
        payload: apiHelp.getHelpCommunityList(params)
    };
}

export function addHelpCommunity(params) {
    return {
        type: ADD_HELP_COMMUNITY,
        payload: apiHelp.addHelpCommunity(params)
    };
}

export function updateHelpCommunity(id, params) {
    return {
        type: UPDATE_HELP_COMMUNITY,
        payload: apiHelp.updateHelpCommunity(id, params)
    };
}

export function ableHelpCommunity(id, status) {
    return {
        type: ABLE_HELP_COMMUNITY,
        payload: apiHelp.ableHelpCommunity(id, status)
    };
}

export function changeHelpStatus(id, status) {
    return {
        type: CHANGE_HELP_STATUS,
        payload: apiHelp.changeHelpStatus(id, status)
    };
}

export function deleteHelpProtype(id) {
    return {
        type: DELETE_HELP_PROTYPE,
        payload: apiHelp.deleteHelpProtype(id)
    };
}

export function getHelpProtypeList(params) {
    return {
        type: GET_HELP_PROTYPE_LIST,
        payload: apiHelp.getHelpProtypeList(params)
    };
}

export function addHelpProtype(params) {
    return {
        type: ADD_HELP_PROTYPE,
        payload: apiHelp.addHelpProtype(params)
    };
}

export function updateHelp(id, params) {
    return {
        type: UPDATE_HELP,
        payload: apiHelp.updateHelp(id, params)
    };
}

export function ableHelpProtype(id, status) {
    return {
        type: ABLE_HELP_PROTYPE,
        payload: apiHelp.ableHelpProtype(id, status)
    };
}

export function getHelpDetail(id) {
    return {
        type: GET_HELP_DETAIL,
        payload: apiHelp.getHelpDetail(id)
    };
}

export function getHelpCommunityDetail(id) {
    return {
        type: GET_HELP_COMMUNITY_DETAIL,
        payload: apiHelp.getHelpCommunityDetail(id)
    };
}
