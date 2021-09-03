# citation-model [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

node package that make a model around citations files. One can generate and update citations files (CITATION.cff and codemeta.json) using this package.

## Installation

```console
$ npm install --save citation-model
```

## Usage

One ca use the CLI to create or update the files

```console

$ citation-model cff
```

Or 

```js
import {Cff, CodeMeta} from 'citation-model';

    const codeMeta = new CodeMeta();
    codeMeta.generateFromNode()

```
## License

MIT © [Kristian Garza](github.com/kjgarza)


[npm-image]: https://badge.fury.io/js/citation-model.svg
[npm-url]: https://npmjs.org/package/citation-model
[travis-image]: https://travis-ci.com/kjgarza/citation-model.svg?branch=master
[travis-url]: https://travis-ci.com/kjgarza/citation-model
[daviddm-image]: https://david-dm.org/kjgarza/citation-model.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/kjgarza/citation-model



# file-loader

**DEPRECATED for v5**: please consider migrating to [`asset modules`](https://webpack.js.org/guides/asset-modules/).

The `file-loader` resolves `import`/`require()` on a file into a url and emits the file into the output directory.

## Getting Started

To begin, you'll need to install `file-loader`:

```console
$ npm install file-loader --save-dev
```

Import (or `require`) the target file(s) in one of the bundle's files:

**file.js**

```js
import img from './file.png';
```

Then add the loader to your `webpack` config. For example:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};
```

And run `webpack` via your preferred method. This will emit `file.png` as a file
in the output directory (with the specified naming convention, if options are
specified to do so) and returns the public URI of the file.

> ℹ️ By default the filename of the resulting file is the hash of the file's contents with the original extension of the required resource.

