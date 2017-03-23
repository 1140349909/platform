import React, {Component} from 'react';
import {Button, Input} from 'antd';
import './index.less';
import Img from 'common/component/Img';
const InputGroup = Input.Group;

export default class CompanyHead extends Component {

    constructor(props) {
        super(props);
    }

    handleChange() {

    }

    render() {
        const {
            name,
            logo,
        } = this.props.data;

        return (
            <div className="company">
                    <div className="company-head">
                        <div className="company-head-logo">
                            <Img src={logo}/>
                        </div>
                        <div className="company-head-info">
                            <div className="company-head-info-tit">
                                企业名称:{name}
                            </div>
                            <div className="company-head-info-show">
                                <div>门店总数：-</div>
                                <div>员工总数：-</div>
                                <div>开展会员总数：-</div>
                                <div>开展会员总交易：-</div>
                            </div>
                        </div>
                        <div className="company-head-btns">
                            <Button className="company-head-btn" onClick={this.props.showExcitation}>设置员工激励</Button>
                            <Button className="company-head-btn" onClick={() => {this.props.showCustomer('modify');}}>修改企业信息</Button>
                            <Button className="company-head-btn" onClick={this.props.showCustomerImport}>导入客户员工</Button>
                            <Button className="company-head-btn" onClick={this.props.showStoreImport}>导入客户门店</Button>
                        </div>
                        <div className="company-searchinput">
                            <Button className="company-head-btnr" onClick={() => {this.props.showEmployee('add');}}>新增店员</Button>

                             <CompanySearchInput
                                    placeholder="input search text"
                                    style={{ width: 200 }}/>
                        </div>
                    </div>
            </div>
        );
    }
}

// 搜索
class CompanySearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            focus: false,
        };
    }


    handleInputChange(e) {
        this.setState({
            value: e.target.value,
        });
    }

    handleFocusBlur(e) {
        this.setState({
            focus: e.target === document.activeElement,
        });
    }

    handleSearch() {
        if (this.props.onSearch) {
            this.props.onSearch(this.state.value);
        }
    }

    render() {

        const {style, size, ...restProps} = this.props;

        return (
            <div className="ant-search-input-wrapper" style={style}>
                <InputGroup>
                    <Input {...restProps} value={this.state.value} onChange={this.handleInputChange.bind(this)}
                                          onFocus={this.handleFocusBlur.bind(this)}
                                          onBlur={this.handleFocusBlur.bind(this)}
                                          onPressEnter={this.handleSearch.bind(this)}/>
                    <div className="ant-input-group-wrap">
                        <Button icon="search" className="company-searchinput-btn" type="primary" size={size}
                                onClick={this.handleSearch.bind(this)}/>
                    </div>
                </InputGroup>
            </div>
        );
    }
}
