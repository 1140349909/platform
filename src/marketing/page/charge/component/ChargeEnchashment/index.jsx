import React, {Component} from 'react';
import {Card,Row,Col,Form,Button,Modal,InputNumber} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {moneyFormat} from 'common/util';
import {withRouter} from 'react-router';
import _ from  'lodash';
import './index.less';
import * as merchantAction from  '../../../../store/merchant/action';
import * as ledouConfigActions from '../../../../store/ledouConfig/action';

const FormItem = Form.Item;

@connect(
    state => ({
        operation: state.operation,
        ledouConfig:state.ledouConfig.toJS(),
        merchant:state.merchant.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...merchantAction,
            ...ledouConfigActions
        }, dispatch)
    })
)
@withRouter
class ChargeEnchashment extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        configAccount:{},
        alipayRule:{},
        sumProfit:0
    };

    // 真实的DOM被渲染出来后调用。
    componentDidMount() {
        this.getConfigAccountWithdraw();
        this.getMerchantAccount();
    }

    // 组件接收到新的props时调用，并将其作为参数nextProps使用，此时可以更改组件props及state

    componentWillReceiveProps(nextProps) {
        let _this =this;
        const {operation} = nextProps;
        switch (operation.type) {
            case merchantAction.ADD_MERCHANT_WITHDRAW_SUCCESS:
                Modal.success({
                    title: '',
                    content: '提现申请已经成功',
                    onOk: () => {
                        _this.props.router.push('profit/summary');
                    },
                });
                break;
            case merchantAction.ADD_MERCHANT_WITHDRAW_FAILURE:
                Modal.error({
                    title: '',
                    content: '提现申请失败，请重新尝试提现',
                    onOk: () => {
                        _this.getConfigAccountWithdraw();
                    },
                });
                break;
            case ledouConfigActions.GET_CONFIG_ACCOUNT_WITHDRAW_SUCCESS:
                this.setState({
                    configAccount:nextProps.ledouConfig.configAccount
                });
                this.getWithdrawRuleList({
                    page:0
                });
                break;
            case merchantAction.GET_WITHDRAW_RULE_LIST_SUCCESS:
                _.forEach(nextProps.merchant.ruleList.content,function (value) {
                    if(value.ruleId=='WITHDRAW_ALIPAY'){
                        _this.setState({
                            alipayRule:value
                        });
                    }
                });
                break;
            case merchantAction.GET_MERCHANT_ACCOUNT_SUCCESS:
                if(_.has(nextProps.merchant.money,'opdata')){
                    this.setState({
                        sumProfit:nextProps.merchant.money.opdata.uinAccountData.platformMoney,
                    });
                }
                break;
        }
    }
    /*ACTION*/
    addMerchantWithdraw = (data) => {
        this.props.actions.addMerchantWithdraw(data);
    };

    getConfigAccountWithdraw = (params) => {
        this.props.actions.getConfigAccountWithdraw(params);
    };
    getWithdrawRuleList=(params)=>{
        this.props.actions.getWithdrawRuleList(params);
    };
    getMerchantAccount=()=>{
        this.props.actions.getMerchantAccount();
    };

    /*HANDLE*/
    goBackPage=()=>{
        this.props.router.goBack();
    };
    goResetSetting = () => {
        this.props.router.push('profit/setting');
    };

    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((error, values) => {
            if(error){
                return;
            }else{
                this.confirmSubmit(values);
            }
        });
    };

    confirmSubmit=(values)=>{
        const configAccount = this.state.configAccount;
        let _this = this;
        const content = <div>
            <Row className='enchashment-confirm-tip'>
                请您认真核对提现金额及提现账户,以免造成提现失败甚至金额损失。
            </Row>
            <Row className='enchashment-confirm-row'>
                <Col span={6}>
                    提现金额
                </Col>
                <Col span={18} style={{ color:'#f88600'}}>
                    ¥{values.money}
                </Col>
            </Row>
            <Row className='enchashment-confirm-row'>
                <Col span={6}>
                    真实姓名
                </Col>
                <Col span={18} style={{ color:'#f88600'}}>
                    {this.formatName(configAccount.aliPay.name)}
                </Col>
            </Row>
            <Row className='enchashment-confirm-row'>
                <Col span={6}>
                    支付宝账号
                </Col>
                <Col span={18}>
                    {this.formatAccount(configAccount.aliPay.account)}
                </Col>
            </Row>
        </div>;
        Modal.confirm({
            iconType: 'exclamation-circle',
            width: 600,
            title: '确认提现消息',
            content: content,
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                let params ={
                    money: values.money*100,
                    accountType: 'alipay'
                };
                _this.addMerchantWithdraw(params);
            },
            onCancel: () => {

            }
        });
    };


    formatName =(str)=>{
        if(str.length>=3){
            let  star= '';
            for(let i =0;i<str.length-2;i++){
                star+='*';
            }
            str= str.substring(0,1)+''+star+str.substring(str.length-1,str.length);

        }else{
            str = str.substring(0,1)+'*';
        }
        return str;
    };
    formatAccount=(str)=>{
        if(/\@/g.test(str)){
            let arr = [];
            arr = str.split('');
            let index = arr.indexOf('@');
            arr[index-3]='*';
            arr[index-2]='*';
            str = arr.join('');
        }else{
            str= str.replace(/(\d{3})\d{5}(\d{3})/, '$1****$2');
        }
        return str;
    };

    //正则匹配
    moneyValidator = (rule, value, callback)=> {
        const alipayRule =  this.state.alipayRule ;
        const minValue =_.isEmpty(alipayRule)?0:alipayRule.userRule.minTake;
        const MaxValue = _.isEmpty(alipayRule)?0:alipayRule.userRule.userOnceMaxTake;
        const minTake = _.isEmpty(alipayRule)?0:moneyFormat(alipayRule.userRule.minTake, null, 2);
        const userOnceMaxTake = _.isEmpty(alipayRule)?0:moneyFormat(alipayRule.userRule.userOnceMaxTake, null, 2);
        if (!value || value==0) {
            callback([new Error('请输入正确的提现金额')]);
        } else {
            const regexp = /^[0-9]+(.[0-9]{0,2})?$/g;
            if (regexp.test(value)) {
                if(value<minValue/100 || value>MaxValue/100){
                    callback([new Error(`单次提现金额下限为${minTake}，上限为${userOnceMaxTake}`)]);
                }else{
                    if(value>this.state.sumProfit){
                        callback([new Error('已超出可提现金额')]);
                    }else{
                        callback();
                    }
                }

            } else {
                callback([new Error('提现金额最多支持两位小数')]);
            }
        }
    };

    render() {
        const title = (
            <h3 className='ant-card-head-title'>
                提现
            </h3>
        );
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18}
        };
        const configAccount = this.state.configAccount;

        const alipayRule =  this.state.alipayRule ;
        const minValue =_.isEmpty(alipayRule)?0:alipayRule.userRule.minTake;
        //const MaxValue = _.isEmpty(alipayRule)?0:alipayRule.userRule.userOnceMaxTake;
        const minTake = _.isEmpty(alipayRule)?0:moneyFormat(alipayRule.userRule.minTake, null, 2);
        const userOnceMaxTake = _.isEmpty(alipayRule)?0:moneyFormat(alipayRule.userRule.userOnceMaxTake, null, 2);



        if(_.isEmpty(configAccount)){
            return <div></div>;
        }else{
            return (
                <div className='enchashment'>
                    <Card title={title}
                          className='enchashment-card'
                          bodyStyle={{paddingTop:'32px', paddingBottom: '35px'}}>
                        <div className="enchashment-tip">
                            1、提现金额只能提现至绑定的的支付宝账户；<br/>
                            2、支付宝方式提现实时到账；<br/>
                            3、单次提现金额下限为{minTake}元，上限为{userOnceMaxTake}元。<br/>
                        </div>
                        <Form style={{width:'340px'}} className='enchashment-form' onSubmit={this.handleSubmit}>
                            <Row>
                                <Col span={6} className='enchashment-form-left'>
                                    可提现金额：
                                </Col>
                                <Col offset={1} span={17} className='enchashment-form-right'>
                                    ¥{moneyFormat(this.state.sumProfit, null, 2)}
                                </Col>
                            </Row>
                            <FormItem
                                label='提现金额'
                                {...formItemLayout}>
                                {getFieldDecorator('money', {
                                    initialValue:minValue/100,
                                    rules: [
                                        {
                                            required:true,
                                            message:'请输入提现金额',
                                        },{
                                            type:'number',
                                            message:'请输入数字',
                                        }, {
                                            validator: this.moneyValidator
                                        }
                                    ]
                                })(
                                   <InputNumber style={{width: 120}} />
                                )}(元)
                            </FormItem>
                            <Row className='enchashment-form-left'>
                                <Col span={6}>
                                    真实姓名：
                                </Col>
                                <Col offset={1} span={17} className='enchashment-form-right'>
                                    {this.formatName(configAccount.aliPay.name)}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6} className='enchashment-form-left' >
                                    支付宝账号：
                                </Col>
                                <Col offset={1} span={17}>
                                    {this.formatAccount(configAccount.aliPay.account)}
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={6} span={17} className='enchashment-payment-reset'>
                                    若要修改支付宝账号，请<a onClick={this.goResetSetting}>重新设置</a>
                                </Col>
                            </Row>
                            <FormItem className='enchashment-action' style={{marginBottom:'0'}}>
                                <Button type='ghost' size='large' onClick={this.goBackPage}>返回</Button>
                                <Button type='primary' size='large'  htmlType="submit">立即提现</Button>
                            </FormItem>
                        </Form>

                    </Card>
                </div>
            );
        }

    }
}

export default Form.create({
    /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
    mapPropsToFields: function () {
        return {};
    },
    onFieldsChange: function () {
    }
})(ChargeEnchashment);
