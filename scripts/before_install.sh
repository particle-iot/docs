#!/bin/bash

if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
    exit 0
fi

if [ "${TRAVIS_BRANCH}" == "staging" ]; then
    BRANCH="origin/staging"
else
    BRANCH="origin/production"
fi

git submodule update --init --recursive && cd api-node && git fetch && git merge ${BRANCH} && cd .. || true;
