import chalk from 'chalk';
import { platform } from 'os';

const wrong = chalk.bold.white.bgRed;
const right = chalk.bold.green.inverse;
const normal = chalk.greenBright;

// ✨ ⭐️ ⭐️ ✅ ⚠️ ❌
export const messages = {
  rustInstalling: normal(`${emoji('⌛', '⭐️')}  Installing Rust...`),
  rustAlreadyInstalled: normal(
    `${emoji(
      '😊',
      '✅',
    )}  It seems that Rust is already installed in your machine.`,
  ),
  wasmpackInstalling: normal(`${emoji('⌛', '⭐️')}  Installing wasm-pack...`),
  wasmpackAlreadyInstalled: normal(
    `${emoji(
      '😊',
      '✅',
    )}  It seems that Wasm-Pack is already installed in your machine.`,
  ),
  error: wrong(`${emoji('😔', '❌')}  Something went wrong:`),
  setNightly: chalk.red(
    `${emoji('🍸', '⭐️')}  Setting nigthly as default toolchain...`,
  ),
  setWasm32: chalk.yellow(
    `${emoji('🍺', '⭐️')}  Installing target wasm32-unknown-unknown...`,
  ),
  cargoGenerateInstalling: chalk.blue(
    `${emoji('🍹', '⭐️')}  Installing cargo-generate for you...`,
  ),
  final: right(
    `${emoji(
      '🎉',
      '✅',
    )}  Everything is set up. You can start building your Wasm packages right away!`,
  ),
};

function emoji(unix: string, windows: string): string {
  return platform() === 'win32' ? windows : unix;
}
