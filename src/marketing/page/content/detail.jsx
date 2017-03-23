import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PageBase from 'common/base/PageBase';
import * as contentHotAction from '../../store/contentHot/action';
@connect(
    state => ({
        operation: state.operation,
        contentHot: state.contentHot.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...contentHotAction
        }, dispatch)
    })
)
export default class DetailIndex extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {};

    componentDidMount() {
        this.getContentHotDetail(this.props.params.id);
    }

    //图文列表
    getContentHotDetail = (id) => {
        this.props.actions.getContentHotDetail(id);
    };

    render() {
        const {contentDetailInfo} = this.props.contentHot;
        return (
            <div className="contentPage content-hot-detail-tpl">
                {
                    contentDetailInfo &&
                    <div>
                        <div className="content-hot-info-title">
                            <p className="title">{contentDetailInfo.title}</p>
                        </div>
                        <div className="content-hot-info">
                            <p className="author">
                                <i>{contentDetailInfo.gzhName}</i> |
                                <i className="common-header-nav">{contentDetailInfo.createdDate}</i> |
                                {
                                    contentDetailInfo.opdata &&
                                    <i className="common-header-nav">{ contentDetailInfo.opdata.pv > 100000 ? '10万+' : contentDetailInfo.opdata.pv}</i>
                                }
                            </p>
                            <div className="content-info lk-content"
                                 dangerouslySetInnerHTML={{__html: contentDetailInfo.content}}/>
                        </div>
                    </div>
                }
            </div>
        );
    }
}


