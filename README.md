# Raspberry Pi Incubator Camera Suite

A consolidated monitoring surface for six Raspberry Pi 5 CSI cameras. The interface is designed for a dedicated Pi-driven kiosk so you can supervise three incubators, trigger autofocus or snapshots, and keep a lightweight automation log without juggling several browser tabs.

## Features
- **Unified dashboard** – live tiles for every camera, chamber telemetry, and uptime at a glance.
- **Actionable controls** – pause/resume individual streams, fire autofocus or focus sweeps, run immediate or scheduled snapshots.
- **Global presets** – toggle overlays, HDR compensation, or autofocus behavior for the entire fleet.
- **Operator log** – captures system events and manual actions for traceability.

## Repository layout
```
ui/                 # Production-ready kiosk interface (index.html, styles.css, app.js)
archive/prototypes/ # Legacy HTML mockups that previously lived under "HTML FILes"
archive/camera-stream.html  # Original single-stream proof of concept
```

## Camera fleet
| System | Hostname | Location | Camera 1 | Camera 2 |
| --- | --- | --- | --- | --- |
| Incubator Myrtle #1 | `pi5_cam_1_myrtle` | Bay A | `http://192.168.2.43:5000/Camera_1` | `http://192.168.2.43:5000/camera2` |
| Incubator Myrtle #2 | `pi5_cam_2_myrtle` | Bay B | `http://192.168.2.158:5000/camera1` | `http://192.168.2.18:5000/camera2` |
| Incubator Myrtle #3 | `pi5_cam_3_myrtle` | Bay C | `http://192.168.2.168:5000/camera1` | `http://192.168.2.168:5000/camera2` |

## Getting started on a Raspberry Pi kiosk
1. Copy the `ui/` directory to the Pi that drives your display (or clone this repository directly on that Pi).
2. Open `ui/index.html` in Chromium or any modern browser. For a full-screen kiosk experience on Raspberry Pi OS, launch Chromium with `chromium-browser --kiosk /path/to/ui/index.html`.
3. Update the stream URLs in `ui/app.js` if your camera endpoints change.
4. Use the quick controls along the top of the page to refresh feeds, switch grid density, or toggle overlays. Each camera tile exposes buttons for start/stop, snapshot, autofocus, and a delayed snapshot timer.

## Notes
- The snapshot buttons generate downloadable links that target the MJPEG/HTTP stream endpoints defined in `ui/app.js`. Depending on how authentication is handled on your network you may need to front these URLs with a proxy that exposes still-image endpoints.
- Legacy experiments are preserved under `archive/` for reference but are no longer wired into the kiosk experience.

## Running the webhook API on a Raspberry Pi
Use the provided setup script to deploy and keep the API running on boot:

1. Copy this repository to your Raspberry Pi or set `REPO_URL` to the Git URL you want to deploy.
2. (Optional) Override the install location with `TARGET_DIR` (defaults to `/home/pi/Hooks`).
3. Run the setup script:
   ```bash
   REPO_URL=https://github.com/your-org/Hooks.git \
   TARGET_DIR=/home/pi/Hooks \
   bash scripts/setup-pi-api.sh
   ```
4. The script will install Node.js/npm (via `apt`), clone or update the repository, install dependencies, create a `.env` file with `PORT`, and register a `hooks-api` systemd service at `/etc/systemd/system/hooks-api.service` that starts on boot.
5. Check service health with `sudo systemctl status hooks-api.service`.

### Configure the API port
The API reads its port from `.env`:
```
PORT=3000
```
Copy `.env.example` to `.env` and adjust `PORT` if needed. The systemd unit loads this file automatically.

### Firewall and router access
- On the Pi: allow inbound traffic to the API port (example with UFW): `sudo ufw allow 3000/tcp` (replace `3000` with your chosen port).
- On your router: forward an external port to the Pi’s internal `PORT` and IP address. Reserve a static DHCP lease for the Pi so the mapping remains stable.
- If exposing the API to the public internet, place it behind a reverse proxy with TLS and restrict allowed source IPs where possible.

### Example API calls
Assuming your Pi is reachable at `http://<pi-address>:3000`:

Create a record via the webhook endpoint:
```bash
curl -X POST "http://<pi-address>:3000/webhook" \
  -H "Content-Type: application/json" \
  -d '{"event":"create_user","data":{"name":"Ada","role":"operator"}}'
```

Fetch the accumulated data:
```bash
curl "http://<pi-address>:3000/data"
```
