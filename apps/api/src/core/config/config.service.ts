import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


export enum AppConfigEnum {
    APP = 'app',
    DATABASE = 'database',
    AUTH = 'auth',
    NODE_ENV = 'NODE_ENV',
    REDIS = 'redis',
    CACHE = 'cache',
    LOGGING = 'logging',
    RATE_LIMITING = 'rateLimiting',
    SECURITY = 'security',
    S3 = 's3',
    CORS = 'cors',
    DOCUMENTATION = 'documentation',
    FILE = 'file',
}

export enum NodeEnvEnum {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TESTING = 'testing',
}

@Injectable()
export class AppConfigService {

    constructor(
        private readonly config: ConfigService
    ) { }

    get app() {

        return this.config.get(AppConfigEnum.APP);

    }

    get database() {

        return this.config.get(AppConfigEnum.DATABASE);

    }

    get auth() {

        return this.config.get(AppConfigEnum.AUTH);

    }

    get redis() {

        return this.config.get(AppConfigEnum.REDIS);

    }

    get cache() {

        return this.config.get(AppConfigEnum.CACHE);

    }

    get logging() {

        return this.config.get(AppConfigEnum.LOGGING);

    }

    get rateLimiting() {

        return this.config.get(AppConfigEnum.RATE_LIMITING);

    }

    get security() {

        return this.config.get(AppConfigEnum.SECURITY);

    }

    get cors() {

        return this.config.get(AppConfigEnum.CORS);

    }

    get documentation() {

        return this.config.get(AppConfigEnum.DOCUMENTATION);

    }

    get file() {

        return this.config.get(AppConfigEnum.FILE);

    }

    get environment() {
        return this.config.get(AppConfigEnum.NODE_ENV);
    }
}
