import React, { Component } from 'react';
import { Col, Row, Icon, Upload, Radio, Table } from 'antd';

import Form from '../../../../uielements/form'
import Input from '../../../../CustomComponentAntd/customInput';
import Button from '../../../../uielements/button';
import Select from '../../../../CustomComponentAntd/customSelect';
import Datepicker from '../../../../CustomComponentAntd/customDatePicker';
import TextArea from '../../../../CustomComponentAntd/customTextArea';
import DatepickerMode from '../../../../CustomComponentAntd/customDatePickerMode';
import ImgUser from '../../../../../image/ImgUser.png'
import ButtonGroup from 'antd/lib/button/button-group';

class Form1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onSubmit: false,
            onCheckOther: false,
            tingkat: '',
            programStudi: '',
            namaInstitusi: '',
            namaInstitusiOthers: '',
            tahunMasuk: '',
            kota: '',
            kotaOthers: '',
            tahunLulus: '',
            jurusan: '', 
            gpaNem:'',
            outOf:'',
            
            namaProgram: '',
            tahun: '',
            penyelenggara: '',
            keterangan: '',

            namaOrganisasi: '',
            lingkup: '',
            jabatan: ''
        }
    }

    render() {
        const { source, data, handleState, handleStatePosisi, RecruitmentPhase, isFLKSubmit = false } = this.props
        const { getFieldDecorator } = this.props.form
        const { onSubmit } = this.state
        
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 16 }
        };
        const colStyle = {
            marginBottom: '-10px'
        };
        const formItemLayoutSelect = {
            labelCol: { span: 8 },
            wrapperCol: { span: 24 }
        };
        const formItemLayoutDate = {
            labelCol: { span: 8 },
            wrapperCol: { span: 22 }
        };
        let validatePhoto = typeof data.Photo

        const columnsEducation = [
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
                ),
                width: 100,
            },
            {
                title: 'Tingkat',
                dataIndex: 'Tingkat',
            },
            {
                title: 'Nama Institution',
                dataIndex: 'NamaInstitution',
            },
            {
                title: 'Negara/Kota',
                dataIndex: 'Kota',
            },
            {
                title: 'Jurusan',
                dataIndex: 'Jurusan',
            },
            {
                title: 'Program Studi',
                dataIndex: 'ProgramStudi',
            },
            {
                title: 'Tahun Masuk',
                dataIndex: 'TahunMasuk',
            },
            {
                title: 'Tahun Lulus',
                dataIndex: 'TahunLulus',
            },
            {
                title: 'IPK',
                dataIndex: 'GpaNem',
            },
        ];

        const columnsSertifikasi = [
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
                ),
                width: 100,
            },
            {
                title: 'Nama Program',
                dataIndex: 'NamaProgram',
            },
            {
                title: 'Penyelenggara',
                dataIndex: 'Penyelenggara',
            },
            {
                title: 'Tahun',
                dataIndex: 'Tahun',
            },
            {
                title: 'Keterangan',
                dataIndex: 'Keterangan',
            },
        ];

        const columnsOrganisasi = [
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
                ),
                width: 100,
            },
            {
                title: 'Nama Organisasi',
                dataIndex: 'NamaOrganisasi',
            },
            {
                title: 'Jabatan',
                dataIndex: 'Jabatan',
            },
            {
                title: 'Lingkup',
                dataIndex: 'Lingkup',
            },
        ];

        return (
            <>
                <div style={isFLKSubmit ? { height: '80vh' } : { marginTop: 30 }}>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={{paddingTop:40, paddingBottom:20}}>
                            <div style={{backgroundColor:'#bfbfbf', padding:5}}>
                                <h3>A. BIODATA</h3>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="start" style={{marginTop:15}}>
                        <Col md={16} sm={16} xs={24} style={colStyle}>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <Input
                                        labelField="01. Nama Lengkap"
                                        name="namaLengkap"
                                        id="namaLengkap"
                                        initialValue={data.namaLengkap}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onChange={handleState}
                                        onSubmit={onSubmit}
                                        disabled={true}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Nama Lengkap"
                                                }
                                            ]
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <Select
                                        labelField="02. Tempat Lahir"
                                        name="tempatLahir"
                                        id="tempatLahir"
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onSubmit={onSubmit}
                                        initialValue={data.tempatLahir}
                                        onChange={(e) => this.handleState('tempatLahir', e)}
                                        data={source.PlaceOfBirth}
                                        disabled={true}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Tempat Lahir"
                                                }
                                            ]
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={23} sm={23} xs={24} offset={1} style={colStyle}>
                                    <div style={{width:'99%'}}>
                                        <Datepicker
                                            labelField="Tanggal Lahir"
                                            disabled={true}
                                            name="tanggalLahir"
                                            id="tanggalLahir"
                                            initialValue={data.tanggalLahir}
                                            formItemLayout={formItemLayoutDate}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            format={'DD/MM/YYYY'}
                                            onChange={(e, value) => this.handleStateDate('tanggalLahir', value)}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Tanggal Lahir"
                                                    }
                                                ]
                                            }
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24} offset={1} style={colStyle}>
                                    <div style={{width:'96%'}}>
                                        <Select
                                            labelField="Kewarganegaraan"
                                            name="kewarganegaraan"
                                            id="kewarganegaraan"
                                            formItemLayout={formItemLayoutSelect}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onSubmit={onSubmit}
                                            initialValue={data.kewarganegaraan}
                                            onChange={(e) => handleState('kewarganegaraan', e)}
                                            data={source.kewarganegaraan}
                                            disabled={true}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Kewarganegaraan"
                                                    },
                                                ]
                                            }
                                        />
                                    </div>
                                </Col>
                                {
                                    data.kewarganegaraan === "Asing" ?
                                        <Col md={24} sm={24} xs={24} offset={1} style={colStyle}>
                                            <div style={{width:'96%'}}>
                                                <Input
                                                    name="kewarganegaraanOthers"
                                                    id="kewarganegaraanOthers"
                                                    initialValue={data.kewarganegaraanOthers}
                                                    formItemLayout={formItemLayout}
                                                    getFieldDecorator={getFieldDecorator}
                                                    Form={Form}
                                                    onChange={handleState}
                                                    onSubmit={onSubmit}
                                                    disabled={true}
                                                    validation={
                                                        [
                                                            {
                                                                required: true,
                                                                message: "Please enter the No HP"
                                                            },
                                                            {
                                                                pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                                message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                            }
                                                        ]
                                                    }
                                                />
                                            </div>
                                        </Col>
                                    : null
                                }
                            </Row>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <div style={{ width: '137%' }}>
                                        <TextArea
                                            labelField="03. Alamat Lengkap (domisili saat ini)"
                                            id="alamatLengkap"
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            initialValue={data.alamatLengkap}
                                            disabled={true}
                                            onChange={(e) => handleState('alamatLengkap', e.target.value)}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Alamat Lengkap"
                                                    }
                                                ]
                                            }
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <Input
                                        labelField="04. No HP"
                                        name="noHP1"
                                        id="noHP1"
                                        initialValue={data.noHP1}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onChange={handleState}
                                        onSubmit={onSubmit}
                                        disabled={true}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the No HP"
                                                },
                                                {
                                                    pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                    message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                }
                                            ]
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <Input
                                        placeholder="cth. 628123456789"
                                        name="noHP2"
                                        id="noHP2"
                                        initialValue={data.noHP2}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onChange={handleState}
                                        onSubmit={onSubmit}
                                        disabled={true}
                                        validation={
                                            [
                                                {
                                                    required: false,
                                                },
                                                {
                                                    pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                    message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                }
                                            ]
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={8} sm={8} xs={24} style={colStyle}>
                                    <Input
                                        labelField="05. No. Telp. Rumah"
                                        placeholder="cth. 021"
                                        name="telpRumahCode"
                                        id="telpRumahCode"
                                        initialValue={data.telpRumahCode}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onChange={handleState}
                                        onSubmit={onSubmit}
                                        disabled={true}
                                        validation={
                                            [
                                                {
                                                    required: false,
                                                },
                                                {
                                                    pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                    message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                }
                                            ]
                                        }
                                    />
                                </Col>
                                <Col md={16} sm={16} xs={24} style={{...colStyle, marginTop:17}}>
                                    <div style={{width:'96%'}}>
                                        <Input
                                            placeholder="cth. 4281234"
                                            name="telpRumah"
                                            id="telpRumah"
                                            initialValue={data.telpRumah}
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onChange={handleState}
                                            onSubmit={onSubmit}
                                            disabled={true}
                                            validation={
                                                [
                                                    {
                                                        required: false,
                                                    },
                                                    {
                                                        pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                        message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                    }
                                                ]
                                            }
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <Input
                                        labelField="06. Email"
                                        name="email"
                                        id="email"
                                        initialValue={data.email}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onChange={handleState}
                                        onSubmit={onSubmit}
                                        disabled={true}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Email"
                                                }
                                            ]
                                        }
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={8} sm={8} xs={24} style={colStyle}>
                            <div style={{ display: 'flex', marginTop: 20 }}>
                                <img loading="lazy" style={{ maxWidth: 200, maxHeight: 200 }} src={(data.Photo !== "" ? (validatePhoto === "object" ? data.photoUrl : data.Photo) : ImgUser)} />
                                <div style={{ marginLeft: 20 }}>
                                    <Upload accept="image/*" showUploadList={false} beforeUpload={this.onUpload} multiple={false}>
                                        <Button disabled={true} type="primary"><Icon type="upload" />Re-Upload Photo</Button>
                                    </Upload>
                                    <br />
                                    <br />
                                    <p>Allowed Image File Extension: jpg, jpeg, png, jif, gif, bpm, tif</p>
                                    <p>Maximum File Size: 2 MB</p>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Form>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24} style={{paddingTop:40, paddingBottom:20}}>
                                <div style={{backgroundColor:'#bfbfbf', padding:5,}}>
                                    <h3>B. PENDIDIKAN</h3>
                                </div>
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24}>
                                <div style={{paddingTop:5, paddingBottom:10}}>
                                    <h4>01. Pendidikan Formal</h4>
                                </div>
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24}>
                                <Col md={12} sm={12} xs={12}>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Select
                                            labelField="Tingkat"
                                            name="tingkat"
                                            id="tingkat"
                                            formItemLayout={formItemLayoutSelect}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onSubmit={onSubmit}
                                            initialValue={this.state.tingkat}
                                            onChange={(e) => this.handleStateForm('tingkat', e)}
                                            data={source.Degree}
                                            disabled={true}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Tingkat"
                                                    },
                                                ]
                                            }
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Select
                                            labelField="Nama Institusi"
                                            name="namaInstitusi"
                                            id="namaInstitusi"
                                            formItemLayout={formItemLayoutSelect}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onSubmit={onSubmit}
                                            initialValue={this.state.namaInstitusi}
                                            onChange={(e, name) => this.handleStateForm('namaInstitusi', e)}
                                            data={source.Institute}
                                            disabled={true}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Nama Institusi"
                                                    },
                                                ]
                                            }
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Input
                                            name="namaInstitusiOthers"
                                            id="namaInstitusiOthers"
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onSubmit={onSubmit}
                                            initialValue={this.state.namaInstitusiOthers}
                                            onChange={(e) => this.handleStateForm('namaInstitusiOthers', e)}
                                            disabled={true}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Nama Institusi Others"
                                                    },
                                                ]
                                            }
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Select
                                            labelField="Kota"
                                            name="kota"
                                            id="kota"
                                            formItemLayout={formItemLayoutSelect}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onSubmit={onSubmit}
                                            initialValue={this.state.kota}
                                            onChange={(e) => this.handleStateForm('kota', e)}
                                            data={source.City}
                                            disabled={true}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Kota"
                                                    },
                                                ]
                                            }
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Input
                                            name="kotaOthers"
                                            id="kotaOthers"
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onSubmit={onSubmit}
                                            initialValue={this.state.kotaOthers}
                                            onChange={(e) => this.handleStateForm('kotaOthers', e)}
                                            data={source.City}
                                            disabled={true}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Kota Others"
                                                    },
                                                ]
                                            }
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24}>
                                        <Select
                                            labelField="Jurusan"
                                            name="jurusan"
                                            id="jurusan"
                                            formItemLayout={formItemLayoutSelect}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onSubmit={onSubmit}
                                            initialValue={this.state.jurusan}
                                            onChange={(e) => this.handleStateForm('jurusan', e)}
                                            data={source.Major}
                                            disabled={true}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Jurusan"
                                                    },
                                                ]
                                            }
                                        />
                                    </Col>
                                </Col>
                                <Col md={12} sm={12} xs={12}>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <Input
                                            labelField="Program Studi"
                                            placeholder="cth. Teknik Informatika"
                                            name="programStudi"
                                            id="programStudi"
                                            initialValue={this.state.programStudi}
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onChange={this.handleStateForm}
                                            onSubmit={onSubmit}
                                            disabled={true}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Program Studi"
                                                    },
                                                ]
                                            }
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <DatepickerMode
                                            labelField="Tahun Masuk"
                                            disabled={true}
                                            name="tahunMasuk"
                                            id="tahunMasuk"
                                            mode="year"
                                            initialValue={this.state.tahunMasuk}
                                            formItemLayout={formItemLayoutDate}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onSubmit={onSubmit}
                                            onChange={(e, value) => this.handleStateForm('tahunMasuk', value)}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Tahun Masuk"
                                                    },
                                                ]
                                            }
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24} style={colStyle}>
                                        <DatepickerMode
                                            labelField={<div>Tahun Lulus <span style={{fontStyle:'italic'}}>(or Perkiraan Tahun Lulus)</span></div>}
                                            disabled={true}
                                            name="tahunLulus"
                                            id="tahunLulus"
                                            mode="year"
                                            initialValue={this.state.tahunLulus}
                                            formItemLayout={formItemLayoutDate}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            onSubmit={onSubmit}
                                            onChange={(e, value) => this.handleStateForm('tahunLulus', value)}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Tahun Lulus"
                                                    }
                                                ]
                                            }
                                        />
                                    </Col>
                                    <Col md={24} sm={24} xs={24}>
                                        <Row justify="start">
                                            <Col md={12} sm={12} xs={24}>
                                                <Input
                                                    labelField="GPA/NEM"
                                                    name="gpaNem"
                                                    id="gpaNem"
                                                    initialValue={this.state.gpaNem}
                                                    formItemLayout={formItemLayout}
                                                    disabled={true}
                                                    getFieldDecorator={getFieldDecorator}
                                                    Form={Form}
                                                    onChange={this.handleStateForm}
                                                    onSubmit={onSubmit}
                                                    validation={
                                                        [
                                                            {
                                                                required: true,
                                                                message: "Please enter the GPA/NEM"
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
                                                <div style={{width: '92%'}}>
                                                    <Input
                                                        labelField="out of"
                                                        name="outOf"
                                                        id="outOf"
                                                        initialValue={this.state.outOf}
                                                        formItemLayout={formItemLayout}
                                                        getFieldDecorator={getFieldDecorator}
                                                        disabled={true}
                                                        Form={Form}
                                                        onChange={(e) => this.handleStateForm('outOf', e)}
                                                        onSubmit={onSubmit}
                                                        validation={
                                                            [
                                                                {
                                                                    required: false,
                                                                },
                                                                {
                                                                    pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                                    message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                                }
                                                            ]
                                                        }
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Col>
                            </Col>
                        </Row>

                        <Row justify="start">
                            <Col md={24} sm={24} xs={24}>
                                <Button disabled={true} type="primary" htmlType="submit">Tambah Pendidikan</Button>
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24} style={{ padding: 20 }}>
                                <Table
                                    columns={columnsEducation}
                                    dataSource={data.tablePendidikan}
                                    pagination={false}
                                />
                            </Col>
                        </Row>
                    </Form>

                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <div style={{paddingTop:5, paddingBottom:10}}>
                                <h4>02. Karya Ilmiah</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <div style={{paddingTop:5, paddingBottom:10}}>
                                <h4>a. Skripsi/Tugas Akhir</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Input
                                labelField="Judul"
                                placeholder="cth. Pengembangan Aplikasi Recruitment"
                                name="judulSkripsi"
                                id="judulSkripsi"
                                initialValue={data.judulSkripsi}
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                disabled={true}
                                Form={Form}
                                onChange={handleState}
                                onSubmit={onSubmit}
                                validation={
                                    [
                                        {
                                            required: true,
                                            message: "Please enter the Judul"
                                        }
                                    ]
                                }
                            />
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Input
                                labelField="Tautan"
                                placeholder="cth. wwww.career.astra.co.id/linkskripsi"
                                name="tautanSkripsi"
                                id="tautanSkripsi"
                                initialValue={data.tautanSkripsi}
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                disabled={true}
                                Form={Form}
                                onChange={handleState}
                                onSubmit={onSubmit}
                                validation={
                                    [
                                        {
                                            required: false,
                                        }
                                    ]
                                }
                            />
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <h4>b. Publikasi</h4>
                            <Radio.Group style={isFLKSubmit ? { marginTop: 10, marginBottom: '24px' } : { marginTop: 10 }}
                                disabled={true} onChange={(e) => {handleState('publikasi', e.target.value)}} value={data.publikasi}>
                                <Radio value="Jurnal">Jurnal</Radio>
                                <Radio value="Artikel">Artikel</Radio>
                                <Radio value="Karya Tulis">Karya Tulis</Radio>
                                <Radio value="Blog">Blog</Radio>
                                <Radio value="Buku">Buku</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Input
                                labelField="Judul"
                                placeholder="cth. Pengembangan Aplikasi Recruitment"
                                name="judulPublikasi"
                                id="judulPublikasi"
                                initialValue={data.judulPublikasi}
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                disabled={true}
                                Form={Form}
                                onChange={handleState}
                                onSubmit={onSubmit}
                                validation={
                                    [
                                        {
                                            required: true,
                                            message: "Please enter the Judul"
                                        }
                                    ]
                                }
                            />
                        </Col>
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Input
                                labelField="Tautan"
                                placeholder="cth. www.career.astra.co.id/linkjurnal"
                                name="tautanPublikasi"
                                id="tautanPublikasi"
                                initialValue={data.tautanPublikasi}
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                disabled={true}
                                Form={Form}
                                onChange={handleState}
                                onSubmit={onSubmit}
                                validation={
                                    [
                                        {
                                            required: false,
                                        }
                                    ]
                                }
                            />
                        </Col>
                    </Row>

                    <Form>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24}>
                                <div style={{paddingTop:5, paddingBottom:10}}>
                                    <h4>03. Pendidikan Informal terkait Program Studi (Pelatihan/Sertifikasi)</h4>
                                </div>
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={12} sm={12} xs={24} style={colStyle}>
                                <Input
                                    labelField="Nama Program"
                                    placeholder="cth. Business Analyst Sertification"
                                    name="namaProgram"
                                    id="namaProgram"
                                    initialValue={this.state.namaProgram}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    disabled={true}
                                    Form={Form}
                                    onChange={this.handleStateForm}
                                    onSubmit={onSubmit}
                                    validation={
                                        [
                                            {
                                                required: true,
                                                message: "Please enter the Nama Program"
                                            }
                                        ]
                                    }
                                />
                            </Col>
                            <Col md={12} sm={12} xs={24} style={colStyle}>
                                <DatepickerMode
                                    labelField="Tahun"
                                    disabled={true}
                                    name="tahun"
                                    id="tahun"
                                    mode="year"
                                    initialValue={this.state.tahun}
                                    formItemLayout={formItemLayoutDate}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onSubmit={onSubmit}
                                    onChange={(e, value) => this.handleStateForm('tahun', value)}
                                    validation={
                                        [
                                            {
                                                required: true,
                                                message: "Please enter the Tahun"
                                            }
                                        ]
                                    }
                                />
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={12} sm={12} xs={24}>
                                <Input
                                    labelField="Penyelenggara"
                                    placeholder="cth. Menkominfo"
                                    name="penyelenggara"
                                    id="penyelenggara"
                                    initialValue={this.state.penyelenggara}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    disabled={true}
                                    Form={Form}
                                    onChange={this.handleStateForm}
                                    onSubmit={onSubmit}
                                    validation={
                                        [
                                            {
                                                required: true,
                                                message: "Please enter the Penyelenggara"
                                            },
                                        ]
                                    }
                                />
                            </Col>
                            <Col md={12} sm={12} xs={24}>
                                <Input
                                    labelField="Keterangan"
                                    name="keterangan"
                                    id="keterangan"
                                    initialValue={this.state.keterangan}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    disabled={true}
                                    Form={Form}
                                    onChange={this.handleStateForm}
                                    onSubmit={onSubmit}
                                    validation={
                                        [
                                            {
                                                required: false,
                                            },
                                        ]
                                    }
                                />
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24}>
                                <Button disabled={true} type="primary" htmlType="submit">Tambah Pelatihan/Sertifikasi</Button>
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24} style={{ padding: 20 }}>
                                <Table
                                    columns={columnsSertifikasi}
                                    dataSource={data.tablePelatihan}
                                    pagination={false}
                                />
                            </Col>
                        </Row>
                    </Form>

                    <Form>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24}>
                                <div style={{paddingTop:5, paddingBottom:20}}>
                                    <h4>04. Pengalaman Organisasi Kemahasiswaan Non-Kepanitiaan</h4>
                                    <h4 style={{marginLeft:23}}>(contoh: Badan Eksekutif, Himpunan, Unit Kegiatan Mahasiswa)</h4>
                                </div>
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={12} sm={12} xs={24} style={colStyle}>
                                <Input
                                    labelField="Nama Organisasi"
                                    placeholder="cth. Eksekutif Mahasiswa"
                                    name="namaOrganisasi"
                                    id="namaOrganisasi"
                                    initialValue={this.state.namaOrganisasi}
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    disabled={true}
                                    Form={Form}
                                    onChange={this.handleStateForm}
                                    onSubmit={onSubmit}
                                    validation={
                                        [
                                            {
                                                required: true,
                                                message: "Please enter the Nama Organisasi"
                                            }
                                        ]
                                    }
                                />
                            </Col>
                            <Col md={12} sm={12} xs={24} style={colStyle}>
                                <Select
                                    labelField="Lingkup"
                                    name="lingkup"
                                    id="lingkup"
                                    formItemLayout={formItemLayoutSelect}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    onSubmit={onSubmit}
                                    initialValue={this.state.lingkup}
                                    onChange={(e) => this.handleStateForm('lingkup', e)}
                                    data={source.OrganizationScope}
                                    disabled={true}
                                    validation={
                                        [
                                            {
                                                required: true,
                                                message: "Please enter the Lingkup"
                                            },
                                        ]
                                    }
                                />
                            </Col>
                        </Row>

                        <Row justify="start">
                            <Col md={12} sm={12} xs={12}>
                                <div style={{width:'100%'}}>
                                    <Select
                                        labelField="Jabatan"
                                        name="jabatan"
                                        id="jabatan"
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onSubmit={onSubmit}
                                        initialValue={this.state.jabatan}
                                        onChange={(e) => this.handleStateForm('jabatan', e)}
                                        data={source.OrganizationTitle}
                                        disabled={true}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Jabatan"
                                                },
                                            ]
                                        }
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24}>
                                <Button disabled={true} type="primary" htmlType="submit">Tambah Organisasi</Button>
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24} style={{ padding: 20 }}>
                                <Table
                                    columns={columnsOrganisasi}
                                    dataSource={data.tableOrganisasi}
                                    pagination={false}
                                />
                            </Col>
                        </Row>
                    </Form>

                    <div style={{ textAlign: 'right', marginTop: 20 }}>
                        <Row justify="start">
                            <Col md={12} sm={12} xs={12} style={{ paddingBottom: 20 }}>
                                <span style={{ fontSize: 20 }}>1/3</span>
                            </Col>
                            <Col md={12} sm={12} xs={12} style={{ paddingBottom: 20 }}>
                                <Icon onClick={() => handleStatePosisi(2)} style={{ cursor: 'pointer' }} type="right-circle" style={{ fontSize: 30 }} />
                            </Col>
                        </Row>
                    </div>
                </div>
            </>
        )
    }
}


const WrappedForm = Form.create()(Form1);
export default WrappedForm