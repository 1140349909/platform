import React from 'react';
import {Table, Select} from 'antd';
import TableListBase from 'common/base/TableListBase';
const Option = Select.Option;

export default class UserList extends TableListBase {

    constructor(props) {
        super(props);
    }

    state = {};

    getColumns = () => {
        return [{
            title: 'ID',
            dataIndex: 'id',
            width: this.getTableColumnWidth(15)
        }, {
            title: '名称',
            dataIndex: 'name',
            width: this.getTableColumnWidth(8),
            render: (text) => text ? text : '-'
        }, {
            title: '登陆手机',
            dataIndex: 'mobile',
            width: this.getTableColumnWidth(7),
            render: (text) => text ? text : '-'
        }, {
            title: '登陆邮箱',
            dataIndex: 'email',
            width: this.getTableColumnWidth(10),
            render: (text) => text ? text : '-'
        }, {
            title: '昵称',
            dataIndex: 'nickName',
            width: this.getTableColumnWidth(8),
            render: (text) => text ? text : '-'
        }, {
            title: '性别',
            dataIndex: 'sex',
            width: this.getTableColumnWidth(2),
            render: (text) => text == 'M' ? '男' : '女'
        }, {
            title: '生日',
            width: this.getTableColumnWidth(6),
            dataIndex: 'birthday',
            render: (text) => this.outDateTime(text, 'yyyy-MM-dd', '-')
        }, {
            title: '状态',
            width: this.getTableColumnWidth(3),
            dataIndex: 'status',
            render: (text, record) => {
                let status = {
                    ACTIVATED:'已激活',
                    INVALIDATED:'未通过',
                };

                return (
                    <span>
                        {status[record.status]?status[record.status]:'待审核'}
                    </span>
                );
            }
        }, {
            title: '角色',
            width: this.getTableColumnWidth(10),
            dataIndex: 'roles',
            render: (text) => {
                return (
                    <span>
                        {text.join(',')}
                    </span>
                );
            }
        }, {
            title: 'platform',
            width: this.getTableColumnWidth(6),
            dataIndex: 'platform'
        }, {
            title: 'channel',
            width: this.getTableColumnWidth(6),
            dataIndex: 'channel'
        }, {
            title: 'ip',
            width: this.getTableColumnWidth(20),
            dataIndex: 'ip',
            render: (text, record) => text ? (<span>{text}({record.ipAdr?record.ipAdr:'未知归属地'})</span>) : '-'
        }, {
            title: '注册日期',
            width: this.getTableColumnWidth(9),
            dataIndex: 'createdDate',
            render: (text) => this.outDateTime(text)
        }, {
            title: '最后修改时间',
            width: this.getTableColumnWidth(9),
            dataIndex: 'lastModifiedDate',
            render: (text) => this.outDateTime(text)
        },/* {
            title: '用户等级',
            width: this.getTableColumnWidth(20),
            dataIndex: 'ulevel',
            children: [{
                title: '平台',
                dataIndex: 'ulevel.platform',
                key: 'ulevelPlatform',
                width: this.getTableColumnWidth(4),
                render: (text, record) => text ? (<span>{text}</span>) : '-'
            }, {
                title: '识别码',
                dataIndex: 'ulevel.lv',
                key: 'lv',
                width: this.getTableColumnWidth(4),
                render: (text, record) => text ? (<span>{text}</span>) : '-'
            }, {
                title: '全称',
                dataIndex: 'ulevel.ln',
                key: 'ln',
                width: this.getTableColumnWidth(4),
                render: (text, record) => text ? (<span>{text}</span>) : '-'
            }, {
                title: '缩写',
                dataIndex: 'ulevel.lc',
                key: 'lc',
                width: this.getTableColumnWidth(4),
                render: (text, record) => text ? (<span>{text}</span>) : '-'
            }],
        }, */{
            title: '平台级别',
            fixed: 'right',
            width: this.getTableColumnWidth(8),
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    <div>
                        <Select style={{'width':'100%'}}
                                defaultValue={record.ulevel?record.ulevel.ln:'regular'}
                            onChange={(value) => this.props.handleUser(record, value)}>
                            <Option value="regular">普通用户</Option>
                            <Option value="employee">公司员工</Option>
                            <Option value="valuer">设计师</Option>
                            <Option value="business">商业用户</Option>
                        </Select>
                        {/*<a href="javascript:;" onClick={() => this.props.handleUser(record)}>
                         {!record.ulevel && '设为V用户'}
                         {record.ulevel && record.ulevel.lv == 999200 && ''}
                         </a>*/}
                    </div>
                );
            }
        }];
    }

    render() {

        const columns = this.getColumns();
        const {loading, data} = this.props;
        return (
            <Table rowKey="id"
                   scroll={{x: this.getTableColumnsX(columns)}}
                   columns={columns}
                   pagination={this.getPagination()}
                   dataSource={data.content}
                   loading={loading}
                   bordered/>
        );
    }
}
