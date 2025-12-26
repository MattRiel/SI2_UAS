#!/bin/bash
set -e

if [ ! -f "package.json" ]; then
    echo "Initializing Next.js in a temporary directory..."
    mkdir -p /tmp/next-init
    cd /tmp/next-init
    npx -y create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-install
    echo "Copying files to /app..."
    cp -rT /tmp/next-init /app
    cd /app
    rm -rf /tmp/next-init
fi

if [ ! -d "node_modules" ]; then
    echo "Installing node dependencies..."
    npm install
fi

exec "$@"
