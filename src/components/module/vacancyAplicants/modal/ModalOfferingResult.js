import React, { Fragment, Component } from 'react'
import { Modal, Row, Col, Checkbox, Input, Button, Upload, Icon, Divider, message, Tooltip, Popconfirm } from 'antd'
import Form from '../../../uielements/form'
import { saveAs } from 'file-saver'
import { validatePDF, getBlob } from '../../../../helpers/utility'
class ModalOfferingResult extends Component {
    constructor(props) {
        super(props)
        this.state = {
            onSubmit: false,
            checked: false,
            uploadBtn: false,
            activeEdit: false
        }
    }

    onCancelModal = () => {
        const { handleState } = this.props
        handleState('visible', false)
        handleState('uploadFile', '')
        handleState('uploadFileName', '')
        handleState('urlPdf', '')
        this.setState({ activeEdit: false })
        this.setState({ uploadBtn: false })
    }

    handleChange = value => {
        const { handleState } = this.props
        handleState('checked', value)
        // this.setState({
        //     checked: false
        // })
    }

    handleStateOfferingFile = data => {
        const { handleState } = this.props
        const checkPdf = validatePDF(data.file)
        this.setState({ activeEdit: true })
        this.setState({ uploadBtn: true })
        if (checkPdf === '') {
            const url = getBlob(data.file.originFileObj, { type: 'application/pdf' })
            handleState('urlPdf', url)
        } else {
            handleState('urlPdf', '')
            handleState('uploadFile', '')
            handleState('uploadFileName', '')
        }
    }

    beforeUploadOffering(file) {
        // Validate size and format of PDF
        const { handleState } = this.props
        const checkPdf = validatePDF(file)
        this.setState({ activeEdit: true })
        this.setState({ uploadBtn: true })
        if (checkPdf === '') {
            const url = getBlob(file, { type: 'application/pdf' })
            handleState('urlPdf', url)
            handleState('uploadFile', file)
            handleState('uploadFileName', file.name)
        } else {
            message.error(checkPdf)
        }
        return true
    }

    onDownload = () => {
        const { downloadAttachment, urlPdf, pdfName } = this.props
        downloadAttachment(urlPdf, pdfName)
        // const { urlPdf } = this.props
        // saveAs(urlPdf)
    }
    handleUpload = () => {
        const { uploadOffering, handleState } = this.props
        handleState('visible', false)
        uploadOffering()
    }
    editOfferingFile = () => {
        this.setState({ activeEdit: true })
        this.setState({ uploadBtn: true })
    }
    cancelEditFile = () => {
        const { detailOffering, handleState } = this.props
        handleState('visible', true)
        detailOffering()
    }

    render() {
        let {
            title,
            visible,
            handleState,
            pdfName,
            checked,
            onSubmit,
            dataList,
            onViewPdf,
            urlPdf,
            isToolbar,
            roleAccess
        } = this.props
        let dataCheck = dataList.filter(x => x.checked === true)
        let urlNonToolbar
        if (urlPdf.name == undefined) {
            urlNonToolbar = urlPdf ? urlPdf.concat('#toolbar=0&navpanes=0&scrollbar=0') : ''
        } else {
            urlNonToolbar = urlPdf.name
        }
        let message = ''
        const rowStyle = {
            marginBottom: 15
        }
        const colStyle = {
            textAlign: 'center'
        }
        const headerCoLStyle = {
            display: 'flex',
            justifyContent: 'flex-end'
        }
        switch (title) {
            case 'CancelByCandidate': {
                title = 'Cancel'
                message = 'membatalkan'
                break
            }
            case 'Fail': {
                message = 'menggagalkan'
                break
            }
            case 'Pass': {
                message = 'meloloskan'
                break
            }
            default:
                break
        }
        const EditBtn = () =>
            roleAccess == 'Hiring Manager' ? null : (
                <Popconfirm
                    title="Are you sure want edit this offering file?"
                    onConfirm={this.editOfferingFile}
                    onCancel={this.cancelEditFile}
                    okText="Yes"
                    cancelText="No"
                >
                    <Tooltip title="Edit Result">
                        <Icon
                            type="edit"
                            style={{
                                fontSize: 20,
                                padding: '1px',
                                cursor: 'pointer'
                            }}
                        />{' '}
                        {/* style={{fontSize: 15, padding: '3px', border: '0.05em solid black', borderRadius: "12px"}} */}
                    </Tooltip>
                </Popconfirm>
            )
        const UploadBrowse = () =>
            roleAccess == 'Hiring Manager' ? null : (
                <Col md={24} sm={24} xs={24} style={colStyle}>
                    <Col md={12} sm={12} xs={12} style={colStyle}>
                        <Input name="cv" id="cv" disabled value={pdfName} />
                    </Col>
                    <Col md={2} sm={2} xs={2} style={colStyle}>
                        <Upload
                            name="file"
                            accept="application/pdf"
                            onChange={e => {
                                this.handleStateOfferingFile(e)
                            }}
                            beforeUpload={e => this.beforeUploadOffering(e)}
                            multiple={false}
                            showUploadList={false}
                        >
                            <Button>Browse</Button>
                        </Upload>
                    </Col>
                    <Col md={2} sm={2} xs={2} style={(colStyle, { marginLeft: 30 })}>
                        <Button onClick={this.handleUpload}>
                            <Icon type="upload" /> Upload
                        </Button>
                    </Col>
                </Col>
            )
        const DownloadPdf = () => (
            <Col md={2} sm={2} xs={2} style={colStyle}>
                <Tooltip title="Save PDF" onClick={() => this.onDownload()}>
                    <Icon
                        type="save"
                        style={{
                            fontSize: 20,
                            padding: '1px',
                            cursor: 'pointer'
                        }}
                    />
                </Tooltip>
            </Col>
        )
        return (
            <Fragment>
                <Modal
                    width={1200}
                    title={title + ' Offering Result'}
                    visible={visible}
                    onCancel={() => this.onCancelModal()}
                    // onOk={onSubmit}
                    cancelText="Close"
                    okButtonProps={{
                        style: {
                            display: 'none'
                        }
                    }}
                >
                    <Row justify="start" style={rowStyle}>
                        <Col md={24} sm={24} xs={24} style={headerCoLStyle}>
                            <Col md={2} sm={2} xs={2} style={colStyle}>
                                {pdfName == '' || this.state.activeEdit == true ? null : <EditBtn />}
                            </Col>
                            {pdfName == '' ? null : <DownloadPdf />}
                        </Col>
                    </Row>
                    {urlPdf == '' ? (
                        <div>
                            <Row justify="start" style={rowStyle}>
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    No Result Available
                                </Col>
                            </Row>
                            <Divider />
                        </div>
                    ) : null}

                    <Row justify="start" style={{ marginBottom: 10 }}>
                        {pdfName == '' || this.state.uploadBtn == true ? <UploadBrowse /> : null}
                    </Row>
                    {urlPdf == '' ? null : (
                        <iframe src={isToolbar ? urlPdf : urlNonToolbar} style={{ width: '100%', height: 700 }} />
                    )}
                </Modal>
            </Fragment>
        )
    }
}

const WrappedForm = Form.create()(ModalOfferingResult)
export default WrappedForm
