import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useActionData, useLoaderData } from '@remix-run/react';
import { Post } from '~/components/Post';
import { PostForm } from '~/components/PostForm';
import { getPost, createPost } from '~/services/posts.server';
import { CreatePost } from '~/services/validation';

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPost>>;
};
type ActionData = {
  error: {
    formError: string[];
    fieldErrors: {
      title: string[];
      body: string[];
    };
  };
  fields: {
    title?: string;
    body?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const rawTitle = form.get('title');
  const rawBody = form.get('body');
  const result = CreatePost.safeParse({
    title: rawTitle,
    body: rawBody,
  });
  if (!result.success) {
    return json(
      {
        error: result.error.flatten(),
        fields: {
          title: rawTitle,
          body: rawBody,
        },
      },
      {
        status: 400,
      }
    );
  }
  await createPost({
    title: result.data.title || null,
    body: result.data.body,
  });
  return redirect('/');
};

export const loader: LoaderFunction = async () => {
  const posts = await getPost();
  return json({ posts });
};

export default function Index() {
  const { posts } = useLoaderData<LoaderData>();
  const formData = useActionData<ActionData>();
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-xl">Remix Social</h1>
      <PostForm
        action="/?index"
        error={formData?.error}
        fields={formData?.fields}
      />
      <ul>
        {posts.map((post) => (
          <li key={post.title}>
            <Post header={post.title} authorName={post.author?.email}>
              {post.body}
            </Post>
          </li>
        ))}
      </ul>
    </div>
  );
}
