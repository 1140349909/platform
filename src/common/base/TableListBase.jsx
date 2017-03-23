import ComponentBase from './ComponentBase';
import _ from 'lodash';
import {dateFormat} from 'common/util';

// 列表组件基类
export default class ListBase extends ComponentBase {

    // static defaultProps = {
    //
    // };

    constructor(props) {
        super(props);
    }

    // 列表加载
    onList = (params)=> {
        const {onList} = this.props;
        if (_.isFunction(onList)) {
            onList(params);
        }
    }

    // 获取分页配置
    getPagination() {
        const {size, totalElements} =  this.props.data;
        return {
            pageSize: size,
            total: totalElements,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
            onShowSizeChange: (page, size)=> {
                this.onList({
                    page: page - 1,
                    size
                });
            },
            onChange: (page)=> {
                this.onList({
                    page: page - 1
                });
            }
        };
    }

    // 获取table列宽
    getTableColumnWidth = (size)=> {
        return 20 + 12 * size;
    }

    // 获取table总列宽
    getTableColumnsX = (columns)=> {
        let x = 0;
        columns.map(column=> {
            if (!isNaN(column.width)) {
                x += column.width;
            }
        });
        return x;
    }

    // 转换树结构 tree源数据,fields需要转换的字段
    /*
     const data = [{
     key: 1,
     name: 'John Brown sr.',
     children: [{
     key: 11,
     name: 'John Brown',
     age: 42,
     address: 'New York No. 2 Lake Park',
     }, {
     key: 12,
     name: 'John Brown jr.'
     children: [{
     key: 121,
     name: 'Jimmy Brown'
     }],
     },
     */
    convertTree = (tree, primaryKey, fields) => {
        var map = _.isArray(tree) ? tree : [tree];

        var root = map[0];

        var convert = function (current, parent, level) {
            current.map((v)=> {
                if (!_.has(v, 'id')) {
                    v.id = v[primaryKey];
                }
                v.level = level;
                v.rootId = root[primaryKey];
                v.parentId = parent ? parent[primaryKey] : 0;
                for (var i = 0; i < fields.length; i++) {
                    let children = v[fields[i]];
                    if (_.isArray(children) && !_.isEmpty(children)) {
                        v.children = children;
                        convert(v.children, v, level + 1);
                        break;
                    }
                }
            });
        };

        convert(map, null, 0);
        return map;
    }

    // 格式化日期
    outDateTime = (date, format, defaultText) => {
        return dateFormat(date, format, defaultText);
    }
}
