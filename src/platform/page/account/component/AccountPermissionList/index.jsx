import React, {Component} from 'react';
import {Table} from 'antd';
import config from 'common/config';
import {booleanToString} from '/common/util';
import './index.less';

export default class AccountPermissionList extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        page:0,
        size:config.SIZE
    };

    render() {

        const {data, loading,
            list,edit,copyAccountType,
            switchAccountTypeStatus} = this.props;

        const columns = [
            {
                title: '岗位分类',
                className:'text-center',
                dataIndex: 'name',
            },  {
                title: '状态',
                dataIndex: 'disabled',
                className:'text-center',
                render:(text)=>{

                    let ruleStatus = {
                        'false':'已启用',
                        'true':'已禁用'
                    };

                    return (
                        <div>
                            {ruleStatus[booleanToString(text)]}
                        </div>
                    );
                }
            }, {
                title: '备注',
                className:'text-center',
                dataIndex: 'desc'
            }, {
                title: '操作',
                className:'text-center',
                render:(text,record)=>{

                    let ruleStatus = {
                        'false':'禁用',
                        'true':'启用'
                    };

                    return (
                        <div>
                            <a href="javascript:;" onClick={()=>edit(record.id)}>
                                修改
                            </a>
                            <span className="ant-divider"></span>
                            <a href="javascript:;" onClick={()=>switchAccountTypeStatus(record)}>
                                {ruleStatus[booleanToString(record.disabled)]}
                            </a>
                            <span className="ant-divider"></span>
                            <a href="javascript:;" onClick={()=>copyAccountType(record.id)}>
                                复制
                            </a>
                        </div>
                    );
                }
            }];

        const pagination = {
            total: data.totalElements,
            defaultPageSize:config.SIZE,
            showSizeChanger: true,
            onShowSizeChange: (page, size)=> {
                this.setState({
                    page,
                    size
                },()=>list(page-1, size));
            },
            onChange: (page)=> {
                list((page - 1),this.state.size);
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
