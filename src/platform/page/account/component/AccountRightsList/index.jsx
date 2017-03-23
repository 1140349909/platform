import React from 'react';
import PageBase from 'common/base/PageBase';
import {Table, Button, Modal, message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as versionAction from '../../store/version/action';
import AccountRightsForm from '../AccountRightsForm';
import './index.less';

@connect(
    state => ({
        operation: state.operation,
        version: state.version.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...versionAction
        }, dispatch)
    })
)
export default class AccountRightsList extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        viewParam: null,
        viewData: null
    };

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case versionAction.ADD_VERSION_RIGHTS_SUCCESS:
                message.success('配置成功！');
                this.reset();
                break;
            default:
                break;
        }
    }

    showRightsForm = (params)=> {
        this.showView('rights', {
            id: params.id,
            versionId: params.versionId
        }, params.data);
    };

    render() {

        const isShowRightsForm = this.isShowView('rights');

        const {
            visible, reset, addVersionRights,
            data, loading
        } = this.props;

        const {viewParam, viewData} = this.state;

        let footer = (
            <div>
                <Button onClick={reset}>关闭</Button>
            </div>
        );

        const columns = [
            {
                title: '标识',
                className: 'text-center',
                dataIndex: 'mark',
            },
            {
                title: '参数名称',
                className: 'text-center',
                dataIndex: 'name',
            }, {
                title: '参数类型',
                className: 'text-center',
                dataIndex: 'paraType',
                render: (text)=> {

                    let paraType = {
                        text: '文本',
                        numeric: '数字',
                        bool: '布尔',
                    };

                    return (
                        <div>
                            {paraType[text]}
                        </div>
                    );
                }
            }, {
                title: '默认值',
                className: 'text-center',
                dataIndex: 'defaultValue',
            }, {
                title: '单位',
                className: 'text-center',
                dataIndex: 'unit',
                render: (text)=> {

                    let unit = {
                        day: '天',
                        week: '周',
                        month: '月',
                        year: '年',
                        sheet: '张',
                        times: '次',
                        t_times: '千次',
                        y_t_times: '千次/年',
                        discount: '折',
                        individual: '个',
                        y_t_article: '千篇/年',
                        nounit: '无'
                    };

                    return (
                        <div>
                            {unit[text]}
                        </div>
                    );
                }
            }, {
                title: '允许购买',
                className: 'text-center',
                dataIndex: 'allowBuy',
                render: (text)=> {

                    let allowBuy = {
                        TRUE: '是',
                        FALSE: '否',
                    };

                    return (
                        <div>
                            {allowBuy[text]}
                        </div>
                    );
                }
            }, {
                title: '刊例价/乐豆',
                className: 'text-center',
                dataIndex: 'price'
            }, {
                title: '描述',
                className: 'text-center',
                dataIndex: 'desc',
            }, {
                title: '操作',
                className: 'text-center',
                render: (text, record)=> {

                    return (
                        <div>
                            <a href="javascript:;" onClick={()=>this.showRightsForm({
                                versionId: data.id,
                                id: record.ruleId,
                                data: record
                            })}>
                                修改
                            </a>
                        </div>
                    );
                }
            }];

        return (
            <div>
                <Modal title={'权益设置：' + data.name}
                       width="960px"
                       visible={visible}
                       footer={footer}
                       onCancel={reset}>
                    <Table rowKey={record => record.ruleId}
                           columns={columns}
                           dataSource={data.rights}
                           loading={loading}
                           bordered/>
                </Modal>
                {
                    isShowRightsForm && <AccountRightsForm
                        visible={isShowRightsForm}
                        param={viewParam}
                        data={viewData}
                        addVersionRights={addVersionRights}
                        reset={this.reset}
                    />
                }
            </div>
        );
    }
}
