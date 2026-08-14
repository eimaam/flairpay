import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';

import { finalize, tap } from 'rxjs/operators';

import { Request, Response } from 'express';

import { PinoLogger } from 'nestjs-pino';
import { AppRequest } from '../interfaces/request.interface';

@Injectable()
export class LoggingInterceptor
  implements NestInterceptor
{
  constructor(
    private readonly logger: PinoLogger,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const now = Date.now();

    const request = context
      .switchToHttp()
      .getRequest<AppRequest>();

    const response = context
      .switchToHttp()
      .getResponse<Response>();

    const handler =
      context.getHandler().name;

    const controller =
      context.getClass().name;

    return next.handle().pipe(
      finalize(() => {
        this.logger.info({
          requestId:
            request.context?.requestId,

          method: request.method,

          url: request.originalUrl,

          statusCode:
            response.statusCode,

          duration:
            Date.now() - now,

          controller,

          handler,

          ip: request.ip,

          userAgent:
            request.headers['user-agent'],
        });
      }),
    );
  }
}