import React, {FC, useEffect, useState} from 'react';
import { RootState } from '../redux/store'; 
import { Board } from './Boards';
import './App.css';
import bigButton from './assets/bigAddButton.png'
import { useCookies } from 'react-cookie'
import { LoginBar, LoginPopup } from './Login'
import { addBoards, loginState, setBoards } from '../redux/slices/storageSlice';
const { useDispatch, useSelector } = require('react-redux');


function App() {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.storage.boards);
  const [loginButtonActive, toggleLoginActive] = useState<boolean>(false);
  const [ isLoggedIn, toggleLoggedIn ] = useState<boolean>(false);
  const [ addButtonClick, toggleButtonClick ] = useState<boolean>(false);
  const [ newBoardName, setNewBoardName ] = useState<string>('')
  const [ cookies, setCookie, removeCookie] = useCookies();


  //add a board clicking on the plus button
  function addBoard() {
    if (addButtonClick) {
      //only process if the input field has input in it
      if (newBoardName.length > 0) {
        dispatch(addBoards(newBoardName));
        toggleButtonClick(false);
        setNewBoardName('');
      }
     } 
     else toggleButtonClick(true);
  }

  //add board with enter button
  function addBoardWithKey(event: React.KeyboardEvent<HTMLInputElement> ) {
    
    if (event.key === 'Enter') {
      //only process if the input field has input in it
      if (newBoardName.length > 0 ){
        dispatch(addBoards(newBoardName));
        toggleButtonClick(false);
        setNewBoardName('')
      }
    }
  }


  useEffect(() => {
  }, [loginButtonActive, boards])

  //runs in the beginning of load in order to retrieve boards from DB and update the state.
  useEffect(() => {
  //   if (cookies.LoggedIn) {
  //     toggleLoggedIn(true)
  //     fetch(`http://localhost:3333/getboards/:${cookies.LoggedIn}`, {
  //       method: 'GET',
  //       headers: {
  //           'Accept': "application/json, text/plain",
  //           'Content-Type': 'application/json',
  //         },
  //   })
  //   .then((res) => res.json())
  //   .then((res) => {
  //     console.log("FETCHING BOARDS: ", res);
  //     dispatch(loginState(res.username));
  //     dispatch(setBoards(JSON.parse(res.boards)))
  //   })
  // }
  }, [])

  
  return (
    <div className="main">
      <div className="createBoardDiv">
        <img onClick={addBoard} alt="" src={bigButton} height="50px" width="50px" className="createnewboard" />
       {addButtonClick ?  <input type="text" onKeyUpCapture={(e) => {addBoardWithKey(e)}} value={newBoardName} onChange={(e) => {setNewBoardName(e.target.value)}}/> : null}
      </div>
      {loginButtonActive ? <div className="overlay" /> : null}
      {loginButtonActive ? <LoginPopup toggleLoggedIn={toggleLoggedIn} toggleLoginActive={toggleLoginActive} /> : null}
      {isLoggedIn ?  <div className="loginButtonContainer"><input type="submit"className="loginButton" id="LoggedIn" placeholder='' value='Logged in as: jackie'></input></div> : <LoginBar toggleLoggedIn={toggleLoggedIn} toggleLoginActive={toggleLoginActive} />}
      <header className="App-header">
        Play Boards
      </header>
      {boards.length > 0 ? boards.map((board:any, index:number) => <Board name={board.projectName} id={board.uuid} key={index} />) : ''}
    </div>
  );
}



export default App;
