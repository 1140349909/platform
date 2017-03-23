import config from './index';

// 平台默认菜单
export const platform = [
    {
        key: 'menu-platform',
        icon: 'setting',
        name: '运营中心',
        tags: [
            {
                key: 'menu-platform-user',
                name: '平台用户管理',
                uri: '/user'
            }, {
                key: 'menu-platform-contentBulk',
                name: '资讯版式管理',
                uri: '/contentBulk'
            }, {
                key: 'menu-platform-media',
                name: '平台素材管理',
                uri: '/media'
            }, {
                key: 'menu-platform-category',
                name: '素材分类管理',
                uri: '/category'
            }, {
                key: 'menu-platform-tag',
                name: '平台标签管理',
                uri: '/tag'
            }
        ]
    }, {
        key: 'menu-supervise',
        icon: 'module',
        name: '内容监管',
        tags: [
            {
                key: 'menu-supervise-config',
                name: '活动模板',
                uri: '/supervise/list'
            }
        ]
    },
    // 财务管理
    {
        key: 'menu-finance',
        icon: 'finance',
        name: '财务管理',
        tags: [
            {
                key: 'menu-finance-withdraw',
                name: '提现审核',
                uri: '/finance/withdraw'
            }, {
                key: 'menu-finance-invoice',
                name: '发票审核',
                uri: '/finance/invoice'
            },
        ]
    },
    {
        key: 'menu-platform-customer-service',
        name: '客服帮助',
        href: '/customerService',
        tags: [
            {
                key: 'menu-common-problem',
                name: '常见问题',
                uri: '/customerService/problem'
            },
            {
                key: 'menu-user-community',
                name: '用户社区',
                uri: '/customerService/community'
            }
        ]
    },
    {
        key: 'menu-platform-notification',
        name: '通知系统',
        href: '/notification',
        tags: [
            {
                key: 'menu-notification-template',
                name: '通知模板',
                uri: '/notification/list/template'
            },
            /* {
             key: 'menu-notification-history',
             name: '通知历史',
             uri: '/notification/history'
             },*/
            /*{
             key: 'menu-notification-add-template',
             name: '添加模板',
             uri: '/notification/add/template'
             }*/
        ]
    },
    // 平台规则管理
    {
        key: 'menu-rule',
        icon: 'rule',
        name: '规则管理',
        tags: [
            {
                key: 'menu-rule-invoice',
                name: '发票规则',
                uri: '/rule/invoice'
            }, {
                key: 'menu-rule-withdraw',
                name: '提现规则',
                uri: '/rule/withdraw'
            },
        ]
    },
    // 平台产品中心
    {
        key: 'menu-module',
        icon: 'module',
        name: '产品中心',
        tags: [
            {
                key: 'menu-module-config',
                name: '产品配置',
                uri: '/module/config'
            },
            {
                key: 'menu-rule-config',
                name: '产品参数',
                uri: '/rule/config'
            }, {
                key: 'menu-module-version',
                name: '产品版本',
                uri: '/account/version'
            },
            {
                key: 'menu-module-permission',
                name: '子账号默认权限',
                uri: '/account/permission'
            }
        ]
    }, {
        key: 'menu-platform-rest',
        icon: 'rest',
        name: '接口中心',
        tags: [
            {
                key: 'menu-platform-iloka',
                name: 'iloka-rest',
                uri: config.API_ORIGIN + '/iloka/rest/'
            }, {
                key: 'menu-platform-buy',
                name: 'buy-rest',
                uri: config.API_ORIGIN + '/buy/rest/'
            }, {
                key: 'menu-platform-interact',
                name: 'interact-rest',
                uri: config.API_ORIGIN + '/interact/rest/'
            },
        ]
    }
];


// 运营中心默认菜单
export const marketing = [
    {
        key: 'menu-content',
        icon: 'neirongchuangzuo',
        name: '内容创作',
        tags: [
            {
                key: 'menu-content-tpl',
                name: '资讯图文',
                uri: '/content/tpl/hotArticle'
            },
            {
                key: 'menu-content-h5',
                name: '活动H5',
                uri: '/h5/tpl/all/platform'
            }
        ]
    },
    {
        key: 'menu-strategy',
        icon: 'yingxiaoguanli',
        name: '营销管理',
        tags: [
            {
                key: 'menu-strategy-coupon',
                name: '优惠券设置',
                uri: '/coupon'
            }, {
                key: 'menu-strategy-integral',
                name: '积分设置',
                uri: '/integral'
            },
        ]
    }, {
        key: 'menu-mall',
        icon: 'shangpinku',
        name: '商品库',
        tags: [
            {
                key: 'menu-product-add',
                name: '新增商品',
                uri: '/product/add'
            }, {
                key: 'menu-product-list',
                name: '商品管理',
                uri: '/product/list'
            }, {
                key: 'menu-mall-product',
                name: '在售商品',
                uri: '/product/sale'
            }, {
                key: 'menu-mall-trade',
                name: '交易管理',
                uri: '/trade/mall'
            }, {
                key: 'menu-mall-banner',
                name: '广告条设置',
                uri: '/banner/mall'
            }
        ]
    }, {
        key: 'menu-yyg',
        icon: 'yiyuangou',
        name: '一元购',
        tags: [
            {
                key: 'menu-yyg-product',
                name: '上架商品',
                uri: '/yyg'
            }, {
                key: 'menu-yyg-trade',
                name: '交易管理',
                uri: '/trade/yyg'
            }, {
                key: 'menu-yyg-comment',
                name: '晒单管理',
                uri: '/comment/yyg'
            }, {
                key: 'menu-yyg-banner',
                name: '广告条设置',
                uri: '/banner/yyg'
            }
        ]
    }, {
        key: 'menu-tker',
        icon: 'pinpaidaiyan',
        name: '品牌代言',
        tags: [
            {
                key: 'menu-tker-product',
                name: '代言设置',
                uri: '/tker/config'
            }, {
                key: 'menu-tker-comment',
                name: '代言会员',
                uri: '/tker/member'
            }, {
                key: 'menu-tker-trade',
                name: '代言商品',
                uri: '/tker/product'
            }, {
                key: 'menu-tker-withdraw',
                name: '提现管理',
                uri: '/withdraw'
            }
        ]
    }, {
        key: 'menu-member',
        icon: 'huiyuanzhongxin',
        name: '会员中心',
        tags: [
            {
                key: 'menu-member-member',
                name: '会员详情',
                uri: '/member'
            }, {
                key: 'menu-member-card',
                name: '会员卡',
                uri: '/card'
            }
        ]
    }, {
        key: 'menu-settlement',
        icon: 'jiesuan',
        name: '结算中心',
        tags: [
            {
                key: 'menu-settlement-charge',
                name: '账户充值',
                uri: '/charge/list'
            },
            {
                key: 'menu-settlement-summary',
                name: '收益提现',
                uri: '/profit/summary'
            },
            {
                key: 'menu-settlement-setting',
                name: '提现设置',
                uri: '/profit/setting'
            },
            {
                key: 'menu-settlement-invoice',
                name: '发票管理',
                uri: '/invoice/add'
            }
        ]
    }, {
        key: 'menu-user',
        icon: 'geren',
        name: '账号中心',
        tags: [
            {
                key: 'menu-user-info',
                name: '个人信息',
                uri: '/user/info'
            },
            /* {
             key: 'menu-user-secure',
             name: '安全设置',
             uri: '/user/secure'
             },*/
            {
                key: 'menu-user-upgrade',
                name: '账号升级',
                uri: '/user/upgrade'
            },
            {
                key: 'menu-user-notifications',
                name: '重要通知',
                uri: '/notifications'
            }
        ]
    }, {
        key: 'menu-basic',
        icon: 'pingtaishezhi',
        name: '平台设置',
        tags: [
            {
                key: 'menu-strategy-site',
                name: '微站设置',
                // uri: '/content/iloka/site'
                uri: '/content/site'
            }, {
                key: 'menu-strategy-channel',
                name: '发布授权',
                uri: '/channel'
            },
            {
                key: 'menu-admin',
                name: '账号管理',
                uri: '/admin'
            }, {
                key: 'menu-payway',
                name: '交易设置',
                uri: '/payway'
            }, {
                key: 'menu-basic-setting',
                name: '基础设置',
                uri: '/setting'
            },

            /*{
             key: 'menu-basic-auth',
             name: '功能开通',
             uri: '/permission'
             },*/

        ]
    }, {
        key: 'menu-help',
        icon: 'bangzhuzhongxin',
        name: '帮助中心',
        tags: [
            {
                key: 'menu-help-problems',
                name: '常见问题',
                uri: '/help/problems/iloka'
            },
            {
                key: 'menu-help-community',
                name: '用户社区',
                uri: '/help/community'
            }
        ]
    }
];
