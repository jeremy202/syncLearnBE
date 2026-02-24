import { AddBookDto, BookIdDto } from './books.dto';
import booksUtil from './books.util';
import UserRepo from '../../database/repositories/UserRepo';
import { NotFoundError, ServiceError } from '../../lib/errors';
import { UserRole } from '../../database/enum';
import { ValidateDto } from '../../lib/core/httpSetup';

export default class BooksService {
  @ValidateDto(AddBookDto)
  static async addBook(dto: AddBookDto) {
    const user = await UserRepo.getUserById(dto.userId);
    if (!user || user.role !== UserRole.ADMIN) throw new ServiceError('Unauthorized');

    const book = await booksUtil.createBook({
      name: dto.name,
      file: dto.file,
      audio: dto.audio,
      coverUrl: dto.coverUrl,
    });

    return book;
  }

  static async getAllBooks() {
    return booksUtil.findAll();
  }

  @ValidateDto(BookIdDto)
  static async bookmarkBook(dto: BookIdDto) {
    const book = await booksUtil.findById(dto.bookId);
    if (!book) throw new NotFoundError('book not found');

    try {
      return await booksUtil.addBookmark(dto.userId, dto.bookId);
    } catch (err) {
      throw new ServiceError('Could not bookmark book');
    }
  }

  @ValidateDto(BookIdDto)
  static async downloadBook(dto: BookIdDto) {
    const book = await booksUtil.findById(dto.bookId);
    if (!book) throw new NotFoundError('book not found');

    try {
      return await booksUtil.addDownload(dto.userId, dto.bookId);
    } catch (err) {
      throw new ServiceError('Could not mark download');
    }
  }
}
