import React, {Component} from 'react';
import {
    InputNumber,
    Button,
    Modal,
    Form,
    Select,
    message,
} from 'antd';
import {moneyFormat} from 'common/util';
import Img from 'common/component/Img';
import './index.less';

const FormItem = Form.Item;
const Option = Select.Option;

class TkerFenRunSetting extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        imgState: 0,
        levelDisabled: true,
        lv0Profit: 0,
        lv1Profit: 0,
        lv2Profit: 0,
    }

    componentDidMount() {
        this.handelComponent();
        setTimeout(()=> {
            let formData = this.props.form.getFieldsValue();
            this.setState({
                lv0Profit: formData.lv0ProfitRate,
                lv1Profit: formData.lv1ProfitRate,
                lv2Profit: formData.lv2ProfitRate,
            });
        }, 500);
    }

    componentWillReceiveProps() {
        this.handelComponent();
    }

    handelProfit = ({
        lv0 = this.state.lv0Profit,
        lv1 = this.state.lv1Profit,
        lv2 = this.state.lv2Profit,
    }) => {
        this.setState({
            lv0Profit: lv0,
            lv1Profit: lv1,
            lv2Profit: lv2,
        });
    }

    handelComponent = () => {
        const {data} = this.props;
        if (data == null) {
            this.setState({
                levelDisabled: false,
            });
        } else {
            this.setState({
                imgState: data.level,
            });
        }
    }

    // 提交
    handelSubmit = () => {
        let formData = this.props.form.getFieldsValue(),
            data = {},
            total = 0,
            isErrors = false;

        this.props.form.validateFields((errors) => {
            if (errors) {
                isErrors = true;
                return;
            }
        });

        data = {
            level: formData.level,
            lv0ProfitRate: formData.lv0ProfitRate,
            lv1ProfitRate: formData.lv1ProfitRate,
            lv2ProfitRate: formData.lv2ProfitRate,
        };

        // 分润率不得高于上级 && 总分润比不得超过100%校验
        if (this.state.imgState == 0) {
            total = data.lv0ProfitRate;
            delete data.lv1ProfitRate;
            delete data.lv2ProfitRate;

        } else if (this.state.imgState == 1) {
            if (data.lv0ProfitRate >= data.lv1ProfitRate) {
                message.warning('下级利润提成不得小于或等于上级利润提成');
                return false;
            }
            total = data.lv0ProfitRate + data.lv1ProfitRate;
            delete data.lv2ProfitRate;

        } else if (this.state.imgState == 2) {
            if (data.lv0ProfitRate >= data.lv1ProfitRate || data.lv1ProfitRate >= data.lv2ProfitRate) {
                message.warning('下级利润提成不得小于或等于上级利润提成');
                return false;
            }
            total = data.lv0ProfitRate + data.lv1ProfitRate + data.lv2ProfitRate;
        } else {
            if (data.lv0ProfitRate >= data.lv1ProfitRate || data.lv1ProfitRate >= data.lv2ProfitRate) {
                message.warning('下级利润提成不得小于或等于上级利润提成');
                return false;
            }
            total = data.lv0ProfitRate + data.lv1ProfitRate + data.lv2ProfitRate;
        }

        if (total > 100) {
            message.warning('总利润提成不得超过100%');
            return false;
        }

        if (!isErrors) {
            return data;
        }
    }

    // 保存
    onSave = () => {
        let formData = this.handelSubmit();
        if (!formData) return;
        this.props.onSave(formData);
    }

    // 返回
    onReturn = () => {
        if (!this.props.onReturn) {
            this.props.onCancel();
        } else {
            this.props.onReturn();
        }
    }

    handelImgChange = (imgState) => {
        this.setState({
            imgState,
        });
    }

    render() {

        const profit = this.props.profit || null;
        return (
            <Modal
                className="tker-fenrun-setting"
                title="商品代言利润提成设置"
                visible={true}
                width={1130}
                onCancel={this.props.onCancel}
                extra='根据商品毛利润（售价成本价）的比例进行代言利润提成设置'
                footer={[
                    <Button
                        key='cancel'
                        size="large"
                        onClick={this.onReturn}>
                        返回
                    </Button>,
                    <Button
                        key='save'
                        size="large"
                        loading={this.props.loading}
                        onClick={this.onSave}
                        type="primary">
                        保存
                    </Button>,
                ]}>
                <div className="tker-fenrun-setting-box">
                    <div className='tker-fenrun-setting-form'>
                        <Form layout="horizontal">
                            <span key="large" className="tker-fenrun-setting-tip">
                                请谨慎进行分润设置，设置后，代言层级不可进行修改！
                            </span>
                            <SettingForm
                                handelProfit={this.handelProfit}
                                profit={profit}
                                data={this.props.data}
                                model={this.props.model}
                                disabled={this.state.levelDisabled}
                                imgState={this.state.imgState}
                                handelImgChange={this.handelImgChange}
                                form={this.props.form}/>
                        </Form>
                    </div>
                    <div className="tker-fenrun-setting-imgs">
                        {this.state.imgState == 0 &&
                        <div>
                            <div className="tker-fenrun-setting-lv tker-fenrun-setting-lv0">
                                利润提成：<span>{this.state.lv0Profit || 0}%</span></div>
                            <Img src="./img/level0.png"/>
                        </div>
                        }

                        {this.state.imgState == 1 &&
                        <div>
                            <div className="tker-fenrun-setting-lv tker-fenrun-setting-lv10">
                                利润提成：<span>{this.state.lv0Profit || 0}%</span></div>
                            <div className="tker-fenrun-setting-lv tker-fenrun-setting-lv11">
                                利润提成：<span>{this.state.lv1Profit || 0}%</span></div>
                            <Img src="./img/level1.png"/>
                        </div>
                        }

                        {this.state.imgState == 2 &&
                        <div>
                            <div className="tker-fenrun-setting-lv tker-fenrun-setting-lv20">
                                利润提成：<span>{this.state.lv0Profit || 0}%</span></div>
                            <div className="tker-fenrun-setting-lv tker-fenrun-setting-lv21">
                                利润提成：<span>{this.state.lv1Profit || 0}%</span></div>
                            <div className="tker-fenrun-setting-lv tker-fenrun-setting-lv22">
                                利润提成：<span>{this.state.lv2Profit || 0}%</span></div>
                            <Img src="./img/level2.png"/>
                        </div>
                        }
                    </div>
                </div>
            </Modal>
        );
    }
}

class SettingForm extends Component {
    state = {
        lv0Profit: 0,
        lv1Profit: 0,
        lv2Profit: 0,
    }

    handelLevelSelect = (val) => {
        this.props.handelImgChange(val);

        this.props.handelProfit({
            lv2: 0,
            lv1: 0,
            lv0: 0,
        });
        this.props.form.setFieldsValue({
            lv0ProfitRate: '',
            lv1ProfitRate: '',
            lv2ProfitRate: '',
        });
    }

    componentDidMount() {
        const data = this.props.data;
        if (!data) {
            return;
        }
        this.setState({
            lv0Profit: this.getProfit(data.lv0ProfitRate),
            lv1Profit: this.getProfit(data.lv1ProfitRate),
            lv2Profit: this.getProfit(data.lv2ProfitRate),
        });
    }

    // 计算分润
    getProfit = (val) => {
        if (this.props.profit == null) return '';
        return '(' + moneyFormat(this.props.profit * (val / 100)) + '元)';
    }

    render() {

        const {getFieldDecorator} = this.props.form;

        const {imgState} = this.props;

        let lv0ProfitRateProps,
            lv1ProfitRateProps,
            lv2ProfitRateProps;

        const levelProps = getFieldDecorator('level', {
            initialValue: '0',
            onChange: this.handelLevelSelect
        });


        if (imgState >= 0) {
            lv0ProfitRateProps = getFieldDecorator('lv0ProfitRate', {
                rules: [
                    {required: true, message: '必填项', type: 'number'},
                ],
                onKeyDown: (val) => {
                    this.props.handelProfit({
                        lv0: val
                    });
                    this.setState({
                        lv0Profit: this.getProfit(val)
                    });
                }
            });
        }

        if (imgState >= 1) {
            lv1ProfitRateProps = getFieldDecorator('lv1ProfitRate', {
                rules: [
                    {required: true, message: '必填项', type: 'number'},
                ],
                onKeyDown: (val) => {
                    this.props.handelProfit({
                        lv1: val
                    });
                    this.setState({
                        lv1Profit: this.getProfit(val)
                    });
                }
            });
        }

        if (imgState >= 2) {
            lv2ProfitRateProps = getFieldDecorator('lv2ProfitRate', {
                rules: [
                    {required: true, message: '必填项', type: 'number'},
                ],
                onKeyDown: (val) => {
                    this.props.handelProfit({
                        lv2: val
                    });
                    this.setState({
                        lv2Profit: this.getProfit(val)
                    });
                }
            });
        }

        const formItemLayout = {
            labelCol: {span: 9},
            wrapperCol: {span: 13},
        };

        return (
            <div>
                <FormItem
                    {...formItemLayout}
                    label="选择代言等级">
                    {levelProps(
                        <Select
                            disabled={this.props.disabled}
                            placeholder="请选择颜色"
                            style={{width: '150px'}}>
                            <Option value="0">首席代言</Option>
                            <Option value="1">钻石代言(一级)</Option>
                            <Option value="2">金牌代言(二级)</Option>
                        </Select>
                    )}
                </FormItem>
                {imgState >= 0 &&
                <FormItem
                    {...formItemLayout}
                    label="首席代言利润提成">
                    {lv0ProfitRateProps(
                        <InputNumber
                            min={0}
                            step={0.001}
                            placeholder="利润提成"/>
                    )}
                    <span className="ant-input-group-addon">%</span>
                    {this.props.disabled &&
                    <span className="tker-fenrun-setting-profit">{this.state.lv0Profit}</span>
                    }
                </FormItem>
                }

                {imgState >= 1 &&
                <FormItem
                    {...formItemLayout}
                    label="钻石代言利润提成">
                    {lv1ProfitRateProps(
                        <InputNumber
                            min={0}
                            step={0.001}
                            placeholder="利润提成"/>
                    )}
                    <span className="ant-input-group-addon">%</span>
                    {this.props.disabled &&
                    <span className="tker-fenrun-setting-profit">{this.state.lv1Profit}</span>
                    }
                </FormItem>
                }

                {imgState >= 2 &&
                <FormItem
                    {...formItemLayout}
                    label="金牌代言利润提成">
                    {lv2ProfitRateProps(
                        <InputNumber
                            min={0}
                            step={0.001}
                            placeholder="利润提成"/>
                    )}
                    <span className="ant-input-group-addon">%</span>
                    {this.props.disabled &&
                    <span className="tker-fenrun-setting-profit">{this.state.lv2Profit}</span>
                    }
                </FormItem>
                }
            </div>
        );
    }
}

export default Form.create({
    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function (props) {
        let {data} = props;

        if (!data) {
            return;
        }
        return {
            level: {
                value: data.level.toString()
            },
            lv0ProfitRate: {
                value: data.lv0ProfitRate,
            },
            lv1ProfitRate: {
                value: data.lv1ProfitRate,
            },
            lv2ProfitRate: {
                value: data.lv2ProfitRate,
            },
        };
    },
})(TkerFenRunSetting);

