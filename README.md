# Distributed MIPI-CSI Vision & Telemetry Pipeline

A consolidated, headless edge-computing surface for remote monitoring and telemetry orchestration. The interface is designed to supervise distributed incubation arrays, trigger asynchronous autofocus or snapshots, and maintain a centralized telemetry log.

## System Architecture & Hardware Topology

The Distributed MIPI-CSI Vision Pipeline operates on a headless, edge-computing architecture. To ensure maximum resource allocation to image processing and telemetry, all localized controller nodes (Raspberry Pi 5s) are deployed using a headless, minimal OS environment (Debian Stable Lite branch, pre-Trixie). Node orchestration, lifecycle management, and system updates are exclusively handled via localized SSH access.

### 1. Primary Optical Array (MIPI-CSI)
Each edge node manages a dual-lane MIPI-CSI optical array utilizing phase-detection autofocus (PDAF) sensors. 
* **Hardware:** 1x Pi Camera Module 3 NoIR & 1x Pi Camera Module 3 NoIR Wide (Sony IMX708).
* **Driver Stack:** Synchronous hardware calls are routed through the `v4l2` backend via `libcamera` and orchestrated using discrete `picam2` Python scripts to prevent bus contention on the native CSI interface.

### 2. Auxiliary Ultra-Low-Light Sensor (UVC)
An external ultra-low-light sensor (Arducam Nighthawk) is physically provisioned via the USB bus. 
* **Integration Constraint:** Because this sensor relies on USB Video Class (UVC) protocols rather than the native MIPI-CSI interface, it cannot natively leverage the existing `picam2` execution loop. Future integration of this sensor into the concurrent stream will require developing an isolated, asynchronous V4L2/UVC polling thread to prevent I/O blocking against the primary IMX708 sensors.

### 3. Out-of-Band Illumination Control Plane
To adhere to strict power-draw tolerances on the primary Raspberry Pi 5 SoC, the environmental illumination system operates entirely out-of-band. 
* **Hardware:** Dedicated lighting controllers are logically isolated from the primary vision nodes.
* **Network Protocol:** Illumination telemetry and adjustments are handled via an independent, localized 802.11 network (SSID: `pico`), hosted autonomously by a Raspberry Pi Pico micro-controller. This ensures that peak power draw from the lighting arrays does not induce under-voltage throttling on the vision pipeline edge nodes.

## Concurrent Streaming Backend (Golang) - WIP
An experimental backend written in Go is included in `go-backend/` to handle asynchronous multiplexing of the MJPEG boundaries. This is designed to replace the legacy Python proxying for higher throughput but requires knowledge of Goroutines to extend.
