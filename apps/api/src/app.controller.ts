import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DbHealthDto } from './core/database/database.service';

interface HealthResponseDto {
  success: boolean;
  message: string;
  data: {
    service: string;
    status: 'healthy' | 'unhealthy';
    timestamp: string;
    db: DbHealthDto;
    redis: { healthy: boolean }
  };
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  async getHealth(): Promise<HealthResponseDto> {
    const result: HealthResponseDto = await this.appService.getHealth()
    return result
  }
}
