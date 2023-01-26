import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { BillsContext } from '../context/BillsProvider';
import BillsList from '../components/BillsList'

function BillsCreated() {

  const { bills } = useContext(BillsContext);

  let history = useHistory();

  function handleCreateNewBill(){
    history.push("/create-new-bill")
  }

  return (
    <>
      <h1 className="PageTitle">My Bills</h1>
      <BillsList bills={bills} />

      <button onClick={handleCreateNewBill} className="FormBtn">Create New Bill </button>
    </>
  )
}

export default BillsCreated;