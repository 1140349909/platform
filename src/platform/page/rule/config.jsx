import React from 'react';
import PageBase from 'common/base/PageBase';
import {message,Modal,Card,Button} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as versionAction from '../../store/version/action';
import VersionConfigList from './component/VersionConfigList';
import VersionConfigForm from './component/VersionConfigForm';

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
export default class ConfigIndex extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        list:null,
        item:{},

        viewParam: null,
        viewData:null
    };

    componentDidMount() {
        this.list();
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case versionAction.DELETE_VERSION_PARA_SUCCESS:
                message.success('删除成功！');
                this.list();
                break;
            case versionAction.GET_VERSION_PARA_LIST_SUCCESS:
                this.setState({
                    list: nextProps.version.paraList
                });
                break;
            case versionAction.GET_VERSION_PARA_SUCCESS:
                this.setState({
                    viewData: nextProps.version.paraItem
                });
                break;
            case versionAction.ADD_VERSION_PARA_SUCCESS:
                message.success('添加成功！');
                // this.reset();
                this.list();
                break;
            case versionAction.UPDATE_VERSION_PARA_SUCCESS:
                message.success('修改成功！');
                // this.reset();
                this.list();
                break;
            case versionAction.SYNCHRONIZE_VERSION_PARA_SUCCESS:
                message.success('同步成功！');
                // this.reset();
                this.list();
                break;
            default:
                break;
        }
    }

    add = () => {
        this.showView('form', null, {});
    };

    edit = (id) => {
        this.showView('form', id);
        this.getVersionPara(id);
    };

    list=()=>{
        this.getVersionParaList();
    };

    deleteVersionPara=(id)=>{

        Modal.confirm({
            title: '警告',
            content: '你正要删除该参数，确定吗？',
            onOk:()=>this.props.actions.deleteVersionPara(id),
            onCancel(){

            },
            okText: '确定',
            cancelText: '取消'
        });


    };

    getVersionParaList = ()=>{
        this.props.actions.getVersionParaList();
    };

    getVersionPara = (id)=>{
        this.props.actions.getVersionPara(id);
    };

    updateVersionPara = (params)=>{
        this.props.actions.updateVersionPara(params);
    };

    addVersionPara = (data)=>{
        this.props.actions.addVersionPara(data);
    };

    synchronizePara = (id)=> {

        Modal.confirm({
            title: '警告',
            content: '你正要同步该参数，确定吗？',
            onOk:()=>this.props.actions.synchronizePara(id),
            onCancel(){

            },
            okText: '确定',
            cancelText: '取消'
        });
        // this.props.actions.synchronizePara(id);
    };


    render() {

        const {operation} = this.props;

        const {list,viewParam,viewData} = this.state;

        const extra = (<Button type="primary" icon="plus" onClick={this.add}>新增</Button>);

        let isListLoading = operation.type == versionAction.GET_VERSION_PARA_LIST_PENDING;

        // 是否显示form
        const isShowVersionParaForm = this.isShowView('form');

        return (
            <div className="app-page">
                <Card title="参数配置" extra={extra}>
                    <VersionConfigList
                        data={list}
                        loading={isListLoading}
                        list={this.list}
                        edit={this.edit}
                        deleteVersionPara={this.deleteVersionPara}
                        synchronizePara={this.synchronizePara}
                    />
                    {
                        isShowVersionParaForm && <VersionConfigForm
                            visible={isShowVersionParaForm}
                            param={viewParam}
                            data={viewData}
                            addVersionPara={this.addVersionPara}
                            updateVersionPara={this.updateVersionPara}
                            reset={this.reset}
                        />
                    }
                </Card>
            </div>
        );
    }
}




