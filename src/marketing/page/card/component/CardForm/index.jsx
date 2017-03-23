import React, {Component} from 'react';
import {
	Button,
	Input,
	Form,
	Card,
    Upload,
    Radio,
    Icon,
    message,
} from 'antd';
import * as media from 'common/util/media';
import './index.less';
import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;



export class CardForm extends Component {

    constructor(props) {
        super(props);
    }

    handelSubmit = () => {
        this.props.form.validateFields((errors, values) => {

            if (errors) {
                return;
            }
            const { cardStyle } = this.props;

            let data = {
                bgRadio: values.bgRadio,
                bgColor: cardStyle.bgColor,
                bgImg:this.props.cardStyle.bgImg,
                alpha: cardStyle.alpha,
                title: values.title,
                fontColor: cardStyle.fontColor,
            };

            if (values.bgRadio == 'img') {
                if (this.props.cardStyle.bgImg == '') {
                    alert('请上传会员背景图片！');
                    return false;
                }
            }

            this.props.updateCardStyle(data);
        });
    }

    render() {
        return (
            <Card
                title="基本信息"
                className="card-form">
                <CardFormContainer
                    setCardStyle={this.props.setCardStyle}
                    cardStyle={this.props.cardStyle}
                    handelSubmit={this.handelSubmit}
                    form={this.props.form}/>
            </Card>
        );
    }
}

export class CardFormContainer extends Component {

    state = {
        colorShow: 'none',
        imgShow: 'block',
        value: 'img',
    }

    colorsSelect = () => {
        document.getElementById('foo').jscolor.show();
    }

    // 颜色选择器改变
    handlerChangeColor = (colors) => {
        this.props.setCardStyle({
            bgColor: colors.color,
            alpha: colors.alpha,
        });
    }

    handlerChangefontColor = (colors) => {
        this.props.setCardStyle({
            fontColor: colors.color,
        });
    }

    // upload 改变时处理函数
    updateChange = (info) => {
        if (info.file.status === 'done') {
            if (info.file.response.errCode === 0) {
                this.props.setCardStyle({
                    bgImg: info.file.response.data
                });
                updateInfo();
            }
        }
    }

    radioChange = (e) => {
        this.props.setCardStyle({
            bgRadio: e.target.value,
        });
    }

    checkText = (rule, value, callback) => {
        if (value.length > 15) {
            callback([new Error('标题不得超过15个字符')]);
        } else {
            callback();
        }
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        const { setCardStyle, cardStyle } = this.props;

        const bgRadioProps = getFieldDecorator('bgRadio', {
            initialValue: 'img',
            onChange: this.radioChange,
        });

        const titleProps = getFieldDecorator('title', {
            rules: [
                { required: true, message: '标题不得为空！'},
                {
                    validator: this.checkText
                }
            ],
            onChange(e){
                let val = e.target.value;
                setCardStyle({
                    title: val,
                });
            },
        });

        const bgImgProps = getFieldDecorator('bgImg', {
            onChange: this.updateChange,
        });

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 },
        };

        const uploadProps = {
            name: 'media',
            showUploadList: false,
            withCredentials: true,
            action: media.addMedia({
                owner: 'platform',
                restype: 'res',
            }),
        };

        return (
            <Form layout="horizontal" >
                <FormItem
                    label="卡券标题"
                    help="标题长度为15个字"
                    {...formItemLayout}>

                    {titleProps(
                        <Input
                            placeholder="会员卡"/>
                    )}

                </FormItem>
                <FormItem
                    label="字体颜色"
                    {...formItemLayout}>
                    <ColorPicker
                          animation="slide-up"
                          placement="bottomLeft"
                          color={cardStyle.fontColor}
                          onChange={this.handlerChangefontColor}/>
                </FormItem>
                <FormItem
                    label="卡券底图"
                    {...formItemLayout}>

                    {bgRadioProps(
                        <RadioGroup>
                            <Radio value="img">图片</Radio>
                            <Radio value="color">颜色</Radio>
                        </RadioGroup>
                    )}

                </FormItem>

                <div className="card-form-radiobox">
                        { cardStyle.bgRadio == 'img' &&
                            <FormItem
                                wrapperCol={{ span: 18, offset: 4 }}>

                                {bgImgProps(
                                    <Upload
                                        {...uploadProps}>
                                        <Button type="ghost">
                                          <Icon type="upload"/> 点击上传
                                        </Button>
                                        <span>
                                            &nbsp;&nbsp;
                                            <Icon type="info-circle-o" />
                                            请上传580px * 310px的背景图片
                                        </span>
                                    </Upload>
                                )}
                            </FormItem>
                        }
                        { cardStyle.bgRadio == 'color' &&
                            <FormItem
                                wrapperCol={{ span: 8, offset: 4 }}>
                                <ColorPicker
                                      animation="slide-up"
                                      placement="bottomLeft"
                                      color={cardStyle.bgColor}
                                      alpha={cardStyle.alpha}
                                      onChange={this.handlerChangeColor}/>
                            </FormItem>
                        }
                </div>
                <FormItem
                    wrapperCol={{ span: 8, offset: 4 }}>
                    <Button htmlType="submit" onClick={this.props.handelSubmit} type="primary">保存</Button>
                </FormItem>
            </Form>
        );
    }
}

// cardStyle
export default Form.create({

    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function (props) {

        let { cardStyle } = props;

        let bgRadio;

        if (!cardStyle.bgRadio) {
            bgRadio = 'img';
        } else {
            bgRadio = cardStyle.bgRadio;
        }

        if (cardStyle) {
            return {
                title: {
                    value: cardStyle.title
                },
                bgRadio: {
                    value: bgRadio
                }
            };
        } else {
            return {};
        }
    },
})(CardForm);

// 上传图片成功！
const updateInfo = function () {
    message.info('上传图片成功!');
};
