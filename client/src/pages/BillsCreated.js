import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { BillsContext } from '../context/BillsProvider';
import BillsList from '../components/BillsList'

function BillsCreated() {

  const { bills, setBills } = useContext(BillsContext);

  let history = useHistory();

  function handleCreateNewBill(){
    history.push("/create-new-bill")
  }

  return (
    <>
      <h1>Bills You've Created</h1>
      <BillsList bills={bills} />

      <button onClick={handleCreateNewBill} >Create New Bill </button>
    </>
  )
}

export default BillsCreated;