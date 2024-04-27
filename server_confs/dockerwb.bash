#!/bin/bash

executeCode() {
    output=$(docker run --rm  -v "$PWD/client_codes/":/usr/src/app python python3 /usr/src/app/index.py)
    echo "$output"
}

if [ -z "$(docker images -q python:latest 2> /dev/null)" ]; then
    if ! docker pull python:latest; then
        exit 1
    fi

fi

executeCode
