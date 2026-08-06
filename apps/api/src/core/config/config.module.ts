import { Module } from '@nestjs/common';
import { AppConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfigValidationSchema } from './validations';
import appConfig from './configs/app.config';
import authConfig from './configs/auth.config';
import databaseConfig from './configs/database.config';
import redisConfig from './configs/redis.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            expandVariables: true,
            validationSchema: AppConfigValidationSchema,
            load: [appConfig, authConfig, databaseConfig, redisConfig],
        })
    ],
    providers: [AppConfigService],
    exports: [AppConfigService]
})
export class AppConfigModule { }
