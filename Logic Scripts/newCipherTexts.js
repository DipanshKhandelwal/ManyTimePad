var messages = [
    'Hi I am Dipansh Khandelwal',
    'These are orignal sentences',
    'Now we will encrypt these texts',
    'And try to find out the orignal texts',
    'We will also find out the key',
    'This program will help you do this',
    'Just adding new texts',
    'This one is also to add more of them',
    'Just some more lines',
    'Let it be the last line'
]

function stringToHex (string) {
    var hex = '';
    for (var i = 0; i < string.length; i += 1) {
        var x = string[i].charCodeAt(0).toString(16);
        if(x.length == 2) {
            hex += x;
        } else {
            hex += '0'+x;
        }
    }
    return hex;
}

function hexToString (hex) {
    var string = '';
    for (var i = 0; i < hex.length; i += 2) {
      string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return string;
}

function stringXOR(a, b) {
    var xorString = '';
    if( a.length >= b.length ) {
        for (var i=0;i<b.length;i++) {
            xorString += String.fromCharCode( a[i].charCodeAt(0) ^ b[i].charCodeAt(0) );
        }
    } else {
        for (var i=0;i<a.length;i++) {
            xorString += String.fromCharCode( a[i].charCodeAt(0) ^ b[i].charCodeAt(0) );
        }
    }
    return xorString;
}

function randomKey(size=16) {
    var chars = "0123456789abcdef";
	var string_length = size;
	var randomstring = '';
	for (var i=0; i<2*string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
    return hexToString(randomstring);
}

function encrypt (key, msg) {
    var c = stringXOR ( key, msg );
    console.log(stringToHex(c));
    return c;
}

var key = randomKey(1024);
var ciphertexts = [];
for(var x=0; x<messages.length; x++) {
    ciphertexts.push(encrypt(key, messages[x]));
}
