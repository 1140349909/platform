import React, {Component} from 'react';
import {Modal} from 'antd';
import MallAuth from '../MallAuth';
import MallFeatureAuth from '../MallFeatureAuth';
export default class MallShow extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {data} = this.props;

        if (!data) {
            return null;
        }

        return (
            <div>
                <Modal title="商城运营详情"
                       visible={this.props.visible}
                       onOk={this.props.reset.bind(this)}
                       onCancel={this.props.reset.bind(this)}>
                    <p>商城ID:{data.id}</p>
                    <p>客户编号:{data.uin}</p>
                    <p>商城名称:{data.name}</p>
                    <p>商城账号:{data.userName}</p>
                    <p>联系人:{data.contact.name}</p>
                    <p>联系电话:{data.contact.mobile}</p>
                    <p>平台权限:<MallAuth mallAuth={data.mallAuth}/></p>
                    <p>功能权限:<MallFeatureAuth mallAuth={data.mallAuth}/></p>
                </Modal>
            </div>
        );
    }
}
