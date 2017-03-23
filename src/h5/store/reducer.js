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
import media from 'common/store/media/reducer';

import commonMedia from 'common/store/media/reducer';
import commonCoupon from 'common/store/coupon/reducer';
import commonIntegral from 'common/store/integral/reducer';
import commonShoppingGuide from 'common/store/shoppingGuide/reducer';
import commonTags from 'common/store/tags/reducer';
import commonApp from 'common/store/app/reducer';

import app from './app/reducer';
import h5Tpl from './h5Tpl/reducer';
import h5media from './h5media/reducer';
import widget from './widget/reducer';
import tag from './tag/reducer';
import tpl from './tpl/reducer';
import youzan from 'common/store/youzan/reducer';

// 聚合各 reducer
const rootReducer = combineReducers({
    // 将路由加入reducer
    routing: routerReducer,
    // 全局操作快照
    operation: operationReducer,
    auth,
    authorize,
    distribute,
    media,

    contentH5,
    commonMedia,
    commonCoupon,
    commonIntegral,
    commonShoppingGuide,
    commonTags,
    commonApp,

    app,
    h5Tpl,
    h5media,
    widget,
    tag,
    tpl,
    youzan
});

export default rootReducer;
