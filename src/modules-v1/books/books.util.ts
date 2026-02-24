import prisma from '../../database';

export default {
  createBook: (data: any) => prisma.book.create({ data }),
  findAll: () => prisma.book.findMany({ orderBy: { createdAt: 'desc' } }),
  findById: (id: string) => prisma.book.findUnique({ where: { id } }),
  addBookmark: async (userId: string, bookId: string) => {
    // connect book to user's bookmarks relation
    return prisma.user.update({ where: { id: userId }, data: { bookmarks: { connect: { id: bookId } } } });
  },
  removeBookmark: async (userId: string, bookId: string) => {
    return prisma.user.update({ where: { id: userId }, data: { bookmarks: { disconnect: { id: bookId } } } });
  },
  addDownload: async (userId: string, bookId: string) => {
    return prisma.user.update({ where: { id: userId }, data: { books: { connect: { id: bookId } } } });
  },
};
