import React, {Component} from 'react';
import {Table} from 'antd';
import './index.less';

export default class VersionConfigList extends Component {

    constructor(props) {
        super(props);
    }

    state = {};

    render() {

        const {
            data, loading, edit,
            deleteVersionPara,
            synchronizePara
        } = this.props;

        let unitDict = {
            day: 1,
            week: 1,
            month: 1,
            year: 1,
            sheet: 1,
            times: 1,
            t_times: 1000,
            y_t_times: 1000,
            discount: 1,
            individual: 1,
            y_t_article: 1000,
            nounit: 1
        };

        const columns = [
            {
                title: '标识',
                className: 'text-center',
                dataIndex: 'mark',
            },
            {
                title: '参数名称',
                className: 'text-center',
                dataIndex: 'name',
            }, {
                title: '参数类型',
                className: 'text-center',
                dataIndex: 'paraType',
                render: (text)=> {

                    let paraType = {
                        text: '文本',
                        numeric: '数字',
                        bool: '布尔',
                    };

                    return (
                        <div>
                            {paraType[text]}
                        </div>
                    );
                }
            }, {
                title: '默认值',
                className: 'text-center',
                dataIndex: 'defaultValue',
                render: (text,record)=> {
                    return (
                        <div>
                            {text?(record.paraType == 'numeric'?text/unitDict[record.unit]:text):'-'}
                        </div>
                    );
                }
            }, {
                title: '最小值',
                className: 'text-center',
                dataIndex: 'minValue',
                render: (text,record)=> {
                    return (
                        <div>
                            {text?(record.paraType == 'numeric'?text/unitDict[record.unit]:text):'-'}
                        </div>
                    );
                }
            }, {
                title: '最大值',
                className: 'text-center',
                dataIndex: 'maxValue',
                render: (text,record)=> {
                    return (
                        <div>
                            {text?(record.paraType == 'numeric'?text/unitDict[record.unit]:text):'-'}
                        </div>
                    );
                }
            }, {
                title: '单位',
                className: 'text-center',
                dataIndex: 'unit',
                render: (text)=> {

                    let unit = {
                        day: '天',
                        week: '周',
                        month: '月',
                        year: '年',
                        sheet: '张',
                        times: '次',
                        t_times: '千次',
                        y_t_times: '千次/年',
                        discount: '折',
                        individual: '个',
                        y_t_article: '千篇/年',
                        nounit: '无'
                    };

                    return (
                        <div>
                            {unit[text]}
                        </div>
                    );
                }
            }, {
                title: '允许购买',
                className: 'text-center',
                dataIndex: 'allowBuy',
                render: (text)=> {

                    let allowBuy = {
                        TRUE: '是',
                        FALSE: '否',
                    };

                    return (
                        <div>
                            {allowBuy[text]}
                        </div>
                    );
                }
            }, {
                title: '最少购买量',
                className: 'text-center',
                dataIndex: 'minBuyQuantity',
                render: (text,record)=> {
                    return (
                        <div>
                            {text?(record.paraType == 'numeric'?text/unitDict[record.unit]:text):'-'}
                        </div>
                    );
                }
            }, {
                title: '刊例价/乐豆',
                className: 'text-center',
                dataIndex: 'price',
                render: (text,record)=> {
                    return (
                        <div>
                            {text?(record.paraType == 'numeric'?text/unitDict[record.unit]:text):'-'}
                        </div>
                    );
                }
            }, {
                title: '预警阈值',
                className: 'text-center',
                dataIndex: 'threshold',
                render: (text,record)=> {
                    return (
                        <div>
                            {text?(record.paraType == 'numeric'?text/unitDict[record.unit]:text):'-'}
                        </div>
                    );
                }
            }, {
                title: '描述',
                className: 'text-center',
                dataIndex: 'desc',
            }, {
                title: '操作',
                className: 'text-center',
                render: (text, record)=> {

                    return (
                        <div>
                            <a href="javascript:;" onClick={()=>edit(record.id)}>
                                修改
                            </a>
                            <span className="ant-divider"></span>
                            <a href="javascript:;" onClick={()=>synchronizePara(record.id)}>
                                同步
                            </a>
                            <span className="ant-divider"></span>
                            <a href="javascript:;" onClick={()=>deleteVersionPara(record.id)}>
                                删除
                            </a>
                        </div>
                    );
                }
            }];

        return (
            <Table rowKey={record => record.id}
                   columns={columns}
                   dataSource={data}
                   loading={loading}
                   bordered/>
        );
    }
}
