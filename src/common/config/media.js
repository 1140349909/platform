import config from './index';

// 删除图片ID
let MEDIA_DEL_ID;

switch (config.ENV) {
    default:
        MEDIA_DEL_ID = '58734a2d0f93d50845cbba24';
        break;

    case 'sit':
        MEDIA_DEL_ID = '58734a2d0f93d50845cbba24';
        break;

    case 'uat':
        MEDIA_DEL_ID = '58734a2d0f93d50845cbba24';
        break;

    case 'prd':
        MEDIA_DEL_ID = '587086aaa6dc364107b18d2b';
        break;
}

// 删除图片ID
export default {
    MEDIA_DEL_ID
};