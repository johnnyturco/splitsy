import { useState, useContext } from 'react';
import { UserContext } from '../context/UserProvider'

function Profile() {

    let { user } = useContext(UserContext)
    console.log(user.id)

    const [ credentials, setCredentials ] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        venmo_username: user.venmo_username,
        password: "",
        password_confirmation: ""
    })

    function handleChange(e) {
        setCredentials((prevCredential) => {
            return {
                ...prevCredential,
                [e.target.name]: e.target.value
            }
        })
    };

    function handleSubmit(e) {
        e.preventDefault();

        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
            .then((r) => r.json())
            .then((data) => console.log(data))
    }

    return (
        <div>
            <h2>Update Your Profile</h2>
            <form onSubmit={handleSubmit}>
                <label>First Name: </label>
                <br></br>
                <input
                    type="text"
                    name="first_name"
                    value={credentials.first_name}
                    onChange={handleChange}
                />
                <br></br>

                <label>Last Name: </label>
                <br></br>
                <input
                    type="text"
                    name="last_name"
                    value={credentials.last_name}
                    onChange={handleChange}
                />
                <br></br>

                <label>Username: </label>
                <br></br>
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                />
                <br></br>

                <label>Venmo Username: </label>
                <br></br>
                <input
                    type="text"
                    name="venmo_username"
                    value={credentials.venmo_username}
                    onChange={handleChange}
                />
                <br></br>

                <label>New Password: </label>
                <br></br>
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                />
                <br></br>

                <label>Confirm Password: </label>
                <br></br>
                <input
                    type="password"
                    name="password_confirmation"
                    value={credentials.password_confirmation}
                    onChange={handleChange}
                />
                <br></br>
                <br></br>

                <button type="submit">Update Account</button>
            </form>
        </div>
    )
}

export default Profile;