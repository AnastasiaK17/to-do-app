import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";





const initialState: TodolistType[] = []

export const todolistsReducer = (state = initialState, action: TypeAction):TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
        {
            return state.filter(el => el.id !== action.payload.id)
        }
        case 'ADD-TODOLIST':
        {
            let newToDoList: TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}
            return [...state, newToDoList]
        }
        case 'CHANGE-TODOLIST-TITLE':
        {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER':
        {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        default:
            return state

    }
}
export type TypeAction = removeTodolistType | addTodolistType | changeTodolistTitleType | changeTodolistFilterType
export type removeTodolistType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const
}

export type addTodolistType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title, todolistId: v1()}
    } as const
}

type changeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (title: string, id: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {title, id}
    } as const
}

type changeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {filter, id}
    } as const
}