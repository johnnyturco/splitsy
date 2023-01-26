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
    <div className="BillListContainer">
      <div>
        <h1 className="MyBillPageTitle">My Bills</h1>
        <div className="CreateNewBillBtn">
          <button onClick={handleCreateNewBill} className="FormBtn">Create New Bill </button>
        </div>
      </div>
        <div className='BillList'>
          <BillsList bills={bills} />
        </div>
    </div>
  )
}

export default BillsCreated;