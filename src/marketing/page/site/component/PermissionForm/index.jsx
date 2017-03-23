import React from 'react';
import {Form, Button, Row, Col, Checkbox} from 'antd';
import {booleanToString} from 'common/util';
import './index.less';
import * as urlUtils from 'common/util/url';
import classNames from 'classnames';
import AuthComponentBase from 'common/base/AuthComponentBase';
import AuthModule from 'common/component/AuthModule';
import * as module from 'common/config/module';
import Img from 'common/component/Img';
const createForm = Form.create;

const IMG_LIST = {
    CONTENT: {
        DEFAULT: require('./img/content-default.png'),
        CHECKED: require('./img/content-checked.png')
    },
    MALL: {
        DEFAULT: require('./img/mall-default.png'),
        CHECKED: require('./img/mall-checked.png')
    },
    YYG: {
        DEFAULT: require('./img/yyg-default.png'),
        CHECKED: require('./img/yyg-checked.png')
    },
    MEMBER: {
        DEFAULT: require('./img/member-default.png'),
        CHECKED: require('./img/member-checked.png')
    },
    ALIPAY: require('./img/alipay.png'),
    WECHAT: require('./img/wechat.png'),
};

class PermissionForm extends AuthComponentBase {

    constructor(props) {
        super(props);
    }

    state = {};

    handleSubmit = ()=> {

        const value = this.props.form.getFieldsValue();

        let submitData = {
            brandAuth: booleanToString(value.brandAuth, 'upper'),
            contentAuth: booleanToString(value.contentAuth, 'upper'),
            mallAuth: booleanToString(value.mallAuth, 'upper'),
            mallOpMode: 'S',
            partnerAuth: booleanToString(value.partnerAuth, 'upper'),
            yygAuth: booleanToString(value.yygAuth, 'upper')
        };

        // console.dir(submitData);

        /*switch (value.partnerAuth) {
            case false:
                if (value.mallAuth == true || value.yygAuth == true) {
                    message.error('商城/一元购模块依赖会员模块，请勾选会员模块');
                    return;
                }
                break;
            case true:
                break;
        }*/

        this.props.mallAuth(submitData);
    };

    //按index排序函数
    by = (name)=> {
        return function (o, p) {
            var a, b;
            if (typeof o === 'object' && typeof p === 'object' && o && p) {
                a = o[name];
                b = p[name];
                if (a === b) {
                    return 0;
                }
                if (typeof a === typeof b) {
                    return a < b ? -1 : 1;
                }
                return typeof a < typeof b ? -1 : 1;
            }
            else {
                throw ('error');
            }
        };
    };

    // 使用产品功能
    useModule = (type, success, failure)=> {
        this.anyWhereModule(type).then(success, failure);
    };

    render() {
        let {data, uin, menu} = this.props;

        if (!data || !menu) {
            return null;
        }

        let vsiteConfig = {
            ACCOUNT: 'hidden',
            CONTENT: 'hidden',
            MPLUGIN: 'hidden',
            PAYMENT: 'hidden',
            PLATFORM: 'hidden',
            SERVICE: 'hidden',
            YYG: 'hidden',
            GOODS: 'hidden'
        };

        // menu筛选
        menu.map((item)=> {
            vsiteConfig[item.key] = item.status;
        });

        // console.dir(vsiteConfig);

        // 旧数据兼容
        if(!data.siteAuth) {
            data.siteAuth = {
                'brandAuth': 'FALSE',
                'contentAuth': 'FALSE',
                'mallAuth': 'FALSE',
                'mallOpMode': 'S',
                'partnerAuth': 'FALSE',
                'yygAuth': 'FALSE'
            };
        }

        let mallAuth = data.siteAuth;
        //构造数据

        let number = 0;

        let dataSource = [];

        for (let authName in mallAuth) {

            if (mallAuth[authName] == 'TRUE') {
                switch (authName) {
                    case 'mallAuth':
                        dataSource.push({
                            name: '商城',
                            index: 0,
                            link: urlUtils.getMallIndexUrl(uin),
                            src: IMG_LIST.MALL.CHECKED
                        });
                        number += 1;
                        break;
                    case 'yygAuth':
                        dataSource.push({
                            name: '一元购',
                            index: 1,
                            link: urlUtils.getYygIndexUrl(uin),
                            src: IMG_LIST.YYG.CHECKED
                        });
                        number += 1;
                        break;
                    case 'contentAuth':
                        dataSource.push({
                            name: '内容',
                            index: 2,
                            link: urlUtils.getContentIndexUrl(uin),
                            src: IMG_LIST.CONTENT.CHECKED
                        });
                        number += 1;
                        break;
                    case 'brandAuth':
                        dataSource.push({
                            name: '会员',
                            index: 3,
                            link: urlUtils.getMemberIndexUrl(uin),
                            src: IMG_LIST.MEMBER.CHECKED
                        });
                        number += 1;
                        break;
                }
            }

        }

        dataSource.sort(this.by('index'));

        let colNumber = 24 / number;

        let colList = [];

        for (let i = 0; i < dataSource.length; i++) {

            colList.push(<Col span={colNumber} key={i}>
                <div className="gutter-box">
                    <div>
                        {dataSource[i].name}
                    </div>
                </div>
            </Col>);
        }

        const {getFieldDecorator} = this.props.form;

        //模型1

        let moduleList = [];

        let imgList1 = [
            {
                name: '商城',
                label: 'mallAuth',
                desc: '您在商品库中上架的商品，会在这里出售',
                src: {
                    default: IMG_LIST.MALL.DEFAULT,
                    checked: IMG_LIST.MALL.CHECKED
                },
                link: urlUtils.getMallIndexUrl(uin),
                status: vsiteConfig['GOODS']
            }, {
                name: '一元购',
                label: 'yygAuth',
                desc: '通过一元购的形式进行商品的售卖',
                src: {
                    default: IMG_LIST.YYG.DEFAULT,
                    checked: IMG_LIST.YYG.CHECKED
                },
                link: urlUtils.getYygIndexUrl(uin),
                status: vsiteConfig['YYG']
            }
        ];

        //构造选择模型1
        for (let i = 0; i < imgList1.length; i++) {

            let fixClass = classNames({
                'auth-center': true,
                'checkBoxFix': true,
                'auth-cardColorDefault': true,
                'auth-cardColorChange': mallAuth[imgList1[i].label] == 'TRUE'
            });

            moduleList.push(
                <Col span={12} key={i}
                     style={{'padding': '8px', 'display': imgList1[i].status == 'hidden' ? 'none' : 'block'}}>

                    <div className={fixClass}>
                        {
                            getFieldDecorator(imgList1[i].label, {
                                valuePropName: 'checked'
                            })(
                                <Checkbox disabled={imgList1[i].status == 'visible_disabled'}>
                                    <Row gutter={16}>
                                        <Col span={6}>
                                            <div className="auth-module-img">
                                                <Img
                                                    src={mallAuth[imgList1[i].label] == 'TRUE' ? imgList1[i].src.checked : imgList1[i].src.default}
                                                    alt=""/>
                                            </div>
                                        </Col>
                                        <Col span={18}>
                                            <div style={{'textAlign': 'left'}} className="auth-module-div">
                                                <p><span style={{
                                                    'fontSize': '20px',
                                                    'fontWeight': 'bolder'
                                                }}>{imgList1[i].name}</span></p>
                                                <p><span style={{'fontSize': '12px'}}>{imgList1[i].desc}</span></p>
                                                <p><span style={{'fontSize': '12px'}}>链接：{imgList1[i].link}</span></p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Checkbox>
                            )
                        }
                    </div>
                </Col>
            );
        }

        //模型1

        let moduleList2 = [];

        let imgList2 = [
            {
                name: '热点资讯',
                label: 'contentAuth',
                desc: '您发布到微站的资讯内容，将在这里展示',
                src: {
                    default: IMG_LIST.CONTENT.DEFAULT,
                    checked: IMG_LIST.CONTENT.CHECKED
                },
                link: urlUtils.getContentIndexUrl(uin)
            }, {
                name: '我的',
                label: 'brandAuth',
                desc: '您的会员将在这里维护自己的信息',
                src: {
                    default: IMG_LIST.MEMBER.DEFAULT,
                    checked: IMG_LIST.MEMBER.CHECKED
                },
                link: urlUtils.getMemberIndexUrl(uin)
            }
        ];

        //构造选择模型1
        for (let i = 0; i < imgList2.length; i++) {

            let fixClass = classNames({
                'auth-center': true,
                'checkBoxFix': true,
                'auth-cardColorDefault': true,
                'auth-cardColorChange': mallAuth[imgList2[i].label] == 'TRUE'
            });

            moduleList2.push(
                <Col span={12} key={i} style={{'padding': '8px'}}>

                    <div className={fixClass}>
                        {
                            getFieldDecorator(imgList2[i].label, {
                                valuePropName: 'checked'
                            })(
                                <Checkbox>
                                    <Row gutter={16}>
                                        <Col span={6}>
                                            <div className="auth-module-img">
                                                <Img
                                                    src={mallAuth[imgList2[i].label] == 'TRUE' ? imgList2[i].src.checked : imgList2[i].src.default}
                                                    alt=""/>
                                            </div>
                                        </Col>
                                        <Col span={18}>
                                            <div style={{'textAlign': 'left'}} className="auth-module-div">
                                                <p><span style={{
                                                    'fontSize': '20px',
                                                    'fontWeight': 'bolder'
                                                }}>{imgList2[i].name}</span></p>
                                                <p><span style={{'fontSize': '12px'}}>{imgList2[i].desc}</span></p>
                                                <p><span style={{'fontSize': '12px'}}>链接：{imgList2[i].link}</span></p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Checkbox>
                            )
                        }
                    </div>
                </Col>
            );
        }


        return (
            <div className="auth-parent-container">
                <div className="auth-item-list">

                    <div className="auth-bg">
                        <div className="auth-banner">
                            <Row>
                                {colList}
                            </Row>
                        </div>
                    </div>
                    <div className="auth-phone-bottom">
                        手机端的效果
                    </div>
                </div>
                <div className="auth-form">
                    <Form>
                        <Row gutter={16}>
                            {moduleList}
                            {moduleList2}
                        </Row>
                        {/*<br/>
                         <Row gutter={16}>
                         {moduleList2}
                         </Row>*/}
                        <br/>
                        <br/>
                        <br/>
                        <Row>
                            <Col span={24} style={{'textAlign': 'center'}}>
                                <AuthModule type={module.PLATFORM_MICSITE_MODULE}>
                                    <Button type="primary" size="large"
                                            onClick={()=>this.useModule(module.PLATFORM_MICSITE_MODULE, this.handleSubmit)}>同步到手机端</Button>
                                </AuthModule>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div style={{'clear': 'both'}}></div>
            </div>
        );
    }
}

export default createForm({

    /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
    mapPropsToFields: function (props) {
        const {data} = props;

        if (data && data.siteAuth) {
            return {
                mallOpMode: {
                    value: data.siteAuth.mallOpMode
                },
                partnerAuth: {
                    value: data.siteAuth.partnerAuth == 'TRUE'
                },
                brandAuth: {
                    value: data.siteAuth.brandAuth == 'TRUE'
                },
                yygAuth: {
                    value: data.siteAuth.yygAuth == 'TRUE'
                },
                mallAuth: {
                    value: data.siteAuth.mallAuth == 'TRUE'
                },
                contentAuth: {
                    value: data.siteAuth.contentAuth == 'TRUE'
                }
            };
        } else {
            return {};
        }
    },
    /*当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store*/
    onFieldsChange: function (props, fields) {

        const keys = Object.keys(fields);

        keys.forEach(key=> {

            props.data.siteAuth[key] = booleanToString(fields[key].value, 'upper');

        });

        /*//联动，不确定是否有效
         if(props.data.mallAuth['mallAuth'] == 'TRUE' || props.data.mallAuth['yygAuth'] == 'TRUE'){


         props.data.mallAuth['brandAuth'] = 'TRUE';
         }*/

    }


})(PermissionForm);

export {
    IMG_LIST
};

