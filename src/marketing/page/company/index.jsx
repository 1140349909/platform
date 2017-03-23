import React from 'react';
import PageBase from 'common/base/PageBase';
import {Card,message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as customerAction from '../../store/customer/action';
import CompanyHead from './component/CompanyHead';
import CompanyList from './component/CompanyList';
import CompanyExtra from './component/CompanyExtra';
import {
    CompanyFormCustomer,
    CompanyFormEmployee,
    CompanyFormCustomerImport,
    CompanyFormStoreImport,
    CompanyFormExcitation
} from './component/CompanyShowForm';

@connect(
    state => ({
        customer: state.customer.toJS(),
        operation: state.operation,
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...customerAction,
        }, dispatch)
    })
)
export default class CompanyIndex extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        id: '',
        customerList: '',
        employeeList: '',
        currentData: '',
        currentEmployeeData: '',
        currentImport: '',
        excitationData: '',
        type: 'init',
    };

    componentDidMount(){
        this.props.actions.getAdminCustomer();
    }

    // 异步请求回调
    // 根据返回的nextProps.product.status处理回调
    componentWillReceiveProps(nextProps) {

        const { operation } = nextProps;

        switch (operation.type) {

            // 获取登录客户信息
            case customerAction.GET_ADMIN_CUSTOMER_SUCCESS:
                this.setState({
                    id: nextProps.customer.customerInfo.id
                });
                this.customerList(nextProps.customer.customerInfo.id);
                break;

            // 获取客户列表
            case customerAction.GET_ADMIN_CUSTOMER_LIST_SUCCESS:
                if (nextProps.customer.customerList.content.length > 0) {
                    this.setState({
                        currentData: nextProps.customer.customerList.content[0],
                    });

                    this.employeeList(nextProps.customer.customerList.content[0].id);
                }
                this.setState({
                    customerList: nextProps.customer.customerList,
                });
                break;

            // 新添客户
            case customerAction.ADD_ADMIN_CUSTOMER_PARTNER_SUCCESS:
                this.customerList();
                break;

            // 更新客户
            case customerAction.UPDATE_ADMIN_CUSTOMER_PARTNER_SUCCESS:
                this.customerList();
                break;

            // 获取员工列表
            case customerAction.GET_ADMIN_EMPLOYEE_LIST_SUCCESS:
                this.setState({
                    employeeList: nextProps.customer.employeeList,
                });
                break;

            // 新增员工
            case customerAction.ADD_ADMIN_EMPLOYEE_SUCCESS:
                this.reset();
                this.employeeList();
                break;

            // 修改员工
            case customerAction.UPDATE_ADMIN_EMPLOYEE_SUCCESS:
                this.reset();
                this.employeeList();
                break;

            // 修改员工状态
            case customerAction.UPDATE_ADMIN_EMPLOYEE_STATUS_SUCCESS:
                this.employeeList();
                break;

            // 获取激励
            case customerAction.GET_ADMIN_EMPLOYEE_EXCITATION_SUCCESS:
                this.setState({
                    excitationData: nextProps.customer.excitation.content,
                });
                break;

            // 设置激励
            case customerAction.UPDATE_ADMIN_EMPLOYEE_EXCITATION_SUCCESS:
                message.success('保存成功');
                break;

        }
    }

    // 获取对应客户列表
    customerList = (partnerId = this.state.id) => {
        this.props.actions.getAdminCustomerList({
            partnerId,
        });
    };

    // 获取对应员工列表
    employeeList = (customerId = this.state.currentData.id, page, size) => {
        this.props.actions.getAdminEmployeeList({
            customerId,
            page,
            size,
            name,
        });
    };

    // 重置type
    reset = () => {
        this.setState({
            type: 'init'
        });
    };

    // 切换当前合作客户
    currentCustomer = (id) => {
        this.state.customerList.content.map((item) => {

            if (item.id == id) {
                this.setState({
                    currentData: item
                });

                this.employeeList(item.id);
            }
            return false;
        });
    };

    // 显示客户信息表单
    showCustomer = (type) => {
        this.setState({
            type: 'showCustomer',
            currentData: Object.assign(this.state.currentData, {type: type})
        });
    };

    // 显示员工信息表单
    showEmployee = (para) => {
        this.setState({
            type: 'showEmployee',
            currentEmployeeData: para,
        });
    };

    // 显示导入客户员工文件
    showCustomerImport = (data) => {
        this.setState({
            type: 'showCustomerImport',
            currentImport: data,
        });
    };

    // 显示导入客户门店文件
    showStoreImport = (data) => {
        this.setState({
            type: 'showStoreImport',
            currentImport: data,
        });
    };

    // 显示员工激励
    showExcitation = () => {
        this.props.actions.getEmployeeExcitation();
        this.setState({
            type: 'showExcitation',
        });
    };

    // 设置员工激励
    doExcitation = (data) => {
        this.props.actions.updateEmployeeExcitation(data);
    };

    // 新增/修改客户合作伙伴
    doCustomer = (para) => {
        if (para.id == '') {
            this.props.actions.addAdminCustomerPartner(this.state.id, para);
        } else {
            this.props.actions.updateAdminCustomerPartner(para);

        }
        this.reset();
    };

    // 新增/修改员工
    doEmployee = (para) => {
        if (para.id == '') {
            this.props.actions.addAdminEmployee(Object.assign(para, {customerId: this.state.currentData.id}));
        } else {
            this.props.actions.updateAdminEmployee(para);
        }
    };

    // 修改员工状态
    doEmployeeState = (obj) => {
        this.props.actions.updateAdminEmployeeStatus(obj);
    };

    render() {
        const { operation } = this.props;
        const isListLoading = operation.type == customerAction.GET_ADMIN_CUSTOMER_LIST_PENDING;

        const currentData = this.state.currentData || '';
        const customerList = this.state.customerList;
        const employeeList = this.state.employeeList;

        if (customerList) {
            return (
                <div className="app-page">
                    <Card
                        title="线下渠道"
                        extra={
                            <CompanyExtra
                                reset={this.reset}
                                data={customerList}
                                currentCustomer={this.currentCustomer}
                                showCustomer={this.showCustomer}/>}>

                        { customerList.length > 0 &&
                        <CompanyHead
                            data={currentData}
                            reset={this.reset}
                            showCustomer={this.showCustomer}
                            showEmployee={this.showEmployee}
                            showCustomerImport={this.showCustomerImport}
                            showStoreImport={this.showStoreImport}
                            showExcitation={this.showExcitation}/>
                        }

                        <CompanyList
                            loading={isListLoading}
                            reset={this.reset}
                            doEmployeeState={this.doEmployeeState}
                            showEmployee={this.showEmployee}
                            employeeList={this.employeeList}
                            data={employeeList}/>
                    </Card>
                    <CompanyFormCustomer
                        type={this.state.type}
                        reset={this.reset}
                        data={this.state.currentData}
                        doCustomer={this.doCustomer}/>

                    <CompanyFormEmployee
                        data={this.state.currentEmployeeData}
                        type={this.state.type}
                        reset={this.reset}
                        doEmployee={this.doEmployee}/>

                    <CompanyFormCustomerImport
                        id={currentData.id}
                        type={this.state.type}
                        reset={this.reset}/>

                    <CompanyFormStoreImport
                        id={currentData.id}
                        reset={this.reset}
                        type={this.state.type}/>

                    <CompanyFormExcitation
                        data={this.state.excitationData || ''}
                        type={this.state.type}
                        reset={this.reset}
                        doExcitation={this.doExcitation}/>
                </div>
            );

        } else {
            return null;
        }
    }
}
