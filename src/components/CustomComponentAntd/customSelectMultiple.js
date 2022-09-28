import React, { Component } from 'react';
import _ from 'lodash';
import { Row, Select } from 'antd';
const { Option } = Select;

export default class CustomSelectMultiple extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.initialValue !== nextProps.initialValue) {
            return true
        }
        else if (this.props.onSubmit !== nextProps.onSubmit) {
            return true
        }
        else if (this.props.data !== nextProps.data) {
            return true
        }
        else if (this.props.id !== nextProps.id) {
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        const { getPopupContainer, getFieldDecorator, labelField, Form, placeholder, initialValue, onChange, disabled, validation, isRequired, data, onSubmit, formItemLayout, allowClear=false } = this.props;
        const attr = _.omit(this.props, ['getFieldDecorator', 'Form', 'placeholder', 'validation', 'onSubmit']);
        let childrenOption = [];
        if(data != null){
            for (let i = 0; i < data.length; i++) {
                childrenOption.push(<Option key={data[i].id} value={data[i].id}>{data[i].name}</Option>);
            }
        }
        return (
            <Row>
                <h5>{labelField} {isRequired ? <span style={{ color: "red" }}>*</span> : null}</h5>
                <Form.Item {...formItemLayout} label="" hasFeedback>
                    {getFieldDecorator(attr.id, {
                        initialValue: initialValue,
                        onChange: (e => onChange(e)),
                        rules: validation,
                    })(
                        <Select
                            mode="multiple"
                            getPopupContainer={getPopupContainer}
                            showSearch
                            size="default" style={{ width: "91%" }}
                            placeholder={placeholder}
                            id={attr.id}
                            name={attr.id}
                            optionFilterProp="children"
                            disabled={disabled}
                            allowClear={allowClear}
                        >
                            {childrenOption}
                        </Select>
                    )}
                </Form.Item>
            </Row>
        )
    }
}