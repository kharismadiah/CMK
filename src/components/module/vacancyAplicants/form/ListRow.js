import React, { Component } from 'react'
import { DatePicker, Checkbox, Pagination, Icon, Tooltip, Dropdown, Menu, Col } from 'antd'
import { FaRegClock, FaGraduationCap, FaRegBuilding } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import InputNonForm from '../../../CustomComponentAntd/customInputNonForm'
import { IconContext } from 'react-icons'
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
            date,
            onTestResult
        } = this.props
        let checkTrue = list.filter(x => x.checked === true)
        let checkFalse = list.filter(x => x.checked === false)

        let indeterminate

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
                                            <Icon type="check-circle" style={{ fontSize: 20 }} />
                                        </Tooltip>
                                        <Tooltip
                                            title="Failed Candidate"
                                            className="ListRowBoxIcon"
                                            onClick={() => onAction('Fail')}
                                        >
                                            <Icon type="close-circle" style={{ fontSize: 20 }} />
                                        </Tooltip>
                                        <Tooltip
                                            title="Cancel by Candidate"
                                            className="ListRowBoxIcon"
                                            onClick={() => onAction('CancelByCandidate')}
                                        >
                                            <Icon type="minus-circle" style={{ fontSize: 20 }} />
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
                                        <div>
                                            <DatePicker
                                                value={date}
                                                onChange={e => handleChange('date', e)}
                                                format="DD/MM/YYYY"
                                            />
                                        </div>
                                        {date !== null ? (
                                            <IconContext.Provider value={{ color: '#585858', size: 20 }}>
                                                <Tooltip
                                                    title="Send Email invitation"
                                                    className="ListRowBoxIcon"
                                                    onClick={handleStateModalEmail}
                                                    style={{ paddingLeft: 10, display: 'flex', alignItems: 'center' }}
                                                >
                                                    <FiSend />
                                                </Tooltip>
                                            </IconContext.Provider>
                                        ) : null}
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
                                                <Menu.Item key="2" onClick={() => console.log('d')}>
                                                    <Icon type="calendar" /> Extend CP
                                                </Menu.Item>
                                                {x.PsychologicalTestResult ? (
                                                    <Menu.Item
                                                        key="3"
                                                        onClick={() => {
                                                            handleStatePsychological('ApplicationId', x.ApplicationId)
                                                            handleStatePsychological('visible', true)
                                                            onTestResult(x.ApplicationId)
                                                        }}
                                                    >
                                                        <Icon type="upload" />
                                                        Edit Psychological Test Result
                                                    </Menu.Item>
                                                ) : (
                                                    <Menu.Item
                                                        key="3"
                                                        onClick={() => {
                                                            handleStatePsychological('ApplicationId', x.ApplicationId)
                                                            handleStatePsychological('visible', true)
                                                        }}
                                                    >
                                                        <Icon type="upload" />
                                                        Psychological Test Result
                                                    </Menu.Item>
                                                )}
                                            </Menu>
                                        }
                                    >
                                        <div className="ListRowBoxIconDetail">
                                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                                <Icon type="dash" />
                                            </a>
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
                                                style={{ width: 50, height: 50, objectFit: 'cover' }}
                                                src={x.ProfilePhoto ? x.ProfilePhoto : ImgDummy}
                                                loading="lazy"
                                                onError={e => ((e.target.onerror = null), (e.target.src = ImgDummy))}
                                            />
                                        </div>
                                        <div className="ListRowBoxInfo">
                                            <div style={{ fontSize: 18, fontWeight: 'bold' }}>{x.ApplicantName}</div>
                                            <div>
                                                <FaRegClock /> {x.LastUpdatedTime}
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
                                                <div>Status: {x.ATSStatus}</div>
                                            </div>
                                            <div className="ListRowSplit">
                                                <div>
                                                    <FaGraduationCap /> GPA {x.GPA}
                                                </div>
                                                <div>{x.OnlineTestStatus}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {list.length !== 0 ? (
                        <div style={{ width: '100%', display: 'flex' }}>
                            <div style={{ marginLeft: 90 }}>{checkTrue.length} Applicant(s) selected</div>
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
