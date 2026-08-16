import { Injectable } from '@nestjs/common';
import { DatabaseService, DbHealthDto } from './core/database/database.service';
import { RedisService } from './core/redis/redis.service';

@Injectable()
export class AppService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly redisService: RedisService
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
      db: DbHealthDto,
      redis: { healthy: boolean }
    }
  }> {
    const dbHealth = this.databaseService.getHealth();
    const redisHealth = await this.redisService.isHealthy()
    

    return {
      success: true,
      message: 'API is running...',
      data: {
        service: 'FlairPay API',
        status: dbHealth.connected ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        db: dbHealth,
        redis: {
          healthy: redisHealth
        }
      },
    };
  }
}
