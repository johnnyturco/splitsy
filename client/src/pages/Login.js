import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import { useHistory, Link } from 'react-router-dom';

function Login() {
  const [errors, setErrors] = useState([]);

  let { user, setUser } = useContext(UserContext);

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
        r.json().then((errors)=> setErrors(Object.entries(errors.errors)))
      }
    });
  }

  console.log(user)

  function handleToSignupPage(){
    history.push("/signup")
  }

  return (
    <div>
      <h1> Welcome to Splitsy! </h1>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <lable> New to Splitsy?</lable>
      <button onClick={handleToSignupPage}> Sign Up </button>
      {errors?errors.map(e => <div>{e[0]+ ': ' + e[1]}</div>):null}
    </div>
  )
}

export default Login;