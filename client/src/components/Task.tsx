import { useEffect, useState } from 'react';
import playButton from './assets/playButton.png'
import xButton from './assets/Xbutton.png'
import './App.css';
import closeButton from './assets/crossButton.png'
import addButton from './assets/addButton.png'
import checkButton from './assets/checkButton.png'
import delButton from './assets/delButton.png'
import { useDispatch } from 'react-redux';
import { deleteTasksEarly } from '../redux/slices/storageSlice';
import {taskComponentProps, createTaskProps} from './types/types'

export function Task({content, boardID, key, status, uid, updateTask}: taskComponentProps) {
  const dispatch = useDispatch();
  //represent's this task's info's contained in an object. Most of these values are passed in from the props.
  const task = {
    content: content,
    uid: uid,
    status: status,
    boardID: boardID
  }


  //handles the button source for img buttons, purely CSS/HTML mechanism here.
  function buttonSrc() {
    if (status === 'toDo') return playButton;
    if (status === 'inProgress') return checkButton;
    if (status === 'toDelete') return delButton;
  }

    return (
        <div className="task">
        <div className="contentContainer">
          <span id="content-span">{content}</span>
        </div>
        {/* DELETE BUTTON */}
        <img alt="" height="22px" width="22px" className="taskButton2" src={closeButton} onClick={() => {dispatch(deleteTasksEarly(task))}}/>
        <div className="buttonContainers">
          {/* ACTION BUTTON */}
          <img alt="" height="30px" width="30px" className="taskButton1" src={buttonSrc()} onClick={() => {updateTask(task)}}/>
        </div>
      </div>
    )
}

export function CreateTask({addTask, uid}:createTaskProps) {
    const [taskContent, setTaskContent] = useState<string>('');
    const [expand, openCreateTask] = useState<boolean>(false);

    //handle's pressing enter while in the create task box.
    function HandlePress(event: React.KeyboardEvent<HTMLTextAreaElement>) {
      event.preventDefault();
      if (event.key === 'Enter') {
        const newTask = {
          content: taskContent,
          uid: uid
        }
        addTask(newTask);
        setTaskContent('')
      }
    }

    useEffect(() => {
      
    }, [expand])

    return (
        <div style={{height: `${expand ? '200px' : '100px'}`}} className="createTaskContainer">
          {expand ?  <img className="addButton"  height="25px" src={xButton} alt="" onClick={() => {openCreateTask(true)}}/> : <img className="addButton"  height="25px" src={addButton} alt="" onClick={() => {openCreateTask(true)}}/>}
          <div className="CreateTaskHeading" ><h3 className="CreateTaskHeading">CREATE NEW TASK</h3></div>
          <div className="inputContainer">
            <textarea 
            value={taskContent}
            onChange={(e) => {setTaskContent(e.target.value)}}
            
            style={{height: `${expand ? '80px' : '20px'}`}}
            className="create-text-form" 
            onKeyUpCapture={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {HandlePress(event)}} 
            placeholder="Enter Task Here.."
            ></textarea> 
            </div>
        </div>
      )
}


