import { IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDTO {
  @IsString()
  @IsNotEmpty()
  message: string;
}
export const keypadAlphabetCombinations = [
  '',
  '',
  'ABC',
  'DEF',
  'GHI',
  'JKL',
  'MNO',
  'PQRS',
  'TUV',
  'WXYZ',
];

export const numericStrings = [
  '2',
  '22',
  '222',
  '3',
  '33',
  '333',
  '4',
  '44',
  '444',
  '5',
  '55',
  '555',
  '6',
  '66',
  '666',
  '7',
  '77',
  '777',
  '7777',
  '8',
  '88',
  '888',
  '9',
  '99',
  '999',
  '9999',
];
