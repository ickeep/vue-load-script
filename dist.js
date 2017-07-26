'use strict';

exports.__esModule = true;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function plugin(Vue) {
  if (!plugin.installed) {
    /* eslint-disable no-param-reassign */
    var loadScriptList = {};

    Vue.prototype.$loadScript = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(url, script) {
        var _this = this;

        var maxTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10000;
        var time = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!process.browser) {
                  _context2.next = 8;
                  break;
                }

                if (!(script && window[script])) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt('return', true);

              case 3:
                if (loadScriptList[url]) {
                  _context2.next = 6;
                  break;
                }

                loadScriptList[url] = 'loading';
                return _context2.abrupt('return', new Promise(function () {
                  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve) {
                    var script;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            script = document.createElement('script');

                            script.type = 'text/javascript';
                            script.src = url;
                            document.body.appendChild(script);

                            script.addEventListener('load', function () {
                              loadScriptList[url] = true;
                              resolve(true);
                            });
                            script.addEventListener('error', function () {
                              resolve(false);
                            });
                            script.addEventListener('abort', function () {
                              resolve(false);
                            });

                          case 7:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this);
                  }));

                  return function (_x5) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

              case 6:
                if (!(loadScriptList[url] === 'loading' && script)) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt('return', new Promise(function (resolve) {
                  var intervalId = setInterval(function () {
                    if (window[script]) {
                      clearInterval(intervalId);
                      resolve(true);
                    }
                    maxTime -= time;
                    if (maxTime < 0) {
                      clearInterval(intervalId);
                      resolve(false);
                    }
                  }, time);
                }));

              case 8:
                return _context2.abrupt('return', false);

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

exports.default = plugin;
