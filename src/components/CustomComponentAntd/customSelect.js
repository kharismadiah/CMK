import React, { Component } from 'react';
import _ from 'lodash';
import { Row, Select } from 'antd';
const { Option } = Select;

export default class CustomSelect extends Component {

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
        // else if (this.props.disabled !== nextProps.disabled) {
        //     return true;
        // }
        else {
            return false;
        }
    }

    render() {
        const { getPopupContainer, getFieldDecorator, labelField, Form, placeholder, initialValue, onChange, disabled, validation, isRequired, data, onSubmit, formItemLayout, allowClear = false, width= "91%" } = this.props;
        const attr = _.omit(this.props, ['getFieldDecorator', 'Form', 'placeholder', 'validation', 'onSubmit']);
        let childrenOption = [];
        if (data != null) {
            for (let i = 0; i < data.length; i++) {
                childrenOption.push(
                    <Option key={data[i].id} value={data[i].id} style={{
                        whiteSpace: 'unset' // allow multine for a long text.
                    }}>
                        {/*  it's should be plain text */}
                        {data[i].name}
                    </Option>
                );
            }
        }
        return (
            <Row>
                <h5>{labelField} {isRequired ? <span style={{ color: "red" }}>*</span> : null}</h5>
                <Form.Item {...formItemLayout} label="" hasFeedback>
                    {getFieldDecorator(attr.id, {
                        initialValue: initialValue,
                        onChange: ((e, val) => {
                            onChange(e, val === undefined ? '' : val.props.children)
                        }),
                        rules: validation,
                    })(
                        <Select
                            getPopupContainer={getPopupContainer}
                            showSearch
                            size="default" style={{ width: width }}
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

// import React, { Component } from 'react';
// import _ from 'lodash';
// import { Row, Select } from 'antd';
// const { Option } = Select;

// export default class CustomSelect extends Component {

//     shouldComponentUpdate(nextProps, nextState) {
//         if (this.props.initialValue !== nextProps.initialValue) {
//             return true
//         }
//         else if (this.props.childrenOption !== nextProps.childrenOption) {
//             return true
//         }
//         else if (this.props.id !== nextProps.id) {
//             return true;
//         }
//         // else if (this.props.name !== nextProps.name) {
//         //     return true;
//         // }
//         else {
//             return false;
//         }
//     }

//     render() {
//         const { getFieldDecorator, labelField, Form, placeholder, initialValue, onChange, disabled, formItemLayout, required, isRequired, childrenOption, name, id } = this.props;
//         const attr = _.omit(this.props, ['getFieldDecorator', 'Form', 'placeholder', 'required']);
//         return (
//             <Row>
//                 <h5>{labelField} {isRequired ? <span style={{ color: "red" }}>*</span> : null}</h5>
//                 <Form.Item {...formItemLayout} label="" hasFeedback>
//                     {getFieldDecorator(attr.id, {
//                         initialValue: initialValue,
//                         onChange: (e => onChange(e)),
//                         rules: required,
//                         // rules: [
//                         //     required ? { required: required[0], message: required[0].message } : {},
//                         // ],
//                     })(
//                         <Select
//                             showSearch
//                             size="default" style={{ width: "100%" }}
//                             placeholder={placeholder}
//                             id={attr.id}
//                             name={attr.id}
//                             optionFilterProp="children"
//                             disabled={disabled}
//                         >
//                             {childrenOption}
//                         </Select>
//                     )}
//                 </Form.Item>
//             </Row>
//         )
//     }

// }