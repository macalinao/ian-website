import { readFile } from "fs/promises";
import matter from "gray-matter";
import renderToString from "next-mdx-remote/render-to-string";
import path from "path";

export interface IContent {
  data: Record<string, any>;
  source: string;
}

export const fetchContent = async (filePath: string): Promise<IContent> => {
  const file = await readFile(path.join(process.cwd(), "content", filePath));
  const { content, data } = matter(file.toString());
  const source = await renderToString(content);
  return { data, source };
};
