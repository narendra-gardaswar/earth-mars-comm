import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageFrom } from '../../earth-mars-comm/enum/earth-mars-comm.enum';

export class MessageResponse {
  responseFromEarth?: string;
  responseFromMars?: string;
  nokiaTranslation: string;
}
@Injectable()
export class MessageResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<MessageResponse> {
    const request = context.switchToHttp().getRequest();
    const sender = request['sender'];

    return next.handle().pipe(
      map((data) => {
        const responseObject = new MessageResponse();

        if (sender === MessageFrom.EARTH) {
          responseObject.responseFromEarth = request.body.message;
        } else if (sender === MessageFrom.MARS) {
          responseObject.responseFromMars = request.body.message;
        }
        responseObject.nokiaTranslation = data;
        return responseObject;
      }),
    );
  }
}
