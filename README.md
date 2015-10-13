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

// this will inject a <style> block to the head containing the styles parsed like css-modulesify
// if the file ends in `m.less` it is supposed to contain css local by default
var styles = require('./some-less.file.m.less');

// then styles.t('some-class') // will retrieve the generated className for the provided className
// it will automatically register this module as a hot module to be reloaded by browserify-hmr
// make sure to include envify and set the NODE_ENV=development to do this only in dev mode
// check envify for more info about this
```

## License

[MIT](./LICENSE)

## Changelog

[Changelog](./changelog.md)
