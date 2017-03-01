/**
 * @file AutoComplete
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {PropTypes, Component} from 'react';

import {create} from 'melon-core/classname/cxBuilder';
import TextBox from 'melon/TextBox';
import Layer from 'melon-layer';
import ListView from 'melon-listview';
import align from 'dom-align';

import {
    Motion,
    spring
} from 'react-motion';

import omit from 'lodash/omit';

const cx = create('AutoComplete');

/**
 * Melon AutoComplete
 *
 * @class
 * @extends React.Component
 */
export default class AutoComplete extends Component {

    constructor(props, context) {

        super(props, context);

        const {
            rowHasChanged,
            getRowData,
            value
        } = props;

        this.state = {
            open: false,
            closing: false,
            value,
            dataSource: new ListView.DataSource({
                rowHasChanged,
                getRowData
            })
        };

        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.renderLayer = this.renderLayer.bind(this);
        this.onClickAway = this.onClickAway.bind(this);
    }

    componentDidMount() {
        window.addEventListener('click', this.onClickAway);
    }

    componentDidUpdate() {

        if (this.state.open && this.main) {

            this.layerWidth = `${this.main.clientWidth}px`;

            if (!this.layer) {
                return;
            }

            let {
                mainArchor,
                layerArchor
            } = this.props;

            align(
                this.layer,
                this.main,
                {
                    points: [layerArchor, mainArchor],
                    overflow: {
                        adjustX: true,
                        adjustY: true
                    }
                }
            );
        }

    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onClickAway);
    }

    onClickAway(e) {
        if (this.state.open && this.main && this.layer
            && !this.layer.contains(e.target)
            && !this.main.contains(e.target)
        ) {
            this.setState({closing: true});
        }
    }

    onFocus(e) {

        const onFocus = this.props.onFocus;

        if (onFocus) {
            onFocus(e);
        }

        this.onUpdate({
            value: e.target.state.value
        });

    }

    onUpdate(e) {

        const value = e.value;
        const dataSource = this.props.dataSource;

        const promise = Array.isArray(dataSource)
            ? Promise.resolve(dataSource)
            : dataSource(value);

        this.setState({value});

        promise.then(data => {

            const newState = {
                dataSource: this.state.dataSource.cloneWithRows(data)
            };

            if (data.length <= 0 && this.state.open) {
                newState.closing = true;
            }
            else if (data.length > 0) {
                newState.open = true;
            }

            this.setState(newState);
        });
    }

    onChange(e) {

        const onChange = this.props.onChange;

        if (onChange) {
            onChange(e);
        }

        const {open, closing} = this.state;

        if (!open || closing) {
            return;
        }

        this.onUpdate({value: e.value});
    }

    renderLayerContent() {

        const {
            renderRow,
            getRowKey,
            getRowValue
        } = this.props;

        return (
            <ListView
                className={cx.getPartClassName('list')}
                dataSource={this.state.dataSource}
                renderRow={(...args) =>
                    <div
                        onClick={() => {
                            this.setState({
                                value: getRowValue(...args),
                                closing: true
                            });
                        }}
                        key={getRowKey(...args)}
                        className={cx.getPartClassName('list-item')}>
                        {renderRow(...args)}
                    </div>
                }/>
        );
    }

    renderLayer() {

        let {open, closing} = this.state;
        let begin = open && !closing ? 0 : 1;
        let end = open && !closing ? 1 : 0;

        const className = cx({size: this.props.size}).part('popup').build();

        return (
            <Motion
                defaultStyle={{
                    opacity: begin,
                    scale: begin
                }}
                style={{
                    opacity: spring(end),
                    scale: spring(end, {stiffness: 260, damping: 20})
                }}
                onRest={() => {
                    if (open && closing) {
                        this.setState({open: false, closing: false});
                    }
                }}>
                {({scale, opacity}) => (
                    <div
                        className={className}
                        style={{
                            opacity: opacity,
                            WebkitTransform: `scale(1, ${scale})`,
                            MozTransform: `scale(1, ${scale})`,
                            msTransform: `scale(1, ${scale})`,
                            transform: `scale(1, ${scale})`,
                            width: this.layerWidth
                        }}
                        ref={layer => {
                            this.layer = layer;
                        }}>
                        {this.renderLayerContent()}
                    </div>
                )}
            </Motion>
        );

    }


    /**
     * 渲染
     *
     * @public
     * @return {React.Element}
     */
    render() {

        const props = this.props;

        const {
            value,
            open,
            closing
        } = this.state;

        const textboxProps = omit(
            props,
            [
                'renderRow', 'layerArchor',
                'mainArchor', 'getRowKey',
                'component', 'dataSource',
                'getRowValue'
            ]
        );

        return (
            <div
                className={cx(this.props).build()}
                ref={main => {
                    this.main = main;
                }}>
                <TextBox
                    {...textboxProps}
                    onFocus={this.onFocus}
                    value={value}
                    onChange={this.onChange} />
                <Layer
                    useLayerMask={false}
                    open={open || closing}
                    render={this.renderLayer} />
            </div>
        );
    }

}

let archor = PropTypes.oneOf([
    'tl', 'tc', 'tr',
    'cl', 'cc', 'cr',
    'bl', 'bc', 'br'
]);

AutoComplete.displayName = 'AutoComplete';

AutoComplete.defaultProps = {
    ...TextBox.defaultProps,
    ...ListView.defaultProps,
    layerArchor: 'bl',
    mainArchor: 'tl',
    renderRow(rowData, index, total) {
        return rowData;
    },
    getRowKey(rowData, index, total) {
        return index;
    },
    getRowValue(rowData, index, total) {
        return rowData;
    }
};

AutoComplete.propTypes = {
    ...AutoComplete.propTypes,
    ...ListView.propTypes,
    dataSource: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.array
    ]),
    getRowKey: PropTypes.func,
    getRowValue: PropTypes.func,
    layerArchor: archor,
    mainArchor: archor
};
