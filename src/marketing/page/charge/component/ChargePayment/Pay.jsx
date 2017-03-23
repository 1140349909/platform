import React, {Component}from 'react';
import SelectCard from 'common/component/SelectCard';
import classnames from 'classnames';
import IconFont from 'common/component/IconFont';
import _ from 'lodash';
import  './index.less';

class Pay extends Component{

    constructor(props) {
        super(props);
        this.imgId = 'code';
    }

    state = {
        payType: null,
    };

    componentWillMount() {
        if (this.props.defaultSelect && !this.state.payType) {
            this.setState({
                payType: this.props.defaultSelect,
            });
        }
    }

    componentDidMount() {
        // StackBlur
    }

    // 支付方式选择处理
    _handelChange = (payType) => {
        this.props.onChange && this.props.onChange(payType);
        this.setState({
            payType,
        });
    }

    render() {
        let paySelectCard = [];
        let classString = classnames({
            ['charge-payment-pay']: true,
        });

        // 支付方式列表
        _.map(this.props.list, (item, index) => {

            let isActive = this.state.payType == item.type;

            let classActiveString = classnames({
                ['charge-payment-pay-icon']: true,
                ['charge-payment-active']: isActive,
                ['charge-payment-active2']: isActive && this.state.payType == 'wechatqrcode',
            });

            let _html = (
                <div className="charge-payment-item"
                     onClick={() => this._handelChange(item.type)}
                     key={index}>

                    <SelectCard
                        className="charge-payment-pay-selectcard"
                        active={isActive}>

                        <IconFont
                            className={classActiveString}
                            type={item.icon}/>

                        {item.text}
                    </SelectCard>
                </div>
            );

            paySelectCard.push(_html);
        });

        return (
        <div className={classString}>
            <div className="charge-payment-group">
                <div className="charge-payment-group-l charge-payment-group-pay">
                    支付方式
                </div>
                <div className="charge-payment-group-r">
                    {paySelectCard}
                </div>
            </div>
        </div>
        );
    }
}

Pay.defaultProps = {
    list: [
        {
            icon: 'weixin1',
            type: 'wechatqrcode',
            text: '微信扫码支付',
        },
        {
            icon: 'zhifubao1',
            type: 'alipayweb',
            text: '支付宝支付',
        },
    ]
};

export default Pay;
