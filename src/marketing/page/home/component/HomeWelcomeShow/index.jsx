import React, {Component} from 'react';
import {Modal, Row, Col, Icon} from 'antd';
import Img from 'common/component/Img';
import './index.less';

let WelcomeIconList = {
    channel: require('./img/channel.png'),
    payway: require('./img/payway.png'),
    admin: require('./img/admin.png'),
    vsite: require('./img/vsite.png'),
};

class WelcomeModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let {handleCancel, visible, configInfo} = this.props;

        let welcomeList = [
            {
                title: '发布授权',
                img: require('./img/channel.png'),
                href: 'marketing.html#/channel',
                status: configInfo.publish == 'TRUE'
            }, {
                title: '交易设置',
                img: require('./img/payway.png'),
                href: 'marketing.html#/payway',
                status: configInfo.trade == 'TRUE'
            }, {
                title: '成员管理',
                img: require('./img/admin.png'),
                href: 'marketing.html#/admin',
                status: configInfo.manager == 'TRUE'
            }, {
                title: '微站设置',
                img: require('./img/vsite.png'),
                href: 'marketing.html#/content/site',
                status: configInfo.vsite == 'TRUE'
            }
        ];

        let welcomeContent = [];

        welcomeList.map((item, index) => {
            welcomeContent.push(
                <Col span={6} key={index}>
                    <a href={item.href} target="_blank">
                        <div style={{'padding': '24px'}}>
                            <Img src={item.img} alt="" style={{'width': '100%', 'height': 'auto'}}/>
                            <span className="home-welcome-menu">
                                {item.status && <Icon type="check-circle" style={{
                                    'color': '#87d068',
                                    'fontSize': '14px',
                                    'marginRight': '8px'
                                }}/>}
                                {item.title}
                            </span>
                        </div>
                    </a>
                </Col>
            );
        });

        return (
            <Modal title={null}
                   width="620px"
                   style={{top: 50}}
                   onCancel={handleCancel}
                   wrapClassName="home-welcome-modal"
                   maskClosable={false}
                   footer={null}
                   visible={visible}>
                <div style={{'textAlign': 'center', 'margin': '34px auto'}}>
                    <p className="home-welcome-title" style={{'marginBottom': '43px'}}>欢迎使用艾乐卡</p>
                    <p className="home-welcome-desc">为了帮助您更好的使用艾乐卡，建议您首先完成以下四步运营前准备设置</p>
                    <br/>
                    <Row>
                        {welcomeContent}
                    </Row>
                </div>
            </Modal>
        );
    }

}

export default{
    WelcomeIconList,
    WelcomeModal
};
