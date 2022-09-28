import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Row, Col } from 'antd';
import Form from '../../../uielements/form'
import Input from '../../../CustomComponentAntd/customInput';
import Button from '../../../uielements/button';
import { EditOutlined } from '@ant-design/icons';
import TextArea from '../../../CustomComponentAntd/customTextArea'
import Datepicker from '../../../CustomComponentAntd/customDatePicker';
import TextEditor from '../../../CustomComponentAntd/customTextEditor';
import TextEditor2 from '../../../CustomComponentAntd/customSuneditor';
import moment from 'moment'

class ModalEmail extends Component {

    constructor(props) {
        super(props);
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

    componentDidMount(){
        this.setState({ onSubmit: !this.state.onSubmit })
    }

    onEdit = () => {
        this.setState({ isEdit: !this.state.isEdit })
    }

    onCancelModal = () => {
        const {resetCheckAction, handleStateModal, getEmailRedac} = this.props
        if(this.state.isEdit){
            this.setState({ isEdit: false })
            getEmailRedac()
        }else{
            resetCheckAction('checked', false)
            handleStateModal('visible', false)
            this.setState({ isEdit: false })
        }
    }

    createMarkup = (subject, body, signature) => {
        return {__html: `<div>Subject ${subject}</div><div>${body}</div><div>${signature}</div>`};
    }

    onSubmit = (e) => {
        const {onSend, body, signature} = this.props
        e.preventDefault()
        this.props.form.validateFields(['date'], (err, values) => { 
            if (!err) {
                if(this.state.isEdit){
                    let regexTable = new RegExp(/<table>/, 'ig'), regexTr = new RegExp (/<tr>/, 'ig'), regexTd = new RegExp (/<td>/,'ig')
                    let tempBody = body.replace(regexTable, `<table border="1">`).replace(regexTr, `<tr style="border: 1px solid black; background-color: white;">`)
                                    .replace(regexTd, `<td style="border: 1px solid black; padding: 0.4em; background-clip: padding-box; background-color: white;">`)
                    let tempSignature = signature.replace(regexTable, `<table border="1">`).replace(regexTr, `<tr style="border: 1px solid black; background-color: white;">`)
                                    .replace(regexTd, `<td style="border: 1px solid black; padding: 0.4em; background-clip: padding-box; background-color: white;">`)

                    this.handleEditor('body', tempBody)
                    this.handleEditor('signature', tempSignature)
                    this.setState({ isEdit: false })
                }else{
                    onSend()
                }
            }else{
                this.setState({ onSubmit: !this.state.onSubmit })
            }
        })
    }

    handleEditor = (property, value) => {
        const {handleStateModal} = this.props
        // if(editor.getLength() <= 1){
        //     handleStateModal(property, "")
        // }else{
            handleStateModal(property, value)
        // }
    }

    render() {
        const {visible, subject, body, signature, date, handleStateModal, title="Send Email Invitation", triggerList, handleChange} = this.props
        const { getFieldDecorator } = this.props.form
        const {onSubmit, isEdit} = this.state
        const colStyle = {
            textAlign:'center'
        };
        const colStyle2 = {
            marginBottom: '-15px',
            position: "relative",
        };
        const colStyle3 = {
            marginBottom: '20px',
            position: "relative",
        };
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 16 }
        };
        const formItemLayoutDate = {
            labelCol: { span: 8 },
            wrapperCol: { span: 22 }
        };
        return (
            <Modal
                title={title}
                visible={visible}
                onCancel={this.onCancelModal}
                onOk={this.onSubmit}
                okText="Send"
                width="50%"
            >
                <Form>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            Please review the redactional of email invitation first
                        </Col>
                    </Row>
                {
                    !isEdit ? 
                        <>
                            <Row type="flex" justify="space-around" align="middle">
                                <Col md={21} sm={21} xs={24} style={{ marginTop: 20, overflow:"hidden" }}>
                                    <div dangerouslySetInnerHTML={this.createMarkup(subject, body, signature)} />
                                </Col>
                                <Col md={3} sm={3} xs={24}>
                                    <EditOutlined onClick={this.onEdit} style={{fontSize:20, cursor:'pointer'}} />
                                </Col>
                            </Row>
                            <Row style={{marginTop:32}}>
                                <Col offset={6} md={12} sm={12} xs={12}>
                                    <Datepicker
                                        name="date"
                                        id="date"
                                        labelField="Due Date*"
                                        initialValue={date}
                                        formItemLayout={formItemLayoutDate}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        format={'DD/MM/YYYY'}
                                        onChange={(name, dateString) => {
                                            handleChange('date', moment(dateString, 'DD/MM/YYYY'))
                                        }}  
                                        onSubmit={this.state.onSubmit}
                                        disabled={false}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter Due Date"
                                                }
                                            ]
                                        }
                                    />
                                </Col>
                            </Row>
                        </>
                    :
                    <>
                        <Row>
                            <Col md={24} sm={24} xs={24} style={colStyle2}>
                                <TextEditor2
                                        labelField="Subject"
                                        id="subject"
                                        name="subject"
                                        isSubject={true}
                                        height='100'
                                        trigger={triggerList}
                                        onPaste={(e)=>{this.handleOnPaste(e)}}
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
                            {/* <Col md={24} sm={24} xs={24} style={colStyle2}>
                                <TextEditor
                                    labelField="Body"
                                    id="body"
                                    name="body"
                                    formItemLayout={formItemLayout}
                                    placeHolder={"Please add some text"}
                                    value={body}
                                    initialValue={body}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onChange={(content, delta, source, editor) => {
                                        this.handleEditor("body", content, editor)
                                    }}
                                    onSubmit={onSubmit}
                                    readOnly={false}
                                    required={false}
                                    style={{width:'117%'}}
                                />
                            </Col> */}
                            <Col md={24} sm={24} xs={24} style={colStyle3}>
                                <TextEditor2
                                    labelField="Body"
                                    id="body"
                                    name="body"
                                    trigger={triggerList}
                                    onPaste={(e)=>{this.handleOnPaste(e)}}
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
                                    required={true}
                                    />
                            </Col>
                        </Row>
                        <Row>
                            {/* <Col md={24} sm={24} xs={24} style={colStyle2}>
                                <TextEditor
                                    labelField="Signature"
                                    id="signature"
                                    name="signature"
                                    formItemLayout={formItemLayout}
                                    placeHolder={"Please add some text"}
                                    value={signature}
                                    initialValue={signature}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onChange={(content, delta, source, editor) => {
                                        this.handleEditor("signature", content, editor)
                                    }}
                                    onSubmit={onSubmit}
                                    readOnly={false}
                                    required={false}
                                    style={{width:'117%'}}
                                />
                            </Col> */}
                            <Col md={24} sm={24} xs={24} style={colStyle3}>
                                <TextEditor2
                                    labelField="Signature"
                                    id="signature"
                                    name="signature"
                                    trigger={triggerList}
                                    onPaste={(e)=>{this.handleOnPaste(e)}}
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
                                    required={true}
                                />
                            </Col>
                        </Row>
                    </>
                }
            </Form>
          </Modal>
        )
    }
}

const WrappedForm = Form.create()(ModalEmail);
export default WrappedForm