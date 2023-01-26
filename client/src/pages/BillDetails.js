import { useEffect, useState, useContext } from 'react';
import { useParams, useHistory, Link, useLocation} from 'react-router-dom';
import ItemEntry from '../components/ItemEntry'
import NewItemForm from '../components/NewItemForm';
import Popup from '../components/Popup.js';
import { BillsContext } from '../context/BillsProvider';
import { UserContext } from '../context/UserProvider';

function BillDetails() {
  const [bill, setBill] = useState(null)
  const [billItems, setBillItems] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const { bills, setBills } = useContext(BillsContext);
  const { user, setUser } = useContext(UserContext)
  const [title, setTitle] = useState("")
  const [totalAmount, setTotalAmount] = useState("")
  const [date, setDate] = useState("")
  const [notes, setNotes] = useState("")
  const [creatorId, setCreatorId] = useState("");
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams()

  console.log(bill)

  console.log(user)

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    fetch(`/bills-owed/${id}`)
      .then((r) => r.json())
      .then(bill => {
        return (
          setBill(bill),
          setCreatorId(bill.creator_id),
          setTitle(bill.title),
          setDate(bill.date),
          setNotes(bill.bill_note),
          setTotalAmount(bill.total_amount)
        )
      })
  }, [])

  useEffect(() => {
    if (bill) {
      setBillItems(bill.items)
    }
  }, [bill])


  function handleEditBill(e){
    e.preventDefault();

    const editBill = {
      title: title,
      date: date,
      bill_note: notes,
      total_amount: totalAmount
    }

    fetch(`/bills/${bill.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editBill)
    })
      .then((r) => r.json())
      .then((data) => console.log(data))

      setIsOpen(false);
      alert("Bill has been updated")
  }

  function handleGoBackOwed(){
      history.push("/items-owed")
  }

  function handleGoBackCreate(){
      history.push("/home")
  }

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

// console.log(currencyFormatter.format()); /* $2,500.00 */

  let preTaxTotal = 0;
  let taxAndTipAmount = 0;
  if (billItems) {
    billItems.forEach(item => (
      preTaxTotal += item.item_amount
    ))
    taxAndTipAmount = bill.total_amount - preTaxTotal
  }
  console.log(billItems)

  return billItems ? (
    <>
      {location.pathname === `/bills-owed/${id}` ? <Link to="/items-owed"><button onClick={handleGoBackOwed} className="BillBtn">Return to Items Owed</button></Link> : null}

      {location.pathname === `/bills/${id}` ? <Link to="/home"><button onClick={handleGoBackCreate} className="BillBtn">Return to My Bills</button></Link> : null}

      <section>
        <h2>{bill.title}</h2>
        <h5>{bill.date}</h5>
        <p>{bill.bill_note}</p>
        <p>Total Amount: {currencyFormatter.format(bill.total_amount)}</p>
      { user.id == bill.creator_id ? (
        <input
          className="BillBtn"
          type="button"
          value="Edit Bill"
          onClick={togglePopup}
        />) : null}

        {isOpen && <Popup
          content={
            <>
              <form onSubmit={handleEditBill}>
                <h1>Edit Bill: {bill.title}</h1>
                <label className="EditFormLabel">Bill Title: </label>
                  <textarea
                      rows="3"
                      cols="20"
                      className="EditFormInput"
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                  />
                  <label className="EditFormLabel">Bill Date: </label>
                  <input
                    className="EditFormInput"
                    type="date"
                    name="date"
                    placeholder="YYYY/MM/DD"
                    value={date}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label className="EditFormLabel">Bill Notes: </label>
                  <textarea
                    rows="4"
                    cols="20"
                    className="EditFormInput"
                    type="text"
                    name="bill_note"
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label className="EditFormLabel">Bill Amount: </label>
                  <input
                    className="EditFormInput"
                    type="number"
                    name="total_amount"
                    placeholder="$ Total Amount (inc. tax/tip if applicable"
                    value={totalAmount}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button className="BillBtn" >Update Bill</button>
              </form>
            </>
          }
        handleClose={togglePopup}
        /> }

      </section>
      <br></br>
      <section>
        {billItems.map(item => (
          <ItemEntry
            key={item.id}
            item={item}
            preTaxTotal={preTaxTotal}
            taxAndTipAmount={taxAndTipAmount}
            currencyFormatter={currencyFormatter}
            billItems ={billItems}
            setBillItems={setBillItems}
            bill={bill}
          />
        ))}
      </section>
      {user.id == bill.creator_id ? (
        <section>
          <NewItemForm setBillItems={setBillItems} />
        </section>
      ) : null}
    </>
  ) : 'Loading'
}

export default BillDetails;