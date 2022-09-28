import React, { Component } from 'react';
import {
  Col,
  Row,
  DatePicker,
  Divider,
  Icon,
  Upload,
  Button,
} from 'antd';
import InputNonForm from '../../../../CustomComponentAntd/customInputNonForm';
import TextArea from '../../../../CustomComponentAntd/customTextArea';
import moment from 'moment';
import Select from '../../../../CustomComponentAntd/customSelect';
import { connect } from 'react-redux';
import * as actions from '../../../../../redux/RecruitmentPhase/action';
import actions_auth from '../../../../../redux/auth/actions';
import Form from '../../../../uielements/form'
import { messages } from "../../../../messageBox"
class Step4 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      onSubmit: false
    }
  }

  componentWillUnmount() {
    const { handleChangeDetailModal } = this.props
    handleChangeDetailModal('interviewer', '')
    handleChangeDetailModal("interviewDate", '')
  }

  onUpload = (e) => {
    const { handleState, handleChangeDetailModal } = this.props
    if (e.size < 2097152) {
      var craeteUrl = URL.createObjectURL(e);
      // handleState('photoUrl', craeteUrl)
      // handleState('photo', e)
      handleChangeDetailModal('uploadFile', e)
      handleChangeDetailModal('uploadFileName', e.name)
      // handleChangeDetailModal('uploadFile', e)
    } else {
      messages("Warning", "Image must smaller than 2MB!!", "warning", false)
    }
  }

  onSubmitAllForm = (e) => {
    const {submitUploadResult} = this.props
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        submitUploadResult()
      }else{
        this.setState({
          onSubmit: !this.state.onSubmit
        })
      }
    })
  }
  
  render() {
    const { sourceTable, RecruitmentPhase, handleStatePosisi, handleChangeDetailModal, submitUploadResult, handleStateGlobal, title, initFotmViewInterviewResult, isHired } = this.props;
    const { NamaCalon, NamaPosition, Department, interviewCompanyId, interviewDate, interviewer, interviewerJobPosition, kesimpulan, golonganApl,
      golonganNum, kompetensiTeknikalInter, kompetensiNonTeknikalInter, kompetensiTeknikalArea, kompetensiNonTeknikalArea, notes, company } = RecruitmentPhase.modal.Interview;
    const { getFieldDecorator } = this.props.form

    const { onSubmit } = this.state
    const colStyle = {
      marginBottom: '-15px',
    };
    const rowStyle = {
      marginTop: '30px',
      width: '100%',
      display: 'flex',
      flexFlow: 'row wrap',
    };
    const formItemLayoutText = {
      labelCol: { span: 8 },
      wrapperCol: { span: 23 }
  };

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
          ADD INTERVIEW RESULT
        </div>

        <Form onSubmit={(e) => this.onSubmitAllForm(e)}>
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
                  labelField='Company'
                  disabled={true}
                  name='company'
                  id='company'
                  getFieldDecorator={getFieldDecorator}
                  Form={Form}
                  value={company}
                // onChange={handleStateModalDetail}
                />
              </Col>
            </Col>
          </Row>
          <Row style={rowStyle} justify='start'>
            <Col md={12} sm={12} xs={24} style={colStyle}>
              <Col md={24} sm={24} xs={24} style={colStyle}>
                <InputNonForm
                  labelField='Nama Posisi'
                  disabled={true}
                  name='position'
                  id='position'
                  value={NamaPosition}
                // onChange={handleStateModalDetail}
                />
              </Col>
            </Col>
            <Col md={12} sm={12} xs={24} style={colStyle}>
              <Col md={24} sm={24} xs={24} style={colStyle}>
                <InputNonForm
                  labelField='Interviewer'
                  disabled={true}
                  name='interviewer'
                  id='interviewer'
                  value={interviewer}
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
                  name='dept'
                  id='dept'
                  value={Department}
                // onChange={handleStateModalDetail}
                />
              </Col>
            </Col>
            <Col md={12} sm={12} xs={24} style={colStyle}>
              <Col md={24} sm={24} xs={24} style={colStyle}>
                <h5>Tgl Wawancara</h5>
                <DatePicker
                  labelField='Tgl Wawancara'
                  disabled={true}
                  name='tanggal'
                  id='tanggal'
                  className='modal-datepicker'
                  value={moment(interviewDate)}
                // onChange={handleStateModalDetail}
                />
              </Col>
            </Col>
          </Row>

          <Row style={rowStyle} justify='start' className='text-center'>
            <Col
              md={24}
              sm={24}
              xs={24}
              style={{ marginTop: '1.8rem' }}>
              <Divider>Hasil Interview</Divider>
            </Col>
          </Row>
          <Row style={rowStyle} justify='start' className='text-center'>
            <Col md={24} sm={24} xs={24}>
              <Upload accept=".pdf" showUploadList={false} beforeUpload={this.onUpload} multiple={false}>
                <Button type="primary"><Icon type="upload" />Upload Interview Form</Button>
              </Upload>
              <span style={{ margin: '10px' }}>{RecruitmentPhase.modal.Interview.uploadFileName === undefined ? '' : RecruitmentPhase.modal.Interview.uploadFileName}</span>
            </Col>
          </Row>
          <Row style={rowStyle} justify='start' className='text-center'>
            <Col md={24} sm={24} xs={24}>
              <h2>Form Penilaian Interview</h2>
            </Col>
          </Row>
          <Row style={rowStyle} justify='start' className='text-center'>
            <Col md={12} sm={12} xs={24} style={colStyle}>
              <Col md={24} sm={24} xs={24} style={colStyle}>
                <div style={{ width: '95%' }}>
                  <TextArea
                      labelField="Kompetensi Teknikal"
                      name="kompetensiTeknikalInter"
                      id="kompetensiTeknikalInter"
                      initialValue={kompetensiTeknikalInter}
                      formItemLayout={formItemLayoutText}
                      getFieldDecorator={getFieldDecorator}
                      Form={Form}
                      value={kompetensiTeknikalInter}
                      onChange={(e) => handleChangeDetailModal('kompetensiTeknikalInter', e.target.value)}
                      onSubmit={this.state.onSubmit}
                      minRows={10}
                      maxRows={15}
                      isRequired={true}
                      validation={
                          [
                              {
                                required: true,
                                message: "Please enter the Kompetensi Teknikal"
                              }
                          ]
                      }
                  />
                </div>
              </Col>
            </Col>
            <Col md={12} sm={12} xs={24} style={colStyle}>
              <Col md={24} sm={24} xs={24} style={colStyle}>
                <div style={{ width: '95%' }}>
                  <TextArea
                      labelField="Kompetensi Non Teknikal"
                      name="kompetensiNonTeknikalInter"
                      id="kompetensiNonTeknikalInter"
                      initialValue={kompetensiNonTeknikalInter}
                      formItemLayout={formItemLayoutText}
                      getFieldDecorator={getFieldDecorator}
                      Form={Form}
                      value={kompetensiNonTeknikalInter}
                      onChange={(e) => handleChangeDetailModal('kompetensiNonTeknikalInter', e.target.value)}
                      onSubmit={this.state.onSubmit}
                      minRows={10}
                      maxRows={15}
                      isRequired={true}
                      validation={
                          [
                              {
                                required: true,
                                message: "Please enter the Kompetensi Non Teknikal"
                              }
                          ]
                      }
                  />
                </div>
              </Col>
            </Col>
          </Row>
          <Row style={rowStyle} justify='start' className='text-center'>
            <Col md={24} sm={24} xs={24}>
              <h2 style={{ marginTop: '2rem' }}>Area Pengembangan</h2>
            </Col>
          </Row>
          <Row style={rowStyle} justify='start' className='text-center'>
            <Col md={12} sm={12} xs={24} style={colStyle}>
              <Col md={24} sm={24} xs={24} style={colStyle}>
                <div style={{ width: '95%' }}>
                  <TextArea
                      labelField="Kompetensi Teknikal"
                      name="kompetensiTeknikalArea"
                      id="kompetensiTeknikalArea"
                      initialValue={kompetensiTeknikalArea}
                      formItemLayout={formItemLayoutText}
                      getFieldDecorator={getFieldDecorator}
                      Form={Form}
                      value={kompetensiTeknikalArea}
                      onChange={(e) => handleChangeDetailModal('kompetensiTeknikalArea', e.target.value)}
                      onSubmit={this.state.onSubmit}
                      minRows={10}
                      maxRows={15}
                      isRequired={true}
                      validation={
                          [
                              {
                                required: true,
                                message: "Please enter the Kompetensi Teknikal"
                              }
                          ]
                      }
                  />
                </div>
              </Col>
            </Col>
            <Col md={12} sm={12} xs={24} style={colStyle}>
              <Col md={24} sm={24} xs={24} style={colStyle}>
                <div style={{ width: '95%' }}>
                  <TextArea
                      labelField="Kompetensi Non Teknikal"
                      name="kompetensiNonTeknikalArea"
                      id="kompetensiNonTeknikalArea"
                      initialValue={kompetensiNonTeknikalArea}
                      formItemLayout={formItemLayoutText}
                      getFieldDecorator={getFieldDecorator}
                      Form={Form}
                      value={kompetensiNonTeknikalArea}
                      onChange={(e) => handleChangeDetailModal('kompetensiNonTeknikalArea', e.target.value)}
                      onSubmit={this.state.onSubmit}
                      minRows={10}
                      maxRows={15}
                      isRequired={true}
                      validation={
                          [
                              {
                                required: true,
                                message: "Please enter the Kompetensi Non Teknikal"
                              }
                          ]
                      }
                  />
                </div>
              </Col>
            </Col>
          </Row>
          <Row
            style={rowStyle}
            justify='center'
            className='text-center'>
            <Col md={24} sm={24} xs={24} style={colStyle}>
              <Col md={24} sm={24} xs={24} style={colStyle}>
                <div style={{ width: '100%' }}>
                  <TextArea
                      labelField="Catatan"
                      name="notes"
                      id="notes"
                      initialValue={notes}
                      formItemLayout={formItemLayoutText}
                      getFieldDecorator={getFieldDecorator}
                      Form={Form}
                      value={notes}
                      onChange={(e) => handleChangeDetailModal('notes', e.target.value)}
                      onSubmit={this.state.onSubmit}
                      minRows={10}
                      maxRows={15}
                      isRequired={true}
                      validation={
                          [
                              {
                                required: true,
                                message: "Please enter the Catatan"
                              }
                          ]
                      }
                  />
                </div>
              </Col>
            </Col>
          </Row>
          <Row
            style={rowStyle}
            justify='start'
            className='text-center mt-2'>
            <Col md={18} sm={18} xs={24} style={colStyle}>
              <Col md={24} sm={24} xs={24} style={colStyle}>
                <Select
                  labelField="Kesimpulan"
                  name="kesimpulam"
                  id="kesimpulan"
                  disabled={false}
                  getFieldDecorator={getFieldDecorator}
                  Form={Form}
                  initialValue={kesimpulan}
                  onChange={(e) => {
                    if (e !== "Disarankan") {
                      handleChangeDetailModal('golonganNum', '')
                      handleChangeDetailModal('golonganApl', '')
                    }
                    handleChangeDetailModal('kesimpulan', e)
                  }}
                  data={[{ id: 'Disarankan', name: 'Disarankan' }, { id: 'Dipertimbangkan', name: 'Dipertimbangkan' }, { id: 'Tidak Disarankan', name: 'Tidak Disarankan' }]}
                  isRequired={true}
                  validation={
                    [
                      {
                        required: true,
                        message: "Please enter the Kesimpulan"
                      }
                    ]
                  }
                />
              </Col>
            </Col>
            <Col md={2} sm={2} xs={24} style={colStyle}>
              <Col md={24} sm={24} xs={24} style={colStyle}>
                <Select
                  labelField="Golongan"
                  name="golonganNum"
                  id="golonganNum"
                  disabled={kesimpulan !== "Disarankan"}
                  getFieldDecorator={getFieldDecorator}
                  Form={Form}
                  initialValue={golonganNum}
                  onChange={(e) => handleChangeDetailModal('golonganNum', e)}
                  data={[{ id: 1, name: '1' }, { id: 2, name: '2' }, { id: 3, name: '3' }, { id: 4, name: '4' }, { id: 5, name: '5' }, { id: 6, name: '6' }, { id: 7, name: '7' }]}
                  isRequired={true}
                  allowClear={true}
                  validation={
                    [
                      {
                        required: kesimpulan !== "Disarankan" ? false : true,
                        message: "Please enter the Golongan"
                      }
                    ]
                  }
                />
              </Col>
            </Col>
            <Col offset={1} md={2} sm={2} xs={24} style={colStyle}>
              <Col md={24} sm={24} xs={24} style={colStyle}>
                <Select
                  labelField="Sub Gol"
                  name="golonganApl"
                  id="golonganApl"
                  disabled={kesimpulan !== "Disarankan"}
                  getFieldDecorator={getFieldDecorator}
                  Form={Form}
                  initialValue={golonganApl}
                  onChange={(e) => handleChangeDetailModal('golonganApl', e)}
                  data={[{ id: 'A', name: 'A' }, { id: "B", name: 'B' }, { id: "C", name: 'C' }, { id: "D", name: 'D' }, { id: "E", name: 'E' }, { id: "F", name: 'F' }]}
                  allowClear={true}
                  // validation={
                  //   [
                  //     {
                  //       required: kesimpulan !== "Disarankan" ? false : true,
                  //       message: "Please enter the Golongan"
                  //     }
                  //   ]
                  // }
                />
              </Col>
            </Col>
          </Row>

          <Row
            style={rowStyle}
            justify='start'
            className='text-center mt-2'>
            <Button disabled={isHired} htmlType="submit" type="primary">
              Save Interview Result
            </Button>
          </Row>

          <Row style={rowStyle} justify='start'>
            <Col md={12} sm={12} xs={24} style={colStyle}>
              <Col md={24} sm={24} xs={24} style={colStyle}>
                <Button
                  style={{ marginTop: '2rem' }}
                  onClick={() => {
                    handleStatePosisi(3)
                    let changeStep = {
                      step: 3,
                      interviewType: title,
                    }
                    handleStateGlobal('interviewType', changeStep);
                    initFotmViewInterviewResult()
                  }}>
                  <Icon type='left' />
                  Previous Page
                </Button>
              </Col>
            </Col>
          </Row>
        </Form>

      </React.Fragment>
    );
  }
}


const mapStateToProps = (state) => ({
  RecruitmentPhase: state.RecruitmentPhase,
  Auth: state.Auth,
  userRole: state.Auth.roleName,
});

const WrappedForm = Form.create()(Step4);

export default connect(mapStateToProps, {
  ...actions,
  ...actions_auth,
})(WrappedForm);
