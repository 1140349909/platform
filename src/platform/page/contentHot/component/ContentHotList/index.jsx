import React, {Component} from 'react';
import {Table, Button} from 'antd';
import config from 'common/config';
import * as media from 'common/util/media';
import {dateFormat} from 'common/util';
import Img from 'common/component/Img';

export default class ContentHotList extends Component {

    constructor(props) {
        super(props);
    }

    state = {};

    render() {

        let {deleteContentHot, updateContentHot, list, edit, total, loading, data} = this.props;

        const columns = [
            // {
            //     title: 'id',
            //     dataIndex: 'id',
            //     width:180
            // },
            {
                title: '缩略图',
                dataIndex: 'thumbMediaId ',
                render: (text, record) => {

                    return (
                        <div>
                            <Img src={media.getMediaUrl(record.thumbMediaId)} alt=""
                                 style={{'width': '50px', 'height': '50px'}}/>
                        </div>
                    );

                }
            }, {
                title: '标题',
                dataIndex: 'title',
            }, {
                title: '作者',
                dataIndex: 'author',
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

            },
            {
                title: '发布状态',
                dataIndex: 'contentStatus',
                render: (text, record) => {

                    let contentStatus = '';
                    switch (record.contentStatus) {
                        case 'edit':
                            contentStatus = '未发布';
                            break;
                        case 'published':
                            contentStatus = '已发布';
                            break;
                    }

                    return (
                        <div>
                            {contentStatus}
                        </div>
                    );

                }
            }, {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    return (
                        <div className="operation">
                            <Button onClick={()=>edit(record.id)}>编辑</Button>
                            <Button onClick={()=>deleteContentHot(record.id)}>删除</Button>
                            <a className="ant-btn" target="_blank" href={'marketing.html#/content/detail/' + record.id}>查看</a>
                            <Button onClick={()=>updateContentHot(record)}>
                                {record.contentStatus == 'edit' ? '发布' : '取消发布'}
                            </Button>
                        </div>
                    );
                }
            }];

        const pagination = {
            total: total,
            showSizeChanger: true,
            defaultPageSize: config.SIZE,
            onShowSizeChange: (page, size)=> {
                this.setState({
                    size: size
                }, ()=>list((page - 1), size));
            },
            onChange: (page)=> {
                list((page - 1), this.state.size);
            }
        };

        return (
            <Table rowKey={record => record.id}
                   columns={columns}
                   pagination={pagination}
                   dataSource={data}
                   loading={loading}
                   bordered/>
        );
    }
}
