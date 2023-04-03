import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MyLogger } from '../logger/my-logger.service';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class HttpRequest {
  constructor(
    private readonly logger: MyLogger,
    private readonly httpService: HttpService,
  ) {
    this.logger.setContext(HttpRequest.name);
  }

  async httpGet(baseUrl: string, cnt = 1): Promise<any> {
    let res;
    try {
      res = await this.httpGetSingle(baseUrl);
      this.logger.log('res,' + baseUrl);
    } catch (e) {
      this.logger.log(`请求失败${cnt}次,url:${baseUrl}`);
      if (cnt < 5) {
        res = await this.httpGet(baseUrl, cnt + 1);
      } else {
        res = null;
      }
    }
    return res;
  }

  private async httpGetSingle(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const observable = this.httpService.get(url, config);
      observable.subscribe({
        next: (res) => {
          resolve(res.data);
        },
        error: (err) => {
          reject(err.message + ',' + url);
        },
      });
    });
  }
}
