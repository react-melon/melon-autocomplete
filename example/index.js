/**
 * @file AutoComplete example
 * @author cxtom <cxtom2008@gmail.com>
 */

import React, {Component} from 'react';
import AutoComplete from '../src/index.js';
import ReactDOM from 'react-dom';
import jsonp from 'jsonp-es6';

import './index.styl';

class App extends Component {

    render() {
        return (
            <div>
                <AutoComplete dataSource={['苹果', '橘子']}/>
                <br />
                <AutoComplete
                    style={{marginLeft: '10em'}}
                    dataSource={value =>
                        jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', {
                            json: 1,
                            wd: value || ''
                        }, {
                            callback: 'cb'
                        }).then(
                            data => data.s
                        )
                    } />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
