import _ from 'lodash';
import AuthComponentBase from './AuthComponentBase';
const PAGE_CLASS_NAME_REG = /app-page-(\w|-)*/g;

// 页面基类
export default class PageBase extends AuthComponentBase {

    constructor(props) {
        super(props);
        this.resetPageClassName();
    }

    setPageClassName(pageClassName) {
        this.resetPageClassName();
        document.body.className = _.trim(document.body.className + ' app-page-' + pageClassName);
    }

    resetPageClassName() {
        document.body.className = _.trim(document.body.className.replace(PAGE_CLASS_NAME_REG, ' '));
    }
}
