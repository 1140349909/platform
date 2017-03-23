import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import NotFound from 'common/component/NotFound';
import Forbidden from 'common/component/Forbidden';
import Dashboard from '../layout/dashboard';
import App from '../app';
import Home from '../page/home';
import HomeTrade from '../page/home/trade';
import Comment from '../page/comment';
import Company from '../page/company';
import Member from '../page/member';
import Product from '../page/product';
import Yyg from '../page/yyg';
import Stat from '../page/stat';
import Trade from '../page/trade';
import Integral from '../page/integral';
import Coupon from '../page/coupon';
import CouponAdd from '../page/coupon/add';
import Content from '../page/content';
import Card from '../page/card';
import Banner from '../page/banner';
import TKer from '../page/tker';
import Withdraw from '../page/withdraw';
import Channel from '../page/channel';
import Opinion from '../page/opinion';
import User from '../page/user';
import Help from  '../page/help';
import H5 from '../page/h5';
import Site from '../page/site';
import Notifications from '../page/notifications';
import Charge from '../page/charge';
import Profit from '../page/profit';
import Invoice from '../page/invoice';
import History from '../page/history';
import Admin from '../page/admin';
import Payway from '../page/payway';
import Publish from '../page/publish';
import Agreement from '../page/agreement';

// 路由配置
export default () => (
    <Route path='/' component={App}>
        <IndexRedirect to='home'/>
        <Route component={Dashboard}>
            <Route path='home' component={Home}/>
            <Route path='home/trade' component={HomeTrade}/>
            <Route path='company' component={Company}/>
            <Route path='member' component={Member}/>

            <Route path='product/add' component={Product.Add}/>
            <Route path='product/list' component={Product.List}/>
            <Route path='product/sale' component={Product.Sale}/>

            <Route path='stat' component={Stat}/>
            <Route path='trade/:type' component={Trade}/>
            <Route path='comment/:type' component={Comment}/>
            <Route path='integral' component={Integral}/>

            <Route path='coupon' component={Coupon}/>
            <Route path='coupon/add' component={CouponAdd}/>
            <Route path='card' component={Card}/>
            <Route path='yyg' component={Yyg}/>
            <Route path='banner/:type' component={Banner}/>
            <Route path='tker'>
                <Route path='config' component={TKer.Config}/>
                <Route path='member' component={TKer.Member}/>
                <Route path='product' component={TKer.Product}/>
            </Route>

            <Route path='content'>
                <Route path='tpl/:type' component={Content.Tpl}/>
                <Route path='mine/:status' component={Content.Mine}/>
                <Route path='stat' component={Content.Stat}/>
                <Route path='detail/:id' component={Content.Detail}/>
                {/*下面的要在今后替换*/}
                <Route path='iloka/:type' component={Content.ILoka}/>
                {/*React重写*/}
                <Route path='site' component={Site}/>
            </Route>

            <Route path='h5'>
                <Route path='tpl/:type/:key' component={H5.Tpl}/>
                <Route path='mine/:status' component={H5.Mine}/>
                <Route path='stat' component={H5.Stat}/>
            </Route>

            <Route path='withdraw' component={Withdraw}/>
            <Route path='channel' component={Channel}/>
            <Route path='history/:type' component={History}/>
            <Route path='opinion' component={Opinion}/>

            <Route path='admin' component={Admin.List}/>
            <Route path='admin/edit/:id' component={Admin.Edit}/>
            <Route path='user/info' component={User.Info}/>
            <Route path='user/upgrade' component={User.Upgrade}/>
            {/* <Route path='user/secure' component={User.Secure}/>*/}

            <Route path='charge/list' component={Charge.List}/>
            <Route path='charge/payment/ledou' component={Charge.PaymentLedou}/>
            <Route path='charge/payment/upgrade' component={Charge.paymentUpgrade}/>
            <Route path='charge/enchashment' component={Charge.Enchashment}/>

            <Route path='profit/summary' component={Profit.Summary}/>
            <Route path='profit/setting' component={Profit.Setting}/>

            <Route path='invoice/add' component={Invoice.Add}/>
            <Route path='invoice/list' component={Invoice.List}/>
            <Route path='invoice/address' component={Invoice.Address}/>
            <Route path='invoice/title' component={Invoice.Title}/>

            <Route path='notifications' component={Notifications}> </Route>
            <Route path='payway' component={Payway}> </Route>


            <Route path='help/problems/:name' component={Help.Problems}> </Route>
            <Route path='help/community' component={Help.Community}> </Route>
            <Route path='help/detail/:id' component={Help.Detail}> </Route>
            <Route path='help/plist/:id' component={Help.ProblemsList}> </Route>
            <Route path="403(/:type)" component={Forbidden}/>

            <Route path='publish/solution' component={Publish.Solution}/>
            <Route path='publish/order' component={Publish.Order}/>
        </Route>
        <Route path='resetPwd' component={Admin.ResetPwd}/>
        <Route path='juHeDetail/:id' component={Content.JuHeDetail}/>
        <Route path='formData/:appid' component={H5.FormData}/>
        <Route path='user/rebind/mobile' component={User.RebindMobile}/>
        <Route path='agreement' component={Agreement}/>



        <Route path='*' component={NotFound}/>
    </Route>
);
