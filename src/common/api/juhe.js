import http from '../http';
import config from '../config';

//获取聚合数据
export function getJuheList({
    type = 'top',
    key = '729adcc6f16165cce64241e5af804f6f'
}) {
    return http.get('http://v.juhe.cn/toutiao/index', {
        type,
        key
    });
}

// 获取聚合数据：历史上的今天
// 版本不同，返回的数据不同

// 1.0
/*"result":[
 {
 "_id":"18141001",
 "title":"反法联盟各参加国在奥地利首都维也纳召开会议",
 "pic":"http://juheimg.oss-cn-hangzhou.aliyuncs.com/toh/201110/2/1F81726127.jpg",
 "year":1814,
 "month":10,
 "day":1,
 "des":"在203年前的今天，1814年10月1日 (农历八月十八)，反法联盟各参加国在奥地利首都维也纳召开会议。",
 "lunar":"甲戌年八月十八"
 },]*/

// 2.0
/*"result":[
 {
 "day":"10\/1",
 "date":"1814年10月01日",
 "title":"反法联盟各参加国在奥地利首都维也纳召开会议",
 "e_id":"11177"
 },]*/

export function getJuheHistoryTodayList({
    month = new Date().getMonth() + 1,
    day = new Date().getDate(),
    key = '6e9554001f77067e8a87a468bc81e343',
    v = '1.0',
}) {
    return http.get(config.BS_ORIGIN + '/api/juhe/toh', {
        month,
        day,
        key,
        v,
    }, {
        headers: {
            'Accept': '*/*',
        }
    });
}

// 获取聚合数据：历史上的今天
// 版本不同，返回的数据不同 //获取历史上的今天的详情内容

export function getJuheHistoryDetail(id, v = '1.0', key = '6e9554001f77067e8a87a468bc81e343') {
    return http.get(config.BS_ORIGIN + '/api/juhe/tohdet', {
        id,
        v,
        key
    }, {
        headers: {
            'Accept': '*/*',
        }
    });
}
