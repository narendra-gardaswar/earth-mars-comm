import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LogMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    const sender = req.header('x-sender');
    const receiver = req.header('x-receiver');

    if (sender && receiver) {
      req['sender'] = sender;
      req['receiver'] = receiver;

      this.logger.debug(`Message from ${sender} to ${receiver}`);
    }

    const startTime = new Date();
    res.on('finish', () => {
      const endTime = new Date();
      const processingTime = endTime.getTime() - startTime.getTime();
      this.logger.debug(`Request processing time: ${processingTime}ms`);
    });

    next();
  }
}
