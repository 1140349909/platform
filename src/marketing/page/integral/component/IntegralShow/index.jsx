import React, {Component} from 'react';
import {Modal, Button, Form, InputNumber, Icon, Table, notification, Radio,Input} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

/*封装模态框类，与表单配合使用*/
class IntegralShow extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = (e)=> {

        e.preventDefault();

        this.props.form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {
                let formData;

                switch (this.props.type) {
                    case 'showAddNumber':
                        formData = {
                            perTotal: values.perTotal,
                            plusAmount: values.plusAmount
                        };

                        if (values.total == -1) {
                            delete formData.plusAmount;
                        }
                        // 验证
                        this.props.submit(formData, this.props.data.id);
                        break;
                    case 'showAddNew':

                        // 校验
                        switch (values.totalType) {
                            case 'infinity':
                                values.total = -1;
                                break;
                            case 'finity':
                                if (values.total == undefined || values.total == '') {
                                    notification.warning({
                                        message: '警告',
                                        description: '请输入分发数量！'
                                    });
                                    return;
                                }
                                break;

                        }

                        if (values.total == 0) {
                            notification.warning({
                                message: '警告',
                                description: '分发数量不能为0'
                            });
                            return;
                        }

                        formData = {
                            name:values.name,
                            integral: values.integral,
                            perTotal: values.newPerTotal,
                            total: values.total
                        };


                        // 验证
                        this.props.addIntegral(formData);
                        break;
                }
            }
        });
    };

    render = ()=> {
        let {data, resData} = this.props;

        let title = '',
            visible = false,
            content = '',
            width = undefined,
            footer = undefined;


        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18}
        };

        const {getFieldDecorator,getFieldValue} = this.props.form;

        //表格的columns
        let columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                width: 88
            }, {
                title: '内容名称',
                dataIndex: 'name',
                key: 'name',
                width: 318
            }, {
                title: '内容类型',
                dataIndex: 'type',
                key: 'type',
                width: 196,
                render: (text, record)=> {

                    let content;

                    switch (record.type) {
                        case 'content':
                            content = '资讯';
                            break;
                        case 'h5':
                            content = 'H5';
                            break;
                        default:
                            content = '-';
                            break;
                    }

                    return (
                        <div>
                            {content}
                        </div>
                    );

                }
            }, {
                title: '已领取次数',
                dataIndex: 'reception',
                key: 'reception',
                width: 114
            }
        ];

        const dataList = this.props.resData != undefined ? this.props.resData : [];

        const dataSource = [];

        for (let i = 0; i < dataList.length; i++) {

            let scrData = dataList[i];

            let statusText = '';

            scrData.key = i;
            scrData.index = i + 1;

            let data = {
                pageIndex: dataList[i].pageIndex,
                index: i + 1,
                name: dataList[i].resName,
                type: dataList[i].resBindType,
                reception: dataList[i].recieved,
                status: statusText,
                id: dataList[i].id
            };

            dataSource.push(data);

        }

        switch (this.props.type) {
            case 'showAddNew':
                title = '积分设置';
                visible = true;

                data = {
                    integral: '',
                    newPerTotal: '',
                    total: '',
                    pageIndex: 0
                };

                footer = (
                    <div>
                        <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                        <Button onClick={()=>this.props.reset()}>取消</Button>
                    </div>
                );

                content = (
                    <Form layout="horizontal">
                        <FormItem
                            {...formItemLayout}
                            label="积分包名称：">
                            {
                                getFieldDecorator('name',{
                                    rules: [
                                        {
                                            type: 'string',
                                            required: true,
                                            message: '请输入名称，且不超过24个字符',
                                            min: 1,
                                            max: 24
                                        }
                                    ]
                                })(
                                    <Input style={{width: 200}}
                                           placeholder="输入名称"
                                           autoComplete="off"/>
                                )
                            }

                            <span className="ant-form-text" id="name" name="name">
                                &nbsp;&nbsp;最长24个字符
                                {/*&nbsp;&nbsp;{this.props.couponData.name ? this.props.couponData.name.length : 0}/24*/}
                            </span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="积分值：">
                            {
                                getFieldDecorator('integral',{
                                    initialValue: 1,
                                    rules: [
                                        {
                                            type: 'number',
                                            required: true,
                                            max: 100000,
                                            message: '请输入积分，最大值100000积分'
                                        }
                                    ]
                                })(
                                    <InputNumber style={{ width: 100 }}
                                                 min={1}
                                                 placeholder="输入积分"/>
                                )
                            }

                        <span className="ant-form-text" id="integral"
                              name="integral">
                            积分，
                            <span style={{'color':'#999'}}>最大值100000积分</span>
                        </span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="分发数量：">
                            {
                                getFieldDecorator('totalType',{
                                    initialValue: 'infinity',
                                    exclusive: true,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择类型'
                                        }
                                    ]
                                })(
                                    <RadioGroup>
                                        <Radio key="c" value='infinity'>
                                            <span className="ant-form-text">不限</span>
                                        </Radio>
                                        <Radio key="b" value='finity'>
                                            {
                                                getFieldDecorator('total',{

                                                })(
                                                    <InputNumber style={{width: 100}}
                                                                 min={1}
                                                                 disabled={getFieldValue('totalType') != 'finity'}
                                                                 placeholder="输入数量"/>
                                                )
                                            }

                                            <span className="ant-form-text" id="total" name="total">
                                            &nbsp;&nbsp;张
                                        </span>
                                        </Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="限领次数：">
                            {
                                getFieldDecorator('newPerTotal',{
                                    initialValue: 1,
                                    rules: [
                                        {
                                            type: 'number',
                                            required: true,
                                            message: '请输入次数'
                                        }
                                    ]
                                })(
                                    <InputNumber style={{ width: 100 }}
                                                 min={1}
                                                 placeholder="输入次数"
                                                 autoComplete="off"/>
                                )
                            }
                        <span className="ant-form-text" id="perTotal"
                              style={{'color':'#999'}}
                              name="perTotal">
                            每个用户可领次数，默认为1
                        </span>
                        </FormItem>
                    </Form>
                );
                break;


            case 'showAddNumber':
                title = '设置追加数量';
                visible = true;

                if (data == null && resData == null) {
                    return null;
                }

                footer = (
                    <div>
                        <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                        <Button onClick={()=>this.props.reset(this.props.data.pageIndex)}>取消</Button>
                    </div>
                );

                content = (<Form layout="horizontal">
                    <FormItem
                        {...formItemLayout}
                        label="追加数量：">
                        {
                            getFieldDecorator('plusAmount',{

                            })(
                                <InputNumber
                                    style={{ width: 100 }}
                                    min={1}
                                    disabled={data.total == -1}
                                    placeholder="输入数量"/>
                            )
                        }

                        <span className="ant-form-text" id="plusAmount" name="plusAmount" style={{'color':'#999'}}>
                            <Icon type="exclamation-circle" style={{'color':'red'}}/>
                            &nbsp;
                            <span>{data.total == -1 ? '不限' : this.props.data.plusAmount ? data.total + this.props.data.plusAmount : data.total + 1}</span>
                            &nbsp;
                            剩余数量：
                            <span>{data.total == -1 ? '不限' : this.props.data.plusAmount ?
                            data.total - data.recieved + this.props.data.plusAmount :
                            data.total - data.recieved + 1
                            }
                            </span>
                        </span>
                    </FormItem>
                    <FormItem style={{display:'none'}}
                        {...formItemLayout}
                        label="积分包数量：">
                        {
                            getFieldDecorator('total',{
                                initialValue: -1,
                                rules: [
                                    {
                                        type: 'number',
                                        required: true,
                                        message: '请输入数量'
                                    }
                                ]
                            })(
                                <InputNumber style={{ width: 100 }}
                                             min={-1}
                                             placeholder="输入数量"/>
                            )
                        }

                        <span className="ant-form-text" id="total" name="total" style={{'color':'#999'}}>
                            <Icon type="exclamation-circle" style={{'color':'red'}}/>
                            &nbsp;
                            -1表示不限
                        </span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="限领数量：">
                        {
                            getFieldDecorator('perTotal',{
                                initialValue: data.perTotal?data.perTotal:1,
                                rules: [
                                    {
                                        type: 'number',
                                        required: true,
                                        message: '请输入次数'
                                    }
                                ]
                            })(
                                <InputNumber
                                    style={{ width: 100 }}
                                    min={1}
                                    max={data.total != -1?data.total:Infinity}
                                    placeholder="输入数量"
                                    autoComplete="off"/>
                            )
                        }

                        <span className="ant-form-text" id="perTotal" name="perTotal" style={{'color':'#999'}}>
                            每个用户领券数量，默认为1
                        </span>
                    </FormItem>
                </Form>);
                break;
            case 'showIntegralInfo':
                title = '积分包详情';
                visible = true;

                resData = data;

                width = 960;

                if (data == null && resData == null) {
                    return null;
                }

                footer = (
                    <div></div>
                );

                content = (
                    <Table columns={columns}
                           rowKey={record => record.id}
                           dataSource={dataSource}
                           scroll={{ y: 240 }}
                           bordered/>
                );
                break;
            default:
                return null;

        }


        return (
            <div>
                <Modal title={title}
                       visible={visible}
                       width={width}
                       footer={footer}
                       onCancel={this.props.reset}>

                    {content}

                </Modal>
            </div>
        );
    };
}

export default Form.create({
    /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
    mapPropsToFields: function (props) {
        const {data} = props;

        if (data) {
            return {
                total:{
                    value:data.total?data.total:''
                },
                plusAmount: {
                    value: 1
                },
                perTotal: {
                    value: data.perTotal
                }
            };
        } else {
            return {};
        }
    },
    /*当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store*/
    onFieldsChange: function (props, fields) {

        const keys = Object.keys(fields);
        keys.forEach(key=> {
            props.data[key] = fields[key].value;
        });

    }
})(IntegralShow);
