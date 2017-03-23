import React from 'react';
// import {Button} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PageBase from 'common/base/PageBase';
import * as appAction from '../../store/app/action';
// import {transformArray} from 'common/util/index';
import FormDataList from './component/FormDataList';
import Img from 'common/component/Img';
import './formData.less';
@connect(
    state => ({
        operation: state.operation,
        app: state.app.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...appAction,
        }, dispatch)
    })
)
export default class FormData extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        page: 0,
        size: 8,
        loading: false,
        rpValue: ''
    }

    componentDidMount() {
        this.props.actions.collectAppData({
            appid: this.props.params.appid,
            /*startDate: '1970-1-1',
             endDate: moment().format('YYYY-MM-DD')*/
        });
    }

    collectAppData = (params) => {
        this.props.actions.collectAppData(params);
    }

    exportAppCollectData = () => {
        this.props.actions.exportAppCollectData(this.props.params.appid);
    }

    render() {
        const {formDataList} = this.props.app;
        // let exportUrl = config.API_ILOKA_URL + '/app/collect/data/export/' + this.props.params.appid;
        return (
            <div className="app-page form-data-page">
                <div className='header'>
                    <div className='logo'><Img src='logo.png'/></div>
                </div>
                <div className='form-data-filter-con'>
                    <div className='title'>
                        <span className='formInfo'>表单信息</span>
                        {/*<Button className='exportData' type="primary"
                                onClick={this.exportAppCollectData}>
                            <a href={exportUrl} target=' _blank'>导出数据列表</a></Button>*/}
                    </div>
                    <FormDataList formDataList={formDataList}
                                  appid={this.props.params.appid}
                                  list={this.collectAppData}
                                  loading={this.state.loading}/>
                </div>
            </div>
        );
    }
}


