import BooksController from './books.controller';
import { Router } from 'express';
import isAuthenticatedUser from '../../middleware/auth/isAuthenticatedUser';
import { AddBookDto, BookIdDto } from './books.dto';

const router = Router();

router.post('/', isAuthenticatedUser(), BooksController.addBook);
router.get('/', isAuthenticatedUser(), BooksController.getAll);
router.post('/bookmark', isAuthenticatedUser(), BooksController.bookmark);
router.post('/download', isAuthenticatedUser(), BooksController.download);

export default router;
