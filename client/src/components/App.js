import './App.css';
import { Board } from './Board';
import useState from 'react-usestateref';
import bigButton from './assets/bigAddButton.png'
import { LoginBar, LoginPopup } from './Navbar'
import { LoginLanding } from './LoginLanding';
import { useEffect, useMemo } from 'react';
import { useCookies } from 'react-cookie'
import axios from 'axios';


function App() {
  const [loginButtonActive, toggleLoginActive] = useState(false);
  const [ isLoggedIn, toggleLoggedIn ] = useState(false);
  const [ BoardsArr, updateBoardsArr ] = useState([])
  const [ addButtonClick, toggleButtonClick ] = useState(false);
  const [ newBoardName, addBoardName ] = useState('')
  const [ username, setUsername ] = useState(null)
  const [ cookies, setCookie, removeCookie] = useCookies();
  const [ dbTaskStorage, setTaskStorage] = useState({})

  
  function openLogin(e) {
    toggleLoginActive(true);
  }

  function closeLogin(e) {
    toggleLoginActive(false);
  }

  function addBoard() {
   if (addButtonClick) {
    let id = BoardsArr.length;
    updateBoardsArr([...BoardsArr, newBoardName])
    toggleButtonClick(false)
    addBoardName('')
   } else {
    toggleButtonClick(true)
   }
  }

  function addBoardWithEnter(event) {
    if (event.key === 'enter') {
    if (addButtonClick) {
      let id = BoardsArr.length;
      updateBoardsArr([...BoardsArr, newBoardName])
      toggleButtonClick(false)
      addBoardName('')
     } else {
      toggleButtonClick(true)
     }
    }
  }

  useEffect(() => {}, [loginButtonActive, BoardsArr])
  
  //runs once to add a new board
  useEffect(() => {

    if (cookies.LoggedIn) {
      setUsername(cookies.LoggedIn)
      toggleLoggedIn(true)
      axios.get(`http://localhost:3333/getboards/:${cookies.LoggedIn}`)
      .then((res) => {
        console.log("AXIOS", res.data.boards)
        const fetchedTaskObj = JSON.parse(res.data.boards)
        setTaskStorage(fetchedTaskObj)
        updateBoardsArr(["My Project"])
      })
    } else {
      updateBoardsArr(["My Project"])
      toggleLoginActive(true)
    }
  }, [])



  return (
    <div className="main">
      <div className="createBoardDiv">
        <img onClick={addBoard} src={bigButton} height="50px" width="50px" className="createnewboard" />
       {addButtonClick ?  <input onKeyUpCapture={(e) => {addBoardWithEnter(e)}} type="text" value={newBoardName} onChange={(e) => {addBoardName(e.target.value)}}/> : null}
      </div>
      {loginButtonActive ? <div className="overlay" /> : null}
      {loginButtonActive ? <LoginPopup handleClick={closeLogin} /> : null}
      {isLoggedIn ?  <div className="loginButtonContainer"><input type="submit" onClick={() => handleClick()} className="loginButton" id="LoggedIn" placeholder='' value='Logged in as: jackie'></input></div> : <LoginBar handleClick={openLogin} />}
      <header className="App-header">
        Play Boards
      </header>
      {BoardsArr.length > 0 ? BoardsArr.map((id, index) => <Board dbTaskStorage={dbTaskStorage} username={username} name={id} key={index} />) : ''}
    </div>
  );
}

export default App;
