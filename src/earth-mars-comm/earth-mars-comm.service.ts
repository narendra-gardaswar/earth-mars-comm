import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';
import { MessageFrom } from './enum/earth-mars-comm.enum';
import {
  keypadAlphabetCombinations,
  numericStrings,
} from './dto/earth-mars-comm.dto';

@Injectable()
export class EarthMarsCommService {
  private readonly logger = new Logger(EarthMarsCommService.name);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  sendMessage(message: string, req: Request): string {
    const sender = req['sender'] as MessageFrom;
    const receiver = req['receiver'] as MessageFrom;

    //validate the proper message from the sender
    this.validateMessage(message, sender);

    const isEnglishToNumeric =
      sender === MessageFrom.EARTH && receiver === MessageFrom.MARS;

    const marsToEarth =
      sender === MessageFrom.MARS && receiver === MessageFrom.EARTH;

    if (isEnglishToNumeric) {
      return this.convertEnglishToNumeric(message);
    }

    if (marsToEarth) {
      return this.convertNumericToEnglish(message);
    }

    throw new BadRequestException('Invalid headers provided');
  }

  validateMessage(message: string, sender: MessageFrom): void {
    const nonDigitPattern = /[^\d.]/;

    const isNumeric = !nonDigitPattern.test(message);
    const isString = nonDigitPattern.test(message);

    const isInvalidNumeric = isNumeric && sender === MessageFrom.EARTH;
    const isInvalidString = isString && sender === MessageFrom.MARS;

    if (isInvalidNumeric) {
      throw new BadRequestException(
        `${sender} can't send the message in numeric, please send message in english text`,
      );
    }
    if (isInvalidString) {
      throw new BadRequestException(
        `${sender} can't send the message in english text, please send message in numeric`,
      );
    }
  }

  convertNumericToEnglish(message: string): string {
    const str = message.split('');
    let i = 0;
    let result = '';

    while (i < str.length) {
      if (str[i] === '.') {
        i++;
        continue;
      }

      let count = 0;
      while (i + 1 < str.length && str[i] === str[i + 1]) {
        if (
          count === 2 &&
          ((str[i] >= '2' && str[i] <= '6') || str[i] === '8')
        ) {
          break;
        } else if (count === 3 && (str[i] === '7' || str[i] === '9')) {
          break;
        }

        count++;
        i++;

        if (i === str.length) {
          break;
        }
      }

      if (str[i] === '7' || str[i] === '9') {
        result +=
          keypadAlphabetCombinations[str[i].charCodeAt(0) - 48][count % 4];
      } else {
        result +=
          keypadAlphabetCombinations[str[i].charCodeAt(0) - 48][count % 3];
      }
      i++;
    }

    return result.toLowerCase();
  }

  convertEnglishToNumeric(message: string): string {
    let output = '';
    const n = message.length;
    for (let i = 0; i < n; i++) {
      if (message[i] === ' ') {
        output += '0';
      } else {
        const charCode = message[i].toUpperCase().charCodeAt(0);
        if (charCode >= 65 && charCode <= 90) {
          // Uppercase letters A-Z
          output += numericStrings[charCode - 65];
        }
      }
    }
    return output;
  }
}
