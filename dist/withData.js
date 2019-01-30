"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactApollo = require("react-apollo");

var _head = _interopRequireDefault(require("next/head"));

var _initApollo = _interopRequireDefault(require("./initApollo"));

// Gets the display name of a JSX component for dev tools
function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || 'Unknown';
}

var _default = function _default(apolloConfig) {
  return function (ComposedComponent) {
    var _class, _temp;

    return _temp = _class =
    /*#__PURE__*/
    function (_React$Component) {
      (0, _inherits2.default)(WithData, _React$Component);
      (0, _createClass2.default)(WithData, null, [{
        key: "getInitialProps",
        value: function () {
          var _getInitialProps = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee(ctx) {
            var serverState, composedInitialProps, apollo, url;
            return _regenerator.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    serverState = {
                      apollo: {} // Evaluate the composed component's getInitialProps()

                    };
                    composedInitialProps = {};

                    if (!ComposedComponent.getInitialProps) {
                      _context.next = 6;
                      break;
                    }

                    _context.next = 5;
                    return ComposedComponent.getInitialProps(ctx);

                  case 5:
                    composedInitialProps = _context.sent;

                  case 6:
                    if (process.browser) {
                      _context.next = 19;
                      break;
                    }

                    apollo = (0, _initApollo.default)(apolloConfig, null, ctx); // Provide the `url` prop data in case a GraphQL query uses it

                    url = {
                      query: ctx.query,
                      pathname: ctx.pathname
                    };
                    _context.prev = 9;
                    _context.next = 12;
                    return (0, _reactApollo.getDataFromTree)(_react.default.createElement(_reactApollo.ApolloProvider, {
                      client: apollo
                    }, _react.default.createElement(ComposedComponent, (0, _extends2.default)({
                      url: url,
                      ctx: ctx
                    }, composedInitialProps))), {
                      router: {
                        asPath: ctx.asPath,
                        pathname: ctx.pathname,
                        query: ctx.query
                      }
                    });

                  case 12:
                    _context.next = 17;
                    break;

                  case 14:
                    _context.prev = 14;
                    _context.t0 = _context["catch"](9);
                    // Prevent Apollo Client GraphQL errors from crashing SSR.
                    // Handle them in components via the data.error prop:
                    // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
                    console.log(_context.t0);

                  case 17:
                    // getDataFromTree does not call componentWillUnmount
                    // head side effect therefore need to be cleared manually
                    _head.default.rewind(); // Extract query data from the Apollo store


                    serverState = {
                      apollo: {
                        data: apollo.cache.extract()
                      }
                    };

                  case 19:
                    return _context.abrupt("return", (0, _objectSpread2.default)({
                      serverState: serverState
                    }, composedInitialProps));

                  case 20:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this, [[9, 14]]);
          }));

          function getInitialProps(_x) {
            return _getInitialProps.apply(this, arguments);
          }

          return getInitialProps;
        }()
      }]);

      function WithData(props) {
        var _this;

        (0, _classCallCheck2.default)(this, WithData);
        _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(WithData).call(this, props));
        _this.apollo = (0, _initApollo.default)(apolloConfig, _this.props.serverState.apollo.data);
        return _this;
      }

      (0, _createClass2.default)(WithData, [{
        key: "render",
        value: function render() {
          return _react.default.createElement(_reactApollo.ApolloProvider, {
            client: this.apollo
          }, _react.default.createElement(ComposedComponent, this.props));
        }
      }]);
      return WithData;
    }(_react.default.Component), (0, _defineProperty2.default)(_class, "displayName", "WithData(".concat(getComponentDisplayName(ComposedComponent), ")")), (0, _defineProperty2.default)(_class, "propTypes", {
      serverState: _propTypes.default.object.isRequired
    }), _temp;
  };
};

exports.default = _default;