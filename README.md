# wasm-pack-npm

[![NPM](https://nodei.co/npm/wasm-pack-npm.png)](https://nodei.co/npm/wasm-pack-npm/)

[![Build Status](https://travis-ci.org/robertohuertasm/wasm-pack-npm.svg?branch=master)](https://travis-ci.org/robertohuertasm/wasm-pack-npm)

Installs `wasm-pack` and all the needed dependencies so you can build `wasm` npm packages.

Check out the [wasm-pack documentation](https://rustwasm.github.io/wasm-pack/book/) if you want to know more.

## How to use it

Executing `npm i -g wasm-pack-npm` will automatically install `wasm-pack` and all the dependencies in your machine.

In case something goes wrog, you will be able to retry the installation by executing `wasm-pack-npm` in your terminal.

## TODO

[x] Tests pending

[ ] Windows support

[x] Check Rust installation

[x] Check beta or nightly

[x] Check target wasm32-unknown-unknown

## Development

While developing it is quite useful to use `npm start`. This will keep `tsc` compilling while you change the files.

## Tests

In order to execute the tests just run: `npm test`.

If you want to debug the tests and you're using `visual studio code` you'll find some `launch` settings that will help you with that:

- jest all: debugs all tests.
- jest current: only debugs the current selected test.
