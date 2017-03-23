import React, {Component}from 'react';
import {Cascader, Form} from 'antd';
import * as apiCommon from '../../api/common';

let REGIN_DATA = null;

const FormItem = Form.Item;

export default class AreaCascader extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        data: [],
    };

    // 真实的DOM被渲染出来后调用。
    componentDidMount() {

        if (REGIN_DATA) {
            this.setState({
                data: REGIN_DATA
            });
        } else {
            this.getAddressData();
        }
    }


    getAddressData = ()=> {
        apiCommon.getRegionData().then((result)=> {
            REGIN_DATA = result.data;
            this.setState({
                data: REGIN_DATA
            });
        });
    };

    render() {
        const data = this.state.data;
        const {style, placeholder, formItemLayout, getFieldDecoratorName, require} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <FormItem
                {...formItemLayout}
                label='所在地区'>
                {getFieldDecorator(getFieldDecoratorName, {
                    rules: [
                        {
                            type: 'array',
                            required: require,
                            message: '请选择省份，城市，区'
                        }
                    ]
                })(
                    <Cascader
                        options={data}
                        style={style}
                        placeholder={placeholder}/>
                )}
            </FormItem>

        );
    }
}


