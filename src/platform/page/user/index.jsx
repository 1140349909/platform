import React from 'react';
import PageBase from 'common/base/PageBase';
import {Card,message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SearchInput from 'common/component/SearchInput';
import * as userAction from '../../store/user/action';
import UserList from './component/UserList';

@connect(
    state => ({
        user: state.user.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...userAction,
        }, dispatch)
    })
)
export default class UserIndex extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        page: 0,
        size: 10,
        platform:'iloka',
        userName: '',
        sort: 'createdDate'
    };

    componentDidMount() {
        this.list({page: 0});
    }

    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        switch (operation.type) {
            case userAction.SWITCH_USER_LEVEL_SUCCESS:
                message.success('操作成功');
                this.list({});
                break;
        }
    }

    list = (params) => {
        this.setState(params, () => {
            const {page, size, userName,platform,sort} = this.state;
            this.props.actions.getUsers({
                page,
                size,
                userName,
                platform,
                sort
            });
        });
    };

    // 搜索企业
    handleSearch = (userName) => {
        this.list({
            userName,
            page: 0
        });
    };

    // 分配角色
    handleUser = (record,level) => {

        this.props.actions.switchUserLevel({
            platform:record.platform,
            level:level,
            userid:record.id,
        });
    };

    render() {

        const {operation, user} = this.props;

        const extra = (
            <SearchInput placeholder="请输入手机/邮箱进行查询" onSearch={this.handleSearch} style={{width: 200}}/>
        );

        // 是否显示loading
        const isListLoading = operation.type == userAction.GET_USERS_PENDING;

        return (
            <div className="app-page">
                <Card title="平台用户" extra={extra}>
                    <UserList data={user.list}
                              loading={isListLoading}
                              handleUser={this.handleUser}
                              onList={this.list}/>
                </Card>
            </div>
        );
    }
}
