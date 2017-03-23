import React, {Component} from 'react';
import * as media from 'common/util/media';
import {Modal,Row,Col} from 'antd';
import Img from 'common/component/Img';

/*封装模态框类，与表单配合使用*/
export default class CommentShow extends Component {

    constructor(props) {
        super(props);
    }

    render = ()=> {
        let {data} = this.props;
        if (!data) {
            return null;
        }

        let title = '',
            visible1 = false,
            visible2 = false;

        switch (this.props.type) {
            case 'showInfo':
                title = '查看详情';
                visible2 = true;
                break;
            case 'deleteComment':
                title = '强制删除';
                visible1 = true;
                break;
        }

        const images = [];

        for (let i = 0; i < this.props.data.imgIds.length; i++) {
            images.push(

                    <Img src={this.props.data.imgIds[i]}
                         key={i}
                         alt="" style={{'maxWidth': '100%', 'height': 100,'display':'inline-block','margin':'5px'}}/>

            );
        }

        return (
            <div>
                <Modal
                       title={title}
                       visible={visible1}
                       onCancel={this.props.reset}
                       onOk={()=>this.props.confirmDelete(this.props.data)}>
                    <div>
                        <span>确定要强制删除吗？</span>
                    </div>
                </Modal>
                <Modal
                       title={title}
                       visible={visible2}
                       onCancel={this.props.reset}
                       onOk={this.props.reset}>
                    <div>
                        <div>
                            {images}
                        </div>
                        <br/>
                        <Row>
                            <Col span={24}>
                                {this.props.data.content}
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>
        );
    };
}
