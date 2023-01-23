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
    });
  }


  return (
    <div>
        <nav>
          <NavLink exact to="/home">Bills Created</NavLink>
          <NavLink exact to="/bills-owed">Bills Owed</NavLink>
          <NavLink exact to="/profile">Profile</NavLink>
          <NavLink exact to="/" onClick={handleLogoutClick}>Logout</NavLink>
      </nav>
    </div>
  )
}

export default NavBar;