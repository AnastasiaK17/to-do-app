import React, { memo, useCallback, useMemo} from 'react';
import { TodolistType} from '../../App';
import {AddItem} from "../addItem/addItem";
import {EditableSpan} from "../../ui/editableSpan/EditableSpan";
import {Button, Divider, IconButton, Typography} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../state/store';
import { useDispatch } from 'react-redux';
import { addTaskAC } from '../../state/tasks-reducer';
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from '../../state/todolists-reducer';
import { Task } from '../task/Task';
import s from './todolist.module.css'


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
   todolist: TodolistType
}

export const Todolist = memo(({todolist}: PropsType) => {

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolist.id])

    let itemsNotDone = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolist.id].filter(el => el.isDone === false))

    tasks = useMemo(()=> {
        return tasks
    }, [tasks])

    const dispatch = useDispatch()

    const deleteToDoList = useCallback(() => {
        dispatch(removeTodolistAC(todolist.id))
    }, [dispatch, todolist.id])

    const onAllClickHandler = () => {
        dispatch(changeTodolistFilterAC("all", todolist.id))
     }
    const onActiveClickHandler = () =>  {
        dispatch(changeTodolistFilterAC("active", todolist.id))
    }
    const onCompletedClickHandler = () => {
        dispatch(changeTodolistFilterAC("completed", todolist.id))
    }


   
    if (todolist.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (todolist.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }

    const addTaskWithID = useCallback((title:string) => {
        dispatch(addTaskAC(title, todolist.id))
    }, [dispatch, todolist.id])

    const changeTDLTitleWithID= useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(title, todolist.id))
    }, [dispatch, todolist.id])


   type ButtonWithMemoPropsType = {
      variant: "text" | "contained" | "outlined"
      color: "inherit" | "secondary" | "primary" | "success" | "error" | "info" | "warning"
      onClick: () => void
      title: string
      filter: string
   }

    const ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {
     return   <Button sx={todolist.filter=== props.filter ? {mr: '5px', border: '2px solid #943b1a'} :{mr: '5px'}} variant={props.variant} color={props.color}
     onClick={props.onClick}>{props.title}
</Button>
    })

    const notDone = itemsNotDone.length
    


    return <>

    <div>
        <Typography align={'center'} variant={'h6'} sx={{fontWeight: 'bold'}}>
            <EditableSpan title={todolist.title} TitleChanged={changeTDLTitleWithID}/>
            <IconButton color={'default'} onClick={deleteToDoList}><ClearIcon/></IconButton>
        </Typography>
         <AddItem addItemCallback={addTaskWithID} placeholder={'What needs to be done?'}/>
            {
                tasks.map(t => {
                    return <><Task key={t.id} task={t} todolistId={todolist.id}/><Divider/></>
                }) 
            }

            
        <div className={s.buttonGroup}>
            <div style={{marginRight: '50px', paddingLeft: '10px', paddingTop: '7px'}}>
             {notDone} {notDone === 1 ? 'item' : 'items'} left
            </div>

        <ButtonWithMemo filter={'all'} variant={"text"} color={'inherit'}
                    onClick={onAllClickHandler} title={"All"}/>

        <ButtonWithMemo filter={'active'} variant={"text"} color={'inherit'}
                    onClick={onActiveClickHandler} title={"Active"}/>

        <ButtonWithMemo filter={'completed'} variant={"text"} color={'inherit'}
                    onClick={onCompletedClickHandler} title={"Completed"}/>
                    </div>
        
    </div>
    </>

    
})