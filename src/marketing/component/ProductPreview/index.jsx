import React, {Component} from 'react';
import {Button, Modal} from 'antd';
import {getMallProductPreviewUrl, getYygProductPreviewUrl} from 'common/util/url';
import './index.less';
import QRCode from 'rc-qrcode';
// API_HOST

export default class ProductPreview extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        loading: false,
    }

    // 保存并上架
    onOk = () => {
        if (this.props.onOk) {
            this.props.onOk();
            this.setState({
                loading: true,
            });
        }
    }

    // 保存
    onDone = () => {
        if (this.props.onDone) {
            this.props.onDone();
        }
    }

    // 返回
    onEdit = () => {
        if (this.props.onEdit) {
            this.props.onEdit();
        }
    }

    render() {
        const buyChannel = this.props.buyChannel || 'mall';
        let url;

        if (buyChannel == 'mall') {
            url = getMallProductPreviewUrl(this.props.uin, this.props.id);
        } else {
            url = getYygProductPreviewUrl(this.props.uin, this.props.id);
        }

        let footer = [];

        if (this.props.onDone) {
            footer.push(<Button
                key="done"
                type="primary"
                size="large"
                onClick={this.onDone}>
                完成</Button>);
        }

        if (this.props.onOk) {
            footer.push(<Button
                loading={this.props.okLoading}
                key="submit"
                type="ghost"
                size="large"
                onClick={this.onOk}>
                完成并上架</Button>);
        }

        if (this.props.onEdit) {
            footer.push(<Button
                key="outEdit"
                type="ghost"
                size="large"
                onClick={this.onEdit}>
                继续编辑</Button>);
        }

        return (
            <Modal ref="modal"
                   maskClosable={false}
                   className="product-preview"
                   width={700}
                   visible={this.props.visible}
                   title="预览"
                   onCancel={this.props.onCancel}
                   footer={footer}>
                <div className="product-previewbox">
                    {/*<div className="product-preview-l">
                     <ProductPreviewPhone
                     url={url}
                     id={this.props.id}/>
                     </div>*/}

                    <ProductPreviewQrcode
                        url={url}
                        id={this.props.id}/>
                </div>
            </Modal>
        );
    }
}


// 手机预览
// class ProductPreviewPhone extends Component {
//     render() {
//         return (
//             <div className="product-preview-phone">
//                 <div className="product-preview-phone-iframebox">
//                     <iframe
//                         id="previewPhone"
//                         name="previewPhone"
//                         className="product-preview-phone-iframe"
//                         src={this.props.url}></iframe>
//                 </div>
//             </div>
//         );
//     }
// }

// 二维码
class ProductPreviewQrcode extends Component {
    render() {
        return (
            <div className="product-preview-qrcode">
                <QRCode renderer="svg" content={this.props.url} scale="4" margin="20" background="white"
                        foreground="#4192b7"/>
                <p>扫一扫二维码，查看预览</p>
            </div>
        );
    }
}

