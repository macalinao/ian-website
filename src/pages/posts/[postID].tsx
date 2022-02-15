import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import { PostComments } from "~src/components/PostComments";
import type { IPost } from "~src/lib/content/posts";
import { getAllPosts, getPostByID } from "~src/lib/content/posts";
import { formatDate } from "~src/lib/formatDate";
import { mdxComponents } from "~src/lib/mdxComponents";
import { katexCss } from "~src/lib/styles/katexCss";
import { mobileOnly } from "~src/lib/styles/mobileOnly";

interface IProps {
  source: MDXRemoteSerializeResult;
  post: IPost;
}

const PostUnder = styled.div`
  color: #3271a7;
  text-align: center;
  line-height: 10px;
  margin-bottom: 60px;
  ${mobileOnly(css`
    margin-bottom: 30px;
  `)}
  font-weight: normal;
`;

const Post: React.FC<IProps> = ({ source, post }) => {
  // TODO(igm): the client likes to hydrate things differently than the
  // server due to Emotion. We need to set up an emotion cache
  // per-request to share the styles between frontend and backend.
  // Not too important

  const content = <MDXRemote {...source} components={mdxComponents} />;
  return (
    <PostWrapper post={post}>
      <Head>
        <title>{post.title} | Ian Macalinao</title>
        <meta property="twitter:title" content={post.title} />
        <meta property="og:type" content="article" />
        <meta property="og:article:author" content="Ian Macalinao" />
        <meta property="twitter:site" content="@simplyianm" />
        <meta property="twitter:creator" content="@simplyianm" />
        <meta name="author" content="Ian Macalinao, me@ian.pw" />
        <meta
          property="og:article:published_time"
          content={`${new Date(post.publishedAt).toISOString()}`}
        />
        {post.tags.map((tag) => (
          <meta key={tag} property="og:article:tag" content={tag} />
        ))}
        {post.tags.length > 0 && (
          <meta name="keywords" content={post.tags.join(", ")} />
        )}
        <meta property="og:title" content={post.title} />
        <meta property="og:url" content={`https://ian.pw${post.path}`} />
        <meta property="twitter:url" content={`https://ian.pw${post.path}`} />
        {post.description && (
          <>
            <meta name="description" content={post.description} />
            <meta property="og:description" content={post.description} />
            <meta property="twitter:description" content={post.description} />
          </>
        )}
        {post.banner ? (
          <>
            <meta property="og:image" content={post.banner.src} />
            <meta
              property="og:image:width"
              content={post.banner.width.toString()}
            />
            <meta
              property="og:image:height"
              content={post.banner.height.toString()}
            />
            <meta property="og:image:url" content={post.banner.src} />
            <meta property="twitter:image" content={post.banner.src} />
            <meta property="twitter:image:alt" content={post.banner.alt} />
            <meta property="twitter:card" content="summary_large_image" />
          </>
        ) : (
          // If no banner is present, still display a card
          <meta name="twitter:card" content="summary" />
        )}
      </Head>
      <h1
        css={css`
          margin-bottom: 30px;
          ${mobileOnly(css`
            text-align: center;
          `)}
        `}
      >
        {post.title}
      </h1>

      <PostUnder>
        <p>
          by{" "}
          <Link href="/">
            <a>Ian Macalinao</a>
          </Link>{" "}
          on {formatDate(new Date(post.publishedAt))}
        </p>
      </PostUnder>

      <div id="post">
        {post.incomplete && (
          <em>
            Note: This section is incomplete. You can help finish it
            <a
              href="https://github.com/macalinao/ian.pw/blob/master/$path$"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
            .
          </em>
        )}
        {post.banner && (
          <Image
            alt={post.banner.alt}
            src={post.banner.src}
            width={post.banner.width}
            height={post.banner.height}
          />
        )}
        {content}
      </div>

      <Thanks>
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
            rel="noreferrer"
          >
            here
          </a>{" "}
          and send a pull request.
        </p>
      </Thanks>
      <PostComments post={post} />
    </PostWrapper>
  );
};

const PostWrapper = styled.div<{ post: IPost }>`
  ${(props) => props.post.hasMath && katexCss}
  h1,
  h2 {
    line-height: 1.3;
  }
  h3 {
    line-height: 1.5;
  }
  h2,
  h3 {
    margin-top: 50px;
  }

  ${mobileOnly(css`
    h2 {
      font-size: 22px;
    }
    h3 {
      font-size: 18px;
    }

    h2 {
      margin-top: 25px;
    }
    h3 {
      margin-top: 12px;
    }

    p,
    li {
      font-size: 16px;
      line-height: 1.5em;
    }
  `)}

  .math.math-display {
    overflow-x: scroll;
  }

  .footnotes {
    margin-top: 60px;
    ol {
      margin: 40px 0;
    }
    li {
      font-size: 18px;
    }
    color: #454545;
    border-top: 1px solid #ccc;

    hr {
      display: none;
    }

    .footnote-backref {
      margin-left: 8px;
      font-size: 14px;
    }
  }
`;

const Thanks = styled.div`
  margin: 3em auto;
  border: 1px solid #eee;
  padding: 20px 40px;
  background-color: #fafaff;
  color: #656565;
  p {
    font-size: 18px;
  }
`;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  return {
    paths: posts.map((post) => post.path),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  IProps,
  { postID: string }
> = async (req) => {
  const postID = req.params?.postID;
  if (!postID) {
    return {
      notFound: true,
    };
  }
  const postIDNoSuffix = postID.split(".html")[0];
  if (!postIDNoSuffix) {
    return {
      notFound: true,
    };
  }

  const post = await getPostByID(postIDNoSuffix);
  if (postID.endsWith(".html")) {
    return {
      redirect: {
        permanent: true,
        destination: post.path,
      },
    };
  }

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    },
  });
  return { props: { source: mdxSource, post } };
};

export default Post;
