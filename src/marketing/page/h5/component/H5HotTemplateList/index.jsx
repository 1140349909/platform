import React from 'react';
import H5Preview from '../../component/H5Preview';
import H5TemplateLPagination from '../../component/H5TemplateLPagination';
import NavTag from '../../../../../common/component/NavTag';
import {Select, Button, Modal} from 'antd';
import config from 'common/config';
import AuthComponentBase from 'common/base/AuthComponentBase';
import * as module from 'common/config/module';
import {redirect} from 'common/util';
import './index.less';
const Option = Select.Option;
export default class H5HotTemplateList extends AuthComponentBase {

    constructor(props) {
        super(props);
    }

    state = {
        sort: 'openedDate',
        order: 'desc',
        tag: []
    }
    getTplList = () => {
        this.props.getTplList({categorytype: 'platform'});
    }
    //筛选模板
    handleChange = (value) => {
        let sort = '';
        let order = '';
        switch (value) {
            case 'hot':
                sort = 'opdata.pv';
                order = 'desc';
                break;
            case 'new':
                sort = 'createdDate';
                order = 'desc';
                break;
            case 'lowPrice':
                sort = 'ledou';
                order = 'asc';
                break;
            case 'highPrice':
                sort = 'ledou';
                order = 'desc';
                break;
        }
        this.setState({
            sort: sort,
            order: order
        }, () => {
            this.props.list({
                categorytype: this.props.categorytype,
                tags: this.state.tag.join(','),
                sort: sort,
                order: order,
                appType: this.props.type == 'hot' ? 'M' : null
            });
        });
    }
    _renderContent = () => {
        return (
            <div>您将与我们的客服小艾进行QQ聊天，您可以将您的具体需求告诉我们！ 注：如果您没有安装QQ，请
                <a href='http://im.qq.com/download/' target='_blank'
                   style={{'color': '#3db4fd', 'paddingLeft': '10px', 'paddingRight': '10px'}}>点击安装</a></div >
        );
    }
    customizationH5 = () => {
        Modal.confirm({
            title: '独家定制',
            content: this._renderContent(),
            okText: '确定',
            cancelText: '取消',
            maskClosable: true,
            onOk: () => {
                redirect(config.CUSTOM_SERVICE_URL, '_blank');
            }
        });
    }
    onSelect = (checkedKeys, objectCheckedKeys,) => {
        let data = {
            price: '',
            tag: [],
            minLedou: null,
            maxLedou: null,
        };
        objectCheckedKeys.map((item) => {
            let child = item.children[0];
            if (item.key == 'h5HotTemplate' && item.title == '价格') {
                let arrays = [];
                if (child.type == 'doubleInput' && child.title != '全部') {
                    arrays = child.title.split('-');
                } else if (child.title != '全部') {
                    arrays = child.key.split('-');
                }
                data.minLedou = arrays[0];
                data.maxLedou = arrays[1];
            } else {
                child.title != '全部' ? data.tag.push(child.title) : null;
            }
        });
        this.setState({
            tag: data.tag
        }, () => {
            this.props.list({
                type: this.props.type,
                tags: data.tag.join(','),
                categorytype: this.props.categorytype,
                minLedou: data.minLedou,
                maxLedou: data.maxLedou,
                sort: this.state.sort,
                order: this.state.order,
                appType: this.props.type == 'hot' ? 'M' : null
            });
        });
    }
    favTpl = (id) => {
        this.anyWhereModule(module.CONTENT_H5_FAV).then(() => {
            this.props._saveFilterConditions({
                sort: this.state.sort,
                order: this.state.order,
                tag: this.state.tag.join(',')
            });
            this.props.favTpl(id);
        });

    }
    cancelFavTpl = (id) => {
        this.anyWhereModule(module.CONTENT_H5_FAV).then(() => {
            this.props._saveFilterConditions({
                sort: this.state.sort,
                order: this.state.order,
                tag: this.state.tag.join(',')
            });
            this.props.cancelFavTpl(id);
        });
    }

    render() {

        const isNavTag = this.props.tagList.length > 0;

        return (
            <div className='h5HotTemplateList-con'>
                {
                    this.props.type == 'hot' &&
                    <div>
                        { isNavTag &&
                        <NavTag data={this.props.tagList} onSelect={this.onSelect}
                                defaultSelectedKeys={this.props.defaultSelectedKeys}/>
                        }
                        <div className='h5HotTemplateList-filter'>
                            <Select defaultValue="new" style={{width: 146, height: 40}} onChange={this.handleChange}>
                                <Option value="new">最新</Option>
                                <Option value="hot">最热</Option>
                                <Option value="lowPrice">价格从低到高</Option>
                                <Option value="highPrice">价格从高到低</Option>
                            </Select>
                            <Button className='customization' onClick={this.customizationH5}>独家定制</Button>
                        </div>
                    </div>
                }
                <H5Preview list={this.props.data}
                           favTpl={this.favTpl}
                           cancelFavTpl={this.cancelFavTpl}
                           buyH5Template={this.props.buyH5Template}
                           type={this.props.type}
                           h5Type={this.props.h5Type}
                           onPreview={this.props.onPreview}
                />
                <H5TemplateLPagination list={this.props.list}
                                       categorytype={this.props.categorytype}
                                       data={this.props.data}/>
            </div>
        );
    }
}
