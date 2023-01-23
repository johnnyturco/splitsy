import { useState, useEffect, createContext } from 'react';
// import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Bills from './pages/Bills';
import { UserProvider } from './context/UserProvider';

export const UserContext = createContext(null)

function App() {

  const [user, setUser] = useState({})

  // useEffect(() => {
  //   fetch(`http://localhost:3000/me`)
  //     .then((r) => r.json())
  //     .then((userFromServer) => console.log(userFromServer));
  // }, [user]);

  return (
    <UserProvider>
      <Login />
      <Bills />
    </UserProvider>
  );
}

export default App;
