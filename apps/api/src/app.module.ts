import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { CoreModule } from './core/core.module';
import { RequestIdMiddleware } from './core/logger/middleware/request-id.middleware';
import { DatabaseModule } from './core/database';
import { RedisModule } from './core/redis/redis.module';


@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    RedisModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule { }

