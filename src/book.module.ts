import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookDocument, BookSchema } from './Book.schema';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://fahd:fahd1234@cluster0.gzj2f.mongodb.net/tp3?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: BookDocument.name, schema: BookSchema },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
