import React, {FC, useEffect} from 'react';
import { RootState } from '../redux/store';
import {ToDoContainer, InProgressContainer, DoneContainer} from './Containers'
const { useDispatch, useSelector } = require('react-redux');


type BoardProps = {
    name: string,
    id: string,
    key?: number
  }
  
  
  
  //need to define types for Board
  //FC is the type definition from the react library
export function Board({name, id, key}: BoardProps){
  const boardIndex = useSelector((state:RootState) => state.storage.boards.findIndex((board:any) => id === board.id))
  const thisBoard = useSelector((state:RootState) => state.storage.boards[boardIndex])
  const state = useSelector((state:RootState) => state.storage)



  useEffect(() => {
    //makes Query to database to store/update the cache every time an a change is made on the board.
    if (state.username.length > 0) {
      const updatedState: any = {
        username: state.username,
        boards: state.boards
      }
      fetch('http://localhost:3333/store', {
            method: 'POST',
            headers: {
                'Accept': "application/json, text/plain",
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedState)
        })
        .then((res) => console.log("STORING TASKS SUCCESSFULLY: ", res))
    }
  })



  //run ONCE.
  useEffect(() => {
  }, [])

    return (
      <div className="Board">
        <div className="BoardHeading"><h2>{name}</h2></div>
        <div className="ContainerDiv">
          <ToDoContainer boardID={id} boardIndex={boardIndex} />
          <InProgressContainer boardID={id} boardIndex={boardIndex} />
          <DoneContainer boardID={id} boardIndex={boardIndex} />
        </div>
      </div>
    )
  }