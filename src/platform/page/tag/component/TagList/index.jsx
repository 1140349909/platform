import React, {Component} from 'react';
import {Table} from 'antd';

export default class TagList extends Component {

    constructor(props) {
        super(props);
    }

    state = {};

    render() {

        let {loading, data, updateTagStatus, show, rename, move} = this.props;

        let dataSource = [];

        data.map((item)=> {

            let children = [];

            item.tags.map((tag, index)=> {
                children.push({
                    id: item.id,
                    key: item.id + index,
                    disabled: tag.disabled,
                    name: tag.name,
                    seq: tag.seq,
                    tagId: tag.tagId ? tag.tagId : item.id,
                });
            });

            dataSource.push({
                id: item.id,
                key: item.id,
                disabled: item.disabled,
                name: item.name,
                seq: item.seq,
                tagType: item.tagType,
                children: children
            });

        });

        const columns = [
            {
                title: '序号',
                dataIndex: 'seq',
                key: 'seq',
            },
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '状态',
                dataIndex: 'disabled',
                key: 'disabled',
                render: (status)=> {

                    let disabled = '';

                    if (status == '' || status == false) {
                        disabled = '启用';
                    } else {
                        disabled = '禁用';
                    }

                    return (
                        <div>
                            {disabled}
                        </div>
                    );
                }
            }, {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    return (
                        <div>

                            <a href="javascript:;" onClick={()=>move(record, 'up')}>
                                上移
                            </a>
                            <span className="ant-divider"></span>

                            <a href="javascript:;" onClick={()=>move(record, 'down')}>
                                下移
                            </a>
                            <span className="ant-divider"></span>

                            <a href="javascript:;" onClick={()=>updateTagStatus(record)}>
                                {record.disabled ? '启用' : '禁用'}
                            </a>
                            <span className="ant-divider"></span>
                            <a href="javascript:;" onClick={()=>rename(record)}>改名</a>

                            {record.children &&
                            <span>
                                <span className="ant-divider"></span>
                                <a href="javascript:;" onClick={()=>show(record.id)}>统计</a>
                                {/*<span className="ant-divider"></span>
                                 <a href="javascript:;" disabled={!record.disabled} onClick={()=>deleteTag(record.id)}>删除</a>*/}
                            </span>
                            }

                        </div>

                    );
                }
            }];

        return (
            <Table columns={columns}
                   dataSource={dataSource}
                   loading={loading}
                   bordered/>
        );
    }
}
