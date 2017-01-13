#!/bin/bash

set -e

if [ "$1" == "--force" ]; then
	FORCE=1
fi

if [ "${TRAVIS_PULL_REQUEST}" != "false" -a "${FORCE}" != 1 ]; then
    exit 0
fi

if [ "${TRAVIS_BRANCH}" == "staging" ]; then
    BRANCH="staging"
else
    BRANCH="production"
fi

[ -d api-node ] || git clone -b ${BRANCH} git@github.com:spark/api-node
cd api-node && git fetch && git merge origin/${BRANCH} && cd ..

[ -d api-service-libraries ] || git clone git@github.com:spark/api-service-libraries
cd api-service-libraries && git fetch && git merge origin/master && cd ..

