#!bin/bash/ -e

cd ..

if git status --porcelain 2>/dev/null | grep -q .; then
  echo "Working copy is dirty" >&2
  exit 1
fi

grunt ngdocs
git checkout gh-pages
cp -rf site_tmp/* .
rm -rf site_tmp
git add .
git commit -m "Automatic gh-pages commit"
git push origin gh-pages
git checkout master
