import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PageBase from 'common/base/PageBase';
import {message} from 'antd';
import CardForm from './component/CardForm';
import CardStyle from './component/CardStyle';
import './index.less';
import * as customerAction from '../../store/customer/action';
@connect(
    state => ({
        customer: state.customer.toJS(),
        operation: state.operation,
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...customerAction
        }, dispatch)
    })
)
export default class CardIndex extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {

        // 客户信息
        users: {},

        // 当前客户会员卡样式样式(默认)
        cardStyle: {
            bgColor: '#fff',
            alpha: 100,
            bgImg: '579856eb0f93d566a79bd714',
            fontColor: '#fff',
            bgRadio: 'img',
            title: '卡券标题',
        },
    };

    componentDidMount() {
        // 获取客户信息
        this.props.actions.getAdminCustomer();
    }

    componentWillReceiveProps(nextProps) {

        // console.log(nextProps);

        const {operation} = nextProps;

        switch (operation.type) {

            // 设置会员卡样式
            case customerAction.UPDATE_CARD_STYLE_SUCCESS:
                message.info('保存成功!');
                // saveInfo(nextProps.customer.cardStyle);
                break;

            // 获取客户信息
            case customerAction.GET_ADMIN_CUSTOMER_SUCCESS:
                this.setState({
                    users: nextProps.customer.customerInfo,
                });
                // 获取客户会员卡样式
                this.props.actions.getCardStyle(nextProps.customer.customerInfo.id);
                break;

            // 获取会员卡信息
            case customerAction.GET_CARD_STYLE_SUCCESS:
                if (nextProps.customer.cardStyle) {
                    let nextData = nextProps.customer.cardStyle;
                    let data = {
                        ...nextData.style,
                        ...nextData,
                    };

                    delete data.style;

                    this.setState({
                        cardStyle: data,
                    });
                }
                break;

        }
    }


    // 提交会员卡样式
    updateCardStyle = (para) => {
        let data = {
            title: para.title,
            style: para,
        };
        delete data.style.title;
        this.props.actions.updateCardStyle(this.state.users.id, data);
    };

    // 修复会员卡样式
    setCardStyle = (para) => {
        let data = {
            ...this.state.cardStyle,
            ...para,
        };

        this.setState({
            cardStyle: data,
        });
    };


    render() {

        return (
            <div className="app-page">
                <div className="card">
                    <div className="card-cardstyle">
                        <CardStyle
                            cardStyle={this.state.cardStyle}/>
                    </div>

                    <div className="card-cardform">
                        <CardForm
                            cardStyle={this.state.cardStyle}
                            setCardStyle={this.setCardStyle}
                            updateCardStyle={this.updateCardStyle}/>
                    </div>
                </div>
            </div>
        );
    }
}
