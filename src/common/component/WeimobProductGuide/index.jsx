import React from 'react';
import {Table, Input, Radio} from 'antd';
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
export  default class WeimobProductGuide extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        id: '',
        alias: '',
        weimobTabPanType: 'weimob'
    };

    /*componentWillReceiveProps(nextProps) {
     const {operation} = nextProps;
     switch (operation.type) {
     }
     }*/

    //获取商品字段
    getWeimobProductColumns() {
        return [{
            title: '商品',
            dataIndex: 'spu_name',
            width: 220,
            render: (text, record) => {

                return (
                    <div>
                        {record.spu.spu_name}
                    </div>
                )
            }
        }, {
            title: '库存',
            dataIndex: 'inventory',
            render: (text, record) => {
                // 取skus[*].inventory之和

                let inventory = 0;

                record.skus.map((item)=>{
                    inventory += item.inventory
                });

                return (
                    <div>
                        {inventory}
                    </div>
                )
            }
        }, {
            title: '价格',
            dataIndex: 'sale_price',
            render: (text, record) => {

                let sale_price_list = [];

                record.skus.map((item)=>{
                    sale_price_list.push(item.sale_price);
                });

                // console.log(sale_price_list);

                return (
                    <div>
                        {sale_price_list.sort()[0]}
                    </div>
                )
            }
        }];
    }

    productTabChange = (event) => {
        this.setState({
            weimobTabPanType: event.target.value
        }, () => {
            this.props.getShoppingGuideList({page: 0, size: 10}, event.target.value);
        });
    }
    onSearch = (val) => {
        this.props.getShoppingGuideList({page: 0, size: 10, q: val}, 'youzan');
    }

    render() {
        //定义表头
        const weimobColumns = this.getWeimobProductColumns();
        const {dataSource} = this.props;

        // console.dir(dataSource);

        let weimobPagination = {
            total: dataSource && dataSource.row_count,
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
            <div className='weimobPCon'>
                <div className='ant-radio-group-lk'>
                    <RadioGroup defaultValue='weimob' onChange={this.productTabChange}>
                        <RadioButton value='weimob'>微盟商城</RadioButton>
                        <RadioButton value='iloka'>艾乐卡</RadioButton>
                    </RadioGroup>
                    {/*{
                     this.state.weimobTabPanType == 'weimob' &&
                     <Search placeholder='请输入商品标题' style={{width: 200}} onSearch={this.onSearch}
                     className='searchYouzan'/>
                     }*/}
                    {
                        this.state.weimobTabPanType == 'weimob' &&
                        <Table rowSelection={this.props.rowSelection}
                               onRowClick={this.props.onRowClick}
                               rowKey={(record)=>record.spu.spu_id}
                               columns={weimobColumns}
                               dataSource={dataSource && dataSource.page_data}
                               loading={this.props.loading}
                               pagination={weimobPagination}
                               bordered={true}
                        />
                    }
                    {
                        this.state.weimobTabPanType == 'iloka' &&
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
