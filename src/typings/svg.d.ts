declare module "*.svg" {
  type SVGComponent = React.FC<React.SVGProps<SVGSVGElement>>;
  const component: SVGComponent;
  export = component;
}
