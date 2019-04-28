# wasm-pack-npm

[![NPM](https://nodei.co/npm/wasm-pack-npm.png)](https://nodei.co/npm/wasm-pack-npm/)

[![Build Status](https://travis-ci.org/robertohuertasm/wasm-pack-npm.svg?branch=master)](https://travis-ci.org/robertohuertasm/wasm-pack-npm)

Installs `wasm-pack` and all the needed dependencies so you can build `wasm` npm packages.

Check out the [wasm-pack documentation](https://rustwasm.github.io/wasm-pack/book/) if you want to know more.

## How to use it

Executing `npm i -g wasm-pack-npm` will automatically install `wasm-pack` and all the dependencies in your machine.

In case something goes wrong, you will be able to retry the installation by executing `wasm-pack-npm` in your terminal.

## Docker

If you plan to use it in `Docker` you'll have to set this in the `PATH`:

`export PATH=$HOME/.cargo/bin`

This is very important. If you don't use properly set the path the installation will fail.

## Development

While developing it is quite useful to use `npm start`. This will keep `tsc` compilling while you change the files.

## Tests

In order to execute the tests just run: `npm test`.

If you want to debug the tests and you're using `visual studio code` you'll find some `launch` settings that will help you with that:

- jest all: debugs all tests.
- jest current: only debugs the current selected test.
