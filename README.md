# citation-model [![NPM version][npm-image]][npm-url] 

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
