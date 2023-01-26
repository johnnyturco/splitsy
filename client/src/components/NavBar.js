import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { NavLink, Link, useHistory } from "react-router-dom";

const NavBar = () => {

  let { user, setUser } = useContext(UserContext);
  let history = useHistory();

  function handleLogoutClick(){
    fetch("/logout", {
      method: "DELETE"
    }).then((r) => {
      if (r.ok) {
        setUser(null)
      }
    },[]);
  }

  return (
    <div>
      <h3>
        <span>Splitsy</span> | An App to Split Expenses
      </h3>
      {!user ? (<div></div>) : (
        <div>
          <nav>
            <NavLink exact to="/home">My Bills</NavLink>
            <NavLink exact to="/items-owed">Items Owed</NavLink>
            <NavLink exact to="/profile">Profile</NavLink>
            <NavLink exact to="/" onClick={handleLogoutClick}>Logout</NavLink>
          </nav>
          <h1> Hello, {user.first_name}! </h1>
        </div>
      )}
    </div>
  )
}

export default NavBar;