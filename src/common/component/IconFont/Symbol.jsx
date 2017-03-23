import './index.less';
import './iconfont.js';
import React from 'react';
import classnames from 'classnames';

class Symbol extends React.Component{
    constructor(props) {
        super(props);
    }

    handelClick = () => {
        this.props.onClick();
    }

    render() {
        let {type, className, style} = this.props;
        const classString = classnames(className, 'iconfont-symbol');

        return (
            <svg className={classString} style={style} aria-hidden="true" onClick={this.handelClick}>
                <use xlinkHref={`#icon-${type}`}></use>
            </svg>
        );
    }
}

Symbol.defaultProps = {
    className: '',
    style: {},
    onClick: () => {}
};

export default Symbol;

