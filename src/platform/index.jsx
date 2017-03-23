import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
//import {Router, browserHistory, hashHistory} from 'react-router';
import {Router, hashHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import es6Promise from 'es6-promise';
import configureStore from './store/configureStore';
import route from './route';
import 'common/asset/antd.less';
import 'common/asset/index.less';


es6Promise.polyfill();
//const routerHistory = browserHistory;
const routerHistory = hashHistory;
const store = configureStore({}, routerHistory);
const history = syncHistoryWithStore(routerHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {route()}
        </Router>
    </Provider>,
    document.getElementById('app')
);
