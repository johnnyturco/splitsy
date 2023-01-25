import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemEntry from '../components/ItemEntry'
import NewBillForm from '../components/NewBillForm';
import NewItemForm from '../components/NewItemForm';

function BillDetails() {
  const [bill, setBill] = useState(null)
  const [billItems, setBillItems] = useState(null)
  const { id } = useParams();

  useEffect(() => {
    fetch(`/bills-owed/${id}`)
      .then((r) => r.json())
      .then(bill => {
        setBill(bill)
      })
  }, [])

  useEffect(() => {
    if (bill) {
      setBillItems(bill.items)
    }
  }, [bill])



const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// console.log(currencyFormatter.format()); /* $2,500.00 */

  let preTaxTotal = 0;
  let taxAndTipAmount = 0;
  if (billItems) {
    billItems.forEach(item => (
      preTaxTotal += item.item_amount
    ))
    taxAndTipAmount = bill.total_amount - preTaxTotal
  }

  return billItems ? (
    <>
      <section>
        <h2>{bill.title}</h2>
        <h5>{bill.date}</h5>
        <p>{bill.bill_note}</p>
        <p>Total Amount: {currencyFormatter.format(bill.total_amount)}</p>
      </section>
      <br></br>
      <section>
        {billItems.map(item => (
          <ItemEntry
           
            key={item.id}
           
            item={item}
           
            preTaxTotal={preTaxTotal}
           
            taxAndTipAmount={taxAndTipAmount}
            currencyFormatter={currencyFormatter}
         
            setBillItems={setBillItems}
          />
        ))}
      </section>
      <section>
        <NewItemForm setBillItems={setBillItems} />
      </section>
    </>
  ) : 'Loading'
}

export default BillDetails;