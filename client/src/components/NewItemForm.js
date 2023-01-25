import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

function NewItemForm() {

    let { user } = useContext(UserContext); // if user_id = current_user.id --> set settled? = true

    const [users, setUsers] = useState([]);
    const [usersId, setUsersId] = useState("");
    const [itemNote, setItemNote] = useState("");
    const [itemAmount, setItemAmount] = useState("");
    const [settled, setSettled] = useState(false);
    // const [bill, setBill] = useState({})
    const { id } = useParams();

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
                console.log(itemData)
            })
        // resets form
            setItemAmount("")
            setItemNote("")
            setSettled(false)
            setUsersId("")
    }

    function handleChecked(event){
        setSettled({...settled, [event.target.name]: event.target.checked})
    }

    return (
        <div>
            <h1>New Item Form</h1>

            <form onSubmit={handleSubmit}>
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
                        onChange={handleChecked}
                    />
            <button>Add Item</button>
            </form>
        </div>
    )
}

export default NewItemForm