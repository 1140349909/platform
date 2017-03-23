import React, {Component} from 'react';
import {Form, Modal, Table, Switch, Icon} from 'antd';
import {booleanToString} from 'common/util';

const createForm = Form.create;
const FormItem = Form.Item;

class CompanyShow extends Component {

    constructor(props) {
        super(props);
    }

    state = {};

    handleSubmit = ()=> {

        const value = this.props.form.getFieldsValue();

        let submitData = {
            'brandAuth': booleanToString(value.brandAuth, 'upper'),
            'contentAuth': booleanToString(value.contentAuth, 'upper'),
            'mallAuth': booleanToString(value.mallAuth, 'upper'),
            'mallOpMode': 'S',
            'partnerAuth': booleanToString(value.partnerAuth, 'upper'),
            'yygAuth': booleanToString(value.yygAuth, 'upper')
        };

        this.props.mallAuth(this.props.data.id, submitData);
    };

    render() {
        let {data} = this.props;
        if (!data) {
            return null;
        }

        let mallAuth = data.mallAuth;

        let visible = this.props.visible;

        const {getFieldDecorator} = this.props.form;


        const columns = [{
            title: '模块名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '功能说明',
            dataIndex: 'info',
            key: 'info'
        }, {
            title: '开通说明',
            dataIndex: 'help',
            key: 'help'
        }, {
            title: '开通状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record)=> {

                let status = '';

                switch (record.status) {
                    case 'TRUE':
                        status = (
                            <div>
                                <Icon type="check-circle" style={{'color': '#2db7f5'}}/>
                                &nbsp;
                                &nbsp;
                                <span>已开通</span>
                            </div>
                        );
                        break;
                    default:
                        status = (
                            <div>
                                <Icon type="minus-circle" style={{'color': '#EB8010'}}/>
                                &nbsp;
                                &nbsp;
                                <span>未开通</span>
                            </div>
                        );
                        break;
                }

                return (
                    <div>
                        {status}
                    </div>
                );
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record)=> {

                return (
                    <div>
                        {record.operation != '' && <FormItem>
                            {
                                getFieldDecorator(record.label, {
                                    valuePropName: 'checked'
                                })(
                                    <Switch checkedChildren="开"
                                            unCheckedChildren="关"/>
                                )
                            }
                        </FormItem>}
                    </div>
                );

            }
        }];

        let dataSource = [{
            key: 1,
            label: 'mallAuth',
            name: '商城',
            info: '商品交易、客户端页面展示',
            help: '',
            status: mallAuth.mallAuth,
            operation: mallAuth.mallAuth,
            children: [{
                key: 11,
                name: '爆款商城',
                info: '现金交易方式',
                help: '设置支付方式',
                status: mallAuth.mallAuth,
                operation: ''
            }, {
                key: 12,
                name: '',
                info: '允许使用优惠券交易',
                help: '需开通优惠券营销',
                status: mallAuth.mallAuth,
                operation: ''
            }, {
                key: 13,
                name: '',
                info: '允许积分抵现交易',
                help: '需开通积分营销',
                status: mallAuth.mallAuth,
                operation: ''
            }, {
                key: 14,
                name: '',
                info: '允许使用固定积分+固定现金交易',
                help: '需开通积分营销',
                status: mallAuth.mallAuth,
                operation: ''
            }, {
                key: 15,
                name: '积分商城',
                info: '积分纯兑换',
                help: '需开通积分营销',
                status: mallAuth.mallAuth,
                operation: ''
            }]
        }, {
            key: 2,
            label: 'yygAuth',
            name: '一元购',
            info: '商品管理及客户端展示',
            help: '',
            status: mallAuth.yygAuth,
            operation: mallAuth.yygAuth,
            children: [{
                key: 21,
                name: '一元购',
                info: '现金玩法：以现金进行参与',
                help: '需开通支付方式',
                status: mallAuth.yygAuth,
                operation: ''
            }, {
                key: 22,
                name: '积分购',
                info: '积分玩法：以积分进行参与',
                help: '需开通积分营销',
                status: mallAuth.yygAuth,
                operation: ''
            }]
        }, {
            key: 3,
            label: 'contentAuth',
            name: '内容模块',
            info: '内容的编辑，客户端展示',
            help: '',
            status: mallAuth.contentAuth,
            operation: mallAuth.contentAuth
        }, {
            key: 4,
            label: 'saleAuth',
            name: '营销模块',
            info: '营销方式的设定，内容的嵌入',
            help: '',
            status: mallAuth.contentAuth,
            // status: false,
            operation: '',
            children: [{
                key: 41,
                name: '积分',
                info: '设定积分，嵌入到内容',
                help: '需开通内容模块',
                status: false,
                operation: ''
            }, {
                key: 42,
                name: '优惠券',
                info: '设定优惠券，嵌入到内容',
                help: '需开通内容模块',
                status: false,
                operation: ''
            }]
        }];

        return (
            <div>
                <Modal title="客户详情"
                       width="960"
                       visible={visible}
                       onOk={this.handleSubmit}
                       onCancel={this.props.reset}>
                    <Form>
                        <Table columns={columns}
                               dataSource={dataSource}
                               bordered/>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default createForm({

    /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
    mapPropsToFields: function (props) {
        const {data} = props;

        if (data) {
            return {
                mallOpMode: {
                    value: data.mallAuth.mallOpMode
                },
                partnerAuth: {
                    value: data.mallAuth.partnerAuth == 'TRUE'
                },
                brandAuth: {
                    value: data.mallAuth.brandAuth == 'TRUE'
                },
                yygAuth: {
                    value: data.mallAuth.yygAuth == 'TRUE'
                },
                mallAuth: {
                    value: data.mallAuth.mallAuth == 'TRUE'
                },
                contentAuth: {
                    value: data.mallAuth.contentAuth == 'TRUE'
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

            props.data.mallAuth[key] = booleanToString(fields[key].value, 'upper');
        });
    }


})(CompanyShow);

