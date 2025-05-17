Incubator monitoring project.
Camera’s reset to default settings when switching between picamera2, lib camera and other UIs.

I’m working on a project that involves 6 pi5s that each stream 2 CSI cameras ( 1 camera module 3 NoIR Wide and one camera module 3 Noir) 

The purpose of this project is to capture photos at exact times dictated by the incubation periods of given samples, while also providing a live feed from inside an incubator to help maintain a steady environment.

Initially, I used libcamera, running two terminal windows to provide a live feed. An automation process would then take screenshots and save the photos. This method of streaming worked, but it wasn’t ideal—it generated heat and significantly slowed down the Raspberry Pi 5. It was also cumbersome to stream from three incubators on one screen, as it required logging into Pi Connect and opening three separate browser windows.

I then switched to Picamera2, streaming on port 5000. I created a basic HTML page with the IP addresses of all three Pis, which allowed me to stream to a browser on a fourth Pi connected to the display inside the lab. This setup works, but lacks camera controls. The settings revert to default—even when adjustments are made. For instance, using libcamera shows different settings than what is used during streaming. I attempted to include an autofocus command in the HTML, but it doesn’t appear to function correctly.

I also tested another GUI (I can’t recall the repository name) that runs on port 8080. It allows adjustments via an interface, but those settings revert when switching to another method. Additionally, while it works, the streams cannot be merged into a single page like with the previous method, so displaying all six cameras live on one screen is not possible

  Can anyone recommend a method to locally host these cameras live, with the ability to tailor the html to feature a snapshot button, as well as a timer for future snapshots and other tasks. But mostly importantly retain the setting for the cameras(autofocus, etc)?

# Raspberry Pi Camera System Documentation

## System Overview
This repository contains configuration and access information for a multi-camera setup using Raspberry Pi 5 devices.

## Camera Systems

### Camera System 1 (Myrtle)
- **Host**: pi5_cam_1_myrtle
- **Login**: pi5@pi5
- **Camera Endpoints**:
  - Camera 1: `http://192.168.2.43:5000/Camera_1`
  - Camera 2: `http://192.168.2.43:5000/camera2`

### Camera System 2 (Myrtle)
- **Host**: pi5_cam_2_myrtle
- **Login**: pi5@pi5
- **Camera Endpoints**:
  - Camera 1: `http://192.168.2.158:5000/camera1`
  - Camera 2: `http://192.168.2.18:5000/camera2`

### Camera System 3 (Myrtle)
- **Host**: pi5_cam_3_myrtle
- **Login**: pi5@pi5
- **Camera Endpoints**:
  - Camera 1: `http://192.168.2.168:5000/camera1`
  - Camera 2: `http://192.168.2.168:5000/camera2`

## Usage
1. Connect to the local network
2. Use SSH to access each Pi using the provided login credentials
3. Access camera feeds through the listed URLs
=======s
>>>>>>> befd731caae458934106f94ab9a573e2ee17770b
