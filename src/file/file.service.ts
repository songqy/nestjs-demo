import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { WriteFileOptions, PathLike } from 'fs';
import * as util from 'util';
import { MyLogger } from '../logger/my-logger.service';

const access = util.promisify(fs.access);
const mkdir = util.promisify(fs.mkdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readdir = util.promisify(fs.readdir);

@Injectable()
export class FileService {
  constructor(private readonly logger: MyLogger) {
    this.logger.setContext(FileService.name);
  }

  async write(path: string | Buffer | URL, data: any, options?: WriteFileOptions): Promise<void> {
    try {
      await writeFile(path, data, options);
      this.logger.log(path + ',The file has been saved!');
    } catch (err) {
      this.logger.error(err);
    }
  }

  async readFile(path: string | Buffer | URL): Promise<Buffer> {
    return await readFile(path);
  }

  async existsFile(path: PathLike): Promise<boolean> {
    let flag = true;
    await access(path).catch(() => {
      flag = false;
    });
    return flag;
  }

  async mkdir(path: string | Buffer | URL, options?: WriteFileOptions): Promise<void> {
    const flag = await this.existsFile(path);
    if (!flag) {
      await mkdir(path, options).catch(e => this.logger.error(e));
    }
  }

  async getFiles(path: string | Buffer | URL): Promise<string[]> {
    try {
      const files = await readdir(path);
      return files;
    } catch (e) {
      this.logger.error(e);
      return [];
    }
  }

}
