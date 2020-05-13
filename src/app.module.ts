import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { StatusModule } from './status/status.module';
import configuration from './config/configuration';
import { TasksModule } from './tasks/tasks.module';
import { LoggerModule } from './logger/logger.module';
import { HttpRequestModule } from './http/http-request.module';
import { FileModule } from './file/file.module';
// import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    StatusModule,
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: ['.env', '.env.dev', '.env.prod'],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TasksModule,
    LoggerModule,
    HttpRequestModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes('');
//   }
// }
