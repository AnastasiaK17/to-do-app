import './App.css';
import { useCallback} from 'react';
import { Todolist } from './widgets/todolist/Todolist';
import {
    Container,
    Grid,
    Paper,
    Toolbar,
    Typography
} from "@mui/material";
import { useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { useDispatch } from 'react-redux';
import { addTodolistAC } from './state/todolists-reducer'
import { AddItem } from './widgets/addItem/addItem';
import { TaskType } from './widgets/task/Task';


export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
} 
export type TasksStateType = {[key: string]: TaskType[]}

function App() {

  let todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
   const dispatch = useDispatch()

  const addTodolist = useCallback((title:string) =>  {
        let action = (addTodolistAC(title))
        dispatch(action)
    }, [dispatch])

   

    return (
        <div className='background'>
                <Toolbar  sx={{display:'flex', justifyContent: 'center'}}>
                    <Typography variant='h1' color={'textSecondary'}>todos</Typography>
                </Toolbar>
        
            <Container>
                <Grid container sx={{p: '15px 0px'}}>
            <AddItem addItemCallback={addTodolist} placeholder={'Add a new todolist'}/>
                </Grid>
                <Grid container spacing={4}>
            {todolists.map((el) => {
                return <Grid key={el.id} item>
                  <Paper>
                <Todolist todolist={el}/>
                </Paper>
                </Grid>
            })
            }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
