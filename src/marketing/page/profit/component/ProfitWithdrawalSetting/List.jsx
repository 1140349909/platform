import React from 'react';
import classnames from 'classnames';
import {Button} from 'antd';
import IconFont from 'common/component/IconFont';
import AuthComponentBase from 'common/base/AuthComponentBase';
import * as module from 'common/config/module';
import _ from 'lodash';
import AuthModule from 'common/component/AuthModule';
import './index.less';

class List extends AuthComponentBase {

    constructor(props) {
        super(props);
    }

    state = {};

    _handelClick = (key) => {
        this.props.onClick && this.props.onClick(key);
    }

    render() {
        const {className, iconClassName, data} = this.props;

        let list = [];

        const classString = classnames({
            [className]: true,
            ['profit-setting-list']: true,
        });

        const iconClassString = classnames({
            ['profit-setting-list-i']: true,
            [iconClassName]: true,
        });

        _.mapKeys(data, (item, key) => {

            const isEmpty = !item.name || !item.account;

            let typeName,
                icon;

            switch (key) {
                case 'aliPay':
                    typeName = '支付宝';
                    icon ='zhifubao1';
                    break;
                case 'weChat':
                    typeName = '微信';
                    icon ='weixin1';
            }

            let _html = (
                <div key={key} className='profit-setting-list-item'>
                    <div className='profit-setting-list-icon'>
                        <IconFont type={icon} className={iconClassString}/>
                    </div>
                    <div className='profit-setting-list-section'>
                        <p className="profit-setting-list-title">
                            {!isEmpty &&
                            <span>
                                    {`您设置的${typeName}账号为: ${item.account}`}
                                </span>
                            }
                            {isEmpty &&
                            <span>
                                    暂未设置
                                </span>
                            }
                        </p>
                        <p className="profit-setting-list-text">
                            {`您可以利用该${typeName}账号进行提现服务。`}
                        </p>
                    </div>
                    <div className='profit-setting-list-btns'>
                        <AuthModule type={module.PAYMENT_SETTING_SETTING}>
                            <Button className="profit-setting-list-btn"
                                    type="primary"
                                    size="large"
                                    onClick={() => {
                                        this.anyWhereModule(module.PAYMENT_SETTING_SETTING).then(()=> this._handelClick(item));
                                    }}>
                                {isEmpty ? '立即设置' : '重新设置'}
                            </Button>
                        </AuthModule>
                    </div>
                </div>
            );
            list.push(_html);
        });

        return (
            <div className={classString}>
                {list}
            </div>
        );
    }
}

List.defaultProps = {
    className: '',

    // icon的className
    iconClassName: '',

    // icon类型
    icon: 'zhifubao1',
};

export default List;
