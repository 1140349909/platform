import React from 'react';
import _ from 'lodash';
import AuthComponentBase from 'common/base/AuthComponentBase';
import Arrow from '../../../../component/Arrow';
import classnames from 'classnames';
import './index.less';
import Panel from './Panel';

class Tabs extends AuthComponentBase {
    constructor(props) {
        super(props);
        this.TabsList = [];
    }

    state = {
        selectKey: this.props.defaultSelect
    }

    static Panel = Panel

    componentDidMount() {
        React.Children.map(this.props.children, (child) => {
            this.TabsList.push({
                title: child.props.title,
                key: child.key
            });
        });
    }


    /**
     * 折叠单击处理
     *
     * @memberOf Tabs
     */
    handelArrowChange = () => {
        this.props.onArrow();
    }

    /**
     * tabs change
     *
     * @memberOf Tabs
     */
    handelChange = (key) => {
        this.setState({
            selectKey: key
        });
        this.props.onChange(key);
    }

    /**
     * 渲染tabs
     *
     * @memberOf Tabs
     */
    renderTabsList = () => {
        let list = [];
        _.map(this.TabsList, (item, index) => {
            const classString = classnames('propertypanel-tabs-item', {
                ['propertypanel-tabs-select']: item.key === this.state.selectKey
            });

            list.push(
                <div key={index} value={item.key} className={classString} onClick={() => this.handelChange(item.key)}>{item.title}</div>
            );
        });
        return list;
    }

    /**
     * 渲染处理后的children
     *
     * @memberOf Tabs
     */
    renderNewchildren = () => {
        let newChildren = [];
        React.Children.map(this.props.children, (child) => {
            let style = {
                display: child.key === this.state.selectKey ? 'block' : 'none'
            };
            newChildren.push(React.cloneElement(child, {style}));
        });

        return newChildren;
    }

    render(){
        const {className, visible} = this.props;
        const classString = classnames('propertypanel', {
            [className]: true,
            ['propertypanel-false']: !visible
        });

        return (
            <div className={classString}>
                <div className="propertypanel-tabs">
                    {this.renderTabsList()}
                </div>
                <div className="propertypanel-box">
                    {this.renderNewchildren()}
                </div>

                <Arrow
                    onClick={this.handelArrowChange}
                    direction="left"
                    arrowDirection={visible ? 'right' : 'left'}
                    className="propertytabs-arrow"></Arrow>
            </div>
        );
    }
}

Tabs.defaultProps = {
    style: {},

    className: '',

    visible: true,

    defaultSelect: null,

    onChange: () => {},

    handelArrowChange: () => {}
};

export default Tabs;
