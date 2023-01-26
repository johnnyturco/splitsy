import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useParams } from 'react-router-dom';
import Popup from "./Popup.js"

function ItemEntry({ item, preTaxTotal, taxAndTipAmount, billItems, setBillItems, currencyFormatter, bill}) {

  let { user } = useContext(UserContext);

  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false)
  const [users, setUsers] = useState([]);
  const [usersId, setUsersId] = useState(item.user_id);
  const [itemNote, setItemNote] = useState(item.item_note);
  const [itemAmount, setItemAmount] = useState(item.item_amount);
  const [settled, setSettled] = useState(item.settled);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    fetch("/users")
        .then((r) => r.json())
        .then(data => setUsers(data));
    }, []);


  function handlesSubmitEditedItem(e){
    e.preventDefault();

    const itemData = {
      item_note: itemNote,
      item_amount: itemAmount,
      user_id: usersId,
      bill_id: id,
      settled: settled
    }

    fetch(`/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(itemData)
    })
      .then((r) => r.json())
      .then((updatedItem) => updateEditedArray(updatedItem))

    setIsOpen(false)
    alert("Item has been updated!");
  }

  function updateEditedArray(updatedItem) {
    const updatedItemsArray = billItems.map((billItem) => {
      if (billItem.id === updatedItem.id) {
        return updatedItem
      } else {
        return billItem
      }
    })
    setBillItems(updatedItemsArray)
  }

  function handleDeleteItem(e){
    fetch(`/items/${item.id}`,{
      method: "DELETE"
    })

    deleteItemFromPage()
    alert("Item has been removed from bill!");
  }

  function deleteItemFromPage() {
    const newBillItems = billItems.filter(billItem => {
      return billItem.id !== item.id
    })
    // console.log(newBillItems)
    setBillItems(newBillItems)
  }

  const amountOwed = ((item.item_amount / preTaxTotal) * taxAndTipAmount) + item.item_amount


  return (
    <div id="allItemContainer">
    <section id="itemContainer" >
      <div id="itemCard">
        <div id="itemDetails">
          <h2>{`${item.user.first_name} ${item.user.last_name}`}</h2>
          <h4>{item.item_note}</h4>
          <p><b>Paid?</b><span className="icon">{item.settled ? " ✅" : " 🚫" }</span></p>
          <p><b>Item Amount:</b> <span className="amount">{currencyFormatter.format(item.item_amount)}</span></p>
          <p><b>Amount Owed </b> <em>(includes tax & tip if applicable)</em>: <span className="amount">{currencyFormatter.format(amountOwed)}</span></p>
          <br></br>
        </div>
      </div>

      <div className="ItemBtns">
      <a target="_blank" rel="noreferrer" href={`http://venmo.com/u/${item.user.venmo_username}`}><img className="venmo-icon" src="../venmo-icon.png" alt="Venmo Icon" /></a>
    {user.id === bill.creator_id ? (
              <input
              className="FormBtn"
              type="button"
              value="Edit Item"
              onClick={togglePopup}
            />
    ) : null}
      {isOpen && <Popup
        content={
          <>
            <form onSubmit={handlesSubmitEditedItem}>
            <h1 className="EditItemTitle">Edit Item</h1>
            <label className="EditFormLabel">User:</label>
                      <select
                          className="EditFormInput"
                          id="user_id"
                          name="user_id"
                          value={usersId}
                          onChange={(e) => setUsersId(e.target.value)}
                      >
                      <option value="">Select a User</option>
                          {users.map((user) => (
                              <option key={user.id} value={user.id}>
                                  {user.first_name} {user.last_name}
                              </option>
                          ))}
                      </select>
              <label className="EditFormLabel">Item Note: </label>
                <textarea
                className="EditFormInput"
                type="text"
                name="item_note"
                value={itemNote}
                onChange={(e) => setItemNote(e.target.value)}
                />

              <label className="EditFormLabel">Item Amount: </label>
                <input
                    className="EditFormInput"
                    type="number"
                    name="item_amount"
                    placeholder="$"
                    value={itemAmount}
                    onChange={(e) => setItemAmount(e.target.value)}
                />
              <label className="EditFormLabel">Paid? </label>
                <input
                    className="EditFormInput"
                    type="checkbox"
                    name="settled"
                    checked={settled}
                    onChange={(e) => setSettled(e.target.checked)}
                />
            <button className="FormBtn">Update Item</button>
            </form>
          </>
        }
      handleClose={togglePopup}
      />}
      <br></br>
      <br></br>

      { user.id === bill.creator_id ? (
        <>
          <button onClick={handleDeleteItem} className="DeleteBtn">Delete Item</button>
          <br></br>
        </>
      ) : null}
      </div>
    </section>
    </div>
  )
}

export default ItemEntry;