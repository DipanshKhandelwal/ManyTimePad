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

//////////////////////////////////////////////////////////////////////////

// FUNCTIONS TO DECRYPT / BREAK MANY TIME PAD

function solveCiphers(allCiphers) {
    var cipherTexts = allCiphers;
    cipherToSolve = allCiphers[0];

    // Single key used to encrypt all messages
    var key = new Array(150).fill(undefined);

    // Known positinons of the key
    var knownKeyPosition = new Set();

    // For every cipher run with all ciphers except itself
    // For each cipher text
    for (var i=0; i<cipherTexts.length; i++) {
        counter = [];
        // For each other cipher text
        for (var j=0; j<cipherTexts.length; j++) {
            // If both ciphers are not same
            if  (i != j) {
                var XORed = stringXOR( hexToString( cipherTexts[i]), hexToString(cipherTexts[j]) );
                for (var k=0; k<XORed.length; k++) {
                    // If the char is between [a-z, A-Z]ssss
                    if ( isAlpha(XORed[k]) ) {
                        // Update counter checking with all other ciper texts
                        counter.push(k);
                    }
                }
            }
        }

        // To save indexes of found spaces
        spaces = [];

        // Count the frequency of indexes with alpha character
        count = _.countBy(counter);

        // Iterate over all in count structure
        _.forEach(count, (value, key)=> {
            // If number of spaces is >=7 save its index
            if(value >=7) {
                spaces.push(key);
            }
        });

        // Get current cipher with spaces and at places we have spaces we get the key
        cipherAtIWithSpaces = stringXOR( hexToString(cipherTexts[i]), new Array(150).fill(' ') );

        for (var l=0; l< spaces.length ; l++) {
            // Store key at a position
            var x = cipherAtIWithSpaces[spaces[l]].charCodeAt(0).toString(16);
            if(x.length == 2) {
                key[spaces[l]] = x;
            }else {
                key[spaces[l]] = '0'+x;
            }
            // Save that we know key at this position
            knownKeyPosition.add(spaces[l]);
        }
    }

    // Get hex of the present key and adding 00 at unknown places
    var keyHex = '';
    for (var m=0;m<key.length;m++) {
        var val = key[m];
        if(val === undefined) {
            keyHex += '00';
        }else{
            keyHex += val;
        }
    }

    // XOR the cipher to solve with the key
    var result = stringXOR( hexToString(cipherToSolve), hexToString(keyHex) );    

    // Print the result with * at unknown places
    var output = '';
    for (var n=0 ;n<result.length; n++) {
        if(knownKeyPosition.has(n.toString())) {
            output += result[n];
        }else{
            output += '*';
        }
    }
    return output;
}


function getAnswers(cipherTexts, output) {
    cipherSolved = output;
    // Getting the key
    finalKey = stringXOR( hexToString(cipherToSolve), cipherSolved );

    var show = [];
    // Find out the orignal messages
    for (var o=0; o<cipherTexts.length; o++) {
        show.push(stringXOR( hexToString(cipherTexts[o]), finalKey ));
    }
    return show;
}

//////////////////////////////////////////////////////////////////////////

// FUNCTIONS TO GENERATE MANY TIME PAD CIPHERS

function encrypt (key, msg) {
    var c = stringXOR ( key, msg );
    return c;
}

function getCiphers(allMessages, key) {
    messages = allMessages;
    var ciphertexts = [];
    for(var x=0; x<messages.length; x++) {
        ciphertexts.push(stringToHex(encrypt(hexToString(key), messages[x])));
    }
    return ciphertexts;
}
