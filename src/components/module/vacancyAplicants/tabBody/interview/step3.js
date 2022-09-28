import React, { Component } from 'react';
import {
  Col,
  Row,
  Table,
  Icon,
  Divider,
  Tooltip,
} from 'antd';
import Input from '../../../../CustomComponentAntd/customInput';
import Datepicker from '../../../../CustomComponentAntd/customDatePicker';
import Select from '../../../../CustomComponentAntd/customSelect';
import Button, { ButtonGroup } from '../../../../uielements/button';
import { GrSend } from 'react-icons/gr';
import { connect } from 'react-redux';
import * as actions from '../../../../../redux/RecruitmentPhase/action';
import actions_auth from '../../../../../redux/auth/actions';
import Form from '../../../../uielements/form'
import ModalCustomAction from '../../../../../components/module/vacancyAplicants/modal/ModalCustomAction'
import moment from 'moment'
import ModalEmail from '../../../../../components/module/vacancyAplicants/modal/ModalEmail'
import ModalEditInterview from '../../../../../components/module/vacancyAplicants/modal/ModalEditInterview'
import ModalSelectEmailTemplate from '../../../../../components/module/vacancyAplicants/modal/ModalSelectEmailTemplate'

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      isInvitation: false,
      onSubmit: false
    }
    this.handleChangeStep = this.handleChangeStep.bind(this);
  }


  componentDidMount() {
    const { getDataSchedule, dataPersonal } = this.props
    getDataSchedule(dataPersonal.ApplicantId)
  }

  handleChangeStep(param1) {
    const { handleChangeDetailModal, handleStatePosisi, handleStateGlobal, title } = this.props;
    const changeStep = {
      step: param1,
      interviewType: title,
    };
    handleStatePosisi(2)
    handleChangeDetailModal('interviewType', changeStep)
    handleStateGlobal('interviewType', changeStep);
  }
  gridSend(dataRow) {
    const { handleStateGlobal, fetchEmailRedactionalInterview, handleStateSubProperty,
        handleStateModalEmailTemplateInterviewStep3,
        getListEmailTemplate,handleStateModalEmailTemplate } = this.props
    handleStateGlobal("dataInterviewer", dataRow)
    handleStateModalEmailTemplate('activity', 'ATS Phase - Interview')
    handleStateModalEmailTemplate('action', 'Send Email Invitation')
    handleStateModalEmailTemplateInterviewStep3('visible', true)
    getListEmailTemplate()
    // fetchEmailRedactionalInterview()
    // handleStateSubProperty('modalInvitationInterview', 'visible', true)
  }
  gridAdd(data) {
    const { handleStatePosisi, handleChangeDetailModal, RecruitmentPhase, handleStateSubProperty, handleStateGlobal, title, fetchViewInterviewHR } = this.props;
    fetchViewInterviewHR(data.ApplicationInterviewId);
    handleStatePosisi(4)
    handleStateSubProperty('modalEditInterview', 'id', data.ApplicationInterviewId)
    handleChangeDetailModal("interviewCompanyId", RecruitmentPhase.modal.Interview.interviewCompanyId)
    handleChangeDetailModal("interviewer", data.InterviewerName)
    handleChangeDetailModal("interviewDate", moment(data.ScheduleDate, "DD/MM/YYYY"))
    let changeStep = {
      step: 4,
      interviewType: title,
    }
    handleStateGlobal('interviewType', changeStep);

  }
  gridEdit(data) {
    const { handleStateSubProperty, RecruitmentPhase } = this.props;
    handleStateSubProperty('modalEditInterview', 'id', data.ApplicationInterviewId)
    handleStateSubProperty('modalEditInterview', 'NamaCalon', RecruitmentPhase.modal.Interview.NamaCalon)
    handleStateSubProperty('modalEditInterview', 'NamaPosition', RecruitmentPhase.modal.Interview.NamaPosition)
    handleStateSubProperty('modalEditInterview', 'interviewCompanyId', RecruitmentPhase.modal.Interview.interviewCompanyId)
    handleStateSubProperty('modalEditInterview', 'Department', RecruitmentPhase.modal.Interview.Department)
    handleStateSubProperty('modalEditInterview', 'interviewer', data.InterviewerName)
    handleStateSubProperty('modalEditInterview', 'interviewerJobPosition', data.JobPosition)
    handleStateSubProperty('modalEditInterview', 'interviewDate', data.ScheduleDate)
    handleStateSubProperty('modalEditInterview', 'visible', true)
  }
  onDelete() {
    const { dataPersonal, fetchDeleteInterviewer } = this.props;
    fetchDeleteInterviewer(this.state.id, dataPersonal.ApplicantId)
  }

  handleInvitation = () => {
    this.setState({ isInvitation: false })
  }

  onSubmitAllForm = (e) => {
    e.preventDefault()
    const {handleChangeDetailModal, addDataScheduleInterviewer, RecruitmentPhase, dataPersonal} = this.props
    const { interviewCompanyId, interviewDate, interviewer, interviewerJobPosition } = RecruitmentPhase.modal.Interview;
    const ApplicantId = dataPersonal.ApplicantId
    let phase = parseInt(window.location.pathname.slice(-3).match(/\d+/)[0])
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        addDataScheduleInterviewer(phase, ApplicantId, interviewCompanyId, interviewer, interviewerJobPosition, interviewDate)
        handleChangeDetailModal("interviewer", '')
        handleChangeDetailModal("interviewerJobPosition", '')
        handleChangeDetailModal('interviewDate', '')
        this.props.form.resetFields()
      }else{
        this.setState({
          onSubmit: !this.state.onSubmit
        })
      }
    })
  }

  handleSendEmail = () => {
    const { fetchEmailRedactionalInterview } = this.props
    // fetchEmailRedactionalInterview('ATS Phase - Interview', 'Send email invitation')
    fetchEmailRedactionalInterview()
  }

  onCancelEmailTemplateInterviewStep3 = () => {
    const {handleStateModalEmailTemplate, handleStateModalEmailTemplateInterviewStep3,
        resetEmailTemplateState} = this.props
    handleStateModalEmailTemplateInterviewStep3('visible', false)
    resetEmailTemplateState()

    handleStateModalEmailTemplate('selectedEmailTemplateId', null)
    handleStateModalEmailTemplate('action', "")
    handleStateModalEmailTemplate('activity', "")
}

onOkSelectEmailTemplateInterviewStep3 = () => {
    const { fetchEmailRedactionalInterview,handleStateSubProperty,
            handleStateModalEmailTemplateInterviewStep3, 
            resetEmailTemplateState} = this.props
    fetchEmailRedactionalInterview()
    handleStateModalEmailTemplateInterviewStep3('visible',false)
    // handleStateSubProperty('modalInvitationInterview', 'visible', true)
    resetEmailTemplateState()
}

  render() {
    const { fetchEmailRedactionalInterview, sourceTable, handleStatePosisi, dataPersonal, RecruitmentPhase, handleChangeDetailModal, handleStateSubProperty,
      handleStateModalAction, fetchResendEmailHr, fetchEditInterviewer, handleStateInvitationInterview, viewResult, submitResult, handleStateGlobal, title, isHired,
      getListEmailTemplate, handleStateModalEmailTemplate} = this.props;
    const { NamaCalon, NamaPosition, Department, interviewCompanyId, interviewDate, interviewer, interviewerJobPosition, result, fetchDeleteInterviewer, company } = RecruitmentPhase.modal.Interview;
    const { getFieldDecorator } = this.props.form
    let phase = parseInt(window.location.pathname.slice(-3).match(/\d+/)[0])

    const ApplicantId = dataPersonal.ApplicantId
    const colStyle = {
      marginBottom: '-15px',
    };
    const rowStyle = {
      marginTop: '30px',
      width: '100%',
      display: 'flex',
      flexFlow: 'row wrap',
    };
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const formItemLayoutDate = {
      labelCol: { span: 8 },
      wrapperCol: { span: 22 },
    };

    const columns = [
      {
        title: 'Company',
        dataIndex: 'CompanyName',
        key: 'CompanyName',
      },
      {
        title: 'Interviewer',
        dataIndex: 'InterviewerName',
        key: 'InterviewerName',
      },
      {
        title: 'Job Position',
        dataIndex: 'JobPosition',
        key: 'JobPosition',
      },
      {
        title: 'Tgl Wawancara',
        dataIndex: 'ScheduleDate',
        key: 'ScheduleDate',
      },
      {
        title: 'Status',
        dataIndex: 'Status',
        key: 'Status',
      },
      {
        title: 'Action',
        dataIndex: 'Status',
        key: 'Status',
        render: (text, data) => {
          return (
            <ButtonGroup>
              <Button className='send-container' disabled={text === "Result Submitted" || text === "Accepted" || isHired} onClick={() => { this.gridSend(data) }}>
                <GrSend style={{ fontSize: 14 }} />
              </Button>
              <Button onClick={() => { this.gridAdd(data) }}>
                <Icon type='plus-circle' />
              </Button>
              <Button onClick={() => { this.gridEdit(data) }} disabled={text === "Result Submitted"}>
                <Icon type='edit' />
              </Button>
              <Button onClick={() => { 
                this.setState({id: data.ApplicationInterviewId})
                handleStateSubProperty('modalCustomAction', 'visible', true)
              }} disabled={text !== "" || text === "Reschedule" || isHired}>
                <Icon type='delete' />
              </Button>
            </ButtonGroup>
          );
        },
      },
    ];
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            fontSize: 20,
          }}>
          SCHEDULING INTERVIEW
        </div>
        <Form onSubmit={(e) => this.onSubmitAllForm(e)}>
          <Row style={rowStyle} justify='start'>
            <Col md={12} sm={12} xs={24} style={colStyle}>
              <Col md={24} sm={24} xs={24} style={colStyle}>
                <Input
                    labelField='Nama Calon'
                    disabled={true}
                    name='name'
                    id='name'
                    initialValue={NamaCalon}
                    formItemLayout={formItemLayout}
                    getFieldDecorator={getFieldDecorator}
                    Form={Form}
                    onChange={() => {}}
                    onSubmit={this.state.onSubmit}
                />
              </Col>
            </Col>
            <Col md={12} sm={12} xs={24} style={colStyle}>
              <Col md={24} sm={24} xs={24} style={colStyle}>
                <Input
                    labelField='Company'
                    disabled={true}
                    name='company'
                    id='company'
                    initialValue={company}
                    formItemLayout={formItemLayout}
                    getFieldDecorator={getFieldDecorator}
                    Form={Form}
                    onChange={() => {}}
                    onSubmit={this.state.onSubmit}
                />
              </Col>
            </Col>
          </Row>
          <Row style={rowStyle} justify='start'>
            <Col md={12} sm={12} xs={24} style={colStyle}>
              <Col md={24} sm={24} xs={24} style={colStyle}>
                <Input
                    labelField='Nama Posisi'
                    disabled={true}
                    name='position'
                    id='position'
                    initialValue={NamaPosition}
                    formItemLayout={formItemLayout}
                    getFieldDecorator={getFieldDecorator}
                    Form={Form}
                    onChange={() => {}}
                    onSubmit={this.state.onSubmit}
                />
              </Col>
            </Col>
            <Col md={12} sm={12} xs={24} style={colStyle}>
              <Col md={24} sm={24} xs={24} style={colStyle}>
                <Input
                    labelField='Interviewer'
                    name='interviewer'
                    id='interviewer'
                    initialValue={interviewer}
                    formItemLayout={formItemLayout}
                    getFieldDecorator={getFieldDecorator}
                    Form={Form}
                    onChange={handleChangeDetailModal}
                    onSubmit={this.state.onSubmit}
                    isRequired={true}
                    validation={[
                        {
                            required: true,
                            message: "Please input your Interviewer"
                        }
                    ]}
                />
              </Col>
            </Col>
          </Row>
          <Row style={rowStyle} justify='start'>
            <Col md={12} sm={12} xs={24} style={colStyle}>
              <Col md={24} sm={24} xs={24} style={colStyle}>
                <Input
                    labelField='Dept/Div'
                    disabled={true}
                    name='dept'
                    id='dept'
                    initialValue={Department}
                    formItemLayout={formItemLayout}
                    getFieldDecorator={getFieldDecorator}
                    Form={Form}
                    onChange={() => {}}
                    onSubmit={this.state.onSubmit}
                />
              </Col>
            </Col>
            <Col md={12} sm={12} xs={24} style={colStyle}>
              <Col md={24} sm={24} xs={24} style={colStyle}>
                <Input
                    labelField='Job Position'
                    name='interviewerJobPosition'
                    id='interviewerJobPosition'
                    initialValue={interviewerJobPosition}
                    formItemLayout={formItemLayout}
                    getFieldDecorator={getFieldDecorator}
                    Form={Form}
                    onChange={handleChangeDetailModal}
                    onSubmit={this.state.onSubmit}
                    isRequired={true}
                    validation={[
                        {
                            required: true,
                            message: "Please input your Job Position"
                        }
                    ]}
                />
              </Col>
            </Col>
          </Row>

          <Row style={rowStyle} justify='start'>
            <Col md={12} sm={12} xs={24} style={colStyle}>
              <Col md={24} sm={24} xs={24} style={colStyle}></Col>
            </Col>
            <Col md={12} sm={12} xs={24} style={colStyle}>
              <Col md={24} sm={24} xs={24} style={colStyle}>
                <Datepicker
                  labelField='Tgl Wawancara'
                  name='interviewDate'
                  id='interviewDate'
                  initialValue={interviewDate}
                  formItemLayout={formItemLayoutDate}
                  getFieldDecorator={getFieldDecorator}
                  Form={Form}
                  onSubmit={this.state.onSubmit}
                  format={'DD/MM/YYYY'}
                  onChange={(e, value) => handleChangeDetailModal('interviewDate', value)}
                  isRequired={true}
                  validation={
                    [
                      {
                        required: true,
                        message: "Please enter the Tgl Wawancara"
                      }
                    ]
                  }
                />
              </Col>
            </Col>
          </Row>

          <Row style={rowStyle} justify='start' className='text-center'>
            <Col md={24} sm={24} xs={24} style={{ paddingRight: '4%', marginTop: '1.8rem' }}>
              <Divider>
                <Button htmlType="submit" type="primary" disabled={isHired}>
                  Add Interviewer
                </Button>
              </Divider>
            </Col>
          </Row>

        </Form>

        <Row style={rowStyle} justify='start'>
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Table
              style={{ marginTop: '1rem' }}
              columns={columns}
              dataSource={RecruitmentPhase.dataInterviewSchedule.dataInterviewScheduleList}
              pagination={false}
            />
          </Col>
        </Row>

        <Row style={rowStyle} justify='start'>
          <Col md={18} sm={18} xs={24} style={colStyle}>
            <Col md={24} sm={24} xs={24} style={colStyle}>
              <Select
                labelField="Result"
                name="result"
                id="result"
                // formItemLayout={formItemLayout}
                getFieldDecorator={getFieldDecorator}
                Form={Form}
                initialValue={result}
                onChange={(e) => {
                  handleChangeDetailModal('result', e)
                }}
                data={[{ id: 'Pick Candidate', name: 'Pick Candidate' }, { id: 'Refuse Candidate', name: 'Refuse Candidate' }]}
                disabled={false}
                validation={
                  [
                    {
                      required: false,
                      message: "Please enter the Result"
                    }
                  ]
                }
              />
            </Col>
          </Col>
          <Col md={6} sm={6} xs={24} style={colStyle}>
            <Col md={24} sm={24} xs={24} style={colStyle}>
              <h5>&nbsp;</h5>
              <Button type='primary'
                disabled={!RecruitmentPhase.dataInterviewSchedule.isResultSubmitted}
                onClick={() => {
                  { handleStateSubProperty('modalCustomAction', 'visibleSubmit', true) }
                }}>
                Submit Result
              </Button>
              <Tooltip title='View Result'>
                <Button
                  style={{ marginLeft: '1rem' }}
                  disabled={false}
                  shape='circle'
                  disabled={!RecruitmentPhase.dataInterviewSchedule.isResultSubmitted}
                  onClick={() => {
                    handleStatePosisi(5)
                    let changeStep = {
                      ...RecruitmentPhase.interviewType,
                      step: 5,
                      interviewType: title,
                    }
                    handleStateGlobal('interviewType', changeStep);
                    viewResult()
                  }}>
                  <Icon type='eye' />
                </Button>
              </Tooltip>
            </Col>
          </Col>
        </Row>
        <Row style={rowStyle} justify='start'>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Col md={24} sm={24} xs={24} style={colStyle}>
              <Button
                style={{ marginTop: '2rem' }}
                onClick={() => {
                  this.handleChangeStep(2)
                  let changeStep = {
                    step: 2,
                    interviewType: title,
                  }
                  handleStateGlobal('interviewType', changeStep);
                }}>
                <Icon type='left' />
                Previous Page
              </Button>
            </Col>
          </Col>
        </Row>

        <ModalCustomAction
          visible={RecruitmentPhase.modalCustomAction.visible}
          onSubmit={() => this.onDelete(this)}
          text={"Do you want to delete this interviewer?"}
          title={"Delete Interviewer"}
          handleState={handleStateSubProperty}
          fetchDeleteInterviewer={fetchDeleteInterviewer}
          dataPersonal={dataPersonal}
        />

        <ModalCustomAction
          visible={RecruitmentPhase.modalCustomAction.visibleSubmit}
          onSubmit={submitResult}
          text={"Do you want to submit this result?"}
          title={"Submit Interview Summary Result"}
          handleState={handleStateSubProperty}
          isVisisbleSubmit={true}
        />

        <ModalEmail
          handleStateModalEmailTemplate={handleStateModalEmailTemplate}
          visible={RecruitmentPhase.modalInvitationInterview.visible}
          triggerList={RecruitmentPhase.triggerList}
          subject={RecruitmentPhase.modalInvitationInterview.subject}
          body={RecruitmentPhase.modalInvitationInterview.body}
          signature={RecruitmentPhase.modalInvitationInterview.signature}
          handleStateModal={handleStateInvitationInterview}
          onSend={fetchResendEmailHr}
          resetCheckAction={handleStateModalAction}
          isInvitation={false}
          setInvitation={this.handleInvitation}
          phase={phase}
          title={"Send Email Invitation"}
          subTitle={"invitation"}
          modalAction={RecruitmentPhase.modalAction}
          getEmailRedac={this.handleSendEmail}
        />

        <ModalEditInterview
          visible={RecruitmentPhase.modalEditInterview.visible}
          onSend={fetchEditInterviewer}
          NamaCalon={RecruitmentPhase.modalEditInterview.NamaCalon}
          NamaPosition={RecruitmentPhase.modalEditInterview.NamaPosition}
          Department={RecruitmentPhase.modalEditInterview.Department}
          interviewCompanyId={RecruitmentPhase.modalEditInterview.interviewCompanyId}
          interviewer={RecruitmentPhase.modalEditInterview.interviewer}
          interviewerJobPosition={RecruitmentPhase.modalEditInterview.interviewerJobPosition}
          interviewDate={RecruitmentPhase.modalEditInterview.interviewDate}
          handleState={handleStateSubProperty}
          SourceCompany={RecruitmentPhase.source.Company}
          isHired={isHired}
        />

        <ModalSelectEmailTemplate
          visible={RecruitmentPhase.modalSelectEmailTemplateInterviewStep3.visible}
          RecruitmentPhase={RecruitmentPhase}
          getListEmailTemplate={getListEmailTemplate}
          onCancel={this.onCancelEmailTemplateInterviewStep3}
          handleStateModalEmailTemplate={handleStateModalEmailTemplate}
          onOk={this.onOkSelectEmailTemplateInterviewStep3}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  RecruitmentPhase: state.RecruitmentPhase,
  Auth: state.Auth,
  userRole: state.Auth.roleName,
});

const WrappedForm = Form.create()(Step3);
export default connect(mapStateToProps, {
  ...actions,
  ...actions_auth,
})(WrappedForm);
