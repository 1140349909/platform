import React, {Component} from 'react';
import {withRouter} from 'react-router';
import './index.less';
@withRouter
export default class ProblemsList extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        isShowMore: false
    };
    queryProblemDetainInfo = (id) => {
        this.props.router.push('help/detail/' + id);
        return false;
    }
    tagDataList = () => {
        const {problemTagData} = this.props;
        return ( <div style={{width: 1040}}>{
            problemTagData && problemTagData.map((item, index) => (
                <div key={index} className="problems-conatiner">
                    <p className="item-title">{item.name}</p>
                    <div className="problem-ul">
                        {
                            this.tagDetailInfo(item.list)
                        }
                    </div>
                </div>
            ))
        }
        </div>);
    }
    //查询6条数据，如果有6条，显示更多相关问题，反之不显示
    tagDetailInfo = (problem) => {
        const response = problem && problem.response;
        return ( <div>{
            response && response.content && response.content.map((item, key) => (
                <div key={key}>
                    {key < 5 && <div className="item-desc"
                                     onClick={() => this.queryProblemDetainInfo(item.id)}>{item.title}</div>}
                    {key == 5 &&
                    <div className="seeMore" onClick={() => this.getMarkTypeProblems(problem.title)}>更多相关问题
                        ></div>
                    }
                </div>
            ))
        }
        </div>);
    }


    //查询分类下的标签的触发事件
    getMarkTypeProblems = (tag) => {
        this.props.router.push('help/plist/' + encodeURIComponent(tag));
    }

    render() {
        return (
            <div className="problems-list-component">
                {this.tagDataList()}
            </div>
        );
    }
}
