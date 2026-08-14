import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { UsersModule } from './modules/users/users.module';
import { AppConfigModule } from './core/config';
import { AppLoggerModule } from './core/logger/logger.module';


@Module({
  imports: [AppConfigModule, UsersModule, AppLoggerModule],
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

