import {TasksStateType} from "../App";
import {v1} from "uuid";
import { addTodolistType, removeTodolistType } from "./todolists-reducer";

const initialState: TasksStateType = {}

export const tasksReducer = (state=initialState, action: TypeAction):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
        {   
            return {...state, [action.payload.id] :  state[action.payload.id].filter(el=> el.id !== action.payload.taskId)}
        }
        case 'ADD-TASK':
        {
            let newTask = {id: v1(), title: action.payload.title, isDone: false}

            return {...state, [action.payload.id]: [newTask, ...state[action.payload.id]]}
        }
        case 'CHANGE-TASK-STATUS':
        {
            return {...state, [action.payload.id]: state[action.payload.id].map(el => el.id === action.payload.taskId ? {...el, isDone: action.payload.status} : el)}
        }
        case 'CHANGE-TASK-TITLE':
        {
            return {...state, [action.payload.id]: state[action.payload.id].map(el => el.id === action.payload.taskId ? {...el, title: action.payload.title} : el)}
        }
        case 'ADD-TODOLIST':
            {
                return {...state, [action.payload.todolistId]: []}
            }
        case 'REMOVE-TODOLIST':
                {
                   let copyState = {...state}
                    delete copyState[action.payload.id]
                   return copyState
                }
        default:
            return state

    }
}
type TypeAction = removeTaskType | addTaskType | changeTaskStatusType | changeTaskTitleType | addTodolistType | removeTodolistType
type removeTaskType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {taskId, id}
    } as const
}

type addTaskType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, id: string) => {
    return {
        type: 'ADD-TASK',
        payload: {title, id}
    } as const
}

type changeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, status: boolean, id: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {taskId, status, id}
    } as const
}

type changeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, title: string, id: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {taskId, title, id}
    } as const
}