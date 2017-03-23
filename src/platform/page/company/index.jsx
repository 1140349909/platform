import React from 'react';
import PageBase from 'common/base/PageBase';
import {Card} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SearchInput from 'common/component/SearchInput';
import * as companyAction from '../../store/company/action';
import CompanyList from './component/CompanyList';
import CompanyShow from './component/CompanyShow';
import CompanyForm from './component/CompanyForm';

@connect(
    state => ({
        company: state.company.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...companyAction
        }, dispatch)
    })
)
export default class CompanyIndex extends PageBase {

    constructor(props) {
        super(props);

    }

    state = {
        viewType: 'list',
        viewParam: null,
        viewData: null
    };

    componentDidMount() {
        this.list(0);
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;

        switch (operation.type) {
            case companyAction.UPDATE_PLATFORM_CUSTOMER_STATUS_SUCCESS:
            case companyAction.UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS:
                this.list(0);
                this.reset();
                break;
            case companyAction.GET_PLATFORM_CUSTOMER_SUCCESS:
                this.setState({
                    viewData: nextProps.company.item
                });
                break;
            case companyAction.GET_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS:
                this.setState({
                    viewData: nextProps.company.mallAuth
                });
                break;
        }

    }

    showForm = (id) => {
        this.showView('form', id);
        this.props.actions.getPlatformCustomer(id);
    };

    showModal = (id) => {
        this.showView('show', id);
        this.props.actions.getPlatformCustomerMallAuth(id);
    };

    list = (page, size)=> {
        this.props.actions.getPlatformCustomers({
            type: 'MALL',
            name: this.state.name,
            page,
            size
        });
    };

    approve = (id, data)=> {
        this.props.actions.updatePlatformCustomerStatus(id, data);
    };

    mallAuth = (id, data) => {
        this.props.actions.updatePlatformCustomerMallAuth(id, data);
    };

    // 搜索企业
    handleSearch = (name) => {
        this.setState({
            name: name
        }, ()=> {
            this.list(0);
        });
    };

    render() {

        const {operation} = this.props;

        const extra = (
            <SearchInput placeholder="请输入企业名称进行查询" onSearch={this.handleSearch} style={{width: 200}}/>
        );


        // 是否显示loading
        const isListLoading = operation.type == companyAction.GET_PLATFORM_CUSTOMERS_PENDING;

        // 是否显示form
        const isShowForm = this.isShowView('form');

        // 是否显示show
        const isShowShow = this.isShowView('show');

        return (
            <div className="app-page">
                <Card title="企业列表" extra={extra}>
                    <CompanyList data={this.props.company.list.content}
                                 total={this.props.company.list.totalElements}
                                 showForm={this.showForm}
                                 showModal={this.showModal}
                                 loading={isListLoading}
                                 list={this.list}/>
                </Card>
                {isShowForm &&
                <CompanyForm approve={this.approve}
                             reset={this.reset}
                             visible={isShowForm}
                             data={this.state.viewData}/>
                }
                {isShowShow &&
                <CompanyShow mallAuth={this.mallAuth}
                             reset={this.reset}
                             visible={isShowShow}
                             data={this.state.viewData}/>
                }
            </div>
        );
    }
}
