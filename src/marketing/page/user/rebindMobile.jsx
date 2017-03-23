import React from 'react';
import PageBase from 'common/base/PageBase';
import {message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import  './rebindMobile.less';
import ReBindMobileForm from './component/ReBindMobileForm';
import * as authAction from 'common/store/auth/action';
import * as smsAction from '../../store/sms/action';
import * as userAction from '../../store/user/action';
import Img from 'common/component/Img';

@connect(
    state => ({
        operation: state.operation,
        auth: state.auth.toJS(),
        sms: state.sms.toJS(),
        user: state.user.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...authAction,
            ...smsAction,
            ...userAction
        }, dispatch)
    })
)
export default class RebindMobile extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        sendNumBtnText: '发送验证码',
        smsCodeStatus: 'INIT',
        mobile: '',
        code: '',
        showSuccess: false
    };

    // 在完成首次渲染之前调用，此时仍可以修改组件的state。
    componentWillMount() {
        this.props.actions.getUserInfo();
    }

    // 组件接收到新的props时调用，并将其作为参数nextProps使用，此时可以更改组件props及state
    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case smsAction.CAPTCHA_MOBILE_PENDING:
                this.setState({
                    smsCodeStatus: 'PENDING'
                });
                break;
            case smsAction.CAPTCHA_MOBILE_SUCCESS :
                this.setState({
                    mobile: operation.result.params.mobile,
                    smsCodeStatus: 'SUCCESS',
                    showSuccess: false
                });
                break;
            case smsAction.CAPTCHA_MOBILE_FAILURE :
                message.error(operation.result.errMsg);
                this.setState({
                    mobile: operation.result.params.mobile,
                    smsCodeStatus: 'FAILURE',
                    showSuccess: false,
                });
                break;
            case userAction.VALIDATE_USER_MOBILE_FAILURE :
                this.setState({
                    mobile: operation.result.params.mobile,
                    code: operation.result.params.code
                });
                message.error(operation.result.errMsg);
                break;
            case userAction.VALIDATE_USER_MOBILE_SUCCESS :
                this.setState({
                    showSuccess: true,
                    smsCodeStatus: 'FAILURE',
                });
                break;
        }
    }


    captchaMobile = (val) => {
        this.props.actions.captchaMobile(val);
    }
    validateMobile = (record) => {
        this.props.actions.validateMobile(record);
    }

    render() {

        const {info} = this.props.auth;

        return (
            <div className='app-page resetPwdPage app-page-user-rebindMobile'>
                <div className='header'>
                    <div className='logo'><Img src='logo.png'/></div>
                </div>
                <div className='rebindContainer'>
                    <p className='user-remind-title'>绑定手机号</p>
                    <div className='user-remind-form'>
                        {!this.state.showSuccess &&
                        <div>
                            <p className='title'>{info && info.email}，请重新绑定您的手机号！</p>
                            <ReBindMobileForm info={info}
                                              validateMobile={this.validateMobile} captchaMobile={this.captchaMobile}
                                              data={this.state}/>
                        </div>
                        }
                        {
                            this.state.showSuccess &&
                            <p className='title' style={{'marginTop': 192, 'paddingBottom': 192}}>{info && info.email}，您的手机号重新绑定成功！！</p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
