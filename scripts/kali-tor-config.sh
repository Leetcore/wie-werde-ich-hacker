#!/bin/bash

# reset all rules
iptables -F
iptables -P INPUT ACCEPT
iptables -P OUTPUT ACCEPT
iptables -P FORWARD ACCEPT

# install tor proxychains
apt update
apt install tor proxychains

# allow everything from debian-tor owner
iptables -A OUTPUT -j ACCEPT -m owner --uid-owner debian-tor
# allow localhosta
iptables -A OUTPUT -j ACCEPT -o lo
# allow Network Time Protocol (NTP)
iptables -A OUTPUT -j ACCEPT -p udp --dport 123

# >>> disallow all other connections <<<
iptables -P OUTPUT DROP

# make persistant rules for ip tables
apt install iptables-persistent

# save current config
iptables-save > /etc/iptables/rules.v4

# disable ipv6 and save it
ip6tables -P OUTPUT DROP
iptables-save > /etc/iptables/rules.v6
