import React from 'react';
import PageBase from 'common/base/PageBase';
import {message, Modal} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as moduleAction from '../../store/module/action';
import * as tagAction from '../../store/tag/action';
import ModuleHeader from './component/ModuleHeader';
import ConfigList from './component/ConfigList';
import ConfigForm from './component/ConfigForm';
import ModuleForm from './component/ModuleForm';
import AddTagLinksForm from './component/AddTagLinksForm';

@connect(
    state => ({
        operation: state.operation,
        module: state.module.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...moduleAction,
            ...tagAction
        }, dispatch)
    })
)
export default class extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        viewType: 'list',
        viewParam: null,
        viewData: null
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case tagAction.DELETE_TAG_LINKS_SUCCESS:
                message.success('移除菜单与功能的关联关系成功!');
                this.list();
                break;
        }
    }

    componentDidMount() {
        this.list();
    }

    refresh = ()=> {
        this.reset();
        this.list();
    }

    list() {
        this.props.actions.getPlatformModuleInfo();
    }

    addModule = ()=> {
        this.showView('ModuleForm', null, {});
    }

    // 修改模块
    editModule = (id)=> {
        this.showView('ModuleForm', id, {});
    }

    // 添加标签
    addMenu = ({rootTagId, parentId})=> {
        this.showView('ConfigForm', {
            rootTagId,
            parentId
        }, {});
    }

    // 修改标签
    editMenu = ({rootTagId, parentId, tagId}, item)=> {
        this.showView('ConfigForm', {
            rootTagId,
            parentId,
            tagId
        }, item);
    }

    // 添加模块到标签中
    addTagLinks = ({rootTagId, tagId})=> {
        this.showView('AddTagLinksForm', {rootTagId, tagId}, {});
    }

    // 从标签中删除标签
    deleteTagLinks = ({rootTagId, tagId, linkIds})=> {
        Modal.confirm({
            title: '移除菜单与功能的关联关系',
            content: '确定要从此菜单移除该功能吗？',
            onOk: ()=> {
                this.props.actions.deleteTagLinks({
                    rootTagId,
                    tagId,
                    linkIds
                });
            }
        });
    }


    render() {
        const {module, operation} = this.props;

        const {viewData, viewParam} = this.state;

        // 是否显示loading
        const isListLoading = operation.type == moduleAction.GET_PLATFORM_MODULE_INFO_PENDING;

        const isSaveLoading = operation.type == moduleAction.ADD_PLATFORM_MODULE_PENDING || operation.type == moduleAction.UPDATE_PLATFORM_MODULE_PENDING;

        return (
            <div className="app-page  app-page-white">
                <ModuleHeader activeKey="/module/config"/>
                <ConfigList data={module.tree}
                            loading={isListLoading}
                            onAddMenu={this.addMenu}
                            onEditMenu={this.editMenu}
                            onEditModule={this.editModule}
                            onAddTagLinks={this.addTagLinks}
                            onDeleteTagLinks={this.deleteTagLinks}/>

                {this.isShowView('ConfigForm') &&
                <ConfigForm
                    rootTagId={viewParam.rootTagId}
                    parentId={viewParam.parentId}
                    tagId={viewParam.tagId}
                    data={viewData}
                    loading={isSaveLoading}
                    visible={true}
                    onReset={this.reset}
                    onSaveSuccess={this.refresh}/>
                }

                {this.isShowView('AddTagLinksForm') &&
                <AddTagLinksForm
                    rootTagId={viewParam.rootTagId}
                    tagId={viewParam.tagId}
                    visible={true}
                    onReset={this.reset}
                    onSaveSuccess={this.refresh}/>
                }

                {this.isShowView('ModuleForm') &&
                <ModuleForm
                    id={viewParam}
                    visible={true}
                    onReset={this.reset}
                    onSaveSuccess={this.refresh}/>
                }
            </div>
        );
    }
}




