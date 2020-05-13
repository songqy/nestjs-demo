import { Module, HttpModule, Global } from '@nestjs/common';
import { HttpRequest } from './http-request.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [HttpRequest],
  exports: [HttpRequest],
})

export class HttpRequestModule {}