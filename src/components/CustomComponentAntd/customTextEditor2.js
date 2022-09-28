import React from 'react';
import 'jodit';
import JoditEditor from "jodit-react";
import _ from 'lodash';
import { Row } from 'antd'
class JoditEditors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

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

    componentWillUnmount(){
        this.state.text =  ''
    }

    updateContent = (content) => {
        const { onChange } = this.props
        let data = document.getElementsByClassName('jodit-wysiwyg')[0].innerHTML;
        this.setState({ text: content })
        onChange(content)
    }

    /**
     * @property Jodit jodit instance of native Jodit
     */
    jodit;
    setRef = jodit => this.jodit = jodit;

    config = {
        readonly: this.props.readOnly, // all options from https://xdsoft.net/jodit/doc/
        height: '300px',
        width: '900px',
        autofocus: true,
        useSearch: false,
        enableDragAndDropFileToEditor: false,
        buttons: [
            'bold',
            'italic',
            'underline',
            '|',
            'ol',
            '|',
            'font',
            'fontsize',
            'brush',
            'paragraph',
            '|',
            'image',
            'table',
            'link',
            '|',
            'left',
            'center',
            'right',
            'justify',
            '|',
            'undo',
            'redo',
            '|',
            'hr',
            'eraser',
            'fullsize',
            '|',
            'preview'
        ],
        uploader: { insertImageAsBase64URI: true },
        removeButtons: ['brush', 'file'],
        showXPathInStatusbar: false,
        showCharsCounter: false,
        showWordsCounter: false,
        toolbarAdaptive: true,
        toolbarSticky: true,
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
        defaultActionOnPaste: "insert_clear_html"
    }
    
    render() {
        const { labelField, required, formItemLayout, getFieldDecorator, Form, validation, initialValue, onChange, value, readOnly = false } = this.props
        const attr = _.omit(this.props, ['getFieldDecorator', 'Form', 'placeholder', 'validation', 'onSubmit']);
        this.state.text =  value
        return (
            <div>
                <h5>{labelField} {required ? <span style={{ color: "red" }}>*</span> : null}</h5>
                {/* <Form.Item {...formItemLayout} label="" hasFeedback>
                    {getFieldDecorator(attr.id, {
                        initialValue: initialValue,
                        onChange: ((content) => {
                            this.setState({ value: content })
                            onChange(content)
                        }),
                        rules: validation,
                    })( */}
                        <JoditEditor
                            editorRef={this.setRef}
                            value={this.state.text}
                            config={this.config}
                            onChange={this.updateContent}
                        />
                     {/* )}
                </Form.Item> */}
            </div>
        );
    }
}

export default JoditEditors;