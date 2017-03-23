import React, { Component } from 'react';
import {
    Icon,
    InputNumber,
    Form,
    Input,
    Select,
    Checkbox,
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
import _ from 'lodash';

// 商品交易设置
export default class ProductBasicTrade extends Component {

    state = {
        selectVal: 'cash',
        addstockValue: 0,
    }

    componentDidMount() {
        const data = this.props.data;
        if (data) {
            this.setState({
                selectVal: this.props.form.getFieldsValue().tradingSelect
            });
        }
    }

    // 设置交易方式state
    tradingOnSelect = (value) => {
        this.setState({
            selectVal: value
        });
    }

    // 不允许积分抵现优惠券同时开启
    offsetOnchange = (e) => {

        const { setFieldsValue } = this.props.form;

        if (e.target.checked) {
            if (e.target.id == 'enableIntegralOffset') {
                setFieldsValue({
                    enableCoupon: false,
                });
            } else {
                setFieldsValue({
                    enableIntegralOffset: false,
                });
            }
        }
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        let intensity,
            issueNo = 0;
        if (this.props.data) {
            intensity = this.props.data.intensity,
            issueNo = _.has(this.props.data, 'mallCfg.issueNo') ? this.props.data.mallCfg.issueNo : 0;
        }

        const tradingSelectProps = getFieldDecorator('tradingSelect', {
            initialValue: this.state.selectVal,
            onChange: this.tradingOnSelect
        });

        const integralOffsetProps = getFieldDecorator('enableIntegralOffset', {
            valuePropName: 'checked',
            onChange: this.offsetOnchange,
        });

        const enableCouponProps = getFieldDecorator('enableCoupon', {
            valuePropName: 'checked',
            onChange: this.offsetOnchange,
        });

        const stockProps = getFieldDecorator('stock', {
            rules: [
                { required: true, message: '请填写库存', type:'number'},
            ],
        });

        const addStockProps = getFieldDecorator('addStock',
            {
                initialValue: 0,
            }
        );

        const limitProps = getFieldDecorator('limit');

        let priceProps,
            integralProps,
            xPriceProps,
            xIntegralProps;

        if (this.state.selectVal == 'cash') {
            priceProps = getFieldDecorator('price', {
                rules: [
                    { required: true, message: '请填写单价', type:'number'},
                ],
            });
        }

        if (this.state.selectVal == 'integral') {
            integralProps = getFieldDecorator('integral', {
                rules: [
                    { required: true, message: '请填写积分', type:'number'},
                ],
            });
        }

        if (this.state.selectVal == 'cashIntegral') {
            xPriceProps = getFieldDecorator('xprice', {
                rules: [
                    { required: true, message: '不得为空', type:'number'},
                ],
            });
        }

        if (this.state.selectVal == 'cashIntegral') {
            xIntegralProps = getFieldDecorator('xintegral', {
                rules: [
                    { required: true, message: '不得为空', type:'number'},
                ],
            });
        }

        const formItemLayout = {
            labelCol: { span:3 },
            wrapperCol: { span: 19 },
        };

        return (
            <div className="product-basic-trade">
                <h2>商品交易设置</h2>

                <FormItem
                    label="交易方式"
                    {...formItemLayout}>

                    {tradingSelectProps(
                        <Select
                            style={{width:'200px'}}>
                            <Option value="cash">现金</Option>
                            <Option value="integral">积分</Option>
                            <Option value="cashIntegral">现金 + 积分</Option>
                        </Select>
                    )}

                    {!this.props.payDisabled &&
                        <a href="marketing.html#/payway">
                            &nbsp;&nbsp;
                            <Icon type="info-circle"></Icon>
                            第三方支付未配置
                        </a>
                    }
                </FormItem>

                {this.state.selectVal == 'cash' &&
                    <FormItem
                        label="交易单价"
                        {...formItemLayout}>

                        {priceProps(
                            <InputNumber
                                min={0}
                                step={0.001}/>
                        )}元
                        <div>
                            {integralOffsetProps(
                                <Checkbox>允许积分抵现:</Checkbox>
                            )}
                            按照平台&nbsp;
                            <a href="marketing.html#/integral">
                                <Icon type="info-circle"></Icon>积分兑换比率
                            </a>，积分可以最大限度进行抵现
                        </div>
                        <div>
                            {enableCouponProps(
                                <Checkbox>允许使用优惠券:</Checkbox>
                            )}
                            商品可以使用优惠券
                        </div>
                    </FormItem>
                }
                {this.state.selectVal == 'integral' &&
                    <FormItem
                        {...formItemLayout}
                        label="交易单价">
                        {integralProps(
                            <InputNumber
                                min={0}/>
                        )}
                        &nbsp;积分
                    </FormItem>
                }

                {this.state.selectVal == 'cashIntegral' &&
                    <FormItem
                        label="交易单价"
                        {...formItemLayout}>
                        {xPriceProps(
                            <InputNumber
                                min={0}
                                step={0.001}/>
                        )}
                        元 + &nbsp;
                        {xIntegralProps(
                            <InputNumber/>
                        )}
                        &nbsp;积分
                    </FormItem>
                }
                {issueNo == 0 &&
                    <FormItem
                        label="上架数量"
                        {...formItemLayout}>

                        {stockProps(
                            <InputNumber
                                min={1}/>
                        )}
                            件&nbsp;&nbsp;
                            <span style={{'color':'#999'}}>当销售完上架数量，系统会自动停售</span>
                    </FormItem>
                }
                {issueNo !== 0 &&
                    <FormItem
                        label="追加库存"
                        help="正数为追加库存操作，负数为减库存操作"
                        {...formItemLayout}>
                        {addStockProps(
                            <Input
                                className="product-basic-addstock"/>
                        )}
                        件&nbsp;&nbsp;
                            <span>库存总量：{this.props.data.mallCfg.stock || 0}&nbsp;&nbsp;&nbsp;</span>
                            <span>已售量：{this.props.data.opdata.tradeData.amount || 0}&nbsp;&nbsp;&nbsp;</span>
                            <span>库存余量：{intensity + this.state.addstockValue || 0}</span>
                    </FormItem>
                }

                <FormItem
                    label="每人限购"
                    {...formItemLayout}>

                    {limitProps(
                        <InputNumber
                            min={0}
                            {...limitProps}/>
                    )}
                        件&nbsp;&nbsp;
                        <span style={{'color':'#999'}}>
                            不填默认为库存数量
                        </span>
                </FormItem>
            </div>
        );
    }
}
