import React, { Component } from 'react';
import {
    Button,
    Modal,
    Form,
    Input,
    message,
    InputNumber,
} from 'antd';
import './index.less';
const FormItem = Form.Item;


// 新增产品容器-父组件
class YygProductTrade extends Component {

    constructor(props) {
        super(props);
    }

    // 获取表单数据
    handleSubmitClick = () => {
        let isErrors = false;


        // 校验
        this.props.form.validateFields((errors) => {
            if (errors) {
                isErrors = true;
                return;
            }
        });

        if (!isErrors) {
            let formData = this.props.form.getFieldsValue(),
                stock = 0;

            // 判断每期开奖个数，不得超过投币次数
            if (formData.numOfOwners > formData.credit / formData.bidStep) {
                message.warning('每期开奖个数，不得超过投币次数');
                return;
            }

            // 判断是否追加库存
            if (this.props.data.isImprove) {
                let additionalStock = parseInt(formData.additionalStock) || 0;

                if(isNaN(formData.additionalStock)) {
                    message.warning('库存必须为数字');
                    return;
                }

                if(this.props.data.intensity + additionalStock <= 0) {
                    message.warning('库存减量不得小于库存余量');
                    return;
                }

                formData.stock = additionalStock + this.props.data.yygCfg.stock;
                stock = this.props.data.intensity + additionalStock;
                delete formData.additionalStock;
            } else {
                if(isNaN(formData.stock)) {
                    message.warning('库存必须为数字');
                    return;
                }
                stock = formData.stock;
            }

            // 开奖个数
            if (stock % formData.numOfOwners !== 0) {
                message.warning('库存必需能被开奖个数整除,否则不满足开奖条件');
                return;
            }

            return {
                cost: formData.cost * 100,
                yygCfg: {
                    bidStep: formData.bidStep,
                    credit: formData.credit,
                    numOfOwners: formData.numOfOwners,
                    stock: formData.stock,
                },
            };
        }
    }

    // 取消
    onCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    // 保存
    onOk = () => {
        if (this.props.onOk) {
            let data = this.handleSubmitClick();
            if (!data) return;
            this.props.onOk(data);
        }
    }

    // 保存并提交
    onSaveSubmit = () => {
        if (this.props.onSaveSubmit) {
            let data = this.handleSubmitClick();
            if (!data) return;
            this.props.onSaveSubmit(data);
        }
    }

    render() {

        const extra = this.props.extra ? this.props.extra : '参与规则';

        let footer = [];

        // 判断是否存在按钮回调函数，显示对应按钮
        if (this.props.onCancel) {
            footer.push(
                <Button
                    size="large"
                    key="cancel"
                    onClick={this.onCancel}>取消</Button>
                );

        }

        if (this.props.onOk) {
            footer.push(
                <Button
                    loading={this.props.saveLoading}
                    size="large"
                    type="primary"
                    key="save"
                    onClick={this.onOk}>保存</Button>
                );
        }

        if (this.props.onSaveSubmit) {
            footer.push(
                <Button
                    loading={this.props.saveSubmitLoading}
                    size="large"
                    key="saveSubmit"
                    onClick={this.onSaveSubmit}>保存并上架</Button>
                );
        }

        return (
            <div className='yyg-product-trade'>
                <Modal ref="modal"
                    width={700}
                    visible={this.props.visible}
                    title={extra}
                    onCancel={this.props.onCancel}
                    footer={footer}>
                <div>
                    <Form>
                        <YygProductTradeForm
                            data={this.props.data}
                            form={this.props.form}/>
                    </Form>
                </div>
            </Modal>
            </div>
        );
    }
}

class YygProductTradeForm extends Component {

    state = {

        // 可连续开奖期数
        nper: null,

        // 盈利数
        earnings: null,
    }

    componentDidMount(){
        this.handelNper();
        this.handelEarnings();
    }

    // 校验不得小于等于0
    isNotZero = (rule, value, callback) => {
        if (value == 0) {
            callback([new Error('输入值不得小于0或等于0')]);
        } else {
            callback();
        }
    }

    checkCredit = (rule, value, callback) => {
        const { validateFields } = this.props.form;
        if (value) {
            validateFields(['bidStep'], { force: true });
        }
        callback();
    }

    checkCredit2 = (rule, value, callback) => {
        const { getFieldsValue} = this.props.form;
        const {
            credit,
            bidStep,
        } = getFieldsValue();

        if (bidStep > credit) {
            callback([new Error('最低投币数不得大于所需总数！')]);
        } else if(credit % bidStep !== 0){
            callback([new Error('"所需总数"必需能被"最低投币数"整除')]);
        } else if (bidStep == 0 || credit == 0) {
            callback([new Error('最低投币数或所需总数不得为0！')]);
        } else {
            callback();
        }
    }

    // 计算一元购盈利
    handelEarnings = () => {
        setTimeout(()=>{
            const { getFieldsValue} = this.props.form;
            const credit = parseInt(getFieldsValue().credit);
            const cost = parseInt(getFieldsValue().cost);
            const numOfOwners = parseInt(getFieldsValue().numOfOwners);
            let earnings = credit - cost * numOfOwners;
            this.setState({
                earnings: earnings
            });
        }, 100);
    }

    // 计算一元购可玩次数
    handelNper = () => {
        this.handelEarnings();
        setTimeout(()=>{
            const { getFieldsValue} = this.props.form;
            const { isImprove } = this.props.data;
            const {
                additionalStock,
                stock,
                numOfOwners,
            } = getFieldsValue();
            let nper = 0;

            if (isImprove) {
                nper = ((parseInt(additionalStock) || 0) + this.props.data.intensity) / numOfOwners;
            } else {
                nper = stock / numOfOwners;
            }

            if (nper % 1 == 0){
                this.setState({
                    nper,
                });
            } else {
                this.setState({
                    nper: null,
                });
            }
        }, 100);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isImprove } = this.props.data;

        const creditProps = getFieldDecorator('credit', {
            rules: [
                {required: true, message: '最低投币数' ,type:'number'},
                { validator: this.checkCredit},
            ],
            onChange: this.handelEarnings,
        });

        const costProps = getFieldDecorator('cost', {
            rules: [
                {required: true, message: '请填写成本金额' ,type:'number'},
            ],
            onChange: this.handelEarnings,
        });

        const bidStepProps = getFieldDecorator('bidStep', {
            rules: [
                {required: true, message: '请填写所需总数' ,type:'number'},
                { validator: this.checkCredit2},
            ],
        });

        const numOfOwnersProps = getFieldDecorator('numOfOwners', {
            rules: [
                {required: true, message: '请填写每期开奖' ,type:'number'},
                { validator: this.isNotZero},
            ],
            onChange: this.handelNper,
        });

        let additionalStockProps,
            stockProps;

        // 判断是否为追加状态
        if (isImprove) {
            additionalStockProps = getFieldDecorator('additionalStock', {
                initialValue: 0,
                onChange: this.handelNper,
            });
        } else {
            stockProps = getFieldDecorator('stock', {
                rules: [
                    {required: true, message: '请填写新库存量' ,type:'number'},
                ],
                onChange: this.handelNper,
            });
        }

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        return (
            <div className='yyg-product-trade-form'>
                <FormItem
                    {...formItemLayout}
                    label="每期所需总数">
                    {creditProps(
                        <InputNumber
                            min={0}
                            placeholder="所需总数"/>
                    )}
                    币
                    <span className="yyg-product-trade-help">
                        需用户参与的总币数，当期进行开奖
                    </span>
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="最低投币数">
                    {bidStepProps(
                        <InputNumber
                            min={0}
                            placeholder="最低投币数"/>
                    )}虚拟币
                    <span className="yyg-product-trade-help">
                        (用户每参与一次需支付的币数)
                    </span>
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="每期开奖数">
                    {numOfOwnersProps(
                        <InputNumber
                            min={0}
                            placeholder="每期开奖数"/>
                    )}个
                    <span className="yyg-product-trade-help">
                    {this.state.nper &&
                        <span>可连续玩<span className="color-err">&nbsp;{this.state.nper}&nbsp;</span>期一元购</span>
                    }
                    {!this.state.nper &&
                        <span>不满足开奖条件，请仔细填写库存或每期开奖个数</span>
                    }
                    </span>
                </FormItem>

                 <FormItem
                  {...formItemLayout}
                  label="成本价">
                    {costProps(
                        <InputNumber
                            min={0}
                            step={0.001}
                            placeholder="成本价"/>
                    )}元
                    <span className="yyg-product-trade-help">
                        <span>盈利数：<span className="color-err">{this.state.earnings}元</span></span>
                    </span>
                </FormItem>
                {isImprove &&
                    <FormItem
                      {...formItemLayout}
                      help="正数为追加库存操作，负数为减库存操作"
                      label="追加库存量">
                        {additionalStockProps(
                            <Input
                                className="yyg-product-trade-addStock"
                                placeholder="追加库存量"/>
                        )}件
                        <span className="yyg-product-trade-help">
                            现库存余量&nbsp;<span className="color-err">{this.props.data.intensity}</span>&nbsp;件
                        </span>
                    </FormItem>
                }
                {!isImprove &&
                    <FormItem
                      {...formItemLayout}
                      help="发布后按照新的上架数量进行交易"
                      label="新库存量">
                        {stockProps(
                            <InputNumber
                                min={1}
                                placeholder="新库存量"/>
                        )}件
                        <span className="yyg-product-trade-help">
                            现库存余量{this.props.data.intensity}件
                        </span>
                    </FormItem>
                }
            </div>
        );
    }
}

export default Form.create({

    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function (props) {

        let { data } = props;

        const yygCfg = data.yygCfg;

        if (!data) {
            return {};
        }

        let cost = data.cost / 100,
            credit = yygCfg.credit,
            bidStep = yygCfg.bidStep;


        if (bidStep == 0) {
            bidStep = 1;
        }

        return {
            cost: {
                value: cost,
            },
            bidStep: {
                value: bidStep,
            },
            credit: {
                value: credit,
            },
            numOfOwners: {
                value: yygCfg.numOfOwners,
            },
        };
    },
})(YygProductTrade);
