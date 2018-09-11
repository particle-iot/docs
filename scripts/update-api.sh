#!/bin/bash

set -e

if [ "$1" == "--force" ]; then
	FORCE=1
fi

if [ "${TRAVIS_BRANCH}" == "staging" ]; then
    BRANCH="staging"
else
    BRANCH="production"
fi

# Do a shallow clone
DEPTH=3

[ -d particle-api-js ] || git clone --depth ${DEPTH} https://github.com/particle-iot/particle-api-js.git
cd particle-api-js && git fetch && git merge origin/master && cd ..

if [ "${TRAVIS_PULL_REQUEST}" != "false" -a "${FORCE}" != 1 ]; then
    exit 0
fi

[ -d api-service ] || git clone --depth ${DEPTH} -b ${BRANCH} https://github.com/particle-iot/api-service.git
cd api-service && git fetch && git merge origin/${BRANCH} && cd ..

[ -d api-service-libraries ] || git clone --depth ${DEPTH} https://github.com/particle-iot/api-service-libraries.git
cd api-service-libraries && git fetch && git merge origin/master && cd ..

