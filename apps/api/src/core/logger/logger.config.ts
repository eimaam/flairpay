import { Params } from 'nestjs-pino';
import { NodeEnvEnum } from '../config';

export const loggerConfig: Params = {
  forRoutes: ['*path'],
  pinoHttp: {
    level: process.env.NODE_ENV === NodeEnvEnum.PRODUCTION
      ? 'info'
      : 'debug',

    transport:
      process.env.NODE_ENV === NodeEnvEnum.PRODUCTION
        ? undefined
        : {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:standard',
              singleLine: true,
            },
          },

    autoLogging: true,

    customSuccessMessage(req) {
      return `${req.method} ${req.url} completed`;
    },

    customErrorMessage(req) {
      return `${req.method} ${req.url} failed`;
    },
  },
};