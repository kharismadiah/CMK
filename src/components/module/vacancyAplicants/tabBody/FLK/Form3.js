import React, { Component } from 'react';
import { Col, Row, Icon, Checkbox, Radio, Table } from 'antd';

import Form from '../../../../uielements/form';
import Input from '../../../../CustomComponentAntd/customInput';
import Button, { ButtonGroup } from '../../../../uielements/button';
import Select from '../../../../CustomComponentAntd/customSelect';
import InputNonForm from '../../../../CustomComponentAntd/customInputNonForm';
import Datepicker from '../../../../CustomComponentAntd/customDatePicker';
import DatepickerMode from '../../../../CustomComponentAntd/customDatePickerMode';
import { deleteData, messages, messagesConfirm, MessageWarning } from "../../../../../components/messageBox"
import 'sweetalert2/dist/sweetalert2.min.css'
import { Cookie } from '../../../../../service/header';
import moment from 'moment'

class Form3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onSubmit: false,

      structure: '',
      dateOfBirth: '',
      name: '',
      education: '',
      gender: 'Male',
      occupation2: '',

      hobbies: '',
      applied: 2,
      position: '',
      dateApplied: '',
      dateAvailable: '',
      termAndCondition: false,

      aggree: false,

      activityPriority1: false,
      activityPriority2: false,
      activityPriority3: false,
      activityPriority4: false,
      activityPriority5: false,
      activityPriority6: false,
      jobPriority1: false,
      jobPriority2: false,
      jobPriority3: false,
      jobPriority4: false,
      jobPriority5: false,
      jobPriority6: false,
      jobPriority7: false,
      jobPriority8: false,
      jobPriority9: false,
      jobPriority10: false,
      jobPriority11: false,
      jobPriority12: false,
      jobPriority13: false,
      jobPriority14: false,

      PsychotestExperienceId: 0,
      PsychotestId: 0,
      isEditPsychotest: false,
      psychotestDate: '',
      psychotestOrganizer: '',
      psychotestPurpose: '',
      typingTimeout: 0,
    }
  }

  componentDidMount(){
    window.scrollTo(0, 0)
  }

  handleSetData = (property, value) => {
    this.setState({
      onSubmit: !this.state.onSubmit,
      [property]: value,
    });
    this.props.form.setFieldsValue({
      [property]: value,
    })
  };

  handleTableActivityPriority = (property, value) => {
    const { handleState, data, source } = this.props
    let length = data.tableActivityPriority.length

    const hanldeStateLocal = () => {
      this.setState({ onSubmit: !this.state.onSubmit, });
      this.props.form.setFieldsValue({ [property]: value, })
      handleState(property, { ...data[property], value })
    }
    if (value) {
      if (length < 3) {
        //push array ke table
        hanldeStateLocal()
        let dataParam = {
          ActivityId: '',
          ActivityText: source.dataActivityPriority.find(x => x.activity === property).activityName
        }
        data.tableActivityPriority.push(dataParam)
        handleState('tableActivityPriority', data.tableActivityPriority)
      } else {
        messages("Info", "Urutkan 3 yang utama", "info", false);
      }
    } else {
      //delete arrray dari table
      hanldeStateLocal()
      let valueKegiatan = source.dataActivityPriority.find(x => x.activity === property).activityName
      let unsetData = data.tableActivityPriority.filter(x => x.ActivityText !== valueKegiatan)
      handleState('tableActivityPriority', unsetData)
    }
  }

  resetActivities = () => {
    const { resetActivityPriority } = this.props
    resetActivityPriority()
    this.setState({ onSubmit: !this.state.onSubmit });
  }

  handleTableJob = (property, value) => {
    const { handleState, data, source } = this.props
    let length = data.tableActivityPriorityJob.length

    const hanldeStateLocal = () => {
      this.setState({ onSubmit: !this.state.onSubmit });
      this.props.form.setFieldsValue({ [property]: value })
      handleState(property, { ...data[property], value })
    }
    if (value) {
      if (length < 3) {
        //push array ke table
        if (property === 'jobPriority14') {
          hanldeStateLocal()
          let dataParam = {
            JobPriorityId: '',
            JobPriorityText: 'Lainnya',
            JobPriorityOther: ''
          }
          data.tableActivityPriorityJob.push(dataParam)
          handleState('tableActivityPriorityJob', data.tableActivityPriorityJob)
        } else {
          hanldeStateLocal()
          let dataParam = {
            JobPriorityId: '',
            JobPriorityText: source.dataJobPriority.find(x => x.job === property).jobName,
            JobPriorityOther: ''
          }
          data.tableActivityPriorityJob.push(dataParam)
          handleState('tableActivityPriorityJob', data.tableActivityPriorityJob)
        }
      } else {
        messages("Info", "Urutkan 3 yang utama", "info", false);
      }
    } else {
      //delete array dari table
      hanldeStateLocal()
      if (property === 'jobPriority14') {
        handleState('jobPriorityOthers', '')
        let unsetData = data.tableActivityPriorityJob.filter(x => x.JobPriorityText !== "Lainnya")
        handleState('tableActivityPriorityJob', unsetData)
      }
      else{
        let valueJob = source.dataJobPriority.find(x => x.job === property).jobName
        let unsetData = data.tableActivityPriorityJob.filter(x => x.JobPriorityText !== valueJob)
        handleState('tableActivityPriorityJob', unsetData)
      }
    }
  }

  resetJob = () => {
    const { resetJobPriority } = this.props
    resetJobPriority()
    this.setState({ onSubmit: !this.state.onSubmit });
  }

  onSubmitFlk = () => {
    const { fetchSubmitFLK, isDetails, data } = this.props
    this.props.form.validateFieldsAndScroll([
      'salary',
      'dateAvailable'
    ], (err, values) => {
      if (!err) {
        let hobby = [data.hobby1.value, data.hobby2.value, data.hobby3.value, data.hobby4.value, data.hobby5.value, data.hobby6.value, data.hobby7.value, data.hobby8.value, data.hobby9.value, data.hobby10.value]
        let cekHobby = hobby.find(element => element == true);
        let social = [data.socialActivity1.value, data.socialActivity2.value, data.socialActivity3.value, data.socialActivity4.value, data.socialActivity5.value,
        data.socialActivity6.value, data.socialActivity7.value, data.socialActivity8.value, data.socialActivity9.value, data.socialActivity10.value]
        let cekSocial = social.find(element => element == true);
        let cekJobPriority = data.jobPriority14.value && data.jobPriorityOthers === ""
        if (cekHobby === undefined) {
          MessageWarning("Silakan memilih Hobby")
        } else if (cekSocial === undefined) {
          MessageWarning("Silakan memilih Aktivitas Sosial ")
        } else if (data.tableActivityPriority.length == 0) {
          MessageWarning("Silakan memilih Prioritas Kegiatan ")
        } else if (data.tableActivityPriorityJob.length == 0) {
          MessageWarning("Silakan memilih Prioritas Pekerjaan ")
        } else if(cekJobPriority){
          MessageWarning("Silakan melengkapi Prioritas Pekerjaan lainnya ")
        }
        else {
          let id = Cookie.getWithoutExpired('ahs_id')
          if (id !== null) {
            messagesConfirm(id, fetchSubmitFLK, isDetails, 'Simpan Data Personal', 
            'Data yang Anda berikan akan kami gunakan untuk tahapan proses rekrutmen berikutnya, pastikan seluruh data telah diisi dengan lengkap dan benar. Apakah Anda yakin ingin menyimpan Data Personal?', 'info')
            // deleteData(id, 'Apakah Anda yakin ingin menyimpan Data Personal? *Anda tidak dapat mengubah Data Personal yang telah Anda simpan sampai proses rekruitmen selesai dilakukan', fetchSubmitFLK, isDetails)
          } else {
            messages("Info", "Token Expired, Please Relogin", "info", false);
          }
        }
      }
      else {
        this.setState({ onSubmit: !this.state.onSubmit })
      }
    })
  }

  onAddPsychotest = (e) => {
    const { handleState, data } = this.props
    e.preventDefault();
    let _this = this
    this.props.form.validateFields([
      'psychotestDate',
      'psychotestOrganizer',
      'psychotestPurpose'
    ], (err, values) => {
      if (!err) {
        let dataParam = {
          PsychotestExperienceId: _this.state.PsychotestExperienceId,
          PsychotestId: _this.state.isEditPsychotest ? _this.state.PsychotestId : data.tablePsychotest.length + 1,
          psychotestDate: moment(_this.state.psychotestDate, 'MM/YYYY').format('MM/YYYY'),
          psychotestOrganizer: _this.state.psychotestOrganizer,
          psychotestPurpose: _this.state.psychotestPurpose,
        }
        let foundIdx
        if (_this.state.isEditPsychotest) {
          if (_this.state.PsychotestExperienceId === 0) {
            foundIdx = data.tablePsychotest.findIndex(x => x.PsychotestId === _this.state.PsychotestId)
          } else {
            foundIdx = data.tablePsychotest.findIndex(x => x.PsychotestExperienceId === _this.state.PsychotestExperienceId)
          }
          data.tablePsychotest[foundIdx] = dataParam
        } else {
          data.tablePsychotest.push(dataParam)
        }
        handleState('tablePsychotest', data.tablePsychotest)
        _this.setState({
          onSubmit: !_this.state.onSubmit,
          isEditPsychotest: false,
          PsychotestExperienceId: 0,
          PsychotestId: 0,
          psychotestDate: '',
          psychotestOrganizer: '',
          psychotestPurpose: '',
        })
        _this.props.form.resetFields()
      } else {
        _this.setState({ onSubmit: !_this.state.onSubmit })
      }
    })
  }

  onDeletePsychotest = (idx) => {
    const { handleState, data } = this.props
    data.tablePsychotest.splice(idx, 1)
    handleState('tablePsychotest', data.tablePsychotest)
  }

  onEditPsychotest = (idx) => {
    const { data } = this.props
    let _this = this
    _this.setState({
      onSubmit: !_this.state.onSubmit,
      isEditPsychotest: true,
      PsychotestExperienceId: data.tablePsychotest[idx].PsychotestExperienceId,
      PsychotestId: data.tablePsychotest[idx].PsychotestId,
      psychotestDate: moment(data.tablePsychotest[idx].psychotestDate, 'MM/YYYY'),
      psychotestOrganizer: data.tablePsychotest[idx].psychotestOrganizer,
      psychotestPurpose: data.tablePsychotest[idx].psychotestPurpose,
    })

    this.props.form.setFieldsValue({
      onSubmit: !_this.state.onSubmit,
      isEditPsychotest: true,
      PsychotestExperienceId: data.tablePsychotest[idx].PsychotestExperienceId,
      PsychotestId: data.tablePsychotest[idx].PsychotestId,
      psychotestDate: moment(data.tablePsychotest[idx].psychotestDate, 'MM/YYYY'),
      psychotestOrganizer: data.tablePsychotest[idx].psychotestOrganizer,
      psychotestPurpose: data.tablePsychotest[idx].psychotestPurpose,

    })
  }

  handleStateDate = (property, value) => {
    const { handleState } = this.props
    handleState(property, moment(value, 'DD/MM/YYYY'))
  }

  handleStateChecked = (property, value) => {
    const { handleState, data } = this.props
    handleState(property, { ...data[property], value })
  }

  render() {
    const { data, handleStatePosisi, source, handleState, isDetails = false } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { onSubmit } = this.state;
    const { innerWidth: width, innerHeight: height } = window;

    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 16 },
    };
    const formItemLayoutSelect = {
      labelCol: { span: 8 },
      wrapperCol: { span: 24 },
    };
    const formItemLayoutDate = {
      labelCol: { span: 8 },
      wrapperCol: { span: 22 },
    };

    const columnsActivitiesPriority = [
      {
        title: 'No Urut',
        dataIndex: 'NoUrut',
        width: '10%',
        render: (text, data, idx) => (
          <div>{idx + 1}</div>
        )
      },
      {
        title: 'Kegiatan',
        dataIndex: 'ActivityText',
        width: '90%',
      }
    ]

    const columnsJobPriority = [
      {
        title: 'No Urut',
        dataIndex: 'NoUrut',
        width: '10%',
        render: (text, data, idx) => (
          <div>{idx + 1}</div>
        )
      },
      {
        title: 'Pekerjaan',
        dataIndex: 'JobPriorityText',
        width: '90%',
        render: (text, data, idx) => (
          <div>{data.JobPriorityOther ? data.JobPriorityOther : data.JobPriorityText}</div>
        )
      }
    ]

    const columnsPsychotest = [
      {
        title: 'Action',
        dataIndex: 'action',
        render: (text, data, idx) => (
          <ButtonGroup>
            <Button
              disabled={isDetails} onClick={() => this.onEditPsychotest(idx)}>
              <Icon type="edit" style={{ fontSize: 20 }} />
            </Button>
            <Button
              disabled={isDetails} onClick={() => this.onDeletePsychotest(idx)}>
              <Icon type="delete" style={{ fontSize: 20 }} />
            </Button>
          </ButtonGroup>
        )
      },
      {
        title: 'Bulan/Tahun',
        dataIndex: 'psychotestDate',
      },
      {
        title: 'Penyelenggara',
        dataIndex: 'psychotestOrganizer',
      },
      {
        title: 'Tujuan',
        dataIndex: 'psychotestPurpose',
      },
    ]

    return (
      <div>
        <Row justify="start">
          <Col md={24} sm={24} xs={24} style={{ paddingTop: 40, paddingBottom: 20 }}>
            <div style={{ backgroundColor: '#bfbfbf', padding: 5 }}>
              <h3>E. HOBI & AKTIVITAS SOSIAL</h3>
            </div>
          </Col>
        </Row>

        <Row justify="start">
          <Col md={24} sm={24} xs={24}>
            <div style={{ paddingTop: 5, paddingBottom: 10 }}>
              <h4>01. Hobi (Pilih yang sesuai) <span style={{ color: "red" }}>*</span></h4>
            </div>
          </Col>
        </Row>

        <Row justify="start">
          <Col md={24} sm={24} xs={24}>
            <Col md={12} sm={12} xs={24}>
              <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                <Checkbox disabled={isDetails} checked={data.hobby1.value} name="hobby" onChange={(e) => this.handleStateChecked('hobby1', e.target.checked)}>Membaca Fiksi</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                <Checkbox disabled={isDetails} checked={data.hobby2.value} onChange={(e) => this.handleStateChecked('hobby2', e.target.checked)}>Membaca Non-Fiksi</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                <Checkbox disabled={isDetails} checked={data.hobby3.value} onChange={(e) => this.handleStateChecked('hobby3', e.target.checked)}>Membaca Koran/Artikel Berita</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24}>
                <Checkbox disabled={isDetails} checked={data.hobby4.value} onChange={(e) => this.handleStateChecked('hobby4', e.target.checked)}>
                  Kegiatan Investasi<br></br>
                  <span style={{ marginLeft: 25 }}>(Contoh: trading saham, komoditas, valas, dll.)</span>
                </Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24}>
                <Checkbox disabled={isDetails} checked={data.hobby5.value} onChange={(e) => this.handleStateChecked('hobby5', e.target.checked)}>
                  Menulis<br></br>
                  <span style={{ marginLeft: 25 }}>(Contoh: cerpen, buku, artikel. dll.)</span>
                </Checkbox>
              </Col>
            </Col>
            <Col md={12} sm={12} xs={24}>
              <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                <Checkbox disabled={isDetails} checked={data.hobby6.value} onChange={(e) => this.handleStateChecked('hobby6', e.target.checked)}>Menggambar/Melukis</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                <Checkbox disabled={isDetails} checked={data.hobby7.value} onChange={(e) => this.handleStateChecked('hobby7', e.target.checked)}>Bermain Musik</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                <Checkbox disabled={isDetails} checked={data.hobby8.value} onChange={(e) => this.handleStateChecked('hobby8', e.target.checked)}>Bernyanyi</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24}>
                <Checkbox disabled={isDetails} checked={data.hobby9.value} onChange={(e) => this.handleStateChecked('hobby9', e.target.checked)}>
                  Olahraga Kompetitif<br></br>
                  <span style={{ marginLeft: 25 }}>(Fokus untuk memang, contoh: sepakbola, bulu tangkis, basket, catur, dll.)</span>
                </Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24}>
                <Checkbox disabled={isDetails} checked={data.hobby10.value} onChange={(e) => this.handleStateChecked('hobby10', e.target.checked)}>
                  Olahraga Non-Kompetitif<br></br>
                  <span style={{ marginLeft: 25 }}>(Fokus kesenangan/kebugaran/pengingkatan kesehatan, contoh: yoga, jogging, pilates, aerobik, dll.)</span>
                </Checkbox>
              </Col>
            </Col>
          </Col>
        </Row>

        <Row justify="start">
          <Col md={24} sm={24} xs={24}>
            <div style={{ paddingTop: 5, paddingBottom: 10 }}>
              <h4>02. Aktivitas Sosial <span style={{ color: "red" }}>*</span></h4>
            </div>
          </Col>
          <Col md={24} sm={24} xs={24}>
            <div style={{ paddingTop: 5, paddingBottom: 10 }}>
              <h4>Aktivitas yang rutin dilakukan</h4>
            </div>
          </Col>
        </Row>

        <Row justify="start">
          <Col md={24} sm={24} xs={24}>
            <Col md={12} sm={12} xs={24}>
              <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                <Checkbox disabled={isDetails} checked={data.socialActivity1.value} onChange={(e) => this.handleStateChecked('socialActivity1', e.target.checked)}>Menghadiri komunikasi sosial</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                <Checkbox disabled={isDetails} checked={data.socialActivity2.value} onChange={(e) => this.handleStateChecked('socialActivity2', e.target.checked)}>Menghadiri komunitas yang berkaitan dengan hobi (klub)</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                <Checkbox disabled={isDetails} checked={data.socialActivity3.value} onChange={(e) => this.handleStateChecked('socialActivity3', e.target.checked)}>Mengikuti aktivitas sukarela (voulenteering)</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                <Checkbox disabled={isDetails} checked={data.socialActivity4.value} onChange={(e) => this.handleStateChecked('socialActivity4', e.target.checked)}>Mengunjungi museum / pameran / pertunjukan</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                <Checkbox disabled={isDetails} checked={data.socialActivity5.value} onChange={(e) => this.handleStateChecked('socialActivity5', e.target.checked)}>Melakukan aktivitas rekreasional (contoh: berbelanja, travelling, dll.)</Checkbox>
              </Col>
            </Col>
            <Col md={12} sm={12} xs={24}>
              <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                <Checkbox disabled={isDetails} checked={data.socialActivity6.value} onChange={(e) => this.handleStateChecked('socialActivity6', e.target.checked)}>Arisan dengan teman / kenalan</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                <Checkbox disabled={isDetails} checked={data.socialActivity7.value} onChange={(e) => this.handleStateChecked('socialActivity7', e.target.checked)}>Menongkrong dengan teman / kenalan</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                <Checkbox disabled={isDetails} checked={data.socialActivity8.value} onChange={(e) => this.handleStateChecked('socialActivity8', e.target.checked)}>Mengikuti kegiatan keagamaan</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                <Checkbox disabled={isDetails} checked={data.socialActivity9.value} onChange={(e) => this.handleStateChecked('socialActivity9', e.target.checked)}>Menghadiri pesta</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                <Checkbox disabled={isDetails} checked={data.socialActivity10.value} onChange={(e) => this.handleStateChecked('socialActivity10', e.target.checked)}>
                  Lainnya
                  <InputNonForm
                    disabled={!data.socialActivity10.value || isDetails}
                    name="socialActivityOthers"
                    id="socialActivityOthers"
                    value={data.socialActivityOthers}
                    onChange={handleState}
                  />
                </Checkbox>
              </Col>
            </Col>
          </Col>
        </Row>

        <Row justify="start">
          <Col md={24} sm={24} xs={24} style={{ paddingTop: 40, paddingBottom: 20 }}>
            <div style={{ backgroundColor: '#bfbfbf', padding: 5 }}>
              <h3>F. Minat Kerja</h3>
            </div>
          </Col>
        </Row>

        <Row justify="start">
          <Col md={24} sm={24} xs={24}>
            <Col md={8} sm={8} xs={24}>
              <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                <h4>01. Sebutkan gaji yang Saudara harapkan <span style={{ color: "red" }}>*</span></h4>
              </div>
            </Col>
            <Col md={8} sm={8} xs={24}>
              <Select
                disabled={isDetails}
                name='salary'
                id='salary'
                formItemLayout={formItemLayoutSelect}
                getFieldDecorator={getFieldDecorator}
                Form={Form}
                onSubmit={onSubmit}
                initialValue={data.salary}
                onChange={(e) => handleState("salary", e)}
                data={source.Salary}
                width={width<576 ? '100%' : '91%'}
                validation={
                  [
                    {
                      required: true,
                      message: "Please enter the Salary"
                    }
                  ]
                }
              />
            </Col>
          </Col>
        </Row>
        <Row justify="start">
          <Col md={24} sm={24} xs={24}>
            <Col md={8} sm={8} xs={24}>
              <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                <h4>02. Kapan Saudara dapat mulai bekerja  <span style={{ color: "red" }}>*</span></h4>
              </div>
            </Col>
            <Col md={8} sm={8} xs={24}>
              <Datepicker
                disabled={isDetails}
                name='dateAvailable'
                id='dateAvailable'
                initialValue={data.dateAvailable}
                formItemLayout={formItemLayoutDate}
                getFieldDecorator={getFieldDecorator}
                Form={Form}
                onSubmit={onSubmit}
                format={'DD/MM/YYYY'}
                onChange={(e, value) => this.handleStateDate('dateAvailable', value)}
                validation={
                  [
                    {
                      required: true,
                      message: "Please enter the date available"
                    }
                  ]
                }
              />
            </Col>
          </Col>
        </Row>

        <Row justify="start">
          <Col md={24} sm={24} xs={24}>
            <Col md={8} sm={8} xs={24}>
              <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                <h4>03. Kesediaan ditempatkan di luar DKI Jakarta <span style={{ color: "red" }}>*</span></h4>
              </div>
            </Col>
            <Col md={8} sm={8} xs={24}>
              <Radio.Group
                disabled={isDetails}
                style={{ marginTop: 10 }}
                onChange={(e) => handleState('placementAvailibility', e.target.value)}
                value={data.placementAvailibility}
              >
                <Radio value="Tidak Bersedia">Tidak Bersedia</Radio>
                <Radio value="Bersedia">Bersedia</Radio>
              </Radio.Group>
            </Col>
          </Col>
        </Row>

        {
          data.placementAvailibility === "Bersedia" ?
            <Row justify="start">
              <Col md={24} sm={24} xs={24} >
                <Col md={8} sm={8} xs={24} style={{ paddingTop: 5, paddingBottom: 10 }}></Col>
                <Col md={16} sm={24} xs={24}>
                  <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                      <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                        <h4>Jika bersedia, pilih lokasi yang Saudara sukai (boleh lebih dari 1)</h4>
                      </div>
                    </Col>
                  </Row>
                  <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                      <Col md={12} sm={24} xs={24}>
                        <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                          <Checkbox disabled={isDetails} checked={data.city1.value} onChange={(e) => this.handleStateChecked('city1', e.target.checked)}>Depok, Tangerang, Bekasi, Bogor</Checkbox>
                        </Col>
                        <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                          <Checkbox disabled={isDetails} checked={data.city2.value} onChange={(e) => this.handleStateChecked('city2', e.target.checked)}>Pulau Jawa (Non-Jabodetabek)</Checkbox>
                        </Col>
                        <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                          <Checkbox disabled={isDetails} checked={data.city3.value} onChange={(e) => this.handleStateChecked('city3', e.target.checked)}>Pulau Sumatera</Checkbox>
                        </Col>
                        <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                          <Checkbox disabled={isDetails} checked={data.city4.value} onChange={(e) => this.handleStateChecked('city4', e.target.checked)}>Pulau Kalimantan</Checkbox>
                        </Col>
                      </Col>
                      <Col md={12} sm={24} xs={24}>
                        <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                          <Checkbox disabled={isDetails} checked={data.city5.value} onChange={(e) => this.handleStateChecked('city5', e.target.checked)}>Pulau Sulawesi</Checkbox>
                        </Col>
                        <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                          <Checkbox disabled={isDetails} checked={data.city6.value} onChange={(e) => this.handleStateChecked('city6', e.target.checked)}>Pulau Bali & Nusa Tenggara</Checkbox>
                        </Col>
                        <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                          <Checkbox disabled={isDetails} checked={data.city7.value} onChange={(e) => this.handleStateChecked('city7', e.target.checked)}>Papua & Kepulauan Maluku</Checkbox>
                        </Col>
                      </Col>
                    </Col>
                  </Row>
                </Col>
              </Col>
            </Row>
            : null
        }

        <Row justify="start">
          <Col md={24} sm={24} xs={24} style={{marginTop: '25px'}}>
            <Col md={24} sm={24} xs={24}>
              <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                <h4>04. Prioritas kegiatan yang Saudara suka (Urutkan 3 yang utama)<span style={{ color: "red" }}>*</span></h4>
                <h5>** Pilihan pertama Anda akan menjadi urutan pertama</h5>
              </div>
            </Col>
            <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
              <Checkbox disabled={isDetails} checked={data.activityPriority1.value} onChange={(e) => this.handleTableActivityPriority('activityPriority1', e.target.checked)}>
                Kegiatan mengerjakan sesuatu dengan tangan atau alat-alat mekanis secara terampil, seperti kegiatan yang memanfaatkan keterampilan tangan (menjahit, menenun, membuat kue, dll.), bidang mekanik, pertanian, listrik, serta teknik
              </Checkbox>
            </Col>
            <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
              <Checkbox disabled={isDetails} checked={data.activityPriority2.value} onChange={(e) => this.handleTableActivityPriority('activityPriority2', e.target.checked)}>
                Kegiatan yang melibatkan pengamatan terhadap gejalan fisik, biologis, serta budaya, seperti penelitian dan segala hal yang berbau ilmiah
              </Checkbox>
            </Col>
            <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
              <Checkbox disabled={isDetails} checked={data.activityPriority3.value} onChange={(e) => this.handleTableActivityPriority('activityPriority3', e.target.checked)}>
                Kegiatan yang memanfaatkan kreativitas dan imajinasi untuk menciptakan bentuk atau produk seni, seperti pekerja seni (seniman)
              </Checkbox>
            </Col>
            <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
              <Checkbox disabled={isDetails} checked={data.activityPriority4.value} onChange={(e) => this.handleTableActivityPriority('activityPriority4', e.target.checked)}>
                Kegiatan menginformasikan, melatih, mengembangkan, menyembuhkan, atau mencerahkan orang lain, seperti membantu atau mengajar orang lain (melayani orang lain)
              </Checkbox>
            </Col>
            <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
              <Checkbox disabled={isDetails} checked={data.activityPriority5.value} onChange={(e) => this.handleTableActivityPriority('activityPriority5', e.target.checked)}>
                Kegiatan yang menuntut kemampuan untuk memepengaruhi orang lain dalam rangka mencapai tujuan organisasi atau mendapatkan manfaat ekonomis, seperti menjual atau mengelola orang lain
              </Checkbox>
            </Col>
            <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
              <Checkbox disabled={isDetails} checked={data.activityPriority6.value} onChange={(e) => this.handleTableActivityPriority('activityPriority6', e.target.checked)}>
                Kegiatan yang melibatkan pemanfaatan data yang konkret, teratur, dan sistematis, seperti pencatatan, perhitungan, sistem bisnis, serta klerikal
              </Checkbox>
            </Col>
          </Col>
        </Row>

        <Row justify='start'>
          <Col md={24} sm={24} xs={24} style={{ marginTop: 20, marginBottom: 20 }}>
            <Table
              columns={columnsActivitiesPriority}
              dataSource={data.tableActivityPriority}
              pagination={false}
              scroll={{x: 1000}}
            />
          </Col>
          <Col md={24} sm={24} xs={24} style={{ marginTop: 20 }}>
            <Button disabled={isDetails} type='primary' onClick={this.resetActivities.bind(this)} style={{ float: 'right' }}>
              Atur Ulang
            </Button>
          </Col>
        </Row>

        <Row justify="start">
          <Col md={24} sm={24} xs={24} style={{marginTop: '25px'}}>
            <Col md={24} sm={24} xs={24}>
              <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                <h4>05. Prioritas jenis pekerjaan yang Saudara suka (Urutkan 3 yang utama)<span style={{ color: "red" }}>*</span></h4>
                <h5>** Pilihan pertama Anda akan menjadi urutan pertama</h5>
              </div>
            </Col>
            <Col md={24} sm={24} xs={24}>
              <Col md={8} sm={24} xs={24}>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={isDetails} checked={data.jobPriority1.value} onChange={(e) => this.handleTableJob('jobPriority1', e.target.checked)}>
                    Coorporate Communication
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={isDetails} checked={data.jobPriority2.value} onChange={(e) => this.handleTableJob('jobPriority2', e.target.checked)}>
                    Finance, Accounting, Tax
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={isDetails} checked={data.jobPriority3.value} onChange={(e) => this.handleTableJob('jobPriority3', e.target.checked)}>
                    Human Capital (HC)
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={isDetails} checked={data.jobPriority4.value} onChange={(e) => this.handleTableJob('jobPriority4', e.target.checked)}>
                    Information Technology (IT)
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={isDetails} checked={data.jobPriority5.value} onChange={(e) => this.handleTableJob('jobPriority5', e.target.checked)}>
                    Audit & Risk Management
                  </Checkbox>
                </Col>
              </Col>
              <Col md={8} sm={24} xs={24}>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={isDetails} checked={data.jobPriority6.value} onChange={(e) => this.handleTableJob('jobPriority6', e.target.checked)}>
                    Legal
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={isDetails} checked={data.jobPriority7.value} onChange={(e) => this.handleTableJob('jobPriority7', e.target.checked)}>
                    Logistic/Supply Chain
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={isDetails} checked={data.jobPriority8.value} onChange={(e) => this.handleTableJob('jobPriority8', e.target.checked)}>
                    Marketing
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={isDetails} checked={data.jobPriority9.value} onChange={(e) => this.handleTableJob('jobPriority9', e.target.checked)}>
                    Production & Engineering
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={isDetails} checked={data.jobPriority10.value} onChange={(e) => this.handleTableJob('jobPriority10', e.target.checked)}>
                    Sales
                  </Checkbox>
                </Col>
              </Col>
              <Col md={8} sm={24} xs={24}>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={isDetails} checked={data.jobPriority11.value} onChange={(e) => this.handleTableJob('jobPriority11', e.target.checked)}>
                    Security & Task Force
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={isDetails} checked={data.jobPriority12.value} onChange={(e) => this.handleTableJob('jobPriority12', e.target.checked)}>
                    Strategic Planning & Business Development
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={isDetails} checked={data.jobPriority13.value} onChange={(e) => this.handleTableJob('jobPriority13', e.target.checked)}>
                    Data & Statistics
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={isDetails} checked={data.jobPriority14.value} onChange={(e) => this.handleTableJob('jobPriority14', e.target.checked)}>
                    Lainnya
                    <InputNonForm
                      disabled={!data.jobPriority14.value || isDetails}
                      name="jobPriorityOthers"
                      id="jobPriorityOthers"
                      value={data.jobPriorityOthers}
                      onChange={handleState}
                    />
                  </Checkbox>
                </Col>
              </Col>
            </Col>
          </Col>
        </Row>

        <Row justify='start' style={{ marginTop: 20 }}>
          <Col md={24} sm={24} xs={24}>
            <Table
              columns={columnsJobPriority}
              dataSource={data.tableActivityPriorityJob}
              pagination={false}
              scroll={{x: 1000}}
            />
          </Col>
          <Col md={24} sm={24} xs={24} style={{ marginTop: 20 }}>
            <Button disabled={isDetails} type='primary' onClick={this.resetJob.bind(this)} style={{ float: 'right' }}>
              Atur Ulang
            </Button>
          </Col>
        </Row>

        <Row justify="start">
          <Col md={24} sm={24} xs={24} style={{ paddingTop: 40, paddingBottom: 20 }}>
            <div style={{ backgroundColor: '#bfbfbf', padding: 5 }}>
              <h3>G. LAIN-LAIN</h3>
            </div>
          </Col>
        </Row>

        <Form onSubmit={this.onAddPsychotest.bind(this)}>
          <Row justify="start">
            <Col md={24} sm={24} xs={24}>
              <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                <h4>01. Pengalaman Mengikuti Psikotest</h4>
              </div>
            </Col>
          </Row>

          <Row justify="start">
            <Col md={24} sm={24} xs={24}>
              <Col md={12} sm={12} xs={24}>
                <DatepickerMode
                  disabled={isDetails}
                  labelField="Bulan/Tahun"
                  name="psychotestDate"
                  id="psychotestDate"
                  mode="month"
                  format={'MM/YYYY'}
                  onSubmit={onSubmit}
                  initialValue={this.state.psychotestDate}
                  formItemLayout={formItemLayoutDate}
                  getFieldDecorator={getFieldDecorator}
                  Form={Form}
                  onChange={this.handleSetData.bind(this)}
                  validation={
                    [
                      {
                        required: true,
                        message: "Please enter the Psychotest Date"
                      }
                    ]
                  }
                />
              </Col>
              <Col md={12} sm={12} xs={24}>
                <Input
                  disabled={isDetails}
                  labelField="Tujuan"
                  name="psychotestPurpose"
                  id="psychotestPurpose"
                  initialValue={this.state.psychotestPurpose}
                  formItemLayout={formItemLayout}
                  getFieldDecorator={getFieldDecorator}
                  Form={Form}
                  onChange={this.handleSetData}
                  onSubmit={onSubmit}
                  width={width<576 ? '100%' : '137%'}
                  validation={
                    [
                      {
                        required: true,
                        message: "Please enter the Psychotest Purpose"
                      },
                      {
                        pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                        message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                      }
                    ]
                  }
                />
              </Col>
              <Col md={12} sm={12} xs={24}>
                <Input
                  disabled={isDetails}
                  labelField="Penyelenggara"
                  name="psychotestOrganizer"
                  id="psychotestOrganizer"
                  placeholder="Cth. PT. Astra International, Tbk."
                  initialValue={this.state.psychotestOrganizer}
                  formItemLayout={formItemLayout}
                  getFieldDecorator={getFieldDecorator}
                  Form={Form}
                  onChange={this.handleSetData}
                  onSubmit={onSubmit}
                  width={width<576 ? '100%' : '137%'}
                  validation={
                    [
                      {
                        required: true,
                        message: "Please enter the Psychotest Organizer"
                      },
                      {
                        pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                        message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                      }
                    ]
                  }
                />
              </Col>
            </Col>
          </Row>
          <Row justify="start">
            <Col md={24} sm={24} xs={24}>
              <Button disabled={isDetails} type="primary" htmlType="submit">Tambah Psikotest</Button>
            </Col>
          </Row>
          <Row justify="start">
            <Col md={24} sm={24} xs={24} style={{ marginTop: 20 }}>
              <Table
                columns={columnsPsychotest}
                dataSource={data.tablePsychotest}
                pagination={false}
              />
            </Col>
          </Row>
        </Form>

        <Row justify="start">
          <Col md={24} sm={24} xs={24}>
            <div style={{ paddingTop: 20, paddingBottom: 10, textAlign: 'center' }}>
              <h2>Data yang Saudara berikan bersifat rahasia, dan hanya akan diberikan kepada pihak-pihak yang berwenang.</h2>
            </div>
          </Col>
        </Row>

        <Row justify='start' style={{ marginTop: 20, width:'100%' }}>
          <Col md={24} sm={24} xs={24}>
            <Button disabled={isDetails} type='primary' onClick={this.onSubmitFlk} style={{float: 'right'}}>Submit FLK Form</Button>
          </Col>
        </Row>

        <Row justify="start">
          <Col md={12} sm={12} xs={12} style={{ paddingBottom: 20 }}>
            <div
              style={{
                marginTop: 20,
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <Icon
                onClick={() => handleStatePosisi(2)}
                style={{ cursor: 'pointer' }}
                type='left-circle'
                style={{ fontSize: 30 }}
              />
              <div>
                <div style={{ fontSize: 20 }}>3/3</div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const WrappedForm = Form.create()(Form3);
export default WrappedForm;
