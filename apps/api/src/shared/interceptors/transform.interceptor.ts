import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator';

export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(
    private reflector: Reflector
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const customMessage = this.reflector.get<string>(
      RESPONSE_MESSAGE_KEY,
      context.getHandler(),
    );

    return next.handle().pipe(
      map((res) => {
        // Handle cases where controller returns { message, data } directly
        let message = customMessage || 'Operation successful';
        let data = res;

        if (
          res !== null &&
          typeof res === 'object' &&
          !Array.isArray(res) &&
          ('data' in res || 'message' in res)
        ) {
          message = customMessage || res.message;
          data = res.data !== undefined ? res.data : res;
        }

        return {
          success: true,
          message,
          data: data ?? null,
        };
      }),
    );
  }
}
