{ sources ? import ./nix/sources.nix, pkgs ? import sources.nixpkgs { } }:

let
  nix-pre-commit-hooks = import (pkgs.fetchFromGitHub {
    owner = "cachix";
    repo = "pre-commit-hooks.nix";
    rev = "d16e007e6bd263ba5899a9a425d76a78906570cd";
    sha256 = "1c0lv3yzq1kkqm4j37wl5hlawlsrj1413vkr1mdm661klad2sa0d";
  });

  pre-commit-check = nix-pre-commit-hooks.run {
    src = ./.;
    hooks = {
      nixfmt.enable = true;
      shellcheck.enable = true;
      prettier.enable = true;
    };
  };
in with pkgs;
mkShell {
  buildInputs = [ nodejs-12_x (yarn.override { nodejs = nodejs-12_x; }) ];
  shellHook = ''
    ${pre-commit-check.shellHook}
  '';
}