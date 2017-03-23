import React, {Component} from 'react';
import {Table, Select} from 'antd';
import config from 'common/config';
import DatePickerGroup from 'common/component/DatePickerGroup';
import _ from 'lodash';
import './index.less';
const Option = Select.Option;
let asyColumns = [];
let dataNames = [];
let dataSource = [];
let formNameOptions = [];

export default class FormDataList extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        page: 0,
        current: 1,
        size: config.SIZE,
        commonColumns: [{
            title: '所属城市',
            dataIndex: 'area',
        }, {
            title: '创建时间',
            dataIndex: 'createdDate',
        }],//通用表单字段
        rpValue: '',
    }
    //动态获取表单数据 并解析组装数据源和表项
    _renderColumns = () => {
        asyColumns = [];
        dataNames = [];
        dataSource = [];
        formNameOptions = [];

        const {content} = this.props.formDataList;
        _.map(content, (item) => {
            let temp = {};
            temp.area = item.area;
            temp.createdDate = item.createdDate;
            _.map(item.form, (form) => {
                _.map(form.data, (data, index) => {
                    if (dataNames.indexOf(data.name) == -1) {
                        asyColumns.push({
                            title: data.text,
                            dataIndex: 'text_' + index,
                        });
                    }
                    temp['text_' + index] = data.value;
                    dataNames.push(data.name);
                });
            });
            dataSource.push(temp);
        });
        asyColumns = this.state.commonColumns.concat(asyColumns);
        return asyColumns;
    }
    //设置时间
    filterByData = (dates, dateStrings) => {
        this.setState({
            rpValue: [dates[0], dates[1]]
        });
        this.props.list({
            startDate: dateStrings[0],
            endDate: dateStrings[1],
            appid: this.props.appid,
        });
    };
    //表单名称筛选
    onChange = (val) => {
        this.props.list({
            startDate: this.state.rpValue ? this.state.rpValue[0] : null,
            endDate: this.state.rpValue ? this.state.rpValue[1] : null,
            appid: this.props.appid,
            formId: val
        });
    }
    _renderFormOptions = () => {
        const {content} = this.props.formDataList;
        let formIds = [];
        formNameOptions = [];
        _.map(content, (item) => {
            _.map(item.form, (form) => {
                if (formIds.indexOf(form.formId) == -1) {
                    formNameOptions.push({
                        formId: form.formId,
                        formName: form.formName
                    });
                    formIds.push(form.formId);
                }
            });
        });
        return (
            _.map(formNameOptions, (item, index) => {
                return (
                    <Option key={index} value={item.formId}>{item.formName}</Option>
                );
            })
        );
    }

    render() {
        const {formDataList} = this.props;
        let pagination = {
            total: formDataList && formDataList.totalElements,//
            showSizeChanger: false,
            pageSize: formDataList && formDataList.size,
            current: this.state.page + 1,
            onChange: (page) => {
                this.setState({
                    page: page - 1,
                    current: page
                });
                this.props.list({page: page - 1});
            },
        };

        return (
            <div>
                <div className='datePicker'>
                    选择时间：
                    <DatePickerGroup
                        style={{width: 231}}
                        size="large"
                        format="YYYY-MM-DD"
                        showTime={false}
                        value={this.state.rpValue}
                        onChange={this.filterByData}/>
                </div>
                <div className='filter'>
                    表单名称：
                    <Select showSearch={true}
                            style={{width: 160}}
                            placeholder="请选择"
                            notFoundContent=""
                            onChange={this.onChange}>
                        {this._renderFormOptions()}
                    </Select>
                </div>
                <Table
                    rowKey={record => record.index}
                    className='formDataTable'
                    columns={this._renderColumns()}
                    pagination={pagination}
                    dataSource={dataSource}
                    bordered
                    loading={this.props.loading}
                />
            </div>

        );
    }
}
