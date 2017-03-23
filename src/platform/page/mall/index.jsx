import React from 'react';
import PageBase from 'common/base/PageBase';
import {Card, Button} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as mallAction from '../../store/mall/action';
import MallList from './component/MallList';
import MallForm from './component/MallForm';
import MallShow from './component/MallShow';

@connect(
    state => ({
        mall: state.mall.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...mallAction
        }, dispatch)
    })
)
export default class MallIndex extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        viewType: 'list',
        viewParam: null,
        viewData: null
    };

    componentDidMount() {
        this.list(0);
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case mallAction.GET_MALL_SUCCESS:
                this.setState({
                    viewData: nextProps.mall.item
                });
                break;
            case mallAction.UPDATE_MALL_SUCCESS:
            case mallAction.ADD_MALL_SUCCESS:
                this.list(0);
                this.reset();
                break;
        }
    }

    add = () => {
        this.showView('form', null, {});
    };

    edit = (id) => {
        this.showView('form', id);
        this.props.actions.getMall(id);
    };

    save = (mall) => {
        this.props.actions.saveMall(mall);
    };

    show = (id) => {
        this.showView('show', id);
        this.props.actions.getMall(id);
    };

    list = (page, size)=> {

        this.props.actions.getMalls({
            page,
            size
        });
    };

    render() {
        const {operation} = this.props;

        // 是否显示loading
        const isListLoading = operation.type == mallAction.GET_MALLS_PENDING;

        // 是否显示show
        const isShowMallShow = this.isShowView('show');

        // 是否显示form
        const isShowMallForm = this.isShowView('form');

        return (
            <div className="app-page">
                <Card title="商城列表"
                      extra={<Button type="primary" icon="plus" onClick={this.add.bind(this)}>新增</Button>}>
                    <MallList data={this.props.mall.list.content}
                              total={this.props.mall.list.totalElements}
                              loading={isListLoading}
                              edit={this.edit}
                              show={this.show}
                              list={this.list}/>
                    {isShowMallShow &&
                    <MallShow data={this.state.viewData}
                              visible={isShowMallShow}
                              reset={this.reset}/>
                    }

                    {isShowMallForm &&
                    <MallForm data={this.state.viewData}
                              visible={isShowMallForm}
                              save={this.save}
                              reset={this.reset}/>
                    }
                </Card>
            </div>
        );
    }
}
