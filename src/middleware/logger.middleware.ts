import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { MyLogger } from '../logger/my-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: MyLogger) {
    this.logger.setContext(LoggerMiddleware.name);
  }

  use(req: Request, res: Response, next: () => void) {
    this.logger.log('LoggerMiddleware');
    next();
  }
}
