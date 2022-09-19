import type { GetStaticProps } from "next";
import { default as Link } from "next/link.js";
import { NextSeo } from "next-seo";
import React from "react";

import { BasicPage } from "~src/layouts/BasicPage.js";
import type { IPost } from "~src/lib/content/posts.js";
import { getAllPosts } from "~src/lib/content/posts.js";
import { formatDate } from "~src/lib/formatDate.js";

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
      <NextSeo title="Writing" canonical="https://ianm.com/posts" />
      <BasicPage title="Writing">
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
      </BasicPage>
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
