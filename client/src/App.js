import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import BillsCreated from './pages/BillsCreated';
import ItemsOwed from './pages/ItemsOwed';
import SignUp from './pages/SignUp';
import BillDetails from './pages/BillDetails';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NewBillForm from './components/NewBillForm';
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
          <Route path="/items-owed">
            <ItemsOwed />
          </Route>
          <Route path="/create-new-bill">
            <NewBillForm />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/bills/:id">
            <BillDetails />
          </Route>
          <Route path="/bills-owed/:id">
            <BillDetails />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
      </BillsProvider>
    </UserProvider>
  );
}

export default App;
