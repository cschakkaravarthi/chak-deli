#!/bin/bash

set -e

######################
# This Runs only for feature  specific build#

if [[ -f override_env ]]; then
  export IFS=";"
  override_environment=$(<override_env)
  for env_value in $override_environment; do
    export $env_value
  done
fi
###############################


if [[ -z "$SERVICE_NAME" ]]; then
  export SERVICE_NAME=umgc_delivery
fi

SOURCE_DIR=$PWD

inject_git_tag() {
  set +e
  GIT_TAG=${GIT_TAG:-"$(git rev-parse --short HEAD)"}
  echo "$GIT_TAG" > dist/config/git_tag.txt
  set -e
}

##############
# BUILD ENVS #
##############

npm_run_test() {
  npm run test
  if [[ $? -ne 0 ]]; then
    echo Test Error > /dev/stderr
    exit 1
  fi
}

main() {
  npm i -g eslint
  npm config set registry https://artifactory.umusic.net/artifactory/api/npm/umg-npm/
  rm -rf node_modules
  npm install
  npm_run_test
  npm run allenvs
  npm run build
  npm prune --production
  if [[ $? -ne 0 ]]; then
    echo Build Error > /dev/stderr
    exit 1
  fi
  inject_git_tag
}
main "$@"
