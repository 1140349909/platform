import React from 'react';
import { Table, Input, Radio} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import './index.less';
const Search = Input.Search;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
@connect(
    state => ({
        operation: state.operation,
        auth: state.auth.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({}, dispatch)
    })
)
// 一键导购
export  default class YouZanProductGuide extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        id: '',
        alias: '',
        youzanTabPanType: 'youzan'
    };

    /*componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
        }
    }*/

    //获取商品字段
    getYouzanProcutColumns() {
        return [{
            title: '商品',
            dataIndex: 'title',
            width: 220
        }, {
            title: '库存',
            dataIndex: 'num',
        }, {
            title: '总销量',
            dataIndex: 'sold_num',
        }, {
            title: '创建时间',
            dataIndex: 'created',
        }];
    }

    productTabChange = (event) => {
        this.setState({
            youzanTabPanType: event.target.value
        }, () => {
            this.props.getShoppingGuideList({page: 0, size: 10}, event.target.value);
        });
    }
    onSearch = (val) => {
        this.props.getShoppingGuideList({page: 0, size: 10, q: val}, 'youzan');
    }

    render() {
        //定义表头
        const youzanColumns = this.getYouzanProcutColumns();
        const {dataSource} = this.props;
        let youzanPagination = {
            total: dataSource && dataSource.total_results,
            showSizeChanger: false,
            defaultPageSize: 10,
            onChange: (current) => {
                this.setState({
                    loading: true
                });
                this.props.getShoppingGuideList({
                    page: current - 1,
                    size: 10
                }, this.props.tabType);
            },
        };
        return (
            <div className='youzanPCon'>
                <div className='ant-radio-group-lk'>
                    <RadioGroup defaultValue='youzan' onChange={this.productTabChange}>
                        <RadioButton value='youzan'>有赞商城</RadioButton>
                        <RadioButton value='iloka'>艾乐卡</RadioButton>
                    </RadioGroup>
                    {
                        this.state.youzanTabPanType == 'youzan' &&
                        <Search placeholder='请输入商品标题' style={{width: 200}} onSearch={this.onSearch}
                                className='searchYouzan'/>
                    }
                    {
                        this.state.youzanTabPanType == 'youzan' &&
                        <Table rowSelection={this.props.rowSelection}
                               onRowClick={this.props.onRowClick}
                               rowKey='alias'
                               columns={youzanColumns}
                               dataSource={dataSource && dataSource.items}
                               loading={this.props.loading}
                               pagination={youzanPagination}
                               bordered={true}
                        />
                    }
                    {
                        this.state.youzanTabPanType == 'iloka' &&
                        <Table rowSelection={this.props.rowSelection}
                               rowKey='id'
                               onRowClick={this.props.onRowClick}
                               columns={this.props.columns}
                               dataSource={this.props.data}
                               loading={this.props.loading}
                               pagination={this.props.pagination}
                               bordered={true}
                        />
                    }
                </div>
            </div>
        );
    }
}
