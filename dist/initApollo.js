"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initApollo;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _awsAppsync = require("aws-appsync");

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

var _lodash = _interopRequireDefault(require("lodash.isfunction"));

var apolloClient = null; // Polyfill fetch() on the server (used by apollo-client)

if (!process.browser) {
  global.fetch = _isomorphicFetch.default;
}

function create(apolloConfig, initialState) {
  var config = (0, _objectSpread2.default)({
    ssrMode: !process.browser,
    // Disables forceFetch on the server (so queries are only run once)
    disableOffline: true
  }, apolloConfig);
  var client = new _awsAppsync.AWSAppSyncClient(config);

  if (initialState) {
    client.cache.restore(initialState);
  }

  return client;
}

function initApollo(apolloConfig, initialState, ctx) {
  if ((0, _lodash.default)(apolloConfig)) {
    apolloConfig = apolloConfig(ctx);
  } // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)


  if (!process.browser) {
    return create(apolloConfig, initialState);
  } // Reuse client on the client-side


  if (!apolloClient) {
    apolloClient = create(apolloConfig, initialState);
  }

  return apolloClient;
}