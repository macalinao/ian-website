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
    nodejs
    awscli2
    update-static-assets
  ];
}
