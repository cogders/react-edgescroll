"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react2 = require("@testing-library/react");

var _EdgeScroll = _interopRequireWildcard(require("./EdgeScroll"));

it('renders without crashing', function () {
  var _render = (0, _react2.render)(_react.default.createElement("div", null, _react.default.createElement(_EdgeScroll.default, {
    inactiveStyle: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: "absolute"
    },
    activeStyle: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: "absolute"
    },
    direction: _EdgeScroll.UPWARDS
  }))),
      getByTestId = _render.getByTestId;

  var edgeSrollTestId = getByTestId('edgescroll-component');
  expect(edgeSrollTestId).toBeTruthy();
});