import confg from 'common/config';
import {moneyFormat} from './index';

// 通过人民币获取对应的乐豆数量
export function getLedou(money) {
    return moneyFormat(money) * confg.LEDOU_PROPORTION;
}
