#!/usr/bin/env bash

# delete site
rm -fr _cache && rm -fr _site && git clone git@github.com:macalinao/ian.pw.git _site && \

  # checkout gh-pages
  cd _site && git checkout gh-pages && cd .. && \

  # build site
  stack exec site build && cd _site && \

  # commit changes
  git add -A . && git commit -m "Update site" && git push origin gh-pages
