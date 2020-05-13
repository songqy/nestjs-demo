import { Controller, Get, Query, Body, Post } from '@nestjs/common';
import * as path from 'path';
import { StatusService } from './status.service';
import { GetStatus, SetStatusDto } from './dto/get-status.dto';
import { MyLogger } from '../logger/my-logger.service';
import { ConfigService } from '@nestjs/config';
import { FileService } from '../file/file.service';

@Controller('status')
export class StatusController {
  constructor(
      private readonly statusService: StatusService,
      private readonly logger: MyLogger,
      private readonly configService: ConfigService,
      private readonly fileService: FileService,
  ) {
    this.logger.setContext(StatusController.name);
  }

  @Get()
  getStatus(@Query('s1') s1: number): GetStatus {
    const res: GetStatus = {
      name: this.statusService.getStatus(),
    };
    if (s1) {
      // this.logger.log('getStatus,s1' + s1);
      // this.logger.error('getStatus error,s1' + s1);
      res.s1 = s1;
    }
    return res;
  }

  @Post()
  setStatus(@Body() data: SetStatusDto): string {
    this.logger.log('setStatus');
    this.logger.log(data);
    return 'success';
  }

  @Get('crawler')
  async crawler(): Promise<string> {
    this.statusService.httpGet(this.configService.get('baseUrl1'));
    this.statusService.httpGet(this.configService.get('baseUrl2'));

    const url: string = path.join(__dirname, '../../tsconfig.json');
    const flag = await this.fileService.existsFile(url);
    this.logger.log('url:' + url + ',flag:' + flag);

    return 'success';
  }

}
