#!/bin/bash

if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
	exit 0
fi

if [ "${TRAVIS_BRANCH}" == "master" ]; then
	BUCKET="docs.particle.io"
elif [ "${TRAVIS_BRANCH}" == "staging" ]; then
	BUCKET="docs.staging.particle.io"
else
	exit 0
fi

: ${AWS_ACCESS_KEY_ID:?"REQUIRED"}
: ${AWS_SECRET_ACCESS_KEY:?"REQUIRED"}

set -e
pip install --upgrade pip
pip install s3cmd
s3cmd sync -v -d --dry-run --acl-public --delete-removed --no-mime-magic --guess-mime-type --add-header="Cache-Control:max-age=300" build/ "s3://${BUCKET}/"
