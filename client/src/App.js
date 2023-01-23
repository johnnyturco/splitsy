import { useState, useEffect, createContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import BillsCreated from './pages/BillsCreated';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { UserProvider } from './context/UserProvider';

function App() {

  return (
    <UserProvider>
      <NavBar />
      <Switch>
        <Route path="/home">
          <BillsCreated />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </UserProvider>
  );
}

export default App;
