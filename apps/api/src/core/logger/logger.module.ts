import { Module } from '@nestjs/common';
import { loggerConfig } from './logger.config';
import { LoggerModule } from 'nestjs-pino';
import { AppLoggerService } from './logger.service';

@Module(
    {
        imports: [LoggerModule.forRoot(loggerConfig)],
        controllers: [],
        providers: [AppLoggerService],
        exports: [AppLoggerService],
    }
)
export class AppLoggerModule { }
