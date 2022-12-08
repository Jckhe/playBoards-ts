import React, {FC, useEffect, useState} from 'react';
import { RootState } from '../redux/store';
import {ToDoContainer, InProgressContainer, DoneContainer} from './Containers'
import { changeBoardName } from '../redux/slices/storageSlice';
import editButton from './assets/editButton.png'
const { useDispatch, useSelector } = require('react-redux');


type BoardProps = {
    name: string,
    id: string,
    key?: number
  }
  
  
  
  //need to define types for Board
  //FC is the type definition from the react library
export function Board({name, id, key}: BoardProps){
  const dispatch = useDispatch();
  console.log("checking ID", id)
  const boardIndex = useSelector((state:RootState) => state.storage.boards.findIndex((board:any) => id === board.uuid))
  const thisBoard = useSelector((state:RootState) => state.storage.boards[boardIndex])
  const thisBoardName = useSelector((state:RootState) => state.storage.boards[boardIndex].projectName)
  const state = useSelector((state:RootState) => state.storage)
  //useState hooks
  const [ projectName, setProjectName ] = useState<string>(thisBoardName)
  const [ editHeading, toggleEdit ] = useState<boolean>(false);
  const [ modifyBoard, toggleModify ] = useState<boolean>(false);
  


  function editBoardName(e: any) {
    const update = {projectName: e.target.value, boardID: thisBoard.uuid}
    if (e.key === 'Enter') {
      //update board name in state/redux
      dispatch(changeBoardName(update));
      //toggle the edit project name useState false.
      toggleEdit(false);
    }
  }


  //useMutation + graphQL variables.
  //add asoccuser to board name
  const board = {...thisBoard}
  board.assocuser = state.username;
  const variables = {
    username: state.username,
    board: board
  }
  //make the query here
  const query = `mutation($username: String, $board: BoardType) {
    storeBoards(username: $username , board: $board)
  }`

  useEffect(() => {
    
    //makes Query to database to store/update the cache every time an a change is made on the board.
    if (state.username.length > 0) {
      
      fetch('http://localhost:3333/graphql', {
            method: 'POST',
            headers: {
                'Accept': "application/json, text/plain",
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({variables, query})
        })
        .then((res) => res.json())
        .then((res) => console.log(res))
    }
  }, [thisBoard])

  function handleEdit() {
    const update = {projectName: projectName, boardID: thisBoard.id}
    if (editHeading) {
       //update board name in state/redux
       dispatch(changeBoardName(update));
       //toggle the edit project name useState false.
       toggleEdit(false);
    } else {
      toggleEdit(true)
    }
  }

  useEffect(() => {
    if (thisBoardName !== projectName) setProjectName(thisBoardName)
  }, [thisBoardName])

  const editBoardNameInput = () => {
    return (
      <div className="editBoardName">
        <input type="text" className="projectInput" value={projectName} onKeyUpCapture={(e) => editBoardName(e)} onChange={(e) => {setProjectName(e.target.value)}} />
      </div>
    )
  }



  //run ONCE.
  useEffect(() => {
  }, [])

    return (
      <div className="Board">
        <div className="customizeDiv"><input type="submit" onClick={() => handleEdit()} className="customizeButton" placeholder='Customize' value='Customize'></input></div>
        <div className="editButtonDiv"><img onClick={() => {toggleEdit(!editHeading)}} src={editButton} height="20px" width="20px" alt="" className="editButton" /></div>
        <div className="BoardHeading">
          {editHeading ? editBoardNameInput() : null }
          <div className="headingDiv" onClick={() => {toggleEdit(true)}}>
            {editHeading ? null : <h2>{thisBoardName}</h2> }
          </div>
        </div>
        <div className="ContainerDiv">
          <ToDoContainer boardID={id} boardIndex={boardIndex} />
          <InProgressContainer boardID={id} boardIndex={boardIndex} />
          <DoneContainer boardID={id} boardIndex={boardIndex} />
        </div>
      </div>
    )
  }