/**
 * Created by Asoiso on 16/8/21.
 */

import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {operationReducer} from 'common/middleware/operationMiddleware';

import auth from 'common/store/auth/reducer';
import contentH5 from 'common/store/contentH5/reducer';
import authorize from 'common/store/authorize/reducer';
import distribute from 'common/store/distribute/reducer';
import commonMedia from 'common/store/media/reducer';
import commonCoupon from 'common/store/coupon/reducer';
import commonIntegral from 'common/store/integral/reducer';
import commonShoppingGuide from 'common/store/shoppingGuide/reducer';
import commonApp from 'common/store/app/reducer';
import commonTags from 'common/store/tags/reducer';

import hrdd from 'common/store/hrdd/reducer';


import content from './content/reducer';
import contentBulk from './contentBulk/reducer';
import contentHot from './contentHot/reducer';
import contentMedia from './contentMedia/reducer';
import youzan from 'common/store/youzan/reducer';
import weimob from 'common/store/weimob/reducer';


// 聚合各 reducer
const rootReducer = combineReducers({
    // 将路由加入reducer
    routing: routerReducer,
    // 全局操作快照
    operation: operationReducer,


    commonMedia,
    commonCoupon,
    commonIntegral,
    commonShoppingGuide,
    commonApp,
    commonTags,
    hrdd,

    auth,

    authorize,
    contentH5,
    distribute,

    content,
    contentBulk,
    contentHot,
    contentMedia,
    youzan,
    weimob
});

export default rootReducer;
