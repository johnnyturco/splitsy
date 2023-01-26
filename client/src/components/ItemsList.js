import ItemCard from './ItemCard'

function ItemsList({ items }) {
  return (
    <div id="MyBillsContainer">
    <div>
      {items.map(item => (
        <div className="ItemsOwed">
          <ItemCard key={item.id} item={item} />
        </div>
      ))}
      </div>
    </div>
  )
}

export default ItemsList;