import React, { Component } from 'react';
import { Col, Row, Table, Icon } from 'antd';
import InputNonForm from '../../../../CustomComponentAntd/customInputNonForm';
import Select from '../../../../CustomComponentAntd/customSelect';
import Button, { ButtonGroup } from '../../../../uielements/button';
import { connect } from 'react-redux';
import * as actions from '../../../../../redux/RecruitmentPhase/action';
import actions_auth from '../../../../../redux/auth/actions';
import Form from '../../../../uielements/form'
import ModalCustomAction from '../../../../../components/module/vacancyAplicants/modal/ModalCustomAction'

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: null,
      id: ''
    };

    this.handleChangeStep = this.handleChangeStep.bind(this);
  }

  componentWillMount() {
    const { handleChangeDetailModal, getCompanyList, title = '', addDataInterview, RecruitmentPhase } = this.props
    handleChangeDetailModal('interviewCompanyId', '')
    getCompanyList()
    // if (title !== 'INTERVIEW MT' && RecruitmentPhase.dataCompanyList.length === 0) {
    //   addDataInterview("nonmt")
    // }
    // (title !== 'INTERVIEW MT' && RecruitmentPhase.dataCompanyList.length === 0) ? addDataInterview("nonmt") : null
  }
  handleChange(e, newCompany) {
    this.setState({
      company: newCompany
    })
  }
  handleChangeStep(param1) {
    const { handleStateModalInterview, handleStatePosisi } = this.props;
    const changeStep = {
      step: param1,
      interviewType: ''
    };
    handleStatePosisi(1)
    handleStateModalInterview('interviewType', changeStep);
  }

  handleTableClick(param) {
    const { handleStateGlobal, handleStatePosisi, handleChangeDetailModal, title } = this.props;
    const changeStep = {
      step: 3,
      interviewType: title,
      company: param.InterviewCompanyId,
      ...param,
    };
    handleStatePosisi(3)
    handleChangeDetailModal('interviewCompanyId', param.InterviewCompanyId)
    handleChangeDetailModal('company', param.Company)
    handleStateGlobal('interviewType', changeStep);
  }

  // handleAdd() {
  //   const { addDataInterview, data, RecruitmentPhase, typeInterview } = this.props;
  //   addDataInterview(RecruitmentPhase.modal.Interview.interviewCompanyId, RecruitmentPhase.interviewType.interviewType === "INTERVIEW MT" ? 1 : 2, data.ApplicantId)
  // }

  handlesetId(id) {
    this.setState({
      id: id
    })
  }

  onSubmit(id){
    const {fetchDeleteDataCompany} = this.props
    fetchDeleteDataCompany(id)
  }

  render() {
    const { RecruitmentPhase, title, fetchDeleteDataCompany, typeInterview, addDataInterview, data, handleChangeDetailModal, handleStateSubProperty, handleStateGlobal, isHired } = this.props;
    const { NamaCalon, NamaPosition, Department, interviewCompanyId } = RecruitmentPhase.modal.Interview;
    const { getFieldDecorator } = this.props.form
    const {
      interviewType,
      CompanyList,
    } = RecruitmentPhase.modal.Interview;
    const colStyle = {
      marginBottom: '-15px',
    };
    const rowStyle = {
      marginTop: '30px',
      width: '100%',
      display: 'flex',
      flexFlow: 'row wrap',
    };

    const columns = [
      {
        title: 'Company',
        dataIndex: 'Company',
        key: 'Company',
        render: (text, data) => {
          return (
            <div onClick={(e) => this.handleTableClick(data)} >
              <span >{text}</span>
            </div>
          );
        },
      },
      {
        title: 'Result',
        dataIndex: 'Result',
        key: 'Result',
        render: (text, data) => {
          return (
            <div onClick={(e) => this.handleTableClick(data)} >
              <span >{text}</span>
            </div>
          )
        },
      },
    ];

    const columnsNonMT = [
      ...columns,
      {
        title: 'Action',
        dataIndex: 'InterviewerAdded',
        key: 'InterviewerAdded',
        render: (text, data) => {
          return (
            <ButtonGroup>
              <Button disabled={text} onClick={() => {
                this.handlesetId(data.InterviewCompanyId)
                handleStateSubProperty('modalCustomAction', 'visible', true)
              }} disabled={data.InterviewerAdded}>
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
          INTERVIEW SUMMARY - {title === 'INTERVIEW MT' ? "(MT)" : "(NON MT)"}
        </div>
        <Row style={rowStyle} justify='start'>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Col md={24} sm={24} xs={24} style={colStyle}>
              <InputNonForm
                labelField='Nama Calon'
                disabled={true}
                name='name'
                id='name'
                value={NamaCalon}
              // onChange={handleStateModalDetail}
              />
            </Col>
          </Col>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Col md={24} sm={24} xs={24} style={colStyle}>
              <InputNonForm
                labelField='Nama Posisi'
                disabled={true}
                name='Posisition'
                id='Posisition'
                value={NamaPosition}
              // onChange={handleStateModalDetail}
              />
            </Col>
          </Col>
        </Row>
        <Row style={rowStyle} justify='start'>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Col md={24} sm={24} xs={24} style={colStyle}>
              <InputNonForm
                labelField='Dept/Div'
                disabled={true}
                name='Dept'
                id='Dept'
                value={Department}
              // onChange={handleStateModalDetail}
              />
            </Col>
          </Col>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Col md={24} sm={24} xs={24} style={colStyle}>
              <Select
                labelField="Company"
                name="interviewCompanyId"
                id="interviewCompanyId"
                disabled={title !== 'INTERVIEW MT'}
                // formItemLayout={formItemLayout}
                getFieldDecorator={getFieldDecorator}
                Form={Form}
                // onSubmit={onSubmit}
                initialValue={interviewCompanyId}
                onChange={(e) => handleChangeDetailModal('interviewCompanyId', e)}
                data={RecruitmentPhase.source.Branch}
                validation={
                  [
                    {
                      required: false,
                      message: "Please enter the Company"
                    }
                  ]
                }
              />
            </Col>
          </Col>
        </Row>

        <Row style={rowStyle} justify='start'>
          <Col md={24} sm={24} xs={24} style={{ paddingRight: '4%' }}>
            <Button type='primary' disabled={title !== 'INTERVIEW MT' || isHired} onClick={() => addDataInterview()}>
              Add Company
            </Button>
          </Col>
        </Row>

        <Row style={rowStyle} justify='start'>
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Table
              style={{ marginTop: '30px' }}
              columns={
                title !== 'INTERVIEW MT'
                  ? columns
                  : columnsNonMT
              }
              dataSource={RecruitmentPhase.dataCompanyList}
              pagination={false}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    // this.handleTableClick(record);
                  },
                };
              }}
            />
          </Col>
        </Row>

        <Row style={rowStyle} justify='start'>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Col md={24} sm={24} xs={24} style={colStyle}>
              <Button
                style={{ marginTop: '2rem' }}
                onClick={() => {
                  this.handleChangeStep(1)
                  let changeStep = {
                    step: 1,
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
          onSubmit={() => this.onSubmit(this.state.id)}
          id={this.state.id}
          text={"Do you want to delete this interview's company ?"}
          title={"Delete Interview's Company"}
          handleState={handleStateSubProperty}
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

const WrappedForm = Form.create()(Step2);

export default connect(mapStateToProps, {
  ...actions,
  ...actions_auth,
})(WrappedForm);
