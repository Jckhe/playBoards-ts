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
import { useSelector } from 'react-redux';
const { START, DONE, DELETE, statusArr, removeItemWithSlice } = helper;

//Struggling atm with getting the splice feature on inProgress container.



export function Board({id, name}) {
  const boardIndex = useSelector((state) => state.storage.boards.findIndex((board) => id === board.id))
  const thisBoard = useSelector((state) => state.storage.boards[boardIndex])
  const state = useSelector((state) => state.storage)

  useEffect(() => {
    //this stores the board in the DB everytime a change is made in the board.
    if (state.username.length > 0) {
      let storage = {
        username: state.username, 
        boards: state.boards
      }
      fetch('http://localhost:3333/store', {
            method: 'POST',
            headers: {
                'Accept': "application/json, text/plain",
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(storage)
        })
        .then((res) => console.log("STORING TASKS SUCCESSFULLY: ", res))
      
    }
  }, [thisBoard])

  //run ONCE
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
  );
}
