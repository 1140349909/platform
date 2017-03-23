import React, {Component} from 'react';
import {Modal, Button} from 'antd';
import './index.less';

export default class TemplateCreateShow extends Component {

    constructor(props) {
        super(props);
    }

    state = {};

    render = () => {

        // 收藏模板和使用模板方法继承
        let {visible, reset, handleSubmit} = this.props;

        let title = '购买模板',
            width = 778,
            footer = (
                <div style={{'textAlign': 'center'}}>
                    <Button onClick={reset}>取消</Button>
                    <Button type="primary"
                            onClick={() => handleSubmit}>确定购买</Button>
                </div>
            ),
            maskClosable = false,

            content = (
                <div>
                    <p>需支付
                        <span style={{'color': '#009dfc'}}>100</span>
                        乐豆，
                        当前乐豆余额：
                        <span>200</span>
                        个。</p>
                </div>

            );

        return (
            <div>
                <Modal title={title}
                       className="template-preview-container"
                       visible={visible}
                       width={width}
                       footer={footer}
                       maskClosable={maskClosable}
                       onCancel={reset}>
                    {content}
                </Modal>
            </div>
        );
    };
}
