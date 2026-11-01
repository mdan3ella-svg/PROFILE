#!/bin/sh
set -eu
cd "$(dirname "$0")"
npm install --no-audit --no-fund
npm run build
printf 'Built: dist/index.html and dist/operator-manual.html\n'
