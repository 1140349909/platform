import React, {Component} from 'react';

export default class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let content = '欢迎来到艾乐卡营销管家';
        return (
            <div className="app-page">
                {content}!
            </div>
        );
    }
}
