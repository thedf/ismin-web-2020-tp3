import { NestFactory } from '@nestjs/core';
import { BookModule } from './book.module';
require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.create(BookModule);

  await app.listen(process.env.PORT);
}
bootstrap();
