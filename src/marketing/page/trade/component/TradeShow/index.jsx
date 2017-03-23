import React, {Component} from 'react';
import {Modal, Form} from 'antd';

const FormItem = Form.Item;

/*封装模态框类，与表单配合使用*/
class TradeShow extends Component {

    constructor(props) {
        super(props);
    }

    render = ()=> {
        let {data} = this.props;

        if (!data) {
            return null;
        }

        let address = data.address;

        let title = '',
            visible = false,
            display = '';

        switch (this.props.type) {
            case 'showConsignee':
                title = '查看信息';
                visible = true;
                display = true;
                break;
            case 'showLogistics':
                title = '查看物流';
                visible = true;
                display = false;
                break;

        }

        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20}
        };

        return (
            <div>
                <Modal title={title}
                       visible={visible}
                       onCancel={()=>this.props.reset(this.props.data.pageIndex)}
                       onOk={()=>this.props.reset(this.props.data.pageIndex)}>
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
                        <div style={{display:display?'none':'block'}}>
                            <FormItem
                                {...formItemLayout}
                                label="快递：">
                                <p className="ant-form-text" id="vendor" name="vendor">
                                    {data.logistic!=undefined?data.logistic.vendor:''}
                                </p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="运单号：">
                                <p className="ant-form-text" id="code" name="code">
                                    {data.logistic!=undefined?data.logistic.code:''}
                                </p>
                            </FormItem>
                        </div>

                    </Form>
                </Modal>
            </div>
        );
    };
}

export default Form.create({})(TradeShow);
