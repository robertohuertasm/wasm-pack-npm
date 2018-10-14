# wasm-pack-npm

[![NPM](https://nodei.co/npm/wasm-pack-npm.png)](https://nodei.co/npm/wasm-pack-npm/)

[![Build Status](https://travis-ci.org/robertohuertasm/wasm-pack-npm.svg?branch=master)](https://travis-ci.org/robertohuertasm/wasm-pack-npm)

Installs `wasm-pack` so you can build `wasm` npm packages.

## How to use it

`npm i -g wasm-pack-npm`

It will automatically install `wasm-pack` in your machine.

By running `wasm-pack-npm` you will be able to retry the installation in case something went wrong.

## TODO

[ ] Tests pending

[ ] Windows support

[x] Check Rust installation

[x] Check beta or nightly

[x] Check target wasm32-unknown-unknown

## Development

While developing it is quite useful to use `npm run start:dev`. This will keep `tsc` compilling while you change the files.
