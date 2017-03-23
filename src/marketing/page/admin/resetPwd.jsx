import React from 'react';
import {withRouter} from 'react-router';
import PageBase from 'common/base/PageBase';
import {Button, Input, message, Form} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userAction from '../../store/user/action';
import * as authAction from 'common/store/auth/action';
import './resetPwd.less';
import Img from 'common/component/Img';
import  className from 'classnames';
const FormItem = Form.Item;
@connect(
    state => ({
        operation: state.operation,
        user: state.user.toJS(),
        auth: state.auth.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...userAction,
            ...authAction
        }, dispatch)
    })
)
@withRouter
class ResetPwd extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        loading: false,
        userInfo: '',
        warningInfo: '您的账号已激活！请登录',
        result: true,
        passwordDirty: false
    }

    componentDidMount() {
        const params = this.props.location.query.activeCode;
        if (params) {
            this.props.actions.activateAccount(params);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case userAction.ACTIVATE_ACCOUNT_SUCCESS:
                this.setState({loading: false, result: true, 'warningInfo': '您的账号已激活，请登录！'});
                break;
            case userAction.ACTIVATE_ACCOUNT_FAILURE:
                this.setState({
                    'warningInfo': '该链接已失效，可联系管理员重新获取链接。收到新链接后请在24小时内激活。',
                    result: false,
                    loading: false
                });
                break;
            case authAction.LOGIN_SUCCESS:
                this.props.router.push('/home');
                break;
            case authAction.LOGIN_FAILURE :
                message.error('密码输入有误，请确认后重新输入！');
                break;
        }
    }

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {activateAccount} = this.props.user;
                this.props.actions.login(activateAccount.email, values.password);
            }
        });
    };

    render() {
        const formItemLayout = {labelCol: {span: 6}, wrapperCol: {span: 14},};
        const tailFormItemLayout = {wrapperCol: {span: 14, offset: 6,},};
        const {getFieldDecorator} = this.props.form;
        const warnInfoStyle = className({
            'failureEmail': true,
            'email': true
        });
        const {activateAccount} = this.props.user;
        return (
            <div className='app-resetPwd-page'>
                <div className='header'>
                    <div className='logo'><Img src='logo.png'/></div>
                </div>
                <div className='app-reset-pwd-container'>
                    <div className='resetPwdContainer'>
                        <p className='desc'>{this.state.result ? '激活成功' : '激活失败'}</p>
                        {
                            !this.state.result &&
                            <p className={warnInfoStyle}>该链接已失效，可联系管理员重新获取链接。收到新链接后请在24小时内激活。</p>
                        }
                        {
                            this.state.result && activateAccount &&
                            <div>
                                <p className='email'> {this.state.warningInfo}</p>
                                <Form layout="horizontal" className='resetPwdForm'>
                                    <FormItem label='登录账号' {...formItemLayout} >
                                        <span>{activateAccount.email}</span>
                                    </FormItem>
                                    <FormItem label='岗位类型' {...formItemLayout} >
                                        <span className='userName'>{activateAccount.name}</span>
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="登录密码">
                                        {getFieldDecorator('password', {
                                            rules: [{
                                                required: true, message: '请输入6-18位字母或数字!',
                                            }, {
                                                pattern: /^[a-zA-Z\d]{6,18}$/, message: '请输入6-18位字母或数字!'
                                            }],
                                        })(
                                            <Input type="password"/> //onBlur={this.handlePasswordBlur}
                                        )}
                                    </FormItem>
                                    <FormItem {...tailFormItemLayout} className='reset-pwd-btn'
                                              style={{'borderTop': '1px solid #eaeaea', 'marginTop': 20}}>
                                        <Button type='primary' onClick={this.handleSubmit}>确定</Button>
                                    </FormItem>
                                </Form>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create({
    mapPropsToFields: function () {
        return {};
    },
})(ResetPwd);
