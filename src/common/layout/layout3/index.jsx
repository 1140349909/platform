import React, {Component} from 'react';
import './index.less';

export default class Dashboard extends Component {
    // 跳转到首页
    redirectHome = ()=> {
        location.hash = '';
    }

    render() {
        let {header, sidebar, footer} = this.props;
        return (
            <div className="lk-layout">
                <header className="lk-layout-header">
                    <div onClick={this.redirectHome} className="lk-layout-logo"></div>
                    {header}
                </header>
                <section className="lk-layout-content">
                    {sidebar && <aside id="app-aside" className="lk-layout-aside">
                        {sidebar}
                    </aside>}
                    <div className="lk-layout-main" style={{'left': sidebar ? '224px' : '0'}}>
                        <div className="lk-layout-main-i">
                            {this.props.children}
                        </div>
                    </div>
                </section>
                {footer}
            </div>
        );
    }
}

