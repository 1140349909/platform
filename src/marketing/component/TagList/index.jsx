import React, {Component} from 'react';
import ClassNames from  'classnames';
import './index.less';
export default   class TagList extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        items: [],
        item: {
            typeid: '',
            tagName: ''
        },
        flag: false,
    }
    getEveryTag = (everyTags, id, itemName) => {
        return (<a className="tag-filter">{
            everyTags && everyTags.map((tag, i) => (
                <i className={tag.selected ? 'activeFilter' : ''} key={i}
                   onClick={() => this.props.onSelect(id, tag, itemName)}>{tag.name}</i>
            ))
        }</a>);
    }
    getSelectdTag = (item) => {
        const tagAllStyles = item.selected ? ClassNames('tag-all', 'activeFilter') : ClassNames('tag-all');
        return (<a className={tagAllStyles} onClick={() => this.props.onSelect(item.id, 'all', item.name)}>
            全部 </a>);
    }
    render = () => {
        // 表单验证及属性相关设置
        const tags = this.props.tagList;
        return (
            <div className="tagsContainer">
                <div className="mine-filter-sended">
                    {
                        tags && tags.map && tags.map((item, i) =>
                            (
                                <div className="tag-filter-container" key={i} id={item.id}>
                                    <div className="filter-by-plateform" style={{width: 42, 'float': 'left'}}>
                                        <label>{item.name}：</label>
                                    </div>
                                    {
                                        this.getSelectdTag(item)
                                    }
                                    <div style={{width: 830, 'float': 'left'}}>
                                        {this.getEveryTag(item.tags, item.id, item.name)}
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        );
    };
}



