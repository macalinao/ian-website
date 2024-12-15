import type { GetStaticPaths, GetStaticProps } from "next";
import { default as Head } from "next/head.js";
import { default as Image } from "next/image.js";
import { default as Link } from "next/link.js";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { ArticleJsonLd, NextSeo } from "next-seo";
import type React from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { styled } from "twin.macro";

import { MDXProse } from "~src/components/MDXProse.js";
import { PostComments } from "~src/components/PostComments.js";
import { ProseTitle } from "~src/components/Prose.js";
import type { IPost } from "~src/lib/content/posts.js";
import { getAllPosts, getPostByID } from "~src/lib/content/posts.js";
import { formatDate } from "~src/lib/formatDate.js";
import { mdxComponents } from "~src/lib/mdxComponents.js";
import { katexCss } from "~src/lib/styles/katexCss.js";

interface IProps {
  source: MDXRemoteSerializeResult;
  post: IPost;
  exportStatic: boolean;
}

const Post: React.FC<IProps> = ({ source, post, exportStatic }) => {
  // TODO(igm): the client likes to hydrate things differently than the
  // server due to Emotion. We need to set up an emotion cache
  // per-request to share the styles between frontend and backend.
  // Not too important

  const content = <MDXProse {...source} components={mdxComponents} />;
  return (
    <PostWrapper post={post}>
      <NextSeo
        title={post.title}
        canonical={post.canonicalUrl}
        openGraph={{
          type: "article",
          article: {
            authors: ["Ian Macalinao <contact@ianm.com>"],
            publishedTime: new Date(post.publishedAt).toISOString(),
            tags: post.tags,
          },
          title: post.title,
          url: post.canonicalUrl,
          ...(post.description
            ? {
                description: post.description,
              }
            : {}),
          ...(post.banner
            ? {
                images: [
                  {
                    url: post.banner.src,
                    width: post.banner.width,
                    height: post.banner.height,
                    alt: post.banner.alt,
                  },
                ],
              }
            : {}),
        }}
        {...(post.description
          ? {
              description: post.description,
            }
          : {})}
        twitter={
          post.banner
            ? {
                cardType: "summary_large_image",
              }
            : undefined
        }
      />
      <ArticleJsonLd
        url={post.canonicalUrl}
        title={post.title}
        images={post.banner ? [post.banner.src] : []}
        datePublished={new Date(post.publishedAt).toISOString()}
        authorName={[
          {
            name: "Ian Macalinao",
            url: "https://ianm.com",
          },
        ]}
        publisherName="Ian Macalinao"
        publisherLogo="https://ianm.com/icon.svg"
        description={post.description ?? `${post.title} by Ian Macalinao`}
      />
      <Head>
        {post.tags.length > 0 && (
          <meta name="keywords" content={post.tags.join(", ")} />
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
            <Link href="/" rel="author">
              Ian Macalinao
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
            {exportStatic ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.banner.src}
                alt={post.banner.alt}
                width={post.banner.width}
                height={post.banner.height}
              />
            ) : (
              <Image
                alt={post.banner.alt}
                src={post.banner.src}
                width={post.banner.width}
                height={post.banner.height}
              />
            )}
          </div>
        )}
        {content}
      </div>

      <div tw="bg-gray-50 border border-gray-200 text-gray-500 mx-auto my-10 text-sm px-5 py-4 md:(text-base px-7 py-5)">
        <p tw="mb-2">
          Thanks for reading! Have any questions, comments, or suggestions? Feel
          free to use the comment section below or email me at{" "}
          <a href="mailto:blog@igm.pub">blog@igm.pub</a> and I&apos;ll do my
          best to respond.
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
    fallback: false,
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
  if (!post) {
    return {
      notFound: true,
    };
  }

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
  return {
    props: {
      source: mdxSource,
      post,
      exportStatic: !!process.env.NEXT_PUBLIC_EXPORT_STATIC,
    },
  };
};

export default Post;
