/**
 * Created by Asoiso on 2016/12/14.
 */
import AuthComponentBase from '../../base/AuthComponentBase';

// 角色功能的显示控制,status == MODULE_STATUS.HIDDEN,则不显示
export default class AuthPermission extends AuthComponentBase {
    render() {
        const {type, children} = this.props;

        if (this.checkPermission(type)) {
            return children;
        } else {
            return null;
        }
    }
}
