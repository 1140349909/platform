import React, {Component} from 'react';
import {Icon} from 'antd';
import IconFont from 'common/component/IconFont';
import './index.less';

export default class PluginResult extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {enablePraise, enableTips, enableOpinion, onDisableAction} = this.props;

        if (!enablePraise && !enableTips && !enableOpinion) {
            return null;
        }

        return (
            <div id="editor-plugin-result" className="editor-plugin-result">
                {enablePraise &&
                <span className="editor-plugin-result-item">
                    <IconFont className="editor-plugin-result-type"
                              type="praise"/>
                    <Icon className="editor-plugin-result-close"
                          type="close-circle"
                          title="禁用点赞"
                          onClick={()=>onDisableAction('enablePraise')}/>
                </span>
                }
                {enableTips &&
                <span className="editor-plugin-result-item">
                    <IconFont className="editor-plugin-result-type"
                              type="rewardsolid"/>
                    <Icon className="editor-plugin-result-close"
                          type="close-circle"
                          title="禁用打赏"
                          onClick={()=>onDisableAction('enableTips')}/>
                </span>
                }
                {enableOpinion &&
                <span className="editor-plugin-result-item">
                    <IconFont className="editor-plugin-result-type" type="liuyan"/>
                    <Icon className="editor-plugin-result-close"
                          type="close-circle"
                          title="禁用留言"
                          onClick={()=>onDisableAction('enableOpinion')}/>
                </span>
                }
            </div>);
    }
}

