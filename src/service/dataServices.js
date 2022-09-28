
function getToken() {
    const token = localStorage.getItem('idToken');
    if (token === undefined || token === '') {
        // window.URL = 'views/login/index.html';
        this.props.history.push({
            pathname: this.props.history.location.pathname,
        })
    }
    else {
        return 'Bearer ' + token;
    }
}

export function getHeader() {
    return {
        'Authorization': getToken(),
        'Content-Type': 'application/json'
    }
}

export function getHeaderImport() {
    return {
        'Authorization': getToken(),
        'Content-Type': 'multipart/form-data'
    }
}

export function getHeaderDownload() {
    return {
        'Authorization': getToken(),
        'Content-Type': 'application/octet-stream'
    }
}


export const master = {
    getHeader,
    getHeaderImport,
    getHeaderDownload
}