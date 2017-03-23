import React, {Component} from 'react';
import {Modal, Radio, Row, Col, message} from 'antd';
// import {getMediaUrl} from 'common/util/media';
import {dateFormat} from 'common/util';
// import {getContentTemplateUrl, getContentPreviewUrl, getIlokaContentUrl, getContentShowUrl} from 'common/util/url';
import './index.less';

const RadioButton = Radio.Button;

export default class ContentPreviewShow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            channel: props.channel, // vsite/wx/wb/toutiao
            display: props.display, // list/preview
            isFirstClick: true
        };

    }

    handleClick = () => {
        message.success('复制成功！');
    };

    /*hideMask = () => {
        this.refs.mask.className = 'content-preview-hide-mask';
        this.setState({
            isFirstClick: false
        });
    };*/

    onChange = (e) => {

        this.setState({
            channel: e.target.value,
            display: e.target.value != 'toutiao' ? 'list' : 'preview'
        },()=>{
            /*if(e.target.value == 'toutiao'){
                // 在这里进行清洗？
                // console.log(this.refs.iframe);
                // this.refs.iframe.className = 'content-preview-hide-mask';
                // filter(window.frames['iframeId']);
            }*/
        });
    };

    /*showPreview = () => {
        this.setState({
            display: 'preview'
        });
    };*/

    render = () => {

        let {reset, data, visible} = this.props;

        // let {channel} = this.state;

        if (!data) {
            return null;
        }

        /*let url = '',
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
                // 新增type=preview
                previewUrl = getIlokaContentUrl(data.resId ? data.resId : data.id) + '&mode=preview';
                url = previewUrl;

                if (data.contentStatus == 'published') {
                    commonUrl = getIlokaContentUrl(data.resId ? data.resId : data.id);
                } else {
                    commonUrl = previewUrl;
                }

                // commonUrl = url;
                previewClassName = 'content-preview-fix-mobile';
                break;

        }

        let isFirst = data ? false : true;*/

        /*let previewClassNames = {
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
                        <div className="content-preview-vsite-normal-left">
                            {
                                !data.vsite.imgId && <img src='./img/default.png' alt=""/>
                            }
                            {
                                data.vsite.imgId && <img src={getMediaUrl(data.vsite.imgId)} alt=""/>
                            }
                        </div>
                        <div className="content-preview-vsite-normal-right">
                            <div className="content-preview-vsite-normal-title">
                                <span>{data.vsite.title ? data.vsite.title : '标题未设置'}</span>
                            </div>
                            <div className="content-preview-vsite-normal-desc">
                                <span>{data.vsite.desc ? data.vsite.desc : '摘要未设置'}</span>
                            </div>
                            <div className="content-preview-vsite-normal-other">
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
                ) : (<div className="content-preview-vsite-normal-large" onClick={() => this.showPreview('vsite')}>
                    <div className="content-preview-vsite-normal-left">
                        <img src='./img/default.png' alt=""/>
                    </div>
                    <div className="content-preview-vsite-normal-right">
                        <div className="content-preview-vsite-normal-title">
                            <span>标题未设置</span>
                        </div>
                        <div className="content-preview-vsite-normal-desc">
                            <span>摘要未设置</span>
                        </div>
                        <div className="content-preview-vsite-normal-other">
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
                        <div className="content-preview-wx-normal-title">
                            <span>{data.wx.title ? data.wx.title : '标题未设置'}</span>
                        </div>
                        <div className="content-preview-wx-normal-date">
                            <span>{data.lastModifiedDate ? dateFormat(new Date(parseInt(data.lastModifiedDate)), 'MM月dd日') : '日期未设置'}</span>
                        </div>
                        <div className="content-preview-wx-normal-img">
                            {
                                !data.wx.imgId && <img src='./img/default.png' alt=""/>
                            }
                            {
                                data.wx.imgId && <img src={getMediaUrl(data.wx.imgId)} alt=""/>
                            }
                        </div>
                        <div className="content-preview-wx-normal-desc">
                            <span>{data.wx.desc ? data.wx.desc : '摘要未设置'}</span>
                        </div>
                    </div>
                ) : (<div className="content-preview-wx-normal-large" onClick={() => this.showPreview('wx')}>
                    <div className="content-preview-wx-normal-title">
                        <span>标题未设置</span>
                    </div>
                    <div className="content-preview-wx-normal-date">
                        <span>{data.lastModifiedDate ? dateFormat(new Date(parseInt(data.lastModifiedDate)), 'MM月dd日') : '日期未设置'}</span>
                    </div>
                    <div className="content-preview-wx-normal-img">
                        <img src='./img/default.png' alt=""/>
                    </div>
                    <div className="content-preview-wx-normal-desc">
                        <span>摘要未设置</span>
                    </div>
                </div>),
            wb: data && data.wb ? (
                    <div className="content-preview-wb-normal">
                        <div style={{'lineHeight': '24px', 'marginBottom': '14px'}}>
                            <div className="content-preview-wb-normal-headImg">
                                <p>
                                    <img src="./img/head.png" alt=""/>
                                    <span className="content-preview-wb-normal-user">微博号名称</span>
                                </p>
                            </div>
                        </div>
                        <div className="content-preview-wb-normal-desc">
                            <p>
                                <span>{data.wb.desc ? data.wb.desc : '摘要未设置'}</span>
                                &nbsp;
                                <a onClick={() => this.showPreview('wb')}
                                   style={{'color': '#eb7350'}}><span>#网页链接</span></a>
                            </p>
                        </div>
                        <div className="content-preview-wb-normal-img">
                            {
                                !data.wb.imgId && <img src='./img/default.png' alt=""/>
                            }
                            {
                                data.wb.imgId && <img src={getMediaUrl(data.wb.imgId)} alt=""/>
                            }
                        </div>
                        <div>
                            <img src="./img/mobile_content_weibo_bar.png" alt="" style={{'width': '100%'}}/>
                        </div>
                    </div>
                ) : (<div className="content-preview-wb-normal">
                    <div style={{'lineHeight': '24px', 'marginBottom': '14px'}}>
                        <div className="content-preview-wb-normal-headImg">
                            <p>
                                <img src="./img/head.png" alt=""/>
                                <span className="content-preview-wb-normal-user">微博号名称</span>
                            </p>
                        </div>
                    </div>
                    <div className="content-preview-wb-normal-desc">
                        <p>
                            <span>摘要未设置</span>
                            &nbsp;
                            <a onClick={() => this.showPreview('wb')}
                               style={{'color': '#eb7350'}}><span>#网页链接</span></a>
                        </p>
                    </div>
                    <div className="content-preview-wb-normal-img">
                        <img src='./img/default.png' alt=""/>
                    </div>
                    <div>
                        <img src="./img/mobile_content_weibo_bar.png" alt="" style={{'width': '100%'}}/>
                    </div>
                </div>),
            toutiao: null
        };*/

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
                // disabled: disableWX
            }, {
                name: '微博',
                value: 'wb',
                // disabled: disableWB
            }/*, {
                name: '头条',
                value: 'toutiao',
                // disabled: disableTouTiao
            }*/, {
                name: '微站',
                value: 'vsite',
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

            RadioList.push(RadioButtonItem);

        });

        // console.dir(data);


        let width = 1000,
            footer = null,
            maskClosable = true,
            /*buttonText = (
                <span className="content-preview-common-text content-preview-span">复制链接</span>
            ),*/
            toutiaoContent = (<div className="content-preview-common-bg content-preview-toutiao">
                <header className="content-preview-toutiao-header">
                    <div className="content-preview-toutiao-title">{data.toutiao.title}</div>
                    <div>
                        <span className="content-preview-toutiao-time" style={{'paddingLeft':'0'}}>
                            {dateFormat(data.lastModifiedDate,'MM-dd hh:mm')}
                        </span>
                    </div>
                </header>
                <div dangerouslySetInnerHTML={{__html:data.toutiaoContent?data.toutiaoContent.content:data.content}}></div>
            </div>),
            content = (
                <div className="content-preview-height">
                    <div className="content-preview-right">
                        <Row gutter={16}>
                            <Col push={6} span={12}>
                                <div className="content-preview-mobile">
                                    {toutiaoContent}
                                </div>
                            </Col>
                            <Col push={5} span={2}>
                                <div style={{'marginTop': '75px'}}>
                                    <a href="javascript:void(0)" onClick={reset}>
                                        <img src="./img/close.png" alt=""/>
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
