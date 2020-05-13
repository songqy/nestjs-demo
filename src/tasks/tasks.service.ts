import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { StatusService } from '../status/status.service';
import { MyLogger } from '../logger/my-logger.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly logger: MyLogger,
    private readonly configService: ConfigService,
    private readonly statusService: StatusService,
  ) {
    this.logger.setContext(TasksService.name);
  }

  @Cron('*/10 * * * * *', {
    name: 'cron_10',
  })
  handleCron() {
    const url = this.configService.get('baseUrl1');
    this.logger.log('handleCron,url:' + url);
    this.statusService.httpGet(url);
  }
}