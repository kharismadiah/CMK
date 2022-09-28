import React, { Component } from 'react';
import { Col, Row, Icon, Checkbox, Radio, Table } from 'antd';

import Form from '../../../../uielements/form';
import Input from '../../../../CustomComponentAntd/customInput';
import Button, { ButtonGroup } from '../../../../uielements/button';
import Select from '../../../../CustomComponentAntd/customSelect';
import InputNonForm from '../../../../CustomComponentAntd/customInputNonForm';
import Datepicker from '../../../../CustomComponentAntd/customDatePicker';
import DatepickerMode from '../../../../CustomComponentAntd/customDatePickerMode';

import {Cookie} from '../../../../../service/header';

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

      nameReference: '',
      company: '',
      relation: '',
      // occupation2: '',
      phone: '',

      hobbies: '',
      applied: 2,
      position: '',
      dateApplied: '',
      dateAvailable: '',
      termAndCondition: false,

      aggree: false,

      activityPriority1:false,
      activityPriority2:false,
      activityPriority3:false,
      activityPriority4: false,
      activityPriority5: false,
      activityPriority6: false,
      jobPriority1:false,
      jobPriority2:false,
      jobPriority3:false,
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

      psychotestDate: '',
      psychotestOrganizer: '',
      psychotestPurpose: '',
    }
  }

  handleSetData = (property, value) => {
  };

  render() {
    const { data, handleStatePosisi, source, handleState } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { onSubmit } = this.state;

    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 16 },
    };

    const colStyle = {
      marginBottom: '-15px',
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
          <div>{idx+1}</div>
        )
      },
      {
        title: 'Kegiatan',
        dataIndex: 'Kegiatan',
        width: '90%',
      }
    ]

    const columnsJobPriority = [
      {
        title: 'No Urut',
        dataIndex: 'NoUrut',
        width: '10%',
        render: (text, data, idx) => (
          <div>{idx+1}</div>
        )
      },
      {
        title: 'Pekerjaan',
        dataIndex: 'Pekerjaan',
        width: '90%',
      }
    ]

    const columnsPsychotest = [
      {
        title: 'Action',
        dataIndex: 'action',
        render: (text, data, idx) => (
          <ButtonGroup>
            <Button disabled={true}>
              <Icon type="edit" style={{ fontSize: 20 }} />
            </Button>
            <Button disabled={true}>
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

    const columnsReference = [
      {
          title: 'Actions',
          dataIndex: 'action',
          render: (text, data, idx) => (
              <ButtonGroup>
                  <Button disabled={true}>
                      <Icon type="edit" style={{ fontSize: 20 }} />
                  </Button>
                  <Button disabled={true}>
                      <Icon type="delete" style={{ fontSize: 20 }} />
                  </Button>
              </ButtonGroup>
          )
      },
      {
          title: 'Nama Lengkap',
          dataIndex: 'referenceName'
      },
      {
          title: 'Perusahaan',
          dataIndex: 'referenceCompany'
      },
      {
          title: 'Jabatan',
          dataIndex: 'referenceTitle'
      },
      {
          title: 'No. HP',
          dataIndex: 'referencePhone'
      },
      {
          title: 'Email',
          dataIndex: 'referenceEmail'
      },
      {
          title: 'Relasi',
          dataIndex: 'referenceRelation'
      }
  ]

    return (
      <div style={{ marginTop: 30 }}>
        <Row justify="start">
            <Col md={24} sm={24} xs={24} style={{paddingTop:40, paddingBottom:20}}>
                <div style={{backgroundColor:'#bfbfbf', padding:5}}>
                    <h3>E. HOBI & AKTIVITAS SOSIAL</h3>
                </div>
            </Col>
        </Row>

        <Row justify="start">
          <Col md={24} sm={24} xs={24}>
            <div style={{paddingTop:5, paddingBottom:10}}>
              <h4>01. Hobi (Pilih yang sesuai)</h4>
            </div>
          </Col>
        </Row>

        <Row justify="start">
          <Col md={24} sm={24} xs={24}>
            <Col md={12} sm={12} xs={24}>
              <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                <Checkbox disabled={true} checked={data.hobby1.value} onChange={(e) => this.handleStateChecked('hobby1', e.target.checked)}>Membaca Fiksi</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                <Checkbox disabled={true} checked={data.hobby2.value} onChange={(e) => this.handleStateChecked('hobby2', e.target.checked)}>Membaca Non-Fiksi</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                <Checkbox disabled={true} checked={data.hobby3.value} onChange={(e) => this.handleStateChecked('hobby3', e.target.checked)}>Membaca Koran/Artikel Berita</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                <Checkbox disabled={true} checked={data.hobby4.value} onChange={(e) => this.handleStateChecked('hobby4', e.target.checked)}>
                  Kegiatan Investasi<br></br>
                  <span style={{marginLeft: 25}}>(Contoh: trading saham, komoditas, valas, dll.)</span>
                </Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24}>
                <Checkbox disabled={true} checked={data.hobby5.value} onChange={(e) => this.handleStateChecked('hobby5', e.target.checked)}>
                  Menulis<br></br>
                  <span style={{marginLeft: 25, display: 'block'}}>(Contoh: cerpen, buku, artikel. dll.)</span>
                </Checkbox>
              </Col>
            </Col>
            <Col md={12} sm={12} xs={24}>
              <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                <Checkbox disabled={true} checked={data.hobby6.value} onChange={(e) => this.handleStateChecked('hobby6', e.target.checked)}>Menggambar/Melukis</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                <Checkbox disabled={true} checked={data.hobby7.value} onChange={(e) => this.handleStateChecked('hobby7', e.target.checked)}>Bermain Musik</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                <Checkbox disabled={true} checked={data.hobby8.value} onChange={(e) => this.handleStateChecked('hobby8', e.target.checked)}>Bernyanyi</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                <Checkbox disabled={true} checked={data.hobby9.value} onChange={(e) => this.handleStateChecked('hobby9', e.target.checked)}>
                  Olahraga Kompetitif<br></br>
                  <span style={{marginLeft: 25}}>(Fokus untuk memang, contoh: sepakbola, bulu tangkis, basket, catur, dll.)</span>
                </Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24}>
                <Checkbox disabled={true} checked={data.hobby10.value} onChange={(e) => this.handleStateChecked('hobby10', e.target.checked)}>
                  Olahraga Non-Kompetitif<br></br>
                  <span style={{marginLeft: 25, display: 'block'}}>(Fokus kesenangan/kebugaran/pengingkatan kesehatan, contoh: yoga, jogging, pilates, aerobik, dll.)</span>
                </Checkbox>
              </Col>
            </Col>
          </Col>
        </Row>

        <Row justify="start">
          <Col md={24} sm={24} xs={24}>
            <div style={{paddingTop:5, paddingBottom:10}}>
              <h4>02. Aktivitas Sosial</h4>
            </div>
          </Col>
          <Col md={24} sm={24} xs={24}>
            <div style={{paddingTop:5, paddingBottom:10}}>
              <h4>Aktivitas yang rutin dilakukan</h4>
            </div>
          </Col>
        </Row>

        <Row justify="start">
          <Col md={24} sm={24} xs={24}>
            <Col md={12} sm={12} xs={24}>
              <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                <Checkbox disabled={true} checked={data.socialActivity1.value} onChange={(e) => this.handleStateChecked('socialActivity1', e.target.checked)}>Menghadiri komunikasi sosial</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                <Checkbox disabled={true} checked={data.socialActivity2.value} onChange={(e) => this.handleStateChecked('socialActivity2', e.target.checked)}>Menghadiri komunitas yang berkaitan dengan hobi (klub)</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                <Checkbox disabled={true} checked={data.socialActivity3.value} onChange={(e) => this.handleStateChecked('socialActivity3', e.target.checked)}>Mengikuti aktivitas sukarela (voulenteering)</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                <Checkbox disabled={true} checked={data.socialActivity4.value} onChange={(e) => this.handleStateChecked('socialActivity4', e.target.checked)}>Mengunjungi museum/pameran/pertunjukan</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                <Checkbox disabled={true} checked={data.socialActivity5.value} onChange={(e) => this.handleStateChecked('socialActivity5', e.target.checked)}>Melakukan aktivitas rekreasional (contoh: berbelanja, travelling, dll.)</Checkbox>
              </Col>
            </Col>
            <Col md={12} sm={12} xs={24}>
              <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                <Checkbox disabled={true} checked={data.socialActivity6.value} onChange={(e) => this.handleStateChecked('socialActivity6', e.target.checked)}>Arisan dengan teman/kenalan</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                <Checkbox disabled={true} checked={data.socialActivity7.value} onChange={(e) => this.handleStateChecked('socialActivity7', e.target.checked)}>Menongkrong dengan teman/kenalan</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                <Checkbox disabled={true} checked={data.socialActivity8.value} onChange={(e) => this.handleStateChecked('socialActivity8', e.target.checked)}>Mengikuti kegiatan keagamaan</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                <Checkbox disabled={true} checked={data.socialActivity9.value} onChange={(e) => this.handleStateChecked('socialActivity9', e.target.checked)}>Menghadiri pesta</Checkbox>
              </Col>
              <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                <Checkbox disabled={true} checked={data.socialActivity10.value} onChange={(e) => this.handleStateChecked('socialActivity10', e.target.checked)}>
                  Lainnya
                  <InputNonForm
                    disabled={!data.socialActivity10.value}
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
          <Col md={24} sm={24} xs={24} style={{paddingTop:40, paddingBottom:20}}>
            <div style={{backgroundColor:'#bfbfbf', padding:5}}>
              <h3>F. Minat Kerja</h3>
            </div>
          </Col>
        </Row>

        <Row justify="start">
          <Col md={24} sm={24} xs={24}>
            <Col md={8} sm={8} xs={8} style={colStyle}>
                <h4>01. Sebutkan gaji yang Saudara harapkan</h4>
            </Col>
            <Col md={8} sm={8} xs={8} style={colStyle}>
              <Select
                name='salary'
                id='salary'
                disabled={true}
                formItemLayout={formItemLayoutSelect}
                getFieldDecorator={getFieldDecorator}
                Form={Form}
                onSubmit={onSubmit}
                initialValue={data.salary}
                onChange={(e) => handleState("salary", e)}
                data={source.Salary}
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
            <Col md={8} sm={8} xs={8}>
              <div style={{paddingTop:5, paddingBottom:10}}>
                <h4>02. Kapan Saudara dapat mulai bekerja</h4>
              </div>
            </Col>
            <Col md={8} sm={8} xs={8} style={colStyle}>
              <Datepicker
                disabled={true}
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
            <Col md={8} sm={8} xs={8}>
                <h4>03. Kesediaan ditempatkan di luar DKI Jakarta</h4>
            </Col>
            <Col md={8} sm={8} xs={8}>
              <Radio.Group 
                disabled={true}
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
              <Col md={24} sm={24} xs={24}>
                <Col md={8} sm={8} xs={8} style={{paddingTop:5, paddingBottom:10}}></Col>
                  <Col md={16} sm={16} xs={16}>
                    <Row justify="start">
                      <Col md={24} sm={24} xs={24}>
                        <div style={{paddingTop:5, paddingBottom:10}}>
                          <h4>Jika bersedia, pilih lokasi yang Saudara sukai (boleh lebih dari 1)</h4>
                        </div>
                      </Col>
                    </Row>
                    <Row justify="start">
                      <Col md={24} sm={24} xs={24}>
                        <Col md={12} sm={12} xs={24}>
                          <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                            <Checkbox disabled={true} checked={data.city1.value} onChange={(e) => this.handleStateChecked('city1', e.target.checked)}>Depok, Tangerang, Bekasi, Bogor</Checkbox>
                          </Col>
                          <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                            <Checkbox disabled={true} checked={data.city2.value} onChange={(e) => this.handleStateChecked('city2', e.target.checked)}>Pulau Jawa (Non-Jabodetabek)</Checkbox>
                          </Col>
                          <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                            <Checkbox disabled={true} checked={data.city3.value} onChange={(e) => this.handleStateChecked('city3', e.target.checked)}>Pulau Sumatera</Checkbox>
                          </Col>
                          <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                            <Checkbox disabled={true} checked={data.city4.value} onChange={(e) => this.handleStateChecked('city4', e.target.checked)}>Pulau Kalimantan</Checkbox>
                          </Col>
                        </Col>
                        <Col md={12} sm={12} xs={24}>
                          <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                            <Checkbox disabled={true} checked={data.city5.value} onChange={(e) => this.handleStateChecked('city5', e.target.checked)}>Pulau Sulawesi</Checkbox>
                          </Col>
                          <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                            <Checkbox disabled={true} checked={data.city6.value} onChange={(e) => this.handleStateChecked('city6', e.target.checked)}>Pulau Bali & Nusa Tenggara</Checkbox>
                          </Col>
                          <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                            <Checkbox disabled={true} checked={data.city7.value} onChange={(e) => this.handleStateChecked('city7', e.target.checked)}>Papua & Kepulauan Maluku</Checkbox>
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
          <Col md={24} sm={24} xs={24}>
            <Col md={24} sm={24} xs={24}>
              <div style={{paddingTop:5, paddingBottom:10}}>
                <h4>04. Prioritas kegiatan yang Saudara suka (Urutkan 3 yang utama)</h4>
                <h5>** Pilihan pertama Anda akan menjadi urutan pertama</h5>
              </div>
            </Col>
            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
              <Checkbox disabled={true} checked={data.activityPriority1} onChange={(e) => this.handleTableActivityPriority('activityPriority1', e.target.checked)}>
                Kegiatan mengerjakan sesuatu dengan tangan atau alat-alat mekanis secara terampil, seperti kegiatan yang memanfaatkan keterampilan tangan (menjahit, menenun, membuat kue, dll.),<br></br>
                <span style={{marginLeft:25, display:'inline-block'}}> bidang mekanik, pertanian, listrik, serta teknik</span>
              </Checkbox>
            </Col>
            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
              <Checkbox disabled={true} checked={data.activityPriority2} onChange={(e) => this.handleTableActivityPriority('activityPriority2', e.target.checked)}>
                Kegiatan yang melibatkan pengamatan terhadap gejalan fisik, biologis, serta budaya, seperti penelitian dan segala hal yang berbau ilmiah
              </Checkbox>
            </Col>
            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
              <Checkbox disabled={true} checked={data.activityPriority3} onChange={(e) => this.handleTableActivityPriority('activityPriority3', e.target.checked)}>
                Kegiatan yang memanfaatkan kreativitas dan imajinasi untuk menciptakan bentuk atau produk seni, seperti pekerja seni (seniman)
              </Checkbox>
            </Col>
            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
              <Checkbox disabled={true} checked={data.activityPriority4} onChange={(e) => this.handleTableActivityPriority('activityPriority4', e.target.checked)}>
                Kegiatan menginformasikan, melatih, mengembangkan, menyembuhkan, atau mencerahkan orang lain, seperti membantu atau mengajar orang lain (melayani orang lain)
              </Checkbox>
            </Col>
            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
              <Checkbox disabled={true} checked={data.activityPriority5} onChange={(e) => this.handleTableActivityPriority('activityPriority5', e.target.checked)}>
                Kegiatan yang menuntut kemampuan untuk memepengaruhi orang lain dalam rangka mencapai tujuan organisasi atau mendapatkan manfaat ekonomis, seperti menjual atau<br></br>
                <span style={{marginLeft:25, display:'inline-block'}}>mengelola orang lain</span>
              </Checkbox>
            </Col>
            <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
              <Checkbox disabled={true} checked={data.activityPriority5} onChange={(e) => this.handleTableActivityPriority('activityPriority6', e.target.checked)}>
                Kegiatan yang melibatkan pemanfaatan data yang konkret, teratur, dan sistematis, seperti pencatatan, perhitungan, sistem bisnis, serta klerikal
              </Checkbox>
            </Col>
          </Col>
        </Row>

        <Row justify='start'>
          <Col md={24} sm={24} xs={24} style={{ marginTop: 20, marginBottom:20 }}>
            <Table
              columns={columnsActivitiesPriority}
              dataSource={data.tableActivityPriority}
              pagination={false}
            />
          </Col>
          <Col md={24} sm={24} xs={24} style={{ marginTop: 20 }}>
            <Button disabled={true} type='primary' onClick={()=> this.resetActivities.bind(this)} style={{float: 'right'}}>
              Atur Ulang
            </Button>
          </Col>
        </Row>

        <Row justify="start">
          <Col md={24} sm={24} xs={24}>
            <Col md={24} sm={24} xs={24}>
              <div style={{ paddingTop: 5, paddingBottom: 10 }}>
                <h4>05. Prioritas jenis pekerjaan yang Saudara suka (Urutkan 3 yang utama)</h4>
                <h5>** Pilihan pertama Anda akan menjadi urutan pertama</h5>
              </div>
            </Col>
            <Col md={24} sm={24} xs={24}>
              <Col md={8} sm={8} xs={8}>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={true} checked={data.jobPriority1} onChange={(e) => this.handleTableJob('jobPriority1', e.target.checked)}>
                    Coorporate Communication
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={true} checked={data.jobPriority2} onChange={(e) => this.handleTableJob('jobPriority2', e.target.checked)}>
                    Finance, Accounting, Tax
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={true} checked={data.jobPriority3} onChange={(e) => this.handleTableJob('jobPriority3', e.target.checked)}>
                    Human Capital (HC)
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={true} checked={data.jobPriority4} onChange={(e) => this.handleTableJob('jobPriority4', e.target.checked)}>
                    Information Technology (IT)
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={true} checked={data.jobPriority5} onChange={(e) => this.handleTableJob('jobPriority5', e.target.checked)}>
                    Audit & Risk Management
                  </Checkbox>
                </Col>
              </Col>
              <Col md={8} sm={8} xs={8}>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={true} checked={data.jobPriority6} onChange={(e) => this.handleTableJob('jobPriority6', e.target.checked)}>
                    Legal
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={true} checked={data.jobPriority7} onChange={(e) => this.handleTableJob('jobPriority7', e.target.checked)}>
                    Logistic/Supply Chain
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={true} checked={data.jobPriority8} onChange={(e) => this.handleTableJob('jobPriority8', e.target.checked)}>
                    Marketing
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={true} checked={data.jobPriority9} onChange={(e) => this.handleTableJob('jobPriority9', e.target.checked)}>
                    Production & Engineering
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={true} checked={data.jobPriority10} onChange={(e) => this.handleTableJob('jobPriority10', e.target.checked)}>
                    Sales
                  </Checkbox>
                </Col>
              </Col>
              <Col md={8} sm={8} xs={8}>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={true} checked={data.jobPriority11} onChange={(e) => this.handleTableJob('jobPriority11', e.target.checked)}>
                    Security & Task Force
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={true} checked={data.jobPriority12} onChange={(e) => this.handleTableJob('jobPriority12', e.target.checked)}>
                    Strategic Planning & Business Development
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={true} checked={data.jobPriority13} onChange={(e) => this.handleTableJob('jobPriority13', e.target.checked)}>
                    Data & Statistics
                  </Checkbox>
                </Col>
                <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                  <Checkbox disabled={true} checked={this.state.jobPriority14} onChange={(e) => this.handleTableJob('jobPriority14', e.target.checked)}>
                    Lainnya
                    <InputNonForm
                      disabled={!this.state.jobPriority14}
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
            />
          </Col>
          <Col md={24} sm={24} xs={24} style={{ marginTop: 20 }}>
            <Button disabled={true} type='primary' onClick={()=> this.resetJob.bind(this)} style={{float: 'right'}}>
              Atur Ulang
            </Button>
          </Col>
        </Row>

        <Row justify="start">
          <Col md={24} sm={24} xs={24} style={{paddingTop:40, paddingBottom:20}}>
            <div style={{backgroundColor:'#bfbfbf', padding:5}}>
              <h3>G. LAIN-LAIN</h3>
            </div>
          </Col>
        </Row>

        <Form>
          <Row justify="start">
            <Col md={24} sm={24} xs={24}>
              <div style={{paddingTop:5, paddingBottom:10}}>
                <h4>01. Pengalaman Mengikuti Psikotest</h4>
              </div>
            </Col>
          </Row>

          <Row justify="start">
            <Col md={24} sm={24} xs={24} style={colStyle}>
              <Col md={12} sm={12} xs={12} style={colStyle}>
                <DatepickerMode
                  labelField="Bulan/Tahun"
                  disabled={true}
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
              <Col md={12} sm={12} xs={12} style={colStyle}>
                <Input
                  labelField="Tujuan"
                  name="psychotestPurpose"
                  id="psychotestPurpose"
                  initialValue={this.state.psychotestPurpose}
                  formItemLayout={formItemLayout}
                  getFieldDecorator={getFieldDecorator}
                  Form={Form}
                  onChange={this.handleSetData}
                  disabled={true}
                  onSubmit={onSubmit}
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
              <Col md={12} sm={12} xs={12}>
                <Input
                  labelField="Penyelenggara"
                  name="psychotestOrganizer"
                  id="psychotestOrganizer"
                  placeholder="Cth. PT. Astra International, Tbk."
                  initialValue={this.state.psychotestOrganizer}
                  formItemLayout={formItemLayout}
                  getFieldDecorator={getFieldDecorator}
                  Form={Form}
                  onChange={this.handleSetData}
                  disabled={true}
                  onSubmit={onSubmit}
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
              <Button disabled={true} type="primary" htmlType="submit">Tambah Psikotest</Button>
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
                <div style={{paddingTop:15, paddingBottom:10}}>
                    <h4>02. Fasilitas yang Saudara dapatkan di perusahaan saat ini</h4>
                </div>
            </Col>
        </Row>

        <Row justify="start">
          <Col md={24} sm={24} xs={24}>
              <Col md={8} sm={8} xs={8}>
                  <Row>
                      <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                          <Checkbox disabled={true} checked={data.facility1} onChange={(e) => handleState('facility1', e.target.checked)}>Makanan & Minuman</Checkbox>
                      </Col>
                      <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                          <Checkbox disabled={true} checked={data.facility2} onChange={(e) => handleState('facility2', e.target.checked)}>Kendaraan Operasional (CPO/Pinjem)</Checkbox>
                      </Col>
                      <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                          <Checkbox disabled={true} checked={data.facility3} onChange={(e) => handleState('facility3', e.target.checked)}>Asuransi Kesehatan</Checkbox>
                      </Col>
                      <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                          <Checkbox disabled={true} checked={data.facility4} onChange={(e) => handleState('facility4', e.target.checked)}>Asuransi Jiwa</Checkbox>
                      </Col>
                      <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                          <Checkbox disabled={true} checked={data.facility5} onChange={(e) => handleState('facility5', e.target.checked)}>Dana Pensiun</Checkbox>
                      </Col>
                      <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                          <Checkbox disabled={true} checked={data.facility6} onChange={(e) => handleState('facility6', e.target.checked)}>Insentif/Bonus</Checkbox>
                      </Col>
                  </Row>
              </Col>

              <Col md={8} sm={8} xs={8}>
                  <Row>
                      <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                          <Checkbox disabled={true} checked={data.facility7} onChange={(e) => handleState('facility7', e.target.checked)}>Kebugaran (gym)</Checkbox>
                      </Col>
                      <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                          <Checkbox disabled={true} checked={data.facility8} onChange={(e) => handleState('facility8', e.target.checked)}>Transportasi (Co: bensin, parkir, tol, dll.)</Checkbox>
                      </Col>
                      <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                          <Checkbox disabled={true} checked={data.facility9} onChange={(e) => handleState('facility9', e.target.checked)}>Tunjangan Hari Raya (THR)</Checkbox>
                      </Col>
                      <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                          <Checkbox disabled={true} checked={data.facility10} onChange={(e) => handleState('facility10', e.target.checked)}>Pelatihan</Checkbox>
                      </Col>
                      <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                          <Checkbox disabled={true} checked={data.facility11} onChange={(e) => handleState('facility11', e.target.checked)}>Tunjangan Jabatan</Checkbox>
                      </Col>
                      <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                          <Checkbox disabled={true} checked={data.facility12} onChange={(e) => handleState('facility12', e.target.checked)}>Tunjangan Cuti</Checkbox>
                      </Col>
                  </Row>
              </Col>

              <Col md={8} sm={8} xs={8}>
                  <Row>
                      <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                          <Checkbox disabled={true} checked={data.facility13} onChange={(e) => handleState('facility13', e.target.checked)}>Tunjangan lembur (Co: transportasi, makanan & minuman, dll.)</Checkbox>
                      </Col>
                      <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                          <Checkbox disabled={true} checked={data.facility14} onChange={(e) => handleState('facility14', e.target.checked)}>Program pinjaman/pembiayaan (rumah, pendidikan, kendaraan pribadi, ibadah, dll.)</Checkbox>
                      </Col>
                      <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                          <Checkbox disabled={true} checked={data.facility15} onChange={(e) => handleState('facility15', e.target.checked)}>Tunjangan perjalanan dinas</Checkbox>
                      </Col>
                      <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                          <Checkbox disabled={true} checked={data.facility16} onChange={(e) => handleState('facility16', e.target.checked)}>Tunjangan telekomunikasi (Co: pulsa, kuota, internet, dll.)</Checkbox>
                      </Col>
                      <Col md={24} sm={24} xs={24} style={{marginBottom:10}}>
                          <Checkbox disabled={true} checked={data.facility17} onChange={(e) => handleState('facility17', e.target.checked)}>
                              Lainnya
                              <InputNonForm
                                  disabled={!data.facility17}
                                  name="facilityOthers"
                                  id="facilityOthers"
                                  value={data.facilityOthers}
                                  onChange={handleState}
                              />
                          </Checkbox>
                      </Col>
                  </Row>
              </Col>
          </Col>
        </Row>

        <Form>
          <Row justify="start">
              <Col md={24} sm={24} xs={24}>
                  <div style={{paddingTop:5, paddingBottom:10}}>
                      <h4>03. Reference</h4>
                  </div>
              </Col>
          </Row>

          <Row justify="start">
              <Col md={24} sm={24} xs={24} style={colStyle}>
                  <Col md={12} sm={12} xs={12} style={colStyle}>
                      <Input
                          labelField="Nama Lengkap"
                          name="referenceName"
                          id="referenceName"
                          placeholder=""
                          initialValue={this.state.referenceName}
                          formItemLayout={formItemLayout}
                          getFieldDecorator={getFieldDecorator}
                          Form={Form}
                          onChange={this.handleSetData}
                          disabled={true}
                          onSubmit={onSubmit}
                          validation={
                              [
                                  {
                                      required: true,
                                      message: "Please enter the Nama Lengkap"
                                  },
                                  {
                                      pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                      message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                  }
                              ]
                          }
                      />
                  </Col>
                  <Col md={12} sm={12} xs={12} style={colStyle}>
                      <Input
                          labelField="No.Hp"
                          name="referencePhone"
                          id="referencePhone"
                          placeholder=""
                          initialValue={this.state.referencePhone}
                          formItemLayout={formItemLayout}
                          getFieldDecorator={getFieldDecorator}
                          Form={Form}
                          onChange={this.handleSetData}
                          disabled={true}
                          onSubmit={onSubmit}
                          validation={
                              [
                                  {
                                      required: true,
                                      message: "Please enter the No. HP"
                                  },
                                  {
                                      pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                      message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                  }
                              ]
                          }
                      />
                  </Col>
                  <Col md={12} sm={12} xs={12} style={colStyle}>
                      <Select
                          labelField="Perusahaan"
                          name="referenceCompany"
                          id="referenceCompany"
                          placeholder=""
                          initialValue={this.state.referenceCompany}
                          formItemLayout={formItemLayoutSelect}
                          getFieldDecorator={getFieldDecorator}
                          Form={Form}
                          data={source.Branch}
                          onChange={this.handleSetData}
                          disabled={true}
                          onSubmit={onSubmit}
                          validation={
                              [
                                  {
                                      required: true,
                                      message: "Please enter the Perusahaan"
                                  },
                                  {
                                      pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                      message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                  }
                              ]
                          }
                      />
                  </Col>
                  <Col md={12} sm={12} xs={12} style={colStyle}>
                      <Input
                          labelField="Email"
                          name="referenceEmail"
                          id="referenceEmail"
                          placeholder=""
                          initialValue={this.state.referenceEmail}
                          formItemLayout={formItemLayout}
                          getFieldDecorator={getFieldDecorator}
                          Form={Form}
                          onChange={this.handleSetData}
                          disabled={true}
                          onSubmit={onSubmit}
                          validation={
                              [
                                  {
                                      required: true,
                                      message: "Please enter the Email"
                                  },
                                  {
                                      pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                      message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                  }
                              ]
                          }
                      />
                  </Col>
                  <Col md={12} sm={12} xs={12} style={colStyle}>
                      <Select
                          labelField="Jabatan"
                          name="referenceTitle"
                          id="referenceTitle"
                          formItemLayout={formItemLayoutSelect}
                          getFieldDecorator={getFieldDecorator}
                          Form={Form}
                          onSubmit={onSubmit}
                          initialValue={this.state.referenceTitle}
                          disabled={true}
                          onChange={(e) => this.handleSetData('referenceTitle', e)}
                          data={source.OrganizationTitle}
                          validation={
                              [
                                  {
                                      required: true,
                                      message: "Please enter the Jabatan"
                                  },
                              ]
                          }
                      />
                  </Col>
                  <Col md={12} sm={12} xs={12}>
                      <Input
                          labelField="Relasi"
                          name="referenceRelation"
                          id="referenceRelation"
                          placeholder=""
                          initialValue={this.state.referenceRelation}
                          formItemLayout={formItemLayout}
                          getFieldDecorator={getFieldDecorator}
                          Form={Form}
                          onChange={this.handleSetData}
                          disabled={true}
                          onSubmit={onSubmit}
                          validation={
                              [
                                  {
                                      required: true,
                                      message: "Please enter the Relasi"
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
                  <Button disabled={true} type="primary" htmlType="submit">Tambah Referensi</Button>
              </Col>
          </Row>

          <Row justify="start">
              <Col md={24} sm={24} xs={24} style={{ marginTop: 20 }}>
                  <Table
                      columns={columnsReference}
                      dataSource={data.tableReference}
                      pagination={false}
                  />
              </Col>
          </Row>
        </Form>

        <Row justify="start">
          <Col md={24} sm={24} xs={24}>
              <div style={{paddingTop:20, paddingBottom:10, textAlign: 'center'}}>
                  <h2>Data yang Saudara berikan bersifat rahasia, dan hanya akan diberikan kepada pihak-pihak yang berwenang.</h2>
              </div>
          </Col>
        </Row>

        <Row justify='start' style={{ marginTop: 20 }}>
          <Col offset={20} md={4} sm={4} xs={4}>
            <Button disabled={true} type='primary' onClick={this.onSubmitFlk}>Submit FLK Form</Button>
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
            </div>
          </Col>
          <Col md={12} sm={12} xs={12} style={{ paddingBottom: 20 }}>
            <div style={{ marginTop: 20 }}>
              <span style={{ fontSize: 20 }}>3/3</span>
            </div>
          </Col>
        </Row>

      </div>
    );
  }
}

const WrappedForm = Form.create()(Form3);
export default WrappedForm;
