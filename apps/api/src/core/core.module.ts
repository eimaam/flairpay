import {
    MiddlewareConsumer,
    Module,
    NestModule,
} from '@nestjs/common';
import { RequestIdMiddleware } from './logger/middleware/request-id.middleware';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/config.module';
import { AppLoggerModule } from './logger/logger.module';

@Module({
  imports: [DatabaseModule, AppConfigModule, AppLoggerModule]
})
export class CoreModule implements NestModule {
    configure(
        consumer: MiddlewareConsumer,
    ) {
        consumer
            .apply(RequestIdMiddleware)
            .forRoutes("*path");
    }
}