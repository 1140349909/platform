import React, {Component} from 'react';
import {Form, Input, Row, Col} from 'antd';
import classNames from 'classnames';
import './index.less';
const FormItem = Form.Item;

class UpdateNicknameForm extends Component {
    state = {
        show: false,
        nickName: null
    };

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.updateUserInfo({nickName: values.nickName});
                this.setState({
                    show: false
                });
            }
        });
    }
    updateUserName = () => {
        this.setState({
            show: true,
            nickName: this.props.data.nickName
        });
    }

    render() {
        const {data} = this.props;
        const show = this.state.show;
        const nicknameStyle = classNames({'app-info-nickname': true, 'app-info-nickname-label': show});
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 2},
            wrapperCol: {span: 12},
        };
        return (
            <div>
                {
                    this.state.show &&
                    <Form className='app-info-form-page'>
                        <Row className={nicknameStyle} style={{'paddingBottom': 0}}>
                            <Col span={7} className=' app-user-nickname-input'>
                                <FormItem className='app-info-nick' label='我的昵称:' {...formItemLayout}>
                                    {getFieldDecorator('nickName', {
                                        rules: [{
                                            required: true, message: '请填写修改后的昵称',
                                        }, {
                                            min: 1, max: 20, message: '请输入1-20个字符'
                                        }],
                                    })(
                                        <Input size='small'/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={4} className='nickname-label'><a onClick={this.handleSubmit}>确定</a>
                            </Col>
                        </Row>
                    </Form>
                }
                {
                    !this.state.show && data &&
                    <Row>
                        <Col className='user-label' span={2}>我的昵称：</Col>
                        <Col span={10}
                             className='middle-col-excp'> {data.nickName} </Col>
                        <Col span={4}><a onClick={this.updateUserName}>{data.nickName ? '修改昵称' : '设置昵称'}</a> </Col>
                    </Row>
                }
            </div>
        );
    }
}

export default Form.create({
    mapPropsToFields: function ({data}) {
        if (data) {
            return {
                nickName: {
                    value: data.nickName
                }
            };
        } else {
            return {};
        }
    }
})(UpdateNicknameForm);




