#!/usr/bin/env bash

stack exec site build
git subtree push --prefix _site origin gh-pages
