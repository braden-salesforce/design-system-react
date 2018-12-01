"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _deprecatedProperty = require("../../utilities/warning/deprecated-property");

var _deprecatedProperty2 = _interopRequireDefault(_deprecatedProperty);

var _deprecatedPropertyValue = require("../../utilities/warning/deprecated-property-value");

var _deprecatedPropertyValue2 = _interopRequireDefault(_deprecatedPropertyValue);

var _isTriggerTabbable = require("../../utilities/warning/is-trigger-tabbable");

var _isTriggerTabbable2 = _interopRequireDefault(_isTriggerTabbable);

var _getComponentDoc = require("../../utilities/get-component-doc");

var _getComponentDoc2 = _interopRequireDefault(_getComponentDoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
var checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkProps(COMPONENT, props, jsonDoc) {
    var createDocUrl = (0, _getComponentDoc2.default)(jsonDoc);

    if (props.variant === 'base' && _react2.default.Children.count(props.children) !== 0) {
      (0, _isTriggerTabbable2.default)(COMPONENT, props.children, createDocUrl());
    } // Deprecated and changed to another property


    (0, _deprecatedPropertyValue2.default)(COMPONENT, {
      propAsString: 'variant',
      propValue: props.variant,
      deprecatedPropValue: 'info',
      replacementPropAsString: 'theme',
      replacementPropAsValue: 'info'
    }, createDocUrl('theme'));
    (0, _deprecatedPropertyValue2.default)(COMPONENT, {
      propAsString: 'variant',
      propValue: props.variant,
      deprecatedPropValue: 'error',
      replacementPropAsString: 'theme',
      replacementPropAsValue: 'error'
    }, createDocUrl('theme'));
    (0, _deprecatedProperty2.default)(COMPONENT, props.openByDefault, 'openByDefault', 'isOpen', createDocUrl('isOpen'));
    (0, _deprecatedProperty2.default)(COMPONENT, props.target, 'target', undefined, "A new positioning library is being implmented under the hood. Please trigger tooltips to appear on their triggers with `isOpen` and not on other DOM elements. ".concat(createDocUrl('isOpen')) // eslint-disable-line max-len
    );
    (0, _deprecatedProperty2.default)(COMPONENT, props.isInline, 'isInline', 'position="relative"', createDocUrl('position'));
  };
}

exports.default = checkProps;