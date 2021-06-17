#!/bin/bash

if [ "${CIRCLE_PULL_REQUEST}" != "false" ]; then
	exit 0
fi

if [ "${CIRCLE_BRANCH}" == "master" ]; then
	BUCKET="docs.particle.io"
elif [ "${CIRCLE_BRANCH}" == "staging" ]; then
	BUCKET="docs.staging.particle.io"
elif [ "${CIRCLE_BRANCH}" == "prerelease" ]; then
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

