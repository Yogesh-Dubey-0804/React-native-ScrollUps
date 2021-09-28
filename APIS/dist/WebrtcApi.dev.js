"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = RemoteStreamGiver;

var _react = _interopRequireWildcard(require("react"));

var _reactNativeWebrtc = require("react-native-webrtc");

var _reactNative = require("react-native");

var _socket = _interopRequireDefault(require("socket.io-client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Config variables: change them to point to your own servers
var SIGNALING_SERVER_URL = 'http://192.168.0.101:9999';
var TURN_SERVER_URL = '192.168.0.1:3478';
var TURN_SERVER_USERNAME = 'username';
var TURN_SERVER_CREDENTIAL = 'credential'; // WebRTC config: you don't have to change this for the example to work
// If you are testing in local network, you can just use PC_CONFIG = {iceServers: []}

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

function RemoteStreamGiver(props) {
  var Socket = (0, _socket["default"])(SIGNALING_SERVER_URL, {
    autoConnect: false,
    jsonp: false,
    transports: ['websocket']
  });

  var _useState = (0, _react.useState)({
    toURL: function toURL() {
      return null;
    }
  }),
      _useState2 = _slicedToArray(_useState, 2),
      LocalStream = _useState2[0],
      SetLocalStream = _useState2[1];

  var _useState3 = (0, _react.useState)(new _reactNativeWebrtc.RTCPeerConnection(PC_CONFIG)),
      _useState4 = _slicedToArray(_useState3, 2),
      pc = _useState4[0],
      setpc = _useState4[1];

  var _useState5 = (0, _react.useState)({
    toURL: function toURL() {
      return null;
    }
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      RemoteStream = _useState6[0],
      SetRemotStream = _useState6[1];

  Socket.on('data', function (data) {
    handleSignalingData(data);
  });
  Socket.on('ready', function () {
    console.log('ready');
    CreatePeerConnection();
    sendOffer();
  });

  var sendData = function sendData(data) {
    Socket.emit('data', data);
  };

  var getLocalStream = function getLocalStream() {
    _reactNativeWebrtc.mediaDevices.getUserMedia({
      audio: true,
      video: {
        facingMode: 'user'
      }
    }).then(function (stream) {
      SetLocalStream(stream);
      pc.addStream(stream);
      Socket.connect();
    })["catch"](function (error) {
      console.error('Stream not found: ', error);
    });
  };

  var CreatePeerConnection = function CreatePeerConnection() {
    try {
      pc.onicecandidate = function (event) {
        if (event.candidate) {
          console.log('ICE candidate');
          sendData({
            type: 'candidate',
            candidate: event.candidate
          });
        }
      };

      pc.onaddstream = function (event) {
        console.log("Add Stream");
        SetRemotStream(event.stream);
      };

      console.log("PeerConnectionCreated");
    } catch (error) {
      console.error(error);
    }
  };

  var sendOffer = function sendOffer() {
    pc.createOffer({}).then(function (description) {
      setAndSendLocalDescription(description), function (error) {
        console.error('Send offer failed: ', error);
      };
    });
  };

  var sendAnswer = function sendAnswer() {
    console.log(" Answer Send ");
    pc.createAnswer().then(function (description) {
      setAndSendLocalDescription(description), function (error) {
        console.error(error);
      };
    });
  };

  var setAndSendLocalDescription = function setAndSendLocalDescription(description) {
    pc.setLocalDescription(description);
    console.log("Local des");
    sendData(description);
  };

  var handleSignalingData = function handleSignalingData(data) {
    switch (data.type) {
      case 'offer':
        CreatePeerConnection();
        pc.setRemoteDescription(new _reactNativeWebrtc.RTCSessionDescription(data));
        sendAnswer();
        break;

      case 'answer':
        pc.setRemoteDescription(new _reactNativeWebrtc.RTCSessionDescription(data));
        break;

      case 'candidate':
        pc.addIceCandidate(new _reactNativeWebrtc.RTCIceCandidate(data.candidate));
        break;
    }
  };
}

var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    marginBottom: 60
  }
});