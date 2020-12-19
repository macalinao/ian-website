import { DiscussionEmbed } from "disqus-react";
import { GetStaticPaths, GetStaticProps } from "next";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { getAllPosts, getPostByID, IPost } from "~src/lib/content/posts";
import { formatDate } from "~src/lib/formatDate";

interface IProps {
  source: string;
  post: IPost;
}

const Post: React.FC<IProps> = ({ source, post }) => {
  const content = hydrate(source);
  return (
    <div className="wrapper">
      <Head>
        <title>{post.title} | Ian Macalinao</title>
        <meta name="description" content="$description$" />
      </Head>
      <h1 className="post">{post.title}</h1>

      <div id="postUnder">
        <p>
          by{" "}
          <Link href="/">
            <a>Ian Macalinao</a>
          </Link>
        </p>
        <p>{formatDate(new Date(post.publishedAt))}</p>
      </div>

      <div id="post">
        {post.incomplete && (
          <em>
            Note: This section is incomplete. You can help finish it
            <a
              href="https://github.com/macalinao/ian.pw/blob/master/$path$"
              target="_blank"
            >
              here
            </a>
            .
          </em>
        )}
        {content}
      </div>

      <div id="thanks">
        <p>
          Thanks for reading! Have any questions, comments, or suggestions? Feel
          free to use the comment section below or email me at{" "}
          <a href="mailto:blog@igm.pub">blog@igm.pub</a> and I'll do my best to
          respond.
        </p>
        <p>
          Alternatively, you can view the source of the post{" "}
          <a
            href={`https://github.com/macalinao/ian.pw/blob/master/content/posts/${post.id}.md`}
            target="_blank"
          >
            here
          </a>{" "}
          and send a pull request.
        </p>
      </div>

      {typeof window !== "undefined" && (
        <DiscussionEmbed
          shortname="ianpw"
          config={{
            url: window.location.href,
            identifier: `posts/${post.id}.md`,
            title: post.title,
            language: "en_US",
          }}
        />
      )}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  return {
    paths: posts.map((post) => `/posts/${post.id}.html`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  IProps,
  { postID: string }
> = async (req) => {
  const postIDNoSuffix = req.params?.postID.split(".html")[0];
  if (!postIDNoSuffix) {
    return {
      notFound: true,
    };
  }
  const post = await getPostByID(postIDNoSuffix);
  const mdxSource = await renderToString(post.content);
  return { props: { source: mdxSource, post } };
};

export default Post;
