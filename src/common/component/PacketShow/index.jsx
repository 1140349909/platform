import React, {Component} from 'react';
import {Modal, Steps, Button, message} from 'antd';
import classname from 'classnames';
import List from './List';
import StyleList from './StyleList';
import _ from 'lodash';
import './index.less';

const Step = Steps.Step;

class PacketShow extends Component {

    constructor(props) {
        super(props);
        // 默认渠道
        this.defaultChannelType = 'youzan';
    }

    state = {

        // 步数
        step: 0,

        // 红包类型
        type: 'coupon',

        // 选择红包Id
        id: '',

        // 红包显示方式
        position: 'top',

        // 渠道
        channel: '',

        item: '',

        // 红包样式图片id
        iconMediaId: '',

        url: '',
    };

    componentWillMount() {

        let type = 'coupon';
        let id = '';
        const {data, channelPacket} = this.props;

        this.setState({
            step: 0,
        });

        if (data && !_.isEmpty(data)) {

            if (data.couponId || data.integralId) {
                type = data.couponId ? 'coupon' : 'integral';
            }

            if (channelPacket) {
                id = channelPacket.pid;
                this.defaultChannelType = 'youzan';
            } else {
                id = data.couponId ? data.couponId : data.integralId;
                this.defaultChannelType = 'iloka';
            }

            this.setState({
                type,
                id,
                position: _.has(data, 'style.position') ? data.style.position : 'top',
                iconMediaId: _.has(data, 'style.iconMediaId') ? data.style.iconMediaId : '',
            });
        } else {
            this.setState({
                type,
            });
        }
    }

    // 选择红包类型
    packetSelect = (type) => {

        if (this.state.type == type) {
            return;
        }

        this.setState({
            type,
            id: '',
        });

        if (this.props.packetType) {
            this.props.packetType(type);
        }
    };

    // 显示方式选取
    positionSelect = (position) => {

        if (this.state.position == position) {
            return;
        }

        this.setState({
            position,
        });

        if (this.props.position) {
            this.props.position(position);
        }
    };

    // 红包样式选取
    iconMediaIdSelect = (iconMediaId) => {
        this.setState({
            iconMediaId
        });
    };

    // 选择红包回调
    idSelected = (id, item, channel) => {
        let params = {};
        if (channel === 'youzan') {
            params.url = item.fetch_url;
        }
        params.id = id;
        this.setState({
            channel,
            item,
            ...params
        });
    };

    // 底部左侧按钮
    onLeftBtn = () => {
        if (this.state.step == 0 || this.props.typeShow === 'h5') {
            this.props.reset();
        } else {
            this.setState({
                step: this.state.step - 1,
            });
        }
    };

    // 底部右侧按钮
    onRightBtn = () => {

        if (this.state.step == 0 && this.state.id == '') {
            return message.warning('请选择红包内容！');
        }

        if (this.state.step == 2 && this.state.iconMediaId == '') {
            return message.warning('请选择红包样式！');
        }

        if (this.state.step == 0 || (this.state.step == 0 && !this.props.typeShow) || this.state.step == 1) {
            this.setState({
                step: this.state.step + 1,
            });
        }

        if (this.state.step == 2 || this.props.typeShow === 'h5') {
            if (this.props.onSavePacket) {

                let params = {
                    style: {
                        position: this.state.position,
                        iconMediaId: this.state.iconMediaId,
                    },
                    url: this.state.url,
                    name: this.state.item.title || this.state.item.name,
                    channel: this.state.channel
                };

                let params2 = {
                    id: this.state.id,
                    type: this.state.type,
                    url: this.state.url,
                    name: this.state.item.title || this.state.item.name,
                    channel: this.state.channel,
                    style: {
                        position: this.state.position,
                        iconMediaId: this.state.iconMediaId,
                    }
                };

                if (this.state.type == 'coupon') {
                    params['couponId'] = this.state.id;
                } else {
                    params['integralId'] = this.state.id;
                }

                this.props.onSavePacket(params, params2);
                this.props.reset();
            }
        }
    };

    render() {
        const step = this.state.step;
        const typeShow = this.props.typeShow;

        const topClass = classname({
            'packetshow-step2-item': true,
            'packetshow-step2-active': this.state.position == 'top'
        });

        const fixedClass = classname({
            'packetshow-step2-item': true,
            'packetshow-step2-active': this.state.position == 'fixed'
        });

        const bottomClass = classname({
            'packetshow-step2-item': true,
            'packetshow-step2-active': this.state.position == 'bottom'
        });

        const step1Class = classname({
            'packetshow-step1-typeshow': this.props.typeShow === 'h5',
            'packetshow-step1': true,
        });

        const {title = '添加优惠券'} = this.props;
        return (
            <Modal
                className="packetshow"
                width={850}
                footer={null}
                visible={true}
                maskClosable={false}
                onCancel={this.props.reset}
                title={title}>

                {typeShow == 'content' &&
                <div className="packetshow-steps">
                    <Steps current={this.state.step}>
                        <Step title="选择优惠券"/>
                        <Step title="设置显示位置"/>
                        <Step title="设置显示样式"/>
                    </Steps>
                </div>
                }

                {step == 0 &&
                <div className={step1Class}>
                    <List
                        typeShow={this.props.typeShow}
                        selected={this.state.id}
                        selectedCallback={this.idSelected}
                        defaultChannelType={this.defaultChannelType}
                        type={this.state.type}/>
                </div>
                }

                {step == 1 &&
                <div className="packetshow-step2">
                    <div className={topClass}>
                        <div className="packetshow-step2-top" onClick={() => this.positionSelect('top')}></div>
                        <p>置顶显示</p>
                    </div>

                    <div className={fixedClass}>
                        <div className="packetshow-step2-fixed" onClick={() => this.positionSelect('fixed')}></div>
                        <p>悬浮显示</p>
                    </div>

                    <div className={bottomClass}>
                        <div className="packetshow-step2-bottom" onClick={() => this.positionSelect('bottom')}></div>
                        <p>置底显示</p>
                    </div>
                </div>
                }

                {step == 2 &&
                <div className="packetshow-step3">
                    <StyleList selected={this.state.iconMediaId} selectedCallback={this.iconMediaIdSelect}/>
                </div>
                }

                <div className="packetshow-footer">
                    <Button
                        onClick={this.onLeftBtn}
                        type="ghost"
                        size="large"
                        className="packetshow-btn">
                        {(step == 0 || typeShow === 'h5') ? '取消' : '上一步'}
                    </Button>

                    <Button
                        onClick={this.onRightBtn}
                        type="primary"
                        size="large"
                        className="packetshow-btn2">
                        {(step == 2 || typeShow === 'h5') ? '确定' : '下一步'}
                    </Button>
                </div>
            </Modal>
        );
    }
}

PacketShow.defaultProps = {
    typeShow: 'content'
};

export default PacketShow;
