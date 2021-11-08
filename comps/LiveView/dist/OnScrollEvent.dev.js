"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _SOCKETS = require("../../APIS/Webrtc and Sockets/SOCKETS");

var _ReduxFunctions = _interopRequireDefault(require("../../APIS/redux/ReduxFunctions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Event = function Event() {
  (0, _ReduxFunctions["default"])(type = "Post", action = "UPDATE NUM");
  var num = UserId.Num;
  var data = Posts[num];
  (0, _ReduxFunctions["default"])(type = "Post", action = "UP_DATE_USER_INITIAL_ID", data = data);

  if (UserId.Num > 1) {
    var pc = (0, _ReduxFunctions["default"])(type = "Get", data = "pc");
    pc.close();
    (0, _ReduxFunctions["default"])(type = "Post", action = "RemoteStream", data = {
      toURL: function toURL() {
        return null;
      }
    });
    (0, _SOCKETS.fetch_USERS)();
  }
};

var _default = Event;
exports["default"] = _default;