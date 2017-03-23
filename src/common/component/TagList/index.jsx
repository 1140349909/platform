import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as tagsAction from '../../store/tags/action';
import './index.less';

@connect(
    state => ({
        tags: state.commonTags.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...tagsAction
        }, dispatch)
    })
)
export default class TagList extends Component {

    constructor(props) {
        super(props);
    }

    // 页面加载
    componentDidMount() {
        const {tags, tagType} = this.props;
        if (!tags[tagType]) {
            this.props.actions.getTagsList(tagType);
        }
    }

    // 更新标签
    componentDidUpdate(prevProps) {
        // 路由切换后初始化数据
        if (this.props.tagType != prevProps.tagType) {
            this.props.actions.getTagsList(this.props.tagType);
        }
    }

    handleClick(name) {
        if (name != this.props.selected && _.isFunction(this.props.onTagChange)) {
            this.props.onTagChange(name);
        }
    }

    render() {
        const {tags, tagType, selected, tagChildrenType = ''} = this.props;
        const tagList = tags[tagType];
        let tagChildrenIndex;

        if (_.isEmpty(tagList)) {
            return null;
        }

        if (_.isEmpty(tagList[0].tags)) {
            return null;
        }

        if (tagChildrenType) {
            tagChildrenIndex = _.findIndex(tagList, (item) => {
                return item.name === tagChildrenType;
            });
        }

        return (
            <dl className="tag-list">
                <dd className="tag-list-content">
                    <ul>
                        {!tagChildrenType &&
                            <li className={'tag-list-item' + (!selected ? ' tag-list-item-active' : '')}
                                onClick={()=>this.handleClick('')}>全部
                            </li>
                        }
                        {!tagChildrenType &&
                            <span>
                                {tagList[0].tags.map((item)=> (
                                    <li key={item.name}
                                        className={'tag-list-item' + (selected == item.name ? ' tag-list-item-active' : '')}
                                        onClick={()=>this.handleClick(item.name)}>{item.name}</li>
                                ))}
                            </span>
                        }
                        {tagChildrenType &&
                            <span>
                                {tagList[tagChildrenIndex].tags.map((item)=> (
                                    <li key={item.name}
                                        className={'tag-list-item' + (selected == item.name ? ' tag-list-item-active' : '')}
                                        onClick={()=>this.handleClick(item.name)}>{item.name}</li>
                                ))}
                            </span>
                        }
                    </ul>
                </dd>
                <dt className="tag-list-title">分类:</dt>
                {/*<dd className="tag-list-toggle">展开</dd>*/}
            </dl>
        );
    }
}

