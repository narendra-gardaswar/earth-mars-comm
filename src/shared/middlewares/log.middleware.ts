import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { MessageLog } from '../../earth-mars-comm/entity/message-log.entity';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LogMiddleware.name);
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    const sender = req.header('x-sender');
    const receiver = req.header('x-receiver');

    if (sender && receiver) {
      req['sender'] = sender;
      req['receiver'] = receiver;

      this.logger.debug(`Message from ${sender} to ${receiver}`);
    }

    const startTime = new Date();
    res.on('finish', async () => {
      const endTime = new Date();
      const processingTime = endTime.getTime() - startTime.getTime();
      const message = `Request processing time: ${processingTime}ms`;

      const logEntry = new MessageLog();
      logEntry.sender = sender;
      logEntry.receiver = receiver;
      logEntry.message = message;

      await this.entityManager.save(MessageLog, logEntry);
      this.logger.debug(message);
    });

    next();
  }
}
