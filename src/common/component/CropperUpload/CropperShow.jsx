import React from 'react';
import {Modal, Button} from 'antd';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import {addMediaImg} from 'common/api/media';
import _ from 'lodash';
import './index.less';

export default class Rcropper extends React.Component {

    // 发送baes64
    handelOk = () => {
        //图片上传的时候时候采用原始图片
        let base64Data = this.refs.cropper.getCroppedCanvas().toDataURL();

        base64Data = base64Data.split(';base64,')[1];
        const fileName = 'media.jpg';
        const paramsDefault = {
            owner: 'biz',
            restype: 'res',
        };

        const crooperParams = _.assign({},
            paramsDefault,
            this.props.crooperParams || {}
        );

        const cropperData = {
            base64: base64Data,
            fileName,
        };

        addMediaImg(cropperData, crooperParams).then((result) => {
            this.props.crooperDone(result.data);
        });

        // 压缩base64字节数
        /*this.props.convertImgToBase64(base64Data, 1, (base64Img) => {
         const base64Data = base64Img.split(';base64,')[1];
         const fileName = 'media.jpg';
         const paramsDefault = {
         owner: 'biz',
         restype: 'res',
         };

         const crooperParams = _.assign({},
         paramsDefault,
         this.props.crooperParams || {}
         );

         const cropperData = {
         base64: base64Data,
         fileName,
         };

         addMediaImg(cropperData, crooperParams).then((result) => {
         this.props.crooperDone(result.data);
         });

         // uploadMediaBase64(cropperData, crooperParams, (result) => {
         //     this.props.crooperDone(result.data);
         // });
         });*/
    }

    // 返回且使用原图
    handelUseOrigin = () => {
        this.props.crooperDone(this.props.infoData);
    }

    // 获取crooper配置参数
    getCrooperOptions = () => {
        const _default = {
            ref: 'cropper',
            aspectRatio: 1 / 1,
            guides: true,
        };
        return _.assign({}, _default, this.props.crooperOptions ? this.props.crooperOptions : {});
    }

    render() {
        let crooperOptions = this.getCrooperOptions();
        crooperOptions['src'] = crooperOptions['src'] + '?_=' + new Date().getTime();
        const crooperStyle = this.props.crooperStyle || {height: 500, width: 700};

        let footer = [];

        const title = (
            <div>
                <span className="ant-modal-title">图片裁剪</span>
                <span className="cropper-upload-modalDesc">{this.props.modalDesc}</span>
            </div>);

        footer.push(<Button
            key="back"
            type="ghost"
            size="large"
            onClick={this.props.reset}>
            返 回</Button>);

        if (this.props.useOrigin) {
            footer.push(<Button
                key="useOrigin"
                type="ghost"
                size="large"
                onClick={this.handelUseOrigin}>
                使用原图</Button>);
        }
        footer.push(<Button
            key="submit"
            type="primary"
            size="large"
            onClick={this.handelOk}>
            裁剪图片</Button>);

        return (
            <div>
                {crooperOptions.src.indexOf('undefined') == -1 &&
                <Modal
                    title={title}
                    width={730}
                    visible={true}
                    onCancel={this.props.reset}
                    maskClosable={false}
                    footer={footer}>
                    <div onDoubleClick={this.handelOk}>
                        <Cropper
                            style={crooperStyle}
                            {...crooperOptions}/>
                    </div>
                </Modal>

                }
            </div>
        );
    }
}
