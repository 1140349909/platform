/**
 * Created by Asoiso on 16/8/21.
 */
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
// TODO:[待优化]
import {operationReducer} from 'common/middleware/operationMiddleware';
import auth from 'common/store/auth/reducer';
import media from 'common/store/media/reducer';

import user from '../store/user/reducer';
import mall from '../store/mall/reducer';
import company from '../store/company/reducer';
import contentHot from '../store/contentHot/reducer';
import contentBulk from '../store/contentBulk/reducer';
import juhe from '../store/juhe/reducer';
import tag from '../store/tag/reducer';
import help from './help/reducer';
import notice from './notice/reducer';
import rule from './rule/reducer';

import finance from './finance/reducer';
import account from './account/reducer';
import version from './version/reducer';
import module from './module/reducer';
import resources from './resources/reducer';
import tpl from './tpl/reducer';

// 聚合各 reducer
const rootReducer = combineReducers({
    // 将路由加入reducer
    routing: routerReducer,
    // 全局操作快照
    operation: operationReducer,
    auth,
    media,

    user,
    mall,
    company,

    contentHot,
    contentBulk,
    tag,
    help,
    notice,
    juhe,
    rule,
    finance,
    account,
    version,
    module,
    resources,
    tpl
});

export default rootReducer;
