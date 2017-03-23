import React, {Component} from 'react';
import {Modal, Button, Form, InputNumber, Icon, Table} from 'antd';

const FormItem = Form.Item;

/*封装模态框类，与表单配合使用*/
class CouponShow extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = (e)=> {

        e.preventDefault();

        this.props.form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {

                const formData = {
                    'perTotal': values.perTotal,
                    'plusAmount': values.plusAmount,
                };

                if (values.total == -1) {
                    delete formData.plusAmount;
                }

                // 验证
                this.props.submit(formData, this.props.data.id);
            }
        });
    };

    render = ()=> {
        let {data, resData} = this.props;

        if (data == null && resData == null) {
            return null;
        }

        let title = '',
            visible = false,
            display = undefined,
            width = undefined,
            content = undefined,
            footer = undefined;


        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20}
        };

        const {getFieldDecorator} = this.props.form;

        //表格的columns
        let columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                width: 64
            }, {
                title: '投放',
                dataIndex: 'delivery',
                key: 'delivery',
                width: 433
            }, {
                title: '内容类型',
                dataIndex: 'type',
                key: 'type',
                width: 142,
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
                title: '已领取',
                dataIndex: 'reception',
                key: 'reception',
                width: 64,
                sorter: (a, b) => a.reception - b.reception
            }, {
                title: '已占用',
                dataIndex: 'used',
                key: 'used',
                width: 65,
                sorter: (a, b) => a.used - b.used
            }, {
                title: '已核销',
                dataIndex: 'verification',
                key: 'verification',
                width: 65,
                sorter: (a, b) => a.verification - b.verification
            }
        ];

        const dataList = this.props.resData != undefined ? this.props.resData : [];

        const dataSource = [];

        for (let i = 0; i < dataList.length; i++) {

            let scrData = dataList[i];
            let statusText = '';

            scrData.key = i;
            scrData.index = i + 1;


            //待调整
            let data = {

                pageIndex: dataList[i].pageIndex,
                index: i + 1,
                id: dataList[i].id,
                type: dataList[i].resBindType,
                reception: dataList[i].recieved+dataList[i].cashed+dataList[i].used,
                verification: dataList[i].cashed,
                used: dataList[i].used,
                receptionRate: dataList[i].recieved / dataList[i].total,
                verificationRate: dataList[i].cashed / dataList[i].total,
                delivery: dataList[i].resName,
                status: statusText

            };

            dataSource.push(data);

        }

        switch (this.props.type) {
            case 'showAddNumber':
                title = '追加优惠券';
                visible = true;
                display = true;

                if (!data) {
                    return null;
                }

                footer = (
                    <div>
                        <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                        <Button onClick={()=>this.props.reset(this.props.data.pageIndex)}>取消</Button>
                    </div>
                );

                content = (
                    <Form layout="horizontal">
                        <FormItem
                            {...formItemLayout}
                            label="追加数量：">
                            {
                                getFieldDecorator('plusAmount',{

                                })(
                                    <InputNumber style={{width: 100}}
                                                 min={1}
                                                 disabled={data.total == -1}
                                                 placeholder="输入数量"/>
                                )
                            }
                            <span className="ant-form-text" id="plusAmount" name="plusAmount" style={{'color':'#999'}}>
                            <Icon type="exclamation-circle" style={{'color': 'red'}}/>
                                &nbsp;
                                总分发数量：
                            <span>{data.total == -1 ? '不限' : this.props.data.plusAmount ? data.total + this.props.data.plusAmount : data.total + 1}</span>
                                &nbsp;
                                剩余数量：
                            <span>{data.total == -1 ? '不限' : this.props.data.plusAmount ?
                            data.total - data.recieved + this.props.data.plusAmount :
                            data.total - data.recieved + 1
                            }</span>
                        </span>
                        </FormItem>
                        <FormItem style={{display:'none'}}
                                  {...formItemLayout}
                                  label="分发数量：">
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
                                    rules: [
                                        {
                                            type: 'number',
                                            required: true,
                                            message: '请输入次数'
                                        }
                                    ]
                                })(
                                    <InputNumber style={{width: 100}}
                                                 min={1}
                                                 max={data.total != -1 ? data.total : Infinity}
                                                 placeholder="输入数量"
                                                 autoComplete="off"/>
                                )
                            }

                            <span className="ant-form-text" id="perTotal" name="perTotal" style={{'color':'#999'}}>
                             &nbsp;每个用户领券数量，默认为1
                        </span>
                        </FormItem>
                    </Form>
                );
                break;
            case 'showCouponInfo':
                title = '优惠券详情';
                visible = true;
                display = false;

                if (!resData) {
                    return null;
                }

                width = 1080;
                footer = '';
                content = (
                    <Table columns={columns}
                           style={{'display': !display ? 'block' : 'none'}}
                           rowKey={record => record.id}
                           dataSource={dataSource}
                           scroll={{y: 240}}
                           bordered/>
                );
                break;

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
                    value:data.total?data.total:-1
                },
                plusAmount: {
                    value: 1
                },
                perTotal: {
                    value: data.rule?data.rule.receive.perTotal:1
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
})(CouponShow);
