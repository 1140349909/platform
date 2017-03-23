import React from 'react';
import PageBase from 'common/base/PageBase';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as hrddAction from 'common/store/hrdd/action';
import * as ApiHrdd from 'common/api/hrdd';

@connect(
    state => ({
        operation: state.operation,
        hrdd: state.hrdd.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...hrddAction
        }, dispatch)
    })
)


export default class Order extends PageBase {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // 直接写死，不经过请求，因为获取的签名总是一致的
        this.sendHongrenddOrderForm({
            'p1_zid': '55ebfddd7ec6136c73e21779',
            'p2_code': '1002',
            'p3_source': '1484659044001',
            'p4_hamc': '26167590B06FB10328F5664A3FD8C59D'
        });
        // this.loginHongrendd(1002);
    }

    state = {

    };

    // 异步请求回调
    // 根据返回的nextProps.product.status处理回调
    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        switch (operation.type) {
            case hrddAction.LOGIN_HONGREN_SUCCESS:
                this.setState({
                    loginInfo: nextProps.hrdd.loginInfo
                }, () => this.sendHongrenddOrderForm(nextProps.hrdd.loginInfo));
                break;
        }
    }

    loginHongrendd = (code) => {
        this.props.actions.loginHongrendd(code);
    };

    sendHongrenddOrderForm = (data) => {
        ApiHrdd.sendHongrenddOrderForm(data);
    };

    render() {
        return (
            <div className="app-page">
                <p>即将跳转到红人点点订单页，请稍候...</p>
                <p>如果浏览器拦截新窗口，请允许浏览器弹出新窗口并重试</p>
            </div>
        );
    }
}


