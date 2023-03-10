import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { UserContext } from '../context/UserProvider';

function NewItemForm({ setBillItems }) {

    // let { user } = useContext(UserContext);

    const [users, setUsers] = useState([]);
    const [usersId, setUsersId] = useState("");
    const [itemNote, setItemNote] = useState("");
    const [itemAmount, setItemAmount] = useState("");
    const [settled, setSettled] = useState(false);
    // const [bill, setBill] = useState({})
    const { id } = useParams();


    // const usersArray = users.map(user => {
    //     return (
    //         user.venmo_username
    //     )
    // })

    // console.log(usersArray)


    // logs session user id
        // console.log(user.id)
    // logs the selected user id
        // console.log(usersId)
    // logs the current bill id
        // console.log(id)

    useEffect(() => {
        fetch("/users")
            .then((r) => r.json())
            .then(setUsers);
        }, []);

    function handleSubmit(e) {
        e.preventDefault()

        const itemData = {
            item_note: itemNote,
            item_amount: itemAmount,
            user_id: usersId,
            bill_id: id,
            settled: settled
        }

        fetch(`/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(itemData)
        })
            .then((r) => r.json())
            .then((data) => {
                setBillItems((prevBillItems) => [...prevBillItems, data])
            })
        // resets form
            setItemAmount("")
            setItemNote("")
            setSettled(false)
            setUsersId("")
    }

    return (
        <div>
            <h2>New Item Form</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-div">
                    <label className="EditFormLabel">User:</label>
                    <select
                        className="NewFormInput"
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
                </div>

                <div className="form-div">
                    <label className="EditFormLabel">Item Note: </label>
                    <textarea
                        rows="2"
                        cols="20"
                        className="FormInput"
                        type="text"
                        name="item_note"
                        value={itemNote}
                        onChange={(e) => setItemNote(e.target.value)}
                    />
                </div>

                <div className="form-div">
                    <label className="EditFormLabel">Item Amount: </label>
                    <input
                        className="FormInput"
                        type="number"
                        name="item_amount"
                        placeholder="$"
                        value={itemAmount}
                        onChange={(e) => setItemAmount(e.target.value)}
                    />
                </div>

                <div className="form-div">
                    <label className="EditFormLabel">Venmo Username:</label>
                    <select
                        className="NewFormInput"
                        id="venmo_username"
                        name="venmo_username"
                        value={usersId}
                        onChange={(e) => setUsersId(e.target.value)}
                    >
                        <option value="">Select a User's Venmo Handle</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.venmo_username}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="form-div">
                    <label className="EditFormLabel">Paid? </label>
                    <input
                        className="FormInput"
                        type="checkbox"
                        name="settled"
                        checked={settled}
                        onChange={(e) => setSettled(e.target.checked)}
                    />
                </div>
                <button className="FormBtn">Add Item</button>
                <br></br>
            </form>
        </div>
    )
}

export default NewItemForm