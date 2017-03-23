import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import {Modal, Select, Button, Row, Col} from 'antd';
const Option = Select.Option;
import DatePickerGroup from 'common/component/DatePickerGroup';

export default class TagShow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tagType: props.tagType,
            sort: props.sort
        };
    }

    getOption = (data) => {

        let legendName = ['使用数'],
            seriesData = [];

        let xAxisData = [];

        data.map((item) => {
            xAxisData.push(item.name);
            seriesData.push(item.uses);
        });

        return {
            title: {
                text: '标签使用数统计'
            },
            legend: {
                data: legendName,
                align: 'left',
                right: 0
            },
            series: [
                {
                    name: legendName,
                    type: 'bar',
                    data: seriesData,
                    label: {
                        normal: {
                            position: 'top',
                            show: true
                        }
                    }
                }
            ],
            xAxis: {
                name: '标签',
                data: xAxisData,
            },
            yAxis: {
                name: '使用数',
                minInterval: 1
            },
        };
    }

    onChange = (value) => {

        const {updateTagAgg, param} = this.props;

        let formData = {
            tagId: param,
        };

        switch (typeof value) {
            case 'string':
                formData.dateRange = value;
                break;
            case 'object':
                formData.startDate = value[0].format('YYYY-MM-DD');
                formData.endDate = value[1].format('YYYY-MM-DD');
                break;
        }

        updateTagAgg(formData);
    };

    handleSubmit = (e) => {

        const {form, updateTagAgg, param} = this.props;

        e.preventDefault();

        form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {

                let formData = {
                    tagId: param,
                };

                switch (values.filterType) {
                    case 'system':
                        formData.dateRange = values.dataRange;
                        break;
                    case 'user':
                        formData.startDate = values.user[0];
                        formData.endDate = values.user[1];
                        break;
                }


                // 验证
                // console.dir(formData);

                updateTagAgg(formData);

            }
        });
    };

    render() {


        let {visible, reset, data} = this.props;

        let footer = (
            <div>
                {/*<Button type="primary" onClick={this.handleSubmit}>确定</Button>*/}
                <Button onClick={reset}>取消</Button>
            </div>
        );

        return (
            <div>
                <Modal title='平台标签统计'
                       width="800px"
                       visible={visible}
                       footer={footer}
                       onCancel={reset}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <p style={{'lineHeight': '32px'}}><span>指定参数查询：</span></p>
                            <Select onChange={this.onChange} style={{width: '100%'}} defaultValue="last30days">
                                <Option value="today">今天</Option>
                                <Option value="yesterday">昨天</Option>
                                <Option value="last7days">最近七天</Option>
                                <Option value="last30days">最近三十天</Option>
                                <Option value="currMonth">当月</Option>
                            </Select>
                        </Col>
                        <Col span={12}>
                            <p style={{'lineHeight': '32px'}}><span>指定范围查询：</span></p>
                            <DatePickerGroup
                                style={{width: '100%'}}
                                onChange={this.onChange}
                                format="YYYY-MM-DD"/>
                        </Col>
                    </Row>
                    <br/>

                    {data.length != 0 && <ReactEcharts option={this.getOption(data)}/>}
                    {data.length == 0 &&
                    <div style={{'lineHeight': 10, 'textAlign': 'center', 'color': '#999999', 'fontSize': 18}}>
                        暂无数据
                    </div>}
                </Modal>
            </div>
        );
    }
}
