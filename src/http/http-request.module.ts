import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { HttpRequest } from './http-request.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [HttpRequest],
  exports: [HttpRequest],
})

export class HttpRequestModule {}