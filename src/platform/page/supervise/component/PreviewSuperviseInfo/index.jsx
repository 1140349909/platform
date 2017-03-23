import React, {Component} from 'react';
import {Modal, Row, Col, message, Button} from 'antd';
import ButtonInput from 'common/component/ButtonInput';
import Img from 'common/component/Img'
import {getIlokaContentUrl} from 'common/util/url';

import './index.less';

export default class PreviewSuperviseInfo extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        confirmLoading: false,
        commonUrl: ''
    };
    handleClick = () => {
        message.success('复制成功!');
    };
    //模板详情
    _renderH5TemplateInfo = () => {
        const {tplBaseInfo} = this.props;
        let buttonText = (
            <span className="content-preview-common-text content-preview-span">复制链接</span>
        );
        return (
            <table>
                <tbody>
                <tr>
                    <td style={{'width': '70px'}}>审核ID:</td>
                    <td>{tplBaseInfo.id}</td>
                </tr>
                <tr>
                    <td>名称:</td>
                    <td>{tplBaseInfo.resOwner && tplBaseInfo.resOwner.title}</td>
                </tr>
                <tr>
                    <td>分类:</td>
                    <td>{this._renderTag()}</td>
                </tr>
                <tr>
                    <td>封面:</td>
                    <td>
                        <div style={{
                            'wordWrap': 'break-word',
                            'width': '300px',
                            'whiteSpace': 'normal'
                        }}>
                            <Img src={tplBaseInfo.imgUrl} style={{'width': '50px'}}/></div>
                    </td>
                </tr>
                <tr>
                    <td>发布时间:</td>
                    <td>{tplBaseInfo.createdDate}</td>
                </tr>
                <tr>
                    <td>昵称:</td>
                    <td>{tplBaseInfo.resOwner && tplBaseInfo.resOwner.nickname}</td>
                </tr>
                <tr>
                    <td>链接:</td>
                    <td>
                        <ButtonInput placeholder=""
                                     value={this._renderAppContentUrl()}
                                     onClick={this.handleClick}
                                     style={{'width': '221px'}}
                                     buttonText={buttonText}/>
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }

    _renderAppContentUrl = () => {
        const {tplBaseInfo} = this.props;
        return getIlokaContentUrl(tplBaseInfo.resId, 'previewTpl');
    }
    _renderH5MobilePreview = () => {
        return (
            <div className='h5-template-preview-mobile'>
                <div className='preview-iframe'>
                    <iframe src={this._renderAppContentUrl()}
                            frameBorder='0'></iframe>
                </div>
            </div>
        );
    }
    _renderTag = () => {
        const {resOwner} = this.props.tplBaseInfo;
        return (
            <div>
                {
                    resOwner.tags && resOwner.tags.map((tag, index) => {
                        return (<span key={index}>{tag}</span>);
                    })
                }
            </div>
        );
    }

    render() {
        const footer = <Button type='primary' onClick={this.props.reset}>确定</Button>;
        return (
            <Modal title='详情'
                   visible={this.props.visible}
                   maskClosable={false}
                   onCancel={this.props.reset}
                   confirmLoading={this.state.confirmLoading}
                   footer={footer}
                   className='reasonModal'
                   width={800}
            >
                <Row gutter={16} align='middle'>
                    <Col className='gutter-row' span={12}>
                        {
                            this._renderH5MobilePreview()
                        }
                    </Col>
                    <Col className='gutter-row h5-template-preview-Info' span={12}>
                        {
                            this._renderH5TemplateInfo()
                        }
                    </Col>
                </Row>

            </Modal>
        );
    }
}
