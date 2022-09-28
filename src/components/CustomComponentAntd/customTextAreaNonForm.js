import React, { Component } from 'react';
import { Input } from 'antd';
import { InputGroup } from "../uielements/input"

const { TextArea } = Input;

export default class CustomTextAreaNonForm extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.onSubmit !== nextProps.onSubmit) {
            return true
        }
        if (this.props.value !== nextProps.value) {
            return true;
        }
        if (this.props.disabled !== nextProps.disabled) {
            return true;
        }
        return false;
    }

    render() {
        const { labelField, placeholder, disabled = false, value, name, id, onChange } = this.props;
        
        return (
            <>
                <h5>{labelField}</h5>
                <InputGroup compact style={{ marginBottom: "15px" }}>
                    <TextArea
                        size="default" 
                        disabled={disabled}
                        name={name} 
                        id={id}
                        placeholder={placeholder}
                        autosize={{ minRows: 2, maxRows: 6 }}
                        value={value}
                        onChange={(e) => onChange(name, e.target.value)}
                    />
                </InputGroup>
            </>
        )
    }
}