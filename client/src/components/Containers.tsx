import { useEffect, useState } from 'react';
import { CreateTask, Task } from './Task';
import { RootState } from '../redux/store';
import {addTasks, startTasks, finishTasks, deleteTasks} from '../redux/slices/storageSlice'
import { ContainerProps, taskProps as TaskProps } from './types/types';
const { v4: uuid } = require('uuid');
const { useDispatch, useSelector } = require('react-redux');


export function ToDoContainer({boardID, boardIndex}: ContainerProps) {
    const dispatch = useDispatch();
    const todoList = useSelector((state:RootState) => state.storage.boards[boardIndex].toDo);
    const [tasksList, updateTasks] = useState(todoList);

    //starts tasks from DONE -> In Progress
    function startTask(target: TaskProps) {
        const index: number = tasksList.findIndex((task: TaskProps) => task.uid === target.uid);
        const task: TaskProps = tasksList[index];
        dispatch(startTasks(task))
      }

      function addTask(newTask: {uid: string, content: string}) {
        const { uid, content } = newTask;
        //new task obj
        const task = {
          content: content,
          status: 'toDo',
          uid: uid,
          boardID: boardID,
        }
        dispatch(addTasks(task));
      }

      

      useEffect(() => {
        if (todoList !== tasksList) updateTasks(todoList);
      }, [todoList, tasksList])

    return (
        <div className="ToDoContainer">
            <div id="todoHeader"><h2>TO-DO</h2></div>
            <div className="taskList-container todo">
          {tasksList.length > 0 ? tasksList.map((id:TaskProps, index:number) => <Task uid={id['uid']} content={id['content']} status={id['status']} index={index} key={index} boardIndex={boardIndex} boardID={boardID} updateTask={startTask} />) : ''}
          <CreateTask addTask={addTask} uid={uuid()} />
            </div>
        </div>
    )
}

export function InProgressContainer({boardID, boardIndex}: ContainerProps) {
  const dispatch = useDispatch();
  const inProgressList = useSelector((state: RootState) => state.storage.boards[boardIndex].inProgress);
  const [tasksList, updateTasks] = useState(inProgressList);
  
  function handleClick(target: TaskProps) {
    const index:number = tasksList.findIndex((task: TaskProps) => task.uid === target.uid);
    const task:TaskProps = tasksList[index];
    dispatch(finishTasks(task))
  }

  useEffect(()=>{
    if (inProgressList !== tasksList) updateTasks(inProgressList)
  }, [inProgressList, tasksList]);

  return (
      <div className="InProgressContainer">
          <div className="InProgressContainer">
              <div id="inprogHeader"><h2>IN-PROGRESS</h2></div>
              <div className="taskList-container inprog">
              {tasksList.length > 0 ? tasksList.map((id: TaskProps, index: number) => <Task uid={id['uid']} content={id['content']} status={id['status']} index={index} key={index} boardID={boardID} boardIndex={boardIndex} updateTask={handleClick} />) : ''}
              </div>
          </div>
      </div>
    )
}

export function DoneContainer({boardID, boardIndex}: ContainerProps) {
  const dispatch = useDispatch();
  const DoneList = useSelector((state: RootState) => state.storage.boards[boardIndex].toDelete);
  const [tasksList, updateTasks] = useState(DoneList);

  function deleteTask(target: TaskProps) {
    const index:number = tasksList.findIndex((task: TaskProps) => task.uid === target.uid);
    const task:TaskProps = tasksList[index];
    dispatch(deleteTasks(task))
  }



  useEffect(() => {
    if (DoneList !== tasksList) updateTasks(DoneList)
  }, [DoneList, tasksList])



    return (
        <div className="DoneContainer">
            <div id="doneHeader"><h2>FINISHED</h2></div>
            <div className="taskList-container inprog">
            {tasksList.length > 0 ? tasksList.map((id: TaskProps, index: number) => <Task uid={id['uid']} status={id['status']} content={id['content']} boardID={boardID} index={index} key={index} updateTask={deleteTask} boardIndex={boardIndex}/>) : ''}
          </div>
        </div>
    )
}




