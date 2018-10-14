import shelljs from 'shelljs';
import { installUnix } from '../src/installUnix';
// import { messages as msg } from '../src/messages';

jest.genMockFromModule('shelljs');
const mockShell = jest.mock('shelljs');

describe('install Unix', () => {
  beforeEach(() => {
    spyOn(console, 'log');
  });

  test('the program checks if wasm-pack is already installed', () => {
    mockShell.spyOn(shelljs, 'which');
    installUnix();
    expect(shelljs.which).toHaveBeenCalledWith('wasm-pack');
  });

  // test('the program shows a message if wasm-pack is already installed', () => {
  //   shelljs.which = (() => 'something') as any;
  //   installUnix();
  //   // tslint:disable-next-line:no-console
  //   expect(console.log).toHaveBeenCalledWith(msg.wasmpackAlreadyInstalled);
  // });

  // test('the program aborts if wasm-pack is already installed', () => {
  //   shelljs.which = (() => 'something') as any;
  //   installUnix();
  //   // tslint:disable-next-line:no-console
  //   expect(console.log).not.toHaveBeenCalledWith(msg.wasmpackInstalling);
  // });

  // test('the program tries to install wasm-pack if not already installed', () => {
  //   shelljs.which = (() => null) as any;
  //   installUnix();
  //   // tslint:disable-next-line:no-console
  //   expect(console.log).toHaveBeenCalledWith(msg.wasmpackInstalling);
  // });

  // test('the program shows an error if installation goes wrong', () => {
  //   shelljs.which = (() => null) as any;
  //   installUnix();
  //   expect(consolelogSpy.calls.length).toEqual(1);
  //   expect(consolelogSpy.calls[0]).toEqual(errorMsg);
  // });
});
