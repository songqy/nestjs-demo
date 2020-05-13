import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Request } from 'express';
import * as Stream from 'stream';
import { MyLogger } from '../logger/my-logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: MyLogger) {
    this.logger.setContext(LoggingInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.getArgByIndex(0);

    // if (req.originalUrl === '/favicon.ico') {
    //   return;
    // }
    let ip = req.ip.indexOf('::ffff:') !== -1
      ? req.ip.substr(7)
      : req.ip;
    ip = ip.indexOf('::1') !== -1
      ? '127.0.0.1'
      : ip;
    const startTime = Date.now();

    // TOOD 异常处理
    return next
      .handle()
      .pipe(
        tap(() => {
          const time = (Date.now() - startTime) + 'ms';
          this.logger.log(`[request log]: ${ip},${req.method},${req.originalUrl},${time}`);
        }),
        map((res) => {
          if (typeof res === 'object' && !(res instanceof Stream)) {
            return {
              statusCode: 200,
              success: true,
              data: res,
              message: null,
            };
          }
          return res;
        })
      );
  }
}