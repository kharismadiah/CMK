import React, { Component } from 'react';
import _ from 'lodash';
import { Checkbox, Pagination } from 'antd';
import { FaRegClock, FaGraduationCap, FaRegBuilding } from 'react-icons/fa';
import InputNonForm from './customInputNonForm';
import './customStyle.scss'

export default class ListRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
        }
    }

    render() {
        const {totalApplicant, list, current, total} = this.props

        return (
            <div>
                <div className="ListRowBoxContent">
                    <div style={{width:'100%', display:'flex', minHeight:50}}>
                        <div className="ListRowBoxContentLeft">
                        <Checkbox />
                        </div>
                        <div className="ListRowBoxContentRight">
                        <div>
                            Total {totalApplicant} Applicant(s)
                        </div>
                        <div>
                            <InputNonForm
                                disabled={false}
                                name="serach"
                                id="serach"
                                value={''}
                                onChange={() => {}}
                            />
                        </div>
                        </div>
                    </div>

                    {
                        list.map(x => {
                            return (
                                <div className="ListRowBoxContentMiddle">
                                    <div className="ListRowBoxContentLeft">
                                        <Checkbox />
                                    </div>
                                    <div className="ListRowBoxContentRight">
                                        <div className="ListRowBoxList">
                                            <div className="ListRowBoxImage">
                                                <img style={{width:50, height:50}} src="https://upload.wikimedia.org/wikipedia/commons/7/7c/User_font_awesome.svg" />
                                            </div>
                                            <div className="ListRowBoxInfo">
                                                <div style={{fontSize:18, fontWeight:'bold'}}>
                                                    {x.nama}
                                                </div>
                                                <div><FaRegClock /> {x.time}</div>
                                                <div className="ListRowSplit">
                                                <div><FaRegBuilding /> {x.kampus}</div>
                                                <div>{x.date}</div>
                                                </div>
                                                <div className="ListRowSplit">
                                                <div><FaGraduationCap /> {x.gpa}</div>
                                                <div>{x.status}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div style={{width:'100%', display:'flex'}}>
                        <div style={{marginLeft:70}}>
                            1 Applicant(s) selected
                        </div>
                    </div>

                </div>

                <div className="pagination">
                    <Pagination defaultCurrent={current} total={total} />
                </div>
            </div>
        )
    }
}