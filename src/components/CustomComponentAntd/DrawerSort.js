import React, { Component } from 'react';
import { Icon, Drawer, Button, Radio } from 'antd';
import { FaSortAlphaDown, FaSortAlphaDownAlt } from 'react-icons/fa';
import './customStyle.scss'

export default class DrawerVacancyList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isShowCompany:false,
          isShowBranch:false,
          isShowStatus:false,
        }
    }

    handleSort = () => {
        const {onSubmit, handleState} = this.props
        // handleState('visible', false)
        onSubmit()
    }

    render() {
        const {visible, type, value, handleState, list} = this.props
        const radioStyle = {
            display: 'block',
            height: '50px',
            lineHeight: '50px',
          };
        
        return (
            <Drawer
                title={(
                    <div className="DrawerSortHeader">
                        <div onClick={() => handleState('sortType', 0)} className="DrawerSortBoxIcon">
                            <FaSortAlphaDown style={type !== 0 ? {opacity:0.5}: null } />
                        </div>
                        <div onClick={() => handleState('sortType', 1)} className="DrawerSortBoxIcon">
                            <FaSortAlphaDownAlt style={type !== 1 ? {opacity:0.5}: null } />
                        </div>
                        <div className="DrawerSortHeaderTitle">
                            Sort
                        </div>
                    </div>
                )}
                placement="right"
                closable={true}
                onClose={() => handleState('visible', false)}
                visible={visible}
                getContainer={false}
                style={{ position: 'absolute' }}
            >
                <Radio.Group onChange={(e) => handleState('valueSort', e.target.value)} value={value}>
                    {
                        list.map((x, i) => (
                            <Radio key={i} value={x} style={radioStyle}>
                                {x}
                            </Radio>
                        ))
                    }
                </Radio.Group>

                <div className="DrawerFooter">
                    <Button onClick={this.handleSort} type="primary">
                        Sort
                    </Button>
                </div>
            </Drawer>
        )
    }
}