#!/usr/bin/env bash
set -euo pipefail

shopt -s nullglob

echo "Discovering Python test suites..."
python_dirs=(problems/*/python)

if [ ${#python_dirs[@]} -eq 0 ]; then
  echo "No Python directories found under problems/."
  exit 0
fi

for dir in "${python_dirs[@]}"; do
  if compgen -G "$dir/test_*.py" > /dev/null; then
    echo "\n== Running tests in $dir =="
    python3 -m unittest discover -s "$dir" -p "test_*.py" -v | cat
  else
    echo "Skipping $dir (no test_*.py files)"
  fi
done
