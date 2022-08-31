import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { styled } from "twin.macro";

import { MDXProse } from "~src/components/MDXProse";
import { PostComments } from "~src/components/PostComments";
import { ProseTitle } from "~src/components/Prose";
import type { IPost } from "~src/lib/content/posts";
import { getAllPosts, getPostByID } from "~src/lib/content/posts";
import { formatDate } from "~src/lib/formatDate";
import { mdxComponents } from "~src/lib/mdxComponents";
import { katexCss } from "~src/lib/styles/katexCss";

interface IProps {
  source: MDXRemoteSerializeResult;
  post: IPost;
}

const Post: React.FC<IProps> = ({ source, post }) => {
  // TODO(igm): the client likes to hydrate things differently than the
  // server due to Emotion. We need to set up an emotion cache
  // per-request to share the styles between frontend and backend.
  // Not too important

  const content = <MDXProse {...source} components={mdxComponents} />;
  return (
    <PostWrapper post={post}>
      <Head>
        <title>{post.title} | Ian Macalinao</title>
        <meta property="twitter:title" content={post.title} />
        <meta property="og:type" content="article" />
        <meta property="og:article:author" content="Ian Macalinao" />
        <meta property="twitter:site" content="@simplyianm" />
        <meta property="twitter:creator" content="@simplyianm" />
        <meta name="author" content="Ian Macalinao, me@ianm.com" />
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
        <meta property="og:url" content={`https://ianm.com${post.path}`} />
        <meta property="twitter:url" content={`https://ianm.com${post.path}`} />
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
      <ProseTitle tw="mb-0 text-2xl md:(mb-0 text-3xl)">
        {post.title}
      </ProseTitle>

      <div tw="mt-1 mb-8 text-gray-600 flex items-center justify-between w-full border-t border-gray-200 pt-1.5 text-xs md:(mt-3 text-sm)">
        <div>
          <time>{formatDate(new Date(post.publishedAt))}</time>
        </div>
        <div>
          <address tw="not-italic">
            by{" "}
            <Link href="/" passHref>
              <a rel="author">Ian Macalinao</a>
            </Link>
          </address>
        </div>
      </div>

      <div id="post">
        {post.incomplete && (
          <em>
            Note: This section is incomplete. You can help finish it
            <a
              href={`https://github.com/macalinao/ian-website/blob/master/${post.path}`}
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
            .
          </em>
        )}
        {post.banner && (
          <div tw="mb-8 -mx-5 md:mx-0">
            <Image
              alt={post.banner.alt}
              src={post.banner.src}
              width={post.banner.width}
              height={post.banner.height}
            />
          </div>
        )}
        {content}
      </div>

      <div tw="bg-gray-50 border border-gray-200 text-gray-500 mx-auto my-10 text-sm px-5 py-4 md:(text-base px-7 py-5)">
        <p tw="mb-2">
          Thanks for reading! Have any questions, comments, or suggestions? Feel
          free to use the comment section below or email me at{" "}
          <a href="mailto:blog@igm.pub">blog@igm.pub</a> and I'll do my best to
          respond.
        </p>
        <p>
          Alternatively, you can view the source of the post{" "}
          <a
            href={`https://github.com/macalinao/ian-website/blob/master/content/posts/${post.id}.md`}
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>{" "}
          and send a pull request.
        </p>
      </div>
      <PostComments post={post} />
    </PostWrapper>
  );
};

const PostWrapper = styled.div<{ post: IPost }>`
  ${(props) => props.post.hasMath && katexCss}
  .math.math-display {
    overflow-x: auto;
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
      remarkPlugins: [remarkMath, remarkGfm],
      rehypePlugins: [
        rehypeKatex,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "wrap",
          },
        ],
      ],
    },
  });
  return { props: { source: mdxSource, post } };
};

export default Post;
