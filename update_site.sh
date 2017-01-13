#!/usr/bin/env bash

cd _site && git add -A . && git commit -m "Update site" && git push origin gh-pages
