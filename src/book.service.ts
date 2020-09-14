import { Injectable } from '@nestjs/common';
import { Bookshelf } from './Bookshelf';
import { Book } from './Book';
import { InjectModel } from '@nestjs/mongoose';
import { BookDocument, BookSchema } from './Book.schema';
import { Model } from 'mongoose';
@Injectable()
export class BookService {
  OurBookshelf = new Bookshelf();
  constructor(
    @InjectModel(BookDocument.name) private BookModel: Model<BookDocument>,
  ) {}

  async create(book: Book): Promise<void> {
    // this.OurBookshelf.addBook(book);
    this.BookModel.create(book);
  }

  async findAll(): Promise<BookDocument[]> {
    // return this.OurBookshelf.getAllBooks();
    return this.BookModel.find().exec();
  }
  async findAllByAuthor(authorName: string): Promise<BookDocument[]> {
    // return this.OurBookshelf.getBooksOf(authorName);
    return this.BookModel.find({ author: authorName }).exec();
  }

  async getBookByName(bookName: string): Promise<BookDocument> {
    // return this.OurBookshelf.getBook(bookName);
    const firstBookWithTitle: BookDocument[] = await this.BookModel.find({
      title: bookName,
    }).exec();
    return firstBookWithTitle[0];
  }
  async deleteBook(bookName: string): Promise<void> {
    // return this.OurBookshelf.deleteBook(bookName);
    this.BookModel.deleteOne({ title: bookName }).exec();
  }
}
