import  * as apiTpl from  '../../../common/api/tpl';

export const ADD_TPL = 'ADD_TPL';
export const ADD_TPL_PENDING = 'ADD_TPL_PENDING';
export const ADD_TPL_SUCCESS = 'ADD_TPL_SUCCESS';
export const ADD_TPL_FAILURE = 'ADD_TPL_FAILURE';

export function addTpl(params) {
    return {
        type: ADD_TPL,
        payload: apiTpl.addTpl(params)
    };
}



