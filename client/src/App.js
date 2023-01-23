import { useState, createContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import BillsCreated from './pages/BillsCreated';
import SignUp from './pages/SignUp';
import BillDetails from './pages/BillDetails';
import Login from './pages/Login';
import { UserProvider } from './context/UserProvider';
import { BillsProvider } from './context/BillsProvider';

function App() {

  return (
    <UserProvider>
      <BillsProvider>
        <NavBar />
        <Switch>
          <Route path="/home">
            <BillsCreated />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/bills/:id">
            <BillDetails />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </BillsProvider>
    </UserProvider>
  );
}

export default App;
