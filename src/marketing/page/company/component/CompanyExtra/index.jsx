import React, {Component} from 'react';
import {Select, Button} from 'antd';
import './index.less';
const Option = Select.Option;


export default class CompanyExtra extends Component {

    constructor(props) {
        super(props);
    }

    handleChange = (val) => {
        this.props.currentCustomer(val);
    }

    render() {

        let eles = [];

        const data = this.props.data.content;

        data.map((item, index) => {
            eles.push(<Option key={index} value={item.id}>{item.name}</Option>);
        });

        return (
            <div className="company-extra">
                <Select
                    className="productmanagement-select"
                    onChange={this.handleChange}
                    defaultValue={data.length > 0 ? data[0].id: ''}>
                    {eles}
                </Select>
                <Button onClick={() => {
                    this.props.showCustomer('add');
                }}>新增合作客户</Button>
            </div>
        );
    }
}
