import type { Post } from '@prisma/client';
import { db } from '~/services/db.server';

export const getPost = () =>
  db.post.findMany({
    include: {
      author: {
        select: {
          email: true,
          id: true,
        },
      },
    },
  });

export const createPost = ({
  title,
  body,
  authorId,
}: Pick<Post, 'title' | 'body' | 'authorId'>) => {
  return db.post.create({
    data: {
      title,
      body,
      authorId,
    },
  });
};
