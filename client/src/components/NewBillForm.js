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

    return (
        <div>
            <h1>Create a New Bill</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newBill.title}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="date"
                    placeholder="YYYY/MM/DD"
                    value={newBill.date}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="bill_note"
                    placeholder="Notes"
                    value={newBill.bill_note}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="total_amount"
                    value={newBill.total_amount}
                    onChange={handleChange}
                />
                <button>Create Bill</button>
            </form>
        </div>
    )
}

export default NewBillForm;