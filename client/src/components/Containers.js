/* eslint-disable no-unused-vars */
import './App.css';
import { Task, CreateTask } from './Tasks';
import { useEffect } from 'react';
import useState from 'react-usestateref';
import { v4 as uuid } from 'uuid';
//helper functions, refer to file. <- trying not to pollute files
import * as helper from './helperFunctions';
import { useSelector, useDispatch } from 'react-redux';
import {addTasks, startTasks, finishTasks, deleteTasks} from '../redux/slices/storageSlice'
const { START, DONE, DELETE, statusArr, removeItemWithSlice } = helper;

export function ToDoContainer(props) {
    const { boardID, boardIndex } = props;
    //get the current board's todo list
    const dispatch = useDispatch();
    const todoList = useSelector((state) => state.storage.boards[boardIndex].toDo);
    const [tasksList, updateTasks] = useState(todoList);
    
  
    function addTask(newTask) {
      const { id, content, uid } = newTask;
      //new task obj
      const task = {
        id: id,
        content: content,
        status: 'toDo',
        uid: uuid(),
        boardID: boardID,
      }
      dispatch(addTasks(task));
    }
  
    //starts tasks from DONE -> In Progress
    function startTask(target) {
      const index = tasksList.findIndex((task) => task.uid === target.uid);
      const task = tasksList[index];
      dispatch(startTasks(task))
    }

    function deleteTask(taskID) {
      let todoIndex;
      tasksList.forEach((el, index) => { if (el.uid === taskID) todoIndex = index });
      const task = tasksList.splice(todoIndex, 1)
      props.deleteTaskBoard(taskID);
    }
  
  
    useEffect(() => {
      if (todoList !== tasksList) {
        updateTasks(todoList)
      }
    }, [todoList, tasksList])
  
    return (
      <div className="ToDoContainer">
        <div id="todoHeader"><h2>TO-DO</h2></div>
        <div className="taskList-container todo">
          {tasksList.length > 0 ? tasksList.map((id, index) => <Task deleteTask={deleteTask} uid={id['uid']} content={id['content']} status={id['status']} index={index} key={index} boardIndex={boardIndex} updateTask={startTask} />) : ''}
          <CreateTask addTask={addTask} id={Math.max(0, tasksList.length)} />
        </div>
      </div>
    )
  }
  
  export function InProgressContainer(props) {
    const { boardIndex } = props;
    //get the current board's todo list
    const dispatch = useDispatch();
    const inProgressList = useSelector((state) => state.storage.boards[boardIndex].inProgress);
    const [tasksList, updateTasks] = useState(inProgressList);
  
  
    function finishTask(target) {
      
      const index = tasksList.findIndex((task) => task.uid === target.uid);
      const task = tasksList[index];
      dispatch(finishTasks(task))
    }

    function deleteTask(taskID) {
      let inProgIndex;
      tasksList.forEach((el, index) => { if (el.uid === taskID.uid) inProgIndex = index });
      const task = tasksList.splice(inProgIndex, 1)
      deleteTaskBoard(taskID);
    }
      
    useEffect(()=>{
      if (inProgressList !== tasksList) {
        updateTasks(inProgressList);
      }
    }, [inProgressList, tasksList]);
  
    return (
      <div className="InProgressContainer">
        <div id="inprogHeader"><h2>IN-PROGRESS</h2></div>
        <div className="taskList-container inprog">
          {tasksList.length > 0 ? tasksList.map((id, index) => <Task deleteTask={deleteTask} uid={id['uid']} content={id['content']} status={id['status']} id={id} index={index} boardIndex={boardIndex} key={index} updateTask={finishTask} />) : ''}
        </div>
      </div>
    )
  }
  
  export function DoneContainer(props) {
    const { boardIndex } = props;
    //get the current board's todo list
    const dispatch = useDispatch();
    const doneList = useSelector((state) => state.storage.boards[boardIndex].toDelete);
    const [tasksList, updateTasks] = useState(doneList);
  
    function deleteTask(target) {
      console.log("CHECKING ARG IN FINISH TASK: ", target)
      const index = tasksList.findIndex((task) => task.uid === target.uid);
      const task = tasksList[index];
      console.log("DELTASKS: ", task)
      dispatch(deleteTasks(task))
    }
  
  
    useEffect(() => {
      if (doneList !== tasksList) {
        updateTasks(doneList);
      }
    }, [doneList, tasksList])
  
    return (
      <div className="DoneContainer">
        <div id="doneHeader"><h2>FINISHED</h2></div>
          <div className="taskList-container inprog">
            {tasksList.length > 0 ? tasksList.map((id, index) => <Task uid={id['uid']} status={id['status']} content={id['content']} index={index} key={index} updateTask={deleteTask} boardIndex={boardIndex}/>) : ''}
          </div>
      </div>
    )
  }