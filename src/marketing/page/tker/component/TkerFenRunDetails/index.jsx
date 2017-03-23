import React, { Component } from 'react';
import EarningsDetail from './EarningsDetail';
import FenRunDetail from './FenRunDetail';
import './index.less';

export default class TkerFenRunDetail extends Component {

    constructor(props) {
        super(props);
    }

    // 代言设置按钮
    onSetting = () => {
        if (!this.props.onSetting) return;
        this.props.onSetting();
    };

    render() {
        const settingData = this.props.settingData || null;
        const tkerData = this.props.tkerData || null;
        const tkerClassName = this.props.model == 'show' ? 'tker-fenrun-show' : '';
        return (
            <div className={'tker-fenrun ' + tkerClassName}>
                <div className='tker-fenrun-box'>
                    <div className="tker-fenrun-l">
                        <FenRunDetail
                            data={settingData}
                            model={this.props.model}
                            onSetting={this.onSetting}/>
                    </div>
                    <div className="tker-fenrun-r">
                        <EarningsDetail
                            model={this.props.model}
                            data={tkerData}/>
                    </div>
                </div>
            </div>
        );
    }
}








