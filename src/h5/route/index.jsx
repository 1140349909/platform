import React from 'react';
import {Route} from 'react-router';
import NotFound from 'common/component/NotFound';
import Editor from '../page/editor';
import App from '../app';
import Demo from '../page/demo';


// 路由配置
// add(/:tplId)
// edit/:id
export default () => (
    <Route path="/" component={App}>
        <Route path="add" component={Editor}/>
        <Route path="add/:id" component={Editor}/>
        <Route path="edit/works/:id" component={Editor}/>
        <Route path="edit/tpl/:id" component={Editor}/>
        <Route path="demo" component={Demo}/>
        <Route path="*" component={NotFound}/>
    </Route>
);
