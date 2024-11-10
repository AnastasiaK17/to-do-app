import { IconButton, ListItem } from "@mui/material"
import { EditableSpan } from "../../ui/editableSpan/EditableSpan"
import {  memo } from "react";
import { useDispatch } from "react-redux";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "../../state/tasks-reducer";
import CircleCheckbox from "../../ui/checkbox/checkbox";
import ClearIcon from '@mui/icons-material/Clear';
import s from './task.module.css'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = memo((props: TaskPropsType) => {

    const dispatch =  useDispatch()

    const onClickHandler = () => {
        dispatch(removeTaskAC(props.task.id, props.todolistId))
        }

        const TitleChanger =(title: string) => {
           dispatch(changeTaskTitleAC(props.task.id, title, props.todolistId))
        }

        const onChangeHandler = (checked: boolean) =>  {
            dispatch(changeTaskStatusAC(props.task.id, checked, props.todolistId))
        }

return <ListItem divider>
          <CircleCheckbox onChange={onChangeHandler} checked={props.task.isDone}/>
          <EditableSpan className={props.task.isDone ? s['is-done'] : ""}   title={props.task.title} TitleChanged={TitleChanger}/>
          <IconButton color={'default'} onClick={onClickHandler}> <ClearIcon/></IconButton>
       </ListItem> 
       
   
})