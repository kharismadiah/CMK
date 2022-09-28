import React, { Component, Fragment } from 'react'
import { Icon, Drawer, Button, Row, Col, InputNumber } from 'antd'
import InputNonForm from './customInputNonForm'
import InputNumberNonForm from './customInputNumberNonForm'
import './customStyle.scss'

export default class DrawerVacancyTitle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowMajor: false,
            isShowUniv: false,
            isShowBranch: false,
            isShowCompany: false,
            isShowEvent: false,
            isShowGroupEvent: false,
            isShowVacancyStatus: false
        }
    }

    isShow = property => {
        this.setState({
            [property]: !this.state[property]
        })
    }

    onReset = () => {
        const { handleReset } = this.props
        this.setState({
            isShowMajor: false,
            isShowUniv: false,
            isShowBranch: false,
            isShowCompany: false,
            isShowEvent: false,
            isShowGroupEvent: false,
            isShowVacancyStatus: false
        })
        handleReset()
    }

    componentWillUnmount() {
        const { handleStateFilter, handleReset } = this.props
        handleStateFilter('search', '')
        this.setState({
            isShowMajor: false,
            isShowUniv: false,
            isShowBranch: false,
            isShowCompany: false,
            isShowEvent: false,
            isShowGroupEvent: false,
            isShowVacancyStatus: false
        })
        handleReset()
    }

    handleClick = (property, index) => {
        const {
            handleChange,
            major,
            pengalaman,
            universitas,
            reference,
            status,
            branch,
            company,
            event,
            groupEvent,
            vacancyStatus,
            onlineTestResult,
            autogeneralfilterstatuslist,
            olResultStatusList,
            emailStatusList
        } = this.props
        if (property === 'major') {
            major[index].selected = !major[index].selected
            handleChange(property, major)
        } else if (property === 'pengalaman') {
            pengalaman[index].selected = !pengalaman[index].selected
            handleChange(property, pengalaman)
        } else if (property === 'universitas') {
            universitas[index].selected = !universitas[index].selected
            handleChange(property, universitas)
        } else if (property === 'reference') {
            reference[index].selected = !reference[index].selected
            handleChange(property, reference)
        } else if (property === 'status') {
            status[index].selected = !status[index].selected
            handleChange(property, status)
        } else if (property === 'branch') {
            branch[index].selected = !branch[index].selected
            handleChange(property, branch)
        } else if (property === 'company') {
            company[index].selected = !company[index].selected
            handleChange(property, company)
        } else if (property === 'event') {
            event[index].selected = !event[index].selected
            handleChange(property, event)
        } else if (property === 'groupEvent') {
            groupEvent[index].selected = !groupEvent[index].selected
            handleChange(property, groupEvent)
        } else if (property === 'vacancyStatus') {
            vacancyStatus[index].selected = !vacancyStatus[index].selected
            handleChange(property, vacancyStatus)
        } else if (property === 'onlineTestResult') {
            onlineTestResult[index].selected = !onlineTestResult[index].selected
            handleChange(property, onlineTestResult)
        } else if (property === 'autogeneralfilterstatuslist') {
            autogeneralfilterstatuslist[index].selected = !autogeneralfilterstatuslist[index].selected
            handleChange(property, autogeneralfilterstatuslist)
        } else if (property === 'olResultStatusList') {
            olResultStatusList[index].selected = !olResultStatusList[index].selected
            handleChange(property, olResultStatusList)
        } else if (property === 'emailStatusList') {
            emailStatusList[index].selected = !emailStatusList[index].selected
            handleChange(property, emailStatusList)
        }
    }

    onChangeField = (property, value) => {
        const { handleChange } = this.props
        handleChange(property, value)
    }

    setFilterDataOnlyCountMoreThanZero = _filter => {
        if (Array.isArray(_filter) && _filter.length > 0 && _filter.every(x => typeof x.filterCount === 'number')) {
            let filteredData = _filter.filter(element => element.filterCount > 0)
            return filteredData
        }
        return []
    }

    render() {
        let {
            search,
            major,
            pengalaman,
            universitas,
            reference,
            status,
            visible,
            handleChange,
            onSubmit,
            isInterview = false,
            branch = [],
            company = [],
            event = [],
            groupEvent = [],
            vacancyStatus = [],
            gpaMin,
            gpaMax,
            onlineTestResult = [],
            autogeneralfilterstatuslist = [],
            olResultStatusList = [],

            yoeYearFrom,
            yoeMonthFrom,
            yoeYearTo,
            yoeMonthTo,
            emailStatusList
        } = this.props

        const {
            isShowMajor,
            isShowUniv,
            isShowBranch,
            isShowCompany,
            isShowEvent,
            isShowGroupEvent,
            isShowVacancyStatus
        } = this.state
        let dataEmailStatus = this.setFilterDataOnlyCountMoreThanZero(emailStatusList)
        let dataStatus = this.setFilterDataOnlyCountMoreThanZero(status)
        let dataAutogeneralfilterstatuslisttoGF = this.setFilterDataOnlyCountMoreThanZero(autogeneralfilterstatuslist) // [...autogeneralfilterstatuslist]
        let dataOlResultStatus = this.setFilterDataOnlyCountMoreThanZero(olResultStatusList) // [...olResultStatusList]
        let dataMajor = this.setFilterDataOnlyCountMoreThanZero(major) // [...major]
        let dataUniversitas = this.setFilterDataOnlyCountMoreThanZero(universitas) // [...universitas]
        if (!isShowMajor) dataMajor.splice(4)
        if (!isShowUniv) dataUniversitas.splice(4)
        let dataBranch = this.setFilterDataOnlyCountMoreThanZero(branch) // [...branch]
        let dataCompany = this.setFilterDataOnlyCountMoreThanZero(company) // [...company]
        let dataEvent = this.setFilterDataOnlyCountMoreThanZero(event) // [...event]
        let dataGroupEvent = this.setFilterDataOnlyCountMoreThanZero(groupEvent) // [...groupEvent]
        let dataVacancyStatus = this.setFilterDataOnlyCountMoreThanZero(vacancyStatus) // [...vacancyStatus]
        let dataOnlineTestResult = this.setFilterDataOnlyCountMoreThanZero(onlineTestResult) // [...onlineTestResult]
        if (!isShowBranch) dataBranch.splice(4)
        if (!isShowCompany) dataCompany.splice(4)
        if (!isShowEvent) dataEvent.splice(4)
        if (!isShowGroupEvent) dataGroupEvent.splice(4)

        return (
            <Drawer
                title={
                    <div style={{ display: 'flex' }}>
                        <div style={{ paddingTop: 5 }}>
                            <Icon type="filter" theme="filled" /> Filter
                        </div>
                        <div style={{ paddingLeft: '10px' }}>
                            <InputNonForm
                                disabled={false}
                                name="search"
                                id="search"
                                value={search}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                }
                placement="right"
                width={400}
                closable={true}
                onClose={() => handleChange('visible', false)}
                visible={visible}
                getContainer={false}
                style={{ position: 'absolute' }}
            >
                <>
                    <h3>Major</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {Array.isArray(dataMajor) &&
                            dataMajor.length > 0 &&
                            dataMajor.map((x, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="DrawerVacancyListBox"
                                        onClick={this.handleClick.bind(this, 'major', i)}
                                        style={x.selected ? { backgroundColor: '#1D90FF' } : null}
                                    >
                                        <p style={{ textAlign: 'center', margin: '0 5px' }}>{x.name}</p>
                                        <p>{x.filterCount}</p>
                                    </div>
                                )
                            })}
                        {!isShowMajor && major.length > 4 ? (
                            <div onClick={this.isShow.bind(this, 'isShowMajor')} className="drawerSeeMore">
                                See More
                            </div>
                        ) : null}
                    </div>

                    <div className="DrawerVacancyListBorderHR" />

                    <h3>Experience</h3>

                    <h5>- Start</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 8 }}>
                        <Row>
                            <Col md={6} lg={6} style={{ marginRight: 20 }}>
                                <InputNumber
                                    name="yoeYearFrom"
                                    id="yoeYearFrom"
                                    min={0}
                                    max={99}
                                    value={yoeYearFrom}
                                    onChange={val => {
                                        handleChange('yoeYearFrom', val)
                                    }}
                                />
                            </Col>
                            <Col md={3} lg={3} style={{ marginRight: 20, marginTop: 6 }}>
                                <h5>Year(s)</h5>
                            </Col>
                            <Col md={5} lg={5} style={{ marginRight: 20 }}>
                                <InputNumber
                                    name="yoeMonthFrom"
                                    id="yoeMonthFrom"
                                    min={0}
                                    max={99}
                                    value={yoeMonthFrom}
                                    onChange={val => {
                                        handleChange('yoeMonthFrom', val)
                                    }}
                                />
                            </Col>
                            <Col md={4} lg={4} style={{ marginLeft: 14, marginTop: 6 }}>
                                <h5>Month(s)</h5>
                            </Col>
                        </Row>
                    </div>
                    <h5>- End</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Row>
                            <Col md={6} lg={6} style={{ marginRight: 20 }}>
                                <InputNumber
                                    name="yoeYearTo"
                                    id="yoeYearTo"
                                    min={0}
                                    max={99}
                                    value={yoeYearTo}
                                    onChange={val => {
                                        handleChange('yoeYearTo', val)
                                    }}
                                />
                            </Col>
                            <Col md={3} lg={3} style={{ marginRight: 20, marginTop: 6 }}>
                                <h5>Year(s)</h5>
                            </Col>
                            <Col md={5} lg={5} style={{ marginRight: 20 }}>
                                <InputNumber
                                    name="yoeMonthTo"
                                    id="yoeMonthTo"
                                    min={0}
                                    max={99}
                                    value={yoeMonthTo}
                                    onChange={val => {
                                        handleChange('yoeMonthTo', val)
                                    }}
                                />
                            </Col>
                            <Col md={4} lg={4} style={{ marginLeft: 14, marginTop: 6 }}>
                                <h5>Month(s)</h5>
                            </Col>
                        </Row>
                    </div>

                    <div className="DrawerVacancyListBorderHR" />

                    <h3>Email Status</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {/* Cegah mapping error jika parent component tidak mengirim array emailStatusList */}
                        {Array.isArray(dataEmailStatus) &&
                            dataEmailStatus.length > 0 &&
                            dataEmailStatus.map((x, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="DrawerVacancyListBox"
                                        onClick={this.handleClick.bind(this, 'emailStatusList', i)}
                                        style={x.selected ? { backgroundColor: '#1D90FF' } : null}
                                    >
                                        <p style={{ textAlign: 'center', margin: '0 5px' }}>{x.name}</p>
                                        <p>{x.filterCount}</p>
                                    </div>
                                )
                            })}
                    </div>

                    <div className="DrawerVacancyListBorderHR" />

                    <h3>Reference</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {Array.isArray(reference) &&
                            reference.length > 0 &&
                            reference.map((x, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="DrawerVacancyListBox"
                                        onClick={this.handleClick.bind(this, 'reference', i)}
                                        style={x.selected ? { backgroundColor: '#1D90FF' } : null}
                                    >
                                        <p style={{ textAlign: 'center', margin: '0 5px' }}>{x.name}</p>
                                        <p>{x.filterCount}</p>
                                    </div>
                                )
                            })}
                    </div>

                    <div className="DrawerVacancyListBorderHR" />

                    <h3>Universitas</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 16 }}>
                        {Array.isArray(dataUniversitas) &&
                            dataUniversitas.length > 0 &&
                            dataUniversitas.map((x, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="DrawerVacancyListBox"
                                        onClick={this.handleClick.bind(this, 'universitas', i)}
                                        style={x.selected ? { backgroundColor: '#1D90FF' } : null}
                                    >
                                        <p style={{ textAlign: 'center', margin: '0 5px' }}>{x.name}</p>
                                        <p>{x.filterCount}</p>
                                    </div>
                                )
                            })}
                    </div>
                    {!isShowUniv && universitas.length > 4 ? (
                        <div onClick={this.isShow.bind(this, 'isShowUniv')} className="drawerSeeMore">
                            See More
                        </div>
                    ) : null}

                    <h3>Status</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 16 }}>
                        {Array.isArray(dataStatus) &&
                            dataStatus.length > 0 &&
                            dataStatus.map((x, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="DrawerVacancyListBox"
                                        onClick={this.handleClick.bind(this, 'status', i)}
                                        style={x.selected ? { backgroundColor: '#1D90FF' } : null}
                                    >
                                        <p style={{ textAlign: 'center', margin: '0 5px' }}>{x.name}</p>
                                        <p>{x.filterCount}</p>
                                    </div>
                                )
                            })}
                    </div>
                    {dataOnlineTestResult.length > 0 ? (
                        <Fragment>
                            <h3>Online Test Result</h3>
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    marginBottom: 40
                                }}
                            >
                                {dataOnlineTestResult.map((x, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className="DrawerVacancyListBox"
                                            onClick={this.handleClick.bind(this, 'onlineTestResult', i)}
                                            style={x.selected ? { backgroundColor: '#1D90FF' } : null}
                                        >
                                            <p style={{ textAlign: 'center', margin: '0 5px' }}>{x.name}</p>
                                            <p>{x.filterCount}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </Fragment>
                    ) : null}
                    <h3>GPA</h3>
                    <div style={{ display: 'flex', marginBottom: 10, marginTop: 10 }}>
                        <div>
                            <div>GPA Min</div>
                            <div>
                                <InputNumberNonForm
                                    min={0.1}
                                    name="gpaMin"
                                    value={gpaMin}
                                    onChange={this.onChangeField}
                                />
                            </div>
                        </div>
                        <div>
                            <div>GPA Max</div>
                            <div>
                                <InputNumberNonForm
                                    min={0.1}
                                    name="gpaMax"
                                    value={gpaMax}
                                    onChange={this.onChangeField}
                                />
                            </div>
                        </div>
                    </div>
                    <h3>Auto GF Status</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 40 }}>
                        {Array.isArray(dataAutogeneralfilterstatuslisttoGF) &&
                            dataAutogeneralfilterstatuslisttoGF.length > 0 &&
                            dataAutogeneralfilterstatuslisttoGF.map((x, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="DrawerVacancyListBox"
                                        onClick={this.handleClick.bind(this, 'autogeneralfilterstatuslist', i)}
                                        style={x.selected ? { backgroundColor: '#1D90FF' } : null}
                                    >
                                        <p style={{ textAlign: 'center', margin: '0 5px' }}>{x.name}</p>
                                        <p>{x.filterCount}</p>
                                    </div>
                                )
                            })}
                    </div>
                    <h3>OL Result Status</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 40 }}>
                        {Array.isArray(dataOlResultStatus) &&
                            dataOlResultStatus.length > 0 &&
                            dataOlResultStatus.map((x, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="DrawerVacancyListBox"
                                        onClick={this.handleClick.bind(this, 'olResultStatusList', i)}
                                        style={x.selected ? { backgroundColor: '#1D90FF' } : null}
                                    >
                                        <p style={{ textAlign: 'center', margin: '0 5px' }}>{x.name}</p>
                                        <p>{x.filterCount}</p>
                                    </div>
                                )
                            })}
                    </div>
                </>
                <div className="DrawerVacancyListBorderHR" />
                {/* 
                <h3>Status</h3>
                <div style={{display:'flex', flexWrap:'wrap', marginBottom:40}}>
                    {
                        status.map((x, i) => {
                            return(
                                <div key={i} className="DrawerVacancyListBox" onClick={this.handleClick.bind(this, 'status', i)} style={x.selected ? {backgroundColor: '#1D90FF'}: null}>
                                    <p style={{textAlign:'center', margin: '0 5px'}}>{x.name}</p>
                                    <p>{x.filterCount}</p>
                                </div>
                            )
                        })
                    }
                </div> */}

                <div className="DrawerFooter">
                    <Button onClick={this.onReset} style={{ marginRight: 8 }}>
                        Reset
                    </Button>
                    <Button onClick={onSubmit} type="primary">
                        Filter
                    </Button>
                </div>
            </Drawer>
        )
    }
}
