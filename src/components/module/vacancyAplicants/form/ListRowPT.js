import React, { Component } from 'react'
import { DatePicker, Checkbox, Pagination, Icon, Tooltip, Dropdown, Menu, Col } from 'antd'
import { FaRegClock, FaGraduationCap, FaRegBuilding } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import InputNonForm from '../../../CustomComponentAntd/customInputNonForm'
import { IconContext } from 'react-icons'
import Button, { ButtonGroup } from '../../../uielements/button'
import ImgDummy from '../../../../image/image-dummy.png'

export default class ListRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkAll: false
        }
    }

    handleState = (property, value, idx) => {
        const { list, handleChange } = this.props
        list[idx].checked = value.target.checked

        let checkData = list.filter(x => x.checked === value.target.checked)

        if (checkData.length === list.length) {
            this.setState({
                checkAll: value.target.checked
            })
        }

        handleChange(property, list)
    }

    handleStateAll = (property, value) => {
        const { list, handleChange } = this.props
        list.map(x => {
            x.checked = value
        })
        handleChange(property, list)
        this.setState({
            checkAll: value
        })
    }

    onChangePagging = (value, row) => {
        const { handleChange, handlePagination } = this.props
        handlePagination('current', value)
        handleChange('current', value)
    }

    onDownloadTemplate = () => {
        const { onDownloadTemplate } = this.props
        onDownloadTemplate()
    }

    onUploadTestResult = () => {
        const { handleStatePsychologicalCBT } = this.props
        // handleStatePsychologicalCBT('ApplicationId', x.ApplicationId)
        handleStatePsychologicalCBT('visible', true)
    }

    onDownloadCandidateList = () => {
        const { onDownloadApplication } = this.props
        onDownloadApplication()
    }

    render() {
        const {
            totalApplicant,
            searchList,
            list,
            current,
            total,
            handleChange,
            handleStateModalEmail,
            onDetail,
            onAction,
            handleStatePsychological,
            handleStatePsychologicalCBT,
            date,
            onTestResult,
            onViewPdf,
            showModalExtend,
            resetModal,
            onDownload,
            rolebyAuth,
            fetchDownloadFLKBatch
        } = this.props
        let checkTrue = list.filter(x => x.checked === true)
        let checkFalse = list.filter(x => x.checked === false)

        let indeterminate
        let isCBT = location.pathname.includes('psychologicalTestCBT')
        let isPsycho = location.pathname.includes('-test')

        if (checkTrue.length === list.length) {
            indeterminate = false
        } else if (checkFalse.length === list.length) {
            indeterminate = false
        } else {
            indeterminate = true
        }

        return (
            <div>
                <div className="ListRowBoxContent">
                    <div style={{ width: '100%', display: 'flex', minHeight: 50 }}>
                        <div className="ListRowBoxContentLeft">
                            <p>Check All</p>
                            <Checkbox
                                checked={this.state.checkAll}
                                onChange={e => this.handleStateAll('listData', e.target.checked)}
                                indeterminate={indeterminate}
                            />
                        </div>
                        <div className="ListRowBoxContentRight">
                            <div className="ListRowBoxHeader">
                                <div className="divCenter">Total {totalApplicant} Applicant(s)</div>
                                {checkTrue.length > 0 ? (
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Tooltip
                                            title="Pass Candidate"
                                            className="ListRowBoxIcon"
                                            onClick={() => onAction('Pass')}
                                        >
                                            <Icon
                                                type="check-circle"
                                                style={{
                                                    fontSize: 20,
                                                    display: rolebyAuth['PassFail'] == true ? 'none' : 'block'
                                                }}
                                            />
                                        </Tooltip>
                                        <Tooltip
                                            title="Failed Candidate"
                                            className="ListRowBoxIcon"
                                            onClick={() => onAction('Fail')}
                                        >
                                            <Icon
                                                type="close-circle"
                                                style={{
                                                    fontSize: 20,
                                                    display: rolebyAuth['PassFail'] == true ? 'none' : 'block'
                                                }}
                                            />
                                        </Tooltip>
                                        <Tooltip
                                            title="Cancel by Candidate"
                                            className="ListRowBoxIcon"
                                            onClick={() => onAction('CancelByCandidate')}
                                        >
                                            <Icon
                                                type="minus-circle"
                                                style={{
                                                    fontSize: 20,
                                                    display: rolebyAuth['PassFail'] == true ? 'none' : 'block'
                                                }}
                                            />
                                        </Tooltip>
                                        <Tooltip
                                            title="Candidate Pool"
                                            className="ListRowBoxIcon"
                                            onClick={() => onAction('Pool')}
                                        >
                                            <Icon
                                                type="user"
                                                style={{
                                                    fontSize: 20,
                                                    border: '0.05em solid black',
                                                    borderRadius: '12px'
                                                }}
                                            />
                                        </Tooltip>
                                        <Tooltip
                                            title="Download FLK Batch"
                                            className="ListRowBoxIcon"
                                            onClick={() => {
                                                // handleStateSubProperty(
                                                //   "modalDownloadBatchFLK",
                                                //   "visible",
                                                //   true
                                                // );
                                                fetchDownloadFLKBatch()
                                            }}
                                        >
                                            <Icon
                                                type="download"
                                                style={{
                                                    fontSize: 15,
                                                    padding: '3px',
                                                    border: '0.05em solid black',
                                                    borderRadius: '12px'
                                                }}
                                            />
                                        </Tooltip>
                                        {!isPsycho ? (
                                            <Tooltip
                                                title={isCBT ? 'Move to Non CBT' : 'Move to CBT'}
                                                className="ListRowBoxIcon"
                                                onClick={() => onAction('Move')}
                                            >
                                                <Icon
                                                    type="swap"
                                                    style={{
                                                        fontSize: 20,
                                                        display: rolebyAuth['MovetoCBT'] == true ? 'none' : 'block'
                                                    }}
                                                />
                                            </Tooltip>
                                        ) : null}

                                        {isCBT ? null : (
                                            <>
                                                <div>
                                                    {rolebyAuth['DatepickerSendInvt'] == true ? null : (
                                                        <DatePicker
                                                            value={date}
                                                            onChange={e => handleChange('date', e)}
                                                            format="DD/MM/YYYY"
                                                        />
                                                    )}
                                                </div>
                                                {date !== null ? (
                                                    <IconContext.Provider value={{ color: '#585858', size: 20 }}>
                                                        <Tooltip
                                                            title="Send Email invitation"
                                                            className="ListRowBoxIcon"
                                                            onClick={
                                                                // handleStateModalEmail
                                                               ()=> onAction('SendEmailInvitation')
                                                            }
                                                            style={{
                                                                paddingLeft: 10,
                                                                display: 'flex',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <FiSend />
                                                        </Tooltip>
                                                    </IconContext.Provider>
                                                ) : null}
                                            </>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                            <div>
                                <InputNonForm
                                    disabled={false}
                                    placeholder="Search by name"
                                    name="searchList"
                                    id="searchList"
                                    value={searchList}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {list.map((x, i) => {
                        return (
                            <div key={i} className="ListRowBoxContentMiddle">
                                <div className="ListRowBoxContentLeft">
                                    <Checkbox onChange={e => this.handleState('listData', e, i)} checked={x.checked} />
                                </div>
                                <div className="ListRowBoxContentRight">
                                    <Dropdown
                                        overlay={
                                            <Menu>
                                                <Menu.Item
                                                    key="1"
                                                    onClick={() => onDetail(x.ApplicantId, x.ApplicationId)}
                                                >
                                                    <Icon type="search" /> Detail
                                                </Menu.Item>
                                                {!isCBT ? (
                                                    x.PsychologicalTestResult ? (
                                                        <Menu.Item
                                                            key="2"
                                                            onClick={() => {
                                                                resetModal('modalPsychological')
                                                                handleStatePsychological(
                                                                    'ApplicationId',
                                                                    x.ApplicationId
                                                                )
                                                                handleStatePsychological('visible', true)
                                                                onTestResult(x.ApplicationId)
                                                            }}
                                                        >
                                                            <Icon type="upload" />
                                                            Edit Psychological Test Result
                                                        </Menu.Item>
                                                    ) : (
                                                        <Menu.Item
                                                            key="2"
                                                            style={{
                                                                display:
                                                                    rolebyAuth['UploadTestResult'] == true
                                                                        ? 'none'
                                                                        : 'block'
                                                            }}
                                                            onClick={() => {
                                                                resetModal('modalPsychological')
                                                                handleStatePsychological(
                                                                    'ApplicationId',
                                                                    x.ApplicationId
                                                                )
                                                                handleStatePsychological('visible', true)
                                                            }}
                                                        >
                                                            <Icon type="upload" />
                                                            Psychological Test Result
                                                        </Menu.Item>
                                                    )
                                                ) : null}
                                                {x.IsCandidatePool && x.IsInvited ? (
                                                    <Menu.Item
                                                        key="3"
                                                        onClick={() => {
                                                            showModalExtend('modalExtend', 'ApplicantId', x.ApplicantId)
                                                            showModalExtend('modalExtend', 'VacancyId', x.VacancyCode)
                                                            showModalExtend('modalExtend', 'visible', true)
                                                        }}
                                                    >
                                                        <Icon type="calendar" /> Extend CP
                                                    </Menu.Item>
                                                ) : null}
                                                <Menu.Item key="4" onClick={() => onDownload(x.ApplicantId)}>
                                                    <Icon type="download" /> Download FLK Form
                                                </Menu.Item>
                                            </Menu>
                                        }
                                    >
                                        <div
                                            style={{
                                                position: 'absolute',
                                                height: 30,
                                                right: 0,
                                                top: 0,
                                                display: 'flex'
                                            }}
                                        >
                                            {x.CandidatePoolExpiryDate && (
                                                <div className="boxInfoRow">
                                                    <Icon type="calendar" style={{ paddingRight: 5 }} /> CP Exp{' '}
                                                    {x.CandidatePoolExpiryDate}
                                                </div>
                                            )}
                                            {/* Hide this flag! */}
                                            {/* {x.EmailSent && (
                                                <div className="boxInfoRow">
                                                    <Icon type="check" style={{ paddingRight: 5 }} /> Email sent
                                                </div>
                                            )} */}
                                            <div className="ListRowBoxIconDetail">
                                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                                    <Icon type="dash" />
                                                </a>
                                            </div>
                                        </div>
                                    </Dropdown>
                                    <div className="ListRowBoxList">
                                        <div className="ListRowBoxFlagIcon">
                                            {x.IsReference ? (
                                                <Tooltip title="Referenced">
                                                    <Icon type="warning" theme="filled" style={{ fontSize: 17 }} />
                                                </Tooltip>
                                            ) : null}
                                            {x.IsCandidatePool ? (
                                                <Tooltip
                                                    title={`End date: ${x.CandidatePoolEndDate}`}
                                                    placement="bottom"
                                                >
                                                    <Icon
                                                        type="user"
                                                        style={{
                                                            fontSize: 17,
                                                            border: '0.05em solid black',
                                                            borderRadius: '12px'
                                                        }}
                                                    />
                                                </Tooltip>
                                            ) : null}
                                        </div>
                                        <div className="ListRowBoxImage">
                                            <img
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    objectFit: 'cover'
                                                }}
                                                src={x.ProfilePhoto ? x.ProfilePhoto : ImgDummy}
                                                loading="lazy"
                                                onError={e => ((e.target.onerror = null), (e.target.src = ImgDummy))}
                                            />
                                        </div>
                                        <div className="ListRowBoxInfo">
                                            <div
                                                style={{
                                                    fontSize: 18,
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                {x.ApplicantName}
                                                {x.cvUrl ? (
                                                    <span style={{ marginLeft: 10 }}>
                                                        <Tooltip title={'CV'}>
                                                            <Icon
                                                                type="file-pdf"
                                                                style={{
                                                                    fontSize: 20,
                                                                    cursor: 'pointer'
                                                                }}
                                                                onClick={() => onViewPdf(x.cvUrl)}
                                                            />
                                                        </Tooltip>
                                                    </span>
                                                ) : null}
                                            </div>
                                            <div className="ListRowSplit">
                                                <div>
                                                    <FaRegClock /> {x.LastUpdatedTime}
                                                </div>
                                                {x.LastHiredDate && <div>Last Hired: {x.LastHiredDate}</div>}
                                                <Col>
                                                    {x.EmailTypeInvitation.includes('Waiting') ||
                                                    x.EmailTypeInvitation == '' ? null : (
                                                        <div>
                                                            <Icon
                                                                type="check"
                                                                style={{ paddingRight: 5, color: '#43dd5d' }}
                                                            />{' '}
                                                            {x.EmailTypeInvitation}
                                                        </div>
                                                    )}
                                                    {x.EmailTypeNotification.includes('Waiting') ||
                                                    x.EmailTypeNotification == '' ? null : (
                                                        <div>
                                                            <Icon
                                                                type="check"
                                                                style={{ paddingRight: 5, color: '#43dd5d' }}
                                                            />{' '}
                                                            {x.EmailTypeNotification}
                                                        </div>
                                                    )}
                                                </Col>
                                            </div>
                                            <div className="ListRowSplit">
                                                <div>
                                                    <FaRegBuilding /> {x.UniversityName} - {x.MajorName}
                                                </div>
                                                {x.LastHiredCompany && <div>Company: {x.LastHiredCompany}</div>}
                                            </div>
                                            <div className="ListRowSplit">
                                                <div>
                                                    <FaGraduationCap /> GPA {x.GPA}
                                                </div>
                                                <div>Status: {x.ATSStatus}</div>
                                            </div>
                                            <div className="textRight">
                                                <div>{x.OnlineTestStatus}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {list.length !== 0 ? (
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ marginLeft: 90 }}>{checkTrue.length} Applicant(s) selected</div>
                            {isCBT ? (
                                <div>
                                    <Button
                                        type="primary"
                                        style={{
                                            marginLeft: 10,
                                            display: rolebyAuth['DownloadFileTemplate'] == true ? 'none' : 'block'
                                        }}
                                        onClick={this.onDownloadTemplate.bind(this)}
                                    >
                                        <Icon type="file-text" /> Download File Template
                                    </Button>
                                    <Button
                                        type="primary"
                                        style={{
                                            marginLeft: 10,
                                            display: rolebyAuth['UploadTestResult'] == true ? 'none' : 'block'
                                        }}
                                        onClick={this.onUploadTestResult.bind(this)}
                                    >
                                        <Icon type="upload" /> Upload Test Result
                                    </Button>
                                    <Button
                                        type="primary"
                                        style={{
                                            marginLeft: 10,
                                            display: rolebyAuth['DownloadCandidate'] == true ? 'none' : 'block'
                                        }}
                                        onClick={this.onDownloadCandidateList.bind(this)}
                                    >
                                        <Icon type="download" /> Download Candidate List
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <Button
                                        type="primary"
                                        style={{
                                            marginLeft: 10,
                                            display: rolebyAuth['DownloadFileTemplate'] == true ? 'none' : 'block'
                                        }}
                                        onClick={this.onDownloadTemplate.bind(this)}
                                    >
                                        <Icon type="file-text" /> Download File Template
                                    </Button>
                                    <Button
                                        type="primary"
                                        style={{
                                            marginLeft: 10,
                                            display: rolebyAuth['UploadTestResult'] == true ? 'none' : 'block'
                                        }}
                                        onClick={this.onUploadTestResult.bind(this)}
                                    >
                                        <Icon type="upload" /> Upload Test Result
                                    </Button>
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>

                {list.length !== 0 ? (
                    <div className="pagination">
                        <Pagination defaultCurrent={current} total={total} onChange={this.onChangePagging} />
                    </div>
                ) : null}
            </div>
        )
    }
}
