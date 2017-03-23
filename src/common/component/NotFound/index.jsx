import React,{Component} from 'react';
import Img from 'common/component/Img';
import './index.less';
export default class NotFound extends Component {
    render() {
        return (
            <div className="building">
                <Img src="building.gif"/>
                <p>{this.props.name}程序猿正在努力的建设中...</p>
            </div>
        );
    }
}
