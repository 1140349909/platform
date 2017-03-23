import React from 'react';
import {Table, Button} from 'antd';
import _ from 'lodash';
import IconFont from 'common/component/IconFont';
import TableListBase from 'common/base/TableListBase';

export default class extends TableListBase {
    // 获取列配置
    getColumns() {
        const {onEditModule, onAddMenu, onEditMenu, onAddTagLinks, onDeleteTagLinks} = this.props;
        return [{
            title: '菜单名称',
            dataIndex: 'name',
            render: (text, record)=> {
                return '[' + (isNaN(record.seq) ? 0 : record.seq) + '] - ' + text;
            }
        }, {
            title: 'Icon',
            dataIndex: 'icon',
            render: (text)=> {
                if (text) {
                    return (<IconFont type={text}/>);
                } else {
                    return null;
                }
            }
        }, {
            title: '菜单标识',
            dataIndex: 'key'
        }, {
            title: 'URI',
            dataIndex: 'uri'
        }, {
            title: '排序',
            dataIndex: 'seq'
        }, {
            title: '操作',
            width: 300,
            dataIndex: 'operation',
            render: (text, record)=> {
                return (
                    <div className="operation">
                        {(record.level < 3 && record.level > 0) &&
                        <Button onClick={()=>onEditMenu({
                            rootTagId: record.rootId,
                            parentId: record.parentId,
                            tagId: record.tagId
                        }, record)}>编辑菜单</Button>}

                        {(record.level < 2) &&
                        <Button onClick={()=>onAddMenu({
                            rootTagId: record.rootId,
                            parentId: record.level == 0 ? undefined : record.tagId
                        })}>新增子菜单</Button>}

                        {record.level == 2 &&
                        <Button onClick={()=>onAddTagLinks({
                            rootTagId: record.rootId,
                            tagId: record.tagId,
                        })}>关联功能</Button>}

                        {record.level == 3 &&
                        <Button onClick={()=>onEditModule(record.id)}>编辑功能</Button>}

                        {record.level == 3 &&
                        <Button onClick={()=>onDeleteTagLinks({
                            rootTagId: record.rootId,
                            tagId: record.parentId,
                            linkIds: record.id
                        })}>解除关联</Button>}
                    </div>
                );
            }
        }];
    }

    getDefaultExpandedRowKeys(tree) {
        var keys = [];

        var convert = function (list) {
            list.map((v)=> {
                if (v.id) {
                    keys.push(v.id);
                }

                if (_.isArray(v.children)) {
                    convert(v.children);
                }
            });
        };

        convert(tree);

        return keys;
    }

    render() {
        const {data, loading} = this.props;

        if (_.isEmpty(data)) {
            return null;
        }

        const dataSource = this.convertTree(data, 'tagId', ['tags', 'modules']);

        let defaultExpandedRowKeys = this.getDefaultExpandedRowKeys(dataSource);

        return (
            <Table bordered
                   rowKey="id"
                   size="middle"
                   loading={loading}
                   columns={this.getColumns()}
                   pagination={false}
                   defaultExpandedRowKeys={defaultExpandedRowKeys}
                   dataSource={dataSource}/>
        );
    }
}
