#!/usr/bin/env bash
set -euo pipefail

echo "== Python tests =="
bash scripts/test-python.sh

echo "\n== JavaScript tests =="
bash scripts/test-js.sh
