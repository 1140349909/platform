import React from 'react';
import {Card} from 'antd';
import PageBase from 'common/base/PageBase';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as tkerAction from '../../store/tker/action';
import TkerMemberList from './component/TkerMemberList';
import TkerMemberShow from './component/TkerMemberShow';
import SearchInput from 'common/component/SearchInput';

// 代言会员
@connect(
    state => ({
        member: state.member.toJS(),
        tker: state.tker.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...tkerAction
        }, dispatch)
    })
)
export default class TKerMember extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        //show组件需要
        level: '',
        mobile: ''
    };

    componentDidMount() {
        this.list(0);
    }

    // 获取列表
    list = (page, size)=> {

        this.props.actions.getManagerTkerList({

            mobile: this.state.mobile,
            page,
            size
        });
    };

    // 搜索企业
    handleSearch = (mobile) => {
        this.setState({
            mobile: mobile
        }, ()=> {
            this.list(0);
        });
    };

    //获取集客
    getManagerTkerSubMember = (memberId, mobile)=> {

        this.props.actions.getManagerTkerSubMember({
            memberId: memberId,
            mobile: mobile
        });
    };

    //打开集客模态框
    viewTker = (memberId)=> {

        this.setState({
            id: memberId,
            type: 'tker'
        });

        this.getManagerTkerSubMember(memberId);
    };

    //获取红利
    getManagerTkerProfit = (id, level)=> {
        this.props.actions.getManagerTkerProfit({
            id: id,
            level: level
        });
    };

    //打开红利模态框
    viewDividend = (id)=> {

        this.setState({
            id: id,
            type: 'dividend'
        });

        this.getManagerTkerProfit(id);
    };

    //关闭模态框
    handleComplete = ()=> {

        this.setState({
            type: 'list',
            modalData: null
        });
    };

    /**/

    // 搜索集客
    handleSearchTker = (mobile) => {
        this.setState({
            mobile: mobile
        }, ()=> {
            this.getManagerTkerSubMember(this.state.id, this.state.mobile);
        });
    };

    onChange = (value)=> {
        this.setState({
            level: value
        }, ()=>this.getManagerTkerProfit(this.state.id, this.state.level));
    };


    render() {

        const {operation} = this.props;

        let {type, id, level, mobile} = this.state;

        const extra = (
            <SearchInput placeholder="请输入姓名或手机号进行查询"
                         onSearch={this.handleSearch}
                         style={{width: 200}}/>
        );

        const list = this.props.tker.list;
        const items = this.props.tker.items;
        const modalData = this.props.tker.modalData;

        if (!list) {
            return null;
        }

        let item = items[id];

        // 是否显示loading
        const isListLoading = operation.type == tkerAction.GET_MANAGER_TKER_LIST_PENDING;

        // 是否显示loading
        const isShowLoading = (
            operation.type == tkerAction.GET_MANAGER_TKER_PROFIT_PENDING ||
            operation.type == tkerAction.GET_MANAGER_TKER_SUB_MEMBER_PENDING
        );

        return (
            <div className="app-page" style={{'height':'100%'}}>
                <Card title="代言会员" extra={extra} style={{'height':'100%','overflowY':'scroll'}}>

                    <TkerMemberList
                        loading={isListLoading}
                        data={list}
                        list={this.list}
                        viewTker={this.viewTker}
                        viewDividend={this.viewDividend}

                    />
                </Card>
                <TkerMemberShow
                    loading={isShowLoading}
                    id={id}
                    item={item}
                    type={type}
                    data={modalData}
                    getManagerTkerSubMember={this.getManagerTkerSubMember}
                    getManagerTkerProfit={this.getManagerTkerProfit}
                    handleComplete={this.handleComplete}

                    onChange={this.onChange}
                    handleSearchTker={this.handleSearchTker}
                    level={level}
                    mobile={mobile}

                />
            </div>
        );
    }
}

