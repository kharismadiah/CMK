import React, { Component } from 'react';
import { Modal, Row, Col } from 'antd';
import Form from '../../../uielements/form'
import Input from '../../../CustomComponentAntd/customInput';
import Button from '../../../uielements/button';
import { EditOutlined } from '@ant-design/icons';
import TextEditor from '../../../CustomComponentAntd/customTextEditor';
import TextEditor2 from '../../../CustomComponentAntd/customSuneditor';
import Datepicker from '../../../../components/CustomComponentAntd/customDatePicker';

class ModalHiringManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onSubmit: false,
            isEdit: false
        }
    }

    onEdit = () => {
        this.setState({ isEdit: !this.state.isEdit })
    }

    onCancelModal = () => {
        const { resetCheckAction, handleStateModal, getEmailRedac } = this.props
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
        return { __html: `<div>Subject ${subject}</div><div>${body}</div><div>${signature}</div>` };
    }

    handleEditor = (property, value, editor) => {
        const {handleStateModal} = this.props
        // if(editor.getLength() <= 1){
        //     handleStateModal(property, "")
        // }else{
            handleStateModal(property, value)
        // }
    }

    onSendEmail = () => {
        const {onSend, setInvitation, isInvitation=false, phase} = this.props
        if(this.state.isEdit){
            this.setState({ isEdit: false })
        }else{
            this.props.form.validateFields(['date'], (err, values) => {
                if (!err) {
                    onSend(isInvitation, phase)
                    setInvitation()
                }else{
                    this.setState({
                        onSubmit: !this.state.onSubmit
                    })
                }
            })
        }
    }

    render() {
        const { handleStateModal, modalAction, dataModal: {visible, subject, body, signature, date} } = this.props
        let { title="Send Email Notification", subTitle="notification" } = this.props
        const { getFieldDecorator } = this.props.form

        const { onSubmit, isEdit } = this.state
        const colStyle = {
            textAlign: 'center'
        };
        const colStyle2 = {
            marginBottom: '-15px',
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
        if(!modalAction.visible && !modalAction.checked){
            title = "Send Email Invitation"
            subTitle = "invitation"
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
                    {
                        !isEdit ?
                            <Row type="flex" justify="space-around" align="middle">
                                <Col md={21} sm={21} xs={24} style={{ marginTop: 20 }}>
                                    <div dangerouslySetInnerHTML={this.createMarkup(subject, body, signature)} />
                                    <Row>
                                        <Col  md={12} sm={12} xs={12} style={{marginTop:20}}>
                                            <Datepicker
                                                labelField="Due Date"
                                                name="date"
                                                id="date"
                                                initialValue={date}
                                                formItemLayout={formItemLayoutDate}
                                                getFieldDecorator={getFieldDecorator}
                                                Form={Form}
                                                data={[]}
                                                format={'DD/MM/YYYY'}
                                                value={date}
                                                onChange={handleStateModal}
                                                onSubmit={onSubmit}
                                                validation={
                                                    [
                                                        {
                                                            required: true,
                                                            message: "Please enter the Due Date"
                                                        }
                                                    ]
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={3} sm={3} xs={24} style={colStyle}>
                                    <EditOutlined onClick={this.onEdit} style={{ fontSize: 20, cursor: 'pointer' }} />
                                </Col>
                            </Row>
                        :
                            <>
                                <Row>
                                    <Col md={24} sm={24} xs={24} style={colStyle2}>
                                        <Input
                                            labelField="Subject"
                                            name="subject"
                                            id="subject"
                                            initialValue={subject}
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onChange={handleStateModal}
                                            onSubmit={onSubmit}
                                            maxLength={100}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={24} sm={24} xs={24} style={{marginBottom:20}}>
                                        <TextEditor2
                                            labelField="Body"
                                            id="body"
                                            name="body"
                                            formItemLayout={formItemLayout}
                                            value={body}
                                            initialValue={body}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onChange={(content) => {
                                                this.handleEditor("body", content)
                                            }}
                                            onSubmit={onSubmit}
                                            readOnly={false}
                                            required={false}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={24} sm={24} xs={24} style={{marginBottom:20}}>
                                        <TextEditor2
                                            labelField="Signature"
                                            id="signature"
                                            name="signature"
                                            formItemLayout={formItemLayout}
                                            placeHolder={"Please add some text"}
                                            value={signature}
                                            initialValue={signature}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onChange={(content) => {
                                                this.handleEditor("signature", content)
                                            }}
                                            onSubmit={onSubmit}
                                            readOnly={false}
                                            required={false}
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

const WrappedForm = Form.create()(ModalHiringManager);
export default WrappedForm