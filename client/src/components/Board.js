/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import './App.css';
import { ToDoContainer, InProgressContainer, DoneContainer } from './Containers';
import { useCallback, useEffect, useId, useRef } from 'react';
import useState from 'react-usestateref'
import greyButton from './assets/button.png'
import { v4 as uuid } from 'uuid';
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

  const {name} = props;

  function storeTasks(task) {
    const {id, content, status} = task;
    addTasks([...todoList, task]);
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
    const updatedTaskStore = {
      todoList: todoList,
      progressList: progressList,
      doneList: doneList
    }
    //updates the master task storage obj
    updateTaskStorage(updatedTaskStore);
    console.log(taskStorage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoList, progressList, doneList])

  return (
    <div className="Board">
      <div className="BoardHeading"><h2>{props.name}</h2></div>
      <div className="ContainerDiv">
        <ToDoContainer updateTasks={updateTasks} storeTasks={storeTasks}/>
        <InProgressContainer updateTasks={updateTasks} progressList={progressList} />
        <DoneContainer updateTasks={updateTasks} doneList={doneList} />
      </div>
    </div>
  );
}
