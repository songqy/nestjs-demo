import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MyLogger} from './logger/my-logger.service';
import {ConfigService} from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  const logger: MyLogger = new MyLogger();
  logger.setContext('bootstrap');

  // 使用自定义的日志
  app.useLogger(logger);

  // 获取配置
  const configService: ConfigService = app.get(ConfigService);

  const port = configService.get('port');
  await app.listen(port, () => {
    logger.log(`server listen on port: ${port}`);
  });
}
bootstrap();
