import React from 'react';
import PageBase from 'common/base/PageBase';
import ProfitAccount from './component/ProfitAccount';
import ProfitBudget from './component/ProfitBudget';
import  './summary.less';

export default class Summary extends PageBase {
    constructor(props) {
        super(props);
    }

    // 真实的DOM被渲染出来后调用。
    componentDidMount() {}
    render() {

        return (
            <div className="app-page app-page-profit-summary">
                <ProfitAccount/>
                <ProfitBudget className="profit-summary-budget"/>
            </div>
        );


    }
}


