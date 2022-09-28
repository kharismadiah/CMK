import React, { Component } from 'react'
import Swal from 'sweetalert2'
import './ConfirmModalATSInvited.Swall.scss'

class ConfirmModalATSInvited extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    render() {
        let {
            isShowModalConfirmCandidateAlreadyInvited,
            isShowModalConfirmCandidateAlreadyDeclined,
            onCancel,
            onOkay,
            listApplicantAlreadyInvited,
            listApplicantAlreadyDeclined
        } = this.props

        let ApplicantIdsAlreadyDeclined = '',
            ApplicantIdsAlreadyInvited = '',
            type = 'info'

        if (Array.isArray(listApplicantAlreadyDeclined) && listApplicantAlreadyDeclined.length > 0) {
            let declinedIds = listApplicantAlreadyDeclined.map(({ ApplicantId }) => ApplicantId)
            ApplicantIdsAlreadyDeclined = declinedIds.join(', ') // now ids is string divide by koma
            console.log('declinedIds', declinedIds)
        }

        if (Array.isArray(listApplicantAlreadyInvited) && listApplicantAlreadyInvited.length > 0) {
            let invitedIds = listApplicantAlreadyInvited.map(({ ApplicantId }) => ApplicantId)
            ApplicantIdsAlreadyInvited = invitedIds.join(', ') // now ids is string divide by koma
            console.log('invitedIds', invitedIds)
        }

        if (isShowModalConfirmCandidateAlreadyDeclined) {
            Swal.fire({
                html: `<h4>Kandidat Sudah Menolak Undangan</h4>
                        <p>Apakah Anda yakin ingin mengundang ulang kandidat dengan Applicant ID ${ApplicantIdsAlreadyDeclined} ? </p>
                        <p>Kandidat ini sudah pernah menolak untuk bergabung dengan proses rekrutment vacancy ini sebelumnya.</p>`,
                type: 'info',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                customClass: 'StylesModalConfirmSwal'
            }).then(function(confirm) {
                if (confirm.dismiss) {
                    onCancel('declined')
                } else {
                    onOkay('declined')
                }
            })
        }

        if (isShowModalConfirmCandidateAlreadyInvited && !isShowModalConfirmCandidateAlreadyDeclined) {
            Swal.fire({
                html: `<h4>Kandidat Sudah Diundang</h4><p>Apakah Anda yakin ingin mengundang ulang kandidat dengan Applicant ID ${ApplicantIdsAlreadyInvited} ? </p>
                <p>Kandidat ini sudah diundang untuk proses rekrutmen vacancy ini dan masih menunggu konfirmasi.</p>`,
                type: type,
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                customClass: 'StylesModalConfirmSwal'
            }).then(function(confirm) {
                if (confirm.dismiss) {
                    onCancel('invited')
                } else {
                    onOkay('invited')
                }
            })
        }

        return null
    }
}

export default ConfirmModalATSInvited
