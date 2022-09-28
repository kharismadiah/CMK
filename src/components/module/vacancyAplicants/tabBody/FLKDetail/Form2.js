import React, { Component } from 'react';
import { Col, Row, Icon, Radio, Table } from 'antd';

import Form from '../../../../uielements/form'
import Input from '../../../../CustomComponentAntd/customInput';
import Button from '../../../../uielements/button';
import Select from '../../../../CustomComponentAntd/customSelect';
import Datepicker from '../../../../CustomComponentAntd/customDatePicker';
import DatepickerMode from '../../../../CustomComponentAntd/customDatePickerMode';
import TextArea from '../../../../CustomComponentAntd/customTextArea';
import ButtonGroup from 'antd/lib/button/button-group';

class Form2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onSubmit: false,
            degree: '',
            startYear: '',
            institute: '',
            graduatedYear: '',
            major: '',
            gpaNem: '',
            outOf: '',

            structure: '',
            dateOfBirth: '',
            name: '',
            education: '',
            gender: 'Male',
            occupation: '',

            //Magang
            internInstitutionName: '',
            internStartDate: '',
            internEndDate: '',
            internDesc: '',

            companyName:'',

            //Kerja
            namaInstitusi: '',
            jabatan: '',
            posisi: '',
            tipePosisi: '',
            descPekerjaan1: '',
            descPekerjaan2: '',
            descPekerjaan3: '',
            bidangKerja1: '',
            bidangKerja2: '',
            bidangKerja3: '',
            industri: '',
            industriDesc: '',
            tahunMulai: '',
            tahunSelesai: '',
            gajiTerakhir:'',
        }
    }

    handleSetData = (property, value) => {
    }

    render() {
        const { data, handleStatePosisi, handleState, source } = this.props
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

        const columnsMagang = [
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
                title: 'Nama Institusi',
                dataIndex: 'InternInstitutionName',
            },
            {
                title: 'Tanggal Mulai',
                dataIndex: 'InternStartDate',
            },
            {
                title: 'Tanggal Selesai',
                dataIndex: 'InternEndDate',
            },
        ];

        const columnsPengalaman = [
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
                title: 'Nama Institusi',
                dataIndex: 'namaInstitusi',
            },
            {
                title: 'Jabatan',
                dataIndex: 'jabatan',
            },
            {
                title: 'Deskripsi Pekerjaan',
                dataIndex: 'descPekerjaan1',
            },
            {
                title: 'Tahun Mulai',
                dataIndex: 'tahunMulai',
            },
            {
                title: 'Tahun Selesai',
                dataIndex: 'tahunSelesai',
            },
            {
                title: 'Gaji Terakhir',
                dataIndex: 'gajiTerakhir',
            },
        ];

        const columnsFamily = [
            {
                title: 'Structure',
                dataIndex: 'structureName',
            },
            {
                title: 'Name',
                dataIndex: 'name',
            },
            {
                title: 'M/F',
                dataIndex: 'gender',
            },
            {
                title: 'Date of Birth',
                dataIndex: 'dateOfBirth',
            },
            {
                title: 'Education',
                dataIndex: 'education',
            },
            {
                title: 'Occupation',
                dataIndex: 'occupation',
            },
            {
                title: 'Action',
                dataIndex: 'action',
                render: (text, data, idx) => (
                    <Button disabled={true}>
                        <Icon type="delete" style={{ fontSize: 20 }} />
                    </Button>
                ),
                width: 100,
            },
        ];

        return (
            <div style={{ marginTop: 30 }}>
                <Row justify="start">
                    <Col md={24} sm={24} xs={24} style={{paddingTop:40, paddingBottom:20}}>
                        <div style={{backgroundColor:'#bfbfbf', padding:5}}>
                            <h3>C. KELUARGA</h3>
                        </div>
                    </Col>
                </Row>

                
                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <Col md={4} sm={4} xs={24} style={colStyle}>
                            <h4>01. Status Pernikahan</h4>
                            <Radio.Group style={{ marginTop: 10, marginBottom: '24px' }}
                                disabled={true} onChange={(e) => {handleState('statusPernikahan', e.target.value)}} value={data.statusPernikahan}>
                                <Radio value="Lajang">Lajang</Radio>
                                <Radio value="Menikah">Menikah</Radio>
                            </Radio.Group>
                        </Col>
                    </Col>
                </Row>
                {
                    data.statusPernikahan === "Menikah" ?
                        <Row justify="start">
                            <Col md={24} sm={24} xs={24}>
                                <Col md={12} sm={12} xs={24} style={colStyle}>
                                    <div style={{width:'99%'}}>
                                        <Datepicker
                                            labelField="Sejak Tahun"
                                            disabled={true}
                                            name="sejakTahun"
                                            id="sejakTahun"
                                            initialValue={data.sejakTahun}
                                            formItemLayout={formItemLayoutDate}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            format={'DD/MM/YYYY'}
                                            onChange={(e, value) => this.handleStateDate('sejakTahun', value)}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Sejak Tahun"
                                                    }
                                                ]
                                            }
                                        />
                                    </div>
                                </Col>
                            </Col>
                        </Row>
                    : null
                }
                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <div style={{paddingTop:5, paddingBottom:10}}>
                            <h4>02. Keluarga</h4>
                        </div>
                    </Col>
                </Row>
                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <Col md={4} sm={4} xs={24} style={colStyle}>
                            <Input
                                labelField="Anak ke"
                                name="anakKe"
                                id="anakKe"
                                initialValue={data.anakKe}
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                onChange={handleState}
                                disabled={true}
                                onSubmit={onSubmit}
                                validation={
                                    [
                                        {
                                            required: true,
                                            message: "Please enter the Anak ke"
                                        },
                                        {
                                            pattern: new RegExp(/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g),
                                            message: "Sorry, only numbers (0-9) are allowed!"
                                        }
                                    ]
                                }
                            />
                        </Col>
                        <Col md={1} sm={1} xs={24} style={colStyle}>
                            <h4 style={{paddingTop:25}}>dari</h4>
                        </Col>
                        <Col md={4} sm={4} xs={24} style={colStyle}>
                            <div style={{marginTop:15}}>
                                <Input
                                    name="jumlahSaudara"
                                    id="jumlahSaudara"
                                    initialValue={data.jumlahSaudara}
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
                                                message: "Please enter the Jumlah Saudara"
                                            },
                                            {
                                                pattern: new RegExp(/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g),
                                                message: "Sorry, only numbers (0-9) are allowed!"
                                            }
                                        ]
                                    }
                                />
                                
                            </div>
                        </Col>
                        <Col md={3} sm={3} xs={24} style={colStyle}>
                            <h4 style={{paddingTop:25}}>bersaudara</h4>
                        </Col>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <Col md={12} sm={12} xs={24}>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24}>
                                    <div style={{paddingTop:5, paddingBottom:10}}>
                                        <h4>a. Ayah</h4>
                                    </div>
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={4} sm={4} xs={4} style={colStyle}>
                                    <Select
                                        labelField="Nama"
                                        name="titleAyah"
                                        id="titleAyah"
                                        initialValue={data.titleAyah}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        data={source.FamilyTitle}
                                        onChange={handleState}
                                        disabled={true}
                                        onSubmit={onSubmit}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Family Title"
                                                },
                                                {
                                                    pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                    message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                }
                                            ]
                                        }
                                    />
                                </Col>
                                <Col md={20} sm={20} xs={20} style={{marginBottom: '-10px', marginTop: '17px'}}>
                                    <Input
                                        name="namaAyah"
                                        id="namaAyah"
                                        initialValue={data.namaAyah}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onChange={handleState}
                                        disabled={true}
                                        onSubmit={onSubmit}
                                        width={'134%'}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Nama Ayah"
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
                                        labelField="Usia"
                                        name="usiaAyah"
                                        id="usiaAyah"
                                        initialValue={data.usiaAyah}
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
                                                    message: "Please enter the Usia Ayah"
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
                                    <Select
                                        labelField="Pendidikan Terakhir"
                                        name="pendidikanTerakhirAyah"
                                        id="pendidikanTerakhirAyah"
                                        initialValue={data.pendidikanTerakhirAyah}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        data={source.Degree}
                                        onChange={handleState}
                                        disabled={true}
                                        onSubmit={onSubmit}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Pendidikan Terakhir Ayah"
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
                                    <Select
                                        labelField="Pekerjaan"
                                        name="pekerjaanAyah"
                                        id="pekerjaanAyah"
                                        initialValue={data.pekerjaanAyah}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        disabled={true}
                                        Form={Form}
                                        onChange={handleState}
                                        onSubmit={onSubmit}
                                        data={source.Occupation}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Pekerjaan Ayah"
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
                        </Col>
                        <Col md={12} sm={12} xs={24}>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24}>
                                    <div style={{paddingTop:5, paddingBottom:10}}>
                                        <h4>b. Ibu</h4>
                                    </div>
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={4} sm={4} xs={4} style={colStyle}>
                                    <Select
                                        labelField="Nama"
                                        name="titleIbu"
                                        id="titleIbu"
                                        initialValue={data.titleIbu}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        data={source.FamilyTitle}
                                        onChange={handleState}
                                        disabled={true}
                                        onSubmit={onSubmit}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Family Title"
                                                },
                                                {
                                                    pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                    message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                }
                                            ]
                                        }
                                    />
                                </Col>
                                <Col md={20} sm={20} xs={20} style={{marginBottom: '-10px', marginTop: '17px'}}>
                                    <Input
                                        name="namaIbu"
                                        id="namaIbu"
                                        initialValue={data.namaIbu}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onChange={handleState}
                                        disabled={true}
                                        width={'134%'}
                                        onSubmit={onSubmit}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Nama Ibu"
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
                                        labelField="Usia"
                                        name="usiaIbu"
                                        id="usiaIbu"
                                        initialValue={data.usiaIbu}
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
                                                    message: "Please enter the Usia Ibu"
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
                                    <Select
                                        labelField="Pendidikan Terakhir"
                                        name="pendidikanTerakhirIbu"
                                        id="pendidikanTerakhirIbu"
                                        initialValue={data.pendidikanTerakhirIbu}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        data={source.Degree}
                                        onChange={handleState}
                                        disabled={true}
                                        onSubmit={onSubmit}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Pendidikan Terakhir Ibu"
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
                                    <Select
                                        labelField="Pekerjaan"
                                        name="pekerjaanIbu"
                                        id="pekerjaanIbu"
                                        initialValue={data.pekerjaanIbu}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        disabled={true}
                                        Form={Form}
                                        data={source.Occupation}
                                        onChange={handleState}
                                        onSubmit={onSubmit}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Pekerjaan Ibu"
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
                        </Col>
                    </Col>
                </Row>
                
                <Form>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={{paddingTop:40, paddingBottom:20}}>
                            <div style={{backgroundColor:'#bfbfbf', padding:5}}>
                                <h3>D. PENGALAMAN</h3>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <div style={{paddingTop:5, paddingBottom:10}}>
                                <h4>01. Magang/Praktek Kerja Lapangan(PKL)</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col md={12} sm={12} xs={24}>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <Input
                                        labelField="Nama Institusi"
                                        name="internInstitutionName"
                                        id="internInstitutionName"
                                        initialValue={this.state.internInstitutionName}
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
                                                    message: "Please enter the Nama Institusi"
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
                                    <div style={{width:'99%'}}>
                                        <Datepicker
                                            labelField="Tanggal Mulai"
                                            disabled={true}
                                            name="internStartDate"
                                            id="internStartDate"
                                            initialValue={this.state.internStartDate}
                                            formItemLayout={formItemLayoutDate}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            format={'DD/MM/YYYY'}
                                            onSubmit={onSubmit}
                                            onChange={this.handleSetData}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Tanggal Mulai"
                                                    }
                                                ]
                                            }
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row justify="start">
                                <Col md={24} sm={24} xs={24} style={colStyle}>
                                    <div style={{width:'99%'}}>
                                        <Datepicker
                                            labelField="Tanggal Selesai"
                                            disabled={true}
                                            name="internEndDate"
                                            id="internEndDate"
                                            initialValue={this.state.internEndDate}
                                            formItemLayout={formItemLayoutDate}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            format={'DD/MM/YYYY'}
                                            onSubmit={onSubmit}
                                            onChange={this.handleSetData}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Tanggal Selesai"
                                                    }
                                                ]
                                            }
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={12} sm={12} xs={24}>
                            <div style={{ width: '130%' }}>
                                <TextArea
                                    labelField="Deskripsi Tugas"
                                    id="internDesc"
                                    formItemLayout={formItemLayout}
                                    getFieldDecorator={getFieldDecorator}
                                    Form={Form}
                                    initialValue={this.state.internDesc}
                                    disabled={true}
                                    onChange={(e) => this.handleSetData('internDesc', e.target.value)}
                                    minRows={8}
                                    onSubmit={onSubmit}
                                    validation={
                                        [
                                            {
                                                required: true,
                                                message: "Please enter the Deskripsi Tugas"
                                            }
                                        ]
                                    }
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <Button disabled={true} type="primary" htmlType="submit">Tambah Magang/PKL</Button>
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={{ marginTop: 20 }}>
                            <Table
                                columns={columnsMagang}
                                dataSource={data.tableMagang}
                                pagination={false}
                            />
                        </Col>
                    </Row>
                </Form>
        
                <Form>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <div style={{paddingTop:5, paddingBottom:10}}>
                                <h4>02. Kerja (jika ada)</h4>
                            </div>
                        </Col>
                    </Row>

                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <Row>
                                <Col md={12} sm={12} xs={12}>
                                    <Input
                                        labelField="Nama Institusi"
                                        name="namaInstitusi"
                                        id="namaInstitusi"
                                        initialValue={this.state.namaInstitusi}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        disabled={true}
                                        Form={Form}
                                        onChange={this.handleSetData}
                                        onSubmit={onSubmit}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Nama Institusi"
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
                                    <Select
                                        labelField="Bidang Kerja"
                                        name="bidangKerja1"
                                        id="bidangKerja1"
                                        initialValue={this.state.bidangKerja1}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        data={source.Function}
                                        onChange={(e) => this.handleSetData('bidangKerja1', e)}
                                        disabled={true}
                                        onSubmit={onSubmit}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Bidang Kerja 1"
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
                        </Col>
                    </Row>

                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <Row>
                                <Col md={12} sm={12} xs={12}>
                                    <Select
                                        labelField="Jabatan"
                                        name="jabatan"
                                        id="jabatan"
                                        initialValue={this.state.jabatan}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        data={source.OrganizationTitle}
                                        onChange={(e) => this.handleSetData('jabatan', e)}
                                        disabled={true}
                                        onSubmit={onSubmit}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Jabatan"
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
                                    <Select
                                        labelField="Bidang Kerja 2"
                                        name="bidangKerja2"
                                        id="bidangKerja2"
                                        initialValue={this.state.bidangKerja2}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        data={source.Function}
                                        onChange={(e) => this.handleSetData('bidangKerja2', e)}
                                        disabled={true}
                                        onSubmit={onSubmit}
                                        validation={
                                            [
                                                {
                                                    pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                    message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                }
                                            ]
                                        }
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <Row>
                                <Col md={12} sm={12} xs={12}>
                                    <Input
                                        labelField="Posisi"
                                        name="posisi"
                                        id="posisi"
                                        initialValue={this.state.posisi}
                                        formItemLayout={formItemLayout}
                                        getFieldDecorator={getFieldDecorator}
                                        disabled={true}
                                        Form={Form}
                                        onChange={this.handleSetData}
                                        onSubmit={onSubmit}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Posisi"
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
                                    <Select
                                        labelField="Bidang Kerja 3"
                                        name="bidangKerja3"
                                        id="bidangKerja3"
                                        initialValue={this.state.bidangKerja3}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        data={source.Function}
                                        onChange={(e) => this.handleSetData('bidangKerja3', e)}
                                        disabled={true}
                                        onSubmit={onSubmit}
                                        validation={
                                            [
                                                {
                                                    pattern: new RegExp(/^[a-zA-Z0-9 \/&-]*$/g),
                                                    message: "Sorry, only letters (a-z), numbers (0-9) are allowed!"
                                                }
                                            ]
                                        }
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <Row>
                                <Col md={12} sm={12} xs={12}>
                                    <Select
                                        labelField="Tipe Posisi"
                                        name="tipePosisi"
                                        id="tipePosisi"
                                        initialValue={this.state.tipePosisi}
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        data={source.PositionType}
                                        onChange={(e) => this.handleSetData('tipePosisi', e)}
                                        disabled={true}
                                        onSubmit={onSubmit}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Jabatan"
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
                                    <Select
                                        labelField="Industri"
                                        name="industri"
                                        id="industri"   
                                        formItemLayout={formItemLayoutSelect}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onSubmit={onSubmit}
                                        initialValue={this.state.industri}
                                        disabled={true}
                                        onChange={(e) => this.handleSetData('industri', e)}
                                        data={source.Industry}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Industri"
                                                },
                                            ]
                                        }
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <Row>
                                <Col md={12} sm={12} xs={12}>
                                    <div style={{ width: '137%' }}>
                                        <TextArea
                                            labelField="Deskripsi Pekerjaan"
                                            placeholder="Silakan mengisi deskripsi pekerjaan Anda pada kolom berikut terlebih dahulu"
                                            id="descPekerjaan1"
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            minRow={3}
                                            initialValue={this.state.descPekerjaan1}
                                            disabled={true}
                                            onSubmit={onSubmit}
                                            onChange={(e) => this.handleSetData('descPekerjaan1', e.target.value)}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Deskripsi Pekerjaan"
                                                    }
                                                ]
                                            }
                                        />
                                    </div>
                                </Col>
                                <Col md={12} sm={12} xs={12}>
                                    <div style={{marginTop:15}}>
                                        <Input
                                            name="industriDesc"
                                            id="industriDesc"
                                            initialValue={this.state.industriDesc}
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            disabled={true}
                                            Form={Form}
                                            onChange={this.handleSetData}
                                            onSubmit={onSubmit}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Industri Others"
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
                    </Row>

                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <Row>
                                <Col md={12} sm={12} xs={12}>
                                    <div style={{ width: '137%' }}>
                                        <TextArea
                                            labelField="Deskripsi Pekerjaan (Lanjutan 2)"
                                            placeholder="Silakan mengisi deskripsi pekerjaan Anda pada kolom Deskripsi Pekerjaan terlebih dahulu"
                                            id="descPekerjaan2"
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            minRow={3}
                                            initialValue={this.state.descPekerjaan2}
                                            disabled={true}
                                            onChange={(e) => this.handleSetData('descPekerjaan2', e.target.value)}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Deskripsi Pekerjaan 2"
                                                    }
                                                ]
                                            }
                                        />
                                    </div>
                                </Col>
                                <Col md={12} sm={12} xs={12}>
                                    <DatepickerMode
                                        labelField="Tahun Mulai"
                                        disabled={true}
                                        name="tahunMulai"
                                        id="tahunMulai"
                                        mode="month"
                                        format={'MM/YYYY'}
                                        onSubmit={onSubmit}
                                        initialValue={this.state.tahunMulai}
                                        formItemLayout={formItemLayoutDate}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onChange={this.handleSetData.bind(this)}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Tahun Mulai"
                                                }
                                            ]
                                        }
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <Row>
                                <Col md={12} sm={12} xs={12}>
                                    <div style={{ width: '137%' }}>
                                        <TextArea
                                            labelField="Deskripsi Pekerjaan (Lanjutan 3)"
                                            placeholder="Silakan mengisi deskripsi pekerjaan Anda pada kolom Deskripsi Pekerjaan dan Deskripsi pekerjaan (Lanjutan 1) terlebih dahulu"
                                            id="deskripsiPekerjaan3"
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            minRow={3}
                                            initialValue={this.state.descPekerjaan3}
                                            disabled={true}
                                            onChange={(e) => this.handleSetData('descPekerjaan3', e.target.value)}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Deskripsi Pekerjaan"
                                                    }
                                                ]
                                            }
                                        />
                                    </div>
                                </Col>
                                <Col md={12} sm={12} xs={12}>
                                    <DatepickerMode
                                        labelField="Tahun Selesai"
                                        disabled={true}
                                        name="tahunSelesai"
                                        id="tahunSelesai"
                                        mode="month"
                                        format={'MM/YYYY'}
                                        onSubmit={onSubmit}
                                        initialValue={this.state.tahunSelesai}
                                        formItemLayout={formItemLayoutDate}
                                        getFieldDecorator={getFieldDecorator}
                                        Form={Form}
                                        onChange={this.handleSetData.bind(this)}
                                        validation={
                                            [
                                                {
                                                    required: true,
                                                    message: "Please enter the Tahun Selesai"
                                                }
                                            ]
                                        }
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <Row>
                                <Col md={12} sm={12} xs={12}>
                                    <div style={{ width: '137%' }}>
                                        <TextArea
                                            labelField="Perbaikan (improvement) yang pernah dilakukan terkait pekerjaan diatas"
                                            placeholder="Improvement"
                                            id="improvement"
                                            formItemLayout={formItemLayout}
                                            getFieldDecorator={getFieldDecorator}
                                            Form={Form}
                                            initialValue={this.state.improvement}
                                            disabled={true}
                                            onChange={(e) => this.handleSetData('improvement', e.target.value)}
                                            validation={
                                                [
                                                    {
                                                        required: true,
                                                        message: "Please enter the Deskripsi Improvement"
                                                    }
                                                ]
                                            }
                                        />
                                    </div>
                                </Col>
                                <Col md={12} sm={12} xs={12}>
                                    <Input
                                        labelField="Gaji Terakhir"
                                        name="gajiTerakhir"
                                        id="gajiTerakhir"
                                        initialValue=""
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
                                                    message: "Please enter the Gaji"
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
                        </Col>
                    </Row>

                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <Row>
                                <Col offset={12} md={12} sm={12} xs={12}>
                                    <Input
                                        labelField="Jumlah Bawahan Langsung"
                                        name="jumlahBawahan"
                                        id="jumlahBawahan"
                                        initialValue=""
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
                                                    message: "Please enter the Jumlah Bawahan"
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
                        </Col>
                    </Row>
                    
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24}>
                            <Button disabled={true} type="primary" htmlType="submit">Tambah Pengalaman Kerja</Button>
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col md={24} sm={24} xs={24} style={{ marginTop: 20 }}>
                            <Table
                                columns={columnsPengalaman}
                                dataSource={data.tableJobExperience}
                                pagination={false}
                            />
                        </Col>
                    </Row>
                </Form>
                

                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <div style={{paddingTop:5, paddingBottom:10}}>
                            <h4>03. Ceritakan pengalaman ketika Saudara mengatasi permasalahan yang paling sulit</h4>
                        </div>
                    </Col>
                </Row>
                <Row justify="start">
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={{ width: '137%' }}>
                            <TextArea
                                labelField="Situasi"
                                id="problemSituasi"
                                placeholder="Situasi permasalahan"
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.problemSituasi}
                                disabled={true}
                                onChange={(e) => handleState('problemSituasi', e.target.value)}
                            />
                        </div>
                    </Col>
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={{ width: '137%' }}>
                            <TextArea
                                labelField="Tindakan"
                                id="problemTindakan"
                                placeholder="Tindakan yang dilakukan"
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.problemTindakan}
                                disabled={true}
                                onChange={(e) => handleState('problemTindakan', e.target.value)}
                            />
                        </div>
                    </Col>
                </Row>
                <Row justify="start">
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={{ width: '137%' }}>
                            <TextArea
                                labelField="Tugas"
                                id="problemTugas"
                                placeholder="Tugas dalam mengatasi permasalahan"
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.problemTugas}
                                disabled={true}
                                onChange={(e) => handleState('problemTugas', e.target.value)}
                            />
                        </div>
                    </Col>
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={{ width: '137%' }}>
                            <TextArea
                                labelField="Hasil"
                                id="problemHasil"
                                placeholder="Hasil tindakan yang dilakukan"
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.problemHasil}
                                disabled={true}
                                onChange={(e) => handleState('problemHasil', e.target.value)}
                            />
                        </div>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <div style={{paddingTop:5, paddingBottom:10}}>
                            <h4>04. Ceritakan pengalaman ketika Saudara mengatasi hambatan/tantangan yang sangat besar dalam menyelesaikan tugas</h4>
                        </div>
                    </Col>
                </Row>
                <Row justify="start">
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={{ width: '137%' }}>
                            <TextArea
                                labelField="Situasi"
                                id="obstacleSituasi"
                                placeholder="Situasi permasalahan"
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.obstacleSituasi}
                                disabled={true}
                                onChange={(e) => handleState('obstacleSituasi', e.target.value)}
                                validation={
                                    [
                                        {
                                            required: true,
                                            message: "Please enter the Situasi"
                                        }
                                    ]
                                }
                            />
                        </div>
                    </Col>
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={{ width: '137%' }}>
                            <TextArea
                                labelField="Tindakan"
                                id="obstacleTindakan"
                                placeholder="Tindakan yang dilakukan"
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.obstacleTindakan}
                                disabled={true}
                                onChange={(e) => handleState('obstacleTindakan', e.target.value)}
                                validation={
                                    [
                                        {
                                            required: true,
                                            message: "Please enter the Tindakan"
                                        }
                                    ]
                                }
                            />
                        </div>
                    </Col>
                </Row>
                <Row justify="start">
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={{ width: '137%' }}>
                            <TextArea
                                labelField="Tugas"
                                id="obstacleTugas"
                                placeholder="Tugas dalam mengatasi permasalahan"
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.obstacleTugas}
                                disabled={true}
                                onChange={(e) => handleState('obstacleTugas', e.target.value)}
                                validation={
                                    [
                                        {
                                            required: true,
                                            message: "Please enter the Tugas"
                                        }
                                    ]
                                }
                            />
                        </div>
                    </Col>
                    <Col md={12} sm={12} xs={24} style={colStyle}>
                        <div style={{ width: '137%' }}>
                            <TextArea
                                labelField="Hasil"
                                id="obstacleHasil"
                                placeholder="Hasil tindakan yang dilakukan"
                                formItemLayout={formItemLayout}
                                getFieldDecorator={getFieldDecorator}
                                Form={Form}
                                initialValue={data.obstacleHasil}
                                disabled={true}
                                onChange={(e) => handleState('obstacleHasil', e.target.value)}
                                validation={
                                    [
                                        {
                                            required: true,
                                            message: "Please enter the Hasil"
                                        }
                                    ]
                                }
                            />
                        </div>
                    </Col>
                </Row>

                <Row justify="start">
                    <Col md={24} sm={24} xs={24} style={{ paddingBottom: 20 }}>
                        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
                            <Icon onClick={() => handleStatePosisi(1)} style={{ cursor: 'pointer' }} type="left-circle" style={{ fontSize: 30 }} />
                            <span style={{ fontSize: 20 }}>2/3</span>
                            <Icon onClick={() => handleStatePosisi(3)} style={{ cursor: 'pointer' }} type="right-circle" style={{ fontSize: 30 }} />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const WrappedForm = Form.create()(Form2);
export default WrappedForm