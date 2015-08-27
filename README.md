[![NPM Version](http://img.shields.io/npm/v/simplessy.svg?style=flat)](https://npmjs.org/package/simplessy)
[![Build Status](http://img.shields.io/travis/royriojas/simplessy.svg?style=flat)](https://travis-ci.org/royriojas/simplessy)

# simplessy
A transform to require less files and process the result with autoprefixer

## Install

```bash
npm i --save simplessy
```

## Usage

In code

```javascript
var b = browserify();

var simplessy = require('simplessy');

// regular way to include it
b.transform(simplessy);
// make it global
b.transform({ global: true}, simplessy);
```

or in the `package.json` file

```javascript
{
  "browserify" : {
    "transforms": [
      "simplessy"
    ]
  }
}
```

Then in your code

```javascript
// this will inject a <style> block to the head containing the styles
require('./some-less-file.less');
// TODO: make it return a list of styles like css-modulesify
```

## License

[MIT](./LICENSE)

## Changelog

[Changelog](./changelog.md)
