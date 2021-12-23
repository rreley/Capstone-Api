#!/bin/bash

echo "Pulling..."
git pull

echo "Building API..."
ENV=production docker-compose up -d --build