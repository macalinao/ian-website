import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";

import type { IPost } from "~src/lib/content/posts";
import { getAllPosts } from "~src/lib/content/posts";
import { formatDate } from "~src/lib/formatDate";

interface IProps {
  posts: readonly IPost[];
}

const PostsPage: React.FC<IProps> = ({ posts }) => {
  const sortedPosts = posts
    .filter((post) => !post.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return (
    <>
      <Head>
        <title>All Posts | Ian Macalinao</title>
      </Head>
      <h1 tw="text-3xl my-4 md:(text-4xl my-8)">Writing</h1>
      <div tw="flex flex-col gap-4 my-4">
        {sortedPosts.map((post) => (
          <div tw="flex flex-col gap-1" key={post.id}>
            <div tw="text-xs md:text-sm text-gray-800">
              <time dateTime={post.publishedAt}>
                {formatDate(new Date(post.publishedAt))}
              </time>
            </div>
            <Link href={post.path} passHref>
              <a tw="text-base md:text-lg font-normal">{post.title}</a>
            </Link>{" "}
          </div>
        ))}
      </div>
      <div tw="my-8">
        <Link href="/" passHref>
          <a tw="font-medium underline">Back to home</a>
        </Link>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<
  IProps,
  { postID: string }
> = async () => {
  const posts = await getAllPosts();
  return { props: { posts } };
};

export default PostsPage;
