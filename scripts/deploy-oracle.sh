#!/usr/bin/env bash
set -euo pipefail
: "${DEPLOY_HOST:?Configura DEPLOY_HOST}"
: "${DEPLOY_SSH_KEY:?Configura DEPLOY_SSH_KEY}"
release="$(git rev-parse HEAD)"
remote="/opt/nihongonotto/releases/$release"
ssh_options=(-i "$DEPLOY_SSH_KEY" -o BatchMode=yes -o StrictHostKeyChecking=yes)
ssh "${ssh_options[@]}" "$DEPLOY_HOST" "mkdir -p '$remote'"
rsync -az --exclude=.git --exclude=node_modules --exclude='.next*' --exclude='.env*' --exclude='*.pem' --exclude='*.key' --exclude=supabase/.temp -e "ssh -i '$DEPLOY_SSH_KEY' -o BatchMode=yes -o StrictHostKeyChecking=yes" ./ "$DEPLOY_HOST:$remote/"
ssh "${ssh_options[@]}" "$DEPLOY_HOST" "sudo flock /opt/nihongonotto/deploy.lock bash -c 'set -eu; cd $remote; export RELEASE_TAG=$release; docker compose --env-file /opt/nihongonotto/shared/app.env -f deploy/compose.yaml build; docker compose --env-file /opt/nihongonotto/shared/app.env -f deploy/compose.yaml up -d --wait; ln -sfn $remote /opt/nihongonotto/current'"
