import React, { Component } from 'react';
import { InputNumber } from 'antd';
import { InputGroup } from "../uielements/input"

export default class CustomInputNonForm extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.value !== nextProps.value) {
            return true;
        }
        if (this.props.disabled !== nextProps.disabled) {
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
        const { labelField, placeholder, style, value, onChange, disabled, required, form, name, subForm, subSubForm, size, password, number, pattern, onClick, className, min, max } = this.props;
        return (
            <React.Fragment>
                <h5>{labelField} {required ? <span style={{ color: "red" }}>*</span> : null}</h5>
                <InputGroup compact style={{ marginBottom: "15px" }}>
                    <InputNumber 
                        placeholder={placeholder}
                        className={className}
                        style={{ width: "92%" }}
                        name={name}
                        id={name}
                        onChange={(value) => {
                            if (!isNaN(value)) {
                                onChange(name, value)
                            }
                        }}
                        value={value}
                        min={min}
                        max={max}
                        disabled={disabled === undefined || disabled === false ? false : true}
                        size={size === undefined ? 'default' : size}
                        type={password === undefined ? 'text' : 'password'}
                        pattern={pattern}
                        onClick={onClick}
                    />
                </InputGroup>
            </React.Fragment>
        )
    }
}