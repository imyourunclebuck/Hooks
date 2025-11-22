#!/usr/bin/env bash
set -euo pipefail

REPO_URL=${REPO_URL:-$(git config --get remote.origin.url || true)}
TARGET_DIR=${TARGET_DIR:-/home/pi/Hooks}
SERVICE_NAME=hooks-api
SERVICE_FILE=/etc/systemd/system/${SERVICE_NAME}.service

if [[ -z "${REPO_URL}" ]]; then
  echo "REPO_URL is not set and no Git remote was found. Export REPO_URL to the repository you want to deploy." >&2
  exit 1
fi

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

install_node() {
  if command_exists node && command_exists npm; then
    echo "Node.js and npm already installed."
    return
  fi

  echo "Node.js or npm not found. Installing via apt..."
  sudo apt-get update
  sudo apt-get install -y nodejs npm
}

sync_repo() {
  if [[ -d "${TARGET_DIR}/.git" ]]; then
    echo "Updating existing repository in ${TARGET_DIR}..."
    git -C "${TARGET_DIR}" pull --ff-only
  else
    echo "Cloning repository to ${TARGET_DIR}..."
    git clone "${REPO_URL}" "${TARGET_DIR}"
  fi
}

install_dependencies() {
  echo "Installing npm dependencies..."
  (cd "${TARGET_DIR}" && npm install)
}

create_env() {
  local env_file="${TARGET_DIR}/.env"
  if [[ -f "${env_file}" ]]; then
    echo "Existing .env detected at ${env_file}. Skipping creation."
  else
    local default_port=${PORT:-3000}
    echo "PORT=${default_port}" > "${env_file}"
    echo "Created ${env_file} with PORT=${default_port}."
  fi
}

configure_service() {
  echo "Creating systemd service at ${SERVICE_FILE}..."
  sudo tee "${SERVICE_FILE}" >/dev/null <<SERVICE
[Unit]
Description=Hooks API webhook server
After=network.target

[Service]
WorkingDirectory=${TARGET_DIR}
ExecStart=/usr/bin/env node ${TARGET_DIR}/webhook.js
EnvironmentFile=${TARGET_DIR}/.env
Restart=on-failure
User=pi

[Install]
WantedBy=multi-user.target
SERVICE

  echo "Reloading systemd and enabling service..."
  sudo systemctl daemon-reload
  sudo systemctl enable --now "${SERVICE_NAME}.service"
  sudo systemctl status "${SERVICE_NAME}.service" --no-pager
}

install_node
sync_repo
install_dependencies
create_env
configure_service

echo "Setup complete. The Hooks API should now start on boot and listen on the configured PORT."

