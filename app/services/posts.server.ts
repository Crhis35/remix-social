import type { Post } from '@prisma/client';
import { db } from '~/services/db.server';

export const getPost = () => db.post.findMany();

export const createPost = ({ title, body }: Pick<Post, 'title' | 'body'>) => {
  return db.post.create({
    data: {
      title,
      body,
    },
  });
};
