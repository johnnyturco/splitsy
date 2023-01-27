import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import { useHistory } from 'react-router-dom';

function Signup() {
  const [errors, setErrors] = useState([]);
  const [ setIsLoading] = useState(false);

  let { setUser } = useContext(UserContext);
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
    // setIsLoading(true);

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials)
    }).then((r) => {
      // setIsLoading(false);
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
      <h1 className="SignUpTitle"> Let's Get Started! </h1>
      <form onSubmit={handleSignUp} className="SignUpForm">

        <div className="form-div">
          <label className="FormLabel">First Name: </label>
          <input
            className="SignUpFormInput"
            type="text"
            name="first_name"
            // placeholder="First Name"
            value={credentials.first_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-div">
          <label className="FormLabel">Last Name: </label>
          <input
            className="SignUpFormInput"
            type="text"
            name="last_name"
            // placeholder="Last Name"
            value={credentials.last_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-div">
          <label className="FormLabel">Username: </label>
          <input
            className="SignUpFormInput"
            type="text"
            name="username"
            // placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-div">
          <label className="FormLabel">Venmo Username: </label>
          <input
            className="SignUpFormInput"
            type="text"
            name="venmo_username"
            // placeholder="Venmo Username"
            value={credentials.venmo_username}
            onChange={handleChange}
          />
        </div>

        <div className="form-div">
          <label className="FormLabel">Password: </label>
          <input
            className="SignUpFormInput"
            type="password"
            name="password"
            // placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </div>

        <div className="form-div">
          <label className="FormLabel">Confirm Password: </label>
          <input
            className="SignUpFormInput"
            type="password"
            name="password_confirmation"
            // placeholder="Confirm Password"
            value={credentials.password_confirmation}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </div>

        <br></br>
        <button type="submit" className="FormBtn">
          Create Account
        </button>
            <br></br>
            <br></br>
        <label className="FormLabel"> Already Using Splitsy? </label>
        <button onClick={handleToLoginPage} className="FormBtn" >Login</button>
      </form>
        <div>
            {errors.map((err) => (
              <p key={err}>{err}</p>
            ))}
        </div>
    </div>
  )
}

export default Signup;