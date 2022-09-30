import './App.css';
import { Board } from './Board';
import useState from 'react-usestateref';
import bigButton from './assets/bigAddButton.png'
import { LoginBar, LoginPopup } from './Navbar'
import { useEffect } from 'react';

function App() {
  const [loginButtonActive, toggleLoginActive] = useState(false);
  const [ BoardsArr, updateBoardsArr ] = useState([])
  const [ addButtonClick, toggleButtonClick ] = useState(false);
  const [ newBoardName, addBoardName ] = useState('')

  //searches to see if the cookie exists
  let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)LoggedIn\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  
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

  useEffect(() => {console.log(loginButtonActive)}, [loginButtonActive, BoardsArr])
  
  //runs once to add a new board
  useEffect(() => {
    updateBoardsArr(["My Project"])
  }, [])


  return (
    <div className="main">
      <div className="createBoardDiv">
        <img onClick={addBoard} src={bigButton} height="50px" width="50px" className="createnewboard" />
       {addButtonClick ?  <input onKeyUpCapture={(e) => {addBoardWithEnter(e)}} type="text" value={newBoardName} onChange={(e) => {addBoardName(e.target.value)}}/> : null}
      </div>
      {loginButtonActive ? <div className="overlay" /> : null}
      {loginButtonActive ? <LoginPopup handleClick={closeLogin} /> : null}
      <LoginBar handleClick={openLogin} />
      <header className="App-header">
        Play Boards
      </header>
      {BoardsArr.length > 0 ? BoardsArr.map((id, index) => <Board name={id} key={index} />) : ''}
    </div>
  );
}

export default App;
