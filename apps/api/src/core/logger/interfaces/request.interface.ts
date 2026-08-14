import { Request } from 'express';

export interface AppRequest
  extends Request
{
  context: {
    requestId: string;
  };

  user?: {
    id: string;
    email: string;
  };
}