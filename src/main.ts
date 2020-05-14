import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { MyLogger } from './logger/my-logger.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  const logger: MyLogger = new MyLogger('bootstrap');

  // 使用自定义的日志
  app.useLogger(logger);

  // 参数校验
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // 获取配置
  const configService: ConfigService = app.get(ConfigService);

  const port = configService.get('port');
  await app.listen(port, () => {
    logger.log(`server listen on port: ${port}`);
  });

  // 全局错误处理
  process.on('uncaughtException', (err: Error) => {
    logger.error(err.message, err.stack);
  });

  process.on('unhandledRejection', (reason, p: Promise<any>) => {
    p.catch((err: Error) => {
      logger.error(err.message, err.stack);
    });
  });
}
bootstrap();
