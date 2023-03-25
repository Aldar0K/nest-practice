import * as fsp from 'fs/promises';

export const checkFileExists = async (path: string): Promise<boolean> =>
  !!(await fsp.stat(path).catch(() => false));
