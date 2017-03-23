import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as commonCouponAction from 'common/store/coupon/action';
import * as commonIntegralAction from 'common/store/integral/action';
import {getMediaUrl} from 'common/util/media';
import {autoSizePic} from 'common/util';
import Img from 'common/component/Img';
import _ from 'lodash';
import './index.less';

const DEFAULT_ICON_MEDIAURLS = {
    top: require('./img/packets-top.png'),
    bottom: require('./img/packets-bottom.png'),
    fixed: require('./img/packets-fixed.png')
};

const POSITION_NAME = {
    top: '置顶',
    bottom: '置底',
    fixed: '悬浮'
};


@connect(
    state => ({
        operation: state.operation,
        commonCoupon: state.commonCoupon.toJS(),
        commonIntegral: state.commonIntegral.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            getCoupon: commonCouponAction.getCoupon,
            getIntegral: commonIntegralAction.getIntegral
        }, dispatch)
    })
)
export default class PacketResult extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        packetName: '',
        packetTypeName: ''
    };

    componentDidMount() {
        this.getPacketInfo();
    }

    // 根据返回的nextProps.product.status处理回调
    componentWillReceiveProps(nextProps) {

        const {operation, commonCoupon, commonIntegral} = nextProps;
        switch (operation.type) {
            case commonCouponAction.GET_COUPON_SUCCESS:
                this.setState({
                    packetName: commonCoupon.item.name
                });
                break;
            case commonIntegralAction.GET_INTEGRAL_SUCCESS:
                this.setState({
                    packetName: commonIntegral.item.name
                });
                break;
        }
    }

    // 更新红包
    componentDidUpdate(prevProps) {
        // 路由切换后初始化数据
        if (!_.isEqual(this.props.data, prevProps.data)) {
            this.getPacketInfo();
        }
    }

    getPacketInfo() {
        const {couponId, integralId} = this.props.data;
        const {channelPacket} = this.props;
        if (channelPacket) {
            this.setState({
                packetName: channelPacket.name,
            });
            return;
        }

        if (couponId) {
            this.props.actions.getCoupon(couponId);
        } else if (integralId) {
            this.props.actions.getIntegral(integralId);
        }
    }

    handleImgLoad = (event)=> {
        autoSizePic(event.currentTarget, 54, 44);
    }

    render() {

        const {data, onEdit, onDel, channelPacket} = this.props;

        const {couponId, integralId, style = {}} = data;

        if (!couponId && !integralId && !channelPacket) {
            return null;
        }

        let packetTypeName = '';
        if (couponId || channelPacket) {
            packetTypeName = '优惠券';
        } else if (integralId) {
            packetTypeName = '积分包';
        }

        let iconMediaUrl;
        if (style.iconMediaId) {
            iconMediaUrl = getMediaUrl(style.iconMediaId);
        } else {
            iconMediaUrl = DEFAULT_ICON_MEDIAURLS[style.position];
        }

        const positionName = POSITION_NAME[style.position];

        return (<div id="editor-packet-result" className="editor-packet-result">
            <div className="editor-packet-result-info">
                <div className="editor-packet-result-info-i">
                    <h6>红包名称：{this.state.packetName} ({packetTypeName})</h6>
                    <p>显示方式：{positionName}</p>
                </div>
            </div>
            <figure>
                <Img onLoad={ this.handleImgLoad} src={iconMediaUrl}/>
            </figure>
            <aside>
                <a href="javascript:;" onClick={onEdit}>编辑</a>
                <a href="javascript:;" onClick={onDel}>删除</a>
            </aside>
        </div>);
    }
}

