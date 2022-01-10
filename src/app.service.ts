import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Voucher Star NEST.JS - REST API - 2022';
  }
}
