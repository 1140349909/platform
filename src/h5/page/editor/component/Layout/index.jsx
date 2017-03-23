import React, {Component} from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import './index.less';

export default class ContentLayout extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
           <div className="content-layout">
                <Header
                  onPreview={this.props.onPreview}
                  onPelease={this.props.onPelease}
                  onSave={this.props.onSave}
                  onBack={this.props.onBack}/>
                <div className="content-layout-box">
                    <Sidebar
                      selectedKeys={this.props.selectedKeys}
                      onMenuClick={this.props.onMenuClick}/>
                    <div className="content-layout-main">{this.props.children}</div>
                </div>
           </div>
        );
    }
}

