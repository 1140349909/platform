平台管理后台
==========

##
npm install -g echarts --registry=https://registry.npm.taobao.org

### 目录结构

* 主要目录及对应页面

* admin：爆款商城（目前由Cold负责）
* assets：构建库
* common：公用组件
* platform：平台管理
* server：
* sso：

待开发：
* integral：积分商城

* 子目录
* actions：登录接口部分
* api：API管理部分
* component：页面组件部分
* config：参数配置部分（common）
* constant：接口定义部分
* http：XHR方法部分（common）
* layout：
* middleware：中间件部分（common）
* reducer：
* util：通用方法部分（common）
* view：登录视图部分

## 使用说明
```
	npm i -g fis3
	npm i -g fis3-hook-commonjs fis3-hook-node_modules fis-parser-babel-5.x fis3-preprocessor-js-require-css
	fis3-preprocessor-js-require-file fis3-postprocessor-autoprefixer
	npm i -g fis3-postpackager-loader
    npm i -g fis3-parser-node-sass fis3-parser-less-2.x
```

## DEV环境配置

* http://bs.sit.vveshow.com/sso/
* http://bs.uat.vveshow.com/sso/
* http://bs.iloka.me/sso/

## SIT环境配置

## UAT环境配置

## PRD环境配置

## Api说明

### 登陆

### 获取登陆用户信息

### 客户管理服务 customer
* 新增
* 修改
* 列表
* 详细
* 运营详情

### 平台会员
* 会员统计 /api/v1/{client}/{channel}/user/list
* 会员列表 /api/v1/{client}/{channel}/user/list

## Api接口修改意见


## action
//export function getProducts({
//    page = 0,
//    size = config.SIZE,
//    sort,
//    order,
//    status,
//    name
//    }) {
//    return {
//        type: GET_PRODUCTS,
//        payload: {
//            promise: api.get('manager/product/list', {
//                page,
//                size,
//                sort,
//                order,
//                status,
//                name
//            }),
//            data: {
//                name: 'Yu'
//            },
//            callback(){
//                console.log('callback', arguments)
//            }
//        },
//        meta: {
//            metaName: 'yu'
//        }
//    }
//}

//export function getProducts({
//    page = 0,
//    size = config.SIZE,
//    sort,
//    order,
//    status,
//    name
//    }) {
//
//    return function (dispatch, getState) {
//        return api.get('manager/product/list', {
//                page,
//                size,
//                sort,
//                order
//            })
//            .then((result) => {
//                return dispatch({
//                    type: 'GET_PRODUCTS_SUCCESS',
//                    payload: {
//                        data: result.data
//                    }
//                })
//            })
//    }
//}


## TODO
* [ok] redux支持react-router-redux
* [ok] redux支持immutable https://www.npmjs.com/package/immutable
* [ok] redux-immutablejs
* [ok] 重构actionType的生成
* [OK] 移除redux-actions库
* 重构common
* 重构view
* 重构index.jsx,抽离routes


## 其他插件
* redux-form http://redux-form.com/5.3.1/#/?_k=40f7q7
* 支持require.ensure http://gitbook.cn/books/56e22c20e4438cde0da40137/bookSource/1467802736236.html
* 升级react => 15.3.1


## 注释部分请打上以下标记,方便后续代码维护
* [REMOVE] update by asoiso_li 20161013

/content/tpl/all
/content/mine/
/content/stat

/h5/tpl/all
/h5/tpl/favorite
/h5/mine/
/h5/stat


## 坑

### 在reducer中使用immutable的时候,不要使用mergeDeep去做深度合并
* https://github.com/facebook/immutable-js/issues/781
* https://github.com/facebook/immutable-js/issues/422


1. Code-Review
2. LoadMore
3. 默认图



## table
width=(字数+1)*15
width=字数*15,最小宽度为45

16+12*5

1=20
2=45
3=55
4=70
5=85
6=
7=
8=
9=
10=
scroll={{ x: sum(width) }}


##
引用 推延
背景色 推延
个性版式 推延


默认文章样式优化 OK

主题色优化 待解决
底部菜单优化 - 自动计算位置
编辑器底部留白


## 权限校验

### 菜单权限校验
可用-》正常使用
可见不可用—》可见，点击时，对话框提示无权使用，请升级账号
不可用—》不可见，点击时，对话框提示无权使用，请联系管理员

### 功能权限校验
可用-》正常使用
可见不可用—》可见，点击时，对话框提示无权使用，请升级账号
不可用—》不可见，点击时，对话框提示无权使用，请联系管理员
权限埋点要加在两个地方，1、按钮处，2、执行处

### 功能权益校验
可用-》正常使用
不可用-》点击时，对话框提示购买服务，
显式权益埋点，体现在界面上
隐式权益埋点，体现在执行处

### 购买服务
获取权益配置，获取余额
最大可选数量等于max-value，步长=设置的步长
选择购买数量，动态计算总价
如果选择最大数量时，提示如需更大权益，请升级账号
如果余额不足，提示余额不足
支付
支付成功-》刷新versionInfo接口
支付失败-》提示失败原因

### 权限和权益要放到枚举中管理

