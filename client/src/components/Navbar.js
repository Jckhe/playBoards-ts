import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useState from 'react-usestateref';
import './App.css';
import closeButton from './assets/crossButton.png'
import {loginState} from '../redux/slices/storageSlice'

export function LoginBar({toggleLoginActive}) {
    //opens the login popup 

    return (
        <>
            <div className="loginButtonContainer">
                <input type="submit" onClick={() => toggleLoginActive(true)} className="loginButton" placeholder='Login' value='Login'></input>
            </div>
        </>
    )
}

export function LoginPopup({toggleLoginActive}) {
    //hooks
    const dispatch = useDispatch();
    //closes the login popup div
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ wrongPW, toggleWrongPW ] = useState(false)
    const [ correctPW, toggleCorrectPW ] = useState(false)
    const [ signup, toggleSignup ] = useState(false)

    function handleLogin(e) {
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
                dispatch(loginState(username))
                // setTimeout(() => {window.location.reload()}, 1888)
                toggleLoginActive(false);
            }
            else if (res.status === 400) toggleWrongPW(true)
    })
}

    useEffect(() => {}, [wrongPW])

    function handleSignup(e) {
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
                <input type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" className="password"/>
                <div className="submitLoginButtonContainer"><input type="submit" onClick={handleLogin} className="submitLoginButton" placeholder='' value='Login'></input></div>
                {/* <input type="submit" className="submitLogin" onClick={} placeholder='Login' ></input> */}
                <span>No Account? Sign up here!</span>
                <input type="submit" className="submitLoginButton loginbuttons2" onClick={() => {toggleSignup(true)}} value='Sign Up'></input>
                <input type="submit" className="submitLoginButton loginbuttons2" onClick={() => {toggleLoginActive(false)}} value='Guest Mode'></input>
            </div>
        )
    }

    function SignUpContainer() {
        return (
            <div className="loginContainer">
                <input type="text" key="username" value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder="Username" className="username"/>
                <input type="text" key="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" className="password"/>
                <input type="submit" className="submitLogin" onClick={(handleSignup)} placeholder='Signup' ></input>
            </div>
        )
    }



    return (
        <div className="loginPopupDiv">
            <img src={closeButton} onClick={() => {toggleLoginActive(false)}} alt="" className="closeLogin"/>
            {!signup ? <h3 id="loginHeader">LOGIN</h3> :  <h3 id="loginHeader">SIGN UP</h3>}
            {!signup ? LoginContainer() : SignUpContainer()}
        </div>
    )
}