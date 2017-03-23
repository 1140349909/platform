import {compose, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'common/middleware/promiseMiddleware';
import {operationMiddleware} from 'common/middleware/operationMiddleware';
import {routerMiddleware} from 'react-router-redux';
import handleFailure from 'common/exception';
import reducer from './reducer';
import config from 'common/config';

export default function configureStore(initialState, history) {
    let middleware = [
        thunkMiddleware,
        // 异步操作中间件
        promiseMiddleware({
            onFailure: handleFailure
        }),
        // 操作日志中间件
        operationMiddleware(),
        // 路由中间件
        routerMiddleware(history)
    ];

    const createStoreWithMiddleware = compose(applyMiddleware(...middleware), !config.RELEASED && window.devToolsExtension ? window.devToolsExtension() : f => f);

    return createStoreWithMiddleware(createStore)(reducer, initialState);
}
