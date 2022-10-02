/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import './App.css';
import { ToDoContainer, InProgressContainer, DoneContainer } from './Containers';
import { useCallback, useEffect, useMemo, useId, useRef } from 'react';
import useState from 'react-usestateref'
import Cookies from 'js-cookie';
import axios from 'axios';
import greyButton from './assets/button.png'
import { v4 as uuid } from 'uuid';
import { useCookies } from 'react-cookie';
//helper functions, refer to file. <- trying not to pollute files
import * as helper from './helperFunctions'
const { START, DONE, DELETE, statusArr, removeItemWithSlice } = helper;

//Struggling atm with getting the splice feature on inProgress container.



export function Board(props) {
  const [taskStorage, updateTaskStorage] = useState({});
  //highest level of tasks lists
  const [todoList, addTasks] = useState([]);
  const [progressList, addProgressList, progressListref] = useState([]);
  const [doneList, addDoneList] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();

  const {name, username, dbTaskStorage} = props;

  function storeTasks(task) {
    const {id, content, status} = task;
    addTasks([...todoList, task]);
  }

  function deleteTaskBoard(taskID) {
      let todoIndex;
      console.log("TASKID START", taskID)
      todoList.forEach((el, index) => { if (el.uid === taskID) todoIndex = index });
      const task = todoList.splice(todoIndex, 1)
      addTasks([...todoList])
  }

  function deleteTaskBoardInProgress(taskID) {
    let todoIndex;
    console.log("TASKID START", taskID)
    progressList.forEach((el, index) => { if (el.uid === taskID) todoIndex = index });
    const task = progressList.splice(todoIndex, 1)
    addProgressList([...progressList])
}


  function updateTasks(update) {
    const { task } = update;
    // eslint-disable-next-line default-case
    switch ( update.type ) {
      // eslint-disable-next-line no-lone-blocks
      case START: {
        task.status = 'inprogress';
        console.log("START", task)
        let todoIndex;
        todoList.forEach((el, index) => { if (el.uid === task.uid) todoIndex = index });
        todoList.splice(todoIndex, 1);
        addTasks([...todoList])
        addProgressList(progressList.concat(task));
      }
      break;
      case DONE: {
        task.status = 'done'
        console.log("INPRO", task)
        let inProgIndex;
        todoList.forEach((el, index) => { if (el.uid === task.uid) inProgIndex = index });
        // console.log('BEFORE: ', progressList)
        progressList.splice(inProgIndex, 1)
        // console.log('AFTER: ', progressList)
        addProgressList([...progressList])
        addDoneList([...doneList, task])
      }
      break;
      case DELETE: 
        task.status = 'delete'
        return; 
    }
    return task;
  }

  useEffect(() => {
    console.log("UPDATED STATE?", todoList, progressList, doneList)
    const updatedTaskStore = {
      todoList: todoList,
      progressList: progressList,
      doneList: doneList
    }
    //updates the master task storage obj
    updateTaskStorage(updatedTaskStore);
    console.log("UPHERE",taskStorage)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoList, progressList, doneList])

  useEffect(() => {
    if (cookies.LoggedIn) {
      fetch('http://localhost:3333/store', {
            method: 'POST',
            headers: {
                'Accept': "application/json, text/plain",
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({username: username, boards: taskStorage})
        })
        .then((res) => console.log(res))
      
    }
  }, [taskStorage])

  //run ONCE
  useEffect(() => {
    if (cookies.LoggedIn) {
      updateTasks(dbTaskStorage)
      addTasks(dbTaskStorage.todoList)
      addProgressList(dbTaskStorage.progressList)
      addDoneList(dbTaskStorage.doneList)
    }
  }, [props])



  return (
    <div className="Board">
      <div className="BoardHeading"><h2>{props.name}</h2></div>
      <div className="ContainerDiv">
        <ToDoContainer todoList={todoList} deleteTaskBoard={deleteTaskBoard} updateTasks={updateTasks} storeTasks={storeTasks}/>
        <InProgressContainer deleteTaskBoard={deleteTaskBoardInProgress} updateTasks={updateTasks} progressList={progressList} />
        <DoneContainer updateTasks={updateTasks} doneList={doneList} />
      </div>
    </div>
  );
}
