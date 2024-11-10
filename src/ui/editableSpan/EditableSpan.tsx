import React, {ChangeEvent, memo, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title:string
    TitleChanged: (title:string) => void
    className?: string
}
export const EditableSpan = memo((props: EditableSpanPropsType) => {
    
    console.log('editablespan')

    let [editMode, setEditMode] = useState(false)
    let [text, setText] = useState('')

    const EnteredText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    const activate = () => {
        setEditMode(true)
        setText(props.title)
    }
    const deactivate = () => {
        setEditMode(false)
        props.TitleChanged(text)
    }

    return (
        <span >
        { editMode ?
            <TextField  variant={'standard'} onBlur={deactivate} value={text} onChange={EnteredText} autoFocus/>
            :  <span onDoubleClick={activate} className={props.className}>{props.title}</span>
      }
        </span>
    )

})