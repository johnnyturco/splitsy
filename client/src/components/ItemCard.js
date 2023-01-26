import { Link } from 'react-router-dom'

function ItemCard({ item }) {
  return(
    <section>
      <div className="BillRow">
      <Link className="BillLink" to={`/bills-owed/${item.bill.id}`}>
        <h2>{item.item_note}</h2>
      </Link>
      </div>
    </section>
  )
}

export default ItemCard;