import React from 'react';
import {Modal, Radio, message} from 'antd';
import PageBase from 'common/base/PageBase';
import * as invoiceAction from '../../store/invoice/action';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import  './title.less';
import  InvoiceCard from './component/InvoiceCard';
import  InvoiceInfForm from './component/InvoiceInfForm';
import  InvoiceShowInf from './component/InvoiceShowInf';
const RadioGroup = Radio.Group;

@connect(
    state => ({
        operation: state.operation,
        invoice: state.invoice.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...invoiceAction
        }, dispatch)
    })
)

export default class Title extends PageBase {

    constructor(props) {
        super(props);
    }

    //TODO 图片问题
    state = {
        isLoading: true,
        //完善发票信息
        isEditorInvoice: false,
        invoiceSettingInf: {},

        //默认信息
        issueTypeValue: 'person',
        invocieTypeValue: 'normal',
        //类型转换   editType==='personToCorp'   || editType==='normalToSpecial' || 默认值
        editType: '',
        //修改抬头还是修改类型（发普）
        whatEdit: '',
        visible: false
    };

    // 在完成首次渲染之前调用，此时仍可以修改组件的state。
    componentWillMount() {
    }

    // 真实的DOM被渲染出来后调用。
    componentDidMount() {
        this.getIsConfigInvoice();
    }

    // 组件接收到新的props时调用，并将其作为参数nextProps使用，此时可以更改组件props及state
    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {

            case invoiceAction.GET_ISCONFIG_INVOICE_SUCCESS:
                this.setState({
                    isEditorInvoice: !nextProps.invoice.invoiceIsSetting.settting
                });
                if (nextProps.invoice.invoiceIsSetting.settting) {
                    this.getConfigInvoice();
                }
                break;
            case invoiceAction.GET_ISCONFIG_INVOICE_FAILURE:
                this.setState({
                    isEditorInvoice: !nextProps.invoice.invoiceIsSetting.settting,
                    isLoading: false,
                });
                break;
            case invoiceAction.GET_CONFIG_INVOICE_SUCCESS:
                this.setState({
                    invoiceSettingInf: nextProps.invoice.invoiceSettingInf,
                    isEditorInvoice: false,
                    isLoading: false,
                });
                break;
            case invoiceAction.UPDATE_CONFIG_INVOICE_SUCCESS:
                this.getConfigInvoice();
                break;
        }
    }

    //检查发票配置
    getIsConfigInvoice = () => {
        this.props.actions.getIsConfigInvoice({
            check: true
        });
    };
    getConfigInvoice = () => {
        this.props.actions.getConfigInvoice({
            check: false
        });
    };
    //保存发票设置
    updateConfigInvoice = (data) => {
        this.props.actions.updateConfigInvoice(data);
    };


    editConfirm = (type, obj) => {
        if (type === 'person') {
            let title = <p className="invoice-modal-title-style">请选择您的修改类型</p>;
            let content =
                <div>
                    <p className="invoice-modal-content-style" style={{fontSize: '14px'}}>开具类型修改：个人修改为企业</p>
                </div>;

            Modal.confirm({
                iconType: 'exclamation-circle',
                width: 600,
                title: title,
                content: content,
                okText: '确定',
                cancelText: '取消',
                onOk(){
                    obj.setState({
                        isEditorInvoice: true,
                        issueTypeValue: 'corp',
                        invocieTypeValue: 'normal',
                        editType: 'personToCorp'
                    });

                },
                onCancel(){
                }
            });
        }
        else if (type === 'corp') {
            this.setState({
                visible: true
            });
        }

    };
    saveConfirm = (type, obj, values) => {
        let title = <p className="invoice-modal-title-style">保存发票信息</p>;
        let content = <div>
            <p className="invoice-modal-content-style" style={{fontSize: '14px'}}>您的发票抬头：<span
                style={{color: '#f00', fontSize: '20px'}}>{values['title']}</span></p>
            {type === 'saveType' && <p className="invoice-modal-content-style" style={{fontSize: '14px'}}></p>}
        </div>;

        Modal.confirm({
            iconType: 'exclamation-circle',
            width: 600,
            title: title,
            content: content,
            okText: '确定',
            cancelText: '取消',
            onOk(){
                //发票类型的标题修改
                obj.updateConfigInvoice(values);
            },
            onCancel(){

            }
        });


    };
    cancelConfirm = (obj) => {
        let title = <p className="invoice-modal-title-style">修改发票信息</p>;
        Modal.confirm({
            iconType: 'exclamation-circle',
            width: 600,
            title: title,
            content: '',
            okText: '确定',
            cancelText: '取消',
            onOk(){
                obj.setState({
                    isEditorInvoice: true,
                    issueTypeValue: 'corp',
                    invocieTypeValue: 'special',
                    editType: 'normalToSpecial'
                });
            },
            onCancel(){

            }
        });
    };

    /*企业普 修改发票类型，title还是type*/
    handleTypeChangeOk = () => {
        if (!this.state.whatEdit) {
            message.warning('请在弹窗中选择您要修改的发票的信息');
        }
        if (this.state.whatEdit === 'titleEdit') {
            this.setState({
                visible: false,
                isEditorInvoice: true,
                issueTypeValue: 'corp',
                invocieTypeValue: 'normal',
                editType: 'personToCorp'
            });
        }
        if (this.state.whatEdit === 'typeEdit') {
            this.setState({
                visible: false,
                isEditorInvoice: true,
                issueTypeValue: 'corp',
                invocieTypeValue: 'special',
                editType: 'normalToSpecial'
            });
        }
    };
    handleTypeChangeCancel = () => {
        this.setState({
            visible: false,
        });
    };
    typeChange = (e) => {
        this.setState({
            whatEdit: e.target.value === 1 ? 'titleEdit' : 'typeEdit'
        });
    };

    render() {
        return (
            <div className="app-page app-page-invoice-title">

                <InvoiceCard activeKey="/invoice/title">
                    {!this.state.isLoading && <div>
                        {this.state.invoiceSettingInf.invocieType === 'special' && this.state.isEditorInvoice === false &&
                        <div className="title-cancel-edit">发票信息已提交。点此<a
                            onClick={() => this.cancelConfirm(this)}> 修改</a></div>}

                        {(this.state.invoiceSettingInf.invocieType != 'special' && !this.state.isEditorInvoice ) &&
                        <div className="title-edit-inf">
                            <div style={{color: '#F89013'}}>发票信息，有效！</div>
                            <div><a onClick={() => {
                                this.editConfirm(this.state.invoiceSettingInf.issueType, this);
                            }}>修改发票信息？</a></div>
                        </div>}
                        <h3 className="invoice-title">
                            <span className="title-bg"></span>
                            {this.state.isEditorInvoice ? '完善发票信息' : '发票信息'}
                        </h3>
                        {/*完善发票信息*/}
                        {this.state.isEditorInvoice &&
                        <InvoiceInfForm updateConfigInvoice={this.updateConfigInvoice}
                                        issueTypeValue={this.state.issueTypeValue}
                                        invocieTypeValue={this.state.invocieTypeValue}
                                        editType={this.state.editType}
                                        saveConfirm={this.saveConfirm}
                                        invoiceSettingInf={this.state.invoiceSettingInf}/>}
                        {/*发票信息*/}
                        {!this.state.isEditorInvoice &&
                        <InvoiceShowInf invoiceSettingInf={this.state.invoiceSettingInf}/>
                        }
                        {/*修改标题还是修改类型*/}
                        <Modal title="发票类型修改"
                               visible={this.state.visible}
                               onOk={this.handleTypeChangeOk}
                               onCancel={this.handleTypeChangeCancel}
                               width={600}
                        >
                            <div style={{paddingLeft: '20px'}}>
                                <RadioGroup onChange={this.typeChange}>
                                    <Radio className="invoice-modal-radio-style"
                                           value={1}
                                           style={{fontSize: '14px'}}>发票抬头修改：公司名称填写错误</Radio>
                                    <Radio className="invoice-modal-radio-style"
                                           value={2} style={{fontSize: '14px'}}>发票类型修改：增值税普通发票修改为增值税专用发票</Radio>
                                </RadioGroup>
                                <p className="invoice-modal-tip-style"
                                   style={{paddingLeft: '22px'}}>
                                    需要保证发票抬头保持不变，同时需提交营业执照、税务登记证、一般纳税人资格证明</p>
                            </div>
                        </Modal>

                    </div>}

                </InvoiceCard>
            </div>
        );
    }
}


