import React, {Component} from 'react';
import {Table} from 'antd';
import config from 'common/config';
import {dateFormat} from 'common/util';
import BulkItem from 'common/component/BulkItem';
import './index.less';

export default class ContentBulkList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let {deleteContentBulk, edit, total, list, data, loading} = this.props;

        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
            }, {
                title: '内容',
                dataIndex: 'content',
                render: (text)=> {
                    return (
                        <BulkItem className="content-bulk-list-preview" html={text}/>
                    );
                },
                width: 350
            }, {
                title: '最后修改日期',
                dataIndex: 'lastModifiedDate',
                render: (text) => {

                    return (
                        <div>
                            {dateFormat(new Date(parseInt(text)), 'yyyy-MM-dd hh:mm:ss')}
                        </div>
                    );

                }

            }, {
                title: '资讯块类型',
                dataIndex: 'bulkType',
                render: (text) => {

                    let bulkType = '';

                    let radioOptions = [
                        {label: '标题', value: 'bt'},
                        {label: '图文', value: 'tw'},
                        {label: '关注', value: 'gz'},
                        {label: '二维码', value: 'qr'},
                        {label: '分隔符', value: 'fgf'},
                        {label: '模板', value: 'tpl'},
                    ];

                    radioOptions.map((item)=> {

                        if (item.value == text) {
                            bulkType = item.label;
                        }
                    });

                    return (
                        <span>
                            {bulkType}
                        </span>
                    );
                }

            }, {
                title: '资源类型',
                dataIndex: 'resType',
                render: (text) => {

                    let resType = [];

                    let options = [
                        {label: '活动', value: 'h5'},
                        {label: '图文', value: 'content'},
                        {label: '商品', value: 'product'},
                        {label: '互动', value: 'interact'},
                        {label: '外链', value: 'links'},
                    ];

                    for (let i = 0; i < text.length; i++) {
                        options.map((item)=> {
                            if (item.value == text[i]) {
                                resType.push(item.label);
                            }
                        });
                    }

                    return (
                        <span>
                            {resType.toString()}
                        </span>
                    );
                }

            }, {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    return (
                        <span>
                            <a href="javascript:;" onClick={()=>edit(record.id, record.bulkType)}>编辑</a>
                            <span className="ant-divider"></span>
                            <a href="javascript:;" onClick={()=>deleteContentBulk(record.id, record.bulkType)}>删除</a>
                        </span>
                    );
                }
            }];

        const pagination = {
            total: total,
            showSizeChanger: true,
            defaultPageSize: config.SIZE,
            onShowSizeChange: (page, size)=> {
                this.setState({
                    page: page - 1,
                    size: size
                }, ()=>list((page - 1), size));
            },
            onChange: (page)=> {
                this.setState({
                    page: page - 1
                }, ()=>list((page - 1), this.state.size));
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
