import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MyLogger } from '../logger/my-logger.service';
import Utils from '../common/utils';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  constructor(private readonly logger: MyLogger) {
    this.logger.setContext(ErrorsInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.getArgByIndex(0);
    const ip = Utils.getIp(req.ip);
    const startTime = Date.now();
    return next
      .handle()
      .pipe(
        catchError((err: Error) => {
          const time = (Date.now() - startTime) + 'ms';
          this.logger.error(`[request error]: ${ip},${req.method},${req.originalUrl},${time}`);
          this.logger.error(err.message, err.stack);
          return throwError(new BadGatewayException(err));
        }),
      );
  }
}
