import { useEffect } from 'react';
import useState from 'react-usestateref';
import './App.css';
import closeButton from './assets/crossButton.png'


export function LoginBar(props) {
    //opens the login popup 
    const { handleClick } = props;

    return (
        <>
            <div className="loginButtonContainer">
                <input type="submit" onClick={() => handleClick()} className="loginButton" placeholder='Login' value='Login'></input>
            </div>
        </>
    )
}

export function LoginPopup(props) {
    //closes the login popup div
    const { handleClick } = props;
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ wrongPW, toggleWrongPW ] = useState(false)
    const [ correctPW, toggleCorrectPW ] = useState(false)
    const [ signup, toggleSignup ] = useState(false)

    function handleLogin(e) {
        console.log("USERNAME: ", username)
        console.log("PASSWORD", password)
        //clears the fields
        fetch('http://localhost:3333/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': "application/json, text/plain",
                'Content-Type': 'application/json',
                'x-Trigger': 'CORS'

              },
              body: JSON.stringify({username: username, password: password})
        })
        .then(res => {
            //check for response
            if (res.status === 200) {
                toggleCorrectPW(true) 
                setTimeout(() => {window.location.reload()}, 1888)
            }
            else if (res.status === 400) {
                toggleWrongPW(true)
            }
        })


    }

    useEffect(() => {}, [wrongPW])

    function handleSignup(e) {
        console.log("USERNAME: ", username)
        console.log("PASSWORD", password)
        //clears the fields
        fetch('http://localhost:3333/signup', {
            method: 'POST',
            headers: {
                'Accept': "application/json, text/plain",
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({username: username, password: password})
        })
        .then(res => console.log(res))
    }


    function LoginContainer() {
        return (
            <div className="loginContainer">
                { wrongPW ? <span style={{color: 'red'}}>Invalid Password / User !</span> : null}
                { correctPW ?  <span style={{color: 'green'}}>Success! Logging In..</span> : null}
                <input type="text" onChange={(e) => {setUsername(e.target.value)}} placeholder="Username" className="username"/>
                <input type="text" onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" className="password"/>
                <input type="submit" className="submitLogin" onClick={handleLogin} placeholder='Login' ></input>
                <span>No Account? Sign up here!</span>
                <input type="submit" className="signUp" onClick={() => {toggleSignup(true)}} placeholder='Signup'></input>
            </div>
        )
    }

    function SignUpContainer() {
        return (
            <div className="loginContainer">
                <h4>Sign up!</h4>
                <input type="text" key="username" value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder="Username" className="username"/>
                <input type="text" key="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" className="password"/>
                <input type="submit" className="submitLogin" onClick={handleSignup} placeholder='Signup' ></input>
            </div>
        )
    }



    return (
        <div className="loginPopupDiv">
            <img src={closeButton} onClick={() => {handleClick()}} alt="" className="closeLogin"/>
            <h3>Login</h3>
            {!signup ? LoginContainer() : SignUpContainer()}
        </div>
    )
}