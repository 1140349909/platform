import React, {Component} from 'react';
import {message, Form, Slider, Row, Col} from 'antd';
import * as apiLedou from '../../api/ledou';
import {RES_TYPE, RIGHT_UNIT} from '../../config/constants';
import showModal from 'common/component/showModal';
const FormItem = Form.Item;
import {getUpgradeUrl, getChargeUrl} from 'common/util/url';
import {redirect} from 'common/util';
import './purchaseServices.less';

let purchaseServicesModal = null;
export default function purchaseServices({right, usedValue, canUpgraded = true}) {
    return new Promise((resolve, reject) => {
        // 获取乐豆余额
        apiLedou.getLedouAmount().then(({data}) => {

            const amount = data;

            let total = parseInt(right.minBuyQuantity);

            let onChange = (val) => {
                total = val;
            };

            purchaseServicesModal = showModal({
                title: '购买' + right.name,
                content: (<PurchaseServicesForm
                    canUpgraded={canUpgraded}
                    right={right}
                    usedValue={usedValue}
                    amount={amount}
                    onChange={onChange}
                    total={total}
                />),
                cancelText: '返回',
                okText: '确定',
                // footer: '',
                onCancel: () => {
                    reject();
                },
                onOk: () => {

                    const ledou = right.price * total;

                    // 余额小于乐豆数额
                    if (total <= 0) {
                        message.error('请选择本次购买的数量!');
                        return true;
                    }

                    // 余额小于乐豆数额
                    if (amount < ledou) {
                        message.error('余额不足,请先充值!');
                        return true;
                    }

                    return new Promise((resolveConfirm) => {
                        apiLedou.tradeLedou(RES_TYPE.SERVICES, {
                            ledou,
                            productDesc: {
                                resType: RES_TYPE.SERVICES,
                                pid: right.ruleId,
                                name: right.name,
                                desc: right.desc,
                                price: right.price,
                                total: total,
                                rightsMark: right.mark
                            }
                        }).then(() => {
                            message.success('购买成功!');
                            resolve();
                            resolveConfirm();
                        }).catch(() => {
                            message.error('购买失败!');
                            reject();
                            resolveConfirm();
                        });
                    });
                }
            });

        });
    });
}


class PurchaseServicesForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            total: props.total
        };
    }


    handleChange = (total) => {
        this.setState({
            total
        }, () => this.props.onChange(total));
    }

    upgrade = () => {
        this.redirect(getUpgradeUrl());
    }

    charge = () => {
        this.redirect(getChargeUrl());
    }

    redirect = (href) => {
        redirect(href);
        purchaseServicesModal.destroy();
    }

    render() {

        // usedValue = 已经使用的数量
        let {right, usedValue, amount, canUpgraded} = this.props;

        let {total} = this.state;

        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16},
        };

        let maxValue = (right.maxValue - right.value);

        maxValue = maxValue - (maxValue % right.minBuyQuantity);

        const unitText = RIGHT_UNIT[right.unit];

        // 是否可用购买
        const enablePurchase = maxValue > right.minBuyQuantity;

        return (
            <Form layout="horizontal">
                {(!enablePurchase && !canUpgraded) &&
                <div className="purchase-services-empty">您已经使用数量<span
                    className="text-enabled">{usedValue}</span>{unitText}，已达到最大等级。
                </div>
                }

                {(!enablePurchase && canUpgraded) &&
                <div className="purchase-services-empty">您已经使用数量<span
                    className="text-enabled">{usedValue}</span>{unitText}，如要购买更多数量，请<a
                    onClick={this.upgrade}>升级账号</a>。
                </div>
                }

                {enablePurchase &&
                <div>
                    <FormItem
                        {...formItemLayout}
                        label="已经使用数量">
                        {usedValue}（{unitText}），还可购买数量：{maxValue}（{unitText}）
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="本次购买数量"
                        help={total == maxValue && canUpgraded ? (
                            <span>购买更多数量，<a onClick={this.upgrade}>可升级账号</a></span>) : null}
                        hasFeedback>
                        <Row>
                            <Col span={12}>
                                <Slider min={0}
                                        max={maxValue}
                                        step={right.minBuyQuantity}
                                        onChange={this.handleChange}
                                        value={total}/>
                            </Col>
                            <Col span={4}><span className="purchase-services-out">{total}（{unitText}）</span></Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="本次交易需支付">
                        <div>
                            <p>{total * right.price}乐豆</p>
                        </div>
                    </FormItem>
                    <FormItem{...formItemLayout}
                             label="账户余额">
                        <div>
                            {amount}乐豆
                            {amount < total * right.price ?
                                <span className="purchase-services-out"><span className="color-err">余额不足</span>，<a
                                    onClick={this.charge}>请充值</a></span> : null}
                        </div>
                    </FormItem>
                </div>
                }
                {/*<div className="ant-modal-footer">*/}
                {/*<Button type="ghost" size="large">返 回</Button> <Button type="primary" size="large">确 定</Button>*/}
                {/*</div>*/}
            </Form>
        );
    }
}
