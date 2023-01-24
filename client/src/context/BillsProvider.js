import React, { useContext, createContext, useState, useEffect } from 'react';
import { UserContext } from './UserProvider';

const BillsContext = createContext();

function BillsProvider({ children }) {
  const { user } = useContext(UserContext);

  const [bills, setBills] = useState([]);

  useEffect(() => {
    if (user){
      fetch(`/bills`)
        .then((r) => r.json())
        .then((bills) => setBills(bills))
    }
  }, [user])

  return (
    <BillsContext.Provider value={{bills, setBills}}>
      { children }
    </BillsContext.Provider>
  )
}

export { BillsContext, BillsProvider }