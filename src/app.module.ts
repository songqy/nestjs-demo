import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ScheduleModule} from '@nestjs/schedule';
import {StatusModule} from './status/status.module';
import configuration from './config/configuration';
import {TasksService} from './tasks/tasks.service';

@Module({
  imports: [
    StatusModule,
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: ['.env', '.env.dev', '.env.prod'],
    }),
    ScheduleModule.forRoot(),
    TasksService,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
