import {Injectable, HttpService} from '@nestjs/common';
import {Cron} from '@nestjs/schedule';
import {ConfigService} from '@nestjs/config';
import {StatusService} from '../status/status.service';
import {MyLogger} from '../logger/my-logger.service';

@Injectable()
export class TasksService {
  private readonly logger = new MyLogger(TasksService.name);
  private readonly statusService = new StatusService(this.logger, new HttpService());
  private readonly configService = new ConfigService();

  @Cron('*/10 * * * * *', {
    name: 'cron_10',
  })
  handleCron() {
    this.logger.log('handleCron');
    const url = this.configService.get('baseUrl1');
    this.statusService.httpGet(url);
  }
}