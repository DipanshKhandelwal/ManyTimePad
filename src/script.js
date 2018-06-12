// HELPER FUNCTIONS

// Convert string to hex
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


// Convert hex to string
function hexToString (hex) {
    var string = '';
    for (var i = 0; i < hex.length; i += 2) {
      string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return string;
}


// If the char is between [a-z, A-Z]
function isAlpha(ch) {
    return typeof ch === "string" && ch.length === 1 && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
}


// XOR two strings of different lengths
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
    return randomstring;
}
