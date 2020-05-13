import { Injectable } from '@nestjs/common';
import { MyLogger } from '../logger/my-logger.service';
import { HttpRequest } from '../http/http-request.service';

@Injectable()
export class StatusService {
  constructor(
    private readonly logger: MyLogger,
    private readonly httpRequest: HttpRequest
  ) {
    this.logger.setContext(StatusService.name);
  }

  getStatus(): string {
    return 'status Ok';
  }

  async httpGet(baseUrl: string): Promise<any> {
    const res = await this.httpRequest.httpGet(baseUrl);
    return res;
  }
}
