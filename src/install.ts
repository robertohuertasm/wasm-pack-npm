// tslint:disable:no-console
import { ChildProcess } from 'child_process';
import shelljs, { ExecOutputReturnValue } from 'shelljs';
import { messages as msg } from './messages';

let _isCurlInstalled: boolean | undefined;

enum Installer {
  Rust,
  WasmPack,
}

export function install(): void {
  if (!execInstaller(Installer.Rust)) {
    return;
  }

  if (!execInstaller(Installer.WasmPack)) {
    return;
  }

  execCommand('rustup default nightly', msg.setNightly);
  execCommand(
    'rustup target add wasm32-unknown-unknown --toolchain nightly',
    msg.setWasm32,
  );
  execCommand('cargo install cargo-generate', msg.cargoGenerateInstalling);
  console.log(msg.final);
}

function execInstaller(installer: Installer): boolean {
  const isRust = installer === Installer.Rust;
  const check = isRust ? 'rustup' : 'wasm-pack';
  if (!!shelljs.which(check)) {
    console.log(
      isRust ? msg.rustAlreadyInstalled : msg.wasmpackAlreadyInstalled,
    );
    return true;
  }
  const command = isRust
    ? getRustInstallerCommand()
    : getWasmPackInstallerCommand();
  const message = isRust ? msg.rustInstalling : msg.wasmpackInstalling;
  const xInstall = execCommand(command, message);
  if (isOutputOk(xInstall)) {
    const successCommand = isRust ? 'rustc --version' : 'wasm-pack -V';
    logSuccess(execCommand(successCommand));
    return true;
  } else {
    logError(xInstall);
    return false;
  }
}

function execCommand(command: string, message?: string): ExecOutputReturnValue {
  if (message) {
    console.log(message);
  }
  const xCommand = shelljs.exec(command, { silent: true });
  if (isOutputReturnValue(xCommand)) {
    return xCommand;
  }
  throw new Error(
    'Expected a shelljs.ExecOutputReturnValue but found a ChildProcess instead',
  );
}

function getWasmPackInstallerCommand(): string {
  const installUrl = 'https://rustwasm.github.io/wasm-pack/installer/init.sh';
  return getCommand(installUrl);
}

function getRustInstallerCommand(): string {
  const installUrl = 'https://sh.rustup.rs';
  return getCommand(installUrl, '-s -- -y');
}

function getCommand(url: string, extraParams: string = ''): string {
  return isCurlInstalled()
    ? `curl ${url} -sSf | sh ${extraParams}`
    : `wget -q -O- ${url} | sh ${extraParams}`;
}

function isCurlInstalled(): boolean {
  if (_isCurlInstalled === undefined) {
    _isCurlInstalled = shelljs.exec('command -v curl').stdout !== '';
  }
  return _isCurlInstalled;
}

function isOutputReturnValue(
  x: ExecOutputReturnValue | ChildProcess,
): x is ExecOutputReturnValue {
  return (x as ExecOutputReturnValue).code !== undefined;
}

function isOutputOk(output: ExecOutputReturnValue): boolean {
  return output.code === 0 && !!output.stdout;
}

function logError(output: ExecOutputReturnValue): void {
  console.error(msg.error, output.stderr);
}

function logSuccess(output: ExecOutputReturnValue): void {
  const out = output.stdout.toString().replace('\n', '');
  console.log(`🚀  ${out} is now installed! 👏 👏 👏`);
}
