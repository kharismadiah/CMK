import React, { Component } from 'react'
import { Checkbox, Pagination, Icon, Tooltip, Dropdown, Menu, Col } from 'antd'
import { FaRegClock, FaGraduationCap, FaRegBuilding } from 'react-icons/fa'
import InputNonForm from '../../../CustomComponentAntd/customInputNonForm'
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
            onOnlineTest,
            showModalExtend
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
                                    <>
                                        <Tooltip title="Pass Candidate" className="ListRowBoxIcon" onClick={() => {}}>
                                            <Icon
                                                onClick={() => onAction('pass')}
                                                type="check-circle"
                                                style={{ fontSize: 20 }}
                                            />
                                        </Tooltip>
                                        <Tooltip title="Failed Candidate" className="ListRowBoxIcon" onClick={() => {}}>
                                            <Icon
                                                onClick={() => onAction('failed')}
                                                type="close-circle"
                                                style={{ fontSize: 20 }}
                                            />
                                        </Tooltip>
                                        <Tooltip
                                            title="Cancel by Candidate"
                                            className="ListRowBoxIcon"
                                            onClick={() => {}}
                                        >
                                            <Icon type="minus-circle" style={{ fontSize: 20 }} />
                                        </Tooltip>
                                        <Tooltip title="Candidate Pool" className="ListRowBoxIcon" onClick={() => {}}>
                                            <Icon
                                                type="user"
                                                style={{
                                                    fontSize: 20,
                                                    border: '0.05em solid black',
                                                    borderRadius: '12px'
                                                }}
                                            />
                                        </Tooltip>
                                        {/* <Tooltip title="Send email invitation" className="ListRowBoxIcon" onClick={() => handleStateModalEmail('visible', true)}>
                                        <div className="divCenter">
                                            <GrSend style={{fontSize:20}} />
                                        </div>
                                    </Tooltip> */}
                                    </>
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
                                                <Menu.Item key="1" onClick={() => onDetail(i)}>
                                                    <Icon type="search" /> Detail
                                                </Menu.Item>
                                                <Menu.Item key="2" onClick={() => onOnlineTest(i)}>
                                                    <Icon type="upload" />
                                                    Interview Detail
                                                </Menu.Item>
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
                                            <Tooltip title="Pass Candidate">
                                                <Icon type="warning" theme="filled" style={{ fontSize: 17 }} />
                                            </Tooltip>
                                            <Tooltip title="End date: 30/05/20" placement="bottom">
                                                <Icon
                                                    type="user"
                                                    style={{
                                                        fontSize: 17,
                                                        border: '0.05em solid black',
                                                        borderRadius: '12px'
                                                    }}
                                                />
                                            </Tooltip>
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
                                            <div style={{ fontSize: 18, fontWeight: 'bold' }}>{x.nama}</div>
                                            <div className="ListRowSplit">
                                                <div>
                                                    <FaRegClock /> {x.time}
                                                </div>
                                                {/* <div>CP Exp: {x.CandidatePoolExpiryDate}</div> */}
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
                                                    <FaRegBuilding /> {x.kampus}
                                                </div>
                                                <div>{x.date}</div>
                                            </div>
                                            <div className="ListRowSplit">
                                                <div>
                                                    <FaGraduationCap /> {x.gpa}
                                                </div>
                                                <div>{x.status}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    <div style={{ width: '100%', display: 'flex' }}>
                        <div style={{ marginLeft: 90 }}>{checkTrue.length} Applicant(s) selected</div>
                    </div>
                </div>

                <div className="pagination">
                    <Pagination defaultCurrent={current} total={total} onChange={this.onChangePagging} />
                </div>
            </div>
        )
    }
}
