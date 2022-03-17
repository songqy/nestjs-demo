import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { StatusModule } from './status/status.module';
import configuration from './config/configuration';
// import { TasksModule } from './tasks/tasks.module';
import { LoggerModule } from './logger/logger.module';
import { HttpRequestModule } from './http/http-request.module';
import { FileModule } from './file/file.module';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { ErrorsInterceptor } from './interceptor/errors.interceptor';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { AllExceptionFilter } from './filter/all-exception.filter';

@Module({
  imports: [
    StatusModule,
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: ['.env', '.env.dev', '.env.prod'],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    // TasksModule,
    LoggerModule,
    HttpRequestModule,
    FileModule,
  ],
  controllers: [],
  // 注入拦截器和异常过滤器
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})

export class AppModule {}
