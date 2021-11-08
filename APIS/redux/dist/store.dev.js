"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactNativeWebrtc = require("react-native-webrtc");

var _socket = _interopRequireDefault(require("socket.io-client"));

var _drawer = require("@react-navigation/drawer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SIGNALING_SERVER_URL = 'http://192.168.0.103:9999';
var TURN_SERVER_URL = '13.233.167.171:3478';
var TURN_SERVER_USERNAME = 'user';
var TURN_SERVER_CREDENTIAL = 'root';
var PC_CONFIG = {
  iceServers: [{
    urls: 'turn:' + TURN_SERVER_URL + '?transport=tcp',
    username: TURN_SERVER_USERNAME,
    credential: TURN_SERVER_CREDENTIAL
  }, {
    urls: 'turn:' + TURN_SERVER_URL + '?transport=udp',
    username: TURN_SERVER_USERNAME,
    credential: TURN_SERVER_CREDENTIAL
  }]
};
var initialState = {
  LocalStream: {
    toURL: function toURL() {
      return null;
    }
  },
  pc: new _reactNativeWebrtc.RTCPeerConnection(PC_CONFIG),
  InitialUserId: 0,
  Num: 0,
  RemoteStream: {
    toURL: function toURL() {
      return null;
    }
  },
  RemoteStreamObtained: false
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_LOCAL_Stream':
      return _objectSpread({}, state, {
        LocalStream: action.data
      });

    case 'SET_PC':
      return _objectSpread({}, state, {
        pc: new _reactNativeWebrtc.RTCPeerConnection(PC_CONFIG)
      });

    case 'UP_DATE_USER_INITIAL_ID':
      return _objectSpread({}, state, {
        InitialUserId: action.data
      });

    case "UPDATE NUM":
      return _objectSpread({}, state, {
        Num: state.Num + 1
      });

    case 'REMOTE_Stream':
      return _objectSpread({}, state, {
        RemoteStream: action.data
      });

    case "REMOTE_STREAM_OBTAINED":
      return _objectSpread({}, state, {
        RemoteStreamObtained: action.data
      });
  }

  return state;
};

var store = (0, _redux.createStore)(reducer);
var _default = store;
exports["default"] = _default;