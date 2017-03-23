import React, {Component} from 'react';
import {Modal,Button,Row,Col} from 'antd';
import {moneyFormat} from '/common/util';
import './index.less';
import * as media from 'common/util/media';
import Img from 'common/component/Img';
export default class InvoiceDetail extends Component {

    constructor(props) {
        super(props);
    }

    state = {

    };

    render() {
        const {visible,reset,invoiceData} = this.props;
        let footer = <div>
                <Button onClick={reset}>取消</Button>
            </div>;
        let bizImgUrl =media.getMediaUrl(invoiceData.invoiceConfig.bizImgId);
        let taxImgImgUrl =  media.getMediaUrl(invoiceData.invoiceConfig.taxImgId);
        let taxPayerImgUrl = media.getMediaUrl(invoiceData.invoiceConfig.taxPayerImgId);

        return (
            <Modal
                className="invoice-modal-detail"
                width={700}
                title="开票详情"
                visible={visible}
                footer={footer}
                onCancel={reset}>
                <Row>
                    <Col span={7} className='invoice-modal-detail-left'>
                       开票类型：
                    </Col>
                    <Col offset={1} span={16}>
                        {invoiceData.invoiceConfig.issueType=='person'?'个人':'企业'}
                    </Col>
                </Row>
                <Row>
                    <Col span={7} className='invoice-modal-detail-left'>
                        开票金额：
                    </Col>
                    <Col offset={1} span={16}>
                        {moneyFormat(invoiceData.money, null, 2)}元
                    </Col>
                </Row>
                <Row>
                    <Col span={7} className='invoice-modal-detail-left'>
                        发票抬头：
                    </Col>
                    <Col offset={1} span={16}>
                        {invoiceData.invoiceConfig.title}
                    </Col>
                </Row>
                <Row>
                    <Col span={7} className='invoice-modal-detail-left'>
                        发票内容：
                    </Col>
                    <Col offset={1} span={16}>
                        {invoiceData.invoiceContent}
                    </Col>
                </Row>
                {invoiceData.invoiceConfig.invocieType==='special' && <div>
                    <Row>
                        <Col span={7} className='invoice-modal-detail-left'>
                            税务登记号：
                        </Col>
                        <Col offset={1} span={16}>
                            {invoiceData.invoiceConfig.taxNo}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7} className='invoice-modal-detail-left'>
                            注册地址：
                        </Col>
                        <Col offset={1} span={16}>
                            {invoiceData.invoiceConfig.addr}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7} className='invoice-modal-detail-left'>
                            开户名称：
                        </Col>
                        <Col offset={1} span={16}>
                            {invoiceData.invoiceConfig.bank}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7} className='invoice-modal-detail-left'>
                            开户账号：
                        </Col>
                        <Col offset={1} span={16}>
                            {invoiceData.invoiceConfig.account}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7} className='invoice-modal-detail-left'>
                            营业执照复印件：
                        </Col>
                        <Col offset={1} span={16}>
                            <Img style={{width:'60px',height:'60px'}}  src={bizImgUrl}  alt="营业执照复印件"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7} className='invoice-modal-detail-left'>
                            税务登记复印件：
                        </Col>
                        <Col offset={1} span={16}>
                            <Img style={{width:'60px',height:'60px'}} src={taxImgImgUrl} alt="税务登记复印件"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7} className='invoice-modal-detail-left'>
                            一般纳税人资质复印件：
                        </Col>
                        <Col offset={1} span={16}>
                            <Img style={{width:'60px',height:'60px'}} src={taxPayerImgUrl} alt="一般纳税人资格认证复印件"/>
                        </Col>
                    </Row>
                </div>}
            </Modal>
        );
    }
}
