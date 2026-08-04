import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  getHealth(): {
    success: boolean; message: string; timestamp: string, data: {
      service: string,
      status: string
    }
  } {
    return {
      success: true,
      message: 'API is running...',
      timestamp: new Date().toISOString(),
      data: {
        service: 'FlairPay API',
        status: 'operational',
      },
    };
  }
}
