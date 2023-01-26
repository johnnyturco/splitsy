import { useEffect, useState, useContext } from 'react';
import { useParams, useHistory, Link, useLocation} from 'react-router-dom';
import ItemEntry from '../components/ItemEntry'
import NewItemForm from '../components/NewItemForm';
import Popup from '../components/Popup.js';
// import { BillsContext } from '../context/BillsProvider';
import { UserContext } from '../context/UserProvider';

function BillDetails() {
  const [ bill, setBill ] = useState(null)
  const [ billItems, setBillItems ] = useState(null)
  const [isOpen, setIsOpen ] = useState(false)
  // const { bills, setBills } = useContext(BillsContext);
  const { user } = useContext(UserContext)
  const [ title, setTitle ] = useState("")
  const [ totalAmount, setTotalAmount ] = useState("")
  const [ date, setDate ] = useState("")
  const [ notes, setNotes ] = useState("")
  const [ creatorId, setCreatorId ] = useState("");
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams()

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    fetch(`/bills-owed/${id}`)
      .then((r) => r.json())
      .then(billFromServer => {
        return (
          setBill(billFromServer),
          setCreatorId(billFromServer.creator_id),
          setTitle(billFromServer.title),
          setDate(billFromServer.date),
          setNotes(billFromServer.bill_note),
          setTotalAmount(billFromServer.total_amount)
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
      .then((editedBill) => (
        setBill(editedBill),
        setTitle(editedBill.title),
        setDate(editedBill.date),
        setNotes(editedBill.bill_note),
        setTotalAmount(editedBill.total_amount)
      ))

      setIsOpen(false);
      alert("Bill has been updated")
  }
  console.log(bill)
  function handleGoBackOwed(){
      history.push("/items-owed")
  }

  function handleGoBackCreate(){
      history.push("/home")
  }

  // MATH *****************
    const currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

  let preTaxTotal = 0;
  let taxAndTipAmount = 0;
  if (billItems) {
    billItems.forEach(item => (
      preTaxTotal += item.item_amount
    ))
    taxAndTipAmount = bill.total_amount - preTaxTotal
  }
  // **********************


  return billItems ? (
    <>
      <div id="goBackBtn">
        {location.pathname === `/bills-owed/${id}` ? <Link to="/items-owed"><button onClick={handleGoBackOwed} className="BillBtn">Return to Items Owed</button></Link> : null}
        {location.pathname === `/bills/${id}` ? <Link to="/home"><button onClick={handleGoBackCreate} className="BillBtn">Return to My Bills</button></Link> : null}
      </div>
    <div className='AllBillContainer'>
      <div id="test">
        <div id="Bill-Container">
          <div id="BillCard">
            <h2>{bill.title}</h2>
            <h4>{bill.date}</h4>
            <p><b>Notes:</b> {bill.bill_note}</p>
            <p><b>Total Amount:</b> <span className='amount'>{currencyFormatter.format(bill.total_amount)}</span></p>
          </div>
          <div className="EditBillBtn">
      { user.id === bill.creator_id ? (
          <input
            className="BillBtn"
            type="button"
            value="Edit Bill"
            onClick={togglePopup}
          />
        ) : null}
        </div>
        </div>
        {user.id === bill.creator_id ? (
        <div className="addItemBtn">
          <input
            className="FormBtn"
            type="button"
            value="Add Item"
            onClick={togglePopup}
          />
          {isOpen && <Popup
            content={
              <section>
                <NewItemForm setBillItems={setBillItems} />
              </section>
            }
            handleClose={togglePopup}
          />}
        </div>) : null}
        {isOpen && <Popup
          content={
            <>
              <form onSubmit={handleEditBill}>
                <h1>Edit Bill: {bill.title}</h1>

                <div className="form-div">
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
                  </div>

                  <div className="form-div">
                  <label className="EditFormLabel">Bill Date: </label>
                    <input
                      className="EditFormInput"
                      type="date"
                      name="date"
                      placeholder="YYYY/MM/DD"
                      value={date}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="form-div">
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
                  </div>

                  <div className="form-div">
                    <label className="EditFormLabel">Bill Amount: </label>
                    <input
                      className="EditFormInput"
                      type="number"
                      name="total_amount"
                      placeholder="$ Total Amount (inc. tax/tip if applicable"
                      value={totalAmount}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                <button className="BillBtn" >Update Bill</button>
              </form>
            </>
          }
        handleClose={togglePopup}
        /> }
      </div>
      <br></br>
      <section>
        {billItems.map(item => (
          <ItemEntry
            key={item.id}
            item={item}
            preTaxTotal={preTaxTotal}
            taxAndTipAmount={taxAndTipAmount}
            currencyFormatter={currencyFormatter}
            billItems={billItems}
            setBillItems={setBillItems}
            bill={bill}
          />
        ))}
      </section>
    </div>
    </>
  ) : (
  <div className="error">
    Please Login to See Your Bills
  </div>)
}

export default BillDetails;