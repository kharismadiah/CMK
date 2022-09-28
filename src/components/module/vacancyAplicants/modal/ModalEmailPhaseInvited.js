import React, { Component } from 'react'
import { Modal, Row, Col } from 'antd'
import Form from '../../../uielements/form'
import Input from '../../../CustomComponentAntd/customInput'
import Button from '../../../uielements/button'
import { EditOutlined } from '@ant-design/icons'
import TextEditor from '../../../CustomComponentAntd/customTextEditor'
import TextEditor2 from '../../../CustomComponentAntd/customSuneditor'

class ModalEmailPhaseInvited extends Component {
    constructor(props) {
        super(props)
        this.state = {
            onSubmit: false,
            isEdit: false,
            pastedTextSubject: '',
            pastedTextBody: '',
            pastedTextSignature: ''
        }
    }

    handleOnPaste = e => {
        let paste = e.clipboardData.getData('text/html')
        let isImg = false
        if (paste.search('><img') >= 0) {
            var firstIndex = paste.search('src="') + 5
            var lastIndex = paste.search('" alt=')
            var imgSource = paste.substring(firstIndex, lastIndex)
            isImg = true
        } else paste = e.clipboardData.getData('Text')
        const selection = window.getSelection()
        if (!selection.rangeCount) return false
        selection.deleteFromDocument()
        if (isImg) {
            var img = document.createElement('img')
            img.src = imgSource
            selection.getRangeAt(0).insertNode(img)
        } else selection.getRangeAt(0).insertNode(document.createTextNode(paste))
        e.preventDefault()
    }

    onEdit = () => {
        this.setState({ isEdit: !this.state.isEdit })
    }

    onCancelModal = () => {
        const { resetCheckAction, handleStateModal, getEmailRedac, handleStateModalEmailTemplate } = this.props
        if (this.state.isEdit) {
            this.setState({ isEdit: false })
            getEmailRedac()
        } else {
            resetCheckAction('checked', false)
            handleStateModal('visible', false)
            this.setState({ isEdit: false })
            handleStateModalEmailTemplate('selectedEmailTemplateId', null)
            handleStateModalEmailTemplate('action', '')
            handleStateModalEmailTemplate('activity', '')
        }
    }

    createMarkup = (subject, body, signature) => {
        return { __html: `<div>Subject ${subject}</div><div>${body}</div><div>${signature}</div>` }
    }

    handleEditor = (property, value, editor) => {
        const { handleStateModal } = this.props
        // if(editor.getLength() <= 1){
        //     handleStateModal(property, "")
        // }else{
        handleStateModal(property, value)
        // }
    }

    onSendEmail = () => {
        const { onSend, setInvitation, isInvitation = false, phase,
                body, signature } = this.props
        if (this.state.isEdit) {
            let regexTable = new RegExp(/<table>/, 'ig'), regexTr = new RegExp (/<tr>/, 'ig'), regexTd = new RegExp (/<td>/,'ig')
            let tempBody = body.replace(regexTable, `<table border="1">`).replace(regexTr, `<tr style="border: 1px solid black; background-color: white;">`)
                            .replace(regexTd, `<td style="border: 1px solid black; padding: 0.4em; background-clip: padding-box; background-color: white;">`)
            let tempSignature = signature.replace(regexTable, `<table border="1">`).replace(regexTr, `<tr style="border: 1px solid black; background-color: white;">`)
                            .replace(regexTd, `<td style="border: 1px solid black; padding: 0.4em; background-clip: padding-box; background-color: white;">`)

            this.handleEditor('body', tempBody)
            this.handleEditor('signature', tempSignature)
            this.setState({ isEdit: false })
        } else {
            onSend(isInvitation, phase)
            setInvitation()
        }
    }

    render() {
        const { visible, subject, body, signature, handleStateModal, modalAction, triggerList } = this.props
        let { title = 'Send Email Notification', subTitle = 'notification' } = this.props
        const { getFieldDecorator } = this.props.form
        const { onSubmit, isEdit } = this.state
        const colStyle = {
            textAlign: 'center'
        }
        const colStyle2 = {
            marginBottom: '-15px',
            position: 'relative'
        }
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 16 }
        }
        if (!modalAction.visible && !modalAction.checked) {
            title = 'Send Email Invitation'
            subTitle = 'invitation'
        }

        return (
            <Modal
                title={title}
                visible={visible}
                onCancel={this.onCancelModal}
                onOk={this.onSendEmail}
                okText="Send"
                width="50%"
            >
                <Form>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            Please review the redactional of email {subTitle} first
                        </Col>
                    </Row>
                    {!isEdit ? (
                        <Row type="flex" justify="space-around" align="middle">
                            <Col md={21} sm={21} xs={24} style={{ marginTop: 20 }}>
                                <div dangerouslySetInnerHTML={this.createMarkup(subject, body, signature)} />
                            </Col>
                            <Col md={3} sm={3} xs={24} style={colStyle}>
                                <EditOutlined onClick={this.onEdit} style={{ fontSize: 20, cursor: 'pointer' }} />
                            </Col>
                        </Row>
                    ) : (
                        <>
                            <Row>
                                <Col md={24} sm={24} xs={24} style={colStyle2}>
                                    <TextEditor2
                                        labelField="Subject"
                                        id="subject"
                                        name="subject"
                                        trigger={triggerList}
                                        onPaste={e => {
                                            this.handleOnPaste(e)
                                        }}
                                        formItemLayout={formItemLayout}
                                        value={subject}
                                        initialValue={subject}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        appendContents={this.state.pastedTextSubject}
                                        onChange={content => {
                                            this.handleEditor('subject', content)
                                        }}
                                        onSubmit={onSubmit}
                                        readOnly={false}
                                        required={true}
                                    />
                                    {/* <Input
                                        labelField="Subject"
                                        name="subject"
                                        id="subject"
                                        initialValue={subject}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onChange={handleStateModal}
                                        onSubmit={onSubmit}
                                    /> */}
                                </Col>
                            </Row>
                            <Row>
                                <Col md={24} sm={24} xs={24} style={{ marginBottom: 20 }}>
                                    <TextEditor2
                                        labelField="Body"
                                        id="body"
                                        name="body"
                                        trigger={triggerList}
                                        onPaste={e => {
                                            this.handleOnPaste(e)
                                        }}
                                        formItemLayout={formItemLayout}
                                        value={body}
                                        initialValue={body}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        appendContents={this.state.pastedTextBody}
                                        onChange={content => {
                                            this.handleEditor('body', content)
                                        }}
                                        onSubmit={onSubmit}
                                        readOnly={false}
                                        required={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={24} sm={24} xs={24} style={{ marginBottom: 20 }}>
                                    <TextEditor2
                                        labelField="Signature"
                                        id="signature"
                                        name="signature"
                                        trigger={triggerList}
                                        onPaste={e => {
                                            this.handleOnPaste(e)
                                        }}
                                        formItemLayout={formItemLayout}
                                        placeHolder={'Please add some text'}
                                        value={signature}
                                        initialValue={signature}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        appendContents={this.state.pastedTextSignature}
                                        onChange={content => {
                                            this.handleEditor('signature', content)
                                        }}
                                        onSubmit={onSubmit}
                                        readOnly={false}
                                        required={false}
                                    />
                                </Col>
                            </Row>
                        </>
                    )}
                </Form>
            </Modal>
        )
    }
}

const WrappedForm = Form.create()(ModalEmailPhaseInvited)
export default WrappedForm
