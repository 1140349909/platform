import React from 'react';
import AuthComponentBase from 'common/base/AuthComponentBase';
import classnames from 'classnames';
import './index.less';

class Panel extends AuthComponentBase {
    constructor(props) {
        super(props);
    }

    render(){
        const {style, children, className} = this.props;
        const classString = classnames('propertypanel-box-item', {
            [className]: true
        });

        return (
            <div className={classString} style={style}>{children}</div>
        );
    }
}

Panel.defaultProps = {
    style: {},
    className: ''
};

export default Panel;
