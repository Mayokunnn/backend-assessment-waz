import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): {
    message: string;
    version: string;
    status: string;
    docs: string;
  } {
    return {
      message: 'E-commerce Backend API',
      version: '1.0.0',
      status: 'running',
      docs: '/api/docs',
    };
  }
}
