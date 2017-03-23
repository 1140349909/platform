import React, {Component} from 'react';
import {withRouter} from 'react-router';
import './index.less';
import {Pagination} from 'antd';
import config from 'common/config';
import _ from 'lodash';
@withRouter
export default class SearchProblemList extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        page: 0,
        current: 1,
        size: config.SIZE
    };

    queryProblemDetainInfo = (id) => {
        this.props.router.push('help/detail/' + id);
        return false;
    }
    createProblemsData = () => {
        const data = this.props.data;
        if (data && data.map) {
            return ( <div>{
                data.map((item, index) => (
                    <div key={index}>
                        <p className='problem-title'
                           onClick={() => this.queryProblemDetainInfo(item.id)}>{item.title}</p>
                        <p className='problem-desc'>{item.desc && item.desc.length > 100 ? item.desc.substring(0, 100) + '...' : item.desc}</p>
                    </div>
                ))
            }
            </div>);
        }
    }

    render() {
        const {data, response} = this.props;
        let pagination = {
            total: response && response.totalElements,//
            showSizeChanger: false,
            pageSize: response && response.size,
            current: this.state.page + 1,
            onChange: (page) => {
                this.setState({
                    page: page - 1,
                    current: page
                });
                this.props.getHelpList({page: page - 1});
            },
        };
        return (
            <div className='app-search-problems'>
                {
                    data && data.length > 0 &&
                    this.createProblemsData()
                }
                {
                    response && !_.isEmpty(response.content) &&
                    < div className='sp-pagination'>
                        <Pagination {...pagination}/>
                    </div>

                }
                {
                    data && data.length == 0 &&
                    <div className="sp-info">
                        <p className="sp-nodata-icon"><i className="iconfont icon-ku"></i></p>
                        <p className="sp-nodata-desc">未收索出符合条件的数据</p>
                    </div>
                }
            </div>
        );
    }
}
