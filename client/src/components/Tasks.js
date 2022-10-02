/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import './App.css';
import playButton from './assets/playButton.png'
import xButton from './assets/xButton.png'
import closeButton from './assets/crossButton.png'
import { useEffect } from 'react';
import useState from 'react-usestateref'; 
import addButton from './assets/addButton.png'
import checkButton from './assets/checkButton.png'
import delButton from './assets/delButton.png'
//helper functions, refer to file. <- trying not to pollute files
import * as helper from './helperFunctions';
const { START, DONE, DELETE, statusArr, removeItemWithSlice } = helper;
console.log(statusArr)



export function Task(props) {
    const { index, updateTask, status, uid, content, deleteTask } = props;
  
    function handleStart(event) {
      let thisID;
      if (status === 'done') thisID = uid;
      else {
        thisID = {
          status: status,
          content: content,
          status: status,
          uid: uid
        }
      }
      //need this tasks, index number
      updateTask(thisID);
    }

    function delTask() {
      let thisID;
      if (status === 'todo') thisID = uid;
      else {
        thisID = {
          status: status,
          content: content,
          status: status,
          uid: uid
        }
      }
      //need this tasks, index number
      deleteTask(thisID)
    }
  
    const buttonSrc = () => {
      let statusSrc;
      // eslint-disable-next-line default-case
      switch(status) {
        case statusArr[0]: {
          statusSrc = playButton;
        }
        break;
        case statusArr[1]: {
          statusSrc = checkButton;
        }
        break;
        case statusArr[2]: {
          statusSrc = null;
        }
      }
      return statusSrc;
    }
      return (
          <div className="task">
            <div className="contentContainer">
              <span id="content-span">{props.content}</span>
            </div>
            <img alt="" height="22px" width="22px" className="taskButton2" src={closeButton} onClick={() => {delTask()}}/>
            <div className="buttonContainers">
              <img alt="" height="30px" width="30px" className="taskButton1" src={buttonSrc()} onClick={handleStart}/>
            </div>
          </div>
      )
  }
  
  
export function CreateTask(props) {
    const [taskContent, setTaskContent] = useState('');
    const [expand, openCreateTask] = useState(false);

    function HandlePress(event) {
      event.preventDefault();
      if (event.key === 'Enter') {
        const {id} = props;
        const newTask = {
          id: id,
          content: taskContent
        }
        props.addTask(newTask);
        setTaskContent('')
      }
    }


    useEffect(() => {}, [expand])

  
    return (
      <div id={ expand ? "openCreateTaskContainer" : null} className="createTaskContainer">
        {expand ?  <img className="addButton"  height="25px" src={xButton} alt="" onClick={() => {openCreateTask(false)}}/> : <img className="addButton"  height="25px" src={addButton} alt="" onClick={() => {openCreateTask(true)}}/>}
        <div className="CreateTaskHeading" id={expand ? "openedTextHeading" : null} ><h3  id={expand ? "openedTextHeading" : null} className="CreateTaskHeading">CREATE NEW TASK</h3></div>
        <div className="inputContainer">
          <input value={taskContent} onChange={(e) => {setTaskContent(e.target.value)}} id={expand ? "expandedTextForm" : null} type="text" className="create-text-form" onKeyUpCapture={(event) => {HandlePress(event)}} placeholder="Enter Task Here.."></input> 
          </div>
      </div>
    )
  }