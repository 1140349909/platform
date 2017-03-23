import React from 'react';
import {bindActionCreators} from 'redux';
import PageBase from 'common/base/PageBase';
import {Card} from 'antd';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as productAction from '../../store/product/action';
import ProductSaleList from './component/ProductSaleList';

@connect(
    state => ({
        openingList: state.product.toJS().openingList,
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...productAction
        }, dispatch)
    })
)
@withRouter
export default class List extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        page: 0,
        size: 10
    };

    // 组件加载
    componentDidMount() {
        this.list(0);
    }

    // 获取列表
    list = (page, size, params) => {
        if (!isNaN(page)) {
            this.setState({
                page
            });
        } else {
            page = this.state.size;
        }

        if (!isNaN(size)) {
            this.setState({
                size
            });
        } else {
            size = this.state.size;
        }

        this.props.actions.getOpeningProducts({
            page,
            size: size,
            ...params
        });
    };

    render() {

        const {operation} = this.props;

        const isProductSaleListLoading = operation.type == productAction.GET_OPENING_PRODUCTS_PENDING;
        return (
            <div className="app-page">
                <Card title="在售商品">
                    <ProductSaleList
                        data={this.props.openingList.content}
                        total={this.props.openingList.totalElements}
                        size={this.state.size}
                        list={this.list}
                        loading={isProductSaleListLoading}/>
                </Card>
            </div>
        );
    }
}
