define('common/middleware/promiseMiddleware', function(require, exports, module) {

  // 操作快照
  'use strict';
  
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var operation = 'OPERATION';
  var defaultTypes = ['PENDING', 'SUCCESS', 'FAILURE'];
  
  function isPromise(value) {
  
      if (value !== null && typeof value === 'object') {
          return value && typeof value.then === 'function';
      }
  
      return false;
  }
  
  /**
   * @function promiseMiddleware
   * @description
   * @returns {function} thunk
   */
  module.exports = function promiseMiddleware() {
      var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  
      var promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypes;
  
      return function (ref) {
          var dispatch = ref.dispatch;
  
          return function (next) {
              return function (action) {
                  if (action.payload) {
                      if (!isPromise(action.payload) && !isPromise(action.payload.promise)) {
                          return next(action);
                      }
                  } else {
                      return next(action);
                  }
  
                  // Deconstruct the properties of the original action object to constants
                  var type = action.type;
                  var payload = action.payload;
                  var meta = action.meta;
  
                  // Assign values for promise type suffixes
  
                  var _ref = (meta || {}).promiseTypeSuffixes || promiseTypeSuffixes;
  
                  var _ref2 = _slicedToArray(_ref, 3);
  
                  var PENDING = _ref2[0];
                  var SUCCESS = _ref2[1];
                  var FAILURE = _ref2[2];
  
                  /**
                   * @function getAction
                   * @description Utility function for creating a rejected or fulfilled
                   * flux standard action object.
                   * @param {boolean} Is the action rejected?
                   * @returns {object} action
                   */
                  var getAction = function getAction(type, newPayload, isRejected) {
                      return _extends({
                          type: type
                      }, newPayload ? {
                          payload: newPayload
                      } : {}, !!meta ? { meta: meta } : {}, isRejected ? {
                          error: true
                      } : {});
                  };
  
                  /**
                   * Assign values for promise and data variables. In the case the payload
                   * is an object with a `promise` and `data` property, the values of those
                   * properties will be used. In the case the payload is a promise, the
                   * value of the payload will be used and data will be null.
                   */
                  var promise = undefined;
                  var data = undefined;
                  var callback = function callback() {};
                  var hasCallback = false;
  
                  if (!isPromise(action.payload) && typeof action.payload === 'object') {
                      promise = payload.promise;
                      data = payload.data;
                      if (typeof payload.callback == 'function') {
                          callback = payload.callback;
                          hasCallback = true;
                      }
                  } else {
                      promise = payload;
                      data = null;
                  }
  
                  /**
                   * First, dispatch the pending action. This flux standard action object
                   * describes the pending state of a promise and will include any data
                   * (for optimistic updates) and/or meta from the original action.
                   */
                  next(getAction(type + '_' + PENDING, data, false));
  
                  // 操作快照
                  if (!hasCallback) {
                      next(getAction(operation + '_' + PENDING, _extends({}, data, {
                          type: type,
                          status: PENDING,
                          pending: true
                      }), false));
                  }
  
                  /*
                   * @function handleFailure
                   * @description Dispatch the rejected action and return
                   * an error object. The error object should contain the
                   * value and the dispatched action.
                   * @params value The value the promise was rejected
                   * @returns {object}
                   */
                  var handleFailure = function handleFailure() {
                      var value = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
  
                      var failureAction = getAction(type + '_' + FAILURE, value, true);
                      dispatch(failureAction);
                      // 操作快照
                      if (!hasCallback) {
                          dispatch(getAction(operation + '_' + FAILURE, _extends({}, value, {
                              type: type,
                              status: SUCCESS,
                              failure: true
                          }), true));
                      }
  
                      var error = value instanceof Error ? value : new Error();
  
                      error.value = value;
                      error.action = failureAction;
  
                      //TODO:先不要抛异常
                      //throw error;
                      return error;
                  };
  
                  /*
                   * @function handleSuccess
                   * @description Dispatch the fulfilled action and
                   * return the success object. The success object should
                   * contain the value and the dispatched action.
                   * @param value The value the promise was resloved with
                   * @returns {object}
                   */
                  var handleSuccess = function handleSuccess() {
                      var value = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
  
                      var successAction = getAction(type + '_' + SUCCESS, value, false);
                      dispatch(successAction);
                      // 操作快照
                      if (!hasCallback) {
                          dispatch(getAction(operation + '_' + SUCCESS, _extends({}, value, {
                              type: type,
                              status: SUCCESS,
                              success: true
                          }), false));
                      }
  
                      return { value: value, action: successAction };
                  };
  
                  /**
                   * Second, dispatch a rejected or fulfilled action. This flux standard
                   * action object will describe the resolved state of the promise. In
                   * the case of a rejected promise, it will include an `error` property.
                   *
                   * In order to allow proper chaining of actions using `then`, a new
                   * promise is constructed and returned. This promise will resolve
                   * with two properties: (1) the value (if fulfilled) or value
                   * (if rejected) and (2) the flux standard action.
                   *
                   * Rejected object:
                   * {
                   *   value: ...
                   *   action: {
                   *     error: true,
                   *     type: 'ACTION_FAILURE',
                   *     payload: ...
                   *   }
                   * }
                   *
                   * Fulfilled object:
                   * {
                   *   value: ...
                   *   action: {
                   *     type: 'ACTION_SUCCESS',
                   *     payload: ...
                   *   }
                   * }
                   */
                  return promise.then(handleSuccess, handleFailure).then(callback);
              };
          };
      };
  };

});
