import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';
import { MyLogger } from '../logger/my-logger.service';
import Utils from '../common/utils';

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
    const ip = Utils.getIp(req.ip);
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const time = Date.now() - startTime + 'ms';
        this.logger.log(
          `[request log]: ${ip},${req.method},${req.originalUrl},${time}`,
        );
      }),
    );
  }
}
