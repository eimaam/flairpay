import {
    MiddlewareConsumer,
    Module,
    NestModule,
} from '@nestjs/common';
import { RequestIdMiddleware } from './logger/middleware/request-id.middleware';

@Module({})
export class CoreModule implements NestModule {
    configure(
        consumer: MiddlewareConsumer,
    ) {
        consumer
            .apply(RequestIdMiddleware)
            .forRoutes('*');
    }
}