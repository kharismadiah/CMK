import axios from 'axios';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import Endpoint from '../service/endpoint'
import { logout } from './../redux/auth/actions'



export function POST(url, body, header) {
    return axios({
        method: "post",
        url: url,
        timeout: 60000 * 60, // Wait for 5 Minutes
        headers: header,
        data: body
    })
        .then((res) => {
            // if (res.status == 201 || res.status == 200) {
            //     return res.data
            // }
            // else if (res.status == 401) {
            //     return res.data
            // }
            // else if (res.status == 412) {
            //     return res.data
            // }
            // else {
                return res.data
            // }
        })
        .catch((err) => {
            if (err.response.status == 401) {
                Swal.fire({
                    title: 'Info',
                    text: err.response.data.error_description,
                    type: 'info',
                    allowOutsideClick: false,
                    confirmButtonText: 'Ya',
                }).then(function (confirm) {
                    console.log('logout')
                    logOut()
                })
            }
            else if (err.response.status == 500) {
                Swal.fire({
                    title: 'error',
                    text: err.response.statusText,
                    type: 'error',
                    allowOutsideClick: false,
                    confirmButtonText: 'Ya',
                }).then(function (confirm) {
                })
            }
            else if (err.response.status == 412) {
                Swal.fire({
                    title: 'warning',
                    text: "Agent Sedang Offline, Silahkan Coba Beberapa Saat Lagi",
                    type: 'warning',
                    allowOutsideClick: false,
                    confirmButtonText: 'Ya',
                }).then(function (confirm) {
                })
            }
            else {
                Swal.fire({
                    title: 'warning',
                    text: err.response.statusText,
                    type: 'warning',
                    allowOutsideClick: false,
                    confirmButtonText: 'Ya',
                }).then(function (confirm) {
                })
            }
            return err
        })
}


export function GET(url, header) {
    // return axios.get(url, header)
    return axios({
        method: "get",
        url: url,
        timeout: 60000 * 60, // Wait for 5 Minutes
        headers: header
    })
        .then((res) => {
            // if (res.status == 200) {
            //     return res.data
            // }
            // else if (res.status == 401) {
            //     return res.data
            // }
            // else if (res.status == 412) {
            //     return res.data
            // }
            // else {
                return res.data
            // }
        })
        .catch((err) => {
            if (err.response.status == 401) {
                Swal.fire({
                    title: 'Info',
                    text: err.response.data.error_description,
                    type: 'info',
                    allowOutsideClick: false,
                    confirmButtonText: 'Ya',
                }).then(function (confirm) {
                    console.log('logout')
                    logOut()
                })
            }
            if (err.response.status == 412) {
                Swal.fire({
                    title: 'warning',
                    text: "Agent Sedang Offline, Silahkan Coba Beberapa Saat Lagi",
                    type: 'warning',
                    allowOutsideClick: false,
                    confirmButtonText: 'Ya',
                }).then(function (confirm) {
                })
            }
            return err
        })
}


export function PUT(url, body, header) {
    return axios.put(url, body, header)
        .then((res) => {
            // if (res.status == 200) {
            //     return res.data
            // }
            // else if (res.status == 401) {
            //     return res.data
            // }
            // else if (res.status == 412) {
            //     return res.data
            // }
            // else {
                return res.data
            // }
        })
        .catch((err) => {
            if (err.response.status == 401) {
                Swal.fire({
                    title: 'Info',
                    text: err.response.data.error_description,
                    type: 'info',
                    allowOutsideClick: false,
                    confirmButtonText: 'Ya',
                }).then(function (confirm) {
                    console.log('logout')
                    logOut()
                })
            }
            if (err.response.status == 412) {
                Swal.fire({
                    title: 'warning',
                    text: "Agent Sedang Offline, Silahkan Coba Beberapa Saat Lagi",
                    type: 'warning',
                    allowOutsideClick: false,
                    confirmButtonText: 'Ya',
                }).then(function (confirm) {

                })
            }
            return err
        })
}

export function DELETE(url, header) {
    return axios.delete(url, header)
        .then((res) => {
            // if (res.status == 200) {
            //     return res.data
            // }
            // else if (res.status == 401) {
            //     return res.data
            // }
            // else if (res.status == 412) {
            //     return res.data
            // }
            // else {
                return res.data
            // }
        })
        .catch((err) => {
            if (err.response.status == 401) {
                Swal.fire({
                    title: 'Info',
                    text: err.response.data.error_description,
                    type: 'info',
                    allowOutsideClick: false,
                    confirmButtonText: 'Ya',
                }).then(function (confirm) {
                    console.log('logout')
                    logOut()
                })
            }
            if (err.response.status == 412) {
                Swal.fire({
                    title: 'warning',
                    text: "Agent Sedang Offline, Silahkan Coba Beberapa Saat Lagi",
                    type: 'warning',
                    allowOutsideClick: false,
                    confirmButtonText: 'Ya',
                }).then(function (confirm) {

                })
            }
            return err
        })
}

function logOut() {
    localStorage.clear()
    document.cookie = 'id_token=expired; path=/'
    window.location.href = process.env.PUBLIC_URL
}