/**
 * Phishing trash script
 * This script fills a form and submit it with random numbers/chars in a loop
 * Install a browser extension to run custom scripts on the phishing webseite
 * Example: https://addons.mozilla.org/en-US/firefox/addon/sudo-styler/
 */

// config
const startUrl = "http://xxxphishing/login.php"
const chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j,", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const length = 6;
const lowerUpper = true;

chars.concat(numbers);
let use = chars;

// search login elements
let loginElement = document.querySelector('input[type="text"]');
if (!loginElement) {
    loginElement = document.querySelector('input[name="username"]');
}
if (!loginElement) {
    loginElement = document.querySelector('input[name="login"]');
}
if (!loginElement) {
    loginElement = document.querySelector('input[name="usr"]');
}
let pwElement = document.querySelector('input[type="password"]');

// only submit if elements are there
if (loginElement && pwElement) {
    // insert values in webseite
    loginElement.value = getRandom() || username;
    let str = getRandom();
    pwElement.value = str;

    // show password under input field
    pwElement.insertAdjacentHTML('afterend', "<br/>" + str);

    // submit fomr
    clickElement('input[type="submit"]');
    clickElement('input[value="Login"]');
    clickElement('input[name="formimage1"]');
} else {
    // cookie reset
    document.cookie = '';
    document.location.href = startUrl;
}

function getRandom() {
    // build random string/number/password
    let str = "";
    while (str.length < length) {
        let thischar = use[Math.floor(Math.random() * use.length)];

        // lower and uppercase
        if (lowerUpper) {
            if (Math.random() < 0.5) {
                thischar = thischar.toUpperCase();
            } else {
                thischar = thischar.toLowerCase();
            }
        }

        str += thischar;
    }
    return str;
}

function clickElement(selector) {
    let element = document.querySelector(selector);
    if (element) {
        element.click();
    }
}
