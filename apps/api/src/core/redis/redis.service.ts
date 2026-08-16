import { Inject, Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { CACHE_CONSTANTS, CACHE_TTL, REDIS_CLIENT } from './redis.constants';
import Redis from 'ioredis';
import { AppLoggerService } from '../logger/logger.service';

@Injectable()
export class RedisService implements OnApplicationBootstrap, OnApplicationShutdown {
    constructor(
        @Inject(REDIS_CLIENT)
        private readonly client: Redis,
        
        private readonly logger: AppLoggerService
        
    ){}

    /**
     * check redis client health
     * @returns boolean - true meaning its healthy and false pointing to not healthy
     */
    async isHealthy():Promise<boolean>{
        try {
            
            const result = await this.client.ping()
    
            return result === "PONG"
        } catch (error) {
            this.logger.error("Redis' unhealthy", error)
            return false
        }
    }

    /**
     * start redis once application bootstraps/starts
     * confirm the status before connecting
     */
    async onApplicationBootstrap() {
        console.log("client ==>", this.client)
        try {
            if (this.client.status === "wait"){
                await this.client.connect()
            }

            this.logger.info("Redis connected successfully")

        } catch (error) {
            this.logger.error("Redis connection failed", error)

            throw error;
        }
    }

    /**
     * execute when application is shutdown
     * confirm redis status has not ended already, if not end, runs quit on redis to close redis connection
     */
    async onApplicationShutdown() {
    if (
      this.client.status !==
      'end'
    ) {
      await this.client.quit();

      this.logger.info(
        'Redis connection closed',
      );
    }
  }

  async get<T>(
    key: string,
  ): Promise<T | null> {
    const value = await this.client.get(key)

    if (!value) {
        return null;
    }


return JSON.parse(value) as T
  }   

  async set<T>(
    key: string,
    value: T,
    ttl?: number
  ): Promise<void>{
    const serialized = JSON.stringify(value)

    // store to redis
    if (ttl) {
      await this.client.set(
        key,
        serialized,
        'EX',
        ttl,
      );

      return;
    }

    await this.client.set(
      key,
      serialized,
    );

  }

  /**
   * delete a specific item by passign its key
   * @param key - the item's unique key/name as used in setting the item to redis store
   */
  async delete(key:string): Promise<void>{
    await this.client.del(key)
  }

/**
 * check if an item exists in redis store
 * @param key - item's key
 * @returns - a boolean 
 */
  async exists(
    key: string,
  ): Promise<boolean> {
    return (
      (await this.client.exists(key)) ===
      1
    );
  }

}
