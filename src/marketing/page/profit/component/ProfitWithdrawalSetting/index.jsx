import React from 'react';
import ComponentBase from 'common/base/PageBase';
import {Card, message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';
import Tooltip from 'common/component/Tooltip';
import * as ledouConfigActions from '../../../../store/ledouConfig/action';
import List from './List';
import ShowForm from './ShowForm';
import {withRouter} from 'react-router';
import './index.less';

@connect(
    state => ({
        operation: state.operation,
        configAccount: state.ledouConfig.toJS().configAccount,
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...ledouConfigActions
        }, dispatch)
    })
)

@withRouter

class ProfitWithdrawalSetting extends ComponentBase {

    constructor(props) {
        super(props);
    }

    state = {
        showType: null,
        viewParam: null,
        viewData: null
    };

    // 真实的DOM被渲染出来后调用。
    componentDidMount() {
        this.props.actions.getConfigAccountWithdraw();
    }

    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        switch (operation.type) {
            // 设置结算账号
            case ledouConfigActions.UPDATE_CONFIG_ACCOUNT_WITHDRAW_SUCCESS:
                message.success('设置成功!');
                this.props.actions.getConfigAccountWithdraw();
                break;

            case ledouConfigActions.UPDATE_CONFIG_ACCOUNT_WITHDRAW_FAILURE:
                message.error('设置失败,请重试');
                break;
        }
    }

    _handelListClick = (item) => {
        this.showView('setting', null, item);
    };

    _handelFormOk = (data) => {
        this.props.actions.updateConfigAccountWithdraw(data);
        this.reset();
    };

    render() {
        const {className, configAccount} = this.props;

        const classString = classnames({
            [className]: true,
            ['profit-account']: true,
        });

        const title = (
            <h3 className="ant-card-head-title">
            提现方式设置
                <Tooltip type="profit-setting"></Tooltip>
            </h3>
        );

        const isShowSetting = this.isShowView('setting');

        return (
            <div className={classString}>
                <Card title={title}>
                    <List
                        onClick={this._handelListClick}
                        data={configAccount}/>
                </Card>
                {isShowSetting &&
                    <ShowForm
                        onOk={this._handelFormOk}
                        reset={this.reset}
                        data={this.state.viewData}/>
                }
            </div>

        );
    }
}

ProfitWithdrawalSetting.defaultProps = {
    className: '',
};

export default ProfitWithdrawalSetting;
