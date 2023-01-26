import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import { BillsContext } from '../context/BillsProvider';

function NewBillForm() {

    let {user} = useContext(UserContext);
    let {setBills} = useContext(BillsContext);

    let history = useHistory()

    const [newBill, setNewBill] = useState({
        creator_id: user.id,
        title: "",
        date: "",
        bill_note: "",
        total_amount: ""
    })

    function handleChange(e) {
        setNewBill((previous) => {
            return {
                ...previous,
                [e.target.name]: e.target.value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`/bills`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBill)
        })
            .then((r) => r.json())
            .then((newBillFromServer) => {
                setBills((prevBills) => [...prevBills, newBillFromServer])
                history.push(`/bills/${newBillFromServer.id}`)
            })
    }

    function handleGoBack(){
        history.push("/home")
    }

    return (
        <div>
            <button className="FormBtn" onClick={handleGoBack}>Return to My Bills</button>
            <h1 className="PageTitle">Create a New Bill</h1>
            <form onSubmit={handleSubmit} className="CreateForm">
                <label className="FormLabel">Bill Title: </label>
                <input
                    className="FormInput"
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newBill.title}
                    onChange={handleChange}
                />
                <br></br>
                <label className="FormLabel">Bill Date: </label>
                <input
                    className="FormInput"
                    type="date"
                    name="date"
                    placeholder="YYYY/MM/DD"
                    value={newBill.date}
                    onChange={handleChange}
                />
                <br></br>
                <label className="FormLabel">Amount: $ </label>
                <input
                    className="FormInput"
                    type="number"
                    name="total_amount"
                    value={newBill.total_amount}
                    onChange={handleChange}
                />
                <br></br>
                <label className="FormLabel">Notes: </label>
                <textarea
                    rows="4"
                    cols="20"
                    className="FormInput"
                    type="text"
                    name="bill_note"
                    placeholder="Notes"
                    value={newBill.bill_note}
                    onChange={handleChange}
                />
                <br></br>
                <button className="FormBtn">Create Bill</button>
            </form>
        </div>
    )
}

export default NewBillForm;