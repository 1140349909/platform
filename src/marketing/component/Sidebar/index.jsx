import React from 'react';
import {Menu} from 'antd';
import IconFont from 'common/component/IconFont';
import {withRouter} from 'react-router';
import {redirect} from 'common/util';
import _ from 'lodash';
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

@withRouter
export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.selectedKey = '';
    }

    //点击Item的回调方法
    onClick = ({key, item}) => {
        const uri = item.props.path;

        if (this.props.location.pathname == uri) {
            return;
        }

        this.selectedKey = key;

        if (uri) {
            if (/^http/i.test(uri)) {
                redirect(uri, '_blank')
            } else {
                this.props.router.push(uri);
            }
        }
    }

    render() {

        // TODO:此处代码待优化

        const {location, menu} = this.props;
        const pathname = location.pathname;

        let defaultOpenKeys = [];
        let selectedKey = '';

        let subMenu = [];
        let n = 0;
        menu.map((item) => {

            let menuItem = [];

            if (n++ < 2) {
                defaultOpenKeys.push(item.key);
            }

            if (pathname == item.uri) {
                selectedKey = item.key;
                defaultOpenKeys.push(selectedKey);
            }

            item.tags.map((subItem) => {
                if (pathname == subItem.uri) {
                    selectedKey = subItem.key;
                    defaultOpenKeys.push(item.key);
                }

                menuItem.push(
                    <Item path={subItem.uri} key={subItem.key}>{subItem.name}</Item>
                );
            });

            subMenu.push(
                <SubMenu key={item.key} title={<span><IconFont type={item.icon}/>{item.name}</span>}>
                    {menuItem}
                </SubMenu>
            );
        });

        if (!selectedKey) {
            // 选择以前的key
            selectedKey = this.selectedKey;
        } else {
            // 更新以前的key
            this.selectedKey = selectedKey;
        }

        defaultOpenKeys = _.uniq(defaultOpenKeys);


        return (<Menu mode="inline"
                      theme="dark"
                      onClick={this.onClick}
                      selectedKeys={[selectedKey]}
                      defaultOpenKeys={defaultOpenKeys}>{subMenu}</Menu>);
    }
}
