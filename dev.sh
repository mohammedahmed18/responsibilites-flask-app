#!/bin/sh
concurrently "cd server && ./server.py" "yarn --cwd ./static dev"

