import React, {Component} from 'react';
import {Row, Col, message, Form} from 'antd';
import  './index.less';
import {dateFormat} from 'common/util';
import IconFont from 'common/component/IconFont';
import UpdateNicknameForm from '../UpdateNicknameForm';
import {withRouter} from 'react-router';
import * as media from 'common/util/media';
import {MEDIA_RES_TYPE, OWNER} from 'common/config/constants';
import CropperUpload from 'common/component/CropperUpload';
import Img from 'common/component/Img';

@withRouter
class UserBasicInfo extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        headImgUrl: null,
    }
    linkToUpgrade = () => {
        this.props.router.push(`charge/payment/upgrade?versionId=${this.props.versionId}`);
    }

    // 裁剪完成之后回调
    uploadDone = (data, status) => {
        if (status == 'success') {
            this.props.updateUserInfo({
                headImg: data
            });
        }
    }
    getAccount = () => {
        const {info} = this.props.info;
        let accountName = '暂未设置';
        if (info) {
            if (info.mobile && !info.email) {
                accountName = info.mobile;
            } else if (info.mobile && info.email) {
                accountName = info.mobile + ' / ' + info.email;
            } else if (info.email && !info.mobile) {
                accountName = info.email;
            } else if (info.accountBinds && info.accountBinds.length > 0) {
                accountName = info.accountBinds[0].openId;
            }
        }
        return accountName;
    }

    //获取岗位名称
    getUinJobTitle = () => {
        const {info} = this.props.info;
        let title = '';
        if (info.uin == info.ownerUin) {
            title = '管理员';
        } else {
            info.uins && info.uins.map((item) => {
                if (item.uin == info.uin) {
                    title = item.name;
                }
            });
        }
        return title;
    }

    render() {
        const {info, version} = this.props.info;
        const uploadProps = {
            name: 'media',
            showUploadList: false,
            withCredentials: true,
            action: media.addMedia({owner: OWNER.BIZ, restype: MEDIA_RES_TYPE.RES}),
        };

        const productImgIdProps = {
            fileName: 'headImg',
            options: {
                beforeUpload(file) {
                    //需要增加文件大小判定
                    const isJPG = file.type === 'image/jpeg' || 'image/jpg';
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
            }
        };

        const crooperOptions = {
            aspectRatio: 1 / 1,
            width: 500,
            height: 500
        };

        return (
            <div className="user-container">
                <p className="title">账号信息</p>
                {
                    info &&
                    <div className="user-info">
                        <Row>
                            <Col className='user-label user-headimg' span={2}>我的头像：</Col>
                            <Col span={10}>
                                <CropperUpload
                                    modalDesc={'请上传400px*400px尺寸的图片'}
                                    form={this.props.form}
                                    uploadDone={this.uploadDone}
                                    crooperOptions={crooperOptions}
                                    uploadFileProps={productImgIdProps}
                                    uploadProps={uploadProps}>
                                    <div className='default-user-headimg'>
                                        {!info.headImgUrl &&
                                        <IconFont type='tupian' className='default-img'/>
                                        }
                                        {info.headImgUrl &&
                                        <span>
                                                <Img src={info.headImgUrl}/>
                                                <div className='default-img-hover'>
                                                    <IconFont type='tupian' className='default-img'/>
                                                </div>
                                            </span>
                                        }
                                    </div>
                                </CropperUpload>
                            </Col>
                        </Row>
                        <UpdateNicknameForm data={info}
                                            updateUserInfo={this.props.updateUserInfo }/>
                        <Row>
                            <Col className='user-label' span={2}>登录账号：</Col>
                            <Col span={10}
                                 className='middle-col'> {this.getAccount()} </Col>
                        </Row>
                        <Row>
                            <Col className='user-label' span={2}>账号类型：</Col>
                            <Col span={10}
                                 className='middle-col-excp'> {version && version.name} </Col>
                            <Col span={4}><a
                                onClick={this.linkToUpgrade}>{version && version.endDate ? '续费' : '升级账号'}</a>
                            </Col>
                        </Row>
                        {
                            version && version.startDate != 0 &&
                            <Row>
                                <Col className='user-label' span={2}>开通时间：</Col>
                                <Col span={18}>
                                    {
                                        dateFormat(version.startDate, 'yyyy-MM-dd hh:mm')
                                    }
                                    <div className='user-date'>
                                        有效期至：{ dateFormat(version.endDate, 'yyyy-MM-dd hh:mm')}
                                    </div>
                                </Col>
                            </Row>
                        }
                        <Row>
                            <Col className='user-label' span={2}>岗位名称：</Col>
                            <Col span={10}
                                 className='middle-col'>{this.getUinJobTitle()}</Col>
                        </Row>
                    </div>
                }
            </div>
        );
    }
}

export default Form.create({
    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function (props) {
        let {info} = props;

        if (!info) {
            return {};
        }

        // 弹出层模式，数据转换
        let headImg = {
            file: {
                response: {
                    data: info.headImg
                }
            }
        };
        return {
            headImg: {
                value: headImg,
            }
        };
    },
})(UserBasicInfo);
