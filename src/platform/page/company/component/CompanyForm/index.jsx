import React, {Component} from 'react';
import {Form, Input, Modal, Card, Row, Col} from 'antd';
import * as media from 'common/util/media';
import {getEntryUrl} from 'common/util/url';
import Img from 'common/component/Img';

const FormItem = Form.Item;
class CompanyForm extends Component {

    constructor(props) {
        super(props);
    }

    //提交数据
    handleSubmit = (id)=> {

        this.props.form.validateFieldsAndScroll((errors) => {
            if (errors) {
                //console.log.log('Errors in form!!!');
                return;
            } else {
                const formData = this.props.form.getFieldsValue();

                const submitData = {
                    'approved': true,
                    'memo': formData.memo
                };

                //提交
                this.props.approve(id, submitData);
            }
        });
    };

    render() {
        let {data} = this.props;
        if (!data) {
            return null;
        }


        let visible = this.props.visible;

        const formItemLayout = {
            labelCol: {span: 2},
            wrapperCol: {span: 22}
        };

        const {getFieldDecorator} = this.props.form;

        let id = data.id,
            uin = data.uin,
            form = '',
            onOk = undefined,
            onCancel = undefined,
            textOk = '',
            textCancel = '',
            closable = true;

        let link = getEntryUrl({uin, code: 'mall'});

        if (data.status == 'AUTHENTICATION') {

            //建议只留一个确定按钮
            // closable = false;

            textOk = '确定';
            textCancel = '取消';

            onOk = this.props.reset;
            onCancel = this.props.reset;

        } else {
            form = (<Form layout="horizontal">
                <FormItem
                    {...formItemLayout}
                    label="审核备注">
                    {
                        getFieldDecorator('memo', {
                            rules: [
                                {}
                            ]
                        })(
                            <Input type="textarea" rows={4} autosize={{'minRows': 2, 'maxRows': 6}} autoComplete="off"/>
                        )
                    }
                </FormItem>
            </Form>);

            textOk = '通过';
            textCancel = '取消';

            onOk = ()=>this.handleSubmit(id);
            onCancel = this.props.reset;

        }

        return (
            <Modal title="企业"
                   width="960"
                   closable={closable}
                   visible={visible}
                   onOk={onOk} onCancel={onCancel}
                   okText={textOk} cancelText={textCancel}>
                <Card>
                    <Row style={{'padding': '0 12px'}}>
                        <Col span={12}>
                            <div>
                                <p>企业名称：{data.name}</p>
                                <br/>
                                <p>主营商品：{data.products}</p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <div>
                                <p>品牌类型：{data.business}</p>
                            </div>
                        </Col>
                    </Row>
                    <br/>
                    <Row style={{'padding': '0 12px'}}>
                        <Col span={12}>
                            <div>
                                <p>联系人：{data.contact ? data.contact.name : '-'}</p>
                                <br/>
                                <p>联系邮箱：{data.contact ? data.contact.email : '-'}</p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <div>
                                <p>联系电话：{data.contact ? data.contact.mobile : '-'}</p>
                            </div>
                        </Col>
                    </Row>
                    <br/>

                    {data.status != 'AUTHENTICATION' && form}
                    {data.status == 'AUTHENTICATION' && <Row style={{'padding': '0 12px'}}>
                        <Col span={24}>
                            <div>
                                <p>审核备注：{data.approves}</p>
                            </div>
                        </Col>
                    </Row>}

                </Card>
                <br/>
                {/*开通商城才显示下面内容*/}
                <Card>
                    <Row style={{'padding': '0 12px'}}>
                        <Col span={12}>
                            <div>
                                <p>平台账号：{data.userName}</p>
                                {/*<br/>
                                 <p>客户端名称：{data.uin}</p>*/}
                                <br/>
                                <p>移动端链接：{link}</p>
                                <br/>
                                <p>移动端二维码：
                                    <Img style={{'verticalAlign': 'top', 'border': '1px solid #e7e7e7'}}
                                         src={media.getQrcodeUrl(120, 120, link)}/>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Modal>
        );
    }
}

export default Form.create({
    /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
    mapPropsToFields: function (props) {

        const {data} = props;

        if (data) {
            return {
                approved: {
                    value: 'true'
                },
                memo: {
                    value: data.memo
                }
            };
        } else {
            return {};
        }

    }
})(CompanyForm);



