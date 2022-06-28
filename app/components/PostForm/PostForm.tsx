import React from 'react';
import { Button } from '../Button';
import type { Props } from './types';

const PostForm = ({ method = 'post', fields, error, ...props }: Props) => {
  return (
    <form method={method} className="flex flex-col gap-4" {...props}>
      <div className="flex flex-col">
        <label htmlFor="title" className="mb-2 text-gray-900">
          Title
        </label>
        <input
          type="text"
          className="p-4"
          name="title"
          placeholder="Title of your post"
          defaultValue={fields?.title}
        />
        {error?.fieldErrors?.title && (
          <p className="text-red-500">{error?.fieldErrors?.title}</p>
        )}
      </div>
      <div className="mb-4 flex flex-col">
        <label htmlFor="body" className="mb-2 text-gray-900">
          Body
        </label>
        <textarea
          defaultValue={fields?.body}
          className="p-4"
          name="body"
          placeholder="Body of your post"
        />
        {error?.fieldErrors?.body && (
          <p className="text-red-500">{error?.fieldErrors?.body}</p>
        )}
      </div>
      <Button type="submit" className="border border-blue-500">
        Create post
      </Button>
    </form>
  );
};

export default PostForm;
