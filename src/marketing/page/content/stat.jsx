import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PageBase from 'common/base/PageBase';
import TabHeader from '../../component/TabHeader';
import DataStatis from '../../component/DataStatis';
import * as DataAggAction from '../../store/dataAgg/action';
import Config from 'common/config';
@connect(
    state => ({
        operation: state.operation,
        dataAgg: state.dataAgg.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...DataAggAction
        }, dispatch)
    })
)
export default class StatIndex extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        defaultFilter: {
            resType: Config.RESTYPE_CONTENT,
            dateRange: 'last7days',
            startDate: '',
            endDate: ''
        }
    }

    componentDidMount() {
        this.getDataAgg(this.state.defaultFilter);
    }

    //取资讯图文效率聚合统计汇总数据
    getDataAgg = (params) => {
        this.props.actions.getDataAgg({
            resType: Config.RESTYPE_CONTENT,
            ...params
        });
    }

    render() {
        const data = this.props.dataAgg;
        return (
            <div className="app-page app-content-state contentPage">
                <TabHeader activeKey="/content/stat"
                           tabKey="content"
                           contentMineStatus='published'
                           contentTplCheckKeys='hotArticle'/>
                <DataStatis
                    type='content'
                    data={data}
                    getDataAgg={this.getDataAgg}/>
            </div>
        );
    }
}


