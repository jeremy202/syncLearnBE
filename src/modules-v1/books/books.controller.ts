import { Request, Response } from 'express';
import { sr } from '../../lib/utils';
import { AuthenticatedRequest } from '../../types';
import BooksService from './books.service';
import { AddBookDto, BookIdDto } from './books.dto';
import { Controller, Post, Get } from '../../lib/core/httpSetup';
import isAuthenticatedUser from '../../middleware/auth/isAuthenticatedUser';

@Controller('/books')
export default class BooksController {
  @Post('/', [isAuthenticatedUser()])
  async addBook(req: AuthenticatedRequest, res: Response) {
    const result = await BooksService.addBook({ ...req.body, userId: req.session.userId } as AddBookDto);
    return sr(result);
  }

  @Get('/', [isAuthenticatedUser()])
  async getAll(req: Request, res: Response) {
    const result = await BooksService.getAllBooks();
    return sr(result);
  }

  @Post('/bookmark', [isAuthenticatedUser()])
  async bookmark(req: AuthenticatedRequest, res: Response) {
    const result = await BooksService.bookmarkBook({ ...req.body, userId: req.session.userId } as BookIdDto);
    return sr(result);
  }

  @Post('/download', [isAuthenticatedUser()])
  async download(req: AuthenticatedRequest, res: Response) {
    const result = await BooksService.downloadBook({ ...req.body, userId: req.session.userId } as BookIdDto);
    return sr(result);
  }
}
