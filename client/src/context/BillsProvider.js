import React, { createContext, useState, useEffect } from 'react';

const BillsContext = createContext();

function BillsProvider({ children }) {

  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch(`/bills`)
      .then((r) => r.json())
      .then((bills) => setBills(bills));
  }, [])

  return (
    <BillsContext.Provider value={{bills, setBills}}>
      { children }
    </BillsContext.Provider>
  )
}

export { BillsContext, BillsProvider }