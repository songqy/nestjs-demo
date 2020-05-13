import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { MyLogger } from './logger/my-logger.service';
import { ConfigService } from '@nestjs/config';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  const logger: MyLogger = new MyLogger('bootstrap');

  // 使用自定义的日志
  app.useLogger(logger);

  // 参数校验
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  // 获取配置
  const configService: ConfigService = app.get(ConfigService);

  const port = configService.get('port');
  await app.listen(port, () => {
    logger.log(`server listen on port: ${port}`);
  });
}
bootstrap();
