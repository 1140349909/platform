import React, {Component} from 'react';
import './index.less';

// 站点发布卡片
export default class Card extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        visible: this.props.visible || false,
    };

    onClick = () => {
        this.setState({
            visible: !this.state.visible,
        });
    };

    render() {

        const {visible} = this.state;
        const {title,children} = this.props;

        const display = visible ? 'block' : 'none';
        const controlClass = visible ? 'content-card-control0' : 'content-card-control180';

        return (
            <div className="content-card">
                <div className="content-card-head" onClick={this.onClick}>
                    {title}
                    <i className={'content-card-control iconfont icon-xiala ' + controlClass}></i>
                </div>
                <div style={{display}} className="content-card-box">
                    {children}
                </div>
            </div>
        );
    }
}
