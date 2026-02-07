#!/bin/bash
set -e

echo "Building NestJS application..."
npm run build

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Build and migrations completed successfully!"
