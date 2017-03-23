import React, {Component} from 'react';
import * as antd from 'antd';
import _ from 'lodash';
import IconFont from 'common/component/IconFont';
import { tips } from './config';
import './index.less';
const LTooltip =  antd.Tooltip;


class Tooltip extends Component {

    constructor(props) {
        super(props);

    }
    render() {
        const {type, title,  placement, getTooltipContainer, arrowPointAtCenter, icon,style} = this.props;

        let item = null;

        let iconfont = null;

        let children = null;

        let props = {
            getTooltipContainer,
            arrowPointAtCenter,
        };

        _.map(tips, value => {
            if (value.key == type) {
                item = value;
            }
        });

        if (title || _.has(item, 'title')) {
            let _title;

            if (_.has(item, 'title')) {
                _title = item.title;
            }

            if (title) {
                _title = title;
            }

            props['title'] = _title;
        }


        if (placement || _.has(item, 'placement')){
            let _placement;

            if (_.has(item, 'placement')) {
                _placement = item.placement;

            }

            if (placement) {
                _placement = placement;
            }

            props['placement'] = _placement;
        }

        // this.props.icon 权重大于 tips.icon
        if (icon || item.icon) {
            let _icon;

            if (item.icon) {
                _icon = item.icon;
            }

            if (icon) {
                _icon = icon;
            }

            iconfont = (
                <IconFont className="tooltip-icon" type={_icon}/>
            );
        }

        children = (
            <span style={style}>
                {this.props.children}
                &nbsp;&nbsp;{iconfont}
            </span>
        );
        return (
            <span>
                {item.show &&
                <LTooltip {...props}>
                    {children}
                </LTooltip>
                }
                {!item.show &&
                <span>
                     {children}
                </span>
                }
            </span>
        );
    }
}


//设置 props 默认值
Tooltip.defaultProps = {

    title: '',

    arrowPointAtCenter: false,

    icon: null,
};

export default Tooltip;
