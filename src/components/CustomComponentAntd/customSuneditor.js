import React, { useRef, useEffect } from "react";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import $ from 'jquery'
import triggerRemark from "./trigger_remark_plugin";

const TextEditor = ({onChange, value, readOnly = false, labelField, required, formItemLayout, 
                    getFieldDecorator, Form, validation, initialValue, 
                    trigger=[], 
                    onPaste, 
                    appendContents, 
                    isSubject=false, 
                    height="300"}) => {
    const editorRef = useRef();
    useEffect(() => {
        // Get underlining core object here
        // Notice that useEffect is been used because you have to make sure the editor is rendered.
        // console.log(editorRef.current.editor.core);
    }, []);

    

    const options = isSubject ? 
    {
        plugins: [
            triggerRemark( `<div class="se-list-inner se-list-font-size">
                            <ul class="se-list-basic" style="max-height:80px;">
                                ${trigger.map((x)=>
                                    `<li> <button type="button" class="se-btn-list" value="${x.value}">${x.value} - ${x.triggerName}</button> </li>`
                                ).join(" ")}
                            </ul>
                        </div> `
            )
        ],
        buttonList: [
            [{
                name: 'trigger_remark',
                dataCommand: 'trigger_remark',
                buttonClass: 'se-btn se-btn-select se-btn-tool-size se-tooltip',
                title: 'Trigger',
                dataDisplay: 'submenu',
                innerHTML: '<span class="txt">Trigger</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.73 8.67"><g><path d="M18.79,7.52a.8.8,0,0,1,.56-.23.82.82,0,0,1,.79.79.8.8,0,0,1-.23.56l-7.07,7.07a.79.79,0,0,1-.57.25.77.77,0,0,1-.57-.25h0L4.64,8.65a.8.8,0,0,1-.23-.57.82.82,0,0,1,.79-.79.8.8,0,0,1,.56.23L12.28,14l3.26-3.26,3.25-3.26Z" transform="translate(-4.41 -7.29)"></path></g></svg>',
            }],
        ]
    }
    :
    {
        imageFileInput: false,
        plugins: [
            triggerRemark( `<div class="se-list-inner se-list-font-size">
                            <ul class="se-list-basic" style="max-height:150px;">
                                ${trigger.map((x)=>
                                    `<li> <button type="button" class="se-btn-list" value="${x.value}">${x.value} - ${x.triggerName}</button> </li>`
                                ).join(" ")}
                            </ul>
                        </div> `
            )
        ],
        buttonList: [
            ['undo', 'redo'],
            ['font', 'fontSize', 'formatBlock'],
            ['paragraphStyle', 'blockquote'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
            ['fontColor', 'hiliteColor', 'textStyle'],
            ['removeFormat'],
            ['outdent', 'indent'],
            ['align', 'horizontalRule', 'list', 'lineHeight'],
            ['table', 'link', 'image'], //'video', 'audio'
            ['fullScreen'], //'codeView', 'showBlocks'
            ['preview'], //'print'
            // ['save', 'template'],
            [{
                name: 'trigger_remark',
                dataCommand: 'trigger_remark',
                buttonClass: 'se-btn se-btn-select se-btn-tool-size se-tooltip',
                title: 'Trigger',
                dataDisplay: 'submenu',
                innerHTML: '<span class="txt">Trigger</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.73 8.67"><g><path d="M18.79,7.52a.8.8,0,0,1,.56-.23.82.82,0,0,1,.79.79.8.8,0,0,1-.23.56l-7.07,7.07a.79.79,0,0,1-.57.25.77.77,0,0,1-.57-.25h0L4.64,8.65a.8.8,0,0,1-.23-.57.82.82,0,0,1,.79-.79.8.8,0,0,1,.56.23L12.28,14l3.26-3.26,3.25-3.26Z" transform="translate(-4.41 -7.29)"></path></g></svg>',
            }],
        ]
    }

    const data = (content) => {
        // let html_thead = document.querySelector("Table > thead");
        // let html_tr = document.querySelector("Table > tbody > tr");
        // let html_td = document.querySelector("Table > tbody > tr > td");
        $(".sun-editor-editable thead").css({'border-bottom': '2px solid black'});
        $(".sun-editor-editable th").css({'border': '1px solid black', 'background-color': 'white'});
        $(".sun-editor-editable tr").css({'border': '1px solid black', 'background-color': 'white'}); //style all tr inside the table
        $(".sun-editor-editable td").css({'border': '1px solid black', 'padding': '.4em', 'background-clip': 'padding-box', 'background-color': 'white'}); //edit all td inside tr (not the tr itself)
        onChange(content)
    }

    return (
        <div>
            <h5>{labelField} {required ? <span style={{ color: "red" }}>*</span> : null}</h5>
            <SunEditor
                onPaste={onPaste} 
                appendContents={appendContents}
                ref={editorRef} 
                setOptions={options}
                width="100%"
                height={height}
                placeholder="Please type here..."
                setContents={value} 
                disable={readOnly}
                enableToolbar={!readOnly}
                // onChange={(content) => onChange(content)}
                onChange={data}
            />
        </div>
    );
};
export default TextEditor;