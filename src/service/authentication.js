import { JSEncrypt } from 'jsencrypt'
import './RSA.min.js'

const Auth_SAMA = {
    getBody: function (username, password) {
        let encrypted_password;
        try {
            encrypted_password = RSAEncrypt(password);
        }
        catch (err) {
            return;
        }
        let postData = "scope=openid&grant_type=password&username=" + username + "&password=" + encrypted_password + '&app_key=1&app_fcmid=fuW5s468gv0:APA91bG-CtN4oQ7-azup_pY7cBg_efVS3p8VwlhmRj8L1Hyu0JbYorwAI3mnS4cLcfUh1lo2xIMNwqXrekYmWQaEdE389nHmi7ZYb5AQs5yDgs7U2CYW-85KMkXpdnbjmWSr7NOcbk9R';

        return postData;
    },

    getHeader: function () {
        let hash = Base64.encode(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET);
        return {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': "Basic WWY0MzNlOTlxQjU5TDJlQkpDeWdzU01jelFvYTpWdlp1cGtNTzE3WHpqMDVNa3BuaTRmRzA0MHdh"
                // 'Authorization': "Basic " + hash
            }
        }
    }
}

const Services = {
    Auth_SAMA
}

export default Services

//#region Auth SAMA
let RSAEncrypt = (data) => {
    let a = JSEncrypt.prototype.setPublicKey(process.env.REACT_APP_PUB_KEY);
    let encrypted = JSEncrypt.prototype.encrypt(data);
    if (typeof encrypted === 'boolean') {
        throw "Encryption failed.";
    }
    //encrypted = URLSafeEncode(encrypted);
    return encrypted;
}

let URLSafeEncode = (data) => {

    var s = data.split('=', 1).toString();

    var re = /\+/g;
    s = s.replace(re, '-');

    re = /\//g;
    s = s.replace(re, '_');
    return s;
}

let Base64 = {

    keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

    encode: function (input) {
        let output = "";
        let chr1, chr2, chr3 = "";
        let enc1, enc2, enc3, enc4 = "";
        let i = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this.keyStr.charAt(enc1) +
                this.keyStr.charAt(enc2) +
                this.keyStr.charAt(enc3) +
                this.keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
    },

    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            window.alert("There were invalid base64 characters in the input text.\n" +
                "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                "Expect errors in decoding.");
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
            enc1 = this.keyStr.indexOf(input.charAt(i++));
            enc2 = this.keyStr.indexOf(input.charAt(i++));
            enc3 = this.keyStr.indexOf(input.charAt(i++));
            enc4 = this.keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";

        } while (i < input.length);

        return output;
    }
};

let base64ToHex = (base64, uppercase) => {
    var raw = atob(base64);
    var HEX = '';

    for (var i = 0; i < raw.length; i++) {
        var _hex = raw.charCodeAt(i).toString(16)
        HEX += (_hex.length == 2 ? _hex : '0' + _hex);

    }
    if (uppercase)
        return HEX.toUpperCase();
    return HEX;
}

let hexToBase64 = (hexval) => {
    var hex = hexval.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return btoa(str);
}

let encryptRsaToBase64 = (plaintext, modulusBase64, exponentBase64) => {
    var n = base64ToHex(modulusBase64);
    var e = base64ToHex(exponentBase64);

    var encryptedHex = RSA.encrypt(plaintext, n, e);
    return hexToBase64(encryptedHex);
}

//#endregion
