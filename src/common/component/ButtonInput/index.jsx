import React, {Component} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {Input, Button} from 'antd';
import classNames from 'classnames';
import './index.less';
const InputGroup = Input.Group;

// 搜索框
// <ButtonInput placeholder="input search text" onClick={value => console.log(value)} style={{ width: 200 }} buttonText="复制链接"/>
export default class ButtonInput extends Component {
    state = {
        value: '',
        focus: false
    };

    handleFocusBlur = (e) => {
        this.setState({
            focus: e.target === document.activeElement
        });
    };

    handleSubmit = () => {
        if (this.props.onClick) {
            this.props.onClick(this.state.value);
        }
    };

    render() {
        const {style, size, placeholder, buttonText, value} = this.props;
        const btnCls = classNames({
            'ant-search-btn': true,
            'ant-search-btn-noempty': value && !!value.trim(),
        });
        const searchCls = classNames({
            'ant-search-input': true,
            'ant-search-input-focus': this.state.focus,
        });
        return (
            <div className="ant-search-input-wrapper buttoninput" style={style}>
                <InputGroup className={searchCls}>
                    <Input placeholder={placeholder} value={value}
                           readOnly
                           onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur}
                    />
                    <div className="ant-input-group-wrap">
                        <CopyToClipboard text={value}>
                            <Button className={btnCls} size={size} onClick={this.handleSubmit}>{buttonText}</Button>
                        </CopyToClipboard>
                    </div>
                </InputGroup>
            </div>
        );
    }
}
