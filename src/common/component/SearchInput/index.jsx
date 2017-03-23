import React, {Component} from 'react';
import {Input, Button} from 'antd';
import classNames from 'classnames';
import './index.less';
const InputGroup = Input.Group;

// 搜索框
// <SearchInput placeholder="input search text" onSearch={value => console.log(value)} style={{ width: 200 }}/>
export default class SearchInput extends Component {
    state = {
        value: '',
        focus: false
    }

    componentDidUpdate(prevProps) {
        //当切换Tab的时候清空搜索框中的值
        if (this.props.status != prevProps.status) {
            this.setState({
                value: ''
            });
        }
    }

    handleInputChange = (e) => {
        this.setState({
            value: e.target.value
        });
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    }

    handleFocusBlur = (e) => {
        this.setState({
            focus: e.target === document.activeElement
        });
    }

    handleSearch = () => {
        if (this.props.onSearch) {
            this.props.onSearch(this.state.value);
        }
    }

    handelKeyDown = (e) => {
        this.setState({
            value: e.target.value
        });
        this.props.onKeyDown && this.props.onKeyDown(e);
    }

    render() {
        const {style, size, placeholder, defaultValue} = this.props;
        const btnCls = classNames({
            'ant-search-btn': true,
            'ant-search-btn-noempty': !!this.state.value.trim(),
        });
        const searchCls = classNames({
            'ant-search-input': true,
            'ant-search-input-focus': this.state.focus,
        });
        return (
            <div className="ant-search-input-wrapper searchinput" style={style}>
                <InputGroup className={searchCls}>
                    <Input placeholder={placeholder}
                           defaultValue={defaultValue}
                           value={this.state.value}
                           onChange={this.handleInputChange}
                           onFocus={this.handleFocusBlur}
                           onBlur={this.handleFocusBlur}
                           onKeyDown={this.handelKeyDown}
                           onPressEnter={this.handleSearch}
                    />
                    <div className="ant-input-group-wrap">
                        <Button icon="search" className={btnCls} size={size} onClick={this.handleSearch}/>
                    </div>
                </InputGroup>
            </div>
        );
    }
}
