import React, {Component} from 'react';

export default class MallAuth extends Component {
    render() {
        const {contentAuth, mallAuth, yygAuth} = this.props.mallAuth;
        const {split = ','} = this.props;
        return (
            <span>
                <span>{yygAuth == 'TRUE' ? '一元购' : ''}</span>{split}
                <span>{mallAuth == 'TRUE' ? '商城' : ''}</span>{split}
                <span>{contentAuth == 'TRUE' ? '资讯' : ''}</span>
            </span>
        );
    }
}

