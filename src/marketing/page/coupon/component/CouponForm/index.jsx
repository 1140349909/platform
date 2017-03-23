import React, {Component} from 'react';
import {Button, Form, Input, Select, InputNumber, Radio, Checkbox, Card, notification} from 'antd';
import {dateFormat} from 'common/util/index';
import './index.less';
import {withRouter} from 'react-router';
import DatePickerGroup from 'common/component/DatePickerGroup';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;


@withRouter

class CouponForm extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        startValue: null,
        endValue: null,

        intervalStartDate: '20xx-xx-xx',
        intervalEndDate: '20xx-xx-xx'
    };

    //重置
    handleReset = (e)=> {

        e.preventDefault();

        this.props.form.resetFields();
    };

    //提交数据
    handleSubmit = (e)=> {

        e.preventDefault();

        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            } else {

                values.intervalStartDate = (this.state.intervalStartDate != '' && this.state.intervalStartDate != '20xx-xx-xx') ? this.state.intervalStartDate : undefined;
                values.intervalEndDate = (this.state.intervalEndDate != '' && this.state.intervalEndDate != '20xx-xx-xx') ? this.state.intervalEndDate : undefined;

                // 校验
                switch (values.totalType) {
                    case 'infinity':
                        values.total = -1;
                        break;
                    case 'finity':
                        if (values.total == undefined || values.total == '') {
                            notification.warning({
                                message: '警告',
                                description: '请输入券总量！'
                            });
                            return;
                        }
                        break;

                }

                switch (values.periodType) {
                    case 'dynamic':
                        if (values.dynamicBegin == undefined || values.dynamicEnd == undefined) {
                            notification.warning({
                                message: '警告',
                                description: '请选择时间范围！'
                            });
                            return;
                        }
                        break;
                    case 'interval':
                        if (values.intervalStartDate == undefined || values.intervalEndDate == undefined) {
                            notification.warning({
                                message: '警告',
                                description: '请选择固定日期！'
                            });
                            return;
                        }
                        break;
                }

                if (values.total == 0) {
                    notification.warning({
                        message: '警告',
                        description: '券总数不能为0！'
                    });
                    return;
                }

                //建模
                const formData = {
                    couponType: values.couponType,

                    name: values.name,
                    rule: {
                        give: {
                            charge: {
                                enable: values.chargeEnable,
                                min: values.chargeMin * 100
                            },
                            period: {
                                dynamic: {
                                    enable: values.periodType == 'dynamic',
                                    begin: values.dynamicBegin,
                                    end: values.dynamicEnd
                                },
                                interval: {
                                    enable: values.periodType == 'interval',
                                    startDate: values.intervalStartDate,
                                    endDate: values.intervalEndDate
                                }
                            }
                        },
                        receive: {
                            perTotal: values.receivePerTotal
                        }
                    },
                    total: values.total
                };

                switch (values.couponType) {
                    case 'discount':
                        formData.discount = values.discount;
                        break;
                    case 'quota':
                        formData.faceValue = values.faceValue * 100;
                        break;

                }

                if (values.chargeEnable) {
                    if (values.chargeMin == undefined) {
                        notification.warning({
                            message: '警告',
                            description: '请输入最低消费金额！'
                        });
                        return;
                    }
                } else {
                    // null
                }

                // 验证
                this.props.save(formData);

            }
        });
    };

    //优惠券面值列表
    setFaceValue = (data)=> {

        this.props.form.setFieldsValue({
            'faceValue': data
        });

    };

    //日期选择器校验
    disabledStartDate = (startValue) => {

        var dd = new Date();
        var y = dd.getFullYear();
        var m = dd.getMonth();//获取当前月份的日期
        var d = dd.getDate();

        var ss = new Date(new Date(y, m, d).getTime());

        if (!startValue || !this.state.endValue) {
            return startValue.getTime() <= ss.getTime();
        }

        return (startValue.getTime() <= ss.getTime() || (startValue.getTime() >= this.state.endValue.getTime()));

    };

    disabledEndDate = (endValue)=> {

        var dd = new Date();
        var y = dd.getFullYear();
        var m = dd.getMonth();//获取当前月份的日期
        var d = dd.getDate();

        // 86400000

        var ss = new Date(new Date(y, m, d).getTime());

        if (!endValue || !this.state.startValue) {
            return endValue.getTime() <= ss.getTime();
        }

        return (endValue.getTime() <= this.state.startValue.getTime() || endValue.getTime() <= ss.getTime());
    };

    onChange = (field, value)=> {
        this.setState({
            [field]: value
        });

        if (value != undefined) {
            switch (field) {
                case 'startValue':
                    this.props.form.setFieldsValue({
                        'intervalStartDate': dateFormat(value, 'yyyy-MM-dd')
                    });
                    break;
                case 'endValue':
                    this.props.form.setFieldsValue({
                        'intervalEndDate': dateFormat(value, 'yyyy-MM-dd')
                    });
                    break;

            }
        }


    };

    onStartChange = (value)=> {
        this.onChange('startValue', value);
    };
    onEndChange = (value)=> {
        this.onChange('endValue', value);
    };

    rangeOnChange = (value, dateString)=> {

        this.setState({
            intervalStartDate: dateString[0] != '' ? dateString[0] : '20xx-xx-xx',
            intervalEndDate: dateString[1] != '' ? dateString[1] : '20xx-xx-xx'
        });
    };

    disabledDate = (value)=> {

        var dd = new Date();
        //dd.setDate(dd.getDate()-1);
        var y = dd.getFullYear();
        var m = dd.getMonth();//获取当前月份的日期
        var d = dd.getDate();

        var ss = new Date(new Date(y, m, d).getTime());

        return value && value.valueOf() < ss.getTime();

        // return value && value.valueOf() <= Date.now();
    };

    //有效期转具体日期
    validRangeDate = (addValue) => {

        var dd = new Date();
        //dd.setDate(dd.getDate()-1);
        var y1 = dd.getFullYear();
        var m1 = dd.getMonth();//获取当前月份的日期
        var d1 = dd.getDate();
        //获取日期时间，1天的毫秒数是86400000
        var ss = new Date(new Date(y1, m1, d1).getTime() + 86400000 * addValue);
        //日期格式化
        var y2 = ss.getFullYear();
        var m2 = ss.getMonth() + 1 < 10 ? '0' + (ss.getMonth() + 1).toString() : ss.getMonth() + 1; //获取当前月份的日期
        var d2 = ss.getDate() < 10 ? '0' + (ss.getDate()).toString() : ss.getDate();

        return y2 + '-' + m2 + '-' + d2;

    };

    render() {

        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20}
        };

        const {getFieldDecorator,getFieldValue} = this.props.form;

        //定义优惠券面值模型

        const faceValueModel = this.props.list;

        let faceValueLength = faceValueModel.length;

        if (!faceValueModel) {
            return null;
        }

        if (faceValueLength > 5) {
            faceValueLength = 5;
        }

        let selectList = [];

        for (let i = 0; i < faceValueLength; i++) {

            let data = faceValueModel[i] / 100;

            selectList.push(
                <Button key={i}
                        className="button-style"
                        onClick={()=>this.setFaceValue(data)}>{data + '元'}</Button>
            );
        }

        return (

            <div style={{'width': '1200px'}}>

                <div className="coupon-bg">

                            <span className="coupon-face-value">

                                {this.props.couponData.couponType == 'quota' &&
                                <span>
                                        ￥
                                <span style={{'fontSize': '16px'}}>{this.props.couponData.faceValue}</span>
                                    元
                                    </span>
                                }

                                {this.props.couponData.couponType == 'discount' &&
                                <span>

                                <span style={{'fontSize': '16px'}}>{this.props.couponData.discount}</span>
                                    折
                                    </span>
                                }

                            </span>

                    <span className="coupon-type">

                        {this.props.couponData.couponType == 'quota' &&
                        <span>定额优惠券</span>
                        }

                        {this.props.couponData.couponType == 'discount' &&
                        <span>折扣优惠券</span>
                        }

                    </span>

                    <span className="coupon-platform">平台通用</span>

                    {this.props.couponData.chargeEnable && <span className="coupon-limit">
                                {'满￥' + this.props.couponData.chargeMin + '元可用'}
                    </span>}

                    {this.props.couponData.periodType == 'interval' && <div className="coupon-period-type">

                        {this.state.intervalStartDate}
                        <span>至</span>
                        {this.state.intervalEndDate}

                    </div>}

                    {this.props.couponData.periodType == 'dynamic' && <div className="coupon-period-type">


                        {this.props.couponData.dynamicBegin != 0 ? this.props.couponData.dynamicBegin + '天后生效' : '当天生效'}，有效天数{this.props.couponData.dynamicEnd}天
                        {/*{this.validRangeDate(this.props.couponData.dynamicBegin)}
                         <span>至</span>
                         {this.validRangeDate(this.props.couponData.dynamicEnd)}*/}
                    </div>}


                </div>


                <div className="coupon-form">
                    <Form layout="horizontal">

                        {/*基本信息*/}
                        <Card title="基本信息">

                            <FormItem
                                {...formItemLayout}
                                label="优惠券类型">
                                {
                                    getFieldDecorator('couponType', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请选择优惠券类型'
                                            }
                                        ]

                                    })(
                                        <Select placeholder="优惠券类型" style={{width: 100}}>
                                            <Option value='discount'>折扣优惠券</Option>
                                            <Option value='quota'>定额优惠券</Option>
                                        </Select>
                                    )
                                }
                            </FormItem>

                            {this.props.couponData.couponType == 'discount'
                            && <FormItem
                                {...formItemLayout}
                                label="折扣额度："
                                help="折扣值为0-9.9的数字">
                                {
                                    getFieldDecorator('discount', {
                                        rules: [
                                            {
                                                type: 'number',
                                                required: true,
                                                min: 0,
                                                max: 9.9,
                                                message: '请输入折扣，最大值9.9'
                                            }
                                        ]
                                    })(
                                        <InputNumber
                                            style={{width: 100}}
                                            step={0.1}
                                            min={0}
                                            max={9.9}
                                            placeholder="输入折扣"
                                            autoComplete="off"
                                        />
                                    )
                                }
                                <span className="ant-form-text"> 折，优惠幅度0-9.9折</span>
                            </FormItem>
                            }
                            {this.props.couponData.couponType == 'quota'
                            && <FormItem
                                {...formItemLayout}
                                label="面值设置：">
                                {
                                    getFieldDecorator('faceValue', {
                                        rules: [
                                            {
                                                type: 'number',
                                                required: true,
                                                max: 5000,
                                                message: '请输入金额，最大值5000元'
                                            }
                                        ]
                                    })(
                                        <InputNumber
                                            style={{width: 100}}
                                            step={0.01}
                                            min={0}
                                            placeholder="输入金额"
                                            autoComplete="off"/>
                                    )
                                }
                                <span className="ant-form-text"> 元，最大值5000元</span>
                                <p id="faceValue" name="faceValue">
                                    已有红包额度&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{selectList}
                                </p>
                            </FormItem>}

                            <FormItem
                                {...formItemLayout}
                                label="券名称："
                                help="建议填写代金券“减免金额”及自定义内容，描述卡券提供的具体优惠">
                                {
                                    getFieldDecorator('name', {
                                        rules: [
                                            {
                                                type: 'string',
                                                required: true,
                                                message: '请输入名称，且不超过24个字符',
                                                min: 2,
                                                max: 24
                                            }
                                        ]
                                    })(
                                        <Input
                                            style={{width: 300}}
                                            placeholder="输入名称"
                                            autoComplete="off"
                                        />
                                    )
                                }
                                <span className="ant-form-text" id="name" name="name">
                                         &nbsp;&nbsp;{this.props.couponData.name ? this.props.couponData.name.length : 0}/24
                                         </span>
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="发放总量：">
                                {
                                    getFieldDecorator('totalType', {
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
                                                    getFieldDecorator('total', {})(
                                                        <InputNumber
                                                            style={{width: 100}}
                                                            min={1}
                                                            disabled={getFieldValue('totalType') != 'finity'}
                                                            placeholder="输入数量"
                                                        />
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
                        </Card>
                        <br/>
                        <br/>
                        {/*适用设置*/}
                        <Card title="使用设置">
                            <FormItem
                                {...formItemLayout}
                                label="使用期限：">

                                {
                                    getFieldDecorator('periodType', {
                                        initialValue: 'interval',
                                        exclusive: true,
                                        rules: [
                                            {
                                                required: true,
                                                message: '请选择类型'
                                            }
                                        ]
                                    })(
                                        <RadioGroup>
                                            <Radio key="a" value='interval'>
                                        <span className="ant-form-text" id="periodType" name="periodType">
                                            固定日期
                                        </span>
                                            </Radio>

                                            <div style={{'display': 'inline-block'}}>
                                                <DatePickerGroup
                                                    style={{width: 200}}
                                                    size="large"
                                                    disabledDate={this.disabledDate}
                                                    disabled={getFieldValue('periodType') != 'interval'}
                                                    format="YYYY-MM-DD"
                                                    showTime={false}
                                                    onChange={this.rangeOnChange}/>
                                            </div>

                                            <br/>

                                            <Radio key="b" value='dynamic'>
                                        <span className="ant-form-text" id="periodType" name="periodType">
                                            领券后，
                                        </span>
                                            </Radio>

                                            <div style={{'display': 'inline-block'}}>
                                                {
                                                    getFieldDecorator('dynamicBegin', {
                                                        initialValue: 0,
                                                        rules: [
                                                            {
                                                                type: 'number',
                                                                required: true,
                                                                message: '请输入数字'
                                                            }
                                                        ]
                                                    })(
                                                        <InputNumber style={{width: 100}}
                                                                     disabled={getFieldValue('periodType') != 'dynamic'}
                                                                     min={0}
                                                                     placeholder="输入数字"/>
                                                    )
                                                }
                                                <span className="ant-form-text" id="dynamicBegin" name="dynamicBegin">
                                            &nbsp;&nbsp;天后生效，&nbsp;&nbsp;
                                        </span>
                                                <span className="ant-form-text" id="dynamicEnd" name="dynamicEnd">
                                            有效天数
                                        </span>
                                                {
                                                    getFieldDecorator('dynamicEnd', {
                                                        initialValue: 1,
                                                        rules: [
                                                            {
                                                                type: 'number',
                                                                required: true,
                                                                message: '请输入数字'
                                                            }
                                                        ]
                                                    })(
                                                        <InputNumber
                                                            style={{width: 100}}
                                                            disabled={getFieldValue('periodType') != 'dynamic'}
                                                            min={1}
                                                            placeholder="输入数字"
                                                        />
                                                    )
                                                }
                                                <span className="ant-form-text">&nbsp;&nbsp;天</span>
                                            </div>
                                        </RadioGroup>
                                    )
                                }
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="使用限制：">
                                {
                                    getFieldDecorator('chargeEnable', {
                                        initialValue: false
                                    })(
                                        <Checkbox className="ant-checkbox-horizontal">
                                            <span className="ant-form-text" id="chargeEnable"
                                                  name="chargeEnable">最低消费&nbsp;&nbsp;
                                        </span>
                                        </Checkbox>
                                    )
                                }
                                <div style={{'display': 'inline-block'}}>
                                    {
                                        getFieldDecorator('chargeMin', {
                                            initialValue:0
                                        })(
                                            <InputNumber
                                                style={{width: 100}}
                                                min={1}
                                                step={0.01}
                                                disabled={!getFieldValue('chargeEnable')}
                                                placeholder="输入金额"
                                                autoComplete="off"
                                            />
                                        )
                                    }
                                    <span className="ant-form-text" id="chargeMin" name="chargeMin"> 元适用</span>
                                </div>

                            </FormItem>
                        </Card>
                        <br/>
                        <br/>
                        {/*领券设置*/}
                        <Card title="领券设置">
                            <FormItem
                                {...formItemLayout}
                                label="每人限领：">
                                {
                                    getFieldDecorator('receivePerTotal', {
                                        initialValue: 1,
                                        rules: [
                                            {
                                                type: 'number',
                                                required: true,
                                                message: '请输入数量，且不超过发放总量',
                                                min: 1,
                                                max: this.props.couponData.total != -1 && this.props.couponData.total != 0 ? this.props.couponData.total : Infinity
                                            }
                                        ]
                                    })(
                                        <InputNumber
                                            style={{width: 100}}
                                            min={1}
                                            placeholder="输入数量"
                                            autoComplete="off"
                                        />
                                    )
                                }
                                <span className="ant-form-text" id="receivePerTotal" name="receivePerTotal">
                                    每个用户领券数量，默认为1
                                </span>
                            </FormItem>
                        </Card>
                        <br/>
                        <br/>
                        <FormItem wrapperCol={{span: 16, offset: 8}} style={{marginTop: 24}}>
                            <Button className="button-style" type="primary" onClick={this.handleSubmit}>保存</Button>
                            <Button className="button-style" onClick={this.props.jumpBack}>返回</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create({
    /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
    mapPropsToFields: function (props) {
        const {couponData} = props;

        if (couponData) {
            return {
                couponType: {
                    value: couponData.couponType
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
            props.couponData[key] = fields[key].value;
        });

    }
})(CouponForm);
