import { groupBy } from "lodash";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { getAllPosts, IPost } from "~src/lib/content/posts";
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
  const grouped = groupBy(sortedPosts, (post) =>
    new Date(post.publishedAt).getFullYear()
  );

  return (
    <>
      <Head>
        <title>Posts | Ian Macalinao</title>
      </Head>
      <h1>Posts</h1>
      <p>Shower thoughts, rants, opinions, etc.</p>
      {Object.entries(grouped)
        .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
        .map(([year, yearPosts]) => (
          <div key={year}>
            <h2>{year}</h2>
            <ul>
              {yearPosts.map((post) => (
                <li>
                  <Link href={post.path} passHref>
                    <a>{post.title}</a>
                  </Link>{" "}
                  - {formatDate(new Date(post.publishedAt))}
                </li>
              ))}
            </ul>
          </div>
        ))}
      <Link href="/">
        <a>Back to home</a>
      </Link>
    </>
  );
};

export const getStaticProps: GetStaticProps<
  IProps,
  { postID: string }
> = async (req) => {
  const posts = await getAllPosts();
  return { props: { posts } };
};

export default PostsPage;
