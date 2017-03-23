/**
 * Created by Asoiso on 2016/12/14.
 */
import React, {Component} from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import {replaceColor} from 'common/util/bulkManager';

export default class BulkItem extends Component {

    handleClick(event) {
        if (_.isFunction(this.props.onClick)) {
            this.props.onClick(event.currentTarget.innerHTML, this.props.data);
        }
    }

    resolveHtml(val) {
        val = val || '';
        if (!~val.indexOf('ILokaEditor')) {
            return '<section class="ILokaEditor">' + val + '</section>';
        } else {
            return val;
        }
    }

    createMarkup(val, color) {
        val = this.resolveHtml(val);

        if (!color) {
            return {
                __html: val
            };
        }

        let oDiv = document.createElement('div');

        oDiv.innerHTML = val;

        replaceColor(oDiv, color);

        let sections = oDiv.getElementsByClassName('ILokaEditor');
        for (var i = 0; i < sections.length; i++) {
            sections[i].setAttribute('data-color', color);
        }

        val = oDiv.innerHTML;

        oDiv = null;
        return {
            __html: val
        };
    }

    render() {
        const {html, color, className} = this.props;
        const classString = classNames({
            'lk-content': true,
            [className]: true
        });
        return (
            <div className={classString}
                 onClick={(event)=>this.handleClick(event)}
                 dangerouslySetInnerHTML={this.createMarkup(html, color)}>
            </div>
        );
    }
}
