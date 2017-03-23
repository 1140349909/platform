import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import NotFound from 'common/component/NotFound';
import Forbidden from 'common/component/Forbidden';
import Dashboard from '../layout/dashboard';
import App from '../app';
import Home from '../page/home';
import User from '../page/user';
import Mall from '../page/mall';
import Company from '../page/company';

import ContentBulk from '../page/contentBulk';
import ContentHot from '../page/contentHot';
import Media from '../page/media';
import Category from '../page/category';
import Tag from '../page/tag';
import NotificationSystem from '../page/notificationSystem';
import CustomerService from '../page/customerService';
import JuHe from '../page/juhe';

import Finance from '../page/finance';
import Account from '../page/account';
import Rule from '../page/rule';
import Module from '../page/module';
import Supervise from '../page/supervise';

// 路由配置
export default () => (
    <Route path="/" component={App}>
        <IndexRedirect to="home"/>
        <Route component={Dashboard}>
            <Route path="home" component={Home}/>
            <Route path="user" component={User}/>
            <Route path="mall" component={Mall}/>
            <Route path="company" component={Company}/>
            <Route path="contentHot" component={ContentHot}/>
            <Route path="contentBulk" component={ContentBulk}/>
            <Route path="media" component={Media}/>
            <Route path="category" component={Category}/>
            <Route path="tag" component={Tag}/>
            <Route path="juhe" component={JuHe}/>
            <Route path='notification'>
                <Route path='add/notification' component={NotificationSystem.AddNotificationByHand}/>
                <Route path='add/template' component={NotificationSystem.AddNotificationTemplate}/>
                <Route path='list/template' component={NotificationSystem.AutomaticNotificationTemplate}/>
                <Route path='history' component={NotificationSystem.NotificationHistory}/>
            </Route>
            <Route path='customerService'>
                <Route path='problem' component={CustomerService.CommonProblem}/>
                <Route path='community' component={CustomerService.UserCommunity}/>
            </Route>
            <Route path='finance'>
                <Route path='withdraw' component={Finance.Withdraw}/>
                <Route path='invoice' component={Finance.Invoice}/>
            </Route>
            <Route path='account'>
                <Route path='permission' component={Account.Permission}/>
                <Route path='version' component={Account.Version}/>
                <Route path='service/:id' component={Account.Service}/>
                <Route path='rights/:id' component={Account.Rights}/>
            </Route>
            <Route path='rule'>
                <Route path='withdraw' component={Rule.Withdraw}/>
                <Route path='config' component={Rule.Config}/>
                <Route path='invoice' component={Rule.Invoice}/>
            </Route>
            <Route path='module'>
                <Route path='list' component={Module.List}/>
                <Route path='config' component={Module.Config}/>
                <Route path='role' component={Module.Role}/>
            </Route>
            <Route path='supervise'>
                <Route path='list' component={Supervise}/>
            </Route>
        </Route>
        <Route path="403" component={Forbidden}/>
        <Route path="*" component={NotFound}/>
    </Route>
);
