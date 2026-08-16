import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { REDIS_CLIENT } from './redis.constants';
import { AppConfigModule, AppConfigService } from '../config';
import Redis from 'ioredis';
import { AppLoggerService } from '../logger/logger.service';
import { AppLoggerModule } from '../logger/logger.module';

@Global()
@Module({
  imports: [AppConfigModule, AppLoggerModule],
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => {
        const redisOptions: Record<string, any> = {
          host: config.redis?.host,
          port: config.redis?.port,
          db: config.redis?.db,
          lazyConnect: true,
          maxRetriesPerRequest: 3,
        };

        if (config.redis?.username) {
          redisOptions.username = config.redis.username;
        }

        if (config.redis?.password) {
          redisOptions.password = config.redis.password;
        }

        return new Redis(redisOptions);
      },
    },
    RedisService,
  ],
  exports: [REDIS_CLIENT, RedisService],
})
export class RedisModule {}
