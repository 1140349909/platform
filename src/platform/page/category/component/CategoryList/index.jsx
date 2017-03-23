import React, {Component} from 'react';
import {Table} from 'antd';
import {OWNER, MEDIA_RES_TYPE, MEDIA_MIME_TYPE, PLATFORM_TYPE} from 'common/config/constants';

export default class CategoryList extends Component {

    constructor(props) {
        super(props);
    }

    state = {};

    render() {

        let {deleteMediaType, edit, loading, data} = this.props;

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
                title: '序号',
                dataIndex: 'seq',
            }, {
                title: '名称',
                dataIndex: 'name',
            }, {
                title: '代码',
                dataIndex: 'code',
            }, {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    return (
                        <div>
                            <a href="javascript:;" onClick={()=>edit(record.id)}>编辑</a>
                            <span className="ant-divider"></span>
                            <a href="javascript:;" onClick={()=>deleteMediaType(record.id)}>删除</a>
                        </div>

                    );
                }
            }];

        return (
            <Table rowKey={record => record.id}
                   columns={columns}
                   dataSource={data}
                   loading={loading}
                   bordered/>
        );
    }
}
