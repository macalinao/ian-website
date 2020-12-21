declare module "next-mdx-remote" {
  export interface IMDXSource {
    compiledSource: string;
    renderedOutput: string;
  }
}

declare module "next-mdx-remote/hydrate" {
  import { IMDXSource } from "next-mdx-remote";
  const def: (source: IMDXSource, args: { components: any }) => React.ReactNode;
  export default def;
}

declare module "next-mdx-remote/render-to-string" {
  import { IMDXSource } from "next-mdx-remote";
  const def: (content: string, ...args: any[]) => IMDXSource;
  export default def;
}
