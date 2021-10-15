"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeWebrtc = require("react-native-webrtc");

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GotLocalStream = function GotLocalStream() {
  _reactNativeWebrtc.mediaDevices.getUserMedia({
    audio: true,
    video: {
      facingMode: 'user'
    }
  }).then(function (stream) {
    // SetLocalStream(stream)
    SetLocalStreamRedux(stream);
  })["catch"](function (error) {
    console.error('Stream not found: ', error);
  });
};

function mapStateToProps(state) {
  return {
    LocalStreamRedux: state.LocalStreamRedux
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLocalStreamRedux: function setLocalStreamRedux(data) {
      return dispatch({
        type: 'SET_LOCAL-Stream',
        data: data
      });
    }
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(GotLocalStream);

exports["default"] = _default;