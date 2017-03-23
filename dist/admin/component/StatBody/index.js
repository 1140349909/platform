define('admin/component/StatBody/index.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require("node_modules/react/react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require("node_modules/antd/dist/antd");
  
  var _redux = require("node_modules/redux/lib/index");
  
  var _reactRedux = require("node_modules/react-redux/lib/index");
  
  '';
  
  var StatBody = (function (_Component) {
      _inherits(StatBody, _Component);
  
      function StatBody(props) {
          _classCallCheck(this, StatBody);
  
          _get(Object.getPrototypeOf(StatBody.prototype), "constructor", this).call(this, props);
      }
  
      _createClass(StatBody, [{
          key: "render",
          value: function render() {
              return _react2["default"].createElement(
                  "div",
                  { className: "stat" },
                  _react2["default"].createElement(
                      _antd.Card,
                      { title: "数据分析-(迭代3)", style: { paddingBottom: 20 } },
                      _react2["default"].createElement(
                          "div",
                          { className: "stat-title" },
                          _react2["default"].createElement(
                              "h2",
                              { className: "stat-h2" },
                              "平台名称：一元购"
                          ),
                          _react2["default"].createElement(
                              "p",
                              { className: "stat-p" },
                              "移动端链接：www.baidu.com"
                          ),
                          _react2["default"].createElement(
                              "div",
                              { className: "stat-title-qrcode" },
                              _react2["default"].createElement(_antd.Icon, { type: "qrcode" })
                          )
                      ),
                      _react2["default"].createElement(
                          "div",
                          { className: "stat-box" },
                          _react2["default"].createElement(
                              "div",
                              { className: "stat-box-l-con" },
                              _react2["default"].createElement(
                                  _antd.Card,
                                  { title: "在线产品", className: "stat-box-card" },
                                  _react2["default"].createElement(
                                      "div",
                                      { className: "stat-box-tit" },
                                      _react2["default"].createElement(
                                          "h2",
                                          null,
                                          "产品总类数"
                                      ),
                                      _react2["default"].createElement(
                                          "p",
                                          null,
                                          "20"
                                      )
                                  ),
                                  _react2["default"].createElement(
                                      "div",
                                      { className: "stat-box-tit2" },
                                      _react2["default"].createElement(
                                          "h2",
                                          null,
                                          "产品总期数"
                                      ),
                                      _react2["default"].createElement(
                                          "p",
                                          null,
                                          "200"
                                      )
                                  )
                              ),
                              _react2["default"].createElement(
                                  _antd.Card,
                                  { title: "注册会员", className: "stat-box-card2" },
                                  _react2["default"].createElement(
                                      "div",
                                      { className: "stat-box-tit" },
                                      _react2["default"].createElement(
                                          "h2",
                                          null,
                                          "会员总数"
                                      ),
                                      _react2["default"].createElement(
                                          "p",
                                          null,
                                          "20"
                                      )
                                  ),
                                  _react2["default"].createElement(
                                      "div",
                                      { className: "stat-box-tit" },
                                      _react2["default"].createElement(
                                          "h2",
                                          null,
                                          "今日参与会员数"
                                      ),
                                      _react2["default"].createElement(
                                          "p",
                                          null,
                                          "200"
                                      )
                                  ),
                                  _react2["default"].createElement(
                                      "div",
                                      { className: "stat-box-tit2" },
                                      _react2["default"].createElement(
                                          "h2",
                                          null,
                                          "今日新增会员"
                                      ),
                                      _react2["default"].createElement(
                                          "p",
                                          null,
                                          "200"
                                      )
                                  )
                              ),
                              _react2["default"].createElement(
                                  _antd.Card,
                                  { title: "交易金额", className: "stat-box-card3" },
                                  _react2["default"].createElement(
                                      "div",
                                      { className: "stat-box-tit" },
                                      _react2["default"].createElement(
                                          "h2",
                                          null,
                                          "交易总金额"
                                      ),
                                      _react2["default"].createElement(
                                          "p",
                                          null,
                                          "20"
                                      )
                                  ),
                                  _react2["default"].createElement(
                                      "div",
                                      { className: "stat-box-tit2" },
                                      _react2["default"].createElement(
                                          "h2",
                                          null,
                                          "今日交易总额"
                                      ),
                                      _react2["default"].createElement(
                                          "p",
                                          null,
                                          "200"
                                      )
                                  )
                              )
                          ),
                          _react2["default"].createElement(
                              "div",
                              { className: "stat-chart" },
                              _react2["default"].createElement(_antd.Card, { title: "图表", style: { marginTop: 10 } })
                          ),
                          _react2["default"].createElement(
                              "div",
                              { className: "stat-distribution" },
                              _react2["default"].createElement(
                                  "div",
                                  { className: "stat-distribution-l" },
                                  _react2["default"].createElement(
                                      _antd.Card,
                                      { title: "会员省份分布", className: "stat-distribution-box" },
                                      _react2["default"].createElement(
                                          "ul",
                                          { className: "stat-distribution-box-ul" },
                                          _react2["default"].createElement(
                                              "li",
                                              null,
                                              _react2["default"].createElement(
                                                  "div",
                                                  { className: "stat-distribution-box-ul-name" },
                                                  "河北省"
                                              ),
                                              _react2["default"].createElement(_antd.Progress, { className: "stat-distribution-progress", percent: 50,
                                                  status: "active" })
                                          ),
                                          _react2["default"].createElement(
                                              "li",
                                              null,
                                              _react2["default"].createElement(
                                                  "div",
                                                  { className: "stat-distribution-box-ul-name" },
                                                  "河北省"
                                              ),
                                              _react2["default"].createElement(_antd.Progress, { className: "stat-distribution-progress", percent: 50,
                                                  status: "active" })
                                          ),
                                          _react2["default"].createElement(
                                              "li",
                                              null,
                                              _react2["default"].createElement(
                                                  "div",
                                                  { className: "stat-distribution-box-ul-name" },
                                                  "河北省"
                                              ),
                                              _react2["default"].createElement(_antd.Progress, { className: "stat-distribution-progress", percent: 50,
                                                  status: "active" })
                                          ),
                                          _react2["default"].createElement(
                                              "li",
                                              null,
                                              _react2["default"].createElement(
                                                  "div",
                                                  { className: "stat-distribution-box-ul-name" },
                                                  "河北省"
                                              ),
                                              _react2["default"].createElement(_antd.Progress, { className: "stat-distribution-progress", percent: 50,
                                                  status: "active" })
                                          ),
                                          _react2["default"].createElement(
                                              "li",
                                              null,
                                              _react2["default"].createElement(
                                                  "div",
                                                  { className: "stat-distribution-box-ul-name" },
                                                  "河北省"
                                              ),
                                              _react2["default"].createElement(_antd.Progress, { className: "stat-distribution-progress", percent: 50,
                                                  status: "active" })
                                          ),
                                          _react2["default"].createElement(
                                              "li",
                                              null,
                                              _react2["default"].createElement(
                                                  "div",
                                                  { className: "stat-distribution-box-ul-name" },
                                                  "河北省"
                                              ),
                                              _react2["default"].createElement(_antd.Progress, { className: "stat-distribution-progress", percent: 50,
                                                  status: "active" })
                                          ),
                                          _react2["default"].createElement(
                                              "li",
                                              null,
                                              _react2["default"].createElement(
                                                  "div",
                                                  { className: "stat-distribution-box-ul-name" },
                                                  "河北省"
                                              ),
                                              _react2["default"].createElement(_antd.Progress, { className: "stat-distribution-progress", percent: 50,
                                                  status: "active" })
                                          )
                                      )
                                  ),
                                  _react2["default"].createElement(
                                      _antd.Card,
                                      { title: "产品交易期数", className: "stat-distribution-box2" },
                                      _react2["default"].createElement(
                                          "ul",
                                          { className: "stat-distribution-box-ul" },
                                          _react2["default"].createElement(
                                              "li",
                                              null,
                                              _react2["default"].createElement(
                                                  "span",
                                                  { className: "stat-distribution-box-ul-spanl" },
                                                  "iphone 64新版手机页面"
                                              ),
                                              _react2["default"].createElement(
                                                  "span",
                                                  { className: "stat-distribution-box-ul-spanr" },
                                                  "2345"
                                              )
                                          ),
                                          _react2["default"].createElement(
                                              "li",
                                              null,
                                              _react2["default"].createElement(
                                                  "span",
                                                  { className: "stat-distribution-box-ul-spanl" },
                                                  "iphone 64新版手机页面"
                                              ),
                                              _react2["default"].createElement(
                                                  "span",
                                                  { className: "stat-distribution-box-ul-spanr" },
                                                  "2345"
                                              )
                                          ),
                                          _react2["default"].createElement(
                                              "li",
                                              null,
                                              _react2["default"].createElement(
                                                  "span",
                                                  { className: "stat-distribution-box-ul-spanl" },
                                                  "iphone 64新版手机页面"
                                              ),
                                              _react2["default"].createElement(
                                                  "span",
                                                  { className: "stat-distribution-box-ul-spanr" },
                                                  "2345"
                                              )
                                          ),
                                          _react2["default"].createElement(
                                              "li",
                                              null,
                                              _react2["default"].createElement(
                                                  "span",
                                                  { className: "stat-distribution-box-ul-spanl" },
                                                  "iphone 64新版手机页面"
                                              ),
                                              _react2["default"].createElement(
                                                  "span",
                                                  { className: "stat-distribution-box-ul-spanr" },
                                                  "2345"
                                              )
                                          ),
                                          _react2["default"].createElement(
                                              "li",
                                              null,
                                              _react2["default"].createElement(
                                                  "span",
                                                  { className: "stat-distribution-box-ul-spanl" },
                                                  "iphone 64新版手机页面"
                                              ),
                                              _react2["default"].createElement(
                                                  "span",
                                                  { className: "stat-distribution-box-ul-spanr" },
                                                  "2345"
                                              )
                                          ),
                                          _react2["default"].createElement(
                                              "li",
                                              null,
                                              _react2["default"].createElement(
                                                  "span",
                                                  { className: "stat-distribution-box-ul-spanl" },
                                                  "iphone 64新版手机页面"
                                              ),
                                              _react2["default"].createElement(
                                                  "span",
                                                  { className: "stat-distribution-box-ul-spanr" },
                                                  "2345"
                                              )
                                          ),
                                          _react2["default"].createElement(
                                              "li",
                                              null,
                                              _react2["default"].createElement(
                                                  "span",
                                                  { className: "stat-distribution-box-ul-spanl" },
                                                  "iphone 64新版手机页面"
                                              ),
                                              _react2["default"].createElement(
                                                  "span",
                                                  { className: "stat-distribution-box-ul-spanr" },
                                                  "2345"
                                              )
                                          )
                                      )
                                  )
                              ),
                              _react2["default"].createElement(
                                  "div",
                                  { className: "stat-distribution-r" },
                                  _react2["default"].createElement(
                                      _antd.Card,
                                      { title: "会员参与", className: "stat-box-card4" },
                                      _react2["default"].createElement(
                                          "ul",
                                          { className: "stat-box-card4-ul" },
                                          _react2["default"].createElement(
                                              "li",
                                              { className: "stat-box-card4-ul-li" },
                                              _react2["default"].createElement(
                                                  "div",
                                                  { className: "stat-box-card4-ul-li-tit" },
                                                  "15855388552",
                                                  _react2["default"].createElement(
                                                      "span",
                                                      { className: "stat-box-card4-ul-li-right" },
                                                      "5幸运币"
                                                  )
                                              ),
                                              _react2["default"].createElement(
                                                  "div",
                                                  null,
                                                  "参与一元购"
                                              ),
                                              _react2["default"].createElement(
                                                  "div",
                                                  null,
                                                  "上海市",
                                                  _react2["default"].createElement(
                                                      "span",
                                                      { className: "stat-box-card4-ul-li-right" },
                                                      "2015-02-12 18:12:10"
                                                  )
                                              )
                                          ),
                                          _react2["default"].createElement(
                                              "li",
                                              { className: "stat-box-card4-ul-li" },
                                              _react2["default"].createElement(
                                                  "div",
                                                  { className: "stat-box-card4-ul-li-tit" },
                                                  "15855388552",
                                                  _react2["default"].createElement(
                                                      "span",
                                                      { className: "stat-box-card4-ul-li-right" },
                                                      "5幸运币"
                                                  )
                                              ),
                                              _react2["default"].createElement(
                                                  "div",
                                                  null,
                                                  "参与一元购"
                                              ),
                                              _react2["default"].createElement(
                                                  "div",
                                                  null,
                                                  "上海市",
                                                  _react2["default"].createElement(
                                                      "span",
                                                      { className: "stat-box-card4-ul-li-right" },
                                                      "2015-02-12 18:12:10"
                                                  )
                                              )
                                          ),
                                          _react2["default"].createElement(
                                              "li",
                                              { className: "stat-box-card4-ul-li" },
                                              _react2["default"].createElement(
                                                  "div",
                                                  { className: "stat-box-card4-ul-li-tit" },
                                                  "15855388552",
                                                  _react2["default"].createElement(
                                                      "span",
                                                      { className: "stat-box-card4-ul-li-right" },
                                                      "5幸运币"
                                                  )
                                              ),
                                              _react2["default"].createElement(
                                                  "div",
                                                  null,
                                                  "参与一元购"
                                              ),
                                              _react2["default"].createElement(
                                                  "div",
                                                  null,
                                                  "上海市",
                                                  _react2["default"].createElement(
                                                      "span",
                                                      { className: "stat-box-card4-ul-li-right" },
                                                      "2015-02-12 18:12:10"
                                                  )
                                              )
                                          ),
                                          _react2["default"].createElement(
                                              "li",
                                              { className: "stat-box-card4-ul-li" },
                                              _react2["default"].createElement(
                                                  "div",
                                                  { className: "stat-box-card4-ul-li-tit" },
                                                  "15855388552",
                                                  _react2["default"].createElement(
                                                      "span",
                                                      { className: "stat-box-card4-ul-li-right" },
                                                      "5幸运币"
                                                  )
                                              ),
                                              _react2["default"].createElement(
                                                  "div",
                                                  null,
                                                  "参与一元购"
                                              ),
                                              _react2["default"].createElement(
                                                  "div",
                                                  null,
                                                  "上海市",
                                                  _react2["default"].createElement(
                                                      "span",
                                                      { className: "stat-box-card4-ul-li-right" },
                                                      "2015-02-12 18:12:10"
                                                  )
                                              )
                                          ),
                                          _react2["default"].createElement(
                                              "li",
                                              { className: "stat-box-card4-ul-li" },
                                              _react2["default"].createElement(
                                                  "div",
                                                  { className: "stat-box-card4-ul-li-tit" },
                                                  "15855388552",
                                                  _react2["default"].createElement(
                                                      "span",
                                                      { className: "stat-box-card4-ul-li-right" },
                                                      "5幸运币"
                                                  )
                                              ),
                                              _react2["default"].createElement(
                                                  "div",
                                                  null,
                                                  "参与一元购"
                                              ),
                                              _react2["default"].createElement(
                                                  "div",
                                                  null,
                                                  "上海市",
                                                  _react2["default"].createElement(
                                                      "span",
                                                      { className: "stat-box-card4-ul-li-right" },
                                                      "2015-02-12 18:12:10"
                                                  )
                                              )
                                          ),
                                          _react2["default"].createElement(
                                              "li",
                                              { className: "stat-box-card4-ul-li" },
                                              _react2["default"].createElement(
                                                  "div",
                                                  { className: "stat-box-card4-ul-li-tit" },
                                                  "15855388552",
                                                  _react2["default"].createElement(
                                                      "span",
                                                      { className: "stat-box-card4-ul-li-right" },
                                                      "5幸运币"
                                                  )
                                              ),
                                              _react2["default"].createElement(
                                                  "div",
                                                  null,
                                                  "参与一元购"
                                              ),
                                              _react2["default"].createElement(
                                                  "div",
                                                  null,
                                                  "上海市",
                                                  _react2["default"].createElement(
                                                      "span",
                                                      { className: "stat-box-card4-ul-li-right" },
                                                      "2015-02-12 18:12:10"
                                                  )
                                              )
                                          ),
                                          _react2["default"].createElement(
                                              "li",
                                              { className: "stat-box-card4-ul-li" },
                                              _react2["default"].createElement(
                                                  "div",
                                                  { className: "stat-box-card4-ul-li-tit" },
                                                  "15855388552",
                                                  _react2["default"].createElement(
                                                      "span",
                                                      { className: "stat-box-card4-ul-li-right" },
                                                      "5幸运币"
                                                  )
                                              ),
                                              _react2["default"].createElement(
                                                  "div",
                                                  null,
                                                  "参与一元购"
                                              ),
                                              _react2["default"].createElement(
                                                  "div",
                                                  null,
                                                  "上海市",
                                                  _react2["default"].createElement(
                                                      "span",
                                                      { className: "stat-box-card4-ul-li-right" },
                                                      "2015-02-12 18:12:10"
                                                  )
                                              )
                                          ),
                                          _react2["default"].createElement(
                                              "li",
                                              { className: "stat-box-card4-ul-li" },
                                              _react2["default"].createElement(
                                                  "div",
                                                  { className: "stat-box-card4-ul-li-tit" },
                                                  "15855388552",
                                                  _react2["default"].createElement(
                                                      "span",
                                                      { className: "stat-box-card4-ul-li-right" },
                                                      "5幸运币"
                                                  )
                                              ),
                                              _react2["default"].createElement(
                                                  "div",
                                                  null,
                                                  "参与一元购"
                                              ),
                                              _react2["default"].createElement(
                                                  "div",
                                                  null,
                                                  "上海市",
                                                  _react2["default"].createElement(
                                                      "span",
                                                      { className: "stat-box-card4-ul-li-right" },
                                                      "2015-02-12 18:12:10"
                                                  )
                                              )
                                          )
                                      )
                                  )
                              )
                          )
                      )
                  )
              );
          }
      }]);
  
      return StatBody;
  })(_react.Component);
  
  exports["default"] = StatBody;
  module.exports = exports["default"];

});
