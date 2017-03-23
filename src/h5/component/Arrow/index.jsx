import React from 'react';
import AuthComponentBase from 'common/base/AuthComponentBase';
import IconFont from 'common/component/IconFont';
import classnames from 'classnames';
import './index.less';

class Arrow extends AuthComponentBase {

    state = {};


    handelClick = () => {
        this.props.onClick();
    }

    render() {

        const {style, className, arrowDirection, direction} = this.props;

        const classString = classnames('arrow', {
            ['arrow-left']: direction === 'left',
            ['arrow-right']: direction === 'right',
            ['arrow-arrowleft']: arrowDirection === 'left',
            ['arrow-arrowright']: arrowDirection === 'right',
            [className]: true
        });

        return (
            <div className={classString} style={style} onClick={this.handelClick}>
                <IconFont type="shouqi1"/>
            </div>
        );
    }
}

Arrow.defaultProps = {

    className: '',

    style: {},

    direction: 'right',

    arrowDirection: 'right',

    onClick: () => {
    }

};


export default Arrow;
