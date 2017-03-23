import React from 'react';
import PageBase from 'common/base/PageBase';
import {Card} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as JuHeAction from '../../store/juhe/action';
import JuHeList from './component/JuHeList';

@connect(
    state => ({
        juhe: state.juhe.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...JuHeAction
        }, dispatch)
    })
)
export default class JuHeIndex extends PageBase {

    constructor(props) {
        super(props);

    }

    state = {
        viewType: 'list',
        viewParam: null,
        viewData: null
    };

    componentDidMount() {
        this.list();
    }

    /*componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;

        switch (operation.type) {

        }

    }*/

    list = ()=> {
        // this.props.actions.getJuheList({});

        this.props.actions.getJuheHistoryTodayList({month:1,day:12});
    };

    render() {

        const {operation} = this.props;


        // 是否显示loading
        const isListLoading = operation.type == JuHeAction.GET_JUHE_LIST_PENDING;

        return (
            <div className="app-page">
                <Card title="聚合数据">
                    <JuHeList data={this.props.juhe}
                                 loading={isListLoading}
                                 list={this.list}/>
                </Card>
            </div>
        );
    }
}
