"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icon = _interopRequireDefault(require("../../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var propTypes = {
  /*
   * Active descendant in menu
   */
  activeOption: _propTypes.default.object,

  /*
   * Index of active descendant in menu
   */
  activeOptionIndex: _propTypes.default.number,

  /**
   * CSS classes to be added to container `div` tag. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * CSS classes to be added to tag with `.slds-dropdown`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
  classNameMenu: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * CSS classes to be added to menu sub header `span` tag. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
  classNameMenuSubHeader: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Sets the dialog width to the width of one of the following:
   * `target`: (Menus attached to `input` typically follow this UX pattern),
   *  `menu`: Consider setting a menuMaxWidth if using this value. If not, width will be set to width of largest menu item.
   *  'none'
   */
  inheritWidthOf: _propTypes.default.oneOf(['target', 'menu', 'none']),

  /*
   * Id used for assistive technology
   */
  inputId: _propTypes.default.string,

  /**
   * Determines the height of the menu based on SLDS CSS classes.
   */
  itemVisibleLength: _propTypes.default.oneOf([5, 7, 10]),

  /**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `noOptionsFound`: Custom message that renders when no matches found. The default empty state is just text that says, 'No matches found.'.
   */
  labels: _propTypes.default.shape({
    noOptionsFound: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]).isRequired
  }),

  /**
   * Accepts a custom menu item rendering function that becomes a custom component and is passed in the following props:
   * * `assistiveText`: Object, `assistiveText` prop that is passed into Combobox
   * * `option`: Object, option data for item being rendered that is passed into Combobox
   * * `selected`: Boolean, allows rendering of `assistiveText.optionSelectedInMenu` in Readonly Combobox
   *
   * _Tested with snapshot testing._
   */
  onRenderMenuItem: _propTypes.default.func,

  /**
   * Accepts a ref function or object (React.createRef() or otherwise) to store the menu DOM reference once available
   */
  menuRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),

  /*
   * Sets a maximum width that the menu will be if `inheritWidthOf` is menu.
   */
  maxWidth: _propTypes.default.string,

  /*
   * Callback when option is selected with keyboard or mouse
   */
  onSelect: _propTypes.default.func,

  /*
   * Menu options
   */
  options: _propTypes.default.array,

  /*
   * Callback to remove active descendent
   */
  resetActiveOption: _propTypes.default.func,

  /*
   * Selected options
   */
  selection: _propTypes.default.array,

  /**
   * Acepts a tooltip that is displayed when hovering on disabled menu items.
   */
  tooltipMenuItemDisabled: _propTypes.default.element,

  /**
   * Changes styles of the menu option
   */
  variant: _propTypes.default.oneOf(['icon-title-subtitle', 'checkbox']),
  isSelected: _propTypes.default.func,
  assistiveText: _propTypes.default.object
};
var defaultProps = {
  menuRef: function menuRef() {}
};

var Menu = function Menu(props) {
  var maxWidth = props.inheritWidthOf === 'menu' ? 'inherit' : undefined;
  maxWidth = props.inheritWidthOf === 'menu' && props.maxWidth ? props.maxWidth : maxWidth; // .slds-dropdown sets the menu to absolute positioning, since it has a relative parent. Absolute positioning removes clientHeight and clientWidth which Popper.js needs to absolute position the menu's wrapping div. Absolute positioning an already absolute positioned element doesn't work. Setting the menu's position to relative allows PopperJS to work it's magic.

  var menuOptions = props.options.map(function (optionData, index) {
    var active = index === props.activeOptionIndex && (0, _lodash.default)(optionData, props.activeOption);
    var selected = props.isSelected({
      selection: props.selection,
      option: optionData
    });
    var MenuItem = props.onRenderMenuItem;

    if (optionData.type === 'separator') {
      return optionData.label ? _react.default.createElement("li", {
        className: "slds-dropdown__header slds-truncate",
        title: optionData.label,
        role: "separator",
        key: "menu-separator-".concat(optionData.id)
      }, _react.default.createElement("span", {
        className: (0, _classnames.default)('slds-listbox__option-header', props.classNameMenuSubHeader)
      }, optionData.label)) : _react.default.createElement("li", {
        className: "slds-has-divider_top-space",
        role: "separator",
        key: "menu-separator-".concat(optionData.id)
      });
    }

    var disabledProps = {};
    var tooltipId = "".concat(props.inputId, "-listbox-option-help-").concat(optionData.id);

    if (optionData.disabled && props.tooltipMenuItemDisabled && active) {
      disabledProps['aria-describedby'] = tooltipId;
    }

    if (optionData.disabled) {
      disabledProps['aria-disabled'] = !!optionData.disabled;
      disabledProps.style = {
        cursor: 'default'
      }; // Replace this with a css class name once SLDS has it.
    }

    var menuItem = {
      'icon-title-subtitle': _react.default.createElement("span", _extends({
        "aria-selected": active
      }, disabledProps, {
        id: "".concat(props.inputId, "-listbox-option-").concat(optionData.id),
        className: (0, _classnames.default)('slds-media slds-listbox__option', 'slds-listbox__option_entity slds-listbox__option_has-meta', {
          'slds-has-focus': active
        }),
        onClick: optionData.disabled ? null : function (event) {
          props.onSelect(event, {
            option: optionData
          });
        },
        role: "option"
      }), optionData.icon && !props.onRenderMenuItem ? _react.default.createElement("span", {
        className: "slds-media__figure"
      }, optionData.icon) : null, props.onRenderMenuItem ? _react.default.createElement(MenuItem, {
        assistiveText: props.assistiveText,
        selected: selected,
        option: optionData
      }) : _react.default.createElement("span", {
        className: "slds-media__body"
      }, _react.default.createElement("span", {
        className: (0, _classnames.default)('slds-listbox__option-text', 'slds-listbox__option-text_entity', {
          'slds-disabled-text': optionData.disabled
        })
      }, optionData.label), _react.default.createElement("span", {
        className: (0, _classnames.default)('slds-listbox__option-meta slds-listbox__option-meta_entity', {
          'slds-disabled-text': optionData.disabled
        })
      }, optionData.subTitle))),
      checkbox: _react.default.createElement("span", _extends({
        // eslint-disable-line jsx-a11y/no-static-element-interactions
        "aria-selected": active
      }, disabledProps, {
        id: "".concat(props.inputId, "-listbox-option-").concat(optionData.id),
        className: (0, _classnames.default)('slds-media slds-listbox__option', ' slds-listbox__option_plain slds-media_small slds-media_center', {
          'slds-has-focus': active,
          'slds-is-selected': selected
        }),
        onClick: optionData.disabled ? null : function (event) {
          props.onSelect(event, {
            selection: props.selection,
            option: optionData
          });
        },
        role: "option"
      }), _react.default.createElement("span", {
        className: "slds-media__figure"
      }, _react.default.createElement(_icon.default, {
        className: "slds-listbox__icon-selected",
        category: "utility",
        name: "check",
        size: "x-small"
      })), _react.default.createElement("span", {
        className: "slds-media__body"
      }, props.onRenderMenuItem ? _react.default.createElement(MenuItem, {
        assistiveText: props.assistiveText,
        selected: selected,
        option: optionData
      }) : _react.default.createElement("span", {
        className: (0, _classnames.default)('slds-truncate', {
          'slds-disabled-text': optionData.disabled
        }),
        title: optionData.label
      }, selected ? _react.default.createElement("span", {
        className: "slds-assistive-text"
      }, props.assistiveText.optionSelectedInMenu) : null, ' ', optionData.label)))
    };
    var item;

    if (optionData.disabled && props.tooltipMenuItemDisabled) {
      var _props$tooltipMenuIte = props.tooltipMenuItemDisabled.props,
          content = _props$tooltipMenuIte.content,
          userDefinedTooltipProps = _objectWithoutProperties(_props$tooltipMenuIte, ["content"]);

      var tooltipProps = _objectSpread({
        align: 'top',
        content: optionData.tooltipContent || content,
        // either use specific content defined on option or content defined on tooltip component.
        id: tooltipId,
        position: 'absolute',
        triggerStyle: {
          width: '100%'
        }
      }, userDefinedTooltipProps);

      if (active) {
        // allows showing the tooltip on keyboard navigation to disabled menu item
        tooltipProps.isOpen = true;
      }

      item = _react.default.cloneElement(props.tooltipMenuItemDisabled, tooltipProps, menuItem[props.variant]);
    } else {
      item = menuItem[props.variant];
    }

    return _react.default.createElement("li", {
      className: "slds-listbox__item",
      key: "menu-option-".concat(optionData.id),
      role: "presentation"
    }, item);
  });
  return _react.default.createElement("ul", {
    className: (0, _classnames.default)('slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid', {
      'slds-dropdown_length-with-icon-5': props.itemVisibleLength === 5,
      'slds-dropdown_length-with-icon-7': props.itemVisibleLength === 7,
      'slds-dropdown_length-with-icon-10': props.itemVisibleLength === 10
    }, props.classNameMenu),
    ref: props.menuRef,
    role: "presentation",
    style: {
      width: props.inheritWidthOf === 'menu' ? 'auto' : undefined,
      maxWidth: maxWidth,
      position: props.menuPosition !== 'relative' ? 'relative' : undefined
    }
  }, menuOptions.length ? menuOptions : _react.default.createElement("li", {
    className: "slds-listbox__item slds-listbox__status",
    role: "status",
    "aria-live": "polite"
  }, _react.default.createElement("span", {
    className: "slds-m-left_x-large slds-p-vertical_medium"
  }, props.labels.noOptionsFound)));
};

Menu.displayName = 'Menu';
Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;
var _default = Menu;
exports.default = _default;