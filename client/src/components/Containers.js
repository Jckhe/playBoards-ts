/* eslint-disable no-unused-vars */
import './App.css';
import { Task, CreateTask } from './Tasks';
import { useEffect } from 'react';
import useState from 'react-usestateref';
import { v4 as uuid } from 'uuid';
//helper functions, refer to file. <- trying not to pollute files
import * as helper from './helperFunctions';
const { START, DONE, DELETE, statusArr, removeItemWithSlice } = helper;

export function ToDoContainer(props) {
    //useState to define the array of tasks to do
    const [tasksList, addTasks] = useState([]);
    const { storeTasks, updateTasks, uid, todoList } = props;
  
    function addTask(newTask) {
      const { id, content, uid } = newTask;
      //new task obj
      const task = {
        id: id,
        content: content,
        status: 'todo',
        uid: uuid()
      }
      addTasks([...tasksList, task]);
      storeTasks(task);
    }
  
    //starts tasks from DONE -> In Progress
    function startTask(taskID) {
      let todoIndex;
      tasksList.forEach((el, index) => { if (el.uid === taskID.uid) todoIndex = index });
      const task = tasksList.splice(todoIndex, 1)
      task[0].uid = taskID;
      const update = {
        type: "START",
        task: task[0],
      }
      addTasks([...tasksList]);
      updateTasks(update)
    }

    function deleteTask(taskID) {
      let todoIndex;
      tasksList.forEach((el, index) => { if (el.uid === taskID) todoIndex = index });
      const task = tasksList.splice(todoIndex, 1)
      addTasks([...tasksList]);
      props.deleteTaskBoard(taskID);
    }
  
  
    useEffect(() => {
      if (todoList !== tasksList) {
        addTasks(todoList)
      }
    }, [todoList, tasksList])
  
    return (
      <div className="ToDoContainer">
        <div id="todoHeader"><h2>TO-DO</h2></div>
        <div className="taskList-container todo">
          {tasksList.length > 0 ? tasksList.map((id, index) => <Task deleteTask={deleteTask} uid={id['uid']} content={id['content']} status={id['status']} index={index} key={index} updateTask={startTask} />) : ''}
          <CreateTask id={Math.max(0, tasksList.length)} addTask={addTask} />
        </div>
      </div>
    )
  }
  
  export function InProgressContainer(props) {
    
    const { deleteTaskBoard, progressList, updateTasks } = props;
    const [tasksList, addTasks] = useState(progressList);
  
  
    function finishTask(taskID) {
      let inProgIndex;
      tasksList.forEach((el, index) => { if (el.uid === taskID.uid.uid) inProgIndex = index});
      let updatedList = removeItemWithSlice(tasksList, inProgIndex)
      const update = {
        type: "DONE",
        task: taskID.uid,
      }
      addTasks(updatedList);
      updateTasks(update);
      
    }

    function deleteTask(taskID) {
      let inProgIndex;
      tasksList.forEach((el, index) => { if (el.uid === taskID.uid) inProgIndex = index });
      const task = tasksList.splice(inProgIndex, 1)
      addTasks([...tasksList]);
      deleteTaskBoard(taskID);
    }
      
    useEffect(()=>{
      if (progressList !== tasksList) {
        addTasks(progressList)
      }
    }, [progressList, tasksList]);
  
    return (
      <div className="InProgressContainer">
        <div id="inprogHeader"><h2>IN-PROGRESS</h2></div>
        <div className="taskList-container inprog">
          {tasksList.length > 0 ? tasksList.map((id, index) => <Task deleteTask={deleteTask} uid={id['uid']} content={id['content']} status={id['status']} id={id} index={index} key={index} updateTask={finishTask} />) : ''}
        </div>
      </div>
    )
  }
  
  export function DoneContainer(props) {
    const { doneList, updateTasks } = props;
    const [tasksList, addTasks] = useState(doneList);
  
    function deleteTask(taskID) {
      let delIndex;
      tasksList.forEach((el, index) => { if (el.uid === taskID.uid) inProgIndex = index});
      const task = tasksList.splice(taskID, 1)
      const update = {
        type: "DELETE",
        task: task[0],
      }
      addTasks([...tasksList]);
      updateTasks(update)
    }
  
  
    useEffect(() => {
      if (doneList !== tasksList) {
        addTasks(doneList);
      }
    }, [doneList, tasksList])
  
    return (
      <div className="DoneContainer">
        <div id="doneHeader"><h2>FINISHED</h2></div>
          <div className="taskList-container inprog">
            {tasksList.length > 0 ? tasksList.map((id, index) => <Task uid={id['uid']} status={id['status']} content={id['content']} index={index} key={index} updateTask={deleteTask} />) : ''}
          </div>
      </div>
    )
  }