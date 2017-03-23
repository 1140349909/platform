import React ,{Component} from 'react';
import './index.less';

// 加载动画
export default class ContentLoading extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const text = this.props.text || '初始化活动中...';
        return (
            <div className="content-loading">
                <div className="loader-inner square-spin">
                    <div className="spin"></div>
                </div>
                <div className="content-loading-txt">{text}</div>
            </div>
        );
    }
}
