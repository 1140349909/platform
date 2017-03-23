import React, {Component} from 'react';
import {Card, Icon, Progress} from 'antd';
import './index.less';

export default class StatBody extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="stat">
                <Card title="数据分析-(迭代3)" style={{paddingBottom:20}}>
                    <div className="stat-title">
                        <h2 className="stat-h2">平台名称：一元购</h2>
                        <p className="stat-p">移动端链接：www.baidu.com</p>
                        <div className="stat-title-qrcode">
                            <Icon type="qrcode"/>
                        </div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-box-l-con">
                            <Card title="在线产品" className="stat-box-card">
                                <div className="stat-box-tit">
                                    <h2>产品总类数</h2>
                                    <p>20</p>
                                </div>
                                <div className="stat-box-tit2">
                                    <h2>产品总期数</h2>
                                    <p>200</p>
                                </div>
                            </Card>

                            <Card title="注册会员" className="stat-box-card2">
                                <div className="stat-box-tit">
                                    <h2>会员总数</h2>
                                    <p>20</p>
                                </div>
                                <div className="stat-box-tit">
                                    <h2>今日参与会员数</h2>
                                    <p>200</p>
                                </div>
                                <div className="stat-box-tit2">
                                    <h2>今日新增会员</h2>
                                    <p>200</p>
                                </div>
                            </Card>
                            <Card title="交易金额" className="stat-box-card3">
                                <div className="stat-box-tit">
                                    <h2>交易总金额</h2>
                                    <p>20</p>
                                </div>
                                <div className="stat-box-tit2">
                                    <h2>今日交易总额</h2>
                                    <p>200</p>
                                </div>
                            </Card>
                        </div>
                        <div className="stat-chart">
                            <Card title="图表" style={{marginTop:10}}>

                            </Card>
                        </div>
                        <div className="stat-distribution">
                            <div className="stat-distribution-l">
                                <Card title="会员省份分布" className="stat-distribution-box">
                                    <ul className="stat-distribution-box-ul">
                                        <li>
                                            <div className="stat-distribution-box-ul-name">河北省</div>
                                            <Progress className="stat-distribution-progress" percent={50}
                                                      status="active"/>
                                        </li>
                                        <li>
                                            <div className="stat-distribution-box-ul-name">河北省</div>
                                            <Progress className="stat-distribution-progress" percent={50}
                                                      status="active"/>
                                        </li>
                                        <li>
                                            <div className="stat-distribution-box-ul-name">河北省</div>
                                            <Progress className="stat-distribution-progress" percent={50}
                                                      status="active"/>
                                        </li>
                                        <li>
                                            <div className="stat-distribution-box-ul-name">河北省</div>
                                            <Progress className="stat-distribution-progress" percent={50}
                                                      status="active"/>
                                        </li>
                                        <li>
                                            <div className="stat-distribution-box-ul-name">河北省</div>
                                            <Progress className="stat-distribution-progress" percent={50}
                                                      status="active"/>
                                        </li>
                                        <li>
                                            <div className="stat-distribution-box-ul-name">河北省</div>
                                            <Progress className="stat-distribution-progress" percent={50}
                                                      status="active"/>
                                        </li>
                                        <li>
                                            <div className="stat-distribution-box-ul-name">河北省</div>
                                            <Progress className="stat-distribution-progress" percent={50}
                                                      status="active"/>
                                        </li>
                                    </ul>
                                </Card>
                                <Card title="产品交易期数" className="stat-distribution-box2">
                                    <ul className="stat-distribution-box-ul">
                                        <li>
                                            <span className="stat-distribution-box-ul-spanl">iphone 64新版手机页面</span>
                                            <span className="stat-distribution-box-ul-spanr">2345</span>
                                        </li>
                                        <li>
                                            <span className="stat-distribution-box-ul-spanl">iphone 64新版手机页面</span>
                                            <span className="stat-distribution-box-ul-spanr">2345</span>
                                        </li>
                                        <li>
                                            <span className="stat-distribution-box-ul-spanl">iphone 64新版手机页面</span>
                                            <span className="stat-distribution-box-ul-spanr">2345</span>
                                        </li>
                                        <li>
                                            <span className="stat-distribution-box-ul-spanl">iphone 64新版手机页面</span>
                                            <span className="stat-distribution-box-ul-spanr">2345</span>
                                        </li>
                                        <li>
                                            <span className="stat-distribution-box-ul-spanl">iphone 64新版手机页面</span>
                                            <span className="stat-distribution-box-ul-spanr">2345</span>
                                        </li>
                                        <li>
                                            <span className="stat-distribution-box-ul-spanl">iphone 64新版手机页面</span>
                                            <span className="stat-distribution-box-ul-spanr">2345</span>
                                        </li>
                                        <li>
                                            <span className="stat-distribution-box-ul-spanl">iphone 64新版手机页面</span>
                                            <span className="stat-distribution-box-ul-spanr">2345</span>
                                        </li>
                                    </ul>
                                </Card>
                            </div>
                            <div className="stat-distribution-r">
                                <Card title="会员参与" className="stat-box-card4">
                                    <ul className="stat-box-card4-ul">
                                        <li className="stat-box-card4-ul-li">
                                            <div className="stat-box-card4-ul-li-tit">
                                                15855388552
                                                <span className="stat-box-card4-ul-li-right">5幸运币</span>
                                            </div>
                                            <div>参与一元购</div>
                                            <div>
                                                上海市
                                                <span className="stat-box-card4-ul-li-right">2015-02-12 18:12:10</span>
                                            </div>
                                        </li>
                                        <li className="stat-box-card4-ul-li">
                                            <div className="stat-box-card4-ul-li-tit">
                                                15855388552
                                                <span className="stat-box-card4-ul-li-right">5幸运币</span>
                                            </div>
                                            <div>参与一元购</div>
                                            <div>
                                                上海市
                                                <span className="stat-box-card4-ul-li-right">2015-02-12 18:12:10</span>
                                            </div>
                                        </li>
                                        <li className="stat-box-card4-ul-li">
                                            <div className="stat-box-card4-ul-li-tit">
                                                15855388552
                                                <span className="stat-box-card4-ul-li-right">5幸运币</span>
                                            </div>
                                            <div>参与一元购</div>
                                            <div>
                                                上海市
                                                <span className="stat-box-card4-ul-li-right">2015-02-12 18:12:10</span>
                                            </div>
                                        </li>
                                        <li className="stat-box-card4-ul-li">
                                            <div className="stat-box-card4-ul-li-tit">
                                                15855388552
                                                <span className="stat-box-card4-ul-li-right">5幸运币</span>
                                            </div>
                                            <div>参与一元购</div>
                                            <div>
                                                上海市
                                                <span className="stat-box-card4-ul-li-right">2015-02-12 18:12:10</span>
                                            </div>
                                        </li>
                                        <li className="stat-box-card4-ul-li">
                                            <div className="stat-box-card4-ul-li-tit">
                                                15855388552
                                                <span className="stat-box-card4-ul-li-right">5幸运币</span>
                                            </div>
                                            <div>参与一元购</div>
                                            <div>
                                                上海市
                                                <span className="stat-box-card4-ul-li-right">2015-02-12 18:12:10</span>
                                            </div>
                                        </li>
                                        <li className="stat-box-card4-ul-li">
                                            <div className="stat-box-card4-ul-li-tit">
                                                15855388552
                                                <span className="stat-box-card4-ul-li-right">5幸运币</span>
                                            </div>
                                            <div>参与一元购</div>
                                            <div>
                                                上海市
                                                <span className="stat-box-card4-ul-li-right">2015-02-12 18:12:10</span>
                                            </div>
                                        </li>
                                        <li className="stat-box-card4-ul-li">
                                            <div className="stat-box-card4-ul-li-tit">
                                                15855388552
                                                <span className="stat-box-card4-ul-li-right">5幸运币</span>
                                            </div>
                                            <div>参与一元购</div>
                                            <div>
                                                上海市
                                                <span className="stat-box-card4-ul-li-right">2015-02-12 18:12:10</span>
                                            </div>
                                        </li>
                                        <li className="stat-box-card4-ul-li">
                                            <div className="stat-box-card4-ul-li-tit">
                                                15855388552
                                                <span className="stat-box-card4-ul-li-right">5幸运币</span>
                                            </div>
                                            <div>参与一元购</div>
                                            <div>
                                                上海市
                                                <span className="stat-box-card4-ul-li-right">2015-02-12 18:12:10</span>
                                            </div>
                                        </li>
                                    </ul>
                                </Card>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

