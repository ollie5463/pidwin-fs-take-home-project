#!/usr/bin/env just --justfile

install-deps:
  cd ./frontend && npm i
  cd ./backend && npm i

run-projects:
  cd ./backend && docker-compose up --detach
  cd ./frontend && npm start
