import React, {Component} from 'react';
import {Modal, Row, Col, Button, message} from 'antd';
import {getIlokaContentUrl} from 'common/util/url';
import './index.less';
import QRCode from 'rc-qrcode';

export default class TemplatePreviewShow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contentList: props.contentList,
            index: props.index,
        };
    }

    arrow = (content, i, type) => {

        switch (type) {
            case 'prep':
                i = i - 1;
                break;
            case 'next':
                i = i + 1;
                break;
        }

        if (i < 0) {
            i = 0;
            message.info('已到达第一项');
        }

        if (i > content.length - 1) {
            i = content.length - 1;
            message.info('已到达最后一项');
        }

        this.setState({
            index: i,
            data: content[i]
        }, () => this.props.getTplData(content[i].id));
    };

    getItemText = (data, type) => {

        let item = '',
            buttonContentList = [];

        let buyButton = {
            type: 'primary',
            className: 'template-preview-use-button',
            onClick: () => this.props.buyH5Template(data.id, data.ledou, data.name ? data.name : '未命名标题'),
            text: '购买模板'
        };
        let useButton = {
            type: 'primary',
            className: 'template-preview-use-button',
            onClick: () => this.props.useH5Template(data),
            text: '使用模板'
        };
        let collectButton = {
            type: '',
            className: 'template-preview-favourite-button',
            onClick: () => this.props.collectTemplate(data),
            text: data.faved ? '取消收藏' : '收藏模板'
        };
        let submitButton = {
            type: 'primary',
            className: 'template-preview-use-button',
            onClick: () => this.props.submitCheck(data.id),
            text: '提交模板'
        };
        let modifyButton = {
            type: 'primary',
            className: 'template-preview-use-button',
            onClick: () => this.props.editH5Template(data.id),
            text: '修改模板'
        };
        let deleteButton = {
            type: '',
            className: 'template-preview-favourite-button',
            onClick: () => this.props.deleteH5Template(data.id),
            text: '删除模板'
        };


        let resAudit = {
            's0': '待提交',
            's11': '待审核',
            's16': '修改基本属性',
            's19': '修改基本属性',
            's21': '修改基本属性',
            's26': '审核已通过',
            's29': '审核未通过',
            's31': '修改价格',
            's36': '定价通过-待上架',
            's39': '已上架',
            's41': '已上架',
            's46': '已上架',
            's49': '已下架',
        };

        switch (type) {
            case 'platform':
            case 'favorite':
                if (data.bought) {
                    item = <span style={{'color': '#009dfc'}}>已购买</span>;
                } else {
                    if (data.ledou != undefined) {
                        if (data.ledou == 0) {
                            item = <span style={{'color': '#009dfc'}}>免费</span>;
                        } else {
                            item = (<p style={{'color': '#666666'}}>
                                价格：<span style={{'color': '#009dfc'}}>{data.ledou}</span>乐豆
                            </p>);
                        }
                    } else {
                        item = <span style={{'color': '#009dfc'}}>未定价</span>;
                    }
                }

                if (data.ledou != 0 && !data.bought) {
                    buttonContentList = [buyButton, collectButton];
                } else {
                    buttonContentList = [useButton, collectButton];
                }

                break;
            case 'bought':
                item = <span style={{'color': '#009dfc'}}>已购买</span>;
                buttonContentList = [useButton, collectButton];
                break;
            case 'my':
                if (data.resAudit) {
                    item = (<p style={{'color': '#666666'}}>
                        状态：<span style={{'color': '#009dfc'}}>{resAudit[data.resAudit.auditStatus]}</span>
                    </p>);
                    switch (data.resAudit.auditStatus) {
                        case 's11':
                        case 's26':
                        case 's49':
                            buttonContentList = [useButton];
                            break;
                        default:
                            buttonContentList = [submitButton, useButton, modifyButton, deleteButton];
                            break;
                    }

                } else {
                    item = (<p style={{'color': '#666666'}}>
                        状态：<span style={{'color': '#009dfc'}}>待提交</span>
                    </p>);
                    buttonContentList = [submitButton, useButton, modifyButton, deleteButton];
                }
                break;
        }

        return {item, buttonContentList};

    }

    render = () => {

        // 收藏模板和使用模板方法继承
        let {
            visible, reset, tplData, type,
        } = this.props;

        let {contentList, index} = this.state;

        let data = contentList[index];

        //只接受模板预览
        let previewUrl = getIlokaContentUrl(tplData.id, 'previewTpl'),
            previewClassName = 'template-preview-fix-mobile';

        // 构造标签页
        // 2.4版的标签页似乎要被替换为
        // 免费：使用模板/收藏模板
        // 价格XX乐豆：立即购买/收藏模板
        // 已购买：使用模板/收藏模板

        // 免费：data.bought:false && data.ledou == 0
        // 价格XX乐豆：data.bought:false && data.ledou != 0
        // 已购买：data.bought:true

        // 仅在我生成的模板更改为：
        // 已上架：使用模板
        // 审核未通过：提交审核/使用模板/修改模板/删除模板
        // 待审核：使用模板
        // 审核已通过：使用模板
        // 已下架：使用模板

        let {item, buttonContentList} = this.getItemText(data, type);

        let buttonList = [];

        buttonContentList.map((item, index) => {
            buttonList.push(
                <div key={index}>
                    <Button type={item.type} className={item.className}
                            onClick={item.onClick}>
                        {item.text}
                    </Button>
                    <br/>
                    <br/>
                </div>
            );
        });


        let title = '预览',
            width = 778,
            footer = null,
            maskClosable = false,

            content = (
                <div>
                    <div className="template-preview-arrow-left" onClick={() => this.arrow(contentList, index, 'prep')}>
                    </div>
                    <div className="template-preview-container-left">
                        <div className="template-preview-mobile">
                            <iframe src={previewUrl}
                                    frameBorder="0"
                                    className={previewClassName}></iframe>
                        </div>
                    </div>
                    <div className="template-preview-container-right">
                        <div className="template-preview-title">
                            <span className="template-preview-common-text template-preview-title-text">
                                {data.name ? data.name : '未命名标题'}
                            </span>
                        </div>
                        <div style={{'margin': '16px 31px', 'lineHeight': '16px'}}>
                            <Row>
                                <Col span={20}>
                                    <Row className="template-preview-common-text template-preview-category-text">
                                        <Col span={24}>
                                            {item}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={4}>
                                    <div style={{'textAlign': 'right'}}>
                                        <i className="iconfont icon-remen"/>
                                        <span className="template-preview-common-text template-preview-remen-text">
                                            {data.opdata && data.opdata.pv ? data.opdata.pv : 0}
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <div className="template-preview-card">
                                <div style={{'textAlign': 'center'}}>
                                    <QRCode renderer="svg" content={previewUrl} scale="4" margin="0" background="white"
                                            foreground="#000000"/>
                                </div>
                                <div className="template-preview-card-text">
                                    <p className="template-preview-common-text template-preview-p">手机扫一扫预览</p>
                                </div>
                            </div>
                        </div>
                        <div style={{'textAlign': 'center'}}>
                            {buttonList}
                            {/*收费模板要改为立即购买*/}
                            {/*<Button type="primary" className="template-preview-use-button"
                             onClick={() => useTemplate(data)}>
                             使用模板
                             </Button>
                             <br/>
                             <br/>
                             <Button className="template-preview-favourite-button" onClick={() => collectTemplate(data)}>
                             {data.favorited ? '取消收藏模板' : '收藏模板'}
                             </Button>*/}
                        </div>

                    </div>
                    <div className="template-preview-arrow-right"
                         onClick={() => this.arrow(contentList, index, 'next')}>
                    </div>

                    <div className="template-preview-close" onClick={reset}>
                    </div>

                </div>

            );

        return (
            <div>
                <Modal title={title}
                       className="template-preview-container"
                       visible={visible}
                       width={width}
                       footer={footer}
                       maskClosable={maskClosable}
                       onCancel={reset}>
                    {content}
                </Modal>
            </div>
        );
    };
}
