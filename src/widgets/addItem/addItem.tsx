import {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import { InputAdornment, TextField} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import s from './addItem.module.css'


export type addItemProps = {
    addItemCallback: (title: string) => void
    placeholder: string
}


export const AddItem = memo((props: addItemProps) => {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string|null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError("Title is required");
        if (e.charCode === 13) {
            addItem();
        }
    }
    const addItem = () => {
        if (title.trim() !== "") {
            props.addItemCallback(title.trim());
            setTitle("");
            setError(null)
        } else {
            setError("Title is required");
        }
    }


    return(   
         <TextField variant={'standard'} value={title}
                   onChange={onChangeHandler}
                   sx = {{width: '100%'}}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
                   error={!!error}
                   helperText={error}
                   placeholder={props.placeholder}
                   slotProps={{input: {startAdornment:
                         (<InputAdornment position='start'>
                            <CheckIcon color={'disabled'} onClick={addItem} className={s.addButton}/>
                          </InputAdornment>)}}}
           />
         )
})