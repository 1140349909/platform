import React from 'react';
import './index.less';
import IconFont from '../IconFont';
import classnames from 'classnames';

export default class SelectCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {style, className = ''} = this.props;
        let classString = classnames({
            selectcard: true,
            ['selectcard-active']: this.props.active || false,
            [className]: true,
        });

        return (
            <div className={classString} style={style}>
                <div className="selectcard-children">
                    {this.props.children}
                </div>
                {this.props.active &&
                    <IconFont className='selectcard-icon' type="jiaobiao011"/>
                }
            </div>
        );
    }
}
