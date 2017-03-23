import React from 'react';
import {Button, Form, Icon, message, Radio, Card, Tabs, Row, Col, Input, Switch} from 'antd';
import CropperUpload from 'common/component/CropperUpload';
import * as media from 'common/util/media';
import _ from 'lodash';
import './index.less';
import AuthComponentBase from 'common/base/AuthComponentBase';
import AuthModule from 'common/component/AuthModule';
import * as module from 'common/config/module';
import Img from 'common/component/Img';

const TabPane = Tabs.TabPane;
const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const IMG_LIST = {
    LIST: {
        LEFT: {
            DEFAULT: require('./img/list_left_default.png'),
            CHECKED: require('./img/list_left_checked.png'),
        },
        RIGHT: {
            DEFAULT: require('./img/list_right_default.png'),
            CHECKED: require('./img/list_right_checked.png'),
        },
        CENTER: {
            DEFAULT: require('./img/list_card_default.png'),
            CHECKED: require('./img/list_card_checked.png'),
        }
    },
    MOBILE: {
        LEFT: require('./img/mobile_style_1.png'),
        RIGHT: require('./img/mobile_style_2.png'),
        CENTER: require('./img/mobile_style_3.png')
    }
};

/*封装模态框类，与表单配合使用*/
class SiteForm extends AuthComponentBase {

    constructor(props) {
        super(props);
        this.state = {
            // 官方demo
            panes: props.data.banners ? (props.data.banners.length != 0 ? props.data.banners.length + 1 : 2) : 2,
            activeKey: '1'
        };
    }

    onTabsChange = (activeKey) => {
        this.setState({activeKey});
    };
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };
    add = () => {

        this.setState({
            panes: this.state.panes + 1,
            activeKey: (this.state.panes).toString()
        });

    };
    remove = (targetKey) => {

        if (this.state.panes == parseInt(targetKey) + 1) {
            this.setState({
                panes: this.state.panes - 1,
                activeKey: (parseInt(targetKey) - 1).toString()
            });

        } else {
            message.warn('不允许进行跨页删除操作');
            return null;
        }


    };

    /*表单用*/
    handleSubmit = () => {

        // let {data} = this.props;

        // console.dir(data);

        this.props.form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {

                let bannerList = [];

                if (values.banner) {

                    if (values['banner_1'].length == 0) {
                        message.error('请上传图片！');
                        return null;
                    }

                    for (let k = 1; k < this.state.panes; k++) {
                        if (values['banner_' + k].length != 0) {
                            bannerList.push({
                                mediaId: values['banner_' + k].file.response.data,
                                seq: k - 1,
                                title: values['title_' + k],
                                url: values['url_' + k],
                            });
                        } else {
                            break;
                        }
                    }
                }

                let formData = {
                    banner: values.banner,
                    banners: bannerList,
                    layout: values.layout
                };

                // 验证
                this.props.updateSiteConfig(formData);

            }
        });
    };

    // upload 改变时处理函数
    onChange = (info) => {

        if (info.fileList.length > 1) {
            info.fileList.shift();
        }

        let fileList = info.fileList;

        fileList.map((file) => {

            if (file.response) {
                file.url = media.getMediaUrl(file.response.data);
            }

            if (file.status == 'done') {
                return file;
            }
        });

    };

    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    // 裁剪完成之后回调
    uploadDone = (data, status) => {
        if (status == 'success') {
            this.setState({
                coverImgId: data,
                coverImgIdState: 'upload',
            });
        } else if (status == 'error') {
            this.setState({
                coverImgIdState: 'not',
            });
        }
    }

    // 图片上传回调
    crooperChange = (info, status) => {
        if (status == 'uploading') {
            // 图片上传状态改变
            if (this.state.coverImgIdState == 'not' || this.state.coverImgIdState == 'upload') {
                this.setState({
                    coverImgIdState: 'pending'
                });
            }
        }
    }

    beforeUpload = (file) => {
        if (file.size > 1048576) {
            message.warning('请选择1M以下的图片');
            return false;
        }

        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            message.warning('请选择正确的图片格式!');
            return false;
        }
    }

    // 使用产品功能
    useModule = (type, success, failure)=> {
        this.anyWhereModule(type).then(success, failure);
    };

    render = () => {

        let {data} = this.props;

        if (!data) {
            return null;
        }

        /*表单相应设置*/

        const {getFieldDecorator, getFieldValue} = this.props.form;

        /*移植代码*/

        let ImgUrl = IMG_LIST.MOBILE.LEFT;

        switch (getFieldValue('layout')) {
            case 'listCoverLeft':
                ImgUrl = IMG_LIST.MOBILE.LEFT;
                break;
            case 'listCoverRight':
                ImgUrl = IMG_LIST.MOBILE.RIGHT;
                break;
            case 'cardCoverCenter':
                ImgUrl = IMG_LIST.MOBILE.CENTER;
                break;
        }


        let contentList = [];

        const props = {
            name: 'media',
            showUploadList: false,
            withCredentials: true,
            action: media.addMedia({
                owner: 'users',
                restype: 'banner',
            }),
            beforeUpload: this.beforeUpload,
        };

        const crooperOptions = {
            aspectRatio: 2 / 1,
        };


        for (let i = 1; i < this.state.panes; i++) {

            let activeKey = i.toString();

            const coverImgIdProps = {
                fileName: `banner_${activeKey}`,
                options: {
                    onChange: this.crooperChange,
                    rules: [
                        {required: true, message: '需要上传一张商品图片', type: 'object'},
                    ],
                }
            };

            /*console.log(_.has(getFieldValue(`banner_${activeKey}`), 'file.response.data'));
            console.log((getFieldValue(`banner_${activeKey}`)));
            console.log(_.has(getFieldValue(`banner_${activeKey}`), 'file.response.data') && (getFieldValue(`banner_${activeKey}`) != null));
*/

            let content = (
                <Row gutter={16} key={'Row' + activeKey}>
                    <Col span={12}>
                        <CropperUpload
                            uploadDone={this.uploadDone}
                            crooperOptions={crooperOptions}
                            modalDesc={'请上传640px*320px尺寸的图片'}
                            form={this.props.form}
                            uploadFileProps={coverImgIdProps}
                            uploadProps={props}>
                            {
                                _.has(getFieldValue(`banner_${activeKey}`), 'file.response.data')
                                && (getFieldValue(`banner_${activeKey}`) != null) ?
                                    <div className="site-img-container">
                                        <Img
                                            src={media.getMediaUrl(getFieldValue(`banner_${activeKey}`).file.response.data)}
                                            style={{'width': '100%', 'height': 'auto'}}
                                            alt="测试"/>
                                    </div> : <div className="site-img-container">
                                    <div className="site-img-content">
                                        <Icon type="plus" style={{'color': '#999999', 'fontSize': '28px'}}/>
                                        <div className="ant-upload-text" style={{
                                            'fontSize': '14px',
                                            'color': '#666666',
                                            'lineHeight': '18px',
                                            'marginTop': '10px'
                                        }}>
                                            上传图片
                                        </div>
                                    </div>
                                </div>
                            }

                        </CropperUpload>
                        <div className="site-text-style">
                            <p>图片尺寸：640&times;320，大小&le;1M，支持格式：png/jpg</p>
                        </div>
                    </Col>
                    <Col span={12}>
                        <p className="site-form-text">添加图片链接：</p>
                        <FormItem hasFeedback
                                  help="请输入链接">
                            {
                                getFieldDecorator(`url_${activeKey}`, {
                                    rules: [
                                        {
                                            type: 'url',
                                            message: '请输入链接'
                                        }
                                    ]
                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>
                        <p style={{'lineHeight': '12px'}}>
                            <br/>
                        </p>
                        <p className="site-form-text">添加图片标题：</p>
                        <FormItem hasFeedback
                                  help="请输入标题">
                            {
                                getFieldDecorator(`title_${activeKey}`, {
                                    rules: [
                                        {
                                            type: 'string',
                                            message: '请输入标题'
                                        }
                                    ]
                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>
                    </Col>
                </Row>
            );

            contentList.push(
                {
                    key: activeKey,
                    title: '第' + activeKey + '页',
                    content: content
                }
            );
        }

        const extra = (
            <div>
                <span style={{'marginRight': '15px'}}>
                    点击下方+号按钮开始添加，最多可添加5张
                </span>
                {getFieldDecorator('banner',
                    {
                        valuePropName: 'checked',
                    }
                )(
                    <Switch />
                )}
            </div>
        );

        const operations = (
            <a href="javascript:void(0)" onClick={this.add}>
                <i className="iconfont icon-tianjia" style={{'color': '#cccccc', 'fontSize': '22px'}}></i>
            </a>
        );

        // 表单验证及属性相关设置
        return (
            <div style={{'width': '1146px', 'margin': '0 auto'}}>
                <div style={{'float': 'left', 'width': '417px', 'textAlign': 'center'}}>
                    <Img src={ImgUrl} alt="" style={{'width': '260px'}}/>
                    <p style={{'marginTop': '16px', 'fontSize': '16px', 'color': '#444444'}}>
                        布局预览
                    </p>
                </div>
                <div style={{'float': 'left', 'width': '650px'}}>
                    <Form layout="horizontal" className="content-site-form">
                        <Card title="广告图设置" style={{'marginBottom': '30px'}} extra={extra}>
                            <div style={{'display': getFieldValue('banner') ? 'block' : 'none'}}>
                                <Tabs
                                    hideAdd
                                    tabBarExtraContent={this.state.panes <= 5 ? operations : null}
                                    animated={false}
                                    onChange={this.onTabsChange}
                                    activeKey={this.state.activeKey}
                                    type="editable-card"
                                    onEdit={this.onEdit}>
                                    {contentList.map(
                                        pane =>
                                            <TabPane tab={pane.title} key={pane.key}>
                                                {pane.content}
                                            </TabPane>
                                    )}
                                </Tabs>
                            </div>
                        </Card>
                        <Card title="布局样式" style={{'marginBottom': '30px'}}>
                            {getFieldDecorator('layout', {})(
                                <RadioGroup>
                                    <Radio value="listCoverLeft">
                                        <Img
                                            src={getFieldValue('layout') == 'listCoverLeft' ? IMG_LIST.LIST.LEFT.CHECKED : IMG_LIST.LIST.LEFT.DEFAULT}
                                            alt="" style={{'verticalAlign': 'middle'}}/>
                                    </Radio>
                                    <Radio value="listCoverRight">
                                        <Img
                                            src={getFieldValue('layout') == 'listCoverRight' ? IMG_LIST.LIST.RIGHT.CHECKED : IMG_LIST.LIST.RIGHT.DEFAULT}
                                            alt="" style={{'verticalAlign': 'middle'}}/>
                                    </Radio>
                                    <Radio value="cardCoverCenter">
                                        <Img
                                            src={getFieldValue('layout') == 'cardCoverCenter' ? IMG_LIST.LIST.CENTER.CHECKED : IMG_LIST.LIST.CENTER.DEFAULT}
                                            alt="" style={{'verticalAlign': 'middle'}}/>
                                    </Radio>
                                </RadioGroup>
                            )}
                        </Card>
                        <AuthModule type={module.PLATFORM_MICSITE_MODULE}>
                            <Button type="primary" size="large"
                                    onClick={()=>this.useModule(module.PLATFORM_MICSITE_MODULE, this.handleSubmit)}>同步到手机端</Button>
                        </AuthModule>
                    </Form>
                </div>
            </div>

        );
    };

}

export default createForm({
    /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
    mapPropsToFields: function (props) {

        let {data} = props;

        let result = {};

        if (data.banners && data.banners.length != 0) {

            // 转换为banner图可识别的数据格式
            data.banners.map((item, index) => {

                result['banner_' + (index + 1)] = {
                    value: item ? {
                        file: {
                            uid: index,
                            name: index,
                            url: media.getMediaUrl(item.mediaId),
                            response: {
                                data: item.mediaId
                            },
                        }
                    } : {}
                };

                result['title_' + (index + 1)] = {
                    value: item?item.title:''
                };
                result['url_' + (index + 1)] = {
                    value: item?item.url:''
                };
            });
        } else {
            result['banner_1'] = {
                value: {}
            };
            result['title_1'] = {
                value: ''
            };
            result['url_1'] = {
                value: ''
            };
        }

        result.banner = {
            value: data.banner
        };
        result.layout = {
            value: data.layout ? data.layout : 'listCoverLeft'
        };

        return result;

    },
    /*当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store*/
    onFieldsChange: function (props, fields) {

        const keys = Object.keys(fields);

        keys.forEach(key => {

            props.data[key] = fields[key].value;

        });

    }
})(SiteForm);




