{
  description = "Ian's personal website.";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { flake-utils, nixpkgs, ... }:
    (flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [
            (_: pkgs: {
              update-static-assets =
                pkgs.writeShellScriptBin "update-static-assets" ''
                  set +x
                  GIT_ROOT=$(git rev-parse --show-toplevel)
                  if [ ! -e ./static-assets ]; then
                    echo "Incorrect directory; must have static-assets folder."
                    exit 1
                  fi
                  ${pkgs.awscli2}/bin/aws s3 sync --exclude '.*' \
                   --profile ian --acl public-read \
                    $GIT_ROOT/static-assets s3://static.ian.pw/images/
                '';
            })
          ];
        };
      in
      { devShell = import ./shell.nix { inherit pkgs; }; }));
}
