let
  sources = import ./sources.nix;
  nixpkgs = import sources.nixpkgs {
    overlays = [
      (_: pkgs: { nodejs = pkgs.nodejs-12_x; })
      (_: pkgs: { yarn = pkgs.yarn.override { nodejs = pkgs.nodejs; }; })
      (_: pkgs: {
        nix-pre-commit-hooks = import (pkgs.fetchFromGitHub {
          owner = "cachix";
          repo = "pre-commit-hooks.nix";
          rev = "d16e007e6bd263ba5899a9a425d76a78906570cd";
          sha256 = "1c0lv3yzq1kkqm4j37wl5hlawlsrj1413vkr1mdm661klad2sa0d";
        });
      })
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
in nixpkgs
