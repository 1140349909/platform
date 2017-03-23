import React from 'react';
import {Menu, Spin, Button} from 'antd';
import IconFont from 'common/component/IconFont';
import './index.less';
import AuthComponentBase from 'common/base/AuthComponentBase';
const Item = Menu.Item;


class Header extends AuthComponentBase {

    constructor(props) {
        super(props);
    }


    handle = ({key}) => {
        switch (key) {
            case 'header-save':
                this.props.onSave();
                break;

            case 'header-preview':
                // console.log('yes')
                this.props.onPreview();
                break;

            case 'header-back':
                this.props.onBack();
                break;
        }

    }

    getMenuList = () => {

        let menuList = [];
        let list = [
            {
                key: 'header-save',
                icon: 'baocun1',
                text: '保存',
                enabled: true
            },
            {
                key: 'header-preview',
                icon: 'yulan2',
                text: '预览',
                enabled: true
            }, {
                key: 'header-back',
                icon: 'fanhui',
                text: '返回',
                enabled: true
            }
        ];

        list.map((item) => {
            if (item.enabled) {
                menuList.push(
                    <Item key={item.key}>
                        <span><IconFont type={item.icon}/>{item.text}</span>
                    </Item>
                );
            }
        });
        return menuList;
    }

    render() {
        const {status, text, visibleCreateTpl} = this.props;
        return (
            <div className='header'>
                <div className="header-logo" onClick={this.onBack}></div>
                <div className="header-tips">{status == 'PENDING' && <Spin type="small"/>}{text}</div>
                <Menu mode="horizontal" className="header-menu" theme="dark" onClick={this.handle}>
                    {this.getMenuList()}
                    {
                        visibleCreateTpl &&
                        <Item style={{'position':'absolute','right':'255px'}}><Button type="primary" className="header-tpl-create" onClick={this.props.onCreateTpl}>生成模板</Button></Item>
                    }
                </Menu>
            </div>
        );
    }
}

Header.defaultProps = {
    onPreview: (e) => {
        e.preventDefault();
        this.purchaseH5Tpl({
            id: 'xxxxxx',
            name: 'title',
            ledou: 0
        }).then(() => {
        });
    },
    onBack: (e) => {
        e.preventDefault();
    },
    onSave: (e) => {
        e.preventDefault();
    },
    onCreateTpl: (e) => {
        e.preventDefault();
    },
    visibleCreateTpl: false
};
export default Header;

