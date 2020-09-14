import { Injectable } from '@nestjs/common';
import { Bookshelf } from './Bookshelf';
import { Book } from './Book';
import { InjectModel } from '@nestjs/mongoose';
import { BookDocument, BookSchema } from './Book.schema';
import { Model } from 'mongoose';
import { PaginationAndAuthor, Search } from './Search';

@Injectable()
export class BookService {
  OurBookshelf = new Bookshelf();
  constructor(
    @InjectModel(BookDocument.name) private BookModel: Model<BookDocument>,
  ) {}

  async create(book: Book): Promise<void> {
    const booksAlreadyInDB = await this.BookModel.find({
      author: book.author,
      title: book.title,
    }).exec();
    if (booksAlreadyInDB.length === 0) {
      this.BookModel.create(book);
    }
  }

  async findAll(): Promise<Book[]> {
    return (await this.BookModel.find().exec())
      .map(
        (bookDocObj: BookDocument): Book => {
          return {
            title: bookDocObj.title,
            author: bookDocObj.author,
            date: bookDocObj.date,
          };
        },
      )
      .sort((bookA, bookB) => bookA.title.localeCompare(bookB.title));
  }
  async findAllByAuthor(authorName: string): Promise<Book[]> {
    // return this.OurBookshelf.getBooksOf(authorName);
    return (await this.BookModel.find({ author: authorName }).exec())
      .map(
        (bookDocObj: BookDocument): Book => {
          return {
            title: bookDocObj.title,
            author: bookDocObj.author,
            date: bookDocObj.date,
          };
        },
      )
      .sort((bookA, bookB) => bookA.title.localeCompare(bookB.title));
  }

  async getBookByName(bookName: string): Promise<Book> {
    // return this.OurBookshelf.getBook(bookName);
    const firstBookWithTitle: BookDocument[] = await this.BookModel.find({
      title: bookName,
    }).exec();
    if (firstBookWithTitle.length !== 0) {
      return {
        title: firstBookWithTitle[0].title,
        author: firstBookWithTitle[0].author,
        date: firstBookWithTitle[0].date,
      };
    }
  }
  async search(searchParams: Search): Promise<Book[]> {
    return this.BookModel.find()
      .or([
        {
          author: { $regex: searchParams.term, $options: 'i' },
        },
        {
          title: { $regex: searchParams.term, $options: 'i' },
        },
      ])
      .exec();
  }
  async deleteBook(bookName: string): Promise<void> {
    // return this.OurBookshelf.deleteBook(bookName);
    this.BookModel.deleteOne({ title: bookName }).exec();
  }
}
