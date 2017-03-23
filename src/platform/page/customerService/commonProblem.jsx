import React from 'react';
import PageBase from 'common/base/PageBase';
import {Tabs, Button, Modal, message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CustomerServiceList from './component/CustomerServiceList';
import CommonProblemForm from './component/CommonProblemForm';
const TabPane = Tabs.TabPane;
import * as tagAction from '../../store/tag/action';
import * as helpAction from '../../store/help/action';
@connect(
    state => ({
        operation: state.operation,
        help: state.help.toJS(),
        tag: state.tag.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...helpAction,
            ...tagAction
        }, dispatch)
    })
)
export default class CommonProblem extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        viewType: 'list',
        viewParam: null,
        viewData: null,
        tagType: '',
        tagSeqName: '',
        status: ''//add || edit
    };

    componentDidMount() {
        this.getHelpList(0);
        this.getTagsList(0);
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case helpAction.DELETE_HELP_SUCCESS:
                message.success('删除成功');
                this.getHelpList(0);
                break;
            case helpAction.CHANGE_HELP_STATUS_SUCCESS:
                this.getHelpList(0);
                break;
            case helpAction.ADD_HELP_PROBLEM_SUCCESS:
                message.success('添加成功');
                this.getHelpList(0);
                this.reset();
                break;
            case helpAction.GET_HELP_DETAIL_SUCCESS:
                this.setState({status: 'edit'});
                this.showView('showAddModal', null, nextProps.help.problemDetail);
                break;
            case helpAction.UPDATE_HELP_PROBLEM_SUCCESS:
                message.success('修改成功');
                this.getHelpList(0);
                this.reset();
                break;
        }
    }

    showAddModal = () => {
        this.setState({status: 'add'});
        this.showView('showAddModal', null, {});
    }
    //删除
    deleteHelpProblemModal = (record) => {
        Modal.confirm({
            title: '温馨提示',
            content: '确认要删除吗',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                this.deleteHelp(record);
            }
        });
    }
    //常见问题列表
    getHelpList = (page, size) => {
        this.props.actions.getHelpList({page, size, sort: 'createdDate ,desc'});
    }
    //删除
    deleteHelp = (id) => {
        this.props.actions.deleteHelp(id);
    }
    //修改
    updateHelpInfo = (id, params) => {
        this.props.actions.updateHelpProblem(id, params);
    }
    //启用 || 禁用
    changeHelpStatus = (id, status) => {
        this.props.actions.changeHelpStatus(id, status);
    }
    //添加常见问题
    addHelpProblem = (params) => {
        this.props.actions.addHelpProblem(params);
    }
    getTagsList = () => {
        this.props.actions.getTagsList('help');
    }
    getDetailInfo = (id) => {
        this.props.actions.getHelpDetail(id);
    }

    render() {
        const addBar = (<Button type='primary' onClick={this.showAddModal}>新增</Button>);
        const isShowAddModal = this.isShowView('showAddModal');
        const {problemList} = this.props.help;
        const {tagList} = this.props.tag;
        return (
            <div className='app-page app-page-common-problem  app-page-white'>
                <Tabs defaultActiveKey='1' tabBarExtraContent={addBar}>
                    <TabPane tab='常见问题' key='1'>
                        <CustomerServiceList list={this.getHelpList}
                                             dataSource={problemList}
                                             deleteHelpProblemModal={this.deleteHelpProblemModal}
                                             changeHelpStatus={this.changeHelpStatus}
                                             getDetailInfo={this.getDetailInfo}/>
                    </TabPane>
                </Tabs>
                {
                    isShowAddModal &&
                    <CommonProblemForm visible={isShowAddModal}
                                       reset={this.reset}
                                       data={this.state}
                                       tagList={tagList}
                                       updateHelpInfo={this.updateHelpInfo}
                                       addHelpProblem={this.addHelpProblem}
                    />
                }
            </div>
        );
    }
}
