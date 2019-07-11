"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DOWNWARDS = exports.UPWARDS = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var UPWARDS = "upwards";
exports.UPWARDS = UPWARDS;
var DOWNWARDS = "downwards";
exports.DOWNWARDS = DOWNWARDS;

function useToggle() {
  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      on = _useState2[0],
      setOnState = _useState2[1];

  var toggle = function toggle() {
    return setOnState(function (o) {
      return !o;
    });
  };

  var setOn = function setOn() {
    return setOnState(true);
  };

  var setOff = function setOff() {
    return setOnState(false);
  };

  return {
    on: on,
    toggle: toggle,
    setOn: setOn,
    setOff: setOff
  };
}

function EdgeScroll(props) {
  var dragEnterRef = (0, _react.useRef)();

  var _useToggle = useToggle(),
      isDragging = _useToggle.on,
      setDragOn = _useToggle.setOn,
      setDragOff = _useToggle.setOff;

  var _useToggle2 = useToggle(),
      isMouseClicked = _useToggle2.on,
      setMouseClickOn = _useToggle2.setOn,
      setMouseClickOff = _useToggle2.setOff;

  var intervalId;
  var timerId;

  function handleIsDragging() {
    var delayBeforeActive = props.delayBeforeActive;
    timerId = setTimeout(function () {
      setDragOn();
    }, delayBeforeActive);
  }

  ;

  function handleDragEnd() {
    clearTimeout(timerId);
    clearInterval(intervalId);
    setDragOff();
    setMouseClickOff();
  }

  ;

  function handleDragLeave() {
    clearTimeout(timerId);
    clearInterval(intervalId);
  }

  ;

  function handleMouseLeave() {
    handleDragLeave();
  }

  ;

  function handleDragEnter() {
    var scrollDelay = props.scrollDelay,
        direction = props.direction,
        scrollContainer = props.scrollContainer;
    var scrollAmount = direction === UPWARDS ? -scrollContainer.innerHeight / 2 : scrollContainer.innerHeight / 2;
    scrollContainer.scrollBy({
      top: scrollAmount,
      behavior: "smooth"
    }); // eslint-disable-next-line

    intervalId = setInterval(function () {
      scrollContainer.scrollBy({
        top: scrollAmount,
        behavior: "smooth"
      });
    }, scrollDelay);
  }

  ;

  function handleMouseDown() {
    var delayBeforeActive = props.delayBeforeActive;
    timerId = setTimeout(function () {
      setMouseClickOn();
      setDragOn();
    }, delayBeforeActive);
  }

  ;

  function handleMouseUp() {
    clearTimeout(timerId);
    clearInterval(intervalId);
    setMouseClickOff();
    setDragOff();
  }

  ;

  function handleMouseEnter() {
    if (isMouseClicked) {
      handleDragEnter();
    }
  }

  ;

  function handleReset() {
    clearTimeout(timerId);
    clearInterval(intervalId);
    setMouseClickOff();
    setDragOff();
  }

  (0, _react.useEffect)(function () {
    if (!dragEnterRef || !dragEnterRef.current) return;
    var dragEnterEl = dragEnterRef.current;
    var scrollContainer = props.scrollContainer;
    scrollContainer.addEventListener("mousedown", handleMouseDown);
    scrollContainer.addEventListener("mouseup", handleMouseUp);
    scrollContainer.addEventListener("dragstart", handleIsDragging);
    scrollContainer.addEventListener("dragend", handleDragEnd);
    scrollContainer.addEventListener("focus", handleReset);
    scrollContainer.addEventListener("blur", handleReset);
    scrollContainer.addEventListener("contextmenu", handleReset);
    dragEnterEl.addEventListener("dragenter", handleDragEnter);
    dragEnterEl.addEventListener("dragleave", handleDragLeave);
    dragEnterEl.addEventListener("mouseenter", handleMouseEnter);
    dragEnterEl.addEventListener("mouseleave", handleMouseLeave);
    return function () {
      scrollContainer.removeEventListener("mousedown", handleMouseDown);
      scrollContainer.removeEventListener("mouseup", handleMouseUp);
      scrollContainer.removeEventListener("dragstart", handleIsDragging);
      scrollContainer.removeEventListener("dragend", handleDragEnd);
      scrollContainer.removeEventListener("focus", handleReset);
      scrollContainer.removeEventListener("blur", handleReset);
      scrollContainer.removeEventListener("contextmenu", handleReset);
      dragEnterEl.removeEventListener("dragenter", handleDragEnter);
      dragEnterEl.removeEventListener("dragleave", handleDragLeave);
      dragEnterEl.removeEventListener("mouseenter", handleMouseEnter);
      dragEnterEl.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(intervalId);
      clearTimeout(timerId);
    };
  }, [dragEnterRef, isDragging, isMouseClicked]);
  (0, _react.useEffect)(function () {
    var dragEnterEl = dragEnterRef.current;
    return function () {
      var scrollContainer = props.scrollContainer;
      scrollContainer.removeEventListener("mousedown", handleMouseDown);
      scrollContainer.removeEventListener("mouseup", handleMouseUp);
      scrollContainer.removeEventListener("dragstart", handleIsDragging);
      scrollContainer.removeEventListener("dragend", handleDragEnd);
      scrollContainer.removeEventListener("focus", handleReset);
      scrollContainer.removeEventListener("blur", handleReset);
      scrollContainer.removeEventListener("contextmenu", handleReset);
      dragEnterEl.removeEventListener("dragenter", handleDragEnter);
      dragEnterEl.removeEventListener("dragleave", handleDragLeave);
      dragEnterEl.removeEventListener("mouseenter", handleMouseEnter);
      dragEnterEl.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(intervalId);
      clearTimeout(timerId);
    };
  }, []);
  var activeStyle = props.activeStyle,
      inactiveStyle = props.inactiveStyle;
  var mergedStyle = isDragging ? activeStyle : inactiveStyle;
  return _react.default.createElement("div", {
    ref: dragEnterRef,
    style: mergedStyle
  });
}

EdgeScroll.defaultProps = {
  direction: UPWARDS,
  scrollDelay: 1500,
  // delay between scrolls
  activeStyle: {},
  inactiveStyle: {},
  scrollContainer: window,
  delayBeforeActive: 600 // used to wait xxx miliseconds before becoming active

};
var _default = EdgeScroll;
exports.default = _default;