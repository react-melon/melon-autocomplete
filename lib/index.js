(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', 'melon/TextBox', 'melon-layer', 'melon-listview', 'dom-align', 'react-motion', 'lodash/omit'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('melon/TextBox'), require('melon-layer'), require('melon-listview'), require('dom-align'), require('react-motion'), require('lodash/omit'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.TextBox, global.melonLayer, global.melonListview, global.domAlign, global.reactMotion, global.omit);
        global.index = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _TextBox, _melonLayer, _melonListview, _domAlign, _reactMotion, _omit) {
    'use strict';

    exports.__esModule = true;

    var _react2 = _interopRequireDefault(_react);

    var _TextBox2 = _interopRequireDefault(_TextBox);

    var _melonLayer2 = _interopRequireDefault(_melonLayer);

    var _melonListview2 = _interopRequireDefault(_melonListview);

    var _domAlign2 = _interopRequireDefault(_domAlign);

    var _omit2 = _interopRequireDefault(_omit);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var cx = (0, _cxBuilder.create)('AutoComplete');

    /**
     * Melon AutoComplete
     *
     * @class
     * @extends React.Component
     */

    var AutoComplete = function (_Component) {
        _inherits(AutoComplete, _Component);

        function AutoComplete(props, context) {
            _classCallCheck(this, AutoComplete);

            var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

            var rowHasChanged = props.rowHasChanged,
                getRowData = props.getRowData,
                value = props.value;


            _this.state = {
                open: false,
                closing: false,
                value: value,
                dataSource: new _melonListview2['default'].DataSource({
                    rowHasChanged: rowHasChanged,
                    getRowData: getRowData
                })
            };

            _this.onChange = _this.onChange.bind(_this);
            _this.onFocus = _this.onFocus.bind(_this);
            _this.renderLayer = _this.renderLayer.bind(_this);
            _this.onClickAway = _this.onClickAway.bind(_this);
            return _this;
        }

        AutoComplete.prototype.componentDidMount = function componentDidMount() {
            window.addEventListener('click', this.onClickAway);
        };

        AutoComplete.prototype.componentDidUpdate = function componentDidUpdate() {

            if (this.state.open && !this.state.closing && this.main) {

                if (!this.layer) {
                    return;
                }

                var _props = this.props,
                    mainArchor = _props.mainArchor,
                    layerArchor = _props.layerArchor;


                if (this.layer.offsetWidth < this.main.offsetWidth) {
                    this.layer.style.width = this.main.offsetWidth + 'px';
                }

                (0, _domAlign2['default'])(this.layer, this.main, {
                    points: [layerArchor, mainArchor],
                    overflow: {
                        adjustX: true,
                        adjustY: true
                    }
                });
            }
        };

        AutoComplete.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            if (Array.isArray(nextProps.dataSource)) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource)
                });
            }
        };

        AutoComplete.prototype.componentWillUnmount = function componentWillUnmount() {
            window.removeEventListener('click', this.onClickAway);
        };

        AutoComplete.prototype.onClickAway = function onClickAway(e) {
            if (this.state.open && this.main && this.layer && !this.layer.contains(e.target) && !this.main.contains(e.target)) {
                this.setState({ closing: true });
            }
        };

        AutoComplete.prototype.onFocus = function onFocus(e) {

            var onFocus = this.props.onFocus;

            if (onFocus) {
                onFocus(e);
            }

            this.onUpdate({
                value: e.target.state.value
            });
        };

        AutoComplete.prototype.onUpdate = function onUpdate(e) {
            var _this2 = this;

            var value = e.value;
            var dataSource = this.props.dataSource;

            var promise = Array.isArray(dataSource) ? Promise.resolve(dataSource) : dataSource(value);

            this.setState({ value: value });

            promise.then(function (data) {

                var newState = {
                    dataSource: _this2.state.dataSource.cloneWithRows(data)
                };

                if (data.length <= 0 && _this2.state.open) {
                    newState.closing = true;
                } else if (data.length > 0) {
                    newState.open = true;
                }

                _this2.setState(newState);
            });
        };

        AutoComplete.prototype.onChange = function onChange(e) {

            var onChange = this.props.onChange;

            if (onChange) {
                onChange(e);
            }

            this.onUpdate({ value: e.value });
        };

        AutoComplete.prototype.renderLayerContent = function renderLayerContent() {
            var _this3 = this;

            var _props2 = this.props,
                _renderRow = _props2.renderRow,
                getRowKey = _props2.getRowKey,
                getRowValue = _props2.getRowValue;


            return _react2['default'].createElement(_melonListview2['default'], {
                className: cx.getPartClassName('list'),
                dataSource: this.state.dataSource,
                renderRow: function renderRow() {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    return _react2['default'].createElement(
                        'div',
                        {
                            onClick: function onClick() {
                                _this3.setState({
                                    value: getRowValue.apply(undefined, args),
                                    closing: true
                                });
                            },
                            key: getRowKey.apply(undefined, args),
                            className: cx.getPartClassName('list-item') },
                        _renderRow.apply(undefined, args)
                    );
                } });
        };

        AutoComplete.prototype.renderLayer = function renderLayer() {
            var _this4 = this;

            var _state = this.state,
                open = _state.open,
                closing = _state.closing;

            var begin = open && !closing ? 0 : 1;
            var end = open && !closing ? 1 : 0;

            var className = cx({ size: this.props.size }).part('popup').build();

            return _react2['default'].createElement(
                _reactMotion.Motion,
                {
                    defaultStyle: {
                        opacity: begin,
                        scale: begin
                    },
                    style: {
                        opacity: (0, _reactMotion.spring)(end),
                        scale: (0, _reactMotion.spring)(end, { stiffness: 260, damping: 20 })
                    },
                    onRest: function onRest() {
                        if (open && closing) {
                            _this4.setState({ open: false, closing: false });
                        }
                    } },
                function (_ref) {
                    var scale = _ref.scale,
                        opacity = _ref.opacity;
                    return _react2['default'].createElement(
                        'div',
                        {
                            className: className,
                            style: {
                                opacity: opacity,
                                WebkitTransform: 'scale(1, ' + scale + ')',
                                MozTransform: 'scale(1, ' + scale + ')',
                                msTransform: 'scale(1, ' + scale + ')',
                                transform: 'scale(1, ' + scale + ')'
                            },
                            ref: function ref(layer) {
                                _this4.layer = layer;
                            } },
                        _this4.renderLayerContent()
                    );
                }
            );
        };

        AutoComplete.prototype.render = function render() {
            var _this5 = this;

            var props = this.props;

            var _state2 = this.state,
                value = _state2.value,
                open = _state2.open,
                closing = _state2.closing;


            var textboxProps = (0, _omit2['default'])(props, ['renderRow', 'layerArchor', 'mainArchor', 'getRowKey', 'component', 'dataSource', 'getRowValue', 'style']);

            return _react2['default'].createElement(
                'div',
                {
                    style: props.style,
                    className: cx(this.props).build(),
                    ref: function ref(main) {
                        _this5.main = main;
                    } },
                _react2['default'].createElement(_TextBox2['default'], _extends({}, textboxProps, {
                    onFocus: this.onFocus,
                    value: value,
                    onChange: this.onChange })),
                _react2['default'].createElement(_melonLayer2['default'], {
                    useLayerMask: false,
                    open: open || closing,
                    render: this.renderLayer })
            );
        };

        return AutoComplete;
    }(_react.Component);

    exports['default'] = AutoComplete;


    var archor = _react.PropTypes.oneOf(['tl', 'tc', 'tr', 'cl', 'cc', 'cr', 'bl', 'bc', 'br']);

    AutoComplete.displayName = 'AutoComplete';

    AutoComplete.defaultProps = _extends({}, _TextBox2['default'].defaultProps, _melonListview2['default'].defaultProps, {
        layerArchor: 'tl',
        mainArchor: 'bl',
        renderRow: function renderRow(rowData, index, total) {
            return rowData;
        },
        getRowKey: function getRowKey(rowData, index, total) {
            return index;
        },
        getRowValue: function getRowValue(rowData, index, total) {
            return rowData;
        }
    });

    AutoComplete.propTypes = _extends({}, AutoComplete.propTypes, _melonListview2['default'].propTypes, {
        dataSource: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.array]),
        getRowKey: _react.PropTypes.func,
        getRowValue: _react.PropTypes.func,
        layerArchor: archor,
        mainArchor: archor
    });
});
//# sourceMappingURL=index.js.map
