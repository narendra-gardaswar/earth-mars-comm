import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MessageFrom } from '../../earth-mars-comm/enum/earth-mars-comm.enum';

@Injectable()
export class HeaderGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const sender = request.header('x-sender') as MessageFrom;
    const receiver = request.header('x-receiver') as MessageFrom;
    if (!sender || !sender) {
      return false;
    }
    const isValidSender = Object.values(MessageFrom).includes(sender);
    const isValidReceiver = Object.values(MessageFrom).includes(receiver);
    return isValidSender && isValidReceiver;
  }
}
