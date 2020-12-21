import NextImage from "next/image";
import Link from "next/link";
import React, { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import { TokenIcon } from "~src/components/TokenIcon";

export const mdxComponents = {
  a: ({
    href,
    ...props
  }: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > & { href: string }) => {
    if (href?.startsWith("http")) {
      return (
        <a {...props} href={href} target="_blank" rel="noopener noreferrer"></a>
      );
    } else if (href?.startsWith("#")) {
      // footnotes
      return <a {...props} href={href}></a>;
    } else {
      return (
        <Link {...props} href={href}>
          <a>{props.children}</a>
        </Link>
      );
    }
  },
  TokenIcon,
  NextImage,
  KaTeXCSS: () => (
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css"
      integrity="sha384-BdGj8xC2eZkQaxoQ8nSLefg4AV4/AwB3Fj+8SUSo7pnKP6Eoy18liIKTPn9oBYNG"
      crossOrigin="anonymous"
    />
  ),
};
