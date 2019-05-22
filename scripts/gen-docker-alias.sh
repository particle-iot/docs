#!/bin/bash
set -o errexit -o pipefail -o noclobber -o nounset

function display_help ()
{
    echo "\
usage: gen-docker-alias --repo-path [--help] [--update-bash]

Generate docker command alias based on your repository location

  -h, --help            Display this help and exit.
  -r, --repo-path       [REQUIRED] Absolute path of the particle-iot documentation repository.
  -u, --update-bash     Add alias to Bash shell permanently (only do this once).
"
}

# Utilized Enhanced `getopt`
! getopt --test > /dev/null
if [ ${PIPESTATUS[0]} -ne 4 ]; then
    echo '\
`getopt --test` failed in this environment.
Please confirm "GNU getopt" is installed on this device.
'
    exit 1
fi

OPTIONS=hr:u
LONGOPTS=help,repo-abs-path:,update

# -use ! and PIPESTATUS to get exit code with errexit set
# -temporarily store output to be able to check for errors
# -activate quoting/enhanced mode (e.g. by writing out “--options”)
# -pass arguments only via   -- "$@"   to separate them correctly
! PARSED=$(getopt --options=$OPTIONS --longoptions=$LONGOPTS --name "$0" -- "$@")
if [ ${PIPESTATUS[0]} -ne 0 ]; then
    # e.g. return value is 1
    #  then getopt has complained about wrong arguments to stdout
    exit 2
fi

# Read getopt’s output this way to handle the quoting right:
eval set -- "$PARSED"

# Set default(s)
REPO_PATH=""
UPDATE_BASH=false

# Parse parameter(s)
while true; do
    case "$1" in
        -h|--help)
            shift
            display_help
            exit 0
            ;;
        -r|--repo-path)
            REPO_PATH="$2"
            shift 2
            ;;
        -u|--update-bash)
            shift 1
            UPDATE_BASH=true
            exit 0
            ;;
        --)
            shift
            break
            ;;
        *)
            echo "Encountered error while parsing arguments!"
            exit 3
            ;;
    esac
done

# Handle invalid arguments
if [ $# -ne 0 ]; then
    echo "$0: Unknown argument \"$1\" supplied!"
    display_help
    exit 4
fi

if [ -z $REPO_PATH ]; then
    echo "$0 ERROR: The --repo-path argument is required!"
    display_help
    exit 5
elif ! [ -d $REPO_PATH ]; then
    echo "$0 ERROR: $REPO_PATH is not a valid directory"
    exit 6
fi

if [ $UPDATE_BASH = true ]; then
    echo "alias particle-docs=\"docker run --interactive --mount type=bind,source=$REPO_PATH,target=/particle-iot/docs --net host --rm --tty particle/docs\"" >> ~/.bash_aliases
fi

alias particle-docs="docker run --interactive --mount type=bind,source=$REPO_PATH,target=/particle-iot/docs --net host --rm --tty particle/docs"
