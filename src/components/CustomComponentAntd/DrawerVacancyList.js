import React, { Component } from 'react';
import _ from 'lodash';
import { Icon, Drawer, Button } from 'antd';
import InputNonForm from './customInputNonForm';
import './customStyle.scss'

export default class DrawerVacancyList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isShowCompany:false,
          isShowBranch:false,
          isShowVacancyStatus:false,
          isShowEventList:false,
          isShowGroupEventList:false,
          isShowPositionList:false,
          isShowActivityList:false,
        }
    }
    isShow = (property) => {
        this.setState({
            [property]: !this.state[property]
        })
    }

    handleClick = (property, index) => {
        const {handleChange, company, branch, vacancyStatus, eventList,
                groupEventList, positionList, activityList} = this.props
        if(property === 'company'){
            company[index].selected = !company[index].selected
            handleChange(property, company)
        }else if(property === 'branch'){
            branch[index].selected = !branch[index].selected
            handleChange(property, branch)
        }else if(property === 'eventList'){
            eventList[index].selected = !eventList[index].selected
            handleChange(property, eventList)
        }else if(property === 'groupEventList'){
            groupEventList[index].selected = !groupEventList[index].selected
            handleChange(property, groupEventList)
        }else if(property === 'positionList'){
            positionList[index].selected = !positionList[index].selected
            handleChange(property, positionList)
        }else if(property === 'activityList'){
            activityList[index].selected = !activityList[index].selected
            handleChange(property, activityList)
        }else{
            vacancyStatus[index].selected = !vacancyStatus[index].selected
            handleChange(property, vacancyStatus)
        }
    }

    render() {
        let {company, branch, vacancyStatus, eventList, groupEventList, activityList, positionList, visible, handleReset, handleChange, serach, onSubmit} = this.props
        const {isShowCompany, isShowBranch, isShowEventList, 
                isShowActivityList, isShowGroupEventList, isShowPositionList, isShowVacancyStatus} = this.state
        let dataCompany = [...company]
        let dataBranch = [...branch]
        let dataEventList = [...eventList]
        let dataGroupEventList = [...groupEventList]
        let dataActivityList = [...activityList]
        let dataPositionList = [...positionList]
        let dataVacancyStatus = [...vacancyStatus]
        isShowCompany ? dataCompany = company : dataCompany.splice(4)
        isShowBranch ? dataBranch = branch : dataBranch.splice(4)
        isShowEventList ? dataEventList = eventList : dataEventList.splice(4)
        isShowGroupEventList? dataGroupEventList = groupEventList : dataGroupEventList.splice(4)
        isShowActivityList? dataActivityList = activityList : dataActivityList.splice(4)
        isShowPositionList? dataPositionList = positionList : dataPositionList.splice(4)
        isShowVacancyStatus? dataVacancyStatus = vacancyStatus : dataVacancyStatus.splice(4)
        
        var tempDataEventList = []
        dataEventList.forEach((x)=>{
            let newName = ""
            if (x.name.length>10) { 
                for (let i=0; i<x.name.length; i++) {
                    if (i%10===0) newName = newName.concat("\n")
                    newName = newName.concat(x.name[i])
                }
            } else newName = x.name
            tempDataEventList = [...tempDataEventList, {...x, name : newName}]
            
        })
        
        return (
            <Drawer
                title={(
                    <div style={{display:'flex'}}>
                        <div style={{paddingTop:5}}>
                            <Icon type="filter" theme="filled" /> Filter
                        </div>
                        <div style={{paddingLeft:'10px'}}>
                            <InputNonForm
                                disabled={false}
                                name="serach"
                                id="serach"
                                value={serach}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                )}
                placement="right"
                width={400}
                closable={true}
                onClose={() => handleChange('visible', false)}
                visible={visible}
                getContainer={false}
                style={{ position: 'absolute' }}
            >
                <div>
                    <h3>Branch</h3>
                </div>
                <div style={{display:'flex', flexWrap:'wrap'}}>
                    {
                        dataBranch.map((x, i) => {
                            return(
                                x.filterCount>0? 
                                <div key={i} className="DrawerVacancyListBox" 
                                    onClick={this.handleClick.bind(this, 'branch', i)} 
                                    style={{backgroundColor: this.props.userRole !== 'ho' || this.props.listRoleName === "Hiring Manager" ? "#EBEBE4"
                                            : x.selected ? '#1D90FF': null, 
                                            pointerEvents: this.props.userRole !== 'ho' || this.props.listRoleName === "Hiring Manager"? "none":null}}>
                                    <p style={{textAlign:'center', margin: '0 5px'}}>{x.name}</p>
                                    <p>{x.filterCount}</p>
                                </div> : null
                            )
                        })
                    }
                </div>
                {
                    !isShowBranch && branch.filter(x=>x.filterCount>0).length > 4?
                        <div onClick={this.isShow.bind(this, 'isShowBranch')} className="drawerSeeMore">See More</div>
                    :
                    null
                }

                <div className="DrawerVacancyListBorderHR" />

                    <div>
                        <h3>Platform</h3>
                    </div>

                    <div style={{display:'flex', flexWrap:'wrap'}}>
                    {
                        dataGroupEventList.map((x,i) => {
                            return(
                                x.filterCount>0?
                                <div key={i} className="DrawerVacancyListBox" onClick={this.handleClick.bind(this, 'groupEventList', i)} style={x.selected ? {backgroundColor: '#1D90FF'}: null}>
                                    <p style={{textAlign:'center', margin: '0 5px'}}>{x.name}</p>
                                    <p>{x.filterCount}</p>
                                </div>:null
                            )
                        })
                    }
                    </div>
                    {
                        !isShowGroupEventList && groupEventList.filter(x=>x.filterCount>0).length > 4 ?
                            <div onClick={this.isShow.bind(this, 'isShowGroupEventList')} className="drawerSeeMore">See More</div>
                        :
                        null
                    }

                <div className="DrawerVacancyListBorderHR" />

                <div>
                    <h3>Event Code</h3>
                </div>
                <div style={{display:'flex', flexWrap:'wrap'}}>
                    {
                        tempDataEventList.map((x,i) => {
                            return(
                                x.filterCount>0? 
                                <div key={i} className="DrawerVacancyListBox" onClick={this.handleClick.bind(this, 'eventList', i)} style={x.selected ? {backgroundColor: '#1D90FF'}: null}>
                                    <p style={{textAlign:'center', margin: '0 5px'}}>{x.name}</p>
                                    <p>{x.filterCount}</p>
                                </div>:null
                            )
                        })
                    }
                </div>
                {
                    !isShowEventList && eventList.filter(x=>x.filterCount>0).length > 4 ?
                        <div onClick={this.isShow.bind(this, 'isShowEventList')} className="drawerSeeMore">See More</div>
                    :
                    null
                }

                <div className="DrawerVacancyListBorderHR" />

                    <div>
                        <h3>Position</h3>
                    </div>

                    <div style={{display:'flex', flexWrap:'wrap'}}>
                    {
                        dataPositionList.map((x,i) => {
                            return(
                                x.filterCount>0? 
                                <div key={i} className="DrawerVacancyListBox" onClick={this.handleClick.bind(this, 'positionList', i)} style={x.selected ? {backgroundColor: '#1D90FF'}: null}>
                                    <p style={{textAlign:'center', margin: '0 5px'}}>{x.name}</p>
                                    <p>{x.filterCount}</p>
                                </div>:null
                            )
                        })
                    }
                    </div>
                    {
                        !isShowPositionList && positionList.filter(x=>x.filterCount>0).length > 4 ?
                            <div onClick={this.isShow.bind(this, 'isShowPositionList')} className="drawerSeeMore">See More</div>
                        :
                        null
                    }
                <div className="DrawerVacancyListBorderHR" />

                    <div>
                        <h3>Activity</h3>
                    </div>

                    <div style={{display:'flex', flexWrap:'wrap'}}>
                    {
                        dataActivityList.map((x,i) => {
                            return(
                                x.filterCount>0? 
                                <div key={i} className="DrawerVacancyListBox" onClick={this.handleClick.bind(this, 'activityList', i)} style={x.selected ? {backgroundColor: '#1D90FF'}: null}>
                                    <p style={{textAlign:'center', margin: '0 5px'}}>{x.name}</p>
                                    <p>{x.filterCount}</p>
                                </div>:null
                            )
                        })
                    }
                    </div>
                    {
                        !isShowActivityList && activityList.filter(x=>x.filterCount>0).length > 4 ?
                            <div onClick={this.isShow.bind(this, 'isShowActivityList')} className="drawerSeeMore">See More</div>
                        :
                        null
                    }
                <div className="DrawerVacancyListBorderHR" />
                

                <div>
                    <h3>Vacancy Status</h3>
                </div>
                <div style={{display:'flex', flexWrap:'wrap', marginBottom:40}}>
                    {
                        vacancyStatus.map((x,i) => {
                            return(
                                x.filterCount>0? 
                                <div key={i} className="DrawerVacancyListBox" onClick={this.handleClick.bind(this, 'vacancyStatus', i)} style={x.selected ? {backgroundColor: '#1D90FF'}: null}>
                                    <p style={{textAlign:'center', margin: '0 5px'}}>{x.name}</p>
                                    <p>{x.filterCount}</p>
                                </div>:null
                            )
                        })
                    }
                </div>
                    {
                        !isShowVacancyStatus && vacancyStatus.filter(x=>x.filterCount>0).length > 4 ?
                            <div onClick={this.isShow.bind(this, 'isShowVacancyStatus')} className="drawerSeeMore">See More</div>
                        :
                        null
                    }

                <div className="DrawerVacancyListBorderHR" />

                <div className="DrawerFooter">
                    <Button onClick={handleReset} style={{ marginRight: 8 }}>
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