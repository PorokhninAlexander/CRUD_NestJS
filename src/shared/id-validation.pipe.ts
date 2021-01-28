import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class IdValidationPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (/\D/.test(value)) {
      throw new BadRequestException('Invalid ID');
    }
    return value;
  }
}

@Injectable()
export class IdMongoValidationPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid ID');
    }
    return value;
  }
}
