import React, { Component } from 'react';
import _ from 'lodash';
import { Row } from 'antd';
// import ReactQuill from 'react-quill'; //(Tidak support table)
import ReactQuill, {Quill} from 'react-quill-with-table'; // ES6
import * as QuillTableUI  from 'quill-table-ui';
// import QuillBetterTable from "quill-better-table";
import 'react-quill/dist/quill.snow.css'; // ES6
import './customStyle.scss'

export default class CustomTextEditor extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.readOnly !== nextProps.readOnly) {
            return true;
        }
        if (this.props.id !== nextProps.id) {
            return true;
        }
        if (this.props.value !== nextProps.value) {
            return true;
        }
        if (this.props.initialValue !== nextProps.initialValue) {
            return true;
        }
        if (this.props.name !== nextProps.name) {
            return true;
        }
        return false;
    }

    render() {
        const { Form, onSubmit, initialValue, validation, formItemLayout, getFieldDecorator, id, name, placeholder, value, onChange, readOnly, required, labelField, style = {} } = this.props;
        const modules = {
            toolbar: [
                [{ 'header': [1, 2, false] }, { 'font': [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image', 'video'],
                ['clean'],
                [{'scrollingContainer': 'body'}],
            ],
            clipboard: { //Fixing bug enter suddenly
                matchVisual: false
            },
            // table: true,
            // tableUI: true,
        }
        Quill.register({
            'modules/tableUI': QuillTableUI.default,
            // 'modules/better-table': QuillBetterTable
        }, true)
        const formats = [
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image', 'video'
        ]
        const attr = _.omit(this.props, ['getFieldDecorator', 'Form', 'placeholder', 'validation', 'onSubmit']);
        return (
            <React.Fragment>
                <Row>
                    <h5>{labelField} {required ? <span style={{ color: "red" }}>*</span> : null}</h5>
                    <Form.Item {...attr} {...formItemLayout} hasFeedback>
                        {/* {getFieldDecorator(attr.id, {
                            initialValue: initialValue,
                            onChange: ((content, delta, source, editor) => onChange(attr.id, content, delta, source, editor)),
                            // onChange: (content, delta, source, editor => onChange(attr.id, content, delta, source, editor)),
                            rules: validation
                        })( */}
                            
                            <ReactQuill
                                style={style}
                                className={{}}
                                id={id}
                                name={name}
                                theme="snow"
                                value={value}
                                onChange={(content, delta, source, editor) => onChange(content, delta, source, editor)}
                                modules={modules}
                                formats={formats}
                                readOnly={readOnly}
                                placeholder={placeholder}
                            />
                        {/* )} */}
                    </Form.Item>
                </Row>
            </React.Fragment>
        )
    }
}