import React from 'react';
import AuthComponentBase from 'common/base/AuthComponentBase';
import {Form, Radio, Button} from 'antd';
import WeiSite from './WeiSite';
import Wechat from './Wechat';
import Weibo from './Weibo';
import Toutiao from './Toutiao';
import IconFont from 'common/component/IconFont';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';
import * as authorizeAction from 'common/store/authorize/action';
import {getChannelAuthorizeUrl} from 'common/util/url';
import config from 'common/config';
import {CONTENT_RICHTEXT_PUBLISH, CONTENT_H5_PUBLISH} from 'common/config/module';
import _ from 'lodash';
import {comboObject, redirect} from '../../util';
import './index.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@connect(
    state => ({
        operation: state.operation,
        authorize: state.authorize.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...authorizeAction,
        }, dispatch)
    })
)

class ContentReleaseForm extends AuthComponentBase {
    constructor(props) {
        super(props);
    }

    state = {
        channel: this.props.enableChannel[0],
        tipState: localStorage.contentTipState === 'false' ? false : true
    }

    componentDidMount() {
        this.getChannelList();
    }

    // 根据返回的nextProps处理回调
    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        switch (operation.type) {
            // 获取列表
            case authorizeAction.GET_CHANNEL_LIST_SUCCESS:
                break;
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const key = this.props.resType === 'content'  ? CONTENT_RICHTEXT_PUBLISH : CONTENT_H5_PUBLISH;
        this.anyWhereModule(key).then(() => {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    if (_.has(values[this.state.channel], 'imgId.file.response.data') && !values[this.state.channel].imgId.file.response.data) {
                        this.props.form.setFields({
                            [this.state.channel + '.imgId']: {
                                errors: [new Error('forbid ha')],
                            },
                        });
                    } else {
                        this.props.handleRelease();
                    }
                }
            });
        });
    }

    getChannelList = () => {
        if(this.checkLogin()) {
            this.props.actions.getChannelList('wechat');
            this.props.actions.getChannelList('weibo');
            this.props.actions.getChannelList('toutiao');
        }
        
    }

    radioGroupChange = (e) => {
        const channel = e.target.value;
        this.setState({
            channel,
        });
        this.props.changeChannel(channel);
    }

    handelAuthorizeLocation = (type) => {
        this.anyWhereLogin().then(() => {
            redirect(getChannelAuthorizeUrl('channel', type), '_blank', () => {
                this.getChannelList();
            })
        });
    }

    handelTipLocation = (type) => {
        if (type === 'vsite') {
            redirect(config.BS_ORIGIN + '/marketing.html#/help/detail/5880a2f95896374dc0281992', '_blank')
        }
    }

    handelTipClose = () => {
        this.setState({
            tipState: false
        });
        localStorage.setItem('contentTipState', 'false');
    }

    render() {
        const {className, style, authorize, enableChannel} = this.props;
        const {channel, tipState} = this.state;
        const displayBlock = {display: 'block'};
        const displayNone = {display: 'none'};
        const authorizeList = authorize.list;

        const props = {
            onFieldsChange: this.props.onFieldsChange,
            data: this.props.data,
            form: this.props.form,
            enable: this.state.channel,
            onCropperChange: this.props.onCropperChange
        };
        const classString = classnames({
            ['content-distribution']: true,
            [className]: true
        });

        // 是否开启授权
        let isAuthorize;

        // 是否不可点击按钮
        let isButtonDisabled;

        // 是否开启微信授权
        let isWxAuthorize;

        // 是否开启微博授权
        let isWbAuthorize;

        // 是否头条微博授权
        let isToutiaoAuthorize;

        if (this.checkLogin()) {
            isAuthorize = authorizeList.wechat && authorizeList.weibo && authorizeList.toutiao;
            if (isAuthorize) {
                isWxAuthorize = channel === 'wx' && authorizeList.wechat.length === 0;
                isWbAuthorize = channel === 'wb' && authorizeList.weibo.length === 0;
                isToutiaoAuthorize = channel === 'toutiao' && authorizeList.toutiao.length === 0;
                isButtonDisabled = isWxAuthorize || isWbAuthorize || isToutiaoAuthorize;
            }
        } else {
            isButtonDisabled = true;
            isAuthorize = true;
            isWxAuthorize = channel === 'wx';
            isWbAuthorize = channel === 'wb';
            isToutiaoAuthorize = channel === 'toutiao';
        }

        const enableChannelVsite = enableChannel.indexOf('vsite') !== -1;
        const enableChannelWx = enableChannel.indexOf('wx') !== -1;
        const enableChannelWb = enableChannel.indexOf('wb') !== -1;
        const enableChannelToutiao = enableChannel.indexOf('toutiao') !== -1;

        return (
            <div className={classString} style={style}>
                <div className="content-distribution-head">选择发布平台</div>
                <div className="content-tools-tabs ant-radio-group-dark">
                    <RadioGroup defaultValue={channel} onChange={this.radioGroupChange}>
                        {enableChannelWx && <RadioButton value="wx">微信</RadioButton>}
                        {enableChannelWb && <RadioButton value="wb">微博</RadioButton>}
                        {enableChannelVsite && <RadioButton value="vsite">微站</RadioButton>}
                        {enableChannelToutiao && <RadioButton value="toutiao">头条</RadioButton>}
                    </RadioGroup>
                </div>
                <div className="content-distribution-box">
                    {(tipState && channel === 'vsite') &&
                    <div className="content-distribution-tip">
                        微站是什么！<a href="javascript:;" onClick={() => this.handelTipLocation('vsite')}>点击查看</a>
                        <IconFont type="shanchu3" onClick={this.handelTipClose}/>
                    </div>
                    }
                    <div className="content-distribution-form">
                        {!_.isEmpty(props.data) &&
                            <Form layout="horizontal" onSubmit={this.handleSubmit}>
                            <Wechat {...props} enable={channel === 'wx'} style={channel === 'wx' ? displayBlock : displayNone}/>
                            <Weibo {...props} enable={channel === 'wb'} style={channel === 'wb' ? displayBlock : displayNone}/>
                            <WeiSite {...props} enable={channel === 'vsite'} style={channel === 'vsite' ? displayBlock : displayNone}/>
                            <Toutiao {...props} enable={channel === 'toutiao'} style={channel === 'toutiao' ? displayBlock : displayNone}/>
                            <Button type="primary" disabled={isButtonDisabled} size="large"
                                    htmlType="submit">{channel === 'toutiao' ? '进入头条编辑模式' : '去发布'}</Button>
                        </Form>
                        }
                    </div>
                    {channel === 'toutiao' &&
                        <div style={{marginTop: '10px'}}>今日头条只支持H1、加粗等少数样式，多余的样式会被头条过滤</div>
                    }
                    {isAuthorize &&
                        <div className="content-distribution-authorize">
                        {isWxAuthorize &&
                            <span>您还没有授权微信公众号! <a href="javascript:;"
                                onClick={() => this.handelAuthorizeLocation('wechat')}>去授权</a></span>
                        }
                        {isWbAuthorize &&
                            <span>您还没有授权微博号! <a href="javascript:;" onClick={() => this.handelAuthorizeLocation('weibo')}>去授权</a></span>
                        }

                        {isToutiaoAuthorize &&
                            <span>您还没有授权头条号! <a href="javascript:;" onClick={() => this.handelAuthorizeLocation('toutiao')}>去授权</a></span>
                        }
                        </div>
                    }
                </div>
            </div>
        );
    }
}

ContentReleaseForm.defaultProps = {
    className: '',
    style: {},
    changeChannel: () => {},
    enableChannel: ['wx', 'wb', 'vsite', 'toutiao'],
    resType: 'content'
};

export default Form.create({
    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function (props) {
        const {
            data = {vsite: {}, wb: {}, wx: {}, toutiao: {}}
        } = props;

        let files = {};
        _.forEach(data, (parentVal, parentkey)=> {
            if ('vsite' == parentkey || 'wb' == parentkey || 'wx' == parentkey || 'toutiao' == parentkey) {
                _.forEach(parentVal, (childVal, childKey)=> {
                    const name = parentkey + '.' + childKey;
                    let value;
                    if ('imgId' == childKey) {
                        value = {
                            value: {
                                file: {
                                    response: {
                                        data: childVal
                                    }
                                }
                            }
                        };
                    } else {
                        value = {
                            value: childVal
                        };
                    }
                    files[name] = value;
                });
            }
        });

        return files;
    },
    onFieldsChange: (props, fields) => {
        if (_.keys(fields).length >= 2 || _.isEmpty(fields)) {
            return;
        }
        const {onFieldsChange} = props;
        const keyName = _.keys(fields)[0];
        if (keyName.indexOf('imgId') != -1) {
            if (!_.has(fields[keyName], 'value.file.response.data')) {
                return;
            }
        }
        if (_.isFunction(onFieldsChange)) {
            let data = {};
            _.forEach(fields, (val, key) => {
                if (key.indexOf('imgId') != -1) {
                    if (_.has(val.value, 'file.response.data')) {
                        comboObject(data, key, val.value.file.response.data);
                    }
                } else {
                    comboObject(data, key, val.value);
                }
            });
            onFieldsChange(data);
        }
    }
})(ContentReleaseForm);
