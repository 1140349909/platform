import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

// TODO:[待优化]
import {operationReducer} from 'common/middleware/operationMiddleware';
import auth from 'common/store/auth/reducer';
import authorize from 'common/store/authorize/reducer';
import distribute from 'common/store/distribute/reducer';
import hrdd from 'common/store/hrdd/reducer';

import product from './product/reducer';
import channelProduct from './channelProduct/reducer';
import trade from './trade/reducer';
import integral from './integral/reducer';
import member from './member/reducer';
import customer from './customer/reducer';
import stat from './stat/reducer';
import mall from './mall/reducer';
import banner from './banner/reducer';
import coupon from './coupon/reducer';
import tker from './tker/reducer';
import withdraw from './withdraw/reducer';
import iloka from './iloka/reducer';
import opinion from './opinion/reducer';
import content from './content/reducer';
import tpl from './tpl/reducer';
import user from './user/reducer';
import tag from './tag/reducer';
import contentHot from './contentHot/reducer';
import app from './app/reducer';
import dataAgg from './dataAgg/reducer';
import ledou from './ledou/reducer';
import invoice from './invoice/reducer';
import sms from './sms/reducer';
import help from './help/reducer';
import notice from './notice/reducer';
import ledouConfig from './ledouConfig/reducer';
import account from './account/reducer';
import version from './version/reducer';
import pay from './pay/reducer';
import merchant from './merchant/reducer';
import vsite from './vsite/reducer';
import juhe from './juhe/reducer';
import resources from './resources/reducer';
// 聚合各 reducer
const rootReducer = combineReducers({
    // 将路由加入reducer
    routing: routerReducer,
    // 全局操作快照
    operation: operationReducer,
    auth,
    authorize,
    product,
    distribute,
    hrdd,

    channelProduct,
    trade,
    integral,
    member,
    customer,
    stat,
    mall,
    banner,
    coupon,
    tker,
    withdraw,
    iloka,
    opinion,
    content,
    tpl,
    user,
    tag,
    contentHot,
    app,
    dataAgg,
    ledou,
    invoice,
    sms,
    help,
    notice,
    ledouConfig,
    account,
    version,
    pay,
    merchant,
    vsite,
    juhe,
    resources,
});
export default rootReducer;
