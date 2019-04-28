import shelljs from 'shelljs';

import { install } from '../src/install';
import { messages as msg } from '../src/messages';

jest.genMockFromModule('shelljs');
const mockShell = jest.mock('shelljs');

describe('Install test', () => {
  let log: jest.SpyInstance;
  let logErr: jest.SpyInstance;
  beforeEach(() => {
    const empty = () => void 0;
    log = jest.spyOn(console, 'log').mockImplementation(empty);
    logErr = jest.spyOn(console, 'error').mockImplementation(empty);
  });

  describe('Initial checks with previous installation', () => {
    beforeEach(() => {
      mockShell
        .spyOn(shelljs, 'exec')
        .mockImplementation((_command: string) => {
          return {
            stdout: 'ok',
            code: 0,
          };
        });
      mockShell.spyOn(shelljs, 'which').mockImplementation(x => x);
    });

    afterAll(() => {
      mockShell.clearAllMocks();
    });

    test('the program checks if rust is already installed', () => {
      install();
      expect(shelljs.which).toHaveBeenCalledWith('rustup');
    });

    test('the program checks if wasm-pack is already installed', () => {
      install();
      expect(shelljs.which).toHaveBeenCalledWith('wasm-pack');
    });

    test('the program shows a message if rust is already installed', () => {
      install();
      expect(log).toHaveBeenCalledWith(msg.rustAlreadyInstalled);
    });

    test('the program shows a message if wasm-pack is already installed', () => {
      install();
      // tslint:disable-next-line:no-console
      expect(log).toHaveBeenCalledWith(msg.wasmpackAlreadyInstalled);
    });

    test('the program shows a final message on finish', () => {
      install();
      const calls = log.mock.calls.length;
      expect(calls).toBeGreaterThan(0);
      expect(log.mock.calls[calls - 1][0]).toEqual(msg.final);
    });
  });

  describe('Not previous Rust installation with errors', () => {
    beforeEach(() => {
      mockShell
        .spyOn(shelljs, 'exec')
        .mockImplementation((_command: string) => {
          return {
            stdout: '',
            stderr: 'Error',
            code: 1,
          };
        });
      mockShell.spyOn(shelljs, 'which').mockImplementation(() => null);
    });

    afterAll(() => {
      mockShell.clearAllMocks();
    });

    test('the program shows a message if rust is not installed', () => {
      install();
      // tslint:disable-next-line:no-console
      expect(console.log).toHaveBeenCalledWith(msg.rustInstalling);
    });

    test('the program aborts if rust installation fails', () => {
      install();
      expect(logErr).toHaveBeenCalledWith(msg.error, 'Error');
      expect(shelljs.exec).not.toHaveBeenNthCalledWith(
        4,
        'rustup default nightly',
      );
    });
  });

  describe('Not previous wasm-pack installation with errors', () => {
    let exec: jest.Mock;
    beforeEach(() => {
      exec = mockShell
        .spyOn(shelljs, 'exec')
        .mockImplementation((_command: string) => {
          return {
            stdout: '',
            stderr: 'Error',
            code: 1,
          };
        });

      mockShell.spyOn(shelljs, 'which').mockImplementation(x => x === 'rustup');
    });

    afterAll(() => {
      mockShell.clearAllMocks();
    });

    test('the program shows a message if wasm-pack is not installed', () => {
      install();
      expect(log).toHaveBeenCalledWith(msg.wasmpackInstalling);
    });

    test('the program aborts if wasm-pack installation fails', () => {
      install();
      expect(logErr).toHaveBeenCalledWith(msg.error, 'Error');
      expect(exec).not.toHaveBeenNthCalledWith(3, 'rustup default nightly');
    });
  });

  describe('Not previous wasm-pack installation without errors', () => {
    let exec: jest.Mock;
    beforeEach(() => {
      exec = mockShell
        .spyOn(shelljs, 'exec')
        .mockImplementation((_command: string) => {
          return {
            stdout: 'ok',
            stderr: null,
            code: 0,
          };
        });
      mockShell.spyOn(shelljs, 'which').mockImplementation(x => x === 'rustup');
    });

    afterAll(() => {
      mockShell.clearAllMocks();
    });

    test('the program shows a message if wasm-pack is not installed', () => {
      install();
      expect(log).toHaveBeenCalledWith(msg.wasmpackInstalling);
    });

    test('the program starts installing wasm-pack', () => {
      install();
      expect(exec.mock.calls[0][0]).toContain('rustwasm.github.io/wasm-pack');
    });

    // test('after wasm-pack installation nightly is set up', () => {
    //   install();
    //   expect(exec.mock.calls[2][0]).toContain('rustup default nightly');
    // });

    // test('after wasm-pack installation nightly is set up', () => {
    //   install();
    //   expect(exec.mock.calls[3][0]).toContain('wasm32-unknown-unknown');
    // });

    // test('after wasm-pack installation nightly is set up', () => {
    //   install();
    //   expect(exec.mock.calls[4][0]).toContain('cargo install cargo-generate');
    // });
  });

  describe('Error in OutPutReturnValue', () => {
    beforeEach(() => {
      mockShell
        .spyOn(shelljs, 'exec')
        .mockImplementation((_command: string) => {
          return {
            stdout: '',
            stderr: 'Error',
          };
        });
      mockShell.spyOn(shelljs, 'which').mockImplementation(() => null);
    });

    afterAll(() => {
      mockShell.clearAllMocks();
    });

    test('the program panics if the OutPutReturnValue is not correct', () => {
      expect(() => install()).toThrowError(
        'Expected a shelljs.ExecOutputReturnValue but found a ChildProcess instead',
      );
    });
  });
});
