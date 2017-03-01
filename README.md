# melon-autocomplete

[![Build Status](https://travis-ci.org/react-melon/melon-autocomplete.svg?branch=master)](https://travis-ci.org/react-melon/melon-autocomplete)
[![Coverage Status](https://coveralls.io/repos/github/react-melon/melon-autocomplete/badge.svg?branch=master)](https://coveralls.io/github/react-melon/melon-autocomplete?branch=master)

## Usage

```js
import React from 'react';
import AutoComplete from 'melon-autocomplete';
import ReactDOM from 'react-dom';

import './index.styl';

ReactDOM.render(
    <AutoComplete />,
    document.getElementById('app')
);
```

## Setup

### webpack

1. please check out [this](https://github.com/react-melon/melon#如何在-webpack-中使用-melon) first.

2. `npm install -S melon-autocomplete`

### bower

1. `bower install -S melon-autocomplete`
2. config your `requirejs` / `esl`

    ```js
    require.config({
        paths: {
            'melon-autocomplete': 'bower_components/melon-autocomplete/lib/AutoComplete'
        }
    });
    ```

## API Document

check [this](https://doc.esdoc.org/github.com/react-melon/melon-autocomplete/) out

## Run the example

```sh
git clone git@github.com:react-melon/melon-autocomplete.git
cd melon-autocomplete
npm install
npm start
open http://localhost:8080/example
```
