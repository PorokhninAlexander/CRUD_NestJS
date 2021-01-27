import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

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
    if (typeof value !== 'string' || value.length !== 24) {
      throw new BadRequestException('Invalid ID');
    }
    return value;
  }
}
