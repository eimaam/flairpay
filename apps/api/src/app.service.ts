import { Injectable } from '@nestjs/common';
import { DatabaseService, DbHealthDto } from './core/database/database.service';

@Injectable()
export class AppService {
  constructor(
    private readonly databaseService: DatabaseService
  ) { }
  getHello(): string {
    return 'Hello World!';
  }

  async getHealth(): Promise<{
    success: boolean; message: string;
    data: {
      service: string,
      status: 'healthy' | 'unhealthy';
      timestamp: string
      db: DbHealthDto
    }
  }> {
    const dbHealth = this.databaseService.getHealth();

    return {
      success: true,
      message: 'API is running...',
      data: {
        service: 'FlairPay API',
        status: dbHealth.connected ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        db: dbHealth,
      },
    };
  }
}
