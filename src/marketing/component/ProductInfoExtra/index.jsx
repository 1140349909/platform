import React, {Component} from 'react';
import _ from 'lodash';
import * as media from 'common/util/media';
import Img from 'common/component/Img';
import './index.less';

// Card-select和新增按钮
export default class ProductInfoExtra extends Component {
    render() {

        const { data } = this.props;

        let url     = _.has(data,'mediaRes.productImgId') ? data.mediaRes.productImgId : '',
            code    = data.code,
            title   = data.title;

        return (
            <div className="product-infoextra">
                <div className="product-infoextra-l">
                    <Img className="product-infoextra-img" src={url}/>
                </div>
                <div className="product-infoextra-r">
                    <p className="product-infoextra-p">
                        商品编号: {code}
                    </p>

                    <p className="product-infoextra-p">
                        商品名称: {title}
                    </p>
                </div>
            </div>
        );
    }
}
