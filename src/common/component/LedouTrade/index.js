import {Modal, message} from 'antd';
import * as apiLedou from '../../api/ledou';
import {RES_TYPE} from '../../config/constants';
import {redirect} from 'common/util';
export purchaseServices from './purchaseServices';

// 购买素材
export function purchaseMaterial({id, name, desc = '素材', ledou}) {
    return quickPurchase(RES_TYPE.MATERIAL, {
        ledou,
        productDesc: {
            resType: RES_TYPE.MATERIAL,
            pid: id,
            name,
            desc,
            price: ledou,
            total: 1
        }
    }, {
        itemName: '素材'
    });
}


// 购买H5模板
export function purchaseH5Tpl({id, name, desc = 'H5模板', ledou}) {
    return quickPurchase(RES_TYPE.H5_TPL, {
        ledou,
        productDesc: {
            resType: RES_TYPE.H5_TPL,
            pid: id,
            name, // H5模板名称
            desc,
            price: ledou,
            total: 1
        }
    }, {
        itemName: '模板'
    });
}

// 'h5', 'content', 'product', 'interact', 'material', 'contentTpl', 'services', 'links
// 乐豆交易 - 快捷购买
/*
 {
 "callBackPage": "string",
 "ledou": 0,
 "productDesc": {
 "desc": "string",
 "name": "string",
 "pid": "string",
 "price": 0,
 "resType": "h5",
 "total": 0
 }
 }
 */
function quickPurchase(resType, params, meta) {
    return new Promise((resolve, reject) => {
        if (params.ledou == 0 || isNaN(params.ledou)) {
            return resolve();
        }
        const {itemName} = meta;
        // 获取乐豆余额
        apiLedou.getLedouAmount().then((result) => {
            const amount = result.data;
            // 余额充足,请支付
            if (amount >= params.ledou) {
                // 购买该图标需要支付100乐豆，当前乐豆余额200个。
                Modal.confirm({
                    title: '购买' + itemName,
                    content: '购买该' + itemName + '需要支付' + params.ledou + '乐豆，当前乐豆余额' + amount + '个。',
                    okText: '确认购买',
                    onOk: () => {
                        return new Promise((resolveConfirm) => {
                            apiLedou.tradeLedou(resType, params).then(() => {
                                message.success('购买成功!');
                                resolve();
                                resolveConfirm();
                            }).catch(() => {
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

