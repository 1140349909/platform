import React, {Component} from 'react';
import {Card, Row, Col, Icon} from 'antd';
import './index.less';

/*封装卡片类*/
export default class TradeCards extends Component {


    render = ()=> {

        let {data, type} = this.props;

        if (!data) {
            return null;
        }

        return (<div style={{backgroound: '#ececec'}}>
            {type == 'mall' && <div>
                <Row gutter={16}>
                    <Col span={4}>
                        <Card>
                            <p><Icon type="pay-circle-o"/>&nbsp;<span>总销售额：</span></p>
                            <p className="trade-card-color">
                                <span className="trade-card-number">{data.salesAmount ? data.salesAmount / 100 : 0}</span>
                                元
                            </p>
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card>
                            <p><Icon type="shopping-cart"/>&nbsp;<span>商品交易品类总数：</span></p>
                            <p className="trade-card-color">
                                <span className="trade-card-number">{data.productAmount ? data.productAmount : 0}</span>
                                件
                            </p>
                        </Card>
                    </Col>


                    <Col span={4}>
                        <Card>
                            <p><Icon type="pay-circle-o"/>&nbsp;<span>总利润：</span></p>
                            <p className="trade-card-color">
                                <span className="trade-card-number">{data.profitAmount ? data.profitAmount / 100 : 0}</span>
                                元
                            </p>

                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card>
                            <p><Icon type="pay-circle-o"/>&nbsp;<span>总成本：</span></p>
                            <p className="trade-card-color">
                                <span className="trade-card-number">{data.costAmount ? data.costAmount / 100 : 0}</span>
                                元
                            </p>

                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card>
                            <p><Icon type="shopping-cart"/>&nbsp;<span>上架商品数：</span> </p>
                                <p className="trade-card-color">
                                    <span className="trade-card-number">{data.productOpenings ? data.productOpenings : 0}</span>
                                    件
                                </p>
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card>
                            <p><Icon type="shopping-cart"/>&nbsp;<span>今日交易商品数：</span></p>
                                <p className="trade-card-color">
                                    <span className="trade-card-number">{data.todayProductAmount ? data.todayProductAmount : 0}</span>
                                    件
                                </p>
                        </Card>
                    </Col>
                </Row>
            </div>}

            {type == 'yyg' && <div>
                <Row>

                    <Card style={{'float': 'left', 'width': '20%'}}>
                        <p><Icon type="pay-circle-o"/>&nbsp;
                            <span>总销售额：</span>
                            <span className="trade-card-color">
                                <span className="trade-card-number">{data.salesAmount ? data.salesAmount / 100 : 0}

                                </span>元
                            </span>
                        </p>
                        <p><Icon type="shopping-cart"/>&nbsp;
                            <span>总商品数：</span>
                            <span className="trade-card-color">
                                <span className="trade-card-number">{data.productAmount ? data.productAmount : 0}

                                </span>件
                            </span>
                        </p>
                    </Card>


                    <Card style={{'float': 'left', 'width': '20%'}}>
                        <p>
                            <Icon type="pay-circle-o"/>&nbsp;
                            <span>总利润：</span>
                            <span className="trade-card-color">
                                <span className="trade-card-number">{data.profitAmount ? data.profitAmount / 100 : 0}

                                </span>元
                            </span>
                        </p>
                        <p>
                            <Icon type="pay-circle-o"/>&nbsp;
                            <span>总成本：</span>
                            <span className="trade-card-color">
                                <span className="trade-card-number">
                                    {data.costAmount ? data.costAmount / 100 : 0}

                                </span>元
                            </span>
                        </p>
                    </Card>


                    <Card style={{'float': 'left', 'width': '20%'}}>
                        <p>
                            <Icon type="shopping-cart"/>&nbsp;
                            <span>上架商品数：</span>
                            <span className="trade-card-color">
                                <span className="trade-card-number">{data.productOpenings ? data.productOpenings : 0}

                                </span>件
                            </span>
                        </p>
                        <p><Icon type="shopping-cart"/>&nbsp;
                            <span>今日开奖商品数：</span>
                            <span className="trade-card-color">
                                <span className="trade-card-number">{data.todayProductAmount ? data.todayProductAmount : 0}

                                </span>件
                            </span>
                        </p>
                    </Card>


                    <Card style={{'float': 'left', 'width': '20%'}}>
                        <p>
                            <Icon type="team"/>&nbsp;
                            <span>总参与人数：</span>
                            <span className="trade-card-color">
                                <span className="trade-card-number">
                                    {data.peoples ? data.peoples : 0}
                                </span>
                                人
                            </span>
                        </p>
                        <p>
                            <Icon type="tags-o"/>&nbsp;
                            <span>总参与次数：</span>
                            <span className="trade-card-color">
                                <span className="trade-card-number">
                                {data.orders ? data.orders : 0}
                            </span>次
                            </span>
                        </p>
                    </Card>


                    <Card style={{'float': 'left', 'width': '20%'}}>
                        <p>
                            <Icon type="calculator"/>&nbsp;
                            <span>总信用币数：</span>
                            <span className="trade-card-color">
                                <span className="trade-card-number">{data.creditAmount ? data.creditAmount : 0}</span>枚
                            </span>
                        </p>
                        <p>
                            <Icon type="team"/>&nbsp;
                            <span>总开奖次数：</span>
                            <span className="trade-card-color">
                                <span className="trade-card-number">{data.amount ? data.amount : 0}
                                </span>次
                            </span>
                        </p>
                    </Card>

                </Row>
            </div>}
        </div>);
    }
}
