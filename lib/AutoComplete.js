(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder);
        global.AutoComplete = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder) {
    'use strict';

    exports.__esModule = true;

    var _react2 = _interopRequireDefault(_react);

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
     * melon 选色器
     */

    var AutoComplete = function (_Component) {
        _inherits(AutoComplete, _Component);

        function AutoComplete(props, context) {
            _classCallCheck(this, AutoComplete);

            var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

            _this.state = _extends({}, _this.state);

            return _this;
        }

        /**
         * 渲染
         *
         * @public
         * @return {React.Element}
         */


        AutoComplete.prototype.render = function render() {
            return _react2['default'].createElement('div', { className: cx(this.props).build() });
        };

        return AutoComplete;
    }(_react.Component);

    exports['default'] = AutoComplete;


    AutoComplete.displayName = 'AutoComplete';

    AutoComplete.defaultProps = {};

    AutoComplete.propTypes = {};
});
//# sourceMappingURL=AutoComplete.js.map
