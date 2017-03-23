import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PageBase from 'common/base/PageBase';
import './index.less';
import CommunityList from './component/CommunityList';
import * as helpAction from '../../store/help/action';
@connect(
    state => ({
        operation: state.operation,
        help: state.help.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...helpAction
        }, dispatch)
    })
)
export default class Community extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        data: []
    };

    componentDidMount() {
        this.getHelpCommunityType('wx', 0);
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case helpAction.GET_HELP_COMMUNITY_TYPE_SUCCESS :
                const {communityQcodeList} = nextProps.help;
                const isWx = communityQcodeList.params == 'wx';
                this.state.data.push({
                    title: isWx ? '微信群' : '官方微信公众号',
                    desc: isWx ? '汇集了各行业的大牛在此分享经验' : '官方教学，在线答疑，产品反馈',
                    items: communityQcodeList.content
                });
                if (isWx) {
                    this.getHelpCommunityType('lkwx', 0);
                }
                break;
        }
    }

    getHelpCommunityType = (qrcodeType, page, status = 'published') => {
        this.props.actions.getHelpCommunityType({qrcodeType, page, status});
    }

    render() {
        return (
            <div className="app-page app-page-problems app-page-community">
                <div className="problems-container">
                    <div className="title">
                        用户社区
                    </div>
                    <div className="community-list-container">
                        <CommunityList data={this.state.data}/>
                    </div>
                </div>
            </div>
        );
    }
}


