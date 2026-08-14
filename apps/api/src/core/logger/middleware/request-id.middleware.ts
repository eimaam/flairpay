import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

import {
  Request,
  Response,
  NextFunction,
} from 'express';

import { randomUUID } from 'crypto';

export interface RequestWithContext extends Request {
  context: {
    requestId: string;
  };
}

@Injectable()
export class RequestIdMiddleware
  implements NestMiddleware
{
  use(
    req: RequestWithContext,
    res: Response,
    next: NextFunction,
  ) {
    const requestId =
      req.headers['x-request-id']?.toString() ??
      `FP_REQ_${randomUUID()}`;

    req.context = {
      requestId,
    };

    res.setHeader(
      'X-Request-Id',
      requestId,
    );

    next();
  }
}