import React from 'react';
import AuthComponentBase from 'common/base/AuthComponentBase';
import {Form, Button} from 'antd';
import Toutiao from './Toutiao';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';
import * as authorizeAction from 'common/store/authorize/action';
import _ from 'lodash';
import {comboObject} from 'common/util';

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
        channel: 'toutiao',
        tipState: localStorage.contentTipState === 'false' ? false : true
    };

    componentDidMount() {
        /*if(this.checkLogin()) {
            this.props.actions.getChannelList('wechat');
            this.props.actions.getChannelList('weibo');
        }*/
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
    }

    render() {
        const {className, style, authorize} = this.props;
        const {channel} = this.state;
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

        if (this.checkLogin()) {
            isAuthorize = authorizeList.wechat && authorizeList.weibo;
            if (isAuthorize) {
                isWxAuthorize = channel === 'wx' && authorizeList.wechat.length === 0;
                isWbAuthorize = channel === 'wb' && authorizeList.weibo.length === 0;
                isButtonDisabled = isWxAuthorize || isWbAuthorize;
            }
        } else {
            isButtonDisabled = true;
            isAuthorize = true;
            isWxAuthorize = channel === 'wx';
            isWbAuthorize = channel === 'wb';
        }

        return (
            <div className={classString} style={style}>
                <div className="content-distribution-head">头条发布设置</div>
                <div className="content-distribution-box">
                    <div className="content-distribution-form">
                        <Form layout="horizontal" onSubmit={this.handleSubmit}>
                            <br/>
                            <Toutiao {...props}
                                     enable={channel === 'toutiao'}
                                     style={channel === 'toutiao' ?
                                         displayBlock : displayNone}/>
                            <Button type="primary" disabled={isButtonDisabled} size="large"
                                    htmlType="submit">去发布</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

ContentReleaseForm.defaultProps = {
    className: '',
    style: {}
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

