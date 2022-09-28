export const filterUniqueDataReportAnalytics = (_arr, _id, _name) => {
    if (Array.isArray(_arr) && _arr.length > 0) {
        let _filtredData = Array.from(new Set(_arr.map(a => a[_id]))).map(id => {
            return _arr.find(a => a[_id] === id)
        })
        return _filtredData

        /** We don't need it */
        // if (_filtredData.length > 0) {
        //     return _filtredData.map(x => ({ ...x, id: x[_id], name: x[_name] }))
        // } else {
        //     return []
        // }
    }
    return []
}

export const createReportFileName = (downloadType, reportType, objFileNames) => {
    const isPeriod = downloadType !== 'Event'
    const incrementNumber = Math.random().toFixed(2) * 100 /** Dummy */
    let fileName = ''
    let extension = ''

    let { EventName, EventDesc, PositionName, StartDate, EndDate, CandidateName, CandidateEmail, HRUser } = objFileNames

    switch (reportType) {
        case 'ApplicationData':
            /**
             * Application Data (.xlsx)
             * Event file name: [EventDesc]_[PositionName]_Application Data.xlsx
             * Period file name: [StartDate]_[EndDate]_Application Data.xlsx
             */
            if (isPeriod) {
                fileName = `${StartDate}_${EndDate}_Application Data`
            } else {
                fileName = `${EventDesc}_${PositionName}_Application Data`
            }
            extension = '.xlsx'
            break
        case 'FLKExcel':
            /**
             * Formulir Lamaran Kerja (.xlsx)
             * Event file name: [EventDesc]_[PositionName]_Formulir Lamaran Kerja.xlsx
             * Period file name: [StartDate]_[EndDate]_Formulir Lamaran Kerja.xlsx
             */
            if (isPeriod) {
                fileName = `${StartDate}_${EndDate}_Formulir Lamaran Kerja`
            } else {
                fileName = `${EventDesc}_${PositionName}_Formulir Lamaran Kerja`
            }
            extension = '.xlsx'
            break
        case 'FLKPdf':
            /**

           * Formulir Lamaran Kerja (.pdf)
           * Zip Event file name: [EventDesc]_[PositionName]_Formulir Lamaran Kerja.zip
           * Zip Period file name: [StartDate]_[EndDate]_Formulir Lamaran Kerja.zip
           * PDF Event file name: [EventName]_[PositionName]_FLK_[CandidateName]_[CandidateEmail].pdf
           * PDF Period file name: [StartDate]_[EndDate]_FLK_[CandidateName]_[CandidateEmail].pdf
           */
            if (isPeriod) {
                fileName = `${StartDate}_${EndDate}_FLK_${CandidateName}_${CandidateEmail}`
            } else {
                fileName = `${EventDesc}_${PositionName}_FLK_${CandidateName}_${CandidateEmail}`
            }
            extension = '.pdf'
            break
        case 'RecruitmentProcessExcel':
            /**
             * Recruitment Process (.xlsx)
             * Event file name: [EventDesc]_[PositionName]_Recruitment Process.xlsx
             * Period file name: [StartDate]_[EndDate]_Recruitment Process.xlsx
             */
            if (isPeriod) {
                fileName = `${StartDate}_${EndDate}_Recruitment Process`
            } else {
                fileName = `${EventDesc}_${PositionName}_Recruitment Process`
            }
            extension = '.xlsx'
            break
        case 'InterviewExcel':
            /**
             * Interview (.xlsx)
             * Event file name: [EventDesc]_[PositionName]_Interview.xlsx
             * Period file name: [StartDate]_[EndDate]_Interview.xlsx
             */
            if (isPeriod) {
                fileName = `${StartDate}_${EndDate}_Interview`
            } else {
                fileName = `${EventDesc}_${PositionName}_Interview`
            }
            extension = '.xlsx'
            break
        case 'InterviewPdf':
            /**
             * Zip Event file name: [EventDesc]_[PositionName]_Interview.zip
             * Zip Period file name: [StartDate]_[EndDate]_Interview.zip
             * PDF Event file name: [EventName]_[PositionName]_Interview [HR/User]_[CandidateName]_[CandidateEmail]_[2 Digits Number Increment].pdf
             * PDF Period file name: [StartDate]_[EndDate]_Interview [HR/User]_[CandidateName]
             * [CandidateEmail]_[2 Digits Number Increment].pdf
             */
            if (isPeriod) {
                fileName = `${StartDate}_${EndDate}_Interview ${HRUser}_${CandidateName}_${CandidateEmail}_${incrementNumber}`
            } else {
                fileName = `${EventName}_${PositionName}_Interview ${HRUser}_${CandidateName}_${CandidateEmail}_${incrementNumber}`
            }
            extension = '.pdf'
            break

        default:
            break
    }
    return fileName + extension
}
