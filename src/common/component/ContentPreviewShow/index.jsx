import React, {Component} from 'react';
import {Modal, Radio, Row, Col, message} from 'antd';
import {getMediaUrl} from 'common/util/media';
import {dateFormat} from 'common/util';
import {getContentTemplateUrl, getContentPreviewUrl, getIlokaContentUrl, getContentShowUrl} from 'common/util/url';
import classNames from 'classnames';
import Img from 'common/component/Img';
import ButtonInput from 'common/component/ButtonInput';
import './index.less';

import QRCode from 'rc-qrcode';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class ContentPreviewShow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            channel: props.channel, // vsite/wx/wb/toutiao
            display: props.display, // list/preview
            available: props.available, // vsite/wx/wb/toutiao
            isFirstClick: true
        };
        // console.log('props', this.props)
    }

    handleClick = () => {
        message.success('复制成功！');
    };

    hideMask = () => {
        this.refs.mask.className = 'content-preview-hide-mask';
        this.setState({
            isFirstClick: false
        });
    };

    onChange = (e) => {

        this.setState({
            channel: e.target.value,
            display: e.target.value != 'toutiao' ? 'list' : 'preview'
        }, () => {
            if (e.target.value == 'toutiao') {
                // 在这里进行清洗？
                // console.log(this.refs.iframe);
                // this.refs.iframe.className = 'content-preview-hide-mask';
                // filter(window.frames['iframeId']);
            }
        });
    };

    showPreview = (channel, display) => {
        // console.log(channel);

        // 仅在图文有切换
        if (this.props.resType == 'content') {
            this.setState({
                channel: channel,
                display: display ? display : 'preview'
            });
        }

    };

    render = () => {

        let {reset, data, visible, resType} = this.props;

        let {channel, display, isFirstClick, available} = this.state;

        if (!data) {
            return null;
        }

        if (!available) {
            available = ['wx', 'wb', 'vsite'];
        }


        // console.log(available);

        let url = '',
            previewUrl = '',
            showUrl = '',
            commonUrl = '',
            previewClassName = '';

        switch (resType) {
            case 'content':
                // 图文资讯预览地址
                url = getContentTemplateUrl(data.uin, channel, data.id, true);
                previewUrl = getContentPreviewUrl(data.uin, data.id, true);
                showUrl = getContentShowUrl(data.uin, data.id, true);

                if (data.contentStatus == 'published') {
                    commonUrl = showUrl;
                } else {
                    commonUrl = previewUrl;
                }

                previewClassName = 'content-preview-common-bg';
                break;
            case 'h5':

                // 艾乐卡预览地址
                // 新增previewType=previewApp or previewTpl
                let {previewType} = this.props;
                //不传的默认值
                if (!previewType) {
                    previewType = 'previewTpl';
                }

                // console.dir(data);
                // 对普通模板而言没有data.resId，只有data.id
                // 对活动H5而言有data.resId
                // let id = previewType == 'previewTpl' ? data.id : data.resId;
                let id =  data.id;

                previewUrl = getIlokaContentUrl(id, previewType);
                url = previewUrl;

                if (data.contentStatus == 'published') {
                    commonUrl = getIlokaContentUrl(id);
                } else {
                    commonUrl = previewUrl;
                }

                // commonUrl = url;
                previewClassName = 'content-preview-fix-mobile';
                break;

        }

        let isFirst = data ? false : true;

        let previewClassNames = {
            vsite: classNames({
                'content-preview-common-bg': true,
                'content-preview-vsite': !isFirst
            }),
            wx: classNames({
                'content-preview-common-bg': true,
                'content-preview-wx': !isFirst
            }),
            wb: classNames({
                'content-preview-common-bg': true,
                'content-preview-wb': !isFirst
            }),
            toutiao: classNames({
                'content-preview-common-bg': true,
                'content-preview-toutiao': !isFirst
            })
        };

        let previewContent = {
            vsite: data && data.vsite ? (
                    <div className="content-preview-vsite-normal-large" onClick={() => this.showPreview('vsite')}>
                        <div className="content-preview-vsite-normal-large-left">
                            {
                                !data.vsite.imgId && <Img src='./img/default.png' alt=""/>
                            }
                            {
                                data.vsite.imgId && <Img src={getMediaUrl(data.vsite.imgId)} alt=""/>
                            }
                        </div>
                        <div className="content-preview-vsite-normal-large-right">
                            <div className="content-preview-vsite-normal-large-title">
                                <span>{data.vsite.title ? data.vsite.title : '标题未设置'}</span>
                            </div>
                            <div className="content-preview-vsite-normal-large-desc">
                                <span>{data.vsite.desc ? data.vsite.desc : '摘要未设置'}</span>
                            </div>
                            <div className="content-preview-vsite-normal-large-other">
                            <span>
                                {data.lastModifiedDate ? dateFormat(new Date(parseInt(data.lastModifiedDate)), 'yyyy-MM-dd') : '日期未设置'}
                            </span>
                                <span style={{'float': 'right'}}>
                                <i className="iconfont icon-yulan" style={{'fontSize': '12px', 'marginRight': '5px'}}/>
                                    {data.opdata && data.opdata.pv ? data.opdata.pv : 0}
                            </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="content-preview-vsite-normal-large" onClick={() => this.showPreview('vsite')}>
                        <div className="content-preview-vsite-normal-large-left">
                            <Img src='./img/default.png' alt=""/>
                        </div>
                        <div className="content-preview-vsite-normal-large-right">
                            <div className="content-preview-vsite-normal-large-title">
                                <span>标题未设置</span>
                            </div>
                            <div className="content-preview-vsite-normal-large-desc">
                                <span>摘要未设置</span>
                            </div>
                            <div className="content-preview-vsite-normal-large-other">
                        <span>
                            {data.lastModifiedDate ? dateFormat(new Date(parseInt(data.lastModifiedDate)), 'yyyy-MM-dd') : '日期未设置'}
                        </span>
                                <span style={{'float': 'right'}}>
                            <i className="iconfont icon-yulan" style={{
                                'fontSize': '12px',
                                'marginRight': '5px'
                            }}/>{data.opdata && data.opdata.pv ? data.opdata.pv : 0}
                        </span>
                            </div>
                        </div>
                    </div>),
            wx: data && data.wx ? (
                    <div className="content-preview-wx-normal-large" onClick={() => this.showPreview('wx')}>
                        <div className="content-preview-wx-normal-large-title">
                            <span>{data.wx.title ? data.wx.title : '标题未设置'}</span>
                        </div>
                        <div className="content-preview-wx-normal-large-date">
                            <span>{data.lastModifiedDate ? dateFormat(new Date(parseInt(data.lastModifiedDate)), 'MM月dd日') : '日期未设置'}</span>
                        </div>
                        <div className="content-preview-wx-normal-large-img">
                            {
                                !data.wx.imgId && <Img src='./img/default.png' alt=""/>
                            }
                            {
                                data.wx.imgId && <Img src={getMediaUrl(data.wx.imgId)} alt=""/>
                            }
                        </div>
                        <div className="content-preview-wx-normal-large-desc">
                            <span>{data.wx.desc ? data.wx.desc : '摘要未设置'}</span>
                        </div>
                    </div>
                ) : (<div className="content-preview-wx-normal-large" onClick={() => this.showPreview('wx')}>
                    <div className="content-preview-wx-normal-large-title">
                        <span>标题未设置</span>
                    </div>
                    <div className="content-preview-wx-normal-large-date">
                        <span>{data.lastModifiedDate ? dateFormat(new Date(parseInt(data.lastModifiedDate)), 'MM月dd日') : '日期未设置'}</span>
                    </div>
                    <div className="content-preview-wx-normal-large-img">
                        <Img src='./img/default.png' alt=""/>
                    </div>
                    <div className="content-preview-wx-normal-large-desc">
                        <span>摘要未设置</span>
                    </div>
                </div>),
            wb: data && data.wb ? (
                    <div className="content-preview-wb-normal-large">
                        <div style={{'lineHeight': '24px', 'marginBottom': '14px'}}>
                            <div className="content-preview-wb-normal-large-headImg">
                                <p>
                                    <Img src="./img/head.png" alt=""/>
                                    <span className="content-preview-wb-normal-large-user">微博号名称</span>
                                </p>
                            </div>
                        </div>
                        <div className="content-preview-wb-normal-large-desc">
                            <p>
                                <span>{data.wb.desc ? data.wb.desc : '摘要未设置'}</span>
                                &nbsp;
                                <a onClick={() => this.showPreview('wb')}
                                   style={{'color': '#eb7350'}}><span>#网页链接</span></a>
                            </p>
                        </div>
                        <div className="content-preview-wb-normal-large-img">
                            {
                                !data.wb.imgId && <Img src='./img/default.png' alt=""/>
                            }
                            {
                                data.wb.imgId && <Img src={getMediaUrl(data.wb.imgId)} alt=""/>
                            }
                        </div>
                        <div>
                            <Img src="./img/mobile_content_weibo_bar.png" alt="" style={{'width': '100%'}}/>
                        </div>
                    </div>
                ) : (<div className="content-preview-wb-normal-large">
                    <div style={{'lineHeight': '24px', 'marginBottom': '14px'}}>
                        <div className="content-preview-wb-normal-large-headImg">
                            <p>
                                <Img src="./img/head.png" alt=""/>
                                <span className="content-preview-wb-normal-large-user">微博号名称</span>
                            </p>
                        </div>
                    </div>
                    <div className="content-preview-wb-normal-large-desc">
                        <p>
                            <span>摘要未设置</span>
                            &nbsp;
                            <a onClick={() => this.showPreview('wb')}
                               style={{'color': '#eb7350'}}><span>#网页链接</span></a>
                        </p>
                    </div>
                    <div className="content-preview-wb-normal-large-img">
                        <Img src='./img/default.png' alt=""/>
                    </div>
                    <div>
                        <Img src="./img/mobile_content_weibo_bar.png" alt="" style={{'width': '100%'}}/>
                    </div>
                </div>),
            toutiao: null
        };

        // 加强限制条件
        /* let disableVSite = (data.vsite ? (
         (!data.vsite.imgId || data.vsite.imgId == '') ||
         (!data.vsite.title || data.vsite.title == '') ||
         (!data.vsite.desc || data.vsite.desc == '')) : true);

         let disableWX = (data.wx ? (
         (!data.wx.imgId || data.wx.imgId == '') ||
         (!data.wx.title || data.wx.title == '') ||
         (!data.wx.desc || data.wx.desc == '')) : true);

         let disableWB = (data.wb ? (
         (!data.wb.imgId || data.wb.imgId == '') ||
         (!data.wb.desc || data.wb.desc == '')
         ) : true);*/

        let RadioButtonList = [
            {
                name: '微信',
                value: 'wx',
                available: available.indexOf('wx') != -1
                // disabled: disableWX
            }, {
                name: '微博',
                value: 'wb',
                available: available.indexOf('wb') != -1
                // disabled: disableWB
            }, {
                name: '微站',
                value: 'vsite',
                available: available.indexOf('vsite') != -1
                // disabled: disableVSite
            },
        ];

        let RadioList = [];

        const radioStyle = {
            display: 'block',
            width: '80px',
            height: '30px',
            lineHeight: '30px',
            margin: '14px auto'
        };

        RadioButtonList.map((item) => {
            let RadioButtonItem = (
                <RadioButton key={item.value}
                             style={radioStyle}
                             disabled={item.disabled}
                             value={item.value}>
                    {item.name}
                </RadioButton>
            );

            if (item.available) {
                RadioList.push(RadioButtonItem);
            }

        });


        let width = 1000,
            footer = null,
            maskClosable = true,
            buttonText = (
                <span className="content-preview-common-text content-preview-span">复制链接</span>
            ),
            content = (
                <div className="content-preview-height">
                    <div className="content-preview-right">
                        <Row gutter={16}>
                            <Col span={2}>
                                <div className="content-preview-radio-group ant-radio-group-default">
                                    <RadioGroup defaultValue={channel} onChange={this.onChange}>
                                        {RadioList}
                                    </RadioGroup>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className={resType != 'h5'?"content-preview-mobile":"content-preview-mobile-h5"}>
                                    {
                                        display == 'list' && <div ref="tpl" className={previewClassNames[channel]}>
                                            <div className="content-preview-default-mask" onClick={this.hideMask}
                                                 style={{'display': channel == 'wb' ? 'none' : (isFirstClick ? 'block' : 'none')}}
                                                 ref="mask">
                                                <div>
                                                    <Img src="./img/hand.png" alt=""/>
                                                </div>
                                            </div>
                                            {previewContent[channel]}
                                        </div>
                                    }

                                    {
                                        display == 'preview' &&
                                        <div className={previewClassName}>
                                            <Img src="./img/mobile_header.png" alt=""
                                                 onClick={() => this.showPreview(channel, 'list')}
                                                 className="content-preview-header"/>
                                            <iframe src={previewUrl}
                                                    frameBorder="0"
                                                    className={resType != 'h5'?"content-preview-iframe":"content-preview-iframe-h5"}></iframe>
                                        </div>


                                    }
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{
                                    'background': 'white', 'padding': '40px 60px',
                                    'position': 'absolute',
                                    'borderRadius': '13px',
                                    'top': '75px'
                                }}>
                                    <div>
                                        <div className="content-preview-card">
                                            <div style={{'textAlign': 'center'}}>
                                                <QRCode renderer="svg" content={url} scale="4" margin="0"
                                                        background="white"
                                                        foreground="#000000"/>
                                            </div>
                                            <div className="content-preview-card-text">
                                                <p className="content-preview-common-text content-preview-p">手机扫一扫预览</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/*图文未发布时，不出现链接复制功能*/}
                                    {data.contentStatus == 'published' && <div className="content-preview-input">
                                        <ButtonInput placeholder=""
                                                     value={commonUrl}
                                                     onClick={this.handleClick}
                                                     style={{'width': '221px'}}
                                                     buttonText={buttonText}/>
                                    </div>}
                                </div>

                            </Col>
                            <Col span={2}>
                                <div style={{'marginTop': '75px', 'marginLeft': '125px'}}>
                                    <a href="javascript:void(0)" onClick={reset}>
                                        <Img src="./img/close.png" alt=""/>
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

            );

        return (
            <div>
                <Modal title={null}
                       className="content-preview-container"
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
