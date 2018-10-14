const fs = require('fs');
const shelljs = require('shelljs');
if (fs.existsSync('./bin/index.js')) {
  shelljs.exec('wasm-pack-npm');
}
