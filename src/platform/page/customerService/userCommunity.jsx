import React from 'react';
import PageBase from 'common/base/PageBase';
import {Tabs, Button, Modal, message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
const TabPane = Tabs.TabPane;
import  * as helpAction from '../../store/help/action';
import CommunityForm from './component/CommunityForm';
import CustomerServiceList from './component/CustomerServiceList';
@connect(
    state => ({
        operation: state.operation,
        help: state.help.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...helpAction
        }, dispatch)
    })
)
export default class UserCommunity extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        viewType: 'list',
        viewParam: null,
        viewData: null,
        status: '' //edit || add
    };

    componentDidMount() {
        this.getHelpCommunityList(0);
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case helpAction.ADD_HELP_COMMUNITY_SUCCESS:
                message.success('添加成功');
                this.reset();
                this.getHelpCommunityList(0);
                break;
            case helpAction.UPDATE_HELP_COMMUNITY_SUCCESS:
                message.success('修改成功');
                this.reset();
                this.getHelpCommunityList(0);
                break;
            case helpAction.ABLE_HELP_COMMUNITY_SUCCESS:
                this.getHelpCommunityList(0);
                break;
            case helpAction.DELETE_HELP_COMMUNITY_SUCCESS:
                message.success('删除成功');
                this.getHelpCommunityList(0);
                break;
            case helpAction.GET_HELP_COMMUNITY_DETAIL_SUCCESS:
                this.setState({status: 'edit'});
                this.showView('showAddModal', null, nextProps.help.communityDetail);
                break;
        }
    }

    showAddModal = () => {
        this.setState({status: 'add'});
        this.showView('showAddModal', null, {});
    }
    //show update modal 编辑
    showUpdateModal = (record) => {
        this.setState({status: 'edit'});
        this.showView('showAddModal', null, record);
    }
    //删除
    deleteUserCommunity = (record) => {
        Modal.confirm({
            title: '温馨提示',
            content: '确认要删除吗',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                this.deleteHelpCommunity(record);
            }
        });
    }
    deleteHelpCommunity = (id) => {
        this.props.actions.deleteHelpCommunity(id);
    }
    getHelpCommunityList = (page, size) => {
        this.props.actions.getHelpCommunityList({page, size, sort: 'createdDate,desc'});
    }
    addHelpCommunity = (params) => {
        this.props.actions.addHelpCommunity(params);
    }
    updateHelpInfo = (id, params) => {
        this.props.actions.updateHelpCommunity(id, params);
    }
    ableHelpCommunity = (id, status) => {
        this.props.actions.ableHelpCommunity(id, status);
    }
    getDetailInfo = (id) => {
        this.props.actions.getHelpCommunityDetail(id);
    }

    render() {
        const addBar = (
            <Button type='primary' onClick={this.showAddModal}>新增</Button>);
        const isShowAddModal = this.isShowView('showAddModal');
        const {communityList} = this.props.help;

        return (
            <div className='app-page app-page-common-problem  app-page-white'>
                <Tabs defaultActiveKey='1' tabBarExtraContent={addBar}>
                    <TabPane tab='用户社区' key='1'>
                        <CustomerServiceList list={this.getHelpCommunityList}
                                             dataSource={communityList}
                                             params={'community'}
                                             deleteHelpProblemModal={this.deleteUserCommunity}
                                             changeHelpStatus={this.ableHelpCommunity}
                                             getDetailInfo={this.getDetailInfo}/>
                    </TabPane>
                </Tabs>
                {
                    isShowAddModal &&
                    <CommunityForm visible={isShowAddModal} reset={this.reset}
                                   addHelpCommunity={this.addHelpCommunity}
                                   updateHelpInfo={this.updateHelpInfo}
                                   status={this.state.status}
                                   viewData={this.state.viewData}
                    />
                }
            </div>
        );
    }
}
