import React from 'react';
import PageBase from 'common/base/PageBase';
import {Card} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MemberList from '../../component/MemberList';
import MemberShow from '../../component/MemberShow';
import * as memberAction from '../../store/member/action';

@connect(
    state => ({
        member: state.member.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...memberAction,
        }, dispatch)
    })
)
export default class MemberIndex extends PageBase {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.list(0);
    }

    state = {
        viewType: 'list',
        viewParam: null,
        viewData: null,

        payType: '',
        tradeStatus: '',
        buyType:'mall'
    };

    // 表格数据获取
    list = (page, size) => {

        this.props.actions.getMemberList({
            page,
            size
        });
    };

    showMemberMallOrderList = (id)=> {
        this.showView('memberMallOrderList', id, {});
        this.getMemberMallOrdersList(id,'','','','','mall');
    };

    getMemberMallOrdersList = (id, payType, tradeStatus, page, size, buyType)=> {
        this.setState({
            buyType:buyType
        });
        this.props.actions.getMemberMallOrdersList({id, payType, tradeStatus, page, size, buyType});
    };

    handleChange = (page, size) => {
        this.getMemberMallOrdersList(this.state.viewParam, this.state.payType, this.state.tradeStatus, page, size,this.state.buyType);
    };

    onChange = (value, attr, page, size)=> {

        let data = {};
        data[attr] = value;

        this.setState({
            buyType:this.state.buyType,
            payType: data.payType != undefined ? data.payType : this.state.payType,
            tradeStatus: data.tradeStatus != undefined ? data.tradeStatus : this.state.tradeStatus
        }, ()=>this.handleChange(page, size));

    };

    render() {

        const {operation} = this.props;

        // 是否显示loading
        const isListLoading = operation.type == memberAction.GET_MEMBER_LIST_PENDING;

        // 是否显示会员订单列表
        const isShowMemberMallOrderList = this.isShowView('memberMallOrderList');

        return (
            <div className="app-page" style={{'height':'100%'}}>
                <Card title="会员管理" style={{'height':'100%','overflowY':'scroll'}}>
                    <MemberList
                        data={this.props.member.list}
                        loading={isListLoading}
                        list={this.list}
                        showMemberMallOrderList={this.showMemberMallOrderList}/>
                </Card>

                { isShowMemberMallOrderList &&
                <MemberShow
                    visible={isShowMemberMallOrderList}
                    reset={this.reset}
                    state={this.state}
                    data={this.props.member.mallOrderList}
                    list={this.getMemberMallOrdersList}
                    handleChange={this.handleChange}
                    onChange={this.onChange}
                />}
            </div>
        );


    }
}


