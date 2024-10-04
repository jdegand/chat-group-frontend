import { useEffect, useState } from 'react';
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { Link } from 'react-router-dom'

const Profile = () => {

    const { auth } = useAuth();

    const [user, setUser] = useState();
    const [file, setFile] = useState('');

    // could useParams to get userId as well

    // useEffect to get user info - backend protected with jwt
    // the backend user doesn't have much information 
    // this could be used for updating user picture 

    useEffect(() => {

        const getUserInfo = async () => {
            try {
                const response = await axios.get(`/users/${auth.id}`, {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                    withCredentials: true
                }
                );

                setUser(response.data);
            } catch (err) {
                console.log(err);
            }

        }

        getUserInfo();

    }, [auth.accessToken, auth.id])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);

        try {
            await axios.post(`/users/${auth.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${auth.accessToken}` },
                withCredentials: true
            });

            e.target.reset();
            setFile('');
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }

    return (
        <>
            {!user && <p>Loading...</p>}
            {user &&
                <div className="profile-container">
                    <h1>{user.username}, update your profile picture below</h1>
                    <form className="mb-50" onSubmit={handleSubmit}>
                        <input id="fileInput" type="file" onChange={(e) => setFile(e.target.files[0])} />
                        <label htmlFor="fileInput">Add your picture</label>
                        <br />
                        <div className="flex align-baseline mb-50">
                            <Link className="mr-20" to="/">Go Back</Link>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export default Profile