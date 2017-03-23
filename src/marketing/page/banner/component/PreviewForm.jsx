import React, {Component} from 'react';
import {Form, Input} from 'antd';

const createForm = Form.create;
const FormItem = Form.Item;

// 直接预览型
class PreviewForm extends Component {

    handleSubmit = ()=> {
        this.props.onCancel();
    };

    render() {

        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {};

        return (
            <div style={{'margin': '0 auto'}}>
                <Form layout="horizontal">

                    <div style={{'margin': '16px 80px'}} className="banner-fix">
                        <FormItem
                            {...formItemLayout}
                            label="标题">
                            {
                                getFieldDecorator('title', {})(
                                    <Input type="text" autoComplete="off" style={{'width': 200}}/>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="链接">
                            {
                                getFieldDecorator('url', {})(
                                    <Input type="url" autoComplete="off" style={{'width': 200}}/>
                                )
                            }
                        </FormItem>
                    </div>
                </Form>
            </div>
        );
    }
}

export default createForm({
    /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
    mapPropsToFields: function (props) {

        let {banner} = props;

        if (banner) {
            return {
                title: {
                    value: banner.title
                },
                url: {
                    value: banner.url
                }
            };

        } else {
            return {};
        }
    },
    /*当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store*/
    onFieldsChange: function (props, fields) {
        //console.log.log(props, fields);

        const keys = Object.keys(fields);

        keys.forEach(key=> {
            props.banner[key] = fields[key].value;
        });
    }
})(PreviewForm);




