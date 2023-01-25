import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemEntry from '../components/ItemEntry'

function BillDetails() {
  const [bill, setBill] = useState(null)
  const { id } = useParams();

  useEffect(() => {
    fetch(`/bills-owed/${id}`)
      .then((r) => r.json())
      .then(bill => setBill(bill))
  }, [])


    let preTaxTotal = 0;
    let taxAndTipAmount = 0;
    if (bill) {
      bill.items.forEach(item => (
        preTaxTotal += item.item_amount
      ))
        taxAndTipAmount = bill.total_amount - preTaxTotal
    }

  return bill ? (
    <>
      <section>
        <h2>{bill.title}</h2>
        <h5>{bill.date}</h5>
        <p>{bill.bill_note}</p>
        <p>Total Amount: ${bill.total_amount}</p>
      </section>
      <br></br>
      <section>
        {bill.items.map(item => (
          <ItemEntry key={item.id} item={item} preTaxTotal={preTaxTotal} taxAndTipAmount={taxAndTipAmount}/>
        ))}
      </section>
    </>
  ) : 'Loading'
}

export default BillDetails;