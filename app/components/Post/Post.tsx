import React from 'react';
import type { Props } from './types';

const Post = ({ header, authorName, children }: Props) => {
  return (
    <div className="flex flex-col p-6 max-w-md border rounded">
      {header && <h2 className="font-bold text-3xl text-gray-900">{header}</h2>}
      {authorName && <h2 className="text-gray-700 italic">{authorName}</h2>}
      <p className="mt-4 text-lg text-gray-900">{children}</p>
    </div>
  );
};

export default Post;
