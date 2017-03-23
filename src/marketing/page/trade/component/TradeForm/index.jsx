import React, {Component} from 'react';
import {Modal, Form, Input, Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class TradeForm extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        data: {
            ...this.props.data
        }
    };

    handleSubmit=()=> {

        this.props.form.validateFields((errors, values) => {
            if (errors) {
                return;
            }else{
                const formData = values;
                // 验证
                this.props.save(formData,this.props.data);
            }
        });
    };

    render() {

        let {data} = this.props;
        if (!data) {
            return null;
        }

        let address = data.address;

        const visible = (this.props.type == 'submit'),
            title = '提交物流信息';

        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20}
        };

        const {getFieldDecorator} = this.props.form;

        //定义物流数据模型

        const vendorModel = [
            {
                name:'顺丰快递',
                value:'顺丰'
            },
            {
                name:'圆通快递',
                value:'圆通'
            },
            {
                name:'中通快递',
                value:'中通'
            },
            {
                name:'申通快递',
                value:'申通'
            },
            {
                name:'韵达快递',
                value:'韵达'
            }
        ];

        let selectList = [];

        for(let i = 0;i<vendorModel.length;i++){

            let data = vendorModel[i];

            selectList.push(<Option value={data.value} key={i}>{data.name}</Option>);
        }

        return (
            <div>
                <Modal title={title}
                       visible={visible}
                       onOk={this.handleSubmit}
                       onCancel={()=>this.props.reset(this.props.data.pageIndex)}>
                    <Form layout="horizontal" >
                        <FormItem
                            {...formItemLayout}
                            label="收货人：">
                            <p className="ant-form-text" id="consignee" name="consignee">
                                {data!=null?address.name:''}
                            </p>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="联系方式：">
                            <p className="ant-form-text" id="mobile" name="mobile">
                                {data!=null?address.mobile:''}
                            </p>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="联系地址：">
                            <p className="ant-form-text" id="address" name="address">
                                {data!=null?address.prov+' '+address.city+' '+address.region+' '+address.street:''}
                            </p>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="快递：">
                            {
                                getFieldDecorator('vendor',{
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择快递'
                                        }
                                    ]
                                })(
                                    <Select showSearch
                                            placeholder="请选择快递"
                                            optionFilterProp="children"
                                            notFoundContent="无法找到">
                                        {selectList}
                                    </Select>
                                )
                            }

                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="运单号：">
                            {
                                getFieldDecorator('code',{
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入运单号'
                                        }
                                    ]
                                })(
                                    <Input type="text"
                                           placeholder="输入运单号"
                                           autoComplete="off"/>
                                )
                            }
                        </FormItem>
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
        if (data) {
            return {
                vendor: {
                    value: data.vendor
                },
                code: {
                    value: data.code
                }
            };
        } else {
            return {};
        }
    },
})(TradeForm);
