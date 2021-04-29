# send dns request and get response
packet = IP(dst="1.1.1.1")/UDP()/DNS(rd=1,qd=DNSQR(qname="www.ripe.net"))
sr1(packet)

# doc: https://scapy.readthedocs.io/en/latest/usage.html#dns-requests
