import React from 'react';
import AuthComponentBase from 'common/base/AuthComponentBase';
import classnames from 'classnames';
import _ from 'lodash';
import './index.less';

class NavTag extends AuthComponentBase {
    constructor(props) {
        super(props);
        this.hdWidth = 52;
        this.conRight = 60;
    }

    state = {
        checkedKeys: [],
        objectCheckedKeys: [],
        inputValue: {},
        doubleInputValue: {}
    }

    componentWillMount = () => {
        let inputValue = {};
        let doubleInputValue = {};

        _.forEach(this.props.data, (i) => {
            _.forEach(i.children, (item) => {
                if (item.type === 'input') {
                    inputValue[`${item.key}value`] = '';
                }
                if (item.type === 'doubleInput') {
                    doubleInputValue[`${item.key}value`] = '';
                    doubleInputValue[`${item.key}tovalue`] = '';
                }
            });
        });
        this.handelInit();
        this.setHdWidth(this.props);

        this.setState({
            inputValue,
            doubleInputValue
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setHdWidth(nextProps);
    }

    setHdWidth = (props) => {
        if (props.data && !_.isEmpty(props.data)) {
            let length = 0;

            _.forEach(props.data, (item) => {
                length = item.title.length > length ? item.title.length : length;
            });

            if (length > 2) {
                this.hdWidth = length * 7 + this.hdWidth + 'px';
                this.conRight = length * 7 + this.conRight + 'px';
            }

        }
    }

    handelInit = () => {
        if (this.props.defaultSelectedKeys && this.props.defaultSelectedKeys.length > 0 && this.state.checkedKeys.length == 0) {
            let checkedKeys = [];
            checkedKeys = this.handelArrayToString(this.props.defaultSelectedKeys);
            let objectCheckedKeys = [];

            _.map(this.props.data, (item, index) => {
                objectCheckedKeys.push({...item});
                objectCheckedKeys[index].children = [];
                _.map(item.children, (n) => {
                    if (checkedKeys.indexOf(n.key) !== -1) {
                        objectCheckedKeys[index].children.push(n);
                    }
                });
            });

            this.setState({
                checkedKeys,
                objectCheckedKeys
            });
        }
    }

    handelArrayToString = (items) => {
        let s = [];
        _.forEach(items, (item) => {
            s.push(item.toString());
        });
        return s;
    }

    // 点击事件
    handelClick = (pItem, item, e) => {
        let {checkedKeys} = this.state;
        let parentItem = _.clone(pItem);
        let objectCheckedKeys = _.clone(this.state.objectCheckedKeys);
        const {key} = item;
        const {type = 'radio'} = pItem;

        if (type === 'checkbox') {
            if (checkedKeys.indexOf(key) !== -1) {
                checkedKeys.splice(checkedKeys.indexOf(key), 1);
            } else {
                checkedKeys.push(key);
            }
        } else if (type === 'radio' || type === 'radioCancel') {
            if (checkedKeys.indexOf(key) !== -1 && item.type !== 'doubleInput' && item.type !== 'input') {
                if (type === 'radio') {
                    return;
                } else if(type === 'radioCancel'){
                    _.remove(checkedKeys, (n) => {
                        return n === key;
                    });
                }
            } else {
                let gather = _.clone(checkedKeys);
                _.forEach(objectCheckedKeys, (i) => {
                    if (i.children.length > 0 && i.key === pItem.key) {
                        _.remove(gather, (k) => {
                            return i.children[0].key == k;
                        });
                        return;
                    }
                });
                gather.push(key);
                checkedKeys = gather;
            } 
        }

        // 输出转为对象形式
        parentItem.children = [item];

        if (objectCheckedKeys.length === 0) {
            objectCheckedKeys.push(parentItem);
        } else {
            let isPush = true;

            _.map(objectCheckedKeys, (i, index) => {

                if (type === 'radio' || type === 'radioCancel') {
                    if (i.key === parentItem.key) {
                        objectCheckedKeys[index] = parentItem;
                        isPush = false;
                    }
                } else if (type === 'checkbox') {

                    if (parentItem.key === i.key) {
                        let gather = _.clone(objectCheckedKeys[index].children);

                        _.remove(gather, (n) => {
                            return item.key == n.key;
                        });

                        if (objectCheckedKeys[index].children.length === gather.length) {
                            objectCheckedKeys[index].children.push(item);
                        } else {
                            objectCheckedKeys[index].children = gather;
                        }
                        isPush = false;
                    }
                }
            });

            if (isPush) {
                if (type === 'checkbox' || type === 'radio' || type === 'radioCancel') {
                    objectCheckedKeys.push(parentItem);
                }
            }
        }

        this.setState({
            checkedKeys,
            objectCheckedKeys,
        });
        this.props.onSelect(checkedKeys, objectCheckedKeys, item, e);
    }

    renderInput = (classString, item, i) => {
        let {inputValue} = this.state;
        let iChildren = _.clone(i);
        let value = inputValue[`${i.key}value`];
        iChildren.title = value;
        return (
            <div className={classString} key={i.key}>
                <input onChange={
                    (e) => {
                        inputValue[`${i.key}value`] = e.target.value;
                        this.setState({
                            inputValue
                        });
                    }
                }/>
                <button onClick={(e) => this.handelClick(item, iChildren, e)}>确定</button>
            </div>
        );
    }

    renderDoubleInput = (classString, item, i) => {
        let {doubleInputValue} = this.state;
        let iChildren = _.clone(i);
        let value = doubleInputValue[`${i.key}value`];
        let tovalue = doubleInputValue[`${i.key}tovalue`];
        iChildren.title = !value || !tovalue ? '' : `${value}-${tovalue}`;

        return (
            <div className={classString} key={i.key}>
                <input
                    style={{marginRight: '5px'}}
                    onChange={
                        (e) => {
                            doubleInputValue[`${i.key}value`] = e.target.value;
                            this.setState({
                                doubleInputValue
                            });
                        }
                    }/>
                <span className="navtag-line">—</span>
                <input
                    style={{marginLeft: '5px'}}
                    onChange={
                        (e) => {
                            doubleInputValue[`${i.key}tovalue`] = e.target.value;
                            this.setState({
                                doubleInputValue
                            });
                        }
                    }/>
                <button onClick={(e) => this.handelClick(item, iChildren, e)}>确定</button>
            </div>
        );
    }

    renderTabList = () => {
        let checkedKeys;
        if (this.props.checkedKeys && this.props.checkedKeys.length === 0) {
            checkedKeys = this.state.checkedKeys;
        } else {
            checkedKeys = this.handelArrayToString(this.props.checkedKeys);
        }

        let tabList = [];
        _.map(this.props.data, (_item) => {
            let item = _.defaults(_item, {visible: true});
            let classStringRow = classnames({
                ['navtag-row']: true,
                ['navtag-visiblefalse']: !item.visible
            });

            let tabItem = [];
            let tabItemCol = [];

            if (item.visible) {
                tabItem.push(<div className="navtag-hd" style={{width: this.hdWidth}}
                                  key={item.key}>{item.title}</div>);
            }

            _.forEach(item.children, (i) => {
                const isSelect = checkedKeys.indexOf(i.key) !== -1 || i.checked;
                const isInput = i.type === 'input' || i.type === 'doubleInput';
                const classString = classnames({
                    ['navtag-col']: !isInput,
                    ['navtag-input']: isInput,
                    ['navtag-select']: isSelect
                });
                if (!isInput) {
                    tabItemCol.push(<div className={classString} onClick={(e) => this.handelClick(item, i, e)}
                                         key={i.key}>{i.title}</div>);
                } else if (i.type === 'input') {
                    tabItemCol.push(this.renderInput(classString, item, i));
                } else if (i.type === 'doubleInput') {
                    tabItemCol.push(this.renderDoubleInput(classString, item, i));
                }

            });
            tabItem.push(<div className="navtag-con" style={{borderLeftWidth: this.conRight}}
                              key={item.key + 1}>{tabItemCol}</div>);

            tabList.push(
                <div className={classStringRow} key={item.key}>{tabItem}</div>
            );
        });

        return tabList;
    }

    render() {
        const {style, className, extra} = this.props;
        const classString = classnames('navtag', {
            [className]: true
        });

        return (
            <div style={style} className={classString}>
                {this.renderTabList()}
                {extra}
            </div>
        );
    }
}


//设置 props 默认值
NavTag.defaultProps = {

    className: '',

    style: {},

    // 渲染数据
    data: [],

    // 标签Click时间
    onSelect: () => {
    },
    
    // （受控）选中的标签
    checkedKeys: [],

    // 默认选中的标签
    defaultSelectedKeys: [],

    // 添加的内部的HTML
    extra: null
};

export default NavTag;
