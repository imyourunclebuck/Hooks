import network
import socket
import time
import ustruct
from machine import Pin, PWM, ADC
import _thread

# --- Configuration ---
NETWORK_SSID = "donotconnect"
SERVO_PIN = 0
BATTERY_ADC_PIN = 26
MIN_DUTY = 1500
MAX_DUTY = 8500
ANGLE_FILE = "servo_angle.txt"
DEFAULT_ANGLE = 110

# --- Setup Servo ---
servo = PWM(Pin(SERVO_PIN))
servo.freq(50)

# --- Setup Battery ADC ---
adc = ADC(BATTERY_ADC_PIN)

def read_battery_voltage():
    raw = adc.read_u16()
    voltage = (raw / 65535) * 3.3
    return round(voltage * 2, 2)  # Assuming 2:1 divider

def set_servo_angle(angle):
    angle = max(0, min(180, angle))
    duty = int(MIN_DUTY + (angle / 180) * (MAX_DUTY - MIN_DUTY))
    servo.duty_u16(duty)
    save_angle(angle)
    print(f"Set angle to {angle}° (Duty: {duty})")

def save_angle(angle):
    with open(ANGLE_FILE, "w") as f:
        f.write(str(angle))

def load_angle():
    try:
        with open(ANGLE_FILE, "r") as f:
            return int(f.read().strip())
    except:
        return DEFAULT_ANGLE

# --- Initialize Servo to Last Angle ---
last_set_angle = load_angle()
set_servo_angle(last_set_angle)

# --- Wi-Fi AP Setup (Open Network) ---
ap = network.WLAN(network.AP_IF)
ap.config(essid=NETWORK_SSID, authmode=network.AUTH_OPEN)
ap.active(True)
while not ap.active():
    time.sleep(1)
ip_address = ap.ifconfig()[0]
print(f"Access Point ready at http://{ip_address}")

# --- HTML Page ---
def get_html_page(current_angle):
    battery_voltage = read_battery_voltage()
    return f"""<!DOCTYPE html>
<html>
<head>
<title>Pico Servo Control</title>
<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
<style>
body {{ background: #f0f0f0; font-family: Arial, sans-serif; text-align: center; padding: 40px; }}
.container {{ background: white; max-width: 800px; margin: auto; padding: 40px; border-radius: 20px; box-shadow: 0 0 30px rgba(0,0,0,0.1); }}
h1 {{ font-size: 48px; margin-bottom: 10px; color: #333; }}
.info {{ font-size: 28px; margin: 20px 0; color: #444; }}
.buttons {{ margin: 30px 0; }}
button {{ font-size: 28px; padding: 20px 30px; margin: 10px; border: none; border-radius: 10px; background: #007bff; color: white; cursor: pointer; box-shadow: 2px 2px 10px rgba(0,0,0,0.2); }}
button:hover {{ background: #0056b3; }}
input[type=\"number\"] {{ font-size: 28px; padding: 15px; width: 140px; text-align: center; border: 1px solid #ccc; border-radius: 10px; margin-right: 20px; }}
form {{ margin-top: 40px; }}
</style>
</head>
<body>
<div class=\"container\">
<h1>Pico W Servo Control</h1>
<div class=\"info\">Current Angle: {current_angle}°</div>
<div class=\"info\">Battery Voltage: {battery_voltage} V</div>
<div class=\"buttons\">
<a href=\"/servo?angle=0\"><button>0°</button></a>
<a href=\"/servo?angle=45\"><button>45°</button></a>
<a href=\"/servo?angle=90\"><button>90°</button></a>
<a href=\"/servo?angle=135\"><button>135°</button></a>
<a href=\"/servo?angle=180\"><button>180°</button></a>
</div>
<form action=\"/servo\" method=\"get\">
<input type=\"number\" name=\"angle\" min=\"0\" max=\"180\" value=\"{current_angle}\">
<button type=\"submit\">Set Angle</button>
</form>
</div>
</body>
</html>"""

# --- Simple DNS Server for Captive Portal ---
def dns_server():
    dns = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    dns.bind(('0.0.0.0', 53))
    while True:
        try:
            data, addr = dns.recvfrom(512)
            packet = data[:2] + b'\x81\x80' + data[4:6] + data[4:6] + b'\x00\x00\x00\x00'
            packet += data[12:]
            packet += b'\xc0\x0c\x00\x01\x00\x01\x00\x00\x00\x3c\x00\x04'
            packet += bytes(map(int, ip_address.split('.')))
            dns.sendto(packet, addr)
        except Exception as e:
            print("DNS Error:", e)

# --- Start DNS in another thread ---
_thread.start_new_thread(dns_server, ())

# --- Web Server ---
addr = socket.getaddrinfo('0.0.0.0', 80)[0][-1]
s = socket.socket()
s.bind(addr)
s.listen(1)
print("Web server is running...")
print(f"Clients will be redirected to http://{ip_address}")

while True:
    try:
        cl, addr = s.accept()
        request = cl.recv(1024).decode('utf-8')
        print(f"Client {addr} → {request.splitlines()[0]}")

        angle_to_set = None
        if 'GET /servo?' in request:
            try:
                start = request.find('angle=')
                if start != -1:
                    angle_str = ''.join(filter(str.isdigit, request[start + 6:]))
                    if angle_str:
                        angle_to_set = max(0, min(180, int(angle_str)))
            except:
                pass

        if angle_to_set is not None:
            set_servo_angle(angle_to_set)
            last_set_angle = angle_to_set

        # Always serve control page regardless of requested path
        cl.send('HTTP/1.0 200 OK\r\nContent-type: text/html\r\n\r\n')
        cl.send(get_html_page(last_set_angle))
        cl.close()

    except Exception as e:
        print("HTTP Error:", e)
        try:
            cl.close()
        except:
            pass
        time.sleep(1)
