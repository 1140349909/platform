import React, {Component} from 'react';
import VH5Preview from '../../component/VH5Preview';
import NavTag from 'common/component/NavTag';
import H5TemplateLPagination from '../../component/H5TemplateLPagination';
import './index.less';
import _ from 'lodash';
import Img from 'common/component/Img';
import AuthComponentBase from 'common/base/AuthComponentBase';
import {redirect} from 'common/util';
const TAG_DATA = [
    {
        title: '类型',
        key: 'appType',
        children: [
            {
                title: '全部',
                key: '0011'
            },
            {
                title: '整套',
                key: 'M'
            },
            {
                title: '单页',
                key: 'S'
            }
        ]
    },
    {
        key: 'auditStatus',
        title: '时间',
        children: [
            {
                title: '全部',
                key: '0021'
            },
            {
                title: '待提交',
                key: 's0'
            },
            {
                title: '待审核',
                key: 's11'
            },
            {
                title: '审核未通过',
                key: 's29'
            },
            {
                title: '审核已通过',
                key: 's26'
            },
            {
                title: '已上架',
                key: 's46'
            },
            {
                title: '已下架',
                key: 's49'
            },
        ]
    }
];

export default class MyH5HotTemplateList extends AuthComponentBase {
    constructor(props) {
        super(props);
    }

    getAppDataList = () => {
        this.props.getAppDataList({categorytype: 'my'});
    }
    //使用模板
    useH5Template = () => {
        this.anyWhereModule(module.CONTENT_H5_CREATE).then(() => {
            redirect('h5.html#/add', '_blank');
        });
    };
    onSelect = (checkedKeys, objectCheckedKeys,) => {
        let params = {
            appType: '',
            auditStatus: '',
            categorytype: 'my'
        };
        _.map(objectCheckedKeys, (item) => {
            let child = item.children[0];
            if (item.key == 'appType') {
                params.appType = child.key == '0011' ? undefined : child.key;
            } else if (item.key == 'auditStatus') {
                params.auditStatus = child.key == '0021' ? undefined : child.key;
            }
        });
        this.props.list(params);
    }

    render() {
        const {data} = this.props;
        return (
            <div className='myH5TemplateList-con'>
                <div className='myH5TemplateList'>
                    <NavTag data={TAG_DATA} onSelect={this.onSelect }
                            defaultSelectedKeys={['0011', '0021']}/>
                </div>
                <VH5Preview list={this.props.data}
                            deleteH5Template={this.props.deleteH5Template}
                            submitCheck={this.props.submitCheck}
                            type={this.props.categorytype}
                            onPreview={this.props.onPreview}
                            h5Type={this.props.h5Type}
                />
                <H5TemplateLPagination list={this.props.list}
                                       data={this.props.data}
                                       appType={this.props.appType}
                                       auditStatus={this.props.auditStatus}
                                       categorytype={this.props.categorytype}/>
                {
                    data && data.totalElements == 0 &&
                    <div className='desc' style={{'textAlign': 'center', 'marginTop': '150px'}}>
                        <Img src='./img/cry.png' style={{'dispaly': 'block'}}/>
                        <p style={{'marginTop': '20px', 'fontSize': '14px'}}>您还没有创建模板哦！<a onClick={ this.useH5Template }
                                                                                          target="_blank">去创建</a></p>
                    </div>
                }
            </div>
        );
    }
}
