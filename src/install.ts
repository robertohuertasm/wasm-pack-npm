// tslint:disable:no-console
import os from 'os';
import { installUnix } from './installUnix';
import { installWindows } from './installWindows';

export function install() {
  const platform = os.platform();

  if (platform === 'win32') {
    installWindows();
  } else {
    installUnix();
  }
}
