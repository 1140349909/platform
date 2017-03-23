import React, {Component} from 'react';
import NavTag from 'common/component/NavTag';
import moment from 'moment';
import './index.less';
export  default  class InformationList extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        chooseDateRange: '',
        chooseChannels: '',
        type: 'content',
    }
    onSelect = (checkedKeys, objectCheckedKeys,) => {
        let data = {
            date: '',
            tag: []
        };
        objectCheckedKeys.map((item) => {
            if (item.key == 'hotArticle-timer') {
                data.date = this._analysisTime(item.children[0].key);
            } else {
                item.children[0].title != '全部' ? data.tag.push(item.children[0].title) : null;
            }
        });
        this.props.getContentHotList({
            type: this.props.type,
            tags: data.tag.join(','),
            date: data.date,
        });
    }

    _analysisTime = (key) => {
        return moment().subtract(parseInt(key) / 24, 'days').format('YYYY-MM-DD');
    }

    render() {
        return (
            <div>
                <NavTag data={this.props.tags} onSelect={this.onSelect}
                        defaultSelectedKeys={this.props.defaultSelectedKeys}/>
            </div>
        );
    }
}


