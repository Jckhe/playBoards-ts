import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stateType, boardsType, taskProps as newTask } from "../../components/types/types";
const {v4} = require('uuid')


const initialState:stateType = {
    username: '',
    boards: [{
        projectName: 'My First Project',
        toDo: new Array<newTask>(),
        inProgress: new Array<newTask>(),
        toDelete: new Array<newTask>(),
        id: v4(),
    }],
}

export const storageSlice = createSlice({
    name: 'Storage',
    initialState,
    reducers: {
        addTasks: (state, action: PayloadAction<newTask>) => {
            //
            const index: number = state.boards.findIndex((board) => action.payload.boardID === board.id);
            const currentBoard = {...state.boards[index]};
            currentBoard['toDo'].push(action.payload);
            //update state using index
            state.boards[index] = currentBoard;
        },
        startTasks: (state, action: PayloadAction<newTask>) => {
            const BoardIndex: number = state.boards.findIndex((board) => action.payload.boardID === board.id);
            //shallow copy of the current board using index
            const currentBoard: boardsType = {...state.boards[BoardIndex]}
             //we need to find the current index of the task within the todo array
             const taskIndex:number = currentBoard['toDo'].findIndex((task: newTask) => action.payload.uid === task.uid);
             //splice from array
             const splicedTask = currentBoard['toDo'].splice(taskIndex, 1);
             const task: newTask = splicedTask[0]
             task.status = 'inProgress';
             //we need to push this into the inProgress array
             //keep in mind that spliced usually returns an array
             currentBoard['inProgress'].push(task)
             //reassign currentBoard
             state.boards[BoardIndex] = currentBoard;
        },
        finishTasks: (state, action: PayloadAction<newTask>) => {
            const BoardIndex: number = state.boards.findIndex((board) => action.payload.boardID === board.id);
            const currentBoard: boardsType = {...state.boards[BoardIndex]}
            //we need to find the current index of the task within the todo array
            const taskIndex:number = currentBoard['inProgress'].findIndex((task: newTask) => action.payload.uid === task.uid);
            const splicedTask = currentBoard['inProgress'].splice(taskIndex, 1);
            const task: newTask = splicedTask[0]
            task.status = 'toDelete';
            currentBoard['toDelete'].push(splicedTask[0]);
            //reassing currentBoard
            state.boards[BoardIndex] = currentBoard;
        },
        deleteTasks: (state, action: PayloadAction<newTask>) => {
            const BoardIndex: number = state.boards.findIndex((board: boardsType) => action.payload.boardID === board.id);
            const currentBoard: boardsType = {...state.boards[BoardIndex]}
            //we need to find the current index of the task within the todo array
            const taskIndex = currentBoard['toDelete'].findIndex((task: newTask) => action.payload.uid === task.uid);
            //splice from the array, essentially deleting it.
            currentBoard['toDelete'].splice(taskIndex, 1);
            //reassigning currentBoard
            state.boards[BoardIndex] = currentBoard;
        },
        deleteTasksEarly: (state, action: PayloadAction<newTask>) => {
            const BoardIndex: number = state.boards.findIndex((board: boardsType) => action.payload.boardID === board.id);
            //needs to be any in order to index into the array correctly
            const currentBoard: any = {...state.boards[BoardIndex]};
            //need the status of the action payload
            const status: string = action.payload.status;
            //access correct array according to status
            const taskIndex = currentBoard[status].findIndex((task: newTask) => action.payload.uid === task.uid);
            currentBoard[status].splice(taskIndex, 1);
            state.boards[BoardIndex] = currentBoard;
        },
        addBoards: (state, action: PayloadAction<string>) => {
            //we can just push to the end of the boards array
            //create a new board that will take in the properties from action payload
            const newBoard:boardsType = {
                projectName: action.payload,
                toDo: new Array<newTask>(),
                inProgress: new Array<newTask>(),
                toDelete: new Array<newTask>(),
                id: v4()
            }
            //push into state
            state.boards.push(newBoard);
        },
        deleteBoards: (state, action: PayloadAction<boardsType>) => {
            //we need to traverse the state and find the index of the board to delete
            //in the array
            const BoardIndex: number = state.boards.findIndex((board: boardsType) => action.payload.id === board.id);
            //splice the said element 
            state.boards.splice(BoardIndex, 1);
        },
        changeBoardName: (state, action: PayloadAction<any>) => {
            const BoardIndex: number = state.boards.findIndex((board: boardsType) => action.payload.boardID === board.id);
            const currentBoard: boardsType = state.boards[BoardIndex];
            //now we have current board change it's name
            currentBoard.projectName = action.payload.projectName;
            //by reference, this should change the projectName
        },
        setBoards: (state, action: PayloadAction<[boardsType]>) => {
            //this sets the board arr when fetched from the DB
            state.boards = action.payload;
        },
        loginState: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        }
    }
})

// interface stateType {
//     username: string,
//     boards: [boardsType];
// }

// interface boardsType {
//     projectName: string,
//     toDo: newTask[],
//     inProgress: newTask[],
//     toDelete: newTask[],
//     id: string,
// }


// interface newTask {
//     content: string,
//     boardID: string,
//     uid: string | number,
//     status: string
// }





export const { addTasks, startTasks, loginState, finishTasks, deleteTasks, deleteTasksEarly, addBoards, deleteBoards, changeBoardName, setBoards} = storageSlice.actions;

export default storageSlice.reducer;