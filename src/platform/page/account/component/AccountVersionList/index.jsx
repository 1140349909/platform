import React, {Component} from 'react';
import {Table} from 'antd';
import config from 'common/config';
import {booleanToString, moneyFormat} from '/common/util';
import './index.less';

export default class AccountVersionList extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        page: 0,
        size: config.SIZE
    };

    render() {

        const {
            data, loading,
            showSetRights, showSetAuth,
            list, edit, copyVersion,
            deleteVersion,
            switchVersionStatus
        } = this.props;

        const columns = [
            {
                title: '版本名称',
                className: 'text-center',

                dataIndex: 'name',
            }, {
                title: '版本等级',
                className: 'text-center',

                dataIndex: 'version',
            }, {
                title: '刊例价格',
                className: 'text-center',
                dataIndex: 'price',
                render: (text)=> {
                    return (
                        <div>
                            {moneyFormat(text,'￥')}
                        </div>
                    );
                }
            }, {
                title: '有效期',
                dataIndex: 'expiry',
                className: 'text-center',
                render: (text, record)=> {

                    let expiryUnit = {
                        'year': '年',
                        'day': '天'
                    };

                    return (
                        <div>
                            {text}{expiryUnit[record.expiryUnit]}
                        </div>
                    );
                }
            }, {
                title: '是否为默认版本',
                dataIndex: 'default',
                className: 'text-center',
                render: (text)=> {

                    let defaultStatus = {
                        'false': '否',
                        'true': '是'
                    };

                    return (
                        <div>
                            {defaultStatus[booleanToString(text)]}
                        </div>
                    );
                }
            }, {
                title: '管理员备注',
                className: 'text-center',
                dataIndex: 'memo'
            }, {
                title: '状态',
                dataIndex: 'disabled',
                className: 'text-center',
                render: (text)=> {

                    let ruleStatus = {
                        'false': '启用',
                        'true': '禁用'
                    };

                    return (
                        <div>
                            {ruleStatus[booleanToString(text)]}
                        </div>
                    );
                }
            }, {
                title: '操作',
                className: 'text-center',
                render: (text, record)=> {

                    let ruleStatus = {
                        'false': '禁用',
                        'true': '启用'
                    };

                    return (
                        <div>
                            <a href="javascript:;" onClick={()=>showSetAuth(record.id)}>
                                开通服务
                            </a>
                            <span className="ant-divider"></span>
                            <a href="javascript:;" onClick={()=>showSetRights(record.id)}>
                                权益配置
                            </a>
                            <span className="ant-divider"></span>
                            <a href="javascript:;" onClick={()=>edit(record.id)}>
                                修改
                            </a>
                            <span className="ant-divider"></span>
                            <a href="javascript:;" onClick={()=>switchVersionStatus(record)}>
                                {ruleStatus[booleanToString(record.disabled)]}
                            </a>
                            <span className="ant-divider"></span>
                            <a href="javascript:;" onClick={()=>copyVersion(record.id)}>
                                复制
                            </a>
                            <span className="ant-divider"></span>
                            <a href="javascript:;" onClick={()=>deleteVersion(record.id)}>
                                删除
                            </a>
                        </div>
                    );
                }
            }];

        const pagination = {
            total: data.totalElements,
            defaultPageSize: config.SIZE,
            showSizeChanger: true,
            onShowSizeChange: (page, size)=> {
                this.setState({
                    page,
                    size
                }, ()=>list(page - 1, size));
            },
            onChange: (page)=> {
                list((page - 1), this.state.size);
            }
        };

        return (
            <Table rowKey={record => record.id}
                   columns={columns}
                   pagination={pagination}
                   dataSource={data.content}
                   loading={loading}
                   bordered/>
        );
    }
}
