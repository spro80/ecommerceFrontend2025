#!/usr/bin/env bash
set -euo pipefail

# Run Node's test runner recursively for all JS tests
node --test "problems/**/*.test.js" | cat
