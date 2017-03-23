import React, {Component} from 'react';
import IconFont from 'common/component/IconFont';
import classnames from 'classnames';
import './index.less';

class MenuEditor extends Component {


// 适配方案
// 1440*900
// 1：100%(最小）未收起 无法放大也无法缩小（默认）

// 1600*900
// 3:150%(最大）
// 2：125%（默认）
// 1：100%(最小）

// 1920*1080
// 5：200%
// 4：175%（默认）
// 3：150%
// 2：125%
// 1：100%(最小）

// 2560*1440
// 5：200%（默认）
// 4：175%
// 3：150%
// 2：125%
// 1：100%(最小）

    constructor(props) {
        super(props);
        this.proportion = ['100%', '125%', '150%', '175%', '200%'];
    }

    state = {
        proportionIndex: 0
    }

    // 撤消
    handelUndo = () => {
        this.props.handelUndo();
    }

    // 重做
    handelRedo = () => {
        this.props.handelRedo();
    }

    // 缩小
    handelNarrow = () => {
        if (this.state.proportionIndex == 0) {
            return;
        }
        this.props.handelNarrow();
        this.setState({
            proportionIndex: this.state.proportionIndex - 1
        });
    }

    // 放大
    handelMagnify = () => {
        if (this.state.proportionIndex >= this.proportion.length - 1) {
            return;
        }
        this.props.handelMagnify();
        this.setState({
            proportionIndex: this.state.proportionIndex + 1
        });
    }

    render() {
        const {style, className} = this.props;
        const {proportionIndex} = this.state;

        const iconMrr = {
            marginRight: '23px'
        };

        const classString = classnames('menueditor', {
            [className]: true
        });

        const narrowClassString = classnames('menueditor-i', {
            ['menueditor-disable']: proportionIndex === 0
        });

        const magnifyClassString = classnames('menueditor-i', {
            ['menueditor-disable']: proportionIndex === this.proportion.length - 1
        });

        const proportionText = this.proportion[this.state.proportionIndex];

        return (
            <div className={classString} style={style}>

                <IconFont
                    className="menueditor-i-min"
                    style={iconMrr}
                    onClick={this.handelUndo}
                    type="shangyibu"/>

                <IconFont
                    className="menueditor-i-min"
                    style={iconMrr}
                    onClick={this.handelRedo}
                    type="xiayibu"/>

                <IconFont
                    className={narrowClassString}
                    onClick={this.handelNarrow}
                    type="jianhao"/>

                <div
                    className="menueditor-proportion">{proportionText}</div>

                <IconFont
                    className={magnifyClassString}
                    onClick={this.handelMagnify} type="jiahao"/>

            </div>
        );
    }
}

MenuEditor.defaultProps = {
    style: {},
    className: '',
    handelUndo: () => {
        // console.info('撤消操作');
    },
    handelRedo: () => {
        // console.info('重做操作');
    },
    handelNarrow: () => {
        // console.info('缩小操作');
    },
    handelMagnify: () => {
        // console.info('放大操作');
    }
};

export default MenuEditor;
