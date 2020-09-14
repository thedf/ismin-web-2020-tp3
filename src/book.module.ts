import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookDocument, BookSchema } from './Book.schema';
require('dotenv').config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forFeature([
      { name: BookDocument.name, schema: BookSchema },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
