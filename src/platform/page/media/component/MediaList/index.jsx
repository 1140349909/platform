import React, {Component} from 'react';
import {Table} from 'antd';
import config from 'common/config';
import {OWNER, MEDIA_RES_TYPE, MEDIA_MIME_TYPE, PLATFORM_TYPE} from 'common/config/constants';
import * as media from 'common/util/media';
import Img from 'common/component/Img';
import {dateFormat} from 'common/util';

export default class MediaList extends Component {

    constructor(props) {
        super(props);
    }

    state = {};

    render() {

        let {deleteAdminMedia, total, loading, data, onChange,edit} = this.props;

        // console.dir(tagList);

        let OWNER_LIST = [],
            MEDIA_RES_TYPE_LIST = [],
            MEDIA_MIME_TYPE_LIST = [],
            PLATFORM_TYPE_LIST = [];

        let ownerList = {
            'anonym': '匿名',
            'wechat': '微信',
            'users': '注册用户',
            'biz': '商业',
            'v': '微账户',
            'platform': '平台运营用户'
        };

        let resTypeList = {
            'res': '资源',
            'face': '人脸',
            'tker': '推客',
            'headimg': '头像',
            'cover': '封面',
            'share': '分享',
            'show': '晒图',
            'vcard': '名片',
            'bg': '背景',
            'shape': '图形',
            'banner': '广告条',
            'redenvelope': '红包',
            'coupon': '优惠券',
            'integral': '积分',
            'distribute': '分发',
            'feedback': '反馈',
            'font': '字体',
            'resume': '简历'
        };

        let platformList = {
            'cms': '内容直通车',
            'vveshow': '移动微秀场',
            'iloka': '艾乐卡',
            'projects': '项目',
            'interact': '互动平台',
            'buy': '交易平台',
            'platform': '平台管理系统'
        };

        let mimeTypeList = {
            'image': '图片',
            'audio': '音频',
        };

        for (let i in OWNER) {
            if (OWNER.hasOwnProperty(i)) {
                OWNER_LIST.push({
                    text: ownerList[OWNER[i]],
                    value: OWNER[i]
                });
            }
        }

        for (let i in MEDIA_RES_TYPE) {
            if (MEDIA_RES_TYPE.hasOwnProperty(i)) {
                MEDIA_RES_TYPE_LIST.push({
                    text: resTypeList[MEDIA_RES_TYPE[i]],
                    value: MEDIA_RES_TYPE[i]
                });
            }
        }

        for (let i in MEDIA_MIME_TYPE) {
            if (MEDIA_MIME_TYPE.hasOwnProperty(i)) {
                MEDIA_MIME_TYPE_LIST.push({
                    text: mimeTypeList[MEDIA_MIME_TYPE[i]],
                    value: MEDIA_MIME_TYPE[i]
                });
            }
        }

        for (let i in PLATFORM_TYPE) {
            if (PLATFORM_TYPE.hasOwnProperty(i)) {
                PLATFORM_TYPE_LIST.push({
                    text: platformList[PLATFORM_TYPE[i]],
                    value: PLATFORM_TYPE[i]
                });
            }
        }

        const columns = [
            {
                title: '媒体资源',
                dataIndex: 'mediaId',
                render: (text, record)=> {

                    let mediaModule = '';

                    if (record.mimeType.indexOf('image') != -1) {

                        mediaModule = (<Img src={media.getMediaUrl(record.mediaId)} alt=""
                                            style={{'width': '50px', 'height': '50px'}}/>);
                    } else {

                        mediaModule = (<span>非图片格式不予显示</span>);

                    }

                    return (
                        <div>
                            {mediaModule}
                        </div>
                    );
                }
            }, {
                title: '最后修改日期',
                dataIndex: 'lastModifiedDate',
                render: (text, record) => {

                    return (
                        <div>
                            {dateFormat(new Date(parseInt(record.lastModifiedDate)), 'yyyy-MM-dd hh:mm:ss')}
                        </div>
                    );

                }

            }, {
                title: '上传类型',
                dataIndex: 'owner',
                filters: OWNER_LIST,
                onFilter: (value, record) => record.owner.indexOf(value) === 0,
                filterMultiple: false,
                render: (text, record) => {

                    return (
                        <div>
                            {ownerList[record.owner]}
                        </div>
                    );

                }
            }, /*{
                title: '上传平台',
                dataIndex: 'platform',
                filters: PLATFORM_TYPE_LIST,
                onFilter: (value, record) => record.platform.indexOf(value) === 0,
                filterMultiple: false,
                render: (text, record) => {

                    return (
                        <div>
                            {platformList[record.platform]}
                        </div>
                    );

                }
            },*/ {
                title: '媒体类型',
                dataIndex: 'mimeType',
                filters: MEDIA_MIME_TYPE_LIST,
                onFilter: (value, record) => record.mimeType.indexOf(value) === 0,
                filterMultiple: false,
                render: (text, record) => {

                    let mimeType = '';

                    switch (record.mimeType.split('/')[0]) {
                        case 'image':
                            mimeType = '图片';
                            break;
                        case 'audio':
                            mimeType = '音频';
                            break;
                    }

                    return (
                        <div>
                            {mimeType}
                        </div>
                    );

                }
            }, {
                title: '是否为库文件',
                dataIndex: 'isLib',
                render: (text, record) => {

                    let isLib = record.isLib ? '是' : '否';

                    return (
                        <span>
                            {isLib}
                        </span>
                    );

                }
            }, {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    return (
                        <div>
                            <a href="javascript:;" onClick={()=>edit(record.id)}>修改</a>
                            <span className="ant-divider"></span>
                            <a href="javascript:;" onClick={()=>deleteAdminMedia(record.id)}>删除</a>
                        </div>
                    );
                }
            }];

        const pagination = {
            total: total,
            showSizeChanger: true,
            defaultPageSize: config.SIZE,
            /*onShowSizeChange: (page, size)=> {
                this.setState({
                    size:size
                },()=>list((page-1), size));
            }*/
        };

        return (
            <Table rowKey={record => record.id}
                   columns={columns}
                   pagination={pagination}
                   dataSource={data}
                   loading={loading}
                   onChange={onChange}
                   bordered/>
        );
    }
}
