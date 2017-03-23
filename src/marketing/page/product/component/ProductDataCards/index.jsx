import React, {Component} from 'react';
import {Card} from 'antd';
import { moneyFormat } from 'common/util';
import './index.less';

// 新增产品容器-父组件
export default class ProductDataCards extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let {saleTotal} = this.props,
            productOpenings = 0,
            todayProductAmount = 0,
            productAmount = 0,
            salesAmount = 0,
            costAmount = 0,
            profitAmount = 0;

        if (saleTotal) {
            productOpenings = saleTotal.productOpenings;
            todayProductAmount = saleTotal.todayProductAmount;
            productAmount = saleTotal.productAmount;
            salesAmount = saleTotal.salesAmount;
            costAmount = saleTotal.costAmount;
            profitAmount = saleTotal.profitAmount;
        }

        return (
            <div className="product-datacards">
                <Card className="product-datacards-item">
                    <p className="product-datacards-item-tit">上架商品品类数</p>
                    <p className="product-datacards-item-number">{productOpenings}</p>
                </Card>

                <Card className="product-datacards-item">
                    <p className="product-datacards-item-tit">今日交易商品品类总数</p>
                    <p className="product-datacards-item-number">{todayProductAmount}</p>
                </Card>

                <Card className="product-datacards-item">
                    <p className="product-datacards-item-tit">商品交易品类总数</p>
                    <p className="product-datacards-item-number">{productAmount}</p>
                </Card>

                <Card className="product-datacards-item">
                    <p className="product-datacards-item-tit">交易总金额/元</p>
                    <p className="product-datacards-item-number">{moneyFormat(salesAmount)}</p>
                </Card>

                <Card className="product-datacards-item">
                    <p className="product-datacards-item-tit">交易总成本/元</p>
                    <p className="product-datacards-item-number">{moneyFormat(costAmount)}</p>
                </Card>

                <Card className="product-datacards-item">
                    <p className="product-datacards-item-tit">交易总利润/元</p>
                    <p className="product-datacards-item-number">{moneyFormat(profitAmount)}</p>
                </Card>

                <Card className="product-datacards-item">
                    <a className="product-datacards-item-add" onClick={() => {this.props.locationAdd();}}> + 新增商品</a>
                </Card>

            </div>
        );
    }
}
