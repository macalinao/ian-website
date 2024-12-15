import { default as Link } from "next/link.js";
import type React from "react";

import { ProseTitle } from "~src/components/Prose.js";

interface Props {
  title: string;
  children?: React.ReactNode;
}

export const BasicPage: React.FC<Props> = ({ title, children }: Props) => {
  return (
    <>
      <ProseTitle>{title}</ProseTitle>
      {children}
      <div tw="my-8">
        <Link href="/" tw="font-medium underline">
          Back to home
        </Link>
      </div>
    </>
  );
};
