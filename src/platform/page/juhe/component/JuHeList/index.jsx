import React, {Component} from 'react';
import {Table} from 'antd';
import Img from 'common/component/Img';

export default class JuHeList extends Component {

    constructor(props) {
        super(props);
    }

    state = {};

    render() {

        const columns = [
            {
                title: '标题',
                dataIndex: 'title',
                width:200
            }, {
                title: '日期',
                dataIndex: 'date'
            }, {
                title: '作者',
                dataIndex: 'author_name'
            }, {
                title: '缩略图1',
                dataIndex: 'thumbnail_pic_s',
                render: (url) => {

                    return (
                        <Img src={url} alt="" style={{'maxWidth': '100%', 'height': 100}}/>
                    );

                }
            }, {
                title: '缩略图2',
                dataIndex: 'thumbnail_pic_s02',
                render: (url) => {

                    return (
                        <Img src={url} alt="" style={{'maxWidth': '100%', 'height': 100}}/>
                    );

                }
            }, {
                title: '缩略图3',
                dataIndex: 'thumbnail_pic_s03',
                render: (url) => {

                    return (
                        <Img src={url} alt="" style={{'maxWidth': '100%', 'height': 100}}/>
                    );

                }
            }, {
                title: '链接',
                dataIndex: 'url',
                render: (url) => {

                    return (
                        <a href={url}>原始链接</a>
                    );

                }

            }, {
                title: '类型',
                dataIndex: 'type'
            }, {
                title: '分类',
                dataIndex: 'realtype',
            }];

        if(!this.props.data.list) {
            return null;
        }

        return (
            <Table rowKey={record => record.uniquekey}
                   columns={columns}
                   dataSource={this.props.data.list.result.data}
                   loading={this.props.loading}
                   bordered/>
        );
    }
}
