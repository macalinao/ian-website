{ pkgs ? import ./nix }:

with pkgs;
mkShell {
  buildInputs = [
    (yarn.override { nodejs = nodejs-14_x; })
    nodejs-14_x
    awscli2
    update-static-assets
  ];
}
