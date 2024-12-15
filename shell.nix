{
  pkgs ? import ./nix,
}:

with pkgs;
let
  nodejs = nodejs_22;
in
mkShell {
  buildInputs = [
    (yarn.override { inherit nodejs; })
    nixfmt-rfc-style
    nodejs
    awscli2
    update-static-assets
  ];
}
