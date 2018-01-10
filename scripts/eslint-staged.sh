#!/bin/bash

for file in $(git diff --cached --name-only | grep -E '\.js$')
do
  git show ":$file" | node_modules/.bin/eslint --stdin --stdin-filename "$file" # we only want to lint the staged changes, not any un-staged changes
done
