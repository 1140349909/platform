import React, {Component} from 'react';
import {Radio} from 'antd';
import ContentPreview from '../../component/ContentPreview';
import NavTag from 'common/component/NavTag';
import {withRouter} from 'react-router';
import './index.less';
import _ from 'lodash';
import ContentReleaseHistory from 'common/component/ContentReleaseHistory';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const EDIT_DATA = [
    {
        title: '时间',
        key: '01',
        children: [
            {
                title: '全部',
                key: '0011'
            },
            {
                title: '今天',
                key: 'today'
            },
            {
                title: '昨天',
                key: 'yesterday'
            },
            {
                title: '最近7天',
                key: 'last7days'
            },
            {
                title: '本月',
                key: 'currMonth'
            }
        ]
    }
];

const PUBLISHED_DATA = [
    {
        title: '发布平台',
        key: '02',
        children: [
            {
                title: '全部',
                key: '0021'
            },
            {
                title: '微站',
                key: 'vsite'
            },
            {
                title: '微博',
                key: 'wb'
            },
            {
                title: '微信',
                key: 'wx'
            },
            {
                title: '今日头条',
                key: 'toutiao'
            }
        ]
    },
    EDIT_DATA[0]
];
@withRouter
export default class ContentDataFilter extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        dateRange: '',
        channels: '',
        currentStatus: 'published'
    };

    onTabChange = (event) => {
        const key = event.target.value;
        this.setState({
            currentStatus: key
        }, () => {
            this.refresh(key);
        });
    };

    refresh = (key) => {
        this.props.router.push('/content/mine/' + key);
        this.props.listMethod({
            page: 0,
            status: key,
            dateRange: null,
            channels: null,
            sort: key == 'published' ? 'publishedDate,desc' : 'lastModifiedDate,desc'
        });
    }

    onSelect = (checkedKeys, objectCheckedKeys,) => {
        let dateRange = '';
        let channels = '';
        _.map(objectCheckedKeys, (item) => {
            let child = item.children[0];
            if (item.key == '01') {
                dateRange = child.key == '0011' ? undefined : child.key;
            }
            if (item.key == '02') {
                channels = child.key == '0021' ? undefined : child.key;
            }
        });

        const key = this.state.currentStatus;
        this.props.listMethod({
            status: key,
            dateRange: dateRange,
            channels: channels,
            sort: key == 'published' ? 'publishedDate,desc' : 'lastModifiedDate,desc'
        });

    }

    render() {
        let content = this.props.list;
        return (
            <div className="mineComponent">
                <div className="ant-radio-group-lk">
                    <RadioGroup defaultValue="published" onChange={this.onTabChange}>
                        <RadioButton value="published">已发布</RadioButton>
                        <RadioButton value="edit">未发布</RadioButton>
                    </RadioGroup>
                </div>

                {
                    this.state.currentStatus == 'published' &&
                    <NavTag data={PUBLISHED_DATA} defaultSelectedKeys={['0011', '0021']} onSelect={this.onSelect} extra={<ContentReleaseHistory type="content"/>}/>
                }

                {
                    this.state.currentStatus == 'edit' &&
                    <NavTag data={EDIT_DATA} defaultSelectedKeys={['0011']} onSelect={this.onSelect}/>
                }

                <ContentPreview bulkData={content}
                                cancelContentVSite={this.props.cancelContentVSite}
                                deleteContent={this.props.deleteContent}
                                currentStatus={this.state.currentStatus}
                                onRefresh={this.refresh}
                                type={this.props.type}
                />
            </div>
        );
    }
}

