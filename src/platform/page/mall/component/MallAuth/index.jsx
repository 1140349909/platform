import React, {Component} from 'react';

export default class MallAuth extends Component {
    render() {
        const {mallOpMode, partnerAuth, brandAuth} = this.props.mallAuth;
        const {split = ','} = this.props;
        return (
            <span>
                <span>{mallOpMode == 'S' ? '单商城运营' : '多商城运营'}</span>{split}
                <span>{partnerAuth == 'True' ? '合作企业' : '无合作企业'}</span>{split}
                <span>{brandAuth == 'True' ? '品牌企业' : '无品牌企业'}</span>
            </span>
        );
    }
}
