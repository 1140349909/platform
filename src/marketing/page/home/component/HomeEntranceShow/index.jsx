import React, {Component} from 'react';
import {Modal, Row, Col, Button} from 'antd';
import Img from 'common/component/Img';
import './index.less';

let EntranceIconList = {
    CONTENT_RICHTEXT: require('./img/content.png'),
    //缺少活动H5
    CONTENT_HFIVE: require('img/h5.png'),

    MPLUGIN_COUPON: require('./img/coupon.png'),
    MPLUGIN_POINT: require('./img/integral.png'),

    PROMOTION_TYPE:require('./img/solution.png'),
    PROMOTION_ORDER:require('./img/order.png'),

    GOODS_MANAGE: require('./img/product-add.png'),
    GOODS_MODIFY: require('./img/product-list.png'),
    GOODS_ONSALE: require('./img/product-sale.png'),
    GOODS_LOGISTICS: require('./img/product-trade.png'),
    GOODS_BANNER: require('./img/banner-mall.png'),

    //一元购不上
    YYG_GOODS: require('./img/product-add.png'),
    YYG_SALES: require('./img/product-sale.png'),
    YYG_SHARE: require('./img/product-trade.png'),
    YYG_BANNER: require('./img/banner-mall.png'),

    //品牌代言不上
    REPRESENT_REPRESENT: require('./img/product-add.png'),
    REPRESENT_MEMBER: require('./img/product-sale.png'),
    REPRESENT_GOODS: require('./img/product-trade.png'),
    REPRESENT_WITHDRAW: require('./img/banner-mall.png'),

    //会员中心不上
    MEMBER_MEMBER: require('./img/product-trade.png'),
    MEMBER_CARD: require('./img/product-trade.png'),

    //结算中心
    PAYMENT_ACCOUNT: require('./img/charge.png'),
    PAYMENT_WITHDRAW: require('./img/withdraw.png'),
    PAYMENT_SETTING_SETTING: require('./img/setting.png'),
    PAYMENT_BILL: require('./img/invoice.png'),

    ACCOUNT_INFO: require('./img/info.png'),
    ACCOUNT_ACCOUNT: require('./img/upgrade.png'),
    ACCOUNT_NOTICE: require('./img/notifications.png'),


    PLATFORM_MICSITE: require('./img/site.png'),
    PLATFORM_ACCESS: require('./img/channel.png'),
    PLATFORM_ACCOUNT: require('./img/admin.png'),
    PLATFORM_TRADE: require('./img/payway.png'),

    SERVICE_FAQ:require('./img/faq.png'),
    SERVICE_USER:require('./img/community.png'),
};

class EntranceModal extends Component {

    constructor(props) {
        super(props);
        // props.auth.menu.splice(0,1);
        // console.log(props.auth.menu.splice(0,1));
        this.state = {
            index: 0,
            menu: props.auth.menu,
        };

    }

    selectItem = (direction)=> {

        let {index, menu} = this.state;

        let value = {
            left: index > 0 ? index - 1 : 0,
            right: index < menu.length - 1 ? index + 1 : menu.length - 1
        };

        this.setState({
            index: value[direction]
        });

    };


    render() {

        let {handleCancel, visible, setItemValue, itemList} = this.props;

        let {index, menu} = this.state;

        let tmpList = {};

        itemList.map((item)=>{
            tmpList[item.tagId] = item;
        });

        let menuInfo = [];

        menu[index].tags.map((item)=> {
            //临时需求
            if(item.key != 'CONTENT_RICHTEXT'){
                menuInfo.push(
                    <div key={item.tagId}>
                        <Col span={6}>
                            <div style={{'padding': '0 24px', 'textAlign': 'center'}}>
                                <Img
                                    src={EntranceIconList[item.key] ? EntranceIconList[item.key] : require('./img/default.png')}
                                    alt=""
                                    style={{'width': '100%', 'height': 'auto'}}/>
                            </div>
                            {/*<a href="javascript:void(0)">

                             </a>*/}
                            <div style={{'marginBottom': '10px'}}>
                                <span className="home-entrance-button">{item.name}</span>
                            </div>
                            <div style={{'marginBottom': '20px'}}>
                                <Button className={tmpList[item.tagId] ? 'home-entrance-remove' : 'home-entrance-add'}
                                        onClick={()=>setItemValue(item)}>
                                    {tmpList[item.tagId]  ? '移除' : '添加'}
                                </Button>
                            </div>

                        </Col>
                    </div>
                );
            }

            // console.log(menuInfo);
        });

        if(menuInfo.length == 0){
            menuInfo = [(
                <div key='none'>
                    <Col span={24}>
                        <div style={{'padding': '24px', 'textAlign': 'center'}}>
                            <Img src={require('./img/none.png')}
                                 alt=""
                                 style={{'width': '20%', 'height': 'auto'}}/>
                            <p style={{'marginTop':'13px'}}>暂未开放对应模块</p>
                        </div>
                    </Col>
                </div>
            )];
        }



        return (
            <Modal title='编辑快捷入口'
                   width="680px"
                   style={{top: 150}}
                   onCancel={handleCancel}
                   wrapClassName="home-entrance-modal"
                   maskClosable={false}
                   footer={null}
                   visible={visible}>
                <div style={{'textAlign': 'center'}}>
                    <p>
                        <a href="javascript:void(0)" onClick={()=>this.selectItem('left')}>
                            <Img src={require('./img/left.png')} alt=""
                                 style={{'height': 'auto', 'verticalAlign': 'text-bottom'}}/>
                        </a>
                        <span className="home-entrance-title">{menu[index].name}</span>
                        <a href="javascript:void(0)" onClick={()=>this.selectItem('right')}>
                            <Img src={require('./img/right.png')} alt=""
                                 style={{'height': 'auto', 'verticalAlign': 'text-bottom'}}/>
                        </a>
                    </p>
                    <br/>
                    <Row gutter={16}>
                        {menuInfo}
                    </Row>
                    <br/>
                </div>
            </Modal>
        );
    }

}

export {
    EntranceIconList,
    EntranceModal
};
