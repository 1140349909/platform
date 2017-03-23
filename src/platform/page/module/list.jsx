import React from 'react';
import PageBase from 'common/base/PageBase';
import {message, Modal, Button, Input} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ModuleHeader from './component/ModuleHeader';
import ModuleList from './component/ModuleList';
import ModuleForm from './component/ModuleForm';
import * as moduleAction from '../../store/module/action';
import * as platformAction from '../../store/platform/action';

@connect(
    state => ({
        operation: state.operation,
        module: state.module.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...moduleAction,
            platformCmd: platformAction.platformCmd
        }, dispatch)
    })
)
export default class extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        page: 0,
        size: 100,
        tagIds: '',
        viewType: 'list',
        viewParam: null,
        viewData: null
    }

    componentDidMount() {
        this.list({
            page: 0
        });
    }

    componentWillReceiveProps(nextProps) {
        const {operation, module} = nextProps;
        switch (operation.type) {
            default:
                break;
            case moduleAction.DELETE_PLATFORM_MODULE_SUCCESS:
                message.success('删除成功');
                this.list({});
                break;
            case moduleAction.GET_PLATFORM_MODULE_SUCCESS:
                this.setState({
                    viewData: module.item
                });
                break;
            case moduleAction.ADD_PLATFORM_MODULE_SUCCESS:
                this.list({page: 0});
                this.reset();
                message.success('保存成功');
                break;
            case moduleAction.UPDATE_PLATFORM_MODULE_SUCCESS:
                this.reset();
                this.list({});
                message.success('保存成功');
                break;
            case platformAction.PLATFORM_CMD_SUCCESS:
                message.success('刷新成功');
                break;
        }
    }

    refresh = (type)=> {
        this.reset();
        if (type == 'add') {
            this.list({page: 0});
        } else {
            this.list({});
        }
    }

    list = (params) => {
        this.setState(params, ()=> {
            const {page, size, tagIds} = this.state;
            this.props.actions.getPlatformModuleList({
                page,
                size,
                tagIds
            });
        });
    }

    generateCode = ()=> {
        let code = [];

        this.props.module.list.content.map((item)=> {
            code.push('export const ' + item.key + ' = \'' + item.key + '\'; //' + item.name);
        });

        this.showView('GenerateCode', null, code.join('\n'));
    }

    platformCmd = ()=> {
        this.props.actions.platformCmd('role_reload');
    }

    add = ()=> {
        this.showView('ModuleForm', null, {});
    }

    edit = (id)=> {
        this.showView('ModuleForm', id, {});
    }

    delete = (id)=> {
        Modal.confirm({
            title: '删除功能',
            content: '确定要删除此功能吗？',
            onOk: ()=> {
                this.props.actions.deletePlatformModule(id);
            }
        });
    }

    render() {
        const {module, operation} = this.props;

        const {viewParam, viewData} = this.state;

        // 是否显示loading
        const isListLoading = operation.type == moduleAction.GET_PLATFORM_MODULE_LIST_PENDING;

        const tabBarExtraContent = (
            <div>
                <Button type="primary" onClick={this.platformCmd}>刷新权限</Button>&nbsp;
                <Button type="primary" onClick={this.generateCode}>生成代码</Button>&nbsp;
                <Button type="primary"
                        onClick={this.add}>+
                    新增功能</Button></div>);

        return (
            <div className="app-page">
                <ModuleHeader activeKey="/module/list"
                              tabBarExtraContent={tabBarExtraContent}/>
                <ModuleList data={module.list}
                            loading={isListLoading}
                            onList={this.list}
                            onEdit={this.edit}
                            onDelete={this.delete}/>
                {this.isShowView('ModuleForm') &&
                <ModuleForm
                    id={viewParam}
                    visible={true}
                    onReset={this.reset}
                    onSaveSuccess={this.refresh}/>
                }

                {this.isShowView('GenerateCode') &&
                <Modal title="生成代码"
                       width="660px"
                       visible={true}
                       onCancel={this.reset}
                       onOk={this.handleSubmit}>
                    <Input type="textarea" value={viewData} autosize={{minRows: 2, maxRows: 20}}/>
                </Modal>
                }
            </div>
        );
    }
}




