"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
var propTypes = {
  /*
   * Assistive Text to use instead of a visible label
   */
  assistiveText: _propTypes.default.object,

  /*
   * Id of the input associated with this label
   */
  htmlFor: _propTypes.default.string,

  /*
   * Input Label or inner node for formatting purposes
   */
  label: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]),

  /*
   * Applies label styling for a required form element
   */
  required: _propTypes.default.bool,

  /**
   * Changes markup of label.
   */
  variant: _propTypes.default.oneOf(['base', 'static'])
};
var defaultProps = {
  variant: 'base'
};
/*
 * Form label. This returns null if there is no label text (hidden or shown)
 */

var Label = function Label(props) {
  var labelText = props.label || props.assistiveText && props.assistiveText.label; // One of these is required to pass accessibility tests

  var subRenders = {
    base: _react.default.createElement("label", {
      className: (0, _classnames.default)('slds-form-element__label', {
        'slds-assistive-text': props.assistiveText && !props.label
      }),
      htmlFor: props.htmlFor
    }, props.required && _react.default.createElement("abbr", {
      className: "slds-required",
      title: "required"
    }, '*'), labelText),
    static: _react.default.createElement("span", {
      className: "slds-form-element__label"
    }, labelText)
  };
  return labelText ? subRenders[props.variant] : null;
};

Label.displayName = 'Label';
Label.propTypes = propTypes;
Label.defaultProps = defaultProps;
var _default = Label;
exports.default = _default;