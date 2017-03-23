import React, {Component} from 'react';
import classnames from 'classnames';
import {addEvent, removeEvent} from 'common/util';
import './index.less';


class TipMessage extends Component {

    constructor(props) {
        super(props);
        this.container = null;
    }

    componentDidMount(){
        addEvent(window, 'resize', this.setCenter);
        this.setCenter();
    }

    componentWillUnmount(){
        removeEvent(window, 'resize', this.setCenter);
    }

    setCenter = () => {
        this.container.style.top = (document.body.clientHeight - this.container.offsetHeight) / 2 - 300 + 'px';
        this.container.style.left = (document.body.clientWidth - this.container.offsetWidth) / 2 + 'px';
    }

    static defaultProps = {
        className: ''
    }

    render() {
        const {className, ...resprops} = this.props;

        const classString = classnames('tipmessage', {
            [className]: true
        });

        return (
            <div ref={node => this.container = node} {...resprops} className={classString}></div>
        );
    }
}

export default TipMessage;