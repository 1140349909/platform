import React from 'react';
import './index.less';
class Dashboard extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const {children} = this.props;
        return (
            <div className="layout4">
                <div className="layout4-logo"></div>
                {children}
            </div>
        );
    }
}

export default Dashboard;
