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
    <div className="BillListContainer">
      <h1 className="ItemsYouOweTitle">Items You Owe</h1>
      <div className='BillList'>
        <ItemsList items={items}/>
      </div>
    </div>
  )
}

export default ItemsOwed;