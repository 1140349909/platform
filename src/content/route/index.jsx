import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import NotFound from 'common/component/NotFound';
import Forbidden from 'common/component/Forbidden';
import App from '../app';
import Editor from '../page/editor';
import Toutiao from '../page/toutiao';

// 路由配置
// add(/:tplId)
// edit/:id

export default ()=> {

    let Routes = '';

    switch(location.pathname){
        case '/content.html':
            Routes = (
                <div>
                    <Route path="add(/:id)" component={Editor}/>
                    <Route path="edit/:id" component={Editor}/>
                    <Route path="403(/:type)" component={Forbidden}/>
                </div>
            );
            break;
        case '/editor.html':
            Routes = (
                <div>
                    <Route path="toutiao/:id" component={Toutiao}/>
                </div>
            );
            break;

    }

    return (
        <Route path='/' component={App}>
            <IndexRedirect to="add"/>
            {Routes}
            <Route path="*" component={NotFound}/>
        </Route>
    )
};
