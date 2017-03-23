import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PageBase from 'common/base/PageBase';
import * as juHeAction from '../../store/juhe/action';
import Img from 'common/component/Img';

@connect(
    state => ({
        operation: state.operation,
        juhe: state.juhe.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...juHeAction
        }, dispatch)
    })
)
export default class DetailIndex extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {};

    componentDidMount() {
        this.getJuheHistoryDetail(this.props.params.id);
    }

    //图文列表
    getJuheHistoryDetail = (id, v = '1.0') => {
        this.props.actions.getJuheHistoryDetail(id, v);
    };

    render() {
        const {result} = this.props.juhe.juHeHistoryDetail;
        return (
            <div className="contentPage content-hot-detail-tpl" style={{'overflow-y': 'scroll', 'height': '100%'}}>
                {
                    result && result.length > 0 &&
                    <div>
                        <div className="content-hot-info-title">
                            <p className="title">{result[0].title}</p>
                        </div>
                        <div className="content-hot-info">
                            <p className="author">
                                <i className="common-header-nav">{result[0].year + '-' + result[0].month + '-' + result[0].day}</i>
                            </p>

                            <div>
                                {
                                    result[0].pic &&
                                    <Img src={result[0].pic}
                                         style={{'display': 'block', 'margin': '10px auto'}}/>
                                }
                                <div className="content-info lk-content"
                                     dangerouslySetInnerHTML={{__html: result[0].content}}/>
                            </div>

                        </div>
                    </div>
                }
            </div>
        );
    }
}


