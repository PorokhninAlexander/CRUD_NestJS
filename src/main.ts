import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NewValidationPipe } from './shared/validation.pipe';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new NewValidationPipe(),
    new ValidationPipe({ whitelist: true }),
  );
  await app.listen(3000);
}
bootstrap();
