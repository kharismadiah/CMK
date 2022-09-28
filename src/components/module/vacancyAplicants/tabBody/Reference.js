import React, { Component } from 'react'
import { Col, Row, Table, Icon } from 'antd'
import { FaRegClock, FaGraduationCap, FaRegBuilding } from 'react-icons/fa'
import Button, { ButtonGroup } from '../../../uielements/button'
import Form from '../../../uielements/form'
import Input from '../../../CustomComponentAntd/customInput'
import Select from '../../../CustomComponentAntd/customSelect'
class Reference extends Component {
    constructor(props) {
        super(props)
        this.state = {
            onSubmit: false,
            sorted: null
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { name, company, title, phone } = this.props
        if (
            name !== nextProps.name &&
            company !== nextProps.company &&
            title !== nextProps.title &&
            phone !== nextProps.phone
        ) {
            if (nextProps.name === '' && nextProps.company === '' && nextProps.title === '' && nextProps.phone === '') {
                this.props.form.resetFields()
                this.setState({
                    onSubmit: !this.state.onSubmit
                })
            }
            return true
        }
        return true
    }

    onSubmit = e => {
        e.preventDefault()
        const { onSubmit } = this.props
        this.props.form.validateFields(
            ['referenceName', 'referenceCompany', 'referenceTitle', 'ReferencePhone'],
            (err, values) => {
                if (!err) {
                    onSubmit()
                } else {
                    this.setState({
                        onSubmit: !this.state.onSubmit
                    })
                }
            }
        )
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.setState({ sorted: sorter })
    }

    render() {
        const {
            data,
            sourceTitle,
            name,
            company,
            title,
            phone,
            sourceTable,
            handleState,
            onDelete,
            isDisableAdd = false
        } = this.props
        const { getFieldDecorator } = this.props.form
        let { sorted } = this.state
        sorted = sorted || {}

        const colStyle = {
            marginBottom: '-15px'
        }
        const rowStyle = {
            marginTop: '30px',
            width: '100%',
            display: 'flex',
            flexFlow: 'row wrap'
        }
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 16 }
        }
        const formItemLayoutSelect = {
            labelCol: { span: 8 },
            wrapperCol: { span: 24 }
        }
        const columns = [
            {
                title: 'Name',
                dataIndex: 'ReferenceName',
                key: 'ReferenceName',
                sorter: (a, b) => {
                    return a.ReferenceName.toString().localeCompare(b.ReferenceName.toString())
                }
            },
            {
                title: 'Title',
                dataIndex: 'ReferenceTitleName',
                key: 'ReferenceTitleName',
                sorter: (a, b) => {
                    return a.ReferenceTitleName.toString().localeCompare(b.ReferenceTitleName.toString())
                }
            },
            {
                title: 'Company',
                dataIndex: 'ReferenceCompany',
                key: 'ReferenceCompany',
                sorter: (a, b) => {
                    return a.ReferenceCompany.toString().localeCompare(b.ReferenceCompany.toString())
                }
            },
            {
                title: 'Phone',
                dataIndex: 'ReferencePhone',
                key: 'ReferencePhone',
                sorter: (a, b) => {
                    return a.ReferencePhone.toString().localeCompare(b.ReferencePhone.toString())
                }
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: (text, data) => {
                    return (
                        <ButtonGroup>
                            <Button onClick={() => onDelete(data.ApplicantReferenceId)}>
                                <Icon type="delete" />
                            </Button>
                        </ButtonGroup>
                    )
                }
            }
        ]

        return (
            <div style={{ margin: '0 40px 40px 40px' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        fontSize: 20
                    }}
                >
                    Candidate's Reference
                </div>
                <div style={{ display: 'flex', marginTop: 30 }}>
                    <div style={{ marginRight: 20 }}>
                        <img
                            loading="lazy"
                            style={{ maxWidth: 100, maxHeight: 100 }}
                            src={data.PersonalData.ProfilePicUrl}
                        />
                    </div>
                    <div>
                        <div style={{ fontSize: 17 }}>{data.PersonalData.ApplicantName}</div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 15 }}>
                            <FaRegClock style={{ marginRight: 5 }} /> 1 Menit
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 15 }}>
                            <FaRegBuilding style={{ marginRight: 5 }} /> {data.PersonalData.UniversityName} -{' '}
                            {data.PersonalData.MajorName}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 15 }}>
                            <FaGraduationCap style={{ marginRight: 5 }} /> GPA {data.PersonalData.GPA}
                        </div>
                    </div>
                </div>
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <Row style={rowStyle} justify="start">
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                <Input
                                    labelField="Name"
                                    disabled={false}
                                    name="referenceName"
                                    id="referenceName"
                                    initialValue={name}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onChange={(e, value) => handleState(e, value)}
                                    onSubmit={this.state.onSubmit}
                                    maxLength={100}
                                    isRequired={true}
                                    validation={[
                                        {
                                            required: true,
                                            message: 'Please enter the Name'
                                        },
                                        {
                                            pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                            message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                        }
                                    ]}
                                />
                            </Col>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                <Input
                                    labelField="Company"
                                    disabled={false}
                                    name="referenceCompany"
                                    id="referenceCompany"
                                    initialValue={company}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onChange={(e, value) => handleState(e, value)}
                                    onSubmit={this.state.onSubmit}
                                    maxLength={50}
                                    isRequired={true}
                                    validation={[
                                        {
                                            required: true,
                                            message: 'Please enter the Company'
                                        },
                                        {
                                            pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                            message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                        }
                                    ]}
                                />
                            </Col>
                        </Col>
                    </Row>
                    <Row style={rowStyle} justify="start">
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                <Select
                                    labelField="Title"
                                    name="referenceTitle"
                                    id="referenceTitle"
                                    initialValue={title}
                                    formItemLayout={formItemLayoutSelect}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    data={sourceTitle}
                                    value={title}
                                    onChange={e => {
                                        handleState('referenceTitle', e)
                                    }}
                                    onSubmit={this.state.onSubmit}
                                    isRequired={true}
                                    validation={[
                                        {
                                            required: true,
                                            message: 'Please enter the Title'
                                        }
                                    ]}
                                />
                            </Col>
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                <Input
                                    placeholder="+628xxx"
                                    labelField="Phone"
                                    disabled={false}
                                    name="ReferencePhone"
                                    id="ReferencePhone"
                                    initialValue={phone}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onChange={(e, value) => handleState(e, value)}
                                    onSubmit={this.state.onSubmit}
                                    isRequired={true}
                                    validation={[
                                        {
                                            required: true,
                                            message: 'Please enter the Phone'
                                        },
                                        {
                                            pattern: new RegExp(/^(\+)[0-9]{8,19}$/g),
                                            message: "Sorry, please input with '+628xxx' format and min. 8 numbers!"
                                        }
                                    ]}
                                />
                            </Col>
                        </Col>
                    </Row>
                    <Row style={rowStyle} justify="start">
                        <Col md={24} sm={24} xs={24} style={{ textAlign: 'right', paddingRight: '4%' }}>
                            <Button htmlType="submit" type="primary" disabled={isDisableAdd}>
                                Add Reference
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row style={rowStyle} justify="start">
                    <Col md={24} sm={24} xs={24} style={colStyle}>
                        <Table
                            style={{ marginTop: '30px' }}
                            columns={columns}
                            dataSource={sourceTable}
                            onChange={this.handleTableChange}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}
const WrappedFormReference = Form.create()(Reference)
export default WrappedFormReference
