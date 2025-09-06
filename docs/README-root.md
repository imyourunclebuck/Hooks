# Incubator Monitoring System

## Overview
This project provides a multi-camera monitoring and control system for incubators, using Raspberry Pi devices and a web-based dashboard. The system enables real-time video feeds, camera control, and remote monitoring for research or automation purposes.

## Features
- Live video feeds from multiple Raspberry Pi cameras
- Web-based dashboard for monitoring and control
- Camera controls (refresh, hide/show, rotate, autofocus, etc.)
- Modular and extensible codebase
- Documentation and test scripts included

## Getting Started
1. Connect all Raspberry Pi devices and cameras to the same local network.
2. Deploy the backend and static web files as described in the documentation.
3. Access the dashboard from any browser on the network.

## Email Timelapse Script Setup
This project includes a timelapse script that requires email credentials for notifications. **Do not hardcode credentials in your code.**

### Storing Credentials Securely
Store your credentials as environment variables in your shell profile (e.g., `~/.zshrc`, `~/.bashrc`) or in a `.env` file (if using `python-dotenv`).

#### Example for `~/.zshrc` or `~/.bashrc`:
```sh
export EMAIL_SENDER="your_email@gmail.com"
export EMAIL_APP_PASSWORD="your_app_password"
export EMAIL_RECIPIENT="recipient@example.com"
```
After editing, reload your shell:
```sh
source ~/.zshrc  # or source ~/.bashrc
```

#### Example `.env` file (if using python-dotenv):
```env
EMAIL_SENDER=your_email@gmail.com
EMAIL_APP_PASSWORD=your_app_password
EMAIL_RECIPIENT=recipient@example.com
```

**Never commit your credentials or `.env` file to version control.**

## Folder Structure
- `public/html/` — Web dashboard and camera feed HTML files
- `src/server/` — Backend and camera server scripts
- `src/middleware/` — Middleware and helper scripts
- `test/` — Test scripts and HTTP requests
- `docs/` — Documentation and instructions
- `scripts/` — Automation and shell scripts

## Security & Privacy
This repository does not contain any sensitive credentials or private network information. Please refer to your own deployment for network addresses and authentication details.

## License
This project is for educational and research use. See `LICENSE` for details.
