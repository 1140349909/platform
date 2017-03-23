import React , {Component}from 'react';
import {Row,Col} from 'antd';
import Img from 'common/component/Img';
import  './index.less';
import * as media from 'common/util/media';


export default class InvoiceShowInf extends Component {

    constructor(props) {
        super(props);
    }

    state = {

    };

    render() {

        const invoiceSettingInf =  this.props.invoiceSettingInf;
        //控制其显示状态
        if(!invoiceSettingInf){
            return (
                <div  className='show-invoice-inf'>

                </div>
            );
        }else{

            let issueTypeValue = (invoiceSettingInf.issueType=='person'?'个人':'企业') || '';
            let invocieTypeValue = invoiceSettingInf.invocieType=='normal'?'增值税普通发票':'增值税专用发票' || '';
            /*照片处理*/
            let bizImgUrl =  invoiceSettingInf.bizImgId!=''?media.getMediaUrl(invoiceSettingInf.bizImgId):'';
            let taxImgImgUrl =  invoiceSettingInf.taxImgId!=''?media.getMediaUrl(invoiceSettingInf.taxImgId):'';
            let taxPayerImgUrl =  invoiceSettingInf.taxPayerImgId!=''?media.getMediaUrl(invoiceSettingInf.taxPayerImgId):'';

            return (
                <div className='show-invoice-inf'>
                    <Row>
                        <Col span={5} offset={2} style={{textAlign:'right'}}>
                            开具类型
                        </Col>
                        <Col style={{marginLeft:'32px'}} span={12}>{issueTypeValue}</Col>
                    </Row>
                    <Row>
                        <Col span={5} offset={2} style={{textAlign:'right'}}>发票抬头</Col>
                        <Col span={12}  style={{marginLeft:'32px'}} >{invoiceSettingInf.title}</Col>
                    </Row>
                    <Row>
                        <Col span={5} offset={2} style={{textAlign:'right'}}>发票类型</Col>
                        <Col span={12}  style={{marginLeft:'32px'}} >{invocieTypeValue}</Col>
                    </Row>
                    { (invoiceSettingInf.invocieType=='special'?true:false) &&
                    <div>
                        <Row>
                            <Col span={5} offset={2} style={{textAlign:'right'}}>税务登记号</Col>
                            <Col span={12} style={{marginLeft:'32px'}} >{invoiceSettingInf.taxNo}</Col>
                        </Row>
                        <Row>
                            <Col span={5} offset={2} style={{textAlign:'right'}}>注册地址</Col>
                            <Col span={12}  style={{marginLeft:'32px'}} >{invoiceSettingInf.addr}</Col>
                        </Row>
                        <Row>
                            <Col span={5} offset={2} style={{textAlign:'right'}}>注册电话</Col>
                            <Col span={12}  style={{marginLeft:'32px'}} >{invoiceSettingInf.tel}</Col>
                        </Row>
                        <Row>
                            <Col span={5} offset={2} style={{textAlign:'right'}}>开户行名称</Col>
                            <Col span={12}  style={{marginLeft:'32px'}} >{invoiceSettingInf.bank}</Col>
                        </Row>
                        <Row>
                            <Col span={5} offset={2} style={{textAlign:'right'}}>开户行账号</Col>
                            <Col span={12}  style={{marginLeft:'32px'}} >{invoiceSettingInf.account}</Col>
                        </Row>
                        {/*TODO*/}
                        <Row>
                            <Col span={5} offset={2} style={{textAlign:'right'}}>营业执照复印件</Col>
                            <Col span={12}  style={{marginLeft:'32px'}} ><Img src={bizImgUrl} alt="营业执照复印件"/></Col>
                        </Row>
                        <Row>
                            <Col span={5} offset={2} style={{textAlign:'right'}}>税务登记复印件</Col>
                            <Col span={12}  style={{marginLeft:'32px'}} ><Img src={taxImgImgUrl} alt="税务登记复印件"/></Col>
                        </Row>
                        <Row>
                            <Col span={5} offset={2} style={{textAlign:'right'}}>一般纳税人资格认证复印件</Col>
                            <Col span={12}  style={{marginLeft:'32px'}} ><Img src={taxPayerImgUrl} alt="一般纳税人资格认证复印件"/></Col>
                        </Row>
                    </div>

                    }

                </div>
            );
        }


    }
}
