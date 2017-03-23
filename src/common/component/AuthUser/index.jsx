/**
 * Created by Asoiso on 2016/12/14.
 */
import AuthComponentBase from '../../base/AuthComponentBase';

// 登录功能的显示控制
export default class AuthUser extends AuthComponentBase {
    render() {
        if (this.checkLogin()) {
            return this.props.children;
        } else {
            return null;
        }
    }
}
