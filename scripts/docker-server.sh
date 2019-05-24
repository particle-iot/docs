#!/bin/sh

if [ -z $REPO_PATH ]; then
    echo "$0 ERROR: The REPO_PATH environment variable is required!"
    echo "Try this: export REPO_PATH=\`pwd\`"
    exit 5
elif ! [ -d $REPO_PATH ]; then
    echo "$0 ERROR: $REPO_PATH is not a valid directory"
    exit 6
fi

docker run --interactive --mount type=bind,source=$REPO_PATH,target=/particle-iot/docs --net host --rm --tty particle/docs
