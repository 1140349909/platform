import React, {Component} from 'react';
import {Menu, Spin, Icon} from 'antd';
import IconFont from 'common/component/IconFont';
import './index.less';

const Item = Menu.Item;


export default class Header extends Component {

    constructor(props) {
        super(props);
    }

    // 预览回调
    handleSave = (e) => {
        if (this.props.onSave) {
            this.props.onSave(e);
        }
    };

    // 预览回调
    handlePreview = (e) => {
        if (this.props.onPreview) {
            this.props.onPreview(e);
        }
    };

    // 返回回调
    handleBack = (e) => {
        if (this.props.onBack) {
            this.props.onBack(e);
        }
    };

    handle = ({key})=> {

        switch (key) {
            case 'save':
                this.handleSave();
                break;
            case 'preview':
                this.handlePreview();
                break;
            case 'release':
                this.handleRelease();
                break;
            case 'back':
                this.handleBack();
                break;
        }

    };

    render() {

        const {status, text} = this.props;

        let menuList = [];

        menuList.push({
            key: 'save',
            icon: 'baocun1',
            text: '保存',
            enabled: true
        });

        menuList.push({
            key: 'preview',
            icon: 'yulan2',
            text: '预览',
            enabled: true
        });

        menuList.push({
            key: 'back',
            icon: 'fanhui',
            text: '返回',
            enabled: true
        });

        let menuOptionsList = [];

        menuList.map((item)=> {
            if (item.enabled) {
                menuOptionsList.push(
                    <Item key={item.key}>
                        <span><IconFont type={item.icon}/>{item.text}</span>
                    </Item>
                );
            }
        });

        return (
            <div className='editor-header'>
                <div className="editor-header-logo" onClick={this.handleBack}></div>
                <div className="editor-header-tips">
                    {status == 'PENDING' && <Spin type="small"/>}
                    {status == 'FAILURE' && <Icon type="exclamation-circle"/>} {text}
                </div>
                <Menu mode="horizontal" className="editor-header-menu" theme="dark" onClick={this.handle}>
                    {menuOptionsList}
                </Menu>
            </div>
        );
    }
}

