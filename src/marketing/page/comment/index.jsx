import React from 'react';
import PageBase from 'common/base/PageBase';
import {message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as tradeAction from '../../store/trade/action';
import CommentList from './component/CommentList';
import CommentShow from './component/CommentShow';

@connect(
    state => ({
        trade: state.trade.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...tradeAction
        }, dispatch)
    })
)

export default class CommentIndex extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        id: '',
        type: 'list'
    };

    componentDidMount() {
        this.list(0);
    }

    list = (page, size) => {

        this.setState({
            type: 'list'
        });

        //某晒单页面获取接口
        this.props.actions.getTradeShowList({
            page,
            size
        });
    };

    //切换时不同的接口
    componentDidUpdate(prevProps) {
        // respond to parameter change in scenario 3
        let oldType = prevProps.params.type;
        let newType = this.props.params.type;
        if (newType !== oldType) {
            this.list(0);
        }
    }

    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        switch (operation.type) {
            case tradeAction.DELETE_TRADE_SHOW_SUCCESS:
                message.success('删除成功！');
                this.list(0);
                break;
        }
    }

    //删除晒图
    deleteComment = (id) => {
        this.setState({
            id: id,
            type: 'deleteComment'
        });
    };

    //删除成功暂不刷新
    confirmDelete = (data) => {
        this.props.actions.deleteTradeShow(data);

        this.setState({
            type: ''
        });
    };

    //显示详情的Modal
    showInfo = (id) => {
        this.setState({
            id: id,
            type: 'showInfo'
        });
    };

    //暂时沿用自己的reset
    //显示详情的Modal
    reset = () => {
        //console.log.log(id);
        this.setState({
            id: '',
            type: ''
        });
    };

    render() {

        const {operation} = this.props;

        // 是否显示loading
        const isListLoading = operation.type == tradeAction.GET_TRADE_SHOW_LIST_PENDING;

        const item = this.props.trade.items ? this.props.trade.items[this.state.id] : null;

        return (
            <div className="app-page" style={{'height': '100%'}}>
                <CommentList type={this.state.type}
                             data={this.props.trade.showData}
                             total={this.props.trade.total}
                             loading={isListLoading}
                             list={this.list}
                             showInfo={this.showInfo}
                             deleteComment={this.deleteComment}/>
                <CommentShow type={this.state.type}
                             data={item}
                             reset={this.reset}
                             confirmDelete={this.confirmDelete}
                             deleteComment={this.deleteComment}/>

            </div>
        );
    }
}



