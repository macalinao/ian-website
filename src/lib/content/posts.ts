// eslint-disable-next-line import-x/no-nodejs-modules
import * as fs from "node:fs/promises";
// eslint-disable-next-line import-x/no-nodejs-modules
import path from "node:path";

import { default as matter } from "@gr2m/gray-matter";
import invariant from "tiny-invariant";

const postsDir = path.join(process.cwd(), "content/posts");

export interface IPost {
  id: string;
  title: string;
  draft: boolean;
  publishedAt: string;
  content: string;
  path: string;
  canonicalUrl: string;
  incomplete: boolean;
  description: string | null;
  hasMath: boolean;
  banner: {
    alt: string;
    width: number;
    height: number;
    src: string;
  } | null;
  tags: readonly string[];
}

export const getAllPosts = async (): Promise<readonly IPost[]> => {
  const posts = await fs.readdir(postsDir);
  return await Promise.all(
    posts.map(async (post): Promise<IPost> => {
      const postID = post.split(".").slice(0, -1).join(".");
      const postResult = await getPostByID(postID);
      invariant(postResult);
      return postResult;
    }),
  );
};

export const getPostByID = async (postID: string): Promise<IPost | null> => {
  try {
    const source = await fs.readFile(`${postsDir}/${postID}.md`);
    const { content, data: dataUnknown } = matter(source.toString());
    const data = dataUnknown as Pick<IPost, "title"> & Partial<IPost>;
    const publishedAt = new Date(postID.split("-").slice(0, 3).join("-"));
    const path = `/posts/${postID}`;
    return {
      id: postID,
      title: data.title,
      draft: !!data.draft,
      publishedAt: publishedAt.toISOString(),
      content,
      path,
      canonicalUrl: `https://ianm.com/posts/${postID}`,
      incomplete: !!data.incomplete,
      description: data.description ?? null,
      hasMath: !!data.hasMath,
      banner: data.banner ?? null,
      tags: data.tags ?? [],
    };
  } catch (e) {
    if ((e as { code?: string }).code === "ENOENT") {
      return null;
    }
    throw e;
  }
};
