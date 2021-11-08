"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactRedux = require("react-redux");

var _reactNativeWebrtc = require("react-native-webrtc");

var _GetDataAPI = _interopRequireDefault(require("../static APIS/GetData API"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Socket(Ws, ReduxStore, dispatch, PC, SETPC) {
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

  var fetch_USERS = function fetch_USERS() {
    Ws.send(JSON.stringify({
      action: "default"
    }));
  };

  fetch_USERS();
  var PartnerID;

  Ws.onmessage = function (entity) {
    mesage = JSON.parse(entity.data);

    if (mesage.type != "data") {
      console.log(mesage);
    }

    switch (mesage.type) {
      case "data":
        handleSignalingData(mesage.data);
        break;

      case "ByanotherUser":
        PartnerID = mesage.PartnerConnectionID;
        break;

      case "Ready":
        PartnerID = mesage.PartnerConnectionID;
        createPeerConnection();
        sendOffer();
    }
  };

  var sendData = function sendData(DATAS) {
    Ws.send(JSON.stringify({
      action: "connecTo",
      data: DATAS,
      PartnerConnectionID: PartnerID
    }));
  };

  var createPeerConnection = function createPeerConnection() {
    try {
      setTimeout(SETPC(new _reactNativeWebrtc.RTCPeerConnection(PC_CONFIG)), 2000);

      PC.onicecandidate = function (event) {
        if (event.candidate) {
          // console.log('ICE candidate');
          sendData({
            type: 'candidate',
            candidate: event.candidate
          });
        }
      };

      PC.onaddstream = function (event) {
        //  console.log("Add Stream")
        dispatch({
          type: "REMOTE_Stream",
          data: event.stream
        }); //      console.log("REDUXSTORE NUM ", ReduxStore.Num )

        dispatch({
          type: "REMOTE_STREAM_OBTAINED",
          data: true
        });
      };

      PC.addStream(ReduxStore.LocalStream); //    console.log("PeerConnectionCreated")
    } catch (error) {
      console.error(error);
    }
  };

  var sendOffer = function sendOffer() {
    PC.createOffer({}).then(function (description) {
      setAndSendLocalDescription(description), function (error) {
        console.error('Send offer failed: ', error);
      };
    });
  };

  var sendAnswer = function sendAnswer() {
    //console.log(" Answer Send ")
    PC.createAnswer().then(function (description) {
      setAndSendLocalDescription(description), function (error) {
        console.error(error);
      };
    });
  };

  var setAndSendLocalDescription = function setAndSendLocalDescription(description) {
    PC.setLocalDescription(description); // console.log("Local des")

    sendData(description);
  };

  var handleSignalingData = function handleSignalingData(data) {
    switch (data.type) {
      case 'offer':
        createPeerConnection(); // console.log("Recieved Offer")

        PC.setRemoteDescription(new _reactNativeWebrtc.RTCSessionDescription(data));
        sendAnswer(); // console.log("Send Answer")

        break;

      case 'answer':
        // console.log("recieved answer")
        PC.setRemoteDescription(new _reactNativeWebrtc.RTCSessionDescription(data));
        break;

      case 'candidate':
        // console.log("ICE candidates ")
        PC.addIceCandidate(new _reactNativeWebrtc.RTCIceCandidate(data.candidate));
        break;
    }
  };
}

var _default = Socket;
exports["default"] = _default;