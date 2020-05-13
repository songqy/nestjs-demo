import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { StatusModule } from './status/status.module';
import configuration from './config/configuration';
import { TasksService } from './tasks/tasks.service';
import { LoggerModule } from './logger/logger.module';
import { HttpRequestModule } from './http/http-request.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    StatusModule,
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: ['.env', '.env.dev', '.env.prod'],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TasksService,
    LoggerModule,
    HttpRequestModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
