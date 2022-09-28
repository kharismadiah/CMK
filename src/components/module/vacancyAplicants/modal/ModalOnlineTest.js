import React, { Component } from 'react';
import { Modal, Row, Col, Icon, Radio, Upload } from 'antd';
import Form from '../../../uielements/form'
import Datepicker from '../../../CustomComponentAntd/customDatePicker';
import Button from '../../../uielements/button';
import InputNonForm from '../../../CustomComponentAntd/customInputNonForm';
import Input from '../../../../components/CustomComponentAntd/customInput';
import TextArea from '../../../CustomComponentAntd/customTextAreaNonForm'

class ModalPsychologicalTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            onSubmit: false,
        }
    }

    componentWillMount() {
        const { data } = this.props
        this.props.form.setFields({
            tglTest: data.tglTest,
            testTool: data.testTool,
        })
    }

    onCancel = () => {
        const { initStateFormEmail, resetModal } = this.props
        initStateFormEmail()
        resetModal("modalOnlineTest")
    }

    onCancelModal = () => {
        const { handleState, resetModal, data } = this.props
        this.setState({ onSubmit: false })
        handleState('visible', false)
        resetModal("modalOnlineTest")
        this.props.form.setFields({
            tglTest: '',
            testTool: '',
            cutOffCode: '',
            cutOffName: '',
            uploadFile: '',
            notesOnline: ''
        })
    }

    onUpload = (e) => {
        const { handleState } = this.props
        handleState('uploadFile', e)
    }

    onSubmit = (e) => {
        const { onSubmit } = this.props
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                onSubmit()
            } else {
                this.setState({
                    onSubmit: !this.state.onSubmit
                })
            }
        })
    }

    render() {
        const { data, handleState } = this.props
        const { getFieldDecorator } = this.props.form

        const colStyle2 = {
            marginBottom: '-10px',
            position: "relative",
        };
        const formItemLayoutSelect = {
            labelCol: { span: 8 },
            wrapperCol: { span: 24 }
        };
        const formItemLayoutDate = {
            labelCol: { span: 8 },
            wrapperCol: { span: 22 }
        };

        return (
            <Form>
                <Modal
                    title={data.title}
                    visible={data.visible}
                    onCancel={() => this.onCancelModal()}
                    onOk={this.onSubmit}
                    okText="Submit"
                >
                    <Row>
                        <Col md={24} sm={24} xs={24} style={colStyle2}>
                            <Datepicker
                                disabled={false}
                                labelField="Tanggal Test"
                                name="tglTest"
                                id="tglTest"
                                initialValue={data.tglTest}
                                formItemLayout={formItemLayoutDate}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                format={'DD/MM/YYYY'}
                                onChange={handleState}
                                onSubmit={this.state.onSubmit}
                                isRequired={true}
                                validation={
                                    [
                                        {
                                            required: true,
                                            message: "Please enter the Tanggal Test"
                                        }
                                    ]
                                }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                            <h5>Hasil Tes <span style={{color: "red"}}>*</span></h5>
                            <Radio.Group id="hasilTest" onChange={(e) => handleState('hasilTest', e.target.value)} value={data.hasilTest}>
                                <Radio value={1}>Pass</Radio>
                                <Radio value={0}>Failed</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={16} sm={16} xs={24} style={colStyle2}>
                            <Input
                                labelField="Test Tool"
                                name="testTool"
                                id="testTool"
                                initialValue={data.testTool}
                                formItemLayout={formItemLayoutSelect}
                                getFieldDecorator={getFieldDecorator}
                                value={data.testTool}
                                Form={Form}
                                onChange={handleState}
                                onSubmit={this.state.onSubmit}
                                isRequired={true}
                                validation={
                                    [
                                        {
                                            required: true,
                                            message: "Please enter the Test Tool"
                                        }
                                    ]
                                }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={16} sm={16} xs={24} style={colStyle2}>
                            <Input
                                labelField="Cut Off Code"
                                name="cutOffCode"
                                id="cutOffCode"
                                initialValue={data.cutOffCode}
                                formItemLayout={formItemLayoutSelect}
                                getFieldDecorator={getFieldDecorator}
                                value={data.cutOffCode}
                                Form={Form}
                                onChange={handleState}
                                onSubmit={this.state.onSubmit}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={16} sm={16} xs={24} style={colStyle2}>
                            <Input
                                labelField="Cut Off Name"
                                name="cutOffName"
                                id="cutOffName"
                                initialValue={data.cutOffName}
                                formItemLayout={formItemLayoutSelect}
                                getFieldDecorator={getFieldDecorator}
                                value={data.cutOffName}
                                Form={Form}
                                onChange={handleState}
                                onSubmit={this.state.onSubmit}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24} sm={24} xs={24}>
                            <div style={{ width: '91%' }}>
                                <TextArea
                                    labelField="Notes"
                                    id="notesOnline"
                                    name="notesOnline"
                                    formItemLayout={formItemLayoutSelect}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onSubmit={this.state.onSubmit}
                                    value={data.notesOnline}
                                    onChange={handleState}
                                    validation={
                                        [
                                            {
                                                required: true,
                                                message: "Please enter the Notes"
                                            }
                                        ]
                                    }
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={10} sm={10} xs={24} style={colStyle2}>
                            <Upload accept="application/pdf" showUploadList={false} beforeUpload={this.onUpload} multiple={false}>
                                <Button type="primary"><Icon type="upload" /> Upload File</Button>
                            </Upload>
                        </Col>
                        <Col md={13} sm={13} xs={24} style={colStyle2}>
                            <InputNonForm
                                placeholder="Upload File Name"
                                disabled={true}
                                name="uploadFile"
                                id="uploadFile"
                                onSubmit={this.state.onSubmit}
                                value={data.uploadFile.name === undefined ? data.file : data.uploadFile.name}
                            // validation={
                            //     [
                            //         {
                            //             required: true,
                            //             message: "Please upload interview form"
                            //         }
                            //     ]
                            // }
                            />
                        </Col>
                    </Row>
                </Modal>
            </Form>
        )
    }
}

const WrappedForm = Form.create()(ModalPsychologicalTest);
export default WrappedForm