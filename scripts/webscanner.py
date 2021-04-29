# simple webserver scanner for IPv4

import requests
import os

folder = os.path.dirname(__file__)
port = 80

# try all ipv4 ips
for oct1 in range(1,254):
	for oct2 in range(1,254):
		for oct3 in range(1,254):
			for oct4 in range(1,254):
				# build full url with port
				ipandport = str(oct1) + '.' + str(oct2) + '.' + str(oct3) + '.' + str(oct4) + ':' + str(port)
				url = 'http://'+ ipandport +'/'
				# printout current url
				print('Try ' + url)
				try:
					# try the request with timeout
					result = requests.request('get', url, params=None, timeout=1.0)
					# if response is valid print something
					if result.status_code == 200:
						print('Webserver found!')
						# save url with webserver in a file
						with open(folder + '/found.txt', 'a') as myfile:
							myfile.write(url + '\n')
				except:
					# ignore all errors
					pass
