{ pkgs ? import ./nix }:

with pkgs;
let
  nodejs = nodejs-18_x;
in
mkShell {
  buildInputs = [
    (yarn.override { inherit nodejs; })
    nodejs
    awscli2
    update-static-assets
  ];
}
