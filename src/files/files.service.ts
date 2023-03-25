import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';

import * as fsp from 'fs/promises';
import * as path from 'path';
import { checkFileExists } from 'src/utils';

@Injectable()
export class FilesService {
  async createFile(file: {
    buffer: string | NodeJS.ArrayBufferView;
  }): Promise<string> {
    try {
      const fileName = `${uuid.v4()}.jpg`;
      const filePath = path.resolve(__dirname, '..', 'static');

      const fileExists = await checkFileExists(filePath);
      if (!fileExists) {
        await fsp.mkdir(filePath, { recursive: true });
      }

      await fsp.writeFile(path.join(filePath, fileName), file.buffer);

      return fileName;
    } catch (error) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
