import React from 'react';
import classnames from 'classnames';
import './index.less';
import './iconfont.less';
import Symbol from './Symbol';

class IconFont extends React.Component{
    constructor(props) {
        super(props);
    }

    static Symbol = Symbol

    render() {
        let {type, color, className} = this.props;
        const classString = classnames(className, {
            iconfont: true,
            [`icon-${type}`]: true
        });

        let style = {};

        if (color) {
            style.color = color;
        }

        return (
            <i style={style} className={classString} onClick={this.props.onClick}/>
        );
    }
}

IconFont.defaultProps = {
    className: ''
};

export default IconFont;

