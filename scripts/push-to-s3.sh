#!/bin/bash
cd "$(dirname ${BASH_SOURCE[0]})"

push() {
  aws s3 cp ../build $S3_BUCKET --recursive
}

push
