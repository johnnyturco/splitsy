import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserProvider";
// import { BillsContext } from "../context/BillsProvider";
import { useParams, useHistory } from 'react-router-dom';
import Popup from "./Popup.js"

function ItemEntry({ item, preTaxTotal, taxAndTipAmount, billItems, setBillItems, currencyFormatter, bill }) {

  // let { bills, setBills } = useContext(BillsContext)

  let { user } = useContext(UserContext);

  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false)
  const [users, setUsers] = useState([]);
  const [usersId, setUsersId] = useState(item.user_id);
  const [itemNote, setItemNote] = useState(item.item_note);
  const [itemAmount, setItemAmount] = useState(item.item_amount);
  const [settled, setSettled] = useState(item.settled)
  let history = useHistory();

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
      .then((updatedItem) => console.log(updatedItem))

    item = itemData
    setIsOpen(false)
    alert("Item has been updated!");
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
    <section>
      ---------------------------
      <h3>{`${item.user.first_name} ${item.user.last_name}`}</h3>
      <h4>{item.item_note}</h4>
      <p>Paid? {item.settled ? "true" : "false"}</p>
      <p>Item Amount: {currencyFormatter.format(item.item_amount)}</p>
      <p>Amount Owed: {currencyFormatter.format(amountOwed)}</p>
      <a href={`http://venmo.com/u/${item.user.venmo_username}`}>Venmo</a>
      <br></br>

      <input
        type="button"
        value="Edit Item"
        onClick={togglePopup}
      />

      {isOpen && <Popup
        content={
          <>
            <form onSubmit={handlesSubmitEditedItem}>
            <h1>Edit Item</h1>
            <label>User:</label>
                      <select
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
              <label>Item Note: </label>
                <input
                    type="text"
                    name="item_note"
                    value={itemNote}
                    onChange={(e) => setItemNote(e.target.value)}
                />
              <label>Item Amount: </label>
                <input
                    type="number"
                    name="item_amount"
                    placeholder="$"
                    value={itemAmount}
                    onChange={(e) => setItemAmount(e.target.value)}
                />
              <label>Paid? </label>
                <input
                    type="checkbox"
                    name="settled"
                    checked={settled}
                    onChange={(e) => setSettled(e.target.checked)}
                />
            <button>Update Item</button>
            </form>
          </>
        }
      handleClose={togglePopup}
      />}
      <br></br>
      <br></br>
      <button onClick={handleDeleteItem}>Delete Item</button>
      <br></br>
      ---------------------------
    </section>
  )
}

export default ItemEntry;