import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export function MessageSuccess(data) {
    Swal.fire({
        title: 'success!',
        text: data,
        type: 'success',
    })
}

export function MessageError(data) {
    Swal.fire({
        title: 'Oops!',
        text: data,
        type: 'error',
    })
}

export function MessageInfo(data) {
    Swal.fire({
        title: 'Oops!',
        text: data,
        type: 'info',
    })
}

export function MessageWarning(data) {
    Swal.fire({
        title: 'Warning!',
        text: data,
        type: 'warning',
    })
}

export function MessageConfirmation(text, confirmAction, dismissAction) {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete these items with " + text + ' ?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then(function (confirm) { confirmAction(confirm) }, function (dismiss) { dismissAction() })
}

export function UploadConfirmation(text, confirmAction, dismissAction) {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to upload file " + text + ' ?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then(function (confirm) { confirmAction(confirm) }, function (dismiss) { dismissAction() })
}

export function messages(title = null, text = null, type = null, refresh = null) {
    Swal.fire({
        title: title,
        text: text,
        type: type
    }).then(function () {
        if (refresh)
            window.location.reload();
        // window.history.back()
    });
}

export function messagesConfirm(id, confirmDelete, isInitial, title = "Warning", text = "Info", type = "info") {
    Swal.fire({
        title: title,
        text: text,
        type: type,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then(function (confirm) {
        if (confirm.value) {
            confirmDelete(id, isInitial)
        }
    })
}

export function messagesConfirm2(action, property, subProperty, value, title = "Warning", text = "Info", type = "info") {
    Swal.fire({
        title: title,
        text: text,
        type: type,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then(function (confirm) {
        if (confirm.value) {
            action(property, subProperty,value)
        }
    })
}

export function deleteData(id, text, confirmDelete, isInitial) {
    let result = false;
    Swal.fire({
        title: 'Message',
        text: text,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then(function (confirm) {
        if (confirm.value) {
            confirmDelete(id, isInitial)
        }
    })
}

export function confirmation(id, confirmAction, dismissAction) {
    let result = false;
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!'
    }).then(function (confirm) {
        if (confirm.dismiss) {

        } else if (confirm.value) confirmAction(id)
    }, function (dismiss) {
        dismissAction()
    })
}

export async function confirmation2(title="confirmation", text="confirmation", type="info") {
    return await Swal.fire({
        title: title,
        text: text,
        type: type,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then(function (confirm) {
        return confirm
    })
}

export function messageTokenExpired(id, confirmDelete, isInitial, title = "Info", text = "Info", type = "info") {
    Swal.fire({
        title: title,
        text: 'Token Expired, Please Re-login',
        type: type,
        confirmButtonText: 'Yes',
        allowOutsideClick: false
    }).then(function (confirm) {
        if (confirm.value) {
            localStorage.removeItem('ahs_id');
            localStorage.removeItem('ExperienceCategory');
            localStorage.removeItem('ApplicantId');
            document.cookie = "ahs_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "ExperienceCategory=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "ApplicantId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.reload()
        }
    })
}

export function messageInternalErrorFLK(title = null, text = null, type = null, refresh = null) {
Swal.fire({
  title: title,
  text: text,
  type: type,
  confirmButtonText: "Yes",
  allowOutsideClick: false,
}).then(function(confirm) {
  if (confirm.value) {
    localStorage.removeItem("ahs_id");
    localStorage.removeItem("ExperienceCategory");
    localStorage.removeItem("ApplicantId");
    document.cookie = "ahs_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "ExperienceCategory=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "ApplicantId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  }
});
}

export const messageConfirmHTML = (
    html,
    type = "info",
    customClass,
    onConfirm,
    ...params) => {
    Swal.fire({
        html: html,
        type: type,
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        customClass: customClass
    }).then(function(confirm) {
        if (confirm.dismiss) {
            // do something
        } else {
            onConfirm(...params)
        }
    })
}

export function messageOLTA(type, confirmAction){
    Swal.fire({
        title: 'Re-'+ type[0].toUpperCase() + type.substring(1) +' OL Result',
        text: 'Are you sure want to re-'+type+' data?',
        type: "question",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: "Yes",
    }).then(function (confirm){
        if(!confirm.dismiss) confirmAction();
    })
}

export function messageOLIntegration(type, data, confirmAction, successAction){
    Swal.fire({
        title: 'Re-'+ type[0].toUpperCase() + type.substring(1) +' OL Result',
        text: 'Are you sure want to re-'+type+' data?',
        type: "question",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: "Yes",
    }).then(function (confirm){
        if(!confirm.dismiss) confirmAction(data,successAction);
    })
}

export function OLIntegrationRequestSuccess(type,message,data,confirmAction){
    Swal.fire({
        title: 'Re-'+ type[0].toUpperCase() + type.substring(1) +' Success',
        type: "success",
        text: message,
        confirmButtonText: "OK",
    }).then(function (confirm){
        confirmAction();
    })
}

// const WrappedMaintainUser = (deleteData);

// const mapStateToProps = (state) => ({
//   User: state.User,
//   Auth: state.Auth,
//   userRole: state.Auth.roleName
// })

// export default connect(mapStateToProps,{ ...actions })(WrappedMaintainUser);