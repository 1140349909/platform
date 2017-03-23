import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import moment from 'moment';
import {
    GET_TAG_LIST_SUCCESS,
    GET_USER_TAG_LIST_SUCCESS,
    CLEAR_SELECTED_TAGS,
} from './action';

const initialState = fromJS({
    tagList: {},
    tags: [],
    item: {
        typeid: '',
        tagName: ''
    },
    userTagList: {},
    data: []//组装的标签数据
});

// 以下为异步action成功返回
export default createReducer(initialState, {
    [GET_TAG_LIST_SUCCESS]: (state, {payload}) => {
        payload.data.map((evTag) => {
            evTag.selected = true;
        });
        return state.set('tagList', fromJS(payload.data));
    },
    [GET_USER_TAG_LIST_SUCCESS]: (state, {payload}) => {
        payload.data.map((evTag) => {
            evTag.selected = true;
        });

        let userTagList = payload.data;
        //资讯图文热门标签特殊处理
        if (payload.params.tagType == 'hotArticle') {
            resolveHotArticle(userTagList);
        }
        //h5热门模板标签处理
        if (payload.params.tagType == 'app') {
            resolveH5HotTemplate(userTagList);
        }
        return state.set('userTagList', fromJS(userTagList));
    },
    [CLEAR_SELECTED_TAGS]: (state) => {
        return state.set('selectedTags', fromJS([]));
    },
});

function resolveHotArticle(userTagList) {
    const timerTagList = {
        id: 'hotArticle-timer',
        name: '时间',
        tags: [
            {
                name: '24小时',
                tagId: '24',
            },
            {
                name: moment().subtract(2, 'days').format('MM-DD'),
                tagId: '48',
            },
            {
                name: moment().subtract(3, 'days').format('MM-DD'),
                tagId: '72',
            },
            {
                name: moment().subtract(4, 'days').format('MM-DD'),
                tagId: '96'
            },
            {
                name: moment().subtract(5, 'days').format('MM-DD'),
                tagId: '120',
            },
            {
                name: moment().subtract(6, 'days').format('MM-DD'),
                tagId: '144',
            },
            {
                name: moment().subtract(7, 'days').format('MM-DD'),
                tagId: '168'
            }
        ]
    };
    userTagList.push(timerTagList);
    return userTagList;
}

//h5热门模板标签数据组装
function resolveH5HotTemplate(userTagList) {
    const h5HotTemplateTagList = {
        id: 'h5HotTemplate',
        name: '价格',
        tags: [
            {
                name: '免费',
                tagId: '0-0',
            },
            {
                name: '1-100乐豆',
                tagId: '1-100',
            },
            {
                name: '101-200乐豆',
                tagId: '101-200',
            },
            {
                name: '201-500乐豆',
                tagId: '201-500',
            },
            {
                name: '500乐豆以上',
                tagId: '500-10000',
            },
            {
                name: '',
                tagId: '50',
                type: 'doubleInput',
            },
        ]
    };
    userTagList.push(h5HotTemplateTagList);
    return userTagList;
}
