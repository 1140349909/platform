import React, {Component} from 'react';
import {Modal, Button, Table} from 'antd';
import {AUDIT_TEXT} from 'common/config/constants';
import './index.less';
import {dateFormat} from 'common/util';
let rounds = 0;
export default class AuditRecord extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        confirmLoading: false,
    };

    render() {
        rounds = 0;
        const footer = <Button onClick={this.props.reset}>确定</Button>;
        const {data} = this.props;
        const {resAudits} = data;
        const columns = [
            {
                title: '审核轮数',
                dataIndex: 'seq',
                key: 'seq',
                render: (val, record) => {
                    if (record.auditStatus == 's11') {
                        ++rounds;
                        return (<div className='record-rounds'>第{rounds}轮</div>);
                    } else {
                        return null;
                    }
                }
            }, {
                title: '审核状态',
                dataIndex: 'auditStatus',
                key: 'auditStatus',
                render: (val) => {
                    return (<span className='record-desc'>{AUDIT_TEXT[val]}</span>);
                }
            }, {
                title: '审核时间',
                dataIndex: 'createdDate',
                key: 'createdDate',
                render: (val) => {
                    return (<div>
                        <div className='record-child'>{dateFormat(val, 'yyyy-MM-dd')}</div>
                        <div className='record-child'>{dateFormat(val, 'hh:mm:ss')} </div>
                    </div>);
                }
            }, {
                title: '其它信息',
                dataIndex: 'createdUser',
                key: 'createdUser',
                render: (val, record) => {
                    return (<div>
                        <div className='record-child'>{record.createdUser}</div>
                        <div className='record-child '>{record.content ? '【原因】：' + record.content : ''}</div>
                    </div>);
                }
            }];
        return (
            <Modal title='审核记录'
                   visible={this.props.visible}
                   onCancel={this.props.reset}
                   maskClosable={false}
                   confirmLoading={this.state.confirmLoading}
                   className='auditRecordModal'
                   footer={footer}
                   width={600}
                   style={{'maxHeight': '500px'}}
            >
                <p className='current-record-status'>
                    该模板目前的状态：第<span>{data.rounds}</span>轮，<span>{AUDIT_TEXT[data.auditStatus]}</span>
                </p>
                <Table columns={columns}
                       dataSource={resAudits}
                       pagination={false}
                       bordered/>
            </Modal>
        );
    }
}
