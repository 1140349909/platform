import React from 'react';
import {Table, Modal, message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import TableListBase from 'common/base/TableListBase';
import * as versionAction from '../../../store/version/action';
import * as tagAction from '../../../store/tag/action';
import config from 'common/config';

@connect(
    state => ({
        operation: state.operation,
        data: state.version.toJS().platModule
    }),
    dispatch => ({
        actions: bindActionCreators({
            getVersionModuleList: versionAction.getVersionModuleList,
            addTagLinks: tagAction.addTagLinks
        }, dispatch)
    })
)
export default class extends TableListBase {

    state = {
        page: 0,
        size: config.SIZE,
        linkIds: []
    }

    componentDidMount() {
        this.list({});
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case tagAction.ADD_TAG_LINKS_SUCCESS:
                message.success('功能关联成功!');
                this.props.onSaveSuccess();
                break;
        }
    }

    list = (params)=> {
        this.setState(params, ()=> {
            const {page, size} = this.state;
            this.props.actions.getVersionModuleList({
                page,
                size,
                tagId: this.props.rootTagId,
                used: false
            });
        });
    }

    // 获取列配置
    getColumns() {
        return [{
            title: '功能名称',
            dataIndex: 'name',
            width: this.getTableColumnWidth(15)
        }, {
            title: '功能标识',
            dataIndex: 'key',
            width: this.getTableColumnWidth(10)
        }, {
            title: '业务角色',
            dataIndex: 'roles',
            width: this.getTableColumnWidth(15)
        }];
    }

    getRowSelection() {
        return {
            onChange: (selectedRowKeys) => {
                this.setState({
                    linkIds: selectedRowKeys
                });
            }
        };
    }

    onList = (params)=> {
        this.list(params);
    }

    handleSubmit = ()=> {
        const {rootTagId, tagId}= this.props;
        const {linkIds} = this.state;
        if (_.isEmpty(linkIds)) {
            message.warning('请选择要关联的功能点');
            return;
        }

        this.props.actions.addTagLinks({
            rootTagId,
            tagId,
            linkIds
        });
    }

    render() {
        const {onReset, visible, data, operation} = this.props;

        // 是否显示loading
        const confirmLoading = operation.type == tagAction.ADD_TAG_LINKS_PENDING;

        const loading = operation.type == versionAction.GET_VERSION_MODULE_LIST_PENDING;

        const columns = this.getColumns();

        return (
            <Modal title="关联功能点"
                   width="800px"
                   confirmLoading={confirmLoading}
                   visible={visible}
                   onCancel={onReset}
                   onOk={this.handleSubmit}>
                <Table bordered
                       rowKey="id"
                       scroll={{y: 300}}
                       dataSource={data.content}
                       columns={columns}
                       pagination={this.getPagination()}
                       rowSelection={this.getRowSelection()}
                       loading={loading}/>
            </Modal>
        );
    }
}
