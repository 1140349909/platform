/**
 * Created by Asoiso on 16/9/19.
 */

var urlTemplate = require('url-template');
// var emailUrl = urlTemplate.parse('/{email}/{folder}/{id}');
//
// // Returns '/user@domain/test/42'
// emailUrl.expand({
//     email: 'user@domain',
//     folder: 'test',
//     id: 42
// });

function compile(url, params) {
    return {
        url: url,
        params: params
    };
}

function compile2(url, params) {


    var variables = [], url = urlTemplate.expand(url, params, variables);

    variables.forEach((key) => {
        delete params[key];
    });

    return url;
}


var params = {
    version: 'v1',
    client: 'w2',
    channel: 'linkin',
    page: 1,
    size: 2
};
var text = urlTemplate.parse('/api/{version}/{client}/{channel}/user/info');
console.log(text.expand(params), params);



