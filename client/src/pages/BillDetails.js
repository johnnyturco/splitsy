import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NewBillForm from '../components/NewBillForm';
import NewItemForm from '../components/NewItemForm';

function BillDetails() {
  const [bill, setBill] = useState({})
  const { id } = useParams();

  useEffect(() => {
    fetch(`/bills/${id}`)
      .then((r) => r.json())
      .then(bill => setBill(bill))
  }, [])

  return (
    <>
      <section>
        <h2>{bill.title}</h2>
        <h5>{bill.date}</h5>
        <p>{bill.bill_note}</p>
    </section>
      <div>
        <NewItemForm />
      </div>
    </>
  )
}

export default BillDetails;