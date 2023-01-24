import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

function NewBillForm() {
    const [ errors, setErrors ] = useState([])
    const [ title, setTitle ] = useState("")
    const [ billNote, setBillNote ] = useState("")
    const [ date, setDate ] = useState("")
    const [ totalAmount, setTotalAmount ] = useState("")
    let { user, setUser } = useContext(UserContext)
    let history = useHistory();

    console.log(user.id)

    // const [ newBillInfo, setNewBillInfo ] = useState({
    //     creator_id: user.id,
    //     title: "",
    //     date: "",
    //     bill_note: "",
    //     total_amount: ""
    // })

    // function handleChange(e) {
    //     setNewBillInfo((prevBillInfo) => {
    //         return {
    //             ... prevBillInfo,
    //             [e.target.name]: e.target.value
    //         }
    //     })
    // };

    function handleNewBill(e) {
        e.preventDefault();
        setErrors([]);

        // let newBill = {
        //     title: title,
        //     bill_note: billNote,
        //     total_amount: parseInt(totalAmount),
        //     date: date,
        //     creator_id: user.id
        // };
        let newBill = {
            creator_id: 1,
            title: "title",
            date: "2023-01-02",
            bill_note: "billNote",
            total_amount: 2
        }
        console.log(newBill)
        fetch("/bills", {
            method: "POST",
            headers: {
                "Context-Type": "application/json",
            },
            body: JSON.stringify (newBill)
        }).then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    // setTitle("");
                    // setBillNote("");
                    // setDate("");
                    // setTotalAmount("");
                    console.log(data);
    });
                history.push("/home");
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        }, [])
    }

    return (
        <div>
            <h1> Create a New Bill </h1>
            <form onSubmit={handleNewBill}>
                <label>Bill Title: </label>
                    <br></br>
                    <input
                        type="text"
                        name="title"
                        placeholder="Gas for Ski Trip"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <br></br>
                <label>Date: </label>
                    <br></br>
                    <input
                        type="date"
                        name="date"
                        placeholder="YYYY/MM/DD"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <br></br>
                <label>Bill Note: </label>
                    <br></br>
                    <input
                        type="text"
                        name="bill_note"
                        placeholder="Split b/w 3 people"
                        value={billNote}
                        onChange={(e) => setBillNote(e.target.value)}
                    />
                    <br></br>
                <label>Total Amount :</label>
                    <br></br>
                    <input
                        type="number"
                        name="total_amount"
                        placeholder="$65.45"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                    />
                <button>Create New Bill</button>
            </form>
            <div>
                    {errors.map((err) => (
                        <p key={err}>{err}</p>
                    ))}
            </div>
        </div>
    );
}

export default NewBillForm;