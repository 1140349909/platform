import React, {Component} from 'react';
import {Tree, Input, Form, Button, Select} from 'antd';
import {withRouter} from 'react-router';
const FormItem = Form.Item;
import './index.less';
const TreeNode = Tree.TreeNode;
const Option = Select.Option;
import _ from 'lodash';

@withRouter
class JobInfoForm extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        role: null,
        accountType: null,
        moduleIds: [],
        tagIds: []
    }

    // 页面加载
    componentDidMount() {
        let checkedKeys = [];
        const {data} = this.props;
        if (data.moduleIds) {
            data.moduleIds.map((item) => {
                if (data.tagIds.indexOf(item) == -1) {
                    checkedKeys.push(item);
                }
            });
        }
        this.setState({
            moduleIds: checkedKeys,
            tagIds: data.tagIds ? data.tagIds : []
        });
    }


    componentDidUpdate(prevProps) {
        const moduleIds = this.props.data.moduleIds;
        if (!_.isEqual(moduleIds, prevProps.data.moduleIds)) {
            this.setState({
                moduleIds: moduleIds
            });
        }
    }

    onCheck = (moduleIds, e) => {
        //要求选中子节点的同时带上父节点的key
        this.setState({
            moduleIds,
            tagIds: e.halfCheckedKeys
        });
    };

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {moduleIds, tagIds} = this.state;
                const {data} = this.props;
                const user = {
                    accountType: values.accountType.label,
                    memo: values.memo,
                    moduleIds,
                    tagIds,
                    name: values.name,
                    userName: values.userName,
                    role: this.state.role ? this.state.role : data.roles[0],
                    id: this.props.data.id
                };
                this.props.saveAdminUserInfo(user);
            }
        });
    }
    renderTreeDom = () => {
        const {menu} = this.props;
        return (
            <Tree checkable
                  multiple
                  checkedKeys={this.state.moduleIds}
                  onCheck={this.onCheck}
            >
                {menu && menu.map((item) => (
                    <TreeNode title={item.name} key={item.tagId}>
                        {
                            item && item.tags && item.tags.map((secondItem) => (
                                <TreeNode title={secondItem.name} key={secondItem.tagId}>
                                    {
                                        secondItem && secondItem.modules && secondItem.modules.map((thirdItem) => (
                                            <TreeNode title={thirdItem.name} key={thirdItem.id}
                                                      className='tree-inline-block'>
                                            </TreeNode>
                                        ))
                                    }
                                </TreeNode>
                            ))
                        }
                    </TreeNode>
                ))}
            </Tree>
        );
    }

    onSelect = (value) => {
        this.setState({
            role: value.key.split('_')[2],
            accountType: value.label
        });
        this.getModuleIdsByAccountType(value.key.split('_')[1]);
    }

    //根据选择的岗位类型获取相对应的权限
    getModuleIdsByAccountType = (id) => {
        const {accountType} = this.props;
        let checkedKeys = [];
        accountType.map((item) => {
            if (item.id == id) {
                if (item.moduleIds) {
                    item.moduleIds.map((actp) => {
                        if (item.tagIds.indexOf(actp) == -1) {
                            checkedKeys.push(actp);
                        }
                    });
                }
                this.setState({
                    moduleIds: checkedKeys
                });
            }
        });
    }

    render() {
        const {accountType} = this.props;
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {span: 3},
            wrapperCol: {span: 10},
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 20,
                offset: 2,
            },
        };

        //账户类型
        let accountTypeList = [];
        accountType.map((item) => {
            accountTypeList.push(
                <Option key={'lk_' + item.id + '_' + item.role}>{item.name}</Option>
            );
        });

        // console.log('render', this.state.moduleIds);
        return (
            <div className='app-job-info-form'>
                <Form layout="horizontal">
                    <FormItem className='jobInfoLabel' label='岗位信息'
                              {...formItemLayout}
                    >
                    </FormItem>
                    <FormItem
                        label='岗位类型'
                        {...formItemLayout}
                    >
                        {getFieldDecorator('accountType', {
                            rules: [{required: true, message: '请选择岗位类型!'}],
                        })(
                            <Select onSelect={this.onSelect} labelInValue={true}>
                                {accountTypeList}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label='登录账号'
                        {...formItemLayout}
                    >
                        {getFieldDecorator('userName', {
                            rules: [
                                {required: true, message: '请填写登录账号，必须为邮箱!'},
                                {type: 'email', message: '请输入正确格式的邮箱'}
                            ],
                        })(
                            <Input placeholder='请填写登录账号，必须为邮箱'/>
                        )}
                    </FormItem>
                    <FormItem
                        label='岗位名称'
                        {...formItemLayout}
                    >
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '请输入岗位名称!'}, {
                                min: 1,
                                max: 16,
                                message: '长度不超过15字，中英文或数字'
                            }],
                        })(
                            <Input placeholder='长度不超过15字，中英文或数字'/>
                        )}
                    </FormItem>
                    <FormItem
                        label='备注'
                        {...formItemLayout}
                    >
                        {getFieldDecorator('memo', {
                            rules: [{
                                min: 1, max: 51, message: '岗位描述，长度不超过50个字'
                            }],
                        })(
                            <Input type='textarea' placeholder='岗位的描述，长度不超过50个字'/>
                        )}
                    </FormItem>
                    <FormItem className='jobInfoLabel roleInfoLabel' label='权限设置'
                              {...formItemLayout}
                    >
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        {this.renderTreeDom()}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type='primary' onClick={this.handleSubmit} size='large'>保存</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create({
    mapPropsToFields: (props) => {
        const {data} = props;
        if (data) {
            return {
                accountType: {
                    value: {label: data.accountType, key: data.roles && data.roles[0]}
                },
                memo: {
                    value: data.memo
                },
                name: {
                    value: data.name
                },
                userName: {
                    value: props.editId != null ? data.email : data.userName
                }
            };
        } else {
            return {};
        }
    }
})(JobInfoForm);
