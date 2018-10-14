import os from 'os';
import { install } from '../src/install';
import { installUnix } from '../src/installUnix';
import { installWindows } from '../src/installWindows';
jest.genMockFromModule('os');
jest.mock('os');
jest.mock('../src/installUnix');
jest.mock('../src/installWindows');

describe('install', () => {
  test('Windows installer is chosen if platform === win32', () => {
    os.platform = () => 'win32';
    install();
    expect(installWindows).toHaveBeenCalled();
  });

  test('Unix installer is chosen if platform !== win32', () => {
    os.platform = () => 'linux';
    install();
    expect(installUnix).toHaveBeenCalled();
  });
});
