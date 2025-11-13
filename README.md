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
