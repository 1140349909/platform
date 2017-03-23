// 添加发布数据
export const ADD_RELEASE_DATA = 'ADD_RELEASE_DATA';

// 添加发布数据
export function addReleaseData(data, auto) {
    return {
        type: ADD_RELEASE_DATA,
        payload: {data, auto},
    };
}




