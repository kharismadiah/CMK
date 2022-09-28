import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { success } from "../helpers/alert/success";
import { warning } from "../helpers/alert/warning";
import { error } from "../helpers/alert/error";
import actions from "../redux/auth/actions";
// import Services from './authentication';
// import qs from 'qs'
// import { master } from "./dataServices";
// import Endpoint from './endpoint'
// let {logout}  = this.props

export function POST(url, body, header) {
  return axios({
    method: "post",
    url: url,
    headers: header.headers,
    data: body
  })
    .then(res => {
      // if (res.status === 201 || res.status === 200) {
      //   return res.data;
      // } else if (res.status === 401) {
      //   return res.data;
      // } else if (res.status === 412) {
      //   return res.data;
      // } else {
        return res.data;
      // }
    })
    .catch(err => {
      if (err.response.status === 401) {
        setTimeout(() => {
          Swal.fire({
              title: "Info",
              text: "Token Expired, Please Relogin",
              type: "info",
              allowOutsideClick: false,
              confirmButtonText: "OK"
            }).then(function (confirm) {
              // localStorage.clear();
              // document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // document.cookie = "role_name=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // document.cookie = "expired=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // window.top.location.reload()
            })
      }, 1);
      }
      if (err.response.status === 400) {
        Swal.fire({
          title: "Info",
          text: err.response.data.Message,
          type: "info",
          allowOutsideClick: false,
          confirmButtonText: "OK"
        }).then(function (confirm) { });
      }
      if (err.response.status === 412) {
        Swal.fire({
          title: "warning",
          text: "Agent Sedang Offline, Silahkan Coba Beberapa Saat Lagi",
          type: "warning",
          allowOutsideClick: false,
          confirmButtonText: "OK"
        }).then(function (confirm) { });
      }
      if (err.response.status === 500) {
        Swal.fire({
          title: "Server Error",
          text: err.response.data.Message,
          type: "info",
          allowOutsideClick: false,
          confirmButtonText: "OK"
        }).then(function (confirm) {
          console.log("logout");
        });
      }
      return err;
    });
}

export function POSTBLOB(url, body, header) {
  return axios({
    method: "post",
    url: url,
    // timeout: 60000 * 60, // Wait for 5 Minutes
    responseType: 'arraybuffer', // important
    headers: header.headers,
    data: body
  })
    .then(res => {
      // if (res.status === 201 || res.status === 200) {
      //   return res.data;
      // } else if (res.status === 401) {
      //   return res.data;
      // } else if (res.status === 412) {
      //   return res.data;
      // } else {
        return res.data;
      // }
    })
    .catch(err => {
      if (err.response.status === 401) {
        setTimeout(() => {
          Swal.fire({
              title: "Info",
              text: "Token Expired, Please Relogin",
              type: "info",
              allowOutsideClick: false,
              confirmButtonText: "OK"
            }).then(function (confirm) {
              // localStorage.clear();
              // document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // document.cookie = "role_name=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // document.cookie = "expired=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // window.top.location.reload()
            })
      }, 1);
      }
      if (err.response.status === 400) {
        Swal.fire({
          title: "Info",
          text: err.response.data.Message,
          type: "info",
          allowOutsideClick: false,
          confirmButtonText: "OK"
        }).then(function (confirm) { });
      }
      if (err.response.status === 412) {
        Swal.fire({
          title: "warning",
          text: "Agent Sedang Offline, Silahkan Coba Beberapa Saat Lagi",
          type: "warning",
          allowOutsideClick: false,
          confirmButtonText: "OK"
        }).then(function (confirm) { });
      }
      if (err.response.status === 500) {
        Swal.fire({
          title: "Server Error",
          text: err.response.data.Message,
          type: "info",
          allowOutsideClick: false,
          confirmButtonText: "OK"
        }).then(function (confirm) {
          console.log("logout");
        });
      }
      return err;
    });
}

export function POSTBLOB_HEADER(url, body, header) {
  return axios({
    method: "post",
    url: url,
    // timeout: 60000 * 60, // Wait for 5 Minutes
    responseType: 'arraybuffer', // important
    headers: header.headers,
    data: body
  })
    .then(res => {
      let body = {
        data: res.data,
        headers: res.headers
      }
      if (res.status === 201 || res.status === 200) {
        return body;
      } else if (res.status === 401) {
        return res.data;
      } else if (res.status === 412) {
        return res.data;
      } else {
        return res.data;
      }
    })
    .catch(err => {
      if (err.response.status === 401) {
        setTimeout(() => {
          Swal.fire({
              title: "Info",
              text: "Token Expired, Please Relogin",
              type: "info",
              allowOutsideClick: false,
              confirmButtonText: "OK"
            }).then(function (confirm) {
              // localStorage.clear();
              // document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // document.cookie = "role_name=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // document.cookie = "expired=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // window.top.location.reload()
            })
      }, 1);
      }
      if (err.response.status === 400) {
        Swal.fire({
          title: "Info",
          text: err.response.data.Message,
          type: "info",
          allowOutsideClick: false,
          confirmButtonText: "OK"
        }).then(function (confirm) { });
      }
      if (err.response.status === 412) {
        Swal.fire({
          title: "warning",
          text: "Agent Sedang Offline, Silahkan Coba Beberapa Saat Lagi",
          type: "warning",
          allowOutsideClick: false,
          confirmButtonText: "OK"
        }).then(function (confirm) { });
      }
      if (err.response.status === 500) {
        Swal.fire({
          title: "Server Error",
          text: err.response.data.Message,
          type: "info",
          allowOutsideClick: false,
          confirmButtonText: "OK"
        }).then(function (confirm) {
          console.log("logout");
        });
      }
      return err;
    });
}

export function POST_CALL_BACK(
  url,
  body,
  header,
  calllbackUrl,
  successMessage = "Success"
) {
  return axios({
    method: "post",
    url: url,
    // timeout: 60000 * 60, // Wait for 5 Minutes
    headers: header.headers,
    data: body
  })
    .then(res => {
      if (res.status === 201 || res.status === 200) {
        return (
          res.data,
          success(
            res.data.Message ? res.data.Message : successMessage,
            calllbackUrl
          )
        );
      } else if (res.status === 401) {
        return res.data;
      }
      // else if (res.status === 400 && res.message === "Wifi Sudah Terdaftar") {
      //   return res.data, warning(res.message, calllbackUrl)
      // } 
      else if (res.status === 412) {
        return res.data;
      } else {
        return res.data;
      }
    })
    .catch(err => {
      if (err.response.status === 401) {
        setTimeout(() => {
          Swal.fire({
              title: "Info",
              text: "Token Expired, Please Relogin",
              type: "info",
              allowOutsideClick: false,
              confirmButtonText: "OK"
            }).then(function (confirm) {
              // localStorage.clear();
              // document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // document.cookie = "role_name=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // document.cookie = "expired=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // window.top.location.reload()
            })
      }, 1);
      }
      if (err.response.status === 400 && err.response.data.Message === "Wifi Sudah Terdaftar") {
        warning(err.response.data.Message, calllbackUrl)
      } else if (err.response.status === 400) {
        Swal.fire({
          title: "Info",
          text: err.response.data.Message,
          type: "info",
          allowOutsideClick: false,
          confirmButtonText: "OK"
        }).then(function (confirm) { });
      }
      if (err.response.status === 412) {
        Swal.fire({
          title: "warning",
          text: "Agent Sedang Offline, Silahkan Coba Beberapa Saat Lagi",
          type: "warning",
          allowOutsideClick: false,
          confirmButtonText: "OK"
        }).then(function (confirm) { });
      }
      if (err.response.status === 500) {
        Swal.fire({
          title: "Server Error",
          text: err.response.data.Message,
          type: "info",
          allowOutsideClick: false,
          confirmButtonText: "OK"
        }).then(function (confirm) {
          console.log("logout");
        });
      }
      return err;
    });
}

export function POST_CONFIRM(url, body, header, title = "Info", text = "Are you sure?", type = "info"){
  return Swal.fire({
    title: title,
    text: text,
    type: type,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirm'
  }).then((result) => {
    if(result.value){
      return axios({
        method: "post",
        url: url,
        headers: header.headers,
        data: body
      })
        .then(res => {
          // if (res.status === 201 || res.status === 200) {
          //   return res.data;
          // } else if (res.status === 401) {
          //   return res.data;
          // } else if (res.status === 412) {
          //   return res.data;
          // } else {
            return res.data;
          // }
        })
        .catch(err => {
          if (err.response.status === 401) {
            setTimeout(() => {
              Swal.fire({
                  title: "Info",
                  text: "Token Expired, Please Relogin",
                  type: "info",
                  allowOutsideClick: false,
                  confirmButtonText: "OK"
                }).then(function (confirm) {

                })
          }, 1);
          }
          if (err.response.status === 400) {
            Swal.fire({
              title: "Info",
              text: err.response.data.Message,
              type: "info",
              allowOutsideClick: false,
              confirmButtonText: "OK"
            }).then(function (confirm) { });
          }
          if (err.response.status === 412) {
            Swal.fire({
              title: "warning",
              text: "Agent Sedang Offline, Silahkan Coba Beberapa Saat Lagi",
              type: "warning",
              allowOutsideClick: false,
              confirmButtonText: "OK"
            }).then(function (confirm) { });
          }
          if (err.response.status === 500) {
            Swal.fire({
              title: "Server Error",
              text: err.response.data.Message,
              type: "info",
              allowOutsideClick: false,
              confirmButtonText: "OK"
            }).then(function (confirm) {
              console.log("logout");
            });
          }
          return err;
        });
    }
  })
}

export function GET(url, header) {
  return axios
    .get(url, header)
    .then(res => {
      // if (res.status === 200) {
      //   return res.data;
      // } else if (res.status === 401) {
      //   return res.data;
      // } else if (res.status === 412) {
      //   return res.data;
      // } else {
        return res.data;
      // }
    })
    .catch(err => {
      if (err.response.status === 401) {
        setTimeout(() => {
          Swal.fire({
              title: "Info",
              text: "Token Expired, Please Relogin",
              type: "info",
              allowOutsideClick: false,
              confirmButtonText: "OK"
            }).then(function (confirm) {
              // localStorage.clear();
              // document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // document.cookie = "role_name=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // document.cookie = "expired=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // window.top.location.reload()
            })
      }, 1);
      }
      if (err.response.status === 404) {
        Swal.fire({
          title: "Info",
          text: err.response.data.Message,
          type: "info",
          allowOutsideClick: false,
          confirmButtonText: "OK"
        }).then(function (confirm) { });
        return [];
      }
      if (err.response.status === 412) {
        Swal.fire({
          title: "warning",
          text: "Agent Sedang Offline, Silahkan Coba Beberapa Saat Lagi",
          type: "warning",
          allowOutsideClick: false,
          confirmButtonText: "OK"
        }).then(function (confirm) { });
      }
      if (err.response.status === 500) {
        error("Server Error!");
      }

      return err;
    });
}

export function GETBLOB(url, header) {
  return axios({
    url: url,
    method: 'GET',
    responseType: 'arraybuffer',
    headers: header.headers,
  })
    .then(res => {
      // if (res.status === 200) {
      //   return res.data;
      // } else if (res.status === 401) {
      //   return res.data;
      // } else if (res.status === 412) {
      //   return res.data;
      // } else {
        return res.data;
      // }
    })
    .catch(err => {
      if (err.response.status === 401) {
        setTimeout(() => {
          Swal.fire({
              title: "Info",
              text: "Token Expired, Please Relogin",
              type: "info",
              allowOutsideClick: false,
              confirmButtonText: "OK"
            }).then(function (confirm) {
              // localStorage.clear();
              // document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // document.cookie = "role_name=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // document.cookie = "expired=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // window.top.location.reload()
            })
      }, 1);
      }
      if (err.response.status === 404) {
        Swal.fire({
          title: "Info",
          text: err.response.data.Message,
          type: "info",
          allowOutsideClick: false,
          confirmButtonText: "OK"
        }).then(function (confirm) { });
        return [];
      }
      if (err.response.status === 412) {
        Swal.fire({
          title: "warning",
          text: "Agent Sedang Offline, Silahkan Coba Beberapa Saat Lagi",
          type: "warning",
          allowOutsideClick: false,
          confirmButtonText: "OK"
        }).then(function (confirm) { });
      }
      if (err.response.status === 500) {
        error("Server Error!");
      }

      return err;
    });
}

export function PUT(url, body, header) {
  return axios
    .put(url, body, header)
    .then(res => {
      // if (res.status === 200) {
      //   return res.data;
      // } else if (res.status === 401) {
      //   return res.data;
      // } else if (res.status === 412) {
      //   return res.data;
      // } else {
        return res.data;
      // }
    })
    .catch(err => {
      if (err.response.status === 401) {
        setTimeout(() => {
          Swal.fire({
              title: "Info",
              text: "Token Expired, Please Relogin",
              type: "info",
              allowOutsideClick: false,
              confirmButtonText: "OK"
            }).then(function (confirm) {
              // localStorage.clear();
              // document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // document.cookie = "role_name=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // document.cookie = "expired=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // window.top.location.reload()
            })
      }, 1);
      }
      if (err.response.status === 412) {
        Swal.fire({
          title: "warning",
          text: "Agent Sedang Offline, Silahkan Coba Beberapa Saat Lagi",
          type: "warning",
          allowOutsideClick: false,
          confirmButtonText: "Ya"
        }).then(function (confirm) { });
      }
      if (err.response.status === 500) {
        error("Server Error!");
      }
      return err;
    });
}

export function DELETE_POST(url, body, header) {
  return Swal.fire({
    title: 'Alert',
    text: "This action will delete the selected data. You cannot undo after proceeding. Are you sure to you want to delete the data?",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it'
  }).then((result) => {
    if (result.value) {
      return axios({
        method: "post",
        url: url,
        headers: header.headers,
        data: body
      }).then((res) => {
              // if (res.status == 200) {
              //   return res.data
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
            if (err.response.status === 401) {
              setTimeout(() => {
                Swal.fire({
                    title: "Info",
                    text: "Token Expired, Please Relogin",
                    type: "info",
                    allowOutsideClick: false,
                    confirmButtonText: "OK"
                  }).then(function (confirm) {
                    // localStorage.clear();
                    // document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    // document.cookie = "role_name=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    // document.cookie = "expired=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    // window.top.location.reload()
                  })
            }, 1);
            }
              if (err.response.status == 412) {
                  Swal.fire({
                      title: 'warning',
                      text: "You are offline, please try again!",
                      type: 'warning',
                      allowOutsideClick: false,
                      confirmButtonText: 'Ya',
                  }).then(function (confirm) {
    
                  })
              }
              return err
          })  
    }
  })
  
}

export function DELETE_BODY(url, body, header) {
  return Swal.fire({
    title: 'Alert',
    text: "This action will delete the selected data. You cannot undo after proceeding. Are you sure to you want to delete the data?",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it'
  }).then((result) => {
    if (result.value) {
      return axios({
        method: "delete",
        url: url,
        headers: header.headers,
        data: body
      }).then((res) => {
              // if (res.status == 200) {
              //   return res.data
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
            if (err.response.status === 401) {
              setTimeout(() => {
                Swal.fire({
                    title: "Info",
                    text: "Token Expired, Please Relogin",
                    type: "info",
                    allowOutsideClick: false,
                    confirmButtonText: "OK"
                  }).then(function (confirm) {
                    // localStorage.clear();
                    // document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    // document.cookie = "role_name=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    // document.cookie = "expired=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    // window.top.location.reload()
                  })
            }, 1);
            }
              if (err.response.status == 412) {
                  Swal.fire({
                      title: 'warning',
                      text: "You are offline, please try again!",
                      type: 'warning',
                      allowOutsideClick: false,
                      confirmButtonText: 'Ya',
                  }).then(function (confirm) {
    
                  })
              }
              return err
          })  
    }
  })
  
}

export function DELETE2(url, header) {
  return Swal.fire({
    title: 'Alert',
    text: "This action will delete the selected data. You cannot undo after proceeding. Are you sure to you want to delete the data?",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it'
  }).then((result) => {
    if (result.value) {
      return axios({
        method: "delete",
        url: url,
        headers: header.headers
      }).then((res) => {
              // if (res.status == 200) {
              //   return res.data
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
            if (err.response.status === 401) {
              setTimeout(() => {
                Swal.fire({
                    title: "Info",
                    text: "Token Expired, Please Relogin",
                    type: "info",
                    allowOutsideClick: false,
                    confirmButtonText: "OK"
                  }).then(function (confirm) {
                    // localStorage.clear();
                    // document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    // document.cookie = "role_name=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    // document.cookie = "expired=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    // window.top.location.reload()
                  })
            }, 1);
            }
              if (err.response.status == 412) {
                  Swal.fire({
                      title: 'warning',
                      text: "You are offline, please try again!",
                      type: 'warning',
                      allowOutsideClick: false,
                      confirmButtonText: 'Ya',
                  }).then(function (confirm) {
    
                  })
              }
              return err
          })  
    }
  })
  
}

export function DELETE(url, body, header) {
    return axios({
      method: "delete",
      url: url,
      headers: header.headers,
      data: body
    }).then((res) => {
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
          if (err.response.status === 401) {
            setTimeout(() => {
              Swal.fire({
                  title: "Info",
                  text: "Token Expired, Please Relogin",
                  type: "info",
                  allowOutsideClick: false,
                  confirmButtonText: "OK"
                }).then(function (confirm) {
                  // localStorage.clear();
                  // document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  // document.cookie = "role_name=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  // document.cookie = "expired=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  // window.top.location.reload()
                })
          }, 1);
          }
            if (err.response.status == 412) {
                Swal.fire({
                    title: 'warning',
                    text: "You are offline, please try again!",
                    type: 'warning',
                    allowOutsideClick: false,
                    confirmButtonText: 'Ya',
                }).then(function (confirm) {

                })
            }
            return err
        })
}

// export function POSTBLOB(url, body, header) {
//     return axios({
//         url: url,
//         method: 'POST',
//         responseType: 'blob', // important
//         headers: header,
//         data: body
//     })
//         .then((res) => {
//             if (res.status == 201 || res.status == 200) {
//                 return res.data
//             }
//             else if (res.status == 401) {
//                 return res.data
//             }
//             else if (res.status == 412) {
//                 return res.data
//             }
//             else {
//                 res.data
//             }
//         })
//         .catch((err) => {
//             if (err.response.status == 401) {
//                 Swal.fire({
//                     title: 'Info',
//                     text: err.response.statusText,
//                     type: 'info',
//                     allowOutsideClick: false,
//                     confirmButtonText: 'Ya',
//                 }).then(function (confirm) {

//                 })
//             }
//             if (err.response.status == 403) {
//                 let urlRef = process.env.LOGIN_URL + Endpoint.AUTHENTICATION
//                 let bodyRef1 = qs.stringify({
//                     grant_type: 'refresh_token',
//                     refresh_token: localStorage.getItem('RToken'),
//                 })
//                 let bodyRef = {
//                     refresh_token: localStorage.getItem('RToken'),
//                 }
//                 let headerRef = { headers: master.getHeader() }
//                 let headerRef1 = Services.Auth_SAMA.getHeader()
//                 axios.post(urlRef, bodyRef, headerRef)
//                     .then((res) => {
//                         if (res.status == 201 || res.status == 200) {
//                             if(res.data.status == 1){
//                             localStorage.setItem('idToken', res.data.data.access_token);
//                             localStorage.setItem('RToken', res.data.data.refresh_token);
//                             POSTBLOB(url, body, { headers: master.getHeader() })
//                             }
//                             else{
//                                 Swal.fire({
//                                     title: 'warning',
//                                     text: res.data.errormessage,
//                                     type: 'warning',
//                                     allowOutsideClick: false,
//                                     confirmButtonText: 'Ya',
//                                 }).then(function (confirm) {
//                                     localStorage.removeItem('idToken');
//                                     localStorage.removeItem('RToken');
//                                     localStorage.removeItem('set');
//                                     location.reload()
//                                 })
//                             }
//                         }
//                         else {
//                             res.data
//                         }
//                     })
//                     .catch((err) => {
//                         Swal.fire({
//                             title: 'error',
//                             text: err.response.statusText,
//                             type: 'error',
//                             allowOutsideClick: false,
//                             confirmButtonText: 'Ya',
//                         }).then(function (confirm) {
//                             localStorage.removeItem('idToken');
//                             localStorage.removeItem('RToken');
//                             localStorage.removeItem('set');
//                             location.reload()
//                         })
//                     })
//             }
//             if (err.response.status == 500) {
//                 Swal.fire({
//                     title: 'error',
//                     text: "Download PDF Hanya Untuk Status Approved",
//                     type: 'error',
//                     allowOutsideClick: false,
//                     confirmButtonText: 'Ya',
//                 }).then(function (confirm) {

//                 })
//             }
//             if (err.response.status == 412) {
//                 Swal.fire({
//                     title: 'warning',
//                     text: "Agent Sedang Offline, Silahkan Coba Beberapa Saat Lagi",
//                     type: 'warning',
//                     allowOutsideClick: false,
//                     confirmButtonText: 'Ya',
//                 }).then(function (confirm) {

//                 })
//             }
//             return err
//         })
// }
// export function GETBLOB(url, header) {
//   return axios({
//       url: url,
//       method: 'GET',
//       responseType: 'blob', // important
//       headers: header,
//   })
//       .then((res) => {
//           if (res.status == 201 || res.status == 200) {
//               return res.data
//           }
//           else if (res.status == 401) {
//               return res.data
//           }
//           else if (res.status == 412) {
//               return res.data
//           }
//           else {
//               res.data
//           }
//       })
//       .catch((err) => {
//           if (err.response.status == 401) {
//               Swal.fire({
//                   title: 'Info',
//                   text: err.response.statusText,
//                   type: 'info',
//                   allowOutsideClick: false,
//                   confirmButtonText: 'Ya',
//               }).then(function (confirm) {

//               })
//           }
//           if (err.response.status == 403) {
//               let urlRef = process.env.LOGIN_URL + Endpoint.AUTHENTICATION
//               let bodyRef1 = qs.stringify({
//                   grant_type: 'refresh_token',
//                   refresh_token: localStorage.getItem('RToken'),
//               })
//               let bodyRef = {
//                   refresh_token: localStorage.getItem('RToken'),
//               }
//               let headerRef = { headers: master.getHeader() }
//               let headerRef1 = Services.Auth_SAMA.getHeader()
//               axios.post(urlRef, bodyRef, headerRef)
//                   .then((res) => {
//                       if (res.status == 201 || res.status == 200) {
//                           if(res.data.status == 1){
//                           localStorage.setItem('idToken', res.data.data.access_token);
//                           localStorage.setItem('RToken', res.data.data.refresh_token);
//                           GETBLOB(url, { headers: master.getHeader() })
//                           }
//                           else{
//                               Swal.fire({
//                                   title: 'warning',
//                                   text: res.data.errormessage,
//                                   type: 'warning',
//                                   allowOutsideClick: false,
//                                   confirmButtonText: 'Ya',
//                               }).then(function (confirm) {
//                                   localStorage.removeItem('idToken');
//                                   localStorage.removeItem('RToken');
//                                   localStorage.removeItem('set');
//                                   location.reload()
//                               })
//                           }
//                       }
//                       else {
//                           res.data
//                       }
//                   })
//                   .catch((err) => {
//                       Swal.fire({
//                           title: 'error',
//                           text: err.response.statusText,
//                           type: 'error',
//                           allowOutsideClick: false,
//                           confirmButtonText: 'Ya',
//                       }).then(function (confirm) {
//                           localStorage.removeItem('idToken');
//                           localStorage.removeItem('RToken');
//                           localStorage.removeItem('set');
//                           location.reload()
//                       })
//                   })
//           }
//           if (err.response.status == 500) {
//               Swal.fire({
//                   title: 'error',
//                   text: err.response.statusText,
//                   type: 'error',
//                   allowOutsideClick: false,
//                   confirmButtonText: 'Ya',
//               }).then(function (confirm) {

//               })
//           }
//           if (err.response.status == 412) {
//               Swal.fire({
//                   title: 'warning',
//                   text: "Agent Sedang Offline, Silahkan Coba Beberapa Saat Lagi",
//                   type: 'warning',
//                   allowOutsideClick: false,
//                   confirmButtonText: 'Ya',
//               }).then(function (confirm) {

//               })
//           }
//           return err
//       })
// }


