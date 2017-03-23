import React, {Component} from 'react';
import './index.less';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {header, sidebar, children, footer} = this.props;
        return (
            <div className="ant-layout-aside">
                <aside className="ant-layout-sider">
                    <div className="ant-layout-logo"></div>
                    {sidebar}
                </aside>
                <div className="ant-layout-main">
                    {header}
                    <div className="ant-layout-container">
                        <div className="ant-layout-content">
                            {children}
                        </div>
                    </div>
                    {footer}
                </div>
            </div>
        );
    }
}

