"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _WaitingArea = _interopRequireDefault(require("../../comps/LiveView/WaitingArea"));

var _liveView = _interopRequireDefault(require("./../../comps/liveView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MainPosts = [{
  id: 1
}];
var _default = MainPosts;
exports["default"] = _default;
var status = false;

var ScreenProvider = function ScreenProvider() {
  if (status == false) {
    return;
  }
};