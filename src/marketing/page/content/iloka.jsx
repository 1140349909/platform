import React, {Component} from 'react';
import {getILokaUrl} from 'common/util/url';
import './iloka.less';
import config from 'common/config';

export default class ILoka extends Component {

    constructor(props) {
        super(props);
    }

    getUrl(type) {
        let path = type.replace(/-/g, '/');
        if (path) {
            path = '/content-bs.html?v=' + config.VERSION + '#' + path;
            return getILokaUrl(path);
        } else {
            return '';
        }
    }

    render() {
        const url = this.getUrl(this.props.params.type);

        if (url) {
            return (
                <div className="app-page-iloka">
                    <iframe src={url} width="100%" height="100%" frameBorder="0"></iframe>
                </div>
            );
        } else {
            return (
                <div className="app-page">
                    欢迎来到灵肯管理平台!
                </div>
            );
        }
    }


}





