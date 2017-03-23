import React from 'react';
import PageBase from 'common/base/PageBase';
import {AUDIT_TEXT} from 'common/config/constants';
import {Table, Modal, message} from 'antd';
import Img from 'common/component/Img'
import './index.less';
const confirm = Modal.confirm;

export default class SuperviseList extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        showReasonModal: false,
        handleEvent: null,
        id: '',
        status: '',
        page: 1,
        size: ''
    };

    componentDidUpdate(prevProps) {
        //当切换Tab的时候渲染列表
        if (this.props.auditStatus != prevProps.auditStatus) {
            this.setState({
                page: 1
            });
        }
    }

    _renderColumns = () => {
        const {auditStatus} = this.props;
        let columns = [
            {
                title: '审核ID',
                dataIndex: 'id',
            }, {
                title: '封面',
                dataIndex: 'imgUrl',
                render: (val) => {
                    return (
                        <Img src={val} width={40}/>
                    );
                }
            }, {
                title: '作品名称',
                dataIndex: 'resOwner.title'
            }, {
                title: '价格/乐豆',
                dataIndex: 'resOwner.ledou',
                render: (val) => {
                    return (
                        (val || val == 0) ? val : '未定价'
                    );
                }
            }
        ];
        let commonColumns2 = [
            {
                title: '作者账号',
                dataIndex: 'resOwner.accountName'
            }, {
                title: '作者昵称',
                dataIndex: 'resOwner.nickname'
            }, {
                title: '提交审核时间',
                dataIndex: 'createdDate'
            },
        ];
        if (auditStatus == 's39') {
            columns = columns.concat([{
                title: '重上架原因',
                dataIndex: 'content'
            }]);
        }
        columns = columns.concat(commonColumns2);
        //已上架
        if (auditStatus == 's46' || auditStatus == 's49') {
            columns = columns.concat([{
                title: auditStatus == 's49' ? '下架时间' : '上架时间',
                dataIndex: 'applyDate'
            }]);
        }
        //已下架
        if (auditStatus == 's49' || auditStatus == 's29') {
            columns = columns.concat([{
                title: '原因',
                dataIndex: 'content'
            }]);
        }
        if (auditStatus == 'all') {
            columns = columns.concat([{
                title: '状态',
                dataIndex: 'auditStatus',
                render: (val) => {
                    return this._renderAuditStatus(val);
                }
            }]);
        }
        let handerColumn = [{
            title: '操作',
            dataIndex: 'operation',
            render: (val, record) => {
                return this._renderHandleEvent(record);
            }
        }];
        columns = columns.concat(handerColumn);
        return columns;
    }

    _renderAuditStatus = (auditStatus) => {
        return AUDIT_TEXT[auditStatus] ? AUDIT_TEXT[auditStatus] : '待提交';
    }

    _renderHandleEvent = (record) => {
        const {auditStatus} = this.props;
        return (
            <div className='supervise-handle'>
                {
                    auditStatus == 's11' &&
                    <div>
                        <a onClick={() => this.auditResources({id: record.id, auditStatus: 's26'})}>通过</a>
                        <a onClick={() => this.props.showReasonModal({id: record.id, auditStatus: 's29'})}>不通过</a>
                        <a onClick={() => this.props.edit(record, false)}>修改</a>
                        <a onClick={() => this.props.showAuditRecord(record)}>审核记录</a>
                        <a onClick={() => this.props.preview(record)}>详情</a>
                    </div>
                }
                {
                    auditStatus == 's26' &&
                    <div>
                        <a onClick={() => this.props.edit(record, true)}>修改</a>
                        <a onClick={() => this.willShelfGoods(record.id, 's36', '待上架', record.resOwner.ledou)}>待上架</a>
                        <a onClick={() => this.props.showAuditRecord(record)}>审核记录</a>
                        <a onClick={() => this.props.preview(record)}>详情</a>
                    </div>
                }
                {
                    auditStatus == 's36' &&
                    <div>
                        <a onClick={() => this.props.edit(record, false)}>修改</a>
                        <a onClick={() => this.shelfGoods(record.id, 's46', '待上架')}>上架</a>
                        <a onClick={() => this.props.showAuditRecord(record)}>审核记录</a>
                        <a onClick={() => this.props.preview(record)}>详情</a>
                    </div>
                }
                {
                    auditStatus == 's46' &&
                    <div>
                        <a onClick={() => this.props.edit(record, false)}>修改</a>
                        <a onClick={() => this.props.showReasonModal({id: record.id, auditStatus: 's49'})}>下架</a>
                        <a onClick={() => this.props.showAuditRecord(record)}>审核记录</a>
                        <a onClick={() => this.props.preview(record)}>详情</a>
                    </div>
                }
                {
                    auditStatus == 's49' &&
                    <div>
                        <a onClick={() => this.props.showReasonModal({id: record.id, auditStatus: 's46'})}>上架</a>
                        <a onClick={() => this.props.showAuditRecord(record)}>审核记录</a>
                        <a onClick={() => this.props.preview(record)}>详情</a>
                    </div>
                }
                {
                    auditStatus == 's29' &&
                    <div>
                        <a onClick={() => this.props.edit(record, false)}>修改</a>
                        <a onClick={() => this.props.showReasonModal({id: record.id, auditStatus: 's26'})}>通过</a>
                        <a onClick={() => this.props.showAuditRecord(record)}>审核记录</a>
                        <a onClick={() => this.props.preview(record)}>详情</a>
                    </div>
                }
                {
                    auditStatus == 'all' &&
                    <div>
                        <a onClick={() => this.props.showAuditRecord(record)}>审核记录</a>
                        <a onClick={() => this.props.preview(record)}>详情</a>
                    </div>
                }
            </div>
        );
    }
    auditResources = ({id, auditStatus, content}) => {
        this.props.auditResources({id, auditStatus, content});
    }
    handleEvent = (checkReason) => {
        this.auditResources({
            id: this.state.id,
            auditStatus: this.state.status,
            content: checkReason
        });
    }
    //上架
    shelfGoods = (id, auditStatus, content) => {
        confirm({
            title: '提示?',
            content: '确认要上架',
            onOk: () => {
                this.props.auditResources({
                    id,
                    auditStatus,
                    content
                });
            },
        });
    }
    //待上架
    willShelfGoods = (id, auditStatus, content = 'test', ledou) => {
        if (ledou || ledou == 0) {
            confirm({
                title: '提示?',
                content: '进入待上架状态',
                onOk: () => {
                    this.props.auditResources({
                        id,
                        auditStatus,
                        content
                    });
                },
            });
        } else {
            message.error('模板还未定价');
            return;
        }
    }

    render() {
        const data = this.props.data;
        const pagination = {
            total: data && data.totalElements,
            pageSize: data && data.size,
            current: this.state.page,
            onChange: (page) => {
                this.setState({
                    page: page
                }, () => {
                    this.props.list({
                        page: (page - 1),
                        status: this.props.auditStatus == 'all' ? null : this.props.auditStatus,
                        size: data.size
                    });
                });
            }
        };
        return (
            <div>
                <Table rowKey={record => record.id}
                       columns={this._renderColumns()}
                       dataSource={data && data.content}
                       pagination={pagination}
                       bordered/>
            </div>
        );
    }
}
