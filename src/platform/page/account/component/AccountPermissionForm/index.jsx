import React, {Component} from 'react';
import {Modal, Form, Button, Input, Radio, Tree, Card, message} from 'antd';
import './index.less';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TreeNode = Tree.TreeNode;

class AccountPermissionForm extends Component {

    constructor(props) {
        super(props);

        let checkedKeys = [];

        if(props.data.moduleIds){
            props.data.moduleIds.map((item)=>{
                if(props.data.tagIds && props.data.tagIds.indexOf(item) == -1){
                    checkedKeys.push(item);
                }
            });
        }

        this.state = {
            tagIds: props.data.tagIds ? props.data.tagIds : [],
            checkedKeys: checkedKeys,
        };
    }

    handleSubmit = (e) => {

        const {form, addAccountType, updateAccountType, param} = this.props;

        const {checkedKeys,tagIds} = this.state;

        e.preventDefault();

        form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {
                let formData = {
                    'desc': values.desc,
                    'disabled': values.disabled,
                    'name': values.name,
                    'role':values.role,
                    'moduleIds': checkedKeys,
                    'tagIds':tagIds
                };

                if (checkedKeys.length == 0) {
                    message.warn('至少勾选一组权限！');
                    return null;
                }

                if (param == null) {
                    addAccountType(formData);
                } else {
                    updateAccountType({
                        id: param,
                        data: formData
                    });
                }

            }
        });
    };

    /*onSelect = (info) => {
        console.log('selected', info);
    };*/

    onCheck = (checkedKeys,e) => {

        //Joe要求选中子节点的同时带上父节点的key
        let tagIds = e.halfCheckedKeys;

        this.setState({
            checkedKeys,
            tagIds
        });
    };

    render() {

        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16},
        };

        let {form, visible, reset, param, info} = this.props;

        let {checkedKeys} = this.state;

        const {getFieldDecorator} = form;

        let footer = (
            <div>
                <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                <Button onClick={reset}>取消</Button>
            </div>
        );
        // 构造树形数据
        let TreeDom = (
            <Tree checkable
                  className="account-premission-list"
                  checkedKeys={checkedKeys}
                  defaultExpandAll
                  onCheck={this.onCheck}>
                {info.tags && info.tags.map((item) => (
                    <TreeNode title={item.name} key={item.tagId}>
                        {
                            item.tags && item.tags.map((secondItem) => (
                                <TreeNode title={secondItem.name} key={secondItem.tagId}
                                          className={secondItem.modules?null:'tree-inline-block'}>
                                    {
                                        secondItem.modules && secondItem.modules.map((thirdItem) => (
                                            <TreeNode title={thirdItem.name} key={thirdItem.id}
                                                      className="tree-inline-block">

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

        return (
            <div>
                <Modal title={param ? '修改默认权限' : '新建默认权限'}
                       width="560px"
                       visible={visible}
                       footer={footer}
                       onCancel={reset}>
                    <Form layout="horizontal">
                        <Card title="岗位信息">
                            <FormItem
                                {...formItemLayout}
                                label="岗位分类："
                                hasFeedback>
                                {
                                    getFieldDecorator('name', {
                                        rules: [{
                                            required: true,
                                            message: '请输入岗位分类',
                                        }]
                                    })(
                                        <Input style={{'width': '50%'}}/>
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="角色："
                                hasFeedback>
                                {
                                    getFieldDecorator('role', {
                                        rules: [{
                                            required: true,
                                            message: '请选择角色'
                                        }]
                                    })(
                                        <RadioGroup>
                                            <Radio value="ADMIN">管理员</Radio>
                                            <Radio value="MANAGER">运营</Radio>
                                        </RadioGroup>
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="启用状态："
                                hasFeedback>
                                {
                                    getFieldDecorator('disabled', {
                                        rules: [{
                                            type: 'boolean',
                                            required: true,
                                            message: '请选择是否设置为默认版本'
                                        }]
                                    })(
                                        <RadioGroup>
                                            <Radio value={false}>是</Radio>
                                            <Radio value={true}>否</Radio>
                                        </RadioGroup>
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="描述："
                                hasFeedback>
                                {
                                    getFieldDecorator('desc', {
                                        rules: [{
                                            required: false,
                                        }]
                                    })(
                                        <Input type="textarea" rows={4}/>
                                    )
                                }
                            </FormItem>
                        </Card>
                        <br/>
                        <Card title="权限明细">
                            {TreeDom}
                        </Card>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create({
    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function (props) {

        const {data} = props;

        // console.dir(data);

        if (data) {

            return {
                desc: {
                    value: data.desc
                },
                disabled: {
                    value: data.disabled
                },
                moduleIds: {
                    value: data.moduleIds ? data.moduleIds : []
                },
                name: {
                    value: data.name
                },
                role:{
                    value: data.role
                }
            };

        } else {
            return {};
        }
    },
    // 当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store
    onFieldsChange: function (props, fields) {

        const keys = Object.keys(fields);

        keys.forEach(key => {

            props.data[key] = fields[key].value;

        });
    }

})(AccountPermissionForm);
