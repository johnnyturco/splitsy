import ItemCard from './ItemCard'

function ItemsList({ items }) {
  return (
    <div>
      {items.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}

export default ItemsList;