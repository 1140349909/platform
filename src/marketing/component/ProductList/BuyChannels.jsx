import React, { Component } from 'react';
import { Tag } from 'antd';

// 营销渠道
export default class BuyChannels extends Component {
    getTagName(tag) {
        if (tag == 'yyg') {
            return '一元购';
        }
        return '未知渠道';
    }

    render() {
        const data = this.props.data;
        if (data && data.length > 0) {
            return (
                <span>{data && data.map((item, i) =>
                    <Tag key={i}
                         color="green">{this.getTagName(item)}</Tag>)}<br />
                </span>);

        } else {
            return <span className="text-disabled">未开通</span>;
        }
    }
}
