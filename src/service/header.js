import { CLIENT_ID } from './../constants'

function setCookie(cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    var expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

export function getCookie(cname) {
    var name = cname + '='
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split(';')
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
}

function checkCookie(cname) {
    const token = getCookie('token')
    if (user != '') {
        //   alert("Welcome again " + user);
    } else {
        //  const token = //Assign token
        if (token != '' && token != null) {
            setCookie('token', token, 1)
        }
    }
}

export function getRole() {
    const token = getCookie('token')
    //Decript cookie nya, buat dapet role, lalu di return role
    //Sementara default, return affco

    return 'affco'
}

export function token() {
    let tokens = '',
        expired = ''
    tokens = Cookie.getWithoutExpired('ahs_id') // Get Cookie Parent
    //console.log("Get token from cookies ->", tokens)
    return tokens
}

export function tokenFLK() {
    let tokens = ''
    tokens = Cookie.getWithoutExpired('TokenFLK')
    return tokens
}

export function Header() {
    const header = {
        'Content-Type': 'application/json',
        'Authorization-Token': token(),
        referer: 'http://localhost:52093'
    }
    return header
}

export function HeaderFLK() {
    const header = {
        'Content-Type': 'application/json',
        Authorization: tokenFLK()
    }
    return header
}
export function HeaderFLKBatch() {
    const header = {
        'Content-Type': 'application/json',
        Authorization: token()
    }
    return header
}

export function HeaderNonToken() {
    const header = {
        'Content-Type': 'application/json'
    }
    return header
}

export function HeaderMultipart() {
    const header = {
        'Content-Type': 'multipart/form-data',
        'Authorization-Token': token(),
        referer: 'http://localhost:52093'
    }
    return header
}
export function HeaderDownloadOLResult() {
    const header = {
        'Content-Type': 'multipart/form-data',
        'Authorization-Token': token(),
        referer: 'http://localhost:52091'
    }
    return header
}

export function HeaderMultipartFile() {
    const header = {
        'Authorization-Token': token(),
        referer: 'http://localhost:52093'
    }
    return header
}

export function HeaderVirtue() {
    const header = {
        'Content-Type': 'application/json',
        'Authorization-Token':
            'qgqJGOA4wZacd9LXcvX7qarV5TFNBRD3QgBTcSrKvQVWpmYF4vfb3WzMiSqLwFrPF+pgEX3p2hiiVgiKMkhNZzpmBqeUUnwtX1zGxrkp2SgW0Rnv5JtSoxoUkFVQVGQHgtAiqZtih/6LFPTGWMexE7Q6j4yPTz0KV9DMuzgp+Uk='
    }
    return header
}

export function HeaderToken() {
    const header = {
        'Content-Type': 'application/json',
        Authorization: token()
    }
    return header
}

export function HeaderForm() {
    const header = {
        'Content-Type': 'application/json ',
        Authorization: token()
    }
    return header
}

export function HeaderClient() {
    const header = {
        'Content-Type': 'application/json'
        // 'ClientTag' : CLIENT_ID
    }
    return header
}

export const Cookie = {
    save: function(token, company, menuName) {
        var expiredDate = new Date()
        expiredDate.setDate(expiredDate.getDate() + 1)
        var ctoken_value = escape(token) + '; expires=' + expiredDate.toUTCString() + '; path=/'
        document.cookie = 'ahs_id=' + ctoken_value

        if (company && company != null && company != '') {
            var cso_value = escape(company) + '; expires=' + expiredDate.toUTCString() + '; path=/'
            document.cookie = 'cso_id=' + cso_value
        }

        if (menuName != null && menuName != '') {
            window.location.href = menuName
        }
    },

    load: function() {
        var c_value = parent.parent.document.cookie
        /*
        if (CheckObj.isEmptyNullOrUndefined(document.cookie) || document.cookie.indexOf("ahs_id=") == -1 ||
            document.cookie.indexOf("ahs_id=null") != -1 && parent.document.cookie.indexOf("ahs_id=") != -1) {
            c_value = parent.document.cookie;
        } else if(document.cookie.indexOf("ahs_id=") == -1 || document.cookie.indexOf("ahs_id=null") != -1 &&
            (parent.document.cookie.indexOf("ahs_id=") == -1 || parent.document.cookie.indexOf("ahs_id=null") != -1)){
            c_value = parent.parent.document.cookie;
        } else {
            c_value = document.cookie;
        }
        */
        var c_start = c_value.indexOf('ahs_id=')

        if (c_start == -1) {
            c_start = c_value.indexOf('ahs_id=')
        }
        if (c_start == -1) {
            c_value = null
            alert('Your Session has expired. Please relogin')
            if (parent) {
                parent.window.location.href = LOGIN_PAGE() //DOMAIN_URL + "/Views/Default/Login.html";
            } else {
                window.location.href = LOGIN_PAGE() //DOMAIN_URL + "/Views/Default/Login.html";
            }
        } else {
            c_start = c_value.indexOf('=', c_start) + 1
            var c_end = c_value.indexOf(';', c_start)
            if (c_end == -1) {
                c_end = c_value.length
            }

            c_value = unescape(c_value.substring(c_start, c_end))
        }

        return c_value
    },
    remove: function() {
        var expiredDate = new Date()
        expiredDate.setDate(expiredDate.getDate() - 1)
        var ctoken_value = '; expires=' + expiredDate.toUTCString() + '; path=/'
        document.cookie = 'ahs_id=' + ctoken_value
        document.cookie = 'cso_id=' + ctoken_value

        var astraToken = '; expires=' + expiredDate.toUTCString() + '; path=/;domain=.astra.co.id'
        document.cookie = 'ahs_id=' + astraToken
        document.cookie = 'cso_id=' + astraToken

        //added by agrnurul6493 for case if user switch SO i.e. from TSO change HSO
        var hrappsToken = '; expires=' + expiredDate.toUTCString() + '; path=/;domain=.hrapps.astra.co.id'
        document.cookie = 'cso_id=' + hrappsToken
        document.cookie = 'ahs_id=' + hrappsToken

        var itcbtToken = '; expires=' + expiredDate.toUTCString() + '; path=/;domain=.itcbt01.astra.co.id'
        document.cookie = 'cso_id=' + itcbtToken
        document.cookie = 'ahs_id=' + itcbtToken

        var devproxyToken = '; expires=' + expiredDate.toUTCString() + '; path=/;domain=.devproxy.astra.co.id'
        document.cookie = 'cso_id=' + devproxyToken
        document.cookie = 'ahs_id=' + devproxyToken

        var hrappsstgToken = '; expires=' + expiredDate.toUTCString() + '; path=/;domain=.hrappsstg.astra.co.id'
        document.cookie = 'cso_id=' + hrappsstgToken
        document.cookie = 'ahs_id=' + hrappsstgToken

        var astraappsToken = '; expires=' + expiredDate.toUTCString() + '; path=/;domain=.astraapps.astra.co.id'
        document.cookie = 'cso_id=' + astraappsToken
        document.cookie = 'ahs_id=' + astraappsToken
    },
    getWithoutExpired: function(param) {
        // console.log("Param cookie ->", param)
        // var c_value = '';
        // if (CheckObj.isEmptyNullOrUndefined(document.cookie) //document.cookie harus di check isEmptyNullorUndefined
        // if (document.cookie || document.cookie.indexOf(" " + param + "=") == -1 &&
        //     document.cookie.indexOf(" " + param + "=") != -1) {
        //     c_value = document.cookie;
        // } else if(document.cookie.indexOf(" " + param + "=") == -1 || document.cookie.indexOf(" " + param + "=null") != -1 &&
        //     (document.cookie.indexOf(" " + param + "=") == -1 || document.cookie.indexOf(" " + param + "=null") != -1)){
        //     c_value = parent.parent.document.cookie;
        // } else {
        //     c_value = document.cookie;
        // }
        var c_value = document.cookie
        var c_start = c_value.indexOf(' ' + param + '=')

        if (c_start == -1) {
            c_start = c_value.indexOf(param + '=')
        }
        if (c_start == -1) {
            c_value = null
        } else {
            c_start = c_value.indexOf('=', c_start) + 1
            var c_end = c_value.indexOf(';', c_start)
            if (c_end == -1) {
                c_end = c_value.length
            }

            c_value = unescape(c_value.substring(c_start, c_end))
        }
        // console.log("Return cookie ->", c_value)
        return c_value
    },
    checkToken: function(param) {
        if (
            param.toLowerCase() == 'invalid token' ||
            param.toLowerCase() == 'expired token' ||
            param.toLowerCase() == 'missing token'
        ) {
            MessageBox.show('Error', param + '. Please relogin.', function() {
                Cookie.remove()
                if (parent) {
                    parent.window.location.href = LOGIN_PAGE()
                } else {
                    window.location.href = LOGIN_PAGE()
                }
            })
            return false
        }
        return true
    }
}
