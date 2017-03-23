import React, {Component} from 'react';
import {Modal, Radio, Button, message, Input} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getIlokaContentUrl} from 'common/util/url';
import {isValid} from 'common/util/validator';
import List from './List';
import './index.less';
import * as appAction from '../../store/app/action';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
@connect(
    state => ({
        operation: state.operation,
        minList: state.commonApp.toJS().mineList,
        uin: state.commonApp.toJS().uin,

    }),
    dispatch => ({
        actions: bindActionCreators({
            ...appAction,
        }, dispatch)
    })
)
class ActivityShow extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        h5Item: {},
        id: '',
        href: '',
        type: 'h5',
        resType: 'h5',
        size: 8,
        status: 'published',
        editorType: 'main',
        categorytype: 'my',
    };

    componentWillMount() {
        this.props.actions.getAdminCustomer();
    }

    componentDidMount() {
        const {data} = this.props;
        if (data.type) {
            let states = {};
            if (data.type == 'h5') {
                states = {
                    id: data.id
                };
            } else if (data.type == 'link') {
                states = {
                    href: data.name,
                };
            }
            this.setState({
                type: data.type,
                ...states
            });
        }
        if (this.state.type == 'h5') {
            this._list();
        }
    }

    _radioGroupChange = (e) => {
        const type = e.target.value;
        if (type == 'h5') {
            this._list();
        }
        this.setState({
            type,
        });
    }
    //图文列表
    _list = (page = 0, params) => {
        this.setState({
            page,
        }, () => {
            this.props.actions.getAppDataList({
                page: this.state.page,
                categorytype: this.state.categorytype,
                size: this.state.size,
                resType: this.state.resType,
                status: this.state.status,
                editorType: this.state.editorType,
                ...params
            });
        });
    }
    // 外链处理
    _handelLink = (e) => {
        const href = e.target.value;
        this.setState({
            href,
        });
    }
    // 列表选中处理
    _selectedCallback = (h5Item) => {
        this.setState({
            h5Item,
            id: h5Item.id,
        });
    }
    // 点击确定
    _handelOk = () => {

        let data = {};
        let url = '';
        let uin = this.props.uin;
        const {type, href, h5Item} = this.state;

        if (type == 'h5') {

            const {name, id, resType} = h5Item;

            data = {name, id, resType, type};

            url = getIlokaContentUrl(id);

        } else if (type == 'link') {

            if (!isValid('url', href)) {
                message.warning('请输入正确的url');
                return;
            }

            data = {
                type,
                name: href,
                id: href,
            };

            url = href;
        }

        data['mode'] = 'activity';
        data['uin'] = uin;
        this.props.onOk({data, url});
        this.props.reset();
    }

    render() {
        const {operation} = this.props;
        const {minList} = this.props;
        const {type, href, id} = this.state;
        const isLoadingList = operation.type == appAction.GET_APP_DATA_LIST_PENDING;

        return (
            <Modal
                className="activity-show"
                title="添加活动"
                visible={true}
                footer={null}
                onCancel={this.props.reset}
                width={800}>
                <div className="activity-show-main">
                    <div className="activity-show-hd content-tools-tabs ant-radio-group-dark">
                        <RadioGroup defaultValue={this.state.type} value={type} onChange={this._radioGroupChange}>
                            <RadioButton value="h5">活动H5</RadioButton>
                            <RadioButton value="link">外链</RadioButton>
                        </RadioGroup>
                    </div>
                    <div className="activity-show-box">
                        {type == 'h5' &&
                        <List
                            loading={isLoadingList}
                            list={this._list}
                            selected={id}
                            selectedCallback={this._selectedCallback}
                            data={minList}
                        />
                        }
                        {type == 'link' &&
                        <div className="activity-show-link" style={{width: 400}}>
                            <Input
                                placeholder="请输入跳转链接，不要忘记带http://"
                                defaultValue={href || ''}
                                onChange={this._handelLink}
                                size="large"
                            />
                            <p className="activity-show-link-tip">
                                可嵌入您希望引导用户跳转到的页面
                            </p>

                        </div>
                        }
                    </div>
                    <div className="activity-show-footer">
                        <Button
                            onClick={this.props.reset}
                            size="large">返回</Button>
                        <Button size="large"
                                onClick={this._handelOk}
                                type="primary">确定</Button>
                    </div>
                </div>
            </Modal>
        );
    }
}

ActivityShow.defaultProps = {
    version: ''
};

export default ActivityShow;
