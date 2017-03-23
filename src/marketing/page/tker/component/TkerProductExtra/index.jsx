import React, {Component} from 'react';
import { moneyFormat } from 'common/util';
import Img from 'common/component/Img';
import './index.less';

// Card-select和新增按钮
export default class TkerProductExtra extends Component {
    render() {

        const { data } = this.props;

        if (!data) {
            return null;
        }
        return (
            <div className="tker-product-extra">
                <Img className="tker-product-extra-img" src={data.mediaRes.productImgUrl}/>
                <div className="tker-product-extra-text">
                    <p><span className="tker-product-extra-em">{data.name}</span></p>
                    <p><span className="tker-product-extra-em">商品编号：{data.code}</span></p>
                    <p>
                        <span className="tker-product-extra-em">商品售价：{moneyFormat(data.mallCfg.price)}元</span>
                        <span className="tker-product-extra-em">成本单价：{moneyFormat(data.cost)}元</span>
                        <span className="tker-product-extra-em">毛利润：{moneyFormat(data.mallCfg.price - data.cost)}元</span>
                    </p>
                </div>
            </div>
        );
    }
}
