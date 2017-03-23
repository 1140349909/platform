import  React from 'react';
import {Modal, message} from 'antd';
import * as apiLedou from '../../api/ledou';
import {RES_TYPE} from '../../config/constants';
import {redirect} from 'common/util';
import {getIlokaContentUrl} from 'common/util/url';
import './purchaseTpl.less';

// 购买H5模板
export function purchaseH5TplPreview({id, appId, name, desc = 'H5模板', ledou, coverMediaId}) {
    return quickPurchase(RES_TYPE.H5_TPL, {
        ledou,
        productDesc: {
            resType: RES_TYPE.H5_TPL,
            pid: id,
            appId,
            name,// H5模板名称
            desc,
            price: ledou,
            total: 1,
        },
    }, {
        itemName: '模板'
    }, coverMediaId);
}

function quickPurchase(resType, params, meta) {
    return new Promise((resolve, reject) => {
        if (params.ledou == 0 || isNaN(params.ledou)) {
            return resolve();
        }
        const {itemName} = meta;
        let previewUrl = getIlokaContentUrl(params.productDesc.pid, 'previewTpl');
        // 获取乐豆余额
        apiLedou.getLedouAmount().then((result) => {
            const amount = result.data;
            //余额充足,请支付
            if (amount >= params.ledou) {
                // 购买该图标需要支付100乐豆，当前乐豆余额200个。
                let _previewHtml = <div className='purchaseTplModal'>
                    <iframe src={previewUrl}
                            frameBorder="0"
                            style={{
                                'display': 'block',
                                'padding': '15px',
                                'marginTop': '30px',
                                'width': '252px',
                                'height': '382px'
                            }}></iframe>
                    <p className='desc'>需要支付
                        <span className='amount'>{params.ledou}</span>乐豆，当前乐豆余额
                        <span className='amount'>{amount}</span>
                    </p>
                </div>;
                Modal.confirm({
                    title: '购买' + itemName,
                    content: _previewHtml,
                    okText: '确认购买',
                    onOk: () => {
                        return new Promise((resolveConfirm) => {
                            apiLedou.tradeLedou(resType, params)
                                .then(() => {
                                    message.success('购买成功!');
                                    resolve();
                                    resolveConfirm();
                                })
                                .catch(() => {
                                    message.error('购买失败!');
                                    reject();
                                    resolveConfirm();
                                });
                        });
                    }
                });
            }

            // 余额不足,请充值
            if (amount < params.ledou) {
                Modal.confirm({
                    title: '购买' + itemName,
                    content: '你的乐豆余额不足，请充值',
                    okText: '马上充值',
                    onOk: () => {

                        setTimeout(() => {
                            redirect('/marketing.html#/charge/payment/ledou', '_blank', () => {
                                message.success('充值成功!');
                            });
                        }, 400);
                    }
                });
            }

        });
    });
}

