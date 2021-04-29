#!/usr/bin/env python
import socket
import sys
import threading

remoteIPInput = input("Host to scan: ")
remoteIP = socket.gethostbyname(remoteIPInput)

print("Scanning host: "+ remoteIP)

def scan(remoteIP, port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(3)
    result = sock.connect_ex((remoteIP, port))
    if result == 0:
        print("Port "+ str(port) + " Open!")
    sock.close()

try:
    for port in range(1,1337):
        threading.Thread(target=scan, args=(remoteIP, port)).start()
except KeyboardInterrupt:
    print("Stopped")
    sys.exit()