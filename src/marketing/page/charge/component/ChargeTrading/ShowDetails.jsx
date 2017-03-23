import React, { Component } from 'react';
import { Modal, Button} from 'antd';
import ShowDetailsList from './ShowDetailsList';

class ShowDetails extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const {type, data} = this.props;
        let title = type == 'withdraw' ? '消费详情' : '充值详情';

        const btns = [
            <Button
                key='return'
                onClick={this.props.reset}
                size="large">返回</Button>
        ];

        return (
            <Modal
                title={title}
                width={1000}
                onCancel={this.props.reset}
                visible={true}
                footer={btns}
                maskClosable={false}>
                <ShowDetailsList
                    data={data}
                    type={type}/>
            </Modal>
        );
    }
}

export default ShowDetails;
