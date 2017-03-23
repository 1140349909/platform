var _ = require('lodash');
var data = {
    name: 'linkin',
    age: 2,
    abc: {
        other: '其他'
    },
    wx: {
        info: {
            title: '标题',
            desc: '描述',
            d: {},
            f: []
        }
    },
    wb: {
        info: {
            title: '标题',
            desc: '描述'
        },
        abc: [1, 2, 3, 4, 5],
        bbb: false
    },
    wz: {},
    aa: true,
    ddd: null
};

var fields = {
    'name': 'linkin',
    'age': 2,
    'abc.other': '其他',
    'wx.info.title': '标题',
    'wx.info.desc': '描述',
    'wb.info.title': '标题',
    'wb.info.desc': '描述',
};


function tree2map(tree) {
    var map = {};
    var dig = function (path, node) {
        var k, v, cPath;
        for (k in node) {
            v = node[k];
            cPath = path.concat([k]);
            if (_.isPlainObject(v) && !_.isEmpty(v)) {
                // 对象
                dig(cPath, v);
            } else if (_.isArray(v)) {
                // 集合
                map[cPath.join('.')] = v.join(',');
            } else {
                map[cPath.join('.')] = v;
            }
        }
    }
    dig([], tree);
    return map;
}


console.log(tree2map(data));
