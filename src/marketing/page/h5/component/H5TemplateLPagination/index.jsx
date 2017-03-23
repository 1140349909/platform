import React, {Component} from 'react';
import {Pagination} from 'antd';
import config from 'common/config';
import './index.less';
export default class H5TemplateLPagination extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        page: 0,
        current: 1,
        size: config.SIZE,
        appType: '',
        auditStatus: ''
    }

    componentDidUpdate(prevProps) {
        //当切换Tab的时候渲染列表
        if (this.props.auditStatus != prevProps.auditStatus || this.props.appType != prevProps.appType) {
            this.setState({
                current: 1
            });
        }
    }

    render() {
        const {data} = this.props;
        let pagination = {
            total: data && data.totalElements,//
            showSizeChanger: false,
            pageSize: data && data.size,
            current: this.state.current,
            onChange: (page) => {
                this.setState({
                    page: page - 1,
                    current: page
                });
                this.props.list({
                    page: page - 1,
                    categorytype: this.props.categorytype,
                    appType: this.props.appType,
                    auditStatus: this.props.auditStatus
                });
            },
        };
        return (
            <div className='h5-template-pagination-con'>
                {
                    data && data.numberOfElements > 0 &&
                    <Pagination    {...pagination} />
                }
            </div>
        );
    }
}
