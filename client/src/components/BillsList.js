import BillCard from './BillCard'

function BillsList({ bills }) {
  return (
    <div>
      {bills.map(bill => (
        <BillCard key={bill.id} bill={bill} />
      ))}
    </div>
  )
}

export default BillsList;