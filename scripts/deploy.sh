#!/bin/bash
GITHUB_ID=zlargon
PROJECT_NAME=badge-generator
DIR=$(dirname $0)/..
cd $DIR

VERSION=$(git log -1 --pretty="%h")
DATE=$(date "+%Y-%m-%d %H:%M:%S")

# webpack checker
if [ -z "$(which webpack)" ]; then
  echo "webpack is not installed"
  exit;
fi

# build production bundle.js
webpack -p

# copy folder 'bundle.js' and 'index.html' to 'delopy'
rm -rf deploy
mkdir deploy
cp index.html bundle.js deploy

# push to github
cd deploy
git init
git add -A
git commit -m "deploy $VERSION on $DATE"
git checkout -b gh-pages
git remote add github "git@github.com:$GITHUB_ID/$PROJECT_NAME.git"
git push -f github gh-pages
