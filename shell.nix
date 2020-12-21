{ pkgs ? import ./nix }:

let
  pre-commit-check = pkgs.nix-pre-commit-hooks.run {
    src = ./.;
    hooks = {
      nixfmt.enable = true;
      shellcheck.enable = true;
      prettier.enable = true;
    };
  };
in with pkgs;
mkShell {
  buildInputs = [ yarn nodejs awscli2 update-static-assets ];
  shellHook = ''
    ${pre-commit-check.shellHook}
  '';
}
