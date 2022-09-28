import React, { Component } from 'react'
import ReactPlayer from 'react-player/youtube'
import { Row, Form } from 'antd'
import './youtube.scss'

class Youtube extends Component{
    constructor(props){
        super(props)
        this.state = {
            onSubmit: false
        }
    }

    render(){
        const {url = '', width='100%', height='100%', control=true} = this.props
        return(
            <Row>
                <ReactPlayer url={url} controls={control} width={width} height={height}/>
            </Row>
        )
    }
}

const WrappedForm = Form.create()(Youtube)
export default WrappedForm;