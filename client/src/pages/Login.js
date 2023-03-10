import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import { useHistory } from 'react-router-dom';

function Login() {
  const [errors, setErrors] = useState([]);

  let { setUser } = useContext(UserContext);

  let history = useHistory();

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })

  function handleChange(e) {
    setCredentials((prevCredentials) => {
      return {
        ...prevCredentials,
        [e.target.name]: e.target.value
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    }).then((r) => {
      if (r.ok) {
        r.json().then((currentUser) => setUser(currentUser));
        history.push("/home")
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    },[]);
  }

  // console.log(user)

  function handleToSignupPage(){
    history.push("/signup")
  }

  return (
    <div>
      <h1 className="LoginTitle"> Welcome to Splitsy! </h1>
      <form onSubmit={handleSubmit} className="LoginForm">
      <h2>Please Login!</h2>

        <div className="form-div">
          <label className="FormLabel">Username: </label>
          <input
            className="SignUpFormInput"
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-div">
          <label className="FormLabel">Password: </label>
          <input
            className="SignUpFormInput"
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>

        <br></br>
        <button type="submit" className="FormBtn">Login</button>
      </form>
      <br></br>
      <div className="ToSignUp">
        <label className="FormLabel"> New to Splitsy?</label>
        <button
          onClick={handleToSignupPage}
          className="FormBtn"
      > Sign Up </button>
      </div>

        <div>
          {errors.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
    </div>
  )
}

export default Login;