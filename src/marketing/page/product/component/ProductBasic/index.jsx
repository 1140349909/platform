import React, { Component } from 'react';
import {
    Button,
    Form,
    message,
} from 'antd';

import ProductBasicInfo from './basic';
import ProductBasicTrade from './trade';
import _ from 'lodash';
import './index.less';


// 新增产品容器-父组件
class ProductBasic extends Component {

    constructor(props) {
        super(props);
    }

    // 获取表单数据
    handelSubmitClick = () => {
        let isErrors = false;
        let formData = this.props.form.getFieldsValue();

        // 校验
        this.props.form.validateFields((errors) => {
            if (errors) {
                isErrors = true;
                return;
            }
        });

        // 成本价不可大于交易单价
        if (formData.tradingSelect == 'cash') {
            if (formData.cost > formData.price) {
                message.warning('成本价格，不可大于交易单价');
                return;
            }
        }

        // 判断上传图片上否存在
        if (formData.productImgId) {
            if (typeof(formData.productImgId.file.response) == 'undefined') {
                message.warning('图片没有上传完成');
                return;
            }
        } else {
            message.warning('图片没有上传完成');
            return;
        }

        if ((this.props.integral <= 0 || !this.props.integral) && formData.enableIntegralOffset) {
            message.warning('需要在基础设置，设置交易积分兑换比例，才可选择积分抵现');
            return;
        }

        // 判断库存是否为数字型
        if (isNaN(formData.stock) || isNaN(formData.addStock)) {
            message.warning('库存必须为数字');
            return;
        }

        // 判断输入存库是否小于余量，小于报错 || 新增商品时，库存不能会负数
        if (_.has(this.props.data, 'mallCfg.issueNo') && this.props.data.mallCfg.issueNo > 0) {
            if (this.props.data.intensity + parseInt(formData.addStock) <= 0) {
                message.warning('库存减量不得小于库存余量');
                return;
            }
            formData.stock = this.props.data.mallCfg.stock + parseInt(formData.addStock);
        }

        if (formData.cost) {
            formData.cost = formData.cost * 100;
        }

        if (formData.price) {
            formData.price = formData.price * 100;
        }

        if (formData.xprice) {
            formData.xprice = formData.xprice * 100;
        }

        if (!isErrors) {
            return formData;
        }
    }

    // 下一步
    onNext = () => {
        let formData = this.handelSubmitClick();

        if (!formData) return;

        const dataConversion = this.handleDataConversion(formData);

        this.props.onNext(formData, dataConversion);
    }

    // 保存
    onSave = () => {
        let formData = this.handelSubmitClick();

        if (!formData) return;

        const dataConversion = this.handleDataConversion(formData);

        this.props.onSave(formData, dataConversion);
    }

    // 保存并上架
    onSaveOpening = () => {
        let formData = this.handelSubmitClick();

        if (!formData) return;

        const dataConversion = this.handleDataConversion(formData);

        this.props.onSaveOpening(formData, dataConversion);
    }

    // 退出
    onCancel = () => {
        this.props.onCancel();
    }

    // 取消
    onExit = () => {
        this.props.onExit();
    }


    // 数据转为详情设置API可用的数据格式
    handleDataConversion = (formData) => {
        let productImgId = '',
            issueNo = 0;

        // 是否有期号
        if (_.has(this.props.data, 'mallCfg.issueNo')) issueNo = this.props.data.mallCfg.issueNo;
        productImgId = formData.productImgId.file.response.data;

        let data = {
            title: formData.title,
            code: formData.code,
            cost: formData.cost,
            mediaRes: {
                productImgId,
            },
            mallCfg: {
                enableCash: false,
                enableCoupon: false,
                enableIntegral: false,
                enableIntegralCash: false,
                enableIntegralOffset: false,
                issueNo: issueNo,
                limit: formData.limit || 0,
                stock: formData.stock,
            },
        };

        // 判断交易方式，赋于对应的值
        switch (formData.tradingSelect) {
            case 'cash':
                data.mallCfg.enableCash = true;
                data.mallCfg.price = formData.price;
                data.mallCfg.enableCoupon = formData.enableCoupon || false;
                data.mallCfg.enableIntegralOffset = formData.enableIntegralOffset || false;
                break;

            case 'integral':
                data.mallCfg.enableIntegral = true;
                data.mallCfg.integral = formData.integral;
                break;

            case 'cashIntegral':
                data.mallCfg.enableIntegralCash = true;
                data.mallCfg.price = formData.xprice;
                data.mallCfg.integral = formData.xintegral;
                break;
        }

        return data;
    }

    render() {
        const propsData = {
            form: this.props.form,
            data: this.props.data,
        };

        // 弹出层模式下样式变化
        const classBasicShow = this.props.mold == 'show'? 'product-basicshow': '';
        const classBtnsShow  = this.props.mold == 'show'? 'product-basic-btnshow': '';
        const onLink         = this.props.onLink || null;
        const readOnly       = this.props.readOnly;
        const payDisabled    = this.props.payDisabled || false;

        return (
            <div className={'product-basic ' + classBasicShow}>
                <Form layout="horizontal">
                    <ProductBasicInfo
                        readOnly={readOnly}
                        {...propsData}/>

                    <div className="product-basic-line"></div>

                    <ProductBasicTrade
                        data={this.props.data}
                        onLink={onLink}
                        payDisabled={payDisabled}
                        readOnly={readOnly}
                        {...propsData}/>

                        <div className={'product-basic-btns ' + classBtnsShow}>

                        {this.props.onCancel &&
                            <Button
                                size="large"
                                onClick={this.onCancel}>退出编辑</Button>
                        }

                        {this.props.onExit &&
                            <Button
                                size="large"
                                onClick={this.onExit}>取消</Button>
                        }

                        {this.props.onNext &&
                            <Button
                                size="large"
                                type="primary"
                                onClick={this.onNext}>下一步</Button>
                        }

                        {this.props.onSave &&
                            <Button
                                loading={this.props.saveLoading}
                                size="large"
                                type="primary"
                                onClick={this.onSave}>保存</Button>
                        }

                        {this.props.onSaveOpening &&
                            <Button
                                loading={this.props.saveOpeningLoading}
                                size="large"
                                onClick={this.onSaveOpening}>保存并上架</Button>
                        }

                        </div>
                </Form>
            </div>
        );
    }
}


export default Form.create({
    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function (props) {

        let { data } = props;
        if (!data) {
            return {};
        }

        data = _.assign({}, data);

        // 弹出层时，数据转换
        if (props.mold == 'show') {
            let mallCfg = data.mallCfg;

            if (_.has(data, 'mediaRes.productImgId')) {
                // 商品封面图
                data.productImgId = {
                    file: {
                        response: {
                            data: data.mediaRes.productImgId
                        }
                    }
                };
            }

            data.price = 0;
            data.integral = 0;
            data.xprice = 0;
            data.xintegral = 0;

            // 现金
            if (mallCfg.enableCash) {
                data.tradingSelect = 'cash';
                data.price = mallCfg.price;

                // 允许优惠券
                if(mallCfg.enableCoupon) {
                    data.enableCoupon = true;

                // 允许积分抵现
                } else if (mallCfg.enableIntegralOffset) {
                    data.enableIntegralOffset = true;
                }

            // 积分
            } else if (mallCfg.enableIntegral){
                data.tradingSelect = 'integral';
                data.integral = mallCfg.integral;

            // 现金+积分
            } else if (mallCfg.enableIntegralCash) {
                data.tradingSelect = 'cashIntegral';
                data.xprice = mallCfg.price;
                data.xintegral = mallCfg.integral;
            }

            data.stock = mallCfg.stock;
            if (data.limit == 0) {
                data.limit = '';
            } else {
                data.limit = mallCfg.limit;
            }
        }

        return {
            code: {
                value: data.code,
            },
            title: {
                value: data.title,
            },
            cost: {
                value: (data.cost || 0) / 100,
            },
            productImgId: {
                value: data.productImgId,
            },
            tradingSelect: {
                value: data.tradingSelect,
            },
            enableIntegralOffset: {
                value: data.enableIntegralOffset,
            },
            enableCoupon: {
                value: data.enableCoupon,
            },
            price: {
                value: (data.price || 0) / 100,
            },
            integral: {
                value: data.integral || 0,
            },
            xprice: {
                value: (data.xprice || 0) / 100,
            },
            xintegral: {
                value: data.xintegral || 0,
            },
            stock: {
                value: data.stock,
            },
            limit: {
                value: data.limit,
            },
        };
    },
})(ProductBasic);
