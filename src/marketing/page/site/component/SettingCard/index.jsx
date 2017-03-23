import React from 'react';
import * as media from 'common/util/media';
import AuthComponentBase from 'common/base/AuthComponentBase';
import * as module from 'common/config/module';
import {MODULE_STATUS} from 'common/config/constants';
import AuthModule from 'common/component/AuthModule';
import './index.less';
import {Popover, Card, Upload, message,Row,Col} from 'antd';
import {getEntryUrl} from 'common/util/url';
import Img from 'common/component/Img';

export default class SettingCard extends AuthComponentBase {
    render() {
        return (
            <div className="settingcard">
                <Row gutter={16}>
                    <Col span={12}>
                        <SettingCardPlatform
                            data={this.props.dataMall}
                            showMallModify={this.props.showMallModify}/>
                    </Col>
                    <Col span={12}>
                        <Card title="微站分享设置" style={{'margin':'8px'}}>
                            <SettingCardShare
                                data={this.props.dataMall}
                                mallModify={this.props.mallModify}
                                showMallModify={this.props.showMallModify}/>
                        </Card>
                    </Col>
                </Row>

                {/*<div className="settingcard-info">


                 <SettingCardService
                 data={this.props.dataMall}
                 showCusModify={this.props.showCusModify}/>

                 <SettingCardPublic
                 data={this.props.data.weChat}
                 showCustomerModify={this.props.showCustomerModify}
                 updateWechat={this.props.updateWechat}/>

                 </div>*/}

            </div>
        );
    }
}


// 平台设置
class SettingCardPlatform extends AuthComponentBase {

    render() {
        const {
            link = this.props.data.uin ? getEntryUrl({uin: this.props.data.uin, code: 'home'}) : '',
            name,
            // contactName = this.props.data.contact ? this.props.data.contact.name : '',
            // contactMobile = this.props.data.contact ? this.props.data.contact.mobile : '',
        } = this.props.data;

        const popoverContainer = (
            <Img className="settingcard-p-imgmax"
                 src={media.getQrcodeUrl(400, 400, link)}/>
        );

        const extra = (
            <Popover content={popoverContainer}>
                <Img className="settingcard-p-imgmin"
                     src={media.getQrcodeUrl(400, 400, link)}/>
            </Popover>
        );

        return (
            <Card title="微站信息" extra={extra} style={{'margin':'8px'}}>
                <div className="settingcard-platform">
                    <div className="settingcard-p">
                        微站名称：{name}
                        <AuthModule type={module.PLATFORM_MICSITE_MODULE}>
                            <a className="settingcard-p-edit" onClick={()=>
                                this.anyWhereModule(module.PLATFORM_MICSITE_MODULE).then(()=> {
                                    this.props.showMallModify({
                                        type: 'name',
                                        title: '平台名称',
                                        value: name,
                                    });
                                })
                            }>修改</a>
                        </AuthModule>
                    </div>

                    {/*<div className="settingcard-p">
                     联系人：{contactName}
                     <AuthModule type={module.PLATFORM_MICSITE_MODULE}>
                     <a className="settingcard-p-edit" onClick={()=>
                     this.anyWhereModule(module.PLATFORM_MICSITE_MODULE).then(()=> {
                     this.props.showMallModify({
                     type: 'contactName',
                     title: '联系人',
                     value: contactName,
                     });
                     })
                     }>修改</a>
                     </AuthModule>
                     </div>

                     <div className="settingcard-p">
                     联系电话：{contactMobile}

                     <AuthModule type={module.PLATFORM_MICSITE_MODULE}>
                     <a className="settingcard-p-edit" onClick={()=>
                     this.anyWhereModule(module.PLATFORM_MICSITE_MODULE).then(()=> {
                     this.props.showMallModify({
                     type: 'contactMobile',
                     title: '联系电话',
                     value: contactMobile,
                     });
                     })
                     }>修改</a>
                     </AuthModule>
                     </div>*/}
                    <div className="settingcard-link">
                    <span className="settingcard-link-tit">
                        链接：
                    </span>
                        <span className="settingcard-link-a">
                        {link}
                    </span>
                    </div>
                </div>
            </Card>
        );
    }
}

// 暂时隐藏，等待后续评估
// 客服设置
/*class SettingCardService extends AuthComponentBase {

    render() {

        return (
            <Card className="settingcard-service" title="客服设置" extra={'便于用户联系咨询'}>
                <div className="settingcard-p">

                    联系电话：{ this.props.data.cusMobile }
                    <AuthModule type={module.PLATFORM_MICSITE_MODULE}>
                        <a className="settingcard-p-edit" onClick={()=>
                            this.anyWhereModule(module.PLATFORM_MICSITE_MODULE).then(()=> {
                                this.props.showCusModify({
                                    type: 'serviceMobile',
                                    title: '联系电话',
                                    value: this.props.data.cusMobile,
                                });
                            })
                        }>修改</a>
                    </AuthModule>
                </div>
            </Card>
        );
    }
}*/

// 关注公众号
/*class SettingCardPublic extends AuthComponentBase {

    render() {

        const props = {

            name: 'media',
            showUploadList: false,
            withCredentials: true,
            //media.upLoad
            action: media.addMedia({
                owner: 'platform',
                restype: 'res',
            }),
            beforeUpload(file) {

                //需要增加文件大小判定
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/gif';
                const isGIF = file.type === 'image/png';

                if (!isJPG && !isGIF && !isPNG) {
                    message.error('只支持 JPG/GIF/PNG 文件哦！');
                }

                const isSize = file.size < 1548576;

                if (!isSize) {
                    message.error('上传图片大小限制在1M以内！');
                }

                return (isJPG || isGIF || isPNG) && isSize;
            },
            onChange: (info) => {
                if (info.file.status !== 'uploading') {
                    // uploading
                }
                if (info.file.status === 'done') {

                    this.props.updateWechat({
                        imgId: info.file.response.data
                    });
                } else if (info.file.status === 'error') {
                    // null
                }
            },
        };

        const {
            imgId = '',
            name,
        } = this.props.data || {};

        const popoverContainer = (
            <Img className="settingcard-p-imgmax"
                 src={media.getMediaUrl(imgId)}/>
        );

        return (
            <Card className="settingcard-public" title="关注公众号" extra={'引流关注公众号，进入商城'}>
                <div className="settingcard-p">
                    公众号：{name}
                    <AuthModule type={module.PLATFORM_MICSITE_MODULE}>
                        <a className="settingcard-p-edit" onClick={()=>
                            this.anyWhereModule(module.PLATFORM_MICSITE_MODULE).then(()=> {
                                this.props.showCustomerModify({
                                    type: 'publicName',
                                    title: '公众号',
                                    value: name,
                                });
                            })
                        }>修改</a>
                    </AuthModule>
                </div>
                <div className="settingcard-p">
                    公众号二维码

                    <AuthModule type={module.PLATFORM_MICSITE_MODULE}>
                        <span>
                        {this.checkModule(module.PLATFORM_MICSITE_MODULE).status === MODULE_STATUS.VISIBLE_DISABLED &&
                        <span className="settingcard-p-edit"
                              onClick={()=> this.anyWhereModule(module.PLATFORM_MICSITE_MODULE)}>
                                    {imgId !== '' &&
                                    <a>重新上传</a>
                                    }

                            {imgId == '' &&
                            <a>上传图片</a>
                            }
                                </span>
                        }
                            {this.checkModule(module.PLATFORM_MICSITE_MODULE).status !== MODULE_STATUS.VISIBLE_DISABLED &&
                            <Upload {...props} className="settingcard-p-edit">
                                {imgId !== '' &&
                                <a>重新上传</a>
                                }

                                {imgId == '' &&
                                <a>上传二维码</a>
                                }
                            </Upload>
                            }
                            </span>
                    </AuthModule>
                </div>
                {imgId !== '' &&
                <Popover content={popoverContainer}>

                    <Img className="settingcard-p-img"
                         src={media.getMediaUrl(imgId)}/>
                </Popover>
                }
            </Card>
        );
    }
}*/

// 平台分享设置
class SettingCardShare extends AuthComponentBase {

    render() {
        const {
            shareTitle = this.props.data.share ? this.props.data.share.title : '',
            shareDesc = this.props.data.share ? this.props.data.share.desc : '',
            imgId = this.props.data.share ? this.props.data.share.imgId : '',
        } = this.props.data;

        //分享图片
        const props = {

            name: 'media',
            showUploadList: false,
            withCredentials: true,
            //分享用地址
            //uploadShare
            action: media.addMedia({
                owner: 'users',
                restype: 'share',
            }),
            beforeUpload(file) {

                //需要增加文件大小判定
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/gif';
                const isGIF = file.type === 'image/png';

                if (!isJPG && !isGIF && !isPNG) {
                    message.error('只支持 JPG/GIF/PNG 文件哦！');
                }

                const isSize = file.size < 1548576;

                if (!isSize) {
                    message.error('上传图片大小限制在1M以内！');
                }

                return (isJPG || isGIF || isPNG) && isSize;
            },

            onChange: (info) => {
                if (info.file.status !== 'uploading') {
                    // null
                }
                if (info.file.status === 'done') {

                    this.props.mallModify({
                        share: {
                            imgId: info.file.response.data,
                            imgIdUrl: media.getMediaUrl(info.file.response.data)
                        }
                    });

                } else if (info.file.status === 'error') {
                    // null
                }
            },
        };

        const popoverContainer = (
            <Img className="settingcard-p-imgmax"
                 src={media.getMediaUrl(imgId)}/>
        );

        return (
            <div className="settingcard-platform">
                <div className="settingcard-p">
                    分享标题：{shareTitle}
                    <AuthModule type={module.PLATFORM_MICSITE_MODULE}>
                        <a className="settingcard-p-edit" onClick={() =>
                            this.anyWhereModule(module.PLATFORM_MICSITE_MODULE).then(()=> {
                                this.props.showMallModify({
                                    type: 'shareTitle',
                                    title: '分享标题',
                                    value: shareTitle
                                });
                            })
                        }>修改</a>
                    </AuthModule>
                </div>

                <div className="settingcard-p">
                    分享摘要：{shareDesc}
                    <AuthModule type={module.PLATFORM_MICSITE_MODULE}>
                        <a className="settingcard-p-edit" onClick={() =>
                            this.anyWhereModule(module.PLATFORM_MICSITE_MODULE).then(()=> {
                                this.props.showMallModify({
                                    type: 'shareDesc',
                                    title: '分享摘要',
                                    value: shareDesc
                                });
                            })
                        }>修改</a>
                    </AuthModule>
                </div>

                <div className="settingcard-p">
                    分享图片<span style={{'color': '#FF9900'}}>（请上传300*300的图片）</span>
                    <AuthModule type={module.PLATFORM_MICSITE_MODULE}>
                         <span>
                            {this.checkModule(module.PLATFORM_MICSITE_MODULE).status === MODULE_STATUS.VISIBLE_DISABLED &&
                            <span className="settingcard-p-edit"
                                  onClick={()=> this.anyWhereModule(module.PLATFORM_MICSITE_MODULE)}>
                                    {imgId !== '' &&
                                    <a>重新上传</a>
                                    }

                                {imgId == '' &&
                                <a>上传图片</a>
                                }
                                </span>
                            }
                             {this.checkModule(module.PLATFORM_MICSITE_MODULE).status !== MODULE_STATUS.VISIBLE_DISABLED &&
                             <Upload {...props} className="settingcard-p-edit">
                                 {imgId !== '' &&
                                 <a>重新上传</a>
                                 }

                                 {imgId == '' &&
                                 <a>上传图片</a>
                                 }
                             </Upload>
                             }
                            </span>
                    </AuthModule>
                </div>
                {imgId !== '' &&
                <Popover content={popoverContainer}>

                    <Img className="settingcard-p-img"
                         src={media.getMediaUrl(imgId)}/>
                </Popover>
                }
            </div>
        );
    }
}


