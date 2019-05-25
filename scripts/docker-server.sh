#!/bin/bash
docker run --interactive --mount type=bind,source=$(pwd),target=/particle-iot/docs --net host --rm --tty particle/docs "$@"
