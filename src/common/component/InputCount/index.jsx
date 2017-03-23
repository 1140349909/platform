import React from 'react';
import AuthComponentBase from '../../base/AuthComponentBase';
import classnames from 'classnames';
import './index.less';

class InputCount extends AuthComponentBase {
    constructor(props) {
        super(props);
    }

    render() {

        const {max, value} = this.props;

        let valueLength = 0;

        if (typeof value !== 'undefined') {
            valueLength = value.length;
        }

        const classString = classnames({
            ['inputcount-error']: valueLength > max
        });

        return (
            <div className="inputcount">
                {this.props.children}
                <div className='inputcount-mesagge'>
                    <span className={classString}>{valueLength}</span>/<span>{max}</span>
                </div>
            </div>
        );
    }
}

export default InputCount;
