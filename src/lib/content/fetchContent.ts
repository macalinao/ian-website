import matter from "@gr2m/gray-matter";
// eslint-disable-next-line import-x/no-nodejs-modules
import { readFile } from "fs/promises";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
// eslint-disable-next-line import-x/no-nodejs-modules
import path from "path";

interface ContentData {
  title: string;
}

export interface IContent {
  data: ContentData;
  source: MDXRemoteSerializeResult;
}

export const fetchContent = async (filePath: string): Promise<IContent> => {
  const file = await readFile(path.join(process.cwd(), "content", filePath));
  const { content, data: dataUnknown } = matter(file.toString());
  const data = dataUnknown as ContentData;
  const source = await serialize(content);
  return { data, source };
};
