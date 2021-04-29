var robot = require('robotjs');

var mapKeywordsToButton = [
	// {keywords: ['start', 'enter'], press: 'enter'},
	{keywords: ['select', 's', 'shift'], press: 's'},
	{keywords: ['left', 'links'], press: 'left'},
	{keywords: ['right', 'rechts'], press: 'right'},
	{keywords: ['down', 'runter', 'unten'], press: 'down'},
	{keywords: ['up', 'jump', 'springen', 'hoch'], press: 'up'},
	{keywords: ['b'], press: 'b'},
	{keywords: ['a'], press: 'a'},
	{keywords: ['l'], press: 'l'},
	{keywords: ['r'], press: 'r'}
]
var settings = require(__dirname + '/settings.json')
var globalTimer = 1;

// read twitter
var Twitter = require('twitter')
var client = new Twitter({
	consumer_key: settings.consumer_key,
	consumer_secret: settings.consumer_secret,
	access_token_key: settings.access_token_key,
	access_token_secret: settings.access_token_secret
})

var hashtags = ['links, rechts, hoch, oben, unten, runter']

function readTwitter () {
	console.log('start listening');
	// You can also get the stream in a callback if you prefer
	hashtags.forEach(hashtag => {
		startStream(hashtag);
	})
	
}
// start inputs after 3 seconds
setTimeout(readTwitter, 3 * 1000);

function startStream(hashtag) {
	client.stream('statuses/filter', {track: hashtag, language: 'de'}, function(stream) {
		stream.on('data', function(event) {
			var tweet = event
			var cleanText = tweet.text.toLowerCase()
			var username = (tweet.user || {}).screen_name
				
			// console.log(username + ' >> ' + cleanText)
			checkKeywordsToKeys(cleanText, username)
		});
	
		stream.on('error', function(error) {
			console.log("error", error)
		});
	});
}
function checkKeywordsToKeys (text, username) {
	console.log('tweet: '+ text);
	mapKeywordsToButton.forEach(function (keymapping) {
	// check all keywords in the list		
		keymapping.keywords.forEach(function (keyword) {
			// check if twitter input command is a keyword
			if (text.indexOf(keyword) >= 0) {
				// var commands = command.split(keyword);
				//(commands || []).forEach(singleKeyword => {
					// robotjs should hit a button
					hitKey(keymapping.press, username)
				//});

			}	
		})
	})
}

function hitKey (key) {
	// press key down and go back up in 500 ms
	globalTimer = globalTimer + 500;
	setTimeout(function (key) {
		console.log('key: '+ key);	
		robot.keyToggle(key, 'down')
		setTimeout(function (key) {
			robot.keyToggle(key, 'up')
			globalTimer = globalTimer - 500;
		}, 500, key)
	}, globalTimer, key)
}
