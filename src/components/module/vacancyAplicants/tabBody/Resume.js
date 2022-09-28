import React, { Component } from 'react'
import { Col, Row, Radio, Table } from 'antd'

import Form from '../../../uielements/form'
import Input from '../../../CustomComponentAntd/customInput'
import ImgUser from '../../../../image/ImgUser.png'
class Resume extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkAll: false,
            onSubmit: false
        }
    }

    render() {
        const { data } = this.props
        const { getFieldDecorator } = this.props.form
        const { onSubmit } = this.state

        const colStyle = {
            marginBottom: '-15px'
        }

        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 16 }
        }

        const columnsEducation = [
            {
                title: 'Degree',
                dataIndex: 'Degree'
            },
            {
                title: 'Institution Name',
                dataIndex: 'InstituteName',
                render: (text, data, idx) =>
                    data.InstituteName.toLowerCase().includes('other') ? (
                        <div>{data.InstituteOthers}</div>
                    ) : (
                        <div>{data.InstituteName}</div>
                    )
            },
            {
                title: 'Major',
                dataIndex: 'Major',
                render: (text, data, idx) =>
                    data.Major.toLowerCase().includes('other') ? <div>{data.MajorOthers}</div> : <div>{data.Major}</div>
            },
            {
                title: 'GPA/NEM',
                dataIndex: 'GPA'
            }
        ]

        const columnsOrganization = [
            {
                title: 'Organization Name',
                dataIndex: 'OrganizationName'
            },
            {
                title: 'Scope',
                dataIndex: 'OrganizationScope'
            },
            {
                title: 'Title',
                dataIndex: 'OrganizationTitle'
            }
        ]

        const columnsJobExperience = [
            {
                title: 'Company Name',
                dataIndex: 'CompanyName'
            },
            {
                title: 'Title',
                dataIndex: 'JobTitle'
            },
            {
                title: 'Position',
                dataIndex: 'JobPosition'
            },
            {
                title: 'Function',
                dataIndex: 'FunctionName'
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
                        fontSize: 25
                    }}
                >
                    Candidate's Resume
                </div>

                <Row justify="start" style={{ marginTop: 15 }}>
                    <Col md={8} sm={8} xs={24} style={colStyle}>
                        <img
                            alt={data.ApplicantName ? data.ApplicantName : ''}
                            loading="lazy"
                            style={{ maxWidth: '90%', maxHeight: 300 }}
                            src={data.ProfilePicUrl !== '' ? data.ProfilePicUrl : ImgUser}
                        />
                    </Col>
                    <Col md={16} sm={16} xs={24} style={colStyle}>
                        <Row gutter={12}>
                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                <Input
                                    labelField="Applicant ID"
                                    name="ApplicantId"
                                    id="ApplicantId"
                                    initialValue={data.ApplicantId}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onChange={() => {}}
                                    onSubmit={onSubmit}
                                    disabled={true}
                                    validation={[
                                        {
                                            required: false
                                        },
                                        {
                                            pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                            message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                        }
                                    ]}
                                />
                            </Col>
                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                <Input
                                    labelField="Full Name"
                                    name="ApplicantName"
                                    id="ApplicantName"
                                    initialValue={data.ApplicantName}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onChange={() => {}}
                                    onSubmit={onSubmit}
                                    disabled={true}
                                    validation={[
                                        {
                                            required: false
                                        },
                                        {
                                            pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                            message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                        }
                                    ]}
                                />
                            </Col>
                            <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                                <h5>Gender</h5>
                                <Radio.Group
                                    style={{ marginTop: 10 }}
                                    disabled={true}
                                    value={data.Gender.toLowerCase()}
                                >
                                    <Radio value="male">Male</Radio>
                                    <Radio value="female">Female</Radio>
                                </Radio.Group>
                            </Col>
                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                <Input
                                    labelField="Birthdate"
                                    name="BirthDate"
                                    id="BirthDate"
                                    initialValue={data.BirthDate}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onChange={() => {}}
                                    onSubmit={onSubmit}
                                    disabled={true}
                                    validation={[
                                        {
                                            required: false
                                        },
                                        {
                                            pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                            message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                        }
                                    ]}
                                />
                            </Col>
                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                <Input
                                    labelField="Email"
                                    name="Email"
                                    id="Email"
                                    initialValue={data.Email}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onChange={() => {}}
                                    onSubmit={onSubmit}
                                    disabled={true}
                                    validation={[
                                        {
                                            required: false
                                        },
                                        {
                                            pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                            message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                        }
                                    ]}
                                />
                            </Col>
                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                <Input
                                    labelField="Phone Number"
                                    name="PhoneNumber"
                                    id="PhoneNumber"
                                    initialValue={data.PhoneNumber}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onChange={() => {}}
                                    onSubmit={onSubmit}
                                    disabled={true}
                                    validation={[
                                        {
                                            required: false
                                        },
                                        {
                                            pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                            message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                        }
                                    ]}
                                />
                            </Col>
                            <Col xs={24}>
                                <Row justify="start" style={{ marginTop: 15 }}>
                                    <Col xs={24}>
                                        <Row>
                                            <Col xs={24}>
                                                <h5>Experience</h5>
                                            </Col>
                                            <Col md={12} sm={24} xs={24} style={{ width: '48%' }}>
                                                <Input
                                                    labelField="Year(s)"
                                                    name="YoeYear"
                                                    id="YoeYear"
                                                    initialValue={data.YoeYear ? data.YoeYear : ''}
                                                    formItemLayout={formItemLayout}
                                                    getFieldDecorator={getFieldDecorator}
                                                    Form={Form}
                                                    onChange={() => {}}
                                                    onSubmit={onSubmit}
                                                    disabled={true}
                                                    validation={[
                                                        {
                                                            required: false
                                                        },
                                                        {
                                                            pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                            message:
                                                                'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                                        }
                                                    ]}
                                                />
                                            </Col>
                                            <Col md={12} sm={24} xs={12} style={{ width: '47%' }}>
                                                <Input
                                                    labelField="Month(s)"
                                                    name="YoeMonth"
                                                    id="YoeMonth"
                                                    initialValue={data.YoeMonth ? data.YoeMonth : ''}
                                                    formItemLayout={formItemLayout}
                                                    getFieldDecorator={getFieldDecorator}
                                                    Form={Form}
                                                    onChange={() => {}}
                                                    onSubmit={onSubmit}
                                                    disabled={true}
                                                    validation={[
                                                        {
                                                            required: false
                                                        },
                                                        {
                                                            pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                            message:
                                                                'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                                        }
                                                    ]}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={24} sm={24} xs={24} style={colStyle}>
                                <Input
                                    labelField="Current Domicile"
                                    name="CurrentDomicile"
                                    id="CurrentDomicile"
                                    initialValue={
                                        data.CurrentDomicile.toLowerCase().includes('other')
                                            ? data.DomicileOthers
                                            : data.CurrentDomicile
                                    }
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onChange={() => {}}
                                    onSubmit={onSubmit}
                                    disabled={true}
                                    validation={[
                                        {
                                            required: false
                                        },
                                        {
                                            pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                            message: 'Sorry, only letters (a-z), numbers (0-9) are allowed!'
                                        }
                                    ]}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <div style={{ marginTop: 30 }}>
                    <h3>Education</h3>
                </div>
                <Row justify="start" style={{ marginTop: 15 }}>
                    <Col md={24} sm={24} xs={24}>
                        <Table columns={columnsEducation} dataSource={data.EducationDetail} pagination={false} />
                    </Col>
                </Row>

                <div style={{ marginTop: 30 }}>
                    <h3>Organization</h3>
                </div>
                <Row justify="start" style={{ marginTop: 15 }}>
                    <Col md={24} sm={24} xs={24}>
                        <Table columns={columnsOrganization} dataSource={data.OrganizationDetail} pagination={false} />
                    </Col>
                </Row>

                <div style={{ marginTop: 30 }}>
                    <h3>Job Experience</h3>
                </div>
                <Row justify="start" style={{ marginTop: 15 }}>
                    <Col md={24} sm={24} xs={24}>
                        <Table
                            columns={columnsJobExperience}
                            dataSource={data.JobExperienceDetail}
                            pagination={false}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

const WrappedForm = Form.create()(Resume)
export default WrappedForm
