#!/bin/bash

if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
	exit 0
fi

if [ "${TRAVIS_BRANCH}" == "master" ]; then
	BUCKET="docs.particle.io"
elif [ "${TRAVIS_BRANCH}" == "staging" ]; then
	BUCKET="docs.staging.particle.io"
elif [ "${TRAVIS_BRANCH}" == "prerelease" ]; then
	BUCKET="prerelease-docs.particle.io"
	AWS_ACCESS_KEY_ID=$PRERELEASE_AWS_ACCESS_KEY_ID
	AWS_SECRET_ACCESS_KEY=$PRERELEASE_AWS_SECRET_ACCESS_KEY
else
	exit 0
fi

: ${AWS_ACCESS_KEY_ID:?"REQUIRED"}
: ${AWS_SECRET_ACCESS_KEY:?"REQUIRED"}

set -e
pip install --user s3cmd
s3cmd sync --no-preserve --no-progress --acl-public --delete-removed --no-mime-magic --guess-mime-type --add-header="Cache-Control:max-age=300" --exclude='search-index.json' build/ "s3://${BUCKET}/"
s3cmd sync --no-preserve --no-progress --acl-public --no-mime-magic --guess-mime-type --add-header="Cache-Control:max-age=300" --add-header="Content-Encoding:gzip" build/search-index.json "s3://${BUCKET}/"
