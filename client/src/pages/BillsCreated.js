import React, { useContext } from 'react';
import { BillsContext } from '../context/BillsProvider';
import BillsList from '../components/BillsList'

function BillsCreated() {

  const { bills, setBills } = useContext(BillsContext);

  return (
    <>
      <h1>Bills You've Created</h1>
      <BillsList bills={bills} />
    </>
  )
}

export default BillsCreated;