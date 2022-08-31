import type { MDXRemoteProps } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";

import { Prose } from "./Prose.js";

type Props = MDXRemoteProps;

export const MDXProse: React.FC<Props> = ({ ...source }: Props) => {
  return (
    <Prose>
      <MDXRemote {...source} />
    </Prose>
  );
};
