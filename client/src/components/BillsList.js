import BillCard from './BillCard'

function BillsList({ bills }) {
  return (
    <div id="MyBillsContainer">
      <div>
        {bills.map(bill => (
          <div id="MyBills">
            <BillCard key={bill.id} bill={bill} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BillsList;