/**
 * Created by Asoiso on 16/8/18.
 */
import _ from 'lodash';
// 常量库
export const PROMISE_TYPE_SUFFIX = {
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE'
};

// 角色等级
export const ROLE = {
    // 游客
    VISITOR: 0,
    // 会员
    MEMBER: 10,
    // 用户
    USER: 20,
    // 运营
    MANAGER: 30,
    // 管理
    ADMIN: 40,
    // 运维
    PLATFORM: 100
};

export const ROLE_NAME = {
    // 游客
    VISITOR: '游客',
    // 会员
    MEMBER: '会员',
    // 用户
    USER: '用户',
    // 运营
    MANAGER: '运营人员',
    // 管理
    ADMIN: '管理员',
    // 运维
    PLATFORM: '运维人员'
};


export function getRole(roles) {

    if (_.isEmpty(roles)) {
        return ROLE_NAME.VISITOR;
    }

    if (roles.indexOf('PLATFORM') != -1) {
        return ROLE_NAME.PLATFORM;
    }

    if (roles.indexOf('ADMIN') != -1) {
        return ROLE_NAME.ADMIN;
    }

    if (roles.indexOf('MANAGER') != -1) {
        return ROLE_NAME.MANAGER;
    }

    if (roles.indexOf('USER') != -1) {
        return ROLE_NAME.USER;
    }

    if (roles.indexOf('MEMBER') != -1) {
        return ROLE_NAME.MEMBER;
    }
}
// 入口code
export const ENTRY_CODE = {
    // 主页
    HOME: 'home',
    // 一元购
    YYG: 'yyg',
    // 商城
    MALL: 'mall',
    // 资讯
    CONTENT: 'content',
    // 会员中心
    MEMBER: 'member',
    // 自定义
    CUSTOMIZE: 'customize'
};

// 资源类型
export const RES_TYPE = {
    H5: 'h5',
    CONTENT: 'content',
    PRODUCT: 'product',
    INTERACT: 'interact',
    LINKS: 'links',
    MATERIAL: 'material',
    H5_TPL: 'h5Tpl',
    CONTENT_TPL: 'contentTpl',
    SERVICES: 'services'
};

// 资讯块类型
export const BULK_TYPE = {
    BT: 'bt',
    ZW: 'zw',
    TW: 'tw',
    GZ: 'gz',
    QR: 'qr',
    FGF: 'fgf'
};
export const OWNER = {
    ANONYM: 'anonym',
    WECHAT: 'wechat',
    USERS: 'users',
    BIZ: 'biz',
    V: 'v',
    PLATFORM: 'platform'
};


// 媒体资源类型
export const MEDIA_RES_TYPE = {
    RES: 'res',
    FACE: 'face',
    TKER: 'tker',
    HEADIMG: 'headimg',
    COVER: 'cover',
    SHARE: 'share',
    SHOW: 'show',
    VCARD: 'vcard',
    BG: 'bg',
    SHAPE: 'shape',
    BANNER: 'banner',
    REDENVELOPE: 'redenvelope',
    COUPON: 'coupon',
    INTEGRAL: 'integral',
    DISTRIBUTE: 'distribute',
    FEEDBACK: 'feedback',
    FONT: 'font',
    RESUME: 'resume',
    MATERIAL: 'material'
};

// 媒体Mine类型
export const MEDIA_MIME_TYPE = {
    IMAGE: 'image',
    AUDIO: 'audio'
};

// 平台类型
export const PLATFORM_TYPE = {
    CMS: 'cms',
    VVESHOW: 'vveshow',
    ILOKA: 'iloka',
    PROJECTS: 'projects',
    INTERACT: 'interact',
    BUY: 'buy',
    PLATFORM: 'platform'
};

// 标签类型
export const TAG_TYPE = {
    APP: 'app',
    TPL: 'h5Tpl',
    MATERIAL: 'material'
};

// TODO:[待优化] 模板类型
export const NOTIFICATION_TEMPLATE = {
    items: [
        {label: '修改手机号【艾乐卡营销管家】', value: 'SECURITY_MODIFY_MOBILE_1'},
        {label: '手机号修改成功【艾乐卡营销管家】', value: 'SECURITY_MODIFY_MOBILE_3'},
        {label: 'hr新建简历通知面试官', value: 'RESUME_INTERVIEW_NEW_NOTICE'},
        {label: 'hr修改简历通知面试官', value: 'RESUME_INTERVIEW_UPDATE_NOTICE'},
    ]
};
// TODO:[待优化,位置放得不对] 获取模板label描述
export function getNotificationLabel(mark) {
    NOTIFICATION_TEMPLATE.items.map((item) => {
        if (mark == item.value) {
            return item.label;
        }
    });
}

// 模块状态
export const MODULE_STATUS = {
    // 可见可用
    VISIBLE_ENABLE: 'visible_enable',
    // 可见不可用
    VISIBLE_DISABLED: 'visible_disabled',
    // 不可用
    HIDDEN: 'hidden'
};


// 权益单位
export const RIGHT_UNIT = {
    day: '天',
    week: '周',
    month: '月',
    year: '年',
    sheet: '张',
    times: '次',
    t_times: '千次',
    y_t_times: '千次/年',
    discount: '折',
    individual: '个',
    y_t_article: '千篇/年',
    nounit: '无'
};

// 今日头条文章分类
export const TOUTIAO_LIST = [
    {
        Article_tag: '',
        text: '新闻',
        value: 'news'
    }, {
        Article_tag: 1,
        text: '社会',
        value: 'news_society'
    }, {
        Article_tag: 2,
        text: '娱乐',
        value: 'news_entertainment'
    }, {
        Article_tag: 3,
        text: '电影',
        value: 'movie'
    }, {
        Article_tag: 4,
        text: '科技',
        value: 'news_tech'
    }, {
        Article_tag: 5,
        text: '数码',
        value: 'digital'
    }, {
        Article_tag: 6,
        text: '汽车',
        value: 'news_car'
    }, {
        Article_tag: 7,
        text: '体育',
        value: 'news_sports'
    }, {
        Article_tag: 8,
        text: '财经',
        value: 'news_finance'
    }, {
        Article_tag: 9,
        text: '军事',
        value: 'news_military'
    }, {
        Article_tag: 10,
        text: '国际',
        value: 'news_world'
    }, {
        Article_tag: 11,
        text: '时尚',
        value: 'news_fashion'
    }, {
        Article_tag: 12,
        text: '奇葩',
        value: 'marvel'
    }, {
        Article_tag: 13,
        text: '游戏',
        value: 'news_game'
    }, {
        Article_tag: 14,
        text: '旅游',
        value: 'news_travel'
    }, {
        Article_tag: 15,
        text: '育儿',
        value: 'news_baby'
    }, {
        Article_tag: 16,
        text: '瘦身',
        value: 'fitness'
    }, {
        Article_tag: 17,
        text: '养生',
        value: 'news_regimen'
    }, {
        Article_tag: 18,
        text: '美食',
        value: 'news_food'
    }, {
        Article_tag: 19,
        text: '历史',
        value: 'news_history'
    }, {
        Article_tag: 20,
        text: '探索',
        value: 'news_discovery'
    }, {
        Article_tag: 21,
        text: '故事',
        value: 'news_story'
    }, {
        Article_tag: 22,
        text: '美文',
        value: 'news_essay'
    }, {
        Article_tag: 23,
        text: '情感',
        value: 'emotion'
    }, {
        Article_tag: 24,
        text: '健康',
        value: 'news_health'
    }, {
        Article_tag: 25,
        text: '教育',
        value: 'news_edu'
    }, {
        Article_tag: 26,
        text: '家居',
        value: 'news_home'
    }, {
        Article_tag: 27,
        text: '房产',
        value: 'news_house'
    }, {
        Article_tag: 28,
        text: '搞笑',
        value: 'funny'
    }, {
        Article_tag: 29,
        text: '星座',
        value: 'news_astrology'
    }, {
        Article_tag: 30,
        text: '文化',
        value: 'news_culture'
    }, {
        Article_tag: 31,
        text: '宠物',
        value: 'news_pet'
    }, {
        Article_tag: 32,
        text: '法制',
        value: 'news_law'
    }, {
        Article_tag: 33,
        text: '职场',
        value: 'news_career'
    }, {
        Article_tag: 34,
        text: '漫画',
        value: 'comic'
    }, {
        Article_tag: 35,
        text: '动漫',
        value: 'news_comic'
    }, {
        Article_tag: 36,
        text: '科学',
        value: 'science_all'
    }, {
        Article_tag: 37,
        text: '设计',
        value: 'news_design'
    }, {
        Article_tag: 38,
        text: '摄影',
        value: 'news_photography'
    }, {
        Article_tag: 39,
        text: '收藏',
        value: 'news_collect'
    }, {
        Article_tag: 40,
        text: '三农',
        value: 'news_agriculture'
    }, {
        Article_tag: 41,
        text: '心理',
        value: 'news_psychology'
    },
];

export const TEMPLATE = {
    HOTARTICLE: 'hotArticle',
    DEPTHVIEW: 'depthView'
};

// 审核状态
export const AUDIT_STATUS = {
    // 待审核
    S11: 's11',
    // 待定价
    S26: 's26',
    // 审核未通过
    S29: 's29',
    // 待上架
    S36: 's36',
    // 已上架
    S46: 's46',
    // 已下架
    S49: 's49',
};

export const AUDIT_TEXT = {
    's11': '待审核',
    's26': '待定价',
    's36': '待上架',
    's46': '已上架',
    's49': '已下架',
    's29': '未通过',
    's21': '修改基本属性',
    's31': '修改价格'
};
