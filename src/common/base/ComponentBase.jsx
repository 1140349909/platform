import {Component} from 'react';
import {lock, unLock} from '../util';
import _ from 'lodash';

// 组件基类
export default class ComponentBase extends Component {

    constructor(props) {
        super(props);
    }
 
    // 是否显示viewType
    isShowView = (viewType)=> {
        return this.state.viewType == viewType && this.state.viewData != null;
    }

    // 显示view
    showView = (viewType, viewParam, viewData) => {
        this.setState({
            viewType: viewType,
            viewParam: viewParam,
            viewData: viewData
        });
    }

    // 重置页面
    reset = (callback) => {
        this.setState({
            viewType: 'list',
            viewParam: null,
            viewData: null
        }, () => {
            if (_.isFunction(callback)) {
                callback()
            }
        });
    }

    /**
     * [lock  全局加锁]
     * @param  {Function} callback   [需要加锁执行的回调]
     * @param  {Boolean}   autoUnLock [是否开启自动解锁]
     */
    lock = (callback, autoUnLock) => {
        lock(callback, autoUnLock);
    }

    /**
     * [unLock 全局解锁]
     * @return {[type]} [description]
     */
    unLock = () => {
        unLock();
    }


}
