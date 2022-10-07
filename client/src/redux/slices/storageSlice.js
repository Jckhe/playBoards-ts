import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';


const initialState = {
    username: '',
    boards: [{
        projectName: 'My First Project',
        toDo: [],
        inProgress: [],
        toDelete: [],
        id: uuid(),
    }],
}

export const storageSlice = createSlice({
    name: 'Storage',
    initialState,
    reducers: {
        addTasks: (state, action) => {
            const index = state.boards.findIndex((board) => action.payload.boardID === board.id);
            //shallow copy of the current board using index
            const currentBoard = {...state.boards[index]}
            //push into the toDo array 
            currentBoard['toDo'].push(action.payload)
            //update state using index
            state.boards[index] = currentBoard;
            console.log(state.boards[index])
        },
        startTasks: (state, action) => {
            const BoardIndex = state.boards.findIndex((board) => action.payload.boardID === board.id);
            //shallow copy of the current board using index
            const currentBoard = {...state.boards[BoardIndex]}
            //we need to find the current index of the task within the todo array
            const taskIndex = currentBoard['toDo'].findIndex((task) => action.payload.uid === task.uid);
            //splice from array
            const splicedTask = currentBoard['toDo'].splice(taskIndex, 1);
            const task = splicedTask[0]
            task.status = 'inProgress';
            //we need to push this into the inProgress array
            //keep in mind that spliced usually returns an array
            currentBoard['inProgress'].push(task)
            //reassign currentBoard
            state.boards[BoardIndex] = currentBoard;
        },
        finishTasks: (state, action) => {
            const BoardIndex = state.boards.findIndex((board) => action.payload.boardID === board.id);
            const currentBoard = {...state.boards[BoardIndex]}
            //we need to find the current index of the task within the todo array
            const taskIndex = currentBoard['inProgress'].findIndex((task) => action.payload.uid === task.uid);
            const splicedTask = currentBoard['inProgress'].splice(taskIndex, 1);
            const task = splicedTask[0]
            task.status = 'toDelete';
            currentBoard['toDelete'].push(splicedTask[0]);
            //reassing currentBoard
            state.boards[BoardIndex] = currentBoard;
        },
        deleteTasks: (state, action) => {
            const BoardIndex = state.boards.findIndex((board) => action.payload.boardID === board.id);
            const currentBoard = {...state.boards[BoardIndex]}
            //we need to find the current index of the task within the todo array
            const taskIndex = currentBoard['toDelete'].findIndex((task) => action.payload.uid === task.uid);
            //splice from the array, essentially deleting it.
            currentBoard['toDelete'].splice(taskIndex, 1);
            //reassing currentBoard
            state.boards[BoardIndex] = currentBoard;
        },
        deleteTasksEarly: (state, action) => {
            const BoardIndex = state.boards.findIndex((board) => action.payload.boardID === board.id);
            const currentBoard = {...state.boards[BoardIndex]};
            //need the status of the action payload
            const status = action.payload.status;
            //access correct array according to status
            const taskIndex = currentBoard[status].findIndex((task) => action.payload.uid === task.uid);
            currentBoard[status].splice(taskIndex, 1);
            state.boards[BoardIndex] = currentBoard;
        },
        addBoards: (state, action) => {
            //we can just push to the end of the boards array
            //create a new board that will take in the properties from action payload
            const newBoard = {
                projectName: action.payload,
                toDo: [],
                inProgress: [],
                toDelete: []
            }
            //push into state
            state.boards.push(newBoard);
        },
        deleteBoards: (state, action) => {
            //we need to traverse the state and find the index of the board to delete
            //in the array
            let index;
            state.boards.forEach((board, i) => {
                if (board.id === action.payload) index = i;
            })
            //make a shallow copy of state boards
            let boardCopy = state.boards;
            //splice the said element 
            boardCopy.splice(index, 1);
            //reassign boards to this new copy
            state.boards = boardCopy;
        },
        changeBoardName: (state, action) => {
            const BoardIndex = state.boards.findIndex((board) => action.payload.boardID === board.id);
            const currentBoard = {...state.boards[BoardIndex]};
            //now we have current board change it's name
            currentBoard.projectName = action.payload.name;
            //reassign board name
            state.boards[BoardIndex] = currentBoard;
        },
        setBoards: (state, action) => {
            //this sets the board arr when fetched from the DB
            state.boards = action.payload
        },
        loginState: (state, action) => {
            state.username = action.payload;
        }
    }
})

export const { addBoards, setBoards, loginState, changeBoardName, deleteTasksEarly, deleteBoards, deleteTasks, addTasks, finishTasks, startTasks } = storageSlice.actions;

export default storageSlice.reducer;