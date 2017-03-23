import  * as apiWeimob from  '../../../common/api/weimob';

export const GET_WEIMOB_PRODUCT_LIST = 'GET_WEIMOB_PRODUCT_LIST';
export const GET_WEIMOB_PRODUCT_LIST_PENDING = 'GET_WEIMOB_PRODUCT_LIST_PENDING';
export const GET_WEIMOB_PRODUCT_LIST_SUCCESS = 'GET_WEIMOB_PRODUCT_LIST_SUCCESS';
export const GET_WEIMOB_PRODUCT_LIST_FAILURE = 'GET_WEIMOB_PRODUCT_LIST_FAILURE';

export function getWeimobProductList(params) {
    return {
        type: GET_WEIMOB_PRODUCT_LIST,
        payload: apiWeimob.getWeimobProductList(params)
    };
}
