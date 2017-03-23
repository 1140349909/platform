import React, {Component}from 'react';
import {Modal, Button} from 'antd';
import {moneyFormat} from 'common/util';
import {getQrcodeUrl} from 'common/util/media';
import {getLedou} from 'common/util/ledou';
import Img from 'common/component/Img';
import  './index.less';

class QrCodeShow extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        const {qrCodeUrl, money, payType, type} = this.props;
        const codeUrl = getQrcodeUrl(400, 400, qrCodeUrl);
        const p = payType == 'wechatqrcode' ? '微信' : '支付宝';
        const title = type === 'upgrade' ? '账户升级' : `您正在购买: ${getLedou(money)}个乐豆`;
        const footer = [
            <Button key="return"
                    size="large"
                onClick={() => this.props.reset()}>
                重新选择充值方式
            </Button>
        ];
        return (
            <Modal
                visible={true}
                maskClosable={false}
                className="charge-payment-qrcodeshow"
                onCancel={this.props.reset}
                footer={footer}
                title={title}>

                <div className="charge-payment-qrcodeshow-box">
                    <p className="charge-payment-qrcodeshow-p">请使用{p},扫一扫(元)</p>
                    <p className="charge-payment-qrcodeshow-money">{moneyFormat(money, null, 2)}</p>
                    <Img className="charge-payment-qrcodeshow-img" src={codeUrl}/>
                </div>
            </Modal>
        );
    }
}

QrCodeShow.defaultProps = {
    type: 'ledou',
    money: '100',
    payType: 'wechatqrcode'
};

export default QrCodeShow;
