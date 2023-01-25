import { useState, useEffect } from 'react';
import ItemsList from '../components/ItemsList';

function ItemsOwed() {

  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(`/items`)
      .then((r) => r.json())
      .then((itemsFromServer => setItems(itemsFromServer)))
  }, [])

  return (
    <>
      <h1>Items You Owe</h1>
      <ItemsList items={items}/>
    </>
  )
}

export default ItemsOwed;