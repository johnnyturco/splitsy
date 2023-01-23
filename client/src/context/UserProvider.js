import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/me`)
      .then((r) => r.json())
      .then((user) => setUser(user));
  }, [])

  return (
    <UserContext.Provider value={{user, setUser}}>
      { children }
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }