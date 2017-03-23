import React, {Component} from 'react';
import {Modal, Tooltip, Row, Col,Button} from 'antd';
import Img from 'common/component/Img';
import './index.less';

/*封装模态框类，与表单配合使用*/
export default class HistoryShow extends Component {

    constructor(props) {
        super(props);
    }

    render = ()=> {
        let {data, visible, reset, param} = this.props;

        // console.dir(data);

        let title = '已发布';

        switch (param) {
            case 'wx':
                title += '公众号';
                break;
            case 'wb':
                title += '微博号';
                break;
            case 'toutiao':
                title += '头条号';
                break;

        }

        title = title + '（' + data.uins.length + '）';

        let footer = (
            <div>
                <Button className="content-button-uins" type="primary" onClick={reset}>确定</Button>
            </div>
        );

        return (
            <div>
                <Modal
                    className="content-uins-container"
                    width={800}
                    footer={footer}
                    title={title}
                    visible={visible}
                    onCancel={reset}
                    onOk={reset}>
                    <Row gutter={16} style={{'textAlign': 'center'}}>
                        {
                            param == 'wx' && data.uins.map((id)=>(
                                data.list.map((item, index2)=> (
                                    item.authorizer_appid == id && <Tooltip title={(
                                        <div>
                                            <p>
                                                <span>{item.authorizerInfo.service_type_info.id < 2 ? '订阅号:' : '服务号:'}</span>
                                                <span>{item.authorizerInfo ? item.authorizerInfo.alias : '匿名'}</span>
                                            </p>
                                        </div>
                                    )} arrowPointAtCenter key={index2}>
                                        <Col span={3}>
                                            <div style={{
                                                'width': '32px',
                                                'height': '32px',
                                                'marginRight': '12px',
                                                'display': 'inline-block'
                                            }}>
                                                <Img
                                                    src={item.authorizerInfo ? item.authorizerInfo.head_img : ''}
                                                    alt="暂无"
                                                    style={{
                                                        'width': '32px',
                                                        'borderRadius': '2px',
                                                        'verticalAlign': 'text-bottom'
                                                    }}/>
                                            </div>
                                            <div style={{'marginTop':'10px','width': '82px',}}>
                                                <p style={{
                                                    'textOverflow': 'ellipsis',
                                                    'overflow': 'hidden',
                                                    'whiteSpace': 'nowrap'
                                                }}>{item.authorizerInfo ? item.authorizerInfo.nick_name : '匿名'}</p>
                                            </div>
                                        </Col>
                                    </Tooltip>
                                ))
                            ))
                        }
                        {
                            param == 'wb' && data.uins.map((id)=>(
                                data.list.map((item, index2)=> (
                                    item.uid == id && <Tooltip title={(
                                        <div>
                                            <p>
                                                <span>微博号：{item.uid?item.uid : '匿名'}</span>
                                            </p>
                                        </div>
                                    )} arrowPointAtCenter key={index2}>
                                        <Col span={3}>
                                            <div style={{
                                                'width': '32px',
                                                'height': '32px',
                                                'marginRight': '12px',
                                                'display': 'inline-block'
                                            }} key={id}>
                                                <Img
                                                    src={item.authorizerInfo ? item.authorizerInfo.profile_image_url : ''}
                                                    alt="暂无"
                                                    style={{
                                                        'width': '32px',
                                                        'borderRadius': '2px',
                                                        'verticalAlign': 'text-bottom'
                                                    }}/>
                                            </div>
                                            <div style={{'marginTop':'10px','width': '82px',}}>
                                                <p style={{
                                                    'textOverflow': 'ellipsis',
                                                    'overflow': 'hidden',
                                                    'whiteSpace': 'nowrap'
                                                }}>{item.authorizerInfo ? item.authorizerInfo.name : '匿名'}</p>
                                            </div>
                                        </Col>

                                    </Tooltip>
                                ))
                            ))
                        }
                        {
                            param == 'toutiao' && data.uins.map((id)=>(
                                data.list.map((item, index2)=> (
                                    item.uid == id && <Tooltip title={(
                                        <div>
                                            <p>
                                                <span>头条号：{item.uid?item.uid : '匿名'}</span>
                                            </p>
                                        </div>
                                    )} arrowPointAtCenter key={index2}>
                                        <Col span={3}>
                                            <div style={{
                                                'width': '32px',
                                                'height': '32px',
                                                'marginRight': '12px',
                                                'display': 'inline-block'
                                            }} key={id}>
                                                <Img
                                                    src={item.authorizerInfo ? item.authorizerInfo.avatar_url : ''}
                                                    alt="暂无"
                                                    style={{
                                                        'width': '32px',
                                                        'borderRadius': '2px',
                                                        'verticalAlign': 'text-bottom'
                                                    }}/>
                                            </div>
                                            <div style={{'marginTop':'10px','width': '82px',}}>
                                                <p style={{
                                                    'textOverflow': 'ellipsis',
                                                    'overflow': 'hidden',
                                                    'whiteSpace': 'nowrap'
                                                }}>{item.authorizerInfo ? item.authorizerInfo.screen_name : '匿名'}</p>
                                            </div>
                                        </Col>

                                    </Tooltip>
                                ))
                            ))
                        }
                    </Row>


                </Modal>
            </div>
        );
    };
}
