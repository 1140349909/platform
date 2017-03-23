import React, {Component} from 'react';
import {Button, Modal, Input, Form, Upload, Icon, message} from 'antd';
import * as media from 'common/util/media';
import Img from 'common/component/Img';
import './index.less';
const FormItem = Form.Item;
const EDITOR_ID = 'contentEditor';

// 修改/新增客户
class CompanyFormCustomer extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        logoId: '',
        type: true,
    }

    // 接收获取产品信息,图片src
    componentWillReceiveProps(nextProps) {
        if (nextProps.data.type == 'add' && this.state.type) {
            this.setState({
                type: false,
                logoId: '',
            });
        } else if(nextProps.data.type == 'modify' && this.state.type){
            this.setState({
                type: false,
                logoId: nextProps.data.logo,
            });
        }
    }

    handleSubmitClick = () => {

        this.props.form.validateFields((errors) => {
            if (errors) {
                return;
            }

            this.props.doCustomer(this.handleSubmit());
            this.setState({
                type: true,
            });
        });
    }

    handleReturn = () => {
        this.props.reset();
        this.setState({
            type: true,
        });
    }

    handleSubmit = () => {

        const fieldsValue = this.props.form.getFieldsValue();

        return {
            id: fieldsValue.id || '',
            name: fieldsValue.name,
            logo: fieldsValue.logo.file.response.data,
            contact: {
                mobile: fieldsValue.contactMobile,
                name: fieldsValue.contactName,
                email: fieldsValue.contactEmail,
            }
        };
    }

     // upload 改变时处理函数
    onChange(info) {
        if (info.file.status === 'done') {
            if (info.file.response.errCode === 0) {
                this.setState({
                    logoId: info.file.response.data,
                });
            }
        }
    }

    isPhone = (rule, value, callback) => {
        let testPhone = /^(13|15|18|17)[0-9]{9}$/;
        if (!testPhone.test(value)) {
            callback();
        } else {
            callback();
        }
    }

    render() {

        // 获取表单相关API
        const { getFieldDecorator } = this.props.form;

        const visible = this.props.type === 'showCustomer' ? true: false;

        const idProps = getFieldDecorator('id');

        const nameProps = getFieldDecorator('name', {
            rules: [
                { required: true, message: '请输入企业名称' },
            ],
        });

        const contactNameProps = getFieldDecorator('contactName', {
            rules: [
                { required: true, message: '请输入企业联系人' },
            ],
        });

        const contactMobileProps = getFieldDecorator('contactMobile', {
            rules: [
                { required: true, message: '请输入联系电话' },
                { validator: this.isPhone}
            ],
        });

        const contactEmailProps = getFieldDecorator('contactEmail', {
            rules: [
                { type: 'email', required: true, message: '请输入联系邮箱' },
            ],
        });

        const uploadProps = {
            name: 'media',
            showUploadList: false,
            withCredentials: true,
            //media.upLoad
            action: media.addMedia({
                owner: 'platform',
                restype: 'res',
            }),
        };

        const logoProps = getFieldDecorator('logo', {
            onChange: this.onChange.bind(this),
            rules: [
                {required: true, message: '请上传主图', type: 'object'},
            ],
        });

        const formItemLayout = {
            labelCol: {span: 7 },
            wrapperCol: {span: 14},
        };

        const logoId = this.state.logoId;

        return (
            <Modal
                title='客户信息'
                visible={visible}
                onCancel={this.props.reset}
                footer={[
                    <Button
                        key="back"
                        type="ghost"
                        size="large"
                        onClick={this.handleReturn}>
                        返 回</Button>,

                    <Button
                        key="submit"
                        type="primary"
                        size="large"
                        onClick={this.handleSubmitClick}>
                        提 交</Button>,]}>

                <Form layout="horizontal" >

                    <FormItem>
                        {idProps(
                            <Input type="text"
                                    style={{display:'none'}}/>
                        )}
                    </FormItem>

                    <FormItem
                        label="企业名称："
                        {...formItemLayout}>
                        {nameProps(
                            <Input type="text"
                                placeholder="企业名称"/>
                        )}
                    </FormItem>

                    <FormItem
                        label="企业联系人："
                        {...formItemLayout}>
                        {contactNameProps(
                            <Input type="text"
                                placeholder="企业联系人"/>
                        )}

                    </FormItem>

                    <FormItem
                        label="联系电话："
                        {...formItemLayout}>
                        {contactMobileProps(
                            <Input type="text"
                                placeholder="联系电话"/>
                        )}
                    </FormItem>

                    <FormItem
                        label="联系邮箱："
                        {...formItemLayout}>
                        {contactEmailProps(
                            <Input type="text"
                                placeholder="联系邮箱"/>
                        )}
                    </FormItem>

                    <FormItem
                        label="企业LOGO："
                        {...formItemLayout}>
                        {logoProps(
                            <Upload
                                className="companyshowform-img"
                                {...uploadProps}>

                                    {logoId == '' &&
                                        <div className="companyshowform-img-text">
                                             <Icon className="companyshowform-img-icon" type="upload"/>
                                             <p className="companyshowform-img-p">点击上传logo</p>
                                        </div>
                                    }
                                    {logoId !== '' &&
                                        <Img src={logoId}/>
                                    }
                            </Upload>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const _CompanyFormCustomer = Form.create({

    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function (props) {

        let { data } = props;

        if (data.type == 'modify') {

            let logo = {
                file: {
                    response: {
                        data: data.logo
                    }
                }
            };

            return {
                id: {
                    value: data.id
                },
                name: {
                    value: data.name
                },
                logo: {
                    value: logo
                },
                contactName: {
                    value: data.contact.name
                },
                contactMobile: {
                    value: data.contact.mobile
                },
                contactEmail: {
                    value: data.contact.email
                },


            };
        } else {
            return {};
        }
    },
})(CompanyFormCustomer);


// 修改/新增员工
class CompanyFormEmployee extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmitClick = () => {
        this.props.form.validateFields((errors) => {
            if (errors) {
                return;
            }
            this.props.doEmployee(this.handleSubmit());
        });
    }

    handleSubmit = () => {

        const fieldsValue = this.props.form.getFieldsValue();

        return {
            id: fieldsValue.id || '',
            uin: this.props.data.uin || '',
            customerId: this.props.data.customerId || '',
            name: fieldsValue.name,
            jobNo: fieldsValue.jobNo,
            mobile: fieldsValue.mobile,
            store: {
                name: fieldsValue.storeName
            }
        };
    }


    render() {


        // 获取表单相关API
        const { getFieldDecorator} = this.props.form;

        const visible = this.props.type === 'showEmployee' ? true: false;

        const idProps = getFieldDecorator('id');

        const jobNoProps = getFieldDecorator('jobNo', {
            rules: [
                {required: true, message: '请输入员工编号/工号'},
            ],
        });

        const nameProps = getFieldDecorator('name', {
            rules: [
                {required: true, message: '请输入姓名'},
            ],
        });

        const mobileProps = getFieldDecorator('mobile', {
            rules: [
                {required: true, message: '请输入手机号码'},
            ],
        });

        const storeNameProps = getFieldDecorator('storeName', {
            rules: [
                {required: true, message: '请输入所属门店'},
            ],
        });


        const formItemLayout = {
            labelCol: {span: 7 },
            wrapperCol: {span: 14},
        };


        return (
            <Modal
                title='客户信息'
                visible={visible}
                onCancel={this.props.reset}
                footer={[
                    <Button
                        key="back"
                        type="ghost"
                        size="large"
                        onClick={this.props.reset}>
                        返 回</Button>,

                    <Button
                        key="submit"
                        type="primary"
                        size="large"
                        onClick={this.handleSubmitClick}>
                        提 交</Button>,]}>

                <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>

                    <FormItem>
                    {idProps(
                        <Input type="text"
                                style={{display:'none'}}/>
                    )}
                    </FormItem>

                    <FormItem
                        label="员工编号/工号："
                        {...formItemLayout}>
                        {jobNoProps(
                            <Input type="text"
                                placeholder="请输入员工编号/工号"/>
                        )}
                    </FormItem>

                    <FormItem
                        label="姓名："
                        {...formItemLayout}>
                        {nameProps(
                            <Input type="text"
                                placeholder="请输入姓名"/>
                        )}
                    </FormItem>

                    <FormItem
                        label="手机号码："
                        {...formItemLayout}>
                        {mobileProps(
                            <Input type="text"
                                placeholder="请输入手机号码"/>
                        )}
                    </FormItem>

                    <FormItem
                        label="所属门店："
                        {...formItemLayout}>
                        {storeNameProps(
                            <Input type="text"
                                placeholder="请输入所属门店"/>
                        )}
                    </FormItem>

                </Form>
            </Modal>
        );
    }
}

const _CompanyFormEmployee = Form.create({

    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function (props) {

        let { data } = props;

        if(data.type == 'modify') {
            return{
                id: {
                    value: data.id
                },
                jobNo: {
                    value: data.jobNo
                },
                name: {
                    value: data.name
                },
                mobile: {
                    value: data.mobile
                },
                storeName: {
                    value: data.store.name
                }

            };
        } else {
            return {};
        }
    },
})(CompanyFormEmployee);


// 导入客户员工
class CompanyFormCustomerImport extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {

        const props = {
            name: 'file',
            action: media.customerDataImport + this.props.id,
            withCredentials: true,
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    // null
                }

                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 上传成功。`);

                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传失败。`);
                }
            },
        };

        const visible = this.props.type === 'showCustomerImport' ? true: false;

        const formItemLayout = {
            labelCol: {span: 7 },
            wrapperCol: {span: 14},
        };

        return (
            <Modal
            title='导入客户员工'
            visible={visible}
            onCancel={this.props.reset}
            footer={[
                <Button
                    key="back"
                    type="ghost"
                    size="large"
                    onClick={this.props.reset}>
                    确定</Button>]}>
                <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem
                        {...formItemLayout}>

                        <Upload {...props}>
                            <Button type="ghost">
                                <Icon type="upload"/> 上传客员工.csv文件
                            </Button>
                        </Upload>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const _CompanyFormCustomerImport = CompanyFormCustomerImport;

// 导入客户门店
class CompanyFormStoreImport extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmit(e) {

        e.preventDefault();
    }

    render() {

        const visible = this.props.type === 'showStoreImport' ? true: false;

        const formItemLayout = {
            labelCol: {span: 7 },
            wrapperCol: {span: 14},
        };

        const props = {
            name: 'file',
            action: media.customerStoreImport + this.props.id,
            withCredentials: true,
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    // null
                }

                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 上传成功。`);

                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传失败。`);
                }
            },
        };

        return (
            <Modal
            title='导入客户门店'
            visible={visible}
            onCancel={this.props.reset}
            footer={[
                <Button
                    key="back"
                    type="ghost"
                    size="large"
                    onClick={this.props.reset}>
                    确定</Button>]}>
                <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem
                        {...formItemLayout}>

                        <Upload {...props}>
                            <Button type="ghost">
                                <Icon type="upload"/> 上传客户门店.csv文件
                            </Button>
                        </Upload>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const _CompanyFormStoreImport = CompanyFormStoreImport;


// 员工激励
class CompanyFormExcitation extends Component {

    constructor(props) {
        super(props);
    }

    componentWillUpdate(nextProps){
        setEditorValue(EDITOR_ID, nextProps.data);
    }

    handleSubmitClick = () => {
        const content = getEditorValue(EDITOR_ID);
        this.props.doExcitation({
            content,
        });
        this.props.reset();
    }


    render() {
        const visible = this.props.type === 'showExcitation' ? true: false;

        return (
            <Modal
                width='700px'
                title='员工激励设置'
                visible={visible}
                onCancel={this.props.reset}
                footer={[
                    <Button
                        key="back"
                        type="ghost"
                        size="large"
                        onClick={this.props.reset}>
                        返 回</Button>,

                    <Button
                        key="submit"
                        type="primary"
                        size="large"
                        onClick={this.handleSubmitClick}>
                        提 交</Button>]}>
            </Modal>
        );
    }
}

const _CompanyFormExcitation = Form.create({

    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function () {},
})(CompanyFormExcitation);

export {
    _CompanyFormCustomer as CompanyFormCustomer,
    _CompanyFormEmployee as CompanyFormEmployee,
    _CompanyFormCustomerImport as CompanyFormCustomerImport,
    _CompanyFormStoreImport as CompanyFormStoreImport,
    _CompanyFormExcitation as CompanyFormExcitation,
};
