import React from 'react';
import PageBase from 'common/base/PageBase';
import {Card} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as couponAction from '../../store/coupon/action';
import CouponForm from './component/CouponForm';
// import DatePickerGroup from 'common/component/DatePickerGroup';


@connect(
    state => ({
        coupon: state.coupon.toJS(),
        operation: state.operation,
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...couponAction
        }, dispatch)
    })
)

@withRouter

export default class CouponAdd extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        faceValueList: []
    };

    componentDidMount() {
        //优惠券面值列表
        this.props.actions.getCouponFaceValueList();

    }

    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        if (operation.type == couponAction.ADD_COUPON_SUCCESS) {
            this.jumpBack();
        }
    }

    //新建优惠券
    save = (data) => {
        this.props.actions.addCoupon(data);
    };

    jumpBack = () => {
        if (this.props.location.query.loop) {
            window.close();
        } else {
            this.props.router.push('/coupon');
        }
    };

    render() {

        // const TabPane = Tabs.TabPane;

        const couponData = {

            faceValue: 0,
            discount: 9.9,

            name: '',

            couponType: 'quota',


            periodType: 'interval',
            intervalStartDate: '20xx-xx-xx',
            intervalEndDate: '20xx-xx-xx',
            /*intervalStartDate:dateFormat(new Date(), 'yyyy-MM-dd'),
             intervalEndDate:dateFormat(new Date(), 'yyyy-MM-dd'),*/
            dynamicBegin: 0,
            dynamicEnd: 1,

            chargeEnable: false,
            chargeMin: 0
        };


        return (
            <div className="app-page" style={{'height': '100%'}}>
                <Card title="优惠券设置" style={{'height': '100%', 'overflowY': 'scroll'}}>
                    <CouponForm save={this.save}
                                list={this.props.coupon.faceValueList}
                                couponData={couponData}
                                jumpBack={this.jumpBack}>
                    </CouponForm>
                </Card>
            </div>
        );
    }
}
