import React, {Component} from 'react';
import {Radio, Modal, message} from 'antd';
import './index.less';
const RadioGroup = Radio.Group;
import _ from 'lodash';

export default class ReasonModal extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.checkReason = {};
        this._renderReasonCheckList();
    }

    state = {
        confirmLoading: false,
    };
    onChange = (e) => {
        this.checkReason = e.target.value;
    }
    handleOk = () => {
        if (this.checkReason) {
            this.props.auditReason(this.checkReason);
        } else {
            const reason = this._getReasonTitle();
            message.error(reason);
        }
    }

    _getReasonTitle = () => {
        const auditStatus = this.props.auditStatus;
        const data = {'s29': '请选择不通过的原因', 's26': '请选择重新审核该模板的原因', 's49': '请选择下架的原因', 's46': '请选择待上架的原因'};
        return data[auditStatus];
    }

    _renderReasonCheckList = () => {
        const reasonData = [
            {
                id: 's29',
                reasons: ['版权异议', '质量不达标', '作品主题不符', '涉嫌违法', '涉嫌商业竞品', '详情咨询客服']
            },
            {
                id: 's26',
                reasons: ['版权暂无异议', '质量达标', '作品符合主题', '暂不涉嫌违法', '暂不涉嫌商业竞品', '详情咨询客服']
            },
            {
                id: 's49',
                reasons: ['版权纠纷', '调整投放周期']
            },
            {
                id: 's46',
                reasons: ['版权暂无异议', '调整投放周期']
            }
        ];
        return _.map(reasonData, (data) => {
            if (data.id == this.props.auditStatus) {
                const reasons = data.reasons;
                return _.map(reasons, (reason, k) => {
                    if (k == 0) {
                        this.checkReason = reason;
                    }
                    return (<Radio value={reason} key={k}>{reason}</Radio> );
                });
            } else {
                return null;
            }
        });
    }

    render() {
        return (
            <Modal title="提示"
                   visible={this.props.visible}
                   maskClosable={false}
                   onOk={this.handleOk}
                   confirmLoading={this.state.confirmLoading}
                   onCancel={this.props.reset}
                   className='reasonModal'
                   width={400}
            >
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <div className='reason-title'>
                                {this._getReasonTitle()}
                            </div>
                            <RadioGroup defaultValue={this.checkReason} onChange={this.onChange}>
                                {
                                    this._renderReasonCheckList()
                                }
                            </RadioGroup>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </Modal>
        );
    }
}
