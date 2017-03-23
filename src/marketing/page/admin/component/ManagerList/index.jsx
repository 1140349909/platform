import React from 'react';
import {Table, Modal} from 'antd';
const confirm = Modal.confirm;
import * as module from 'common/config/module';
import AuthModule from 'common/component/AuthModule';
import AuthComponentBase from 'common/base/AuthComponentBase';
export default class ManagerList extends AuthComponentBase {
    constructor(props) {
        super(props);
    }

    state = {
        pwdVisible: false,
        name: '',
        id: '',
        size: 10,
        page: 0
    };
    //是否启用或者停用
    onEnableManager = (status, id) => {
        this.anyWhereModule(module.PLATFORM_ACCOUNT_CREATE).then(() => {
            confirm({
                title: '温馨提示',
                content: '确定' + (!status ? '停用' : '启用') + '该成员吗?',
                onOk: () => {
                    const activeStatus = status ? 'activated' : 'invalidated';
                    this.props.updateUserStatus(activeStatus, id);
                },
                onCancel() {
                },
            });
        });
    };
    handleCancel = () => {
        this.setState({
            pwdVisible: false,
        });
    };
    getColumns = () => {
        const columns = [
            {
                title: '成员类型',
                dataIndex: 'accountType',
                render: (record) => {
                    return (<span> {record}</span> );
                }
            },
            {
                title: '登录账号',
                dataIndex: 'email'
            },
            {
                title: '启用状态',
                dataIndex: 'accountStatus',
                render: (record) => {
                    return (<span> {record == 'activated' ? '已启用' : '未启用'}</span> );
                }
            },
            {
                title: '创建时间',
                dataIndex: 'createdDate'
            },
            {
                title: '邮件激活',
                dataIndex: 'status',
                render: (text, record) => {
                    const userStatus = record.userStatus;
                    return (
                        <div>
                            {
                                userStatus == 'noticed' &&
                                <a className="copyManagerInfo" style={{'color': '#999'}}>待激活</a>
                            }
                            {
                                userStatus == 'created' &&
                                <a className="copyManagerInfo"
                                   onClick={() => this.props.sendAccountMail(record.id, record.email)}>发送邮件激活</a>
                            }
                            {
                                userStatus == 'activated' &&
                                <a className="copyManagerInfo" style={{'color': '#404040'}}>已激活</a>
                            }
                        </div>

                    );
                }
            },
            {
                title: '操作',
                dataIndex: '5',
                render: (text, record) => {
                    const aBled = record.accountStatus == 'activated' ? true : false;
                    return (
                        <div>
                            <AuthModule type={module.PLATFORM_ACCOUNT_CREATE}>
                                <a onClick={() => this.onEnableManager(!aBled, record.id)}> {aBled ? '停用' : '启用'}</a>
                            </AuthModule>
                            <AuthModule type={module.PLATFORM_ACCOUNT_CREATE}>
                                <a style={{'marginLeft': 16}}
                                   onClick={() => this.props.linkAdminModifyPage(record.id)}>
                                    编辑</a>
                            </AuthModule>
                        </div>
                    );
                }
            }
        ];
        return columns;
    };

    render() {
        const columns = this.getColumns();
        const {data} = this.props;
        let pagination = {
            total: data.totalElements,//
            showSizeChanger: false,
            pageSize: data.size,
            current: this.state.page + 1,
            onChange: (current) => {
                let page = current - 1;
                this.setState({
                    page: page
                });
                let size = data.size;
                this.props.list({page, size});
            },
        };
        return (
            < Table
                rowKey="id"
                dataSource={data.content}
                columns={columns}
                pagination={pagination}
                bordered/>
        );
    }
}
