/* eslint-disable @next/next/no-img-element */
import { default as NextImage } from "next/image.js";
import { default as Link } from "next/link.js";
import type { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import type React from "react";

import { TokenIcon } from "~src/components/TokenIcon/index.js";

export const mdxComponents = {
  a: ({
    href,
    ...props
  }: Omit<
    DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    "ref"
  > & { href?: string }) => {
    if (href?.startsWith("http")) {
      return (
        <a {...props} href={href} target="_blank" rel="noreferrer">
          {props.children}
        </a>
      );
    } else if (href?.startsWith("#")) {
      // footnotes
      return (
        <a {...props} href={href}>
          {props.children}
        </a>
      );
    } else {
      return (
        <Link {...props} href={href ?? "#"}>
          {props.children}
        </Link>
      );
    }
  },
  TokenIcon,
  NextImage,
  img: ({
    src,
    alt,
    ...props
  }: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > & { src?: string }) => {
    if (src?.startsWith("/")) {
      return <img {...props} src={`https://static.ian.pw${src}`} alt={alt} />;
    }
    return <img {...props} src={src} alt={alt} />;
  },
};
