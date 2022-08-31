import tw, { css, styled } from "twin.macro";

export const Prose = styled.div(() => [
  tw`text-sm md:text-base`,
  css`
    ul {
      ${tw`list-disc list-inside`}
      & > li {
        ${tw`ml-4`}
      }
    }
    :not(li) > ul {
      ${tw`my-2 md:my-4`}
    }
    h2 {
      ${tw`text-base mt-4 mb-2 md:text-lg`}
    }
    h3 {
      ${tw`font-bold text-gray-900 text-sm mt-4 mb-2 md:text-base`}
    }
    pre {
      ${tw`text-left text-base bg-gray-50 px-5 py-2.5 overflow-x-scroll`}
    }
  `,
]);

export const ProseTitle = styled.h1(
  () => tw`text-3xl my-4 leading-normal md:(text-4xl my-8)`
);
