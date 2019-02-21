#!/bin/bash
cd "$(dirname ${BASH_SOURCE[0]})"

invalidate() {
  aws cloudfront create-invalidation --distribution-id $CLOUFRONT_DISTRIBUTION --paths "/*"
}

invalidate
