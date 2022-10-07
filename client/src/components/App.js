import './App.css';
import { Board } from './Board';
import useState from 'react-usestateref';
import bigButton from './assets/bigAddButton.png'
import { LoginBar, LoginPopup } from './Navbar'
import { useEffect, useMemo } from 'react';
import { useCookies } from 'react-cookie'
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setBoards, addBoards, loginState } from '../redux/slices/storageSlice'

function App() {
  const dispatch = useDispatch();
  const boards = useSelector(state => state.storage.boards)
  const [loginButtonActive, toggleLoginActive] = useState(false);
  const [ isLoggedIn, toggleLoggedIn ] = useState(false);
  const [ addButtonClick, toggleButtonClick ] = useState(false);
  const [ newBoardName, setNewBoardName ] = useState('')
  const [ cookies, setCookie, removeCookie] = useCookies();
  

  function addBoard() {
    if (addButtonClick) {
      dispatch(addBoards(newBoardName));
      toggleButtonClick(false);
      setNewBoardName('');
     } 
     else toggleButtonClick(true);
  }

  function addBoardWithEnter(event) {
    if (event.key === 'enter') {}
  }

  useEffect(() => {
  }, [loginButtonActive, boards])
  
  //runs once to add a new board
  useEffect(() => {
    if (cookies.LoggedIn) {
      toggleLoggedIn(true)
      fetch(`http://localhost:3333/getboards/:${cookies.LoggedIn}`, {
        method: 'GET',
        headers: {
            'Accept': "application/json, text/plain",
            'Content-Type': 'application/json',
          },
    })
    .then((res) => res.json())
    .then((res) => {
      console.log("FETCHING BOARDS: ", res);
      dispatch(loginState(res.username));
      dispatch(setBoards(JSON.parse(res.boards)))
    })
  }
  }, [])



  return (
    <div className="main">
      <div className="createBoardDiv">
        <img onClick={addBoard} src={bigButton} height="50px" width="50px" className="createnewboard" />
       {addButtonClick ?  <input onKeyUpCapture={(e) => {addBoardWithEnter(e)}} type="text" value={newBoardName} onChange={(e) => {setNewBoardName(e.target.value)}}/> : null}
      </div>
      {loginButtonActive ? <div className="overlay" /> : null}
      {loginButtonActive ? <LoginPopup toggleLoginActive={toggleLoginActive} /> : null}
      {isLoggedIn ?  <div className="loginButtonContainer"><input type="submit" onClick={() => handleClick()} className="loginButton" id="LoggedIn" placeholder='' value='Logged in as: jackie'></input></div> : <LoginBar toggleLoginActive={toggleLoginActive} />}
      <header className="App-header">
        Play Boards
      </header>
      {boards.length > 0 ? boards.map((id, index) => <Board name={id.projectName} id={id.id} key={index} />) : ''}
    </div>
  );
}

export default App;
