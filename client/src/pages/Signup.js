import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import { useHistory, Link } from 'react-router-dom';

function SignUp() {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let { user, setUser } = useContext(UserContext);
  let history = useHistory();

  const [ credentials, setCredentials ] = useState({
    first_name: "",
    last_name: "",
    venmo_username: "",
    username: "",
    password: "",
    password_confirmation: ""
  })

  function handleChange(e) {
    setCredentials((prevCredentials) => {
      return {
        ...prevCredentials,
        [e.target.name]: e.target.value
      }
    })
  };

  function handleSignUp(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials)
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => setUser(user));
        history.push("/home");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    },[]);
  }

  function handleToLoginPage(){
    history.push("/")
  }

  return (
    <div>
      <h1> Let's Get Started! </h1>
      <form onSubmit={handleSignUp}>
        <label>First Name: </label>
        <br></br>
        <input
          type="text"
          name="first_name"
          // placeholder="First Name"
          value={credentials.first_name}
          onChange={handleChange}
        />
            <br></br>
        <label>Last Name: </label>
        <br></br>
        <input
          type="text"
          name="last_name"
          // placeholder="Last Name"
          value={credentials.last_name}
          onChange={handleChange}
        />
            <br></br>
        <label>Username: </label>
        <br></br>
        <input
          type="text"
          name="username"
          // placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
        />
            <br></br>
        <label>Venmo Username: </label>
        <br></br>
        <input
          type="text"
          name="venmo_username"
          // placeholder="Venmo Username"
          value={credentials.venmo_username}
          onChange={handleChange}
        />
            <br></br>
        <label>Password: </label>
        <br></br>
        <input
          type="password"
          name="password"
          // placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
            <br></br>
        <label>Confirm Password: </label>
        <br></br>
        <input
          type="password"
          name="password_confirmation"
          // placeholder="Confirm Password"
          value={credentials.password_confirmation}
          onChange={handleChange}
          autoComplete="current-password"
        />
            <br></br>
            <br></br>
        <button type="submit">
          Create Account
        </button>
            <br></br>
            <br></br>
        <label> Already Using Splitsy? </label>
        <button onClick={handleToLoginPage}>Login</button>
      </form>
        <div>
            {errors.map((err) => (
              <p key={err}>{err}</p>
            ))}
        </div>
    </div>
  )
}

export default SignUp;