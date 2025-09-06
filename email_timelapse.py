#!/usr/bin/env python3
import os
import sys
import time
import subprocess
import smtplib
from email.message import EmailMessage
from picamera2 import Picamera2

# Email credentials from environment variables
SENDER = os.environ.get("EMAIL_SENDER")
APP_PASSWORD = os.environ.get("EMAIL_APP_PASSWORD")
RECIPIENT = os.environ.get("EMAIL_RECIPIENT")

if not all([SENDER, APP_PASSWORD, RECIPIENT]):
    print("Error: Please set EMAIL_SENDER, EMAIL_APP_PASSWORD, and EMAIL_RECIPIENT environment variables.")
    sys.exit(1)

def send_email(subject, body, attachments=[]):
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = SENDER
    msg["To"] = RECIPIENT
    msg.set_content(body)
    for filepath in attachments:
        if not os.path.exists(filepath):
            print(f"Warning: attachment {filepath} not found.")
            continue
        with open(filepath, "rb") as f:
            data = f.read()
            filename = os.path.basename(filepath)
            maintype, subtype = ("image", "jpeg") if filename.lower().endswith(".jpg") else ("application", "octet-stream")
            msg.add_attachment(data, maintype=maintype, subtype=subtype, filename=filename)
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(SENDER, APP_PASSWORD)
            smtp.send_message(msg)
        print("Email sent successfully.")
    except Exception as e:
        print(f"Failed to send email: {e}")

def main():
    base_path = "/home/pi5/Desktop"
    if len(sys.argv) > 1:
        output_dir = sys.argv[1]
        folder_name = os.path.basename(output_dir.rstrip("/"))
        print(f"Using drag-and-drop folder: {output_dir}")
        interval = float(input("Enter snapshot interval in seconds (e.g., 2): ").strip())
        duration = float(input("Enter total duration in seconds (e.g., 10): ").strip())
        os.makedirs(output_dir, exist_ok=True)
    else:
        folder_name = input("Enter folder name for this timelapse (and Drive folder): ").strip()
        interval = float(input("Enter snapshot interval in seconds (e.g., 2): ").strip())
        duration = float(input("Enter total duration in seconds (e.g., 10): ").strip())
        output_dir = os.path.join(base_path, folder_name)
        os.makedirs(output_dir, exist_ok=True)

    # Initialize two cameras
    picam2_0 = Picamera2(0)
    picam2_1 = Picamera2(1)
    config0 = picam2_0.create_still_configuration(main={"size": picam2_0.sensor_resolution})
    config1 = picam2_1.create_still_configuration(main={"size": picam2_1.sensor_resolution})
    picam2_0.configure(config0)
    picam2_1.configure(config1)
    picam2_0.start()
    picam2_1.start()
    time.sleep(2)  # let cameras warm up

    num_snapshots = int(duration // interval)
    print(f"Capturing {num_snapshots} images from each camera every {interval}s...")

    captured_files_cam0 = []
    captured_files_cam1 = []
    start_time = time.time()
    for i in range(1, num_snapshots + 1):
        filename0 = os.path.join(output_dir, f"cam0_image_{i:03}.jpg")
        filename1 = os.path.join(output_dir, f"cam1_image_{i:03}.jpg")
        request0 = picam2_0.capture_request()
        request1 = picam2_1.capture_request()
        request0.save("main", filename0)
        request1.save("main", filename1)
        request0.release()
        request1.release()
        print(f"Captured image {i} from both cameras at {time.time() - start_time:.2f}s")
        captured_files_cam0.append(filename0)
        captured_files_cam1.append(filename1)
        if i < num_snapshots:
            time.sleep(interval)

    picam2_0.stop()
    picam2_1.stop()

    # Upload to Google Drive via rclone
    drive_folder = f"timelapse_uploads/{folder_name}"
    print(f"Uploading folder {output_dir} to Google Drive at {drive_folder} ...")
    subprocess.run(["rclone", "copy", output_dir, f"gdrive:{drive_folder}"], check=True)

    # Attach first & last images from both cameras
    attachments = []
    if captured_files_cam0:
        attachments.append(captured_files_cam0[0])
        if len(captured_files_cam0) > 1:
            attachments.append(captured_files_cam0[-1])
    if captured_files_cam1:
        attachments.append(captured_files_cam1[0])
        if len(captured_files_cam1) > 1:
            attachments.append(captured_files_cam1[-1])

    email_body = (
        f"Timelapse '{folder_name}' completed and uploaded to Google Drive.\n\n"
        f"Captured {len(captured_files_cam0)} images from each camera every {interval}s for {duration}s.\n"
        f"Folder path on Pi: {output_dir}"
    )

    send_email(f"Timelapse '{folder_name}' completed", email_body, attachments)

if __name__ == '__main__':
    main()
