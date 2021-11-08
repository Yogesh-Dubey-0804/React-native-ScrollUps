"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _SOCKETS = _interopRequireDefault(require("./SOCKETS"));

var _GetDataAPI = _interopRequireDefault(require("../static APIS/GetData API"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var WebrtcCall = function WebrtcCall(Ws, ReduxStore, dispatch, functionName) {
  var ReduxSstore = ReduxStore;

  function sendData(data) {
    (0, _SOCKETS["default"])(Ws, ReduxSstore, dispatch, {
      name: "sendData",
      datas: data
    });
  }

  var createPeerConnection = function createPeerConnection() {
    try {
      ReduxStore.pc.onicecandidate = function (event) {
        if (event.candidate) {
          console.log('ICE candidate');
          sendData({
            type: 'candidate',
            candidate: event.candidate
          });
        }
      };

      ReduxStore.pc.onaddstream = function (event) {
        console.log("Add Stream");
        dispatch({
          type: "REMOTE_Stream",
          data: event.stream
        });

        _GetDataAPI["default"].push({
          id: ReduxStore.Num + 1
        });
      };

      console.log("PeerConnectionCreated");
    } catch (error) {
      console.error(error);
    }
  };

  var sendOffer = function sendOffer() {
    ReduxStore.pc.createOffer({}).then(function (description) {
      setAndSendLocalDescription(description), function (error) {
        console.error('Send offer failed: ', error);
      };
    });
  };

  var sendAnswer = function sendAnswer() {
    console.log(" Answer Send ");
    ReduxStore.pc.createAnswer().then(function (description) {
      setAndSendLocalDescription(description), function (error) {
        console.error(error);
      };
    });
  };

  var setAndSendLocalDescription = function setAndSendLocalDescription(description) {
    ReduxStore.pc.setLocalDescription(description);
    console.log("Local des");
    sendData(description);
  };

  var handleSignalingData = function handleSignalingData(data) {
    switch (data.type) {
      case 'offer':
        createPeerConnection();
        console.log("Recieved Offer");
        ReduxStore.pc.setRemoteDescription(new RTCSessionDescription(data));
        sendAnswer();
        console.log("Send Answer");
        break;

      case 'answer':
        console.log("recieved answer");
        ReduxStore.pc.setRemoteDescription(new RTCSessionDescription(data));
        break;

      case 'candidate':
        console.log("ICE candidates ");
        ReduxStore.pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        break;
    }
  };

  if (functionName.name == "Handlesignallingdata") {
    console.log("handlesignallingdata");
    handleSignalingData(functionName.data);
  } else if (functionName.name == "CreatePeerConnectionAndSendAnswer") {
    console.log("called Peer connection ");
    createPeerConnection();
    sendOffer();
  }
};

var _default = WebrtcCall;
exports["default"] = _default;