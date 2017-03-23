import React, {Component}from 'react';
import SelectCard from 'common/component/SelectCard';
import {moneyFormat} from 'common/util';
import classnames from 'classnames';
import {getLedou} from 'common/util/ledou';
import _ from 'lodash';
import  './index.less';

class TopUp extends Component{

    constructor(props) {
        super(props);
    }

    state = {
        money: null,
    };

    componentWillMount() {
        if (this.props.defaultSelect && !this.state.money) {
            this.setState({
                money: this.props.defaultSelect,
            });
        }
    }

    // 支付方式选择处理
    handelChange = (money) => {
        this.props.onChange && this.props.onChange(money);
        this.setState({
            money,
        });
    }


    // 渲染列表
    renderTopUpList = () => {

        let TopUpList = [];

        // 充值金额列表
        _.map(this.props.list, (item, index) => {
            const type = this.props.type;
            const symbol = type === 'upgrade' ? (<span className="charge-payment-min">/年</span>) : '';
            const describe = type === 'upgrade' ? '标准版' : getLedou(item.money) + '乐豆';

            let isActive = this.state.money == item.money;
            let classActiveString = classnames({
                ['charge-payment-topup-h3']: true,
                ['charge-payment-active']: isActive,
            });

            TopUpList.push(
                <div className="charge-payment-item"
                     onClick={() => this.handelChange(item.money)}
                     key={index}>

                    <SelectCard
                        className="charge-payment-topup-selectcard"
                        active={isActive}>

                        <h3 className={classActiveString}>
                            <span className="charge-payment-topup-symbol">￥</span>
                            {moneyFormat(item.money)}{symbol}
                        </h3>

                        <p className="charge-payment-topup-p">
                            {describe}
                        </p>
                    </SelectCard>
                </div>
            );

        });

        return TopUpList;
    }


    // 渲染标题
    renderTitle = () => {
        const type = this.props.type;
        let text;

        switch (type) {
            case 'ledou':
                text = '充值金额';
                break;

            case  'upgrade':
                text = '购买版本';
                break;
        }
        return text;
    }

    render() {

        return (
            <div className="charge-payment-topup">
                <div className="charge-payment-group">
                    <div className="charge-payment-group-l charge-payment-group-topup">
                        {this.renderTitle()}
                    </div>
                    <div className="charge-payment-group-r">
                        {this.renderTopUpList()}
                    </div>
                </div>
            </div>
        );
    }
}

TopUp.defaultProps = {

    type: 'ledou',

    title: '充值金额',

    list: [
        {
            money: 5000,
        },
        {
            money: 10000,
        },
        {
            money: 30000,
        },
        {
            money: 50000,
        },
    ]
};

export default TopUp;




