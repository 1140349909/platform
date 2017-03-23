import React, {Component} from 'react';
import * as media from 'common/util/media';
import {dateFormat} from 'common/util/index';
import {Card, Button, Table} from 'antd';
import Img from 'common/component/Img';
import './index.less';


export default class CommentList extends Component {

    constructor(props) {
        super(props);
    }

    state = {};

    moduleTypeCheck = (data) => {

        const moduleList = [{
            'type': 'mall',
            'name': '商城'
        }, {
            'type': 'yyg',
            'name': '一元购'
        }];

        if (data.mall) {
            return {
                'name': moduleList[0].name,
                'cfg': data.mall
            };
        } else {
            return {
                'name': moduleList[1].name,
                'cfg': data.yyg
            };
        }
    };

    render() {

        const columns = [{
            title: '参与期号',
            dataIndex: 'issueNo',
            key: 'issueNo',
            render: (text, record) => {

                return (
                    <div>
                        第{record.issueNo}期
                    </div>

                );

            }
        }, {
            title: '商品名称',
            dataIndex: 'productName',
            key: 'productName'
        }, {
            title: '晒单时间',
            dataIndex: 'date',
            key: 'date',
            render: (text, record) => {

                return (
                    <div>{dateFormat(new Date(record.date), 'yyyy-MM-dd')}</div>
                );

            }
        }, {
            title: '晒单评论',
            dataIndex: 'content',
            key: 'content'
        }, {
            title: '晒单图片',
            dataIndex: 'imgIds',
            key: 'imgIds',
            render: (text, record) => {

                const images = [];

                for (let i = 0; i < record.imgIds.length; i++) {

                    images.push(
                        <Img src={record.imgIds[i]}
                             key={i}
                             alt=""
                             style={{width: '60px', height: '60px', 'display': 'inline-block', 'margin': '5px'}}
                        />
                    );

                }

                return (
                    <div>
                        {images}
                    </div>

                );
            }
        }, {
            title: '审核处理',
            dataIndex: 'process',
            key: 'process',
            render: (text, record) => {
                return (
                    <div>
                        <Button className="comment-btn" onClick={() => this.props.showInfo(record.id)}>查看详情</Button>
                        <Button className="comment-btn"
                                onClick={() => this.props.deleteComment(record.id)}>强制删除</Button>
                    </div>
                );
            }
        }];


        let extra =
            <div>
                晒单总数：<span>{this.props.total}</span>
            </div>;

        const dataList = this.props.data != undefined ? this.props.data : [];

        const dataSource = [];

        for (let i = 0; i < dataList.length; i++) {

            let data = {
                index: i + 1,
                id: dataList[i].id,
                issueNo: dataList[i].issueNo,
                productName: dataList[i].productName,
                date: dataList[i].lastModifiedDate,
                content: dataList[i].content,
                imgIds: dataList[i].imgIds
            };
            dataSource.push(data);
        }

        //分页
        const pagination = {
            total: this.props.total,
            showSizeChanger: true,
            onShowSizeChange: (page, size) => {
                this.props.list(0, size);
            },
            onChange: (page) => {
                this.props.list((page - 1));
            }
        };

        return (
            <Card style={{'height': '100%', 'overflowY': 'scroll'}} title="晒单管理" extra={extra}>
                <Table rowKey={record => record.id}
                       columns={columns}
                       loading={this.props.loading}
                       pagination={pagination}
                       dataSource={dataSource}
                       bordered/>
            </Card>
        );
    }
}
