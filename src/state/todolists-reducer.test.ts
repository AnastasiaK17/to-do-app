import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';

let todolistId1: string;
let todolistId2:  string;
let startState: TodolistType[]

beforeEach(()=>{
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {
   

    const endState:TodolistType[] = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
     let newToDoListTitle = 'New To Do List'  

    const endState:TodolistType[] = todolistsReducer(startState, addTodolistAC(newToDoListTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newToDoListTitle);
});


test('correct todolist should change its name', () => {
    
    let changedToDoListTitle = 'Changed To Do List Title'

    const endState:TodolistType[] = todolistsReducer(startState, changeTodolistTitleAC(changedToDoListTitle, todolistId2))

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(changedToDoListTitle);
});

test('correct filter of todolist should be changed', () => {

    let changedToDoListFilter:FilterValuesType = 'active'

    const endState:TodolistType[] = todolistsReducer(startState, changeTodolistFilterAC(changedToDoListFilter, todolistId2))

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(changedToDoListFilter);
});