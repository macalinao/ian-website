import tw, { css, styled } from "twin.macro";

export const Prose = styled.div(() => [
  tw`text-sm md:text-base`,
  css`
    p {
      ${tw`mb-2`}
    }
    ol {
      ${tw`list-decimal`}
    }
    ul {
      ${tw`list-disc`}
    }
    ol,
    ul {
      & > li {
        ${tw`ml-4`}
      }
    }
    :not(li) > ol,
    :not(li) > ul {
      ${tw`my-2 md:my-4`}
    }
    h2 {
      ${tw`text-lg mt-4 mb-2 md:(text-xl mt-8 mb-4)`}
    }
    h3 {
      ${tw`font-bold text-gray-900 text-base mt-4 mb-2 md:text-lg`}
    }
    pre {
      ${tw`text-left text-base bg-gray-50 px-5 py-2.5 overflow-x-scroll`}
    }
    .data-footnote-backref {
      // system font uses emojis, so we override the backref font here
      font-family: sans-serif;
    }
    h1,
    h2,
    h3 {
      & > a {
        ${tw`text-gray-900`}
      }
    }
  `,
  css`
    .footnotes {
      margin-top: 60px;
      color: #454545;
      border-top: 1px solid #ccc;

      hr {
        display: none;
      }

      .footnote-backref {
        margin-left: 8px;
        font-size: 14px;
      }
    }
  `,
]);

export const ProseTitle = styled.h1(
  () => tw`text-3xl my-4 leading-normal md:(text-4xl my-8)`
);
