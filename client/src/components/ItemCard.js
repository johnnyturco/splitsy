import { Link } from 'react-router-dom'

function ItemCard({ item }) {
  return(
    <section>
      <Link to={`/bills-owed/${item.bill.id}`}>
        <h2>{item.item_note}</h2>
      </Link>
      {console.log(item)}
    </section>
  )
}

export default ItemCard;