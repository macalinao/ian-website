import { default as matter } from "@gr2m/gray-matter";
import * as fs from "fs/promises";
import path from "path";
import { default as invariant } from "tiny-invariant";

const postsDir = path.join(process.cwd(), "content/posts");

export interface IPost {
  id: string;
  title: string;
  draft: boolean;
  publishedAt: string;
  content: string;
  path: string;
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
    })
  );
};

export const getPostByID = async (postID: string): Promise<IPost | null> => {
  try {
    const source = await fs.readFile(`${postsDir}/${postID}.md`);
    const { content, data: dataUnknown } = matter(source.toString());
    const data = dataUnknown as IPost;
    const publishedAt = new Date(postID.split("-").slice(0, 3).join("-"));
    return {
      id: postID,
      title: data.title,
      draft: data.draft === true,
      publishedAt: publishedAt.toISOString(),
      content,
      path: `/posts/${postID}`,
      incomplete: data.incomplete === true,
      description: data.description ?? null,
      hasMath: data.hasMath === true,
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
