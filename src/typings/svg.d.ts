declare module "*.svg" {
  import type * as React from "react";

  const element: React.FC<React.SVGProps<SVGSVGElement>>;
  export default element;
}
