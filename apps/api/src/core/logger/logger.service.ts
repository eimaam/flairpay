import { Injectable } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class AppLoggerService {
  constructor(
    private readonly logger: PinoLogger,
  ) {}

  info(message: string, context?: object) {
    this.logger.info(context, message);
  }

  warn(message: string, context?: object) {
    this.logger.warn(context, message);
  }

  error(
    message: string,
    error?: unknown,
    context?: object,
  ) {
    this.logger.error(
      {
        ...context,
        error,
      },
      message,
    );
  }

  debug(message: string, context?: object) {
    this.logger.debug(context, message);
  }
}