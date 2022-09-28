import Config from './../service/config'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

function getToken() {
    const token = cookies.get('id_token')//localStorage.getItem('id_token');
    if (token === undefined || token === '') {
        window.location.href = '/signin'
        // this.props.history.push({
        //     pathname: this.props.history.location.pathname,
        // })
    }
    else {
        return 'Bearer ' + token;
    }
}

export function Header() {
    return {
        'Authorization': getToken(),
        'Content-Type': 'application/json',
        'ClientTag': Config.CLIENT_TAG,
        "ApplicationName": Config.APPLICATION_CODE
    }
}

export function HeaderImage(){
    return {
        'Authorization': getToken(),
        'Content-Type': 'multipart/form-data',
        'ClientTag': Config.CLIENT_TAG,
        "ApplicationName": Config.APPLICATION_CODE
    }
}
