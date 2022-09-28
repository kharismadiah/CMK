import React, { useState, useEffect } from 'react'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import Config from '../../../../../service/config'
import Endpoint from '../../../../../service/endpoint'
import { Header } from '../../../../../service/header'
import styled from 'styled-components'
// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css'
// import '@react-pdf-viewer/toolbar/lib/styles/index.css'
import { toolbarPlugin } from '@react-pdf-viewer/toolbar'
import './styles.css'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'

const Wrapper = styled.div`
    position: 100%;
`

const StyledPrev = styled.div`
    position: absolute;
    top: 40%;
    z-index: 10;
    left: -14px;
`

const StyledNext = styled.div`
    position: absolute;
    top: 40%;
    z-index: 10;
    right: -14px;
`

const Button = styled.button`
    display: inline-block;
    cursor: pointer;
    width: 48px;
    height: 48px;
    background-color: transparent !important;
    border: none;
    outline: none;
    & svg {
        font-size: 42px;
    }
`

const FLKPdf = ({ data }) => {
    // Create new plugin instance

    const toolbarPluginInstance = toolbarPlugin()
    const { Toolbar } = toolbarPluginInstance

    const { ApplicantId } = data
    const [url, setUrl] = useState('')

    useEffect(() => {
        setUrl(Config.BASE_URL + Endpoint.RECRUITMENT_PHASE_FLK_DOWNLOAD_POST + `?applicantId=${ApplicantId}`)
    }, [data])

    return (
        <Wrapper>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                <Toolbar>
                    {props => {
                        const { GoToPreviousPage } = props
                        return (
                            <StyledPrev>
                                <GoToPreviousPage>
                                    {props => (
                                        <Button
                                            style={{
                                                color: props.isDisabled ? '#c3c3c3' : '#000'
                                            }}
                                            disabled={props.isDisabled}
                                            onClick={props.onClick}
                                        >
                                            <CaretLeftOutlined />
                                        </Button>
                                    )}
                                </GoToPreviousPage>
                            </StyledPrev>
                        )
                    }}
                </Toolbar>
                <Toolbar>
                    {props => {
                        const { GoToNextPage } = props
                        return (
                            <StyledNext>
                                <GoToNextPage>
                                    {props => (
                                        <Button
                                            style={{
                                                color: props.isDisabled ? '#c3c3c3' : '#000'
                                            }}
                                            disabled={props.isDisabled}
                                            onClick={props.onClick}
                                        >
                                            <CaretRightOutlined />
                                        </Button>
                                    )}
                                </GoToNextPage>
                            </StyledNext>
                        )
                    }}
                </Toolbar>
                <div
                    style={{
                        flex: 1,
                        overflow: 'hidden'
                    }}
                >
                    <Viewer fileUrl={url} httpHeaders={Header()} plugins={[toolbarPluginInstance]} />
                </div>
            </Worker>
        </Wrapper>
    )
}

export default FLKPdf
