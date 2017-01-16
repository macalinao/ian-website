#!/usr/bin/env bash

stack exec site build
cd _site && git add -A . && git commit -m "Update site" && git push origin gh-pages
