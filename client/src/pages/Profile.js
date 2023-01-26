import { useState, useContext } from 'react';
import { UserContext } from '../context/UserProvider'

function Profile() {

    let { user } = useContext(UserContext)

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
    }

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
        <div className="EditProfileForm">
            <h1 className="PageTitle" >Update Your Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-div">
                    <label className="FormLabel">First Name: </label>
                    <input
                        className="FormInput"
                        type="text"
                        name="first_name"
                        value={credentials.first_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-div">
                    <label className="FormLabel">Last Name: </label>
                    <input
                        className="FormInput"
                        type="text"
                        name="last_name"
                        value={credentials.last_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-div">
                    <label className="FormLabel">Username: </label>
                    <input
                        className="FormInput"
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-div">
                    <label className="FormLabel">Venmo Username: </label>
                    <input
                        className="FormInput"
                        type="text"
                        name="venmo_username"
                        value={credentials.venmo_username}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-div">
                    <label className="FormLabel">New Password: </label>
                    <input
                        className="FormInput"
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-div">
                    <label className="FormLabel">Confirm Password: </label>
                    <input
                        className="FormInput"
                        type="password"
                        name="password_confirmation"
                        value={credentials.password_confirmation}
                        onChange={handleChange}
                    />
                </div>
                <br></br>

                <button
                    type="submit"
                    className="DeleteBtn">Update Account
                </button>
            </form>
        </div>
    )
}

export default Profile;