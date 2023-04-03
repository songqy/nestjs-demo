import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Stream from 'stream';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
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
      }),
    );
  }
}
